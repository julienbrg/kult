'use client'

import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Box,
  Flex,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
  Divider,
  Center,
} from '@chakra-ui/react'
import { CopyIcon, StarIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useEffect as useEffectQR } from 'react'

interface Artwork {
  id: number
  name: string
  author: string
  publicationYear: number
  type: string
  description: string | null
  rating: number | null
  addedAt: string
}

interface ShareArtworkModalProps {
  isOpen: boolean
  onClose: () => void
  artwork: Artwork | null
}

export default function ShareArtworkModal({ isOpen, onClose, artwork }: ShareArtworkModalProps) {
  const [shareUrl, setShareUrl] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const toast = useToast()

  useEffect(() => {
    if (artwork && isOpen) {
      const baseUrl = window.location.origin
      const url = `${baseUrl}/shared/${artwork.id}`
      setShareUrl(url)

      // Generate QR code URL using a free QR code API
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
      setQrCodeUrl(qrUrl)
    }
  }, [artwork, isOpen])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: 'Link copied!',
        description: 'Share link has been copied to clipboard',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy the link manually',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleOpenInNewTab = () => {
    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  const renderRatingStars = (rating: number | null) => {
    if (rating === null) return null

    return (
      <HStack spacing={1}>
        <Text fontSize="sm" color="gray.400">
          Rating:
        </Text>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} color={i < rating ? 'yellow.400' : 'gray.500'} boxSize="14px" />
        ))}
      </HStack>
    )
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      book: 'purple',
      movie: 'blue',
      music: 'green',
      artwork: 'orange',
      other: 'gray',
    }
    return colors[type] || 'gray'
  }

  if (!artwork) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="black" color="white" borderColor="whiteAlpha.300" borderWidth="1px">
        <ModalHeader>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1}>
              <Heading size="md">{artwork.name}</Heading>
              <Text color="gray.300" fontSize="md">
                {artwork.author}
              </Text>
            </VStack>
            <Badge colorScheme={getTypeColor(artwork.type)} px={3} py={1} borderRadius="full">
              {artwork.type}
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* Artwork Details */}
            <Box>
              <HStack justify="space-between" mb={3}>
                <Text fontSize="sm" color="gray.400">
                  Year: {artwork.publicationYear}
                </Text>
                {artwork.rating && renderRatingStars(artwork.rating)}
              </HStack>

              {artwork.description && (
                <Box>
                  <Text fontSize="sm" color="gray.400" mb={2}>
                    Description:
                  </Text>
                  <Text fontSize="sm" color="gray.100" p={3} bg="whiteAlpha.100" borderRadius="md">
                    {artwork.description}
                  </Text>
                </Box>
              )}
            </Box>

            <Divider borderColor="whiteAlpha.300" />

            {/* Share Section */}
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={4}>
                Share this artwork
              </Text>

              {/* QR Code */}
              <Center mb={4}>
                <Box p={4} bg="white" borderRadius="lg">
                  {qrCodeUrl && (
                    <img src={qrCodeUrl} alt="QR Code for sharing" style={{ display: 'block' }} />
                  )}
                </Box>
              </Center>

              {/* Share Link */}
              <VStack spacing={3}>
                <InputGroup>
                  <Input value={shareUrl} readOnly bg="whiteAlpha.100" fontSize="sm" pr="8rem" />
                  <InputRightElement width="8rem">
                    <HStack spacing={1}>
                      <IconButton
                        size="sm"
                        icon={<CopyIcon />}
                        aria-label="Copy link"
                        onClick={handleCopyLink}
                        variant="ghost"
                      />
                      <IconButton
                        size="sm"
                        icon={<ExternalLinkIcon />}
                        aria-label="Open in new tab"
                        onClick={handleOpenInNewTab}
                        variant="ghost"
                      />
                    </HStack>
                  </InputRightElement>
                </InputGroup>

                <Text fontSize="xs" color="gray.400" textAlign="center">
                  Share this link or scan the QR code to let others view this artwork
                </Text>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
