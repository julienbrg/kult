'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  Spinner,
  Button,
  useToast,
  SimpleGrid,
  Flex,
  IconButton,
  Tabs,
  TabList,
  Tab,
  Tooltip,
  useDisclosure,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { DeleteIcon, StarIcon, AddIcon, EditIcon } from '@chakra-ui/icons'
import { useAppKitAccount } from '@reown/appkit/react'
import { useTranslation } from '@/hooks/useTranslation'
import AddArtwork from './AddArtwork'
import EditArtwork from './EditArtwork'
import { useRef } from 'react'

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

export default function ArtworkList() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeType, setActiveType] = useState<string | null>(null)
  const [artworkToDelete, setArtworkToDelete] = useState<Artwork | null>(null)
  const [artworkToEdit, setArtworkToEdit] = useState<Artwork | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const { address, isConnected } = useAppKitAccount()
  const toast = useToast()
  const t = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const fetchArtworks = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      const allResponse = await fetch(`/api/artwork/list?address=${address}`)
      const allData = await allResponse.json()

      if (allResponse.ok) {
        setAllArtworks(allData.artworks || [])

        if (!activeType) {
          setArtworks(allData.artworks || [])
        } else {
          setArtworks(
            allData.artworks?.filter((artwork: Artwork) => artwork.type === activeType) || []
          )
        }
      } else {
        toast({
          title: 'Error',
          description: allData.error || 'Failed to load your collection',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error fetching artworks:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong loading your collection',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (artwork: Artwork) => {
    setArtworkToDelete(artwork)
    onDeleteOpen()
  }

  const handleEditClick = (artwork: Artwork) => {
    setArtworkToEdit(artwork)
    onEditOpen()
  }

  const handleConfirmDelete = async () => {
    if (!address || !artworkToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch('/api/artwork/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: artworkToDelete.id,
          walletAddress: address,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setArtworks(prev => prev.filter(artwork => artwork.id !== artworkToDelete.id))
        setAllArtworks(prev => prev.filter(artwork => artwork.id !== artworkToDelete.id))

        toast({
          title: 'Success',
          description: 'Artwork removed from your collection',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to delete artwork',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error deleting artwork:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsDeleting(false)
      setArtworkToDelete(null)
      onDeleteClose()
    }
  }

  const types = ['book', 'movie', 'music', 'artwork', 'other']

  const typeCounts = types.reduce(
    (acc, type) => {
      acc[type] = allArtworks.filter(a => a.type === type).length
      return acc
    },
    {} as Record<string, number>
  )

  const totalCount = allArtworks.length

  useEffect(() => {
    if (isConnected) {
      fetchArtworks()
    }
  }, [address, isConnected, activeType])

  const renderRatingStars = (rating: number | null) => {
    if (rating === null) return null

    return (
      <HStack spacing={1}>
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

  const handleArtworkAdded = () => {
    fetchArtworks()
  }

  const handleArtworkUpdated = () => {
    fetchArtworks()
  }

  return (
    <Box>
      <Tabs variant="unstyled" mb={6}>
        <TabList overflowX="auto" pb={2}>
          <Tab
            onClick={() => setActiveType(null)}
            color={activeType === null ? '#45a2f8' : 'white'}
            fontWeight={activeType === null ? 'bold' : 'normal'}
            _hover={{ color: '#45a2f8' }}
            px={4}
          >
            All ({totalCount})
          </Tab>
          {types.map(type => (
            <Tab
              key={type}
              onClick={() => setActiveType(type)}
              color={activeType === type ? '#45a2f8' : 'white'}
              fontWeight={activeType === type ? 'bold' : 'normal'}
              _hover={{ color: '#45a2f8' }}
              px={4}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} ({typeCounts[type] || 0})
            </Tab>
          ))}
        </TabList>
      </Tabs>

      {isLoading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" />
        </Flex>
      ) : allArtworks.length === 0 ? (
        <Box
          textAlign="center"
          py={10}
          borderWidth="1px"
          borderRadius="lg"
          borderColor="whiteAlpha.300"
        >
          <Text fontSize="lg" mb={4}>
            Your collection is empty
          </Text>
          <Button onClick={onOpen} size="sm" bg="#8c1c84" color="white" _hover={{ bg: '#6d1566' }}>
            Add Your First Item
          </Button>
        </Box>
      ) : artworks.length === 0 && activeType !== null ? (
        <Box
          textAlign="center"
          py={10}
          borderWidth="1px"
          borderRadius="lg"
          borderColor="whiteAlpha.300"
        >
          <Text fontSize="lg" mb={4}>
            No {activeType} items found in your collection
          </Text>
          <Button onClick={onOpen} size="sm" bg="#8c1c84" color="white" _hover={{ bg: '#6d1566' }}>
            Add {activeType.charAt(0).toUpperCase() + activeType.slice(1)}
          </Button>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {artworks.map(artwork => (
              <Box
                key={artwork.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="whiteAlpha.300"
                bg="whiteAlpha.100"
                transition="all 0.2s"
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                <Flex justify="space-between" align="flex-start">
                  <Heading as="h3" size="md" isTruncated>
                    {artwork.name}
                  </Heading>
                  <HStack spacing={1}>
                    <Tooltip label="Edit artwork">
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit artwork"
                        variant="ghost"
                        size="sm"
                        color="blue.400"
                        onClick={() => handleEditClick(artwork)}
                      />
                    </Tooltip>
                    <Tooltip label="Remove from collection">
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete artwork"
                        variant="ghost"
                        size="sm"
                        color="red.400"
                        onClick={() => handleDeleteClick(artwork)}
                      />
                    </Tooltip>
                  </HStack>
                </Flex>

                <Text mt={2} fontWeight="medium">
                  {artwork.author}
                </Text>

                <Flex mt={2} justify="space-between" align="center">
                  <Badge colorScheme={getTypeColor(artwork.type)} px={2} py={1} borderRadius="full">
                    {artwork.type}
                  </Badge>
                  <Text fontSize="xs" color="gray.400">
                    {artwork.publicationYear}
                  </Text>
                </Flex>

                {artwork.description && (
                  <Text mt={3} fontSize="sm" color="gray.300" noOfLines={2}>
                    {artwork.description}
                  </Text>
                )}

                {artwork.rating && <Box mt={3}>{renderRatingStars(artwork.rating)}</Box>}
              </Box>
            ))}
          </SimpleGrid>

          <Center mt={8} mb={6}>
            <Button
              leftIcon={<AddIcon />}
              onClick={onOpen}
              bg="#8c1c84"
              color="white"
              _hover={{ bg: '#6d1566' }}
              size="md"
              px={6}
            >
              Add New
            </Button>
          </Center>
        </>
      )}

      {/* Add Artwork Modal */}
      <AddArtwork isOpen={isOpen} onClose={onClose} onArtworkAdded={handleArtworkAdded} />

      {/* Edit Artwork Modal */}
      <EditArtwork
        isOpen={isEditOpen}
        onClose={onEditClose}
        onArtworkUpdated={handleArtworkUpdated}
        artwork={artworkToEdit}
      />

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent
            bg="black"
            color="white"
            borderColor="whiteAlpha.300"
            borderWidth="1px"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Artwork
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to remove <strong>&quot;{artworkToDelete?.name}&quot;</strong>{' '}
              by <strong>{artworkToDelete?.author}</strong> from your collection? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleConfirmDelete}
                ml={3}
                isLoading={isDeleting}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}
