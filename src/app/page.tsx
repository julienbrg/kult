'use client'

import {
  Container,
  Text,
  useToast,
  Button,
  Tooltip,
  Box,
  VStack,
  Heading,
  Divider,
} from '@chakra-ui/react'
import { useAppKitAccount, useAppKitNetwork, useAppKitProvider } from '@reown/appkit/react'
import { BrowserProvider, parseEther, formatEther } from 'ethers'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import ArtworkList from '@/components/ArtworkList'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [userStatus, setUserStatus] = useState<{ exists: boolean; paying?: boolean } | null>(null)
  const [checkingStatus, setCheckingStatus] = useState(false)
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')
  const toast = useToast()
  const t = useTranslation()

  // Create user function
  const createUser = async () => {
    if (!address) return

    setIsCreatingUser(true)
    try {
      const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: address }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Welcome!',
          description: 'Your account has been created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        // Update the user status after creation
        setUserStatus({ exists: true, paying: false })
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to create user account.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error creating user:', error)
      toast({
        title: 'Error',
        description: 'Failed to create user account. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsCreatingUser(false)
    }
  }

  useEffect(() => {
    const checkUserStatus = async () => {
      if (address) {
        setCheckingStatus(true)
        try {
          console.log('useEffect address:', address)
          const response = await fetch(`/api/user/check?address=${address}`)
          const data = await response.json()
          setUserStatus(data)

          if (data && !data.exists) {
            await createUser()
          }
        } catch (error) {
          console.error('Error checking user status:', error)
          setUserStatus(null)
        } finally {
          setCheckingStatus(false)
        }
      } else {
        setUserStatus(null)
      }
    }

    if (isConnected) {
      checkUserStatus()
    }
  }, [address, isConnected])

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* <Box>
          <Heading as="h1" size="xl" mb={2}>
            Kult
          </Heading>
          <Text fontSize="lg" color="gray.400">
            Store the books, movies and artworks you loved!
          </Text>
          <Divider my={4} borderColor="whiteAlpha.300" />
        </Box> */}

        {isConnected && userStatus?.exists ? (
          <ArtworkList />
        ) : !isConnected ? (
          <Box
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            borderColor="whiteAlpha.300"
            bg="whiteAlpha.100"
            textAlign="center"
          >
            <Text fontSize="lg" mb={4}>
              Please login
            </Text>
          </Box>
        ) : null}
      </VStack>
    </Container>
  )
}
