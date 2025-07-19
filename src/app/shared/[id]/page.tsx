'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  VStack,
  HStack,
  Box,
  Text,
  Heading,
  Badge,
  Spinner,
  Button,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  useToast,
} from '@chakra-ui/react'
import { StarIcon, AddIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAppKitAccount, useAppKit } from '@reown/appkit/react'

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

export default function SharedArtworkPage() {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasBeenAdded, setHasBeenAdded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { address, isConnected } = useAppKitAccount()
  const { open } = useAppKit()
  const params = useParams()
  const artworkId = params.id
  const toast = useToast()

  // Fetch the artwork data
  useEffect(() => {
    const fetchArtwork = async () => {
      if (!artworkId) {
        setError('Invalid artwork ID')
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/artwork/shared/${artworkId}`)
        const data = await response.json()

        if (response.ok) {
          setArtwork(data.artwork)
        } else {
          setError(data.error || 'Artwork not found')
        }
      } catch (error) {
        console.error('Error fetching artwork:', error)
        setError('Failed to load artwork')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtwork()
  }, [artworkId])

  // Auto-add artwork when user connects wallet
  useEffect(() => {
    const autoAddArtwork = async () => {
      if (isConnected && address && artwork && !hasBeenAdded && !isProcessing) {
        setIsProcessing(true)

        try {
          // First, ensure user exists in database
          const userResponse = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress: address }),
          })

          // Add artwork to user's collection
          const artworkResponse = await fetch('/api/artwork/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              walletAddress: address,
              name: artwork.name,
              author: artwork.author,
              publicationYear: artwork.publicationYear,
              type: artwork.type,
              description: artwork.description,
              rating: artwork.rating,
            }),
          })

          const artworkData = await artworkResponse.json()

          if (artworkResponse.ok) {
            setHasBeenAdded(true)
            toast({
              title: 'Welcome to Kult! 🎉',
              description: artworkData.exists
                ? 'This artwork was already in your collection'
                : `"${artwork.name}" has been added to your collection!`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          } else {
            toast({
              title: 'Error adding artwork',
              description: artworkData.error || 'Failed to add artwork to your collection',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
        } catch (error) {
          console.error('Error auto-adding artwork:', error)
          toast({
            title: 'Error',
            description: 'Something went wrong adding the artwork to your collection',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        } finally {
          setIsProcessing(false)
        }
      }
    }

    autoAddArtwork()
  }, [isConnected, address, artwork, hasBeenAdded, isProcessing, toast])

  const handleConnectAndAdd = async () => {
    try {
      // Open the wallet connection modal
      await open({ view: 'Connect' })
      // The useEffect above will handle adding the artwork once connected
    } catch (error) {
      console.error('Error connecting wallet:', error)
      toast({
        title: 'Connection Error',
        description: 'Failed to connect wallet. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
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
          <StarIcon key={i} color={i < rating ? 'yellow.400' : 'gray.500'} boxSize="16px" />
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

  if (isLoading) {
    return (
      <Container maxW="container.md" py={20}>
        <Center>
          <VStack spacing={4}>
            <Spinner size="xl" />
            <Text>Loading shared artwork...</Text>
          </VStack>
        </Center>
      </Container>
    )
  }

  if (error || !artwork) {
    return (
      <Container maxW="container.md" py={20}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Artwork not found!</AlertTitle>
            <AlertDescription>
              {error || "The artwork you're looking for doesn't exist or is no longer available."}
            </AlertDescription>
          </Box>
        </Alert>
        <Center mt={6}>
          <Link href="/">
            <Button colorScheme="blue">Go to Kult</Button>
          </Link>
        </Center>
      </Container>
    )
  }

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Text fontSize="sm" color="gray.400" mb={2}>
            Someone shared this with you on
          </Text>
          <Link href="/">
            <Heading as="h1" size="lg" color="#45a2f8" cursor="pointer">
              Kult
            </Heading>
          </Link>
        </Box>

        <Divider borderColor="whiteAlpha.300" />

        {/* Artwork Card */}
        <Box
          p={8}
          borderWidth="2px"
          borderRadius="xl"
          borderColor="whiteAlpha.300"
          bg="whiteAlpha.100"
          textAlign="center"
        >
          <VStack spacing={4}>
            {/* Title and Author */}
            <VStack spacing={2}>
              <Heading as="h2" size="xl">
                {artwork.name}
              </Heading>
              <Text fontSize="xl" color="gray.300" fontWeight="medium">
                by {artwork.author}
              </Text>
            </VStack>

            {/* Type Badge and Year */}
            <HStack spacing={4} justify="center">
              <Badge
                colorScheme={getTypeColor(artwork.type)}
                px={4}
                py={2}
                borderRadius="full"
                fontSize="sm"
              >
                {artwork.type.charAt(0).toUpperCase() + artwork.type.slice(1)}
              </Badge>
              <Text fontSize="lg" color="gray.400">
                {artwork.publicationYear}
              </Text>
            </HStack>

            {/* Rating */}
            {artwork.rating && <Box>{renderRatingStars(artwork.rating)}</Box>}

            {/* Description */}
            {artwork.description && (
              <Box mt={6} maxW="md">
                <Text fontSize="md" color="gray.300" lineHeight="tall">
                  {artwork.description}
                </Text>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Dynamic Action Section */}
        <Box textAlign="center" pt={4}>
          <VStack spacing={4}>
            {!isConnected ? (
              // Not connected - show connect and add button
              <VStack spacing={3}>
                <Text color="gray.300" fontSize="lg" fontWeight="medium">
                  Add this to your collection!
                </Text>
                <Button
                  leftIcon={<AddIcon />}
                  bg="#8c1c84"
                  color="white"
                  _hover={{ bg: '#6d1566' }}
                  size="lg"
                  px={8}
                  onClick={handleConnectAndAdd}
                >
                  Connect Wallet & Add to Collection
                </Button>
                <Text fontSize="sm" color="gray.400">
                  We&apos;ll automatically add this artwork to your collection once you connect
                </Text>
              </VStack>
            ) : isProcessing ? (
              // Processing - show loading state
              <VStack spacing={3}>
                <Spinner size="lg" />
                <Text color="gray.300">Adding to your collection...</Text>
              </VStack>
            ) : hasBeenAdded ? (
              // Successfully added - show success state
              <VStack spacing={3}>
                <Text color="green.400" fontSize="lg" fontWeight="medium">
                  ✅ Added to your collection!
                </Text>
                <Link href="/">
                  <Button bg="#8c1c84" color="white" _hover={{ bg: '#6d1566' }} size="lg" px={8}>
                    View My Collection
                  </Button>
                </Link>
              </VStack>
            ) : (
              // Connected but something went wrong - show retry option
              <VStack spacing={3}>
                <Text color="gray.400">Ready to add to your collection</Text>
                <Link href="/">
                  <Button bg="#8c1c84" color="white" _hover={{ bg: '#6d1566' }} size="lg" px={8}>
                    Go to My Collection
                  </Button>
                </Link>
              </VStack>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
