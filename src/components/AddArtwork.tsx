'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  VStack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useAppKitAccount } from '@reown/appkit/react'
import { useTranslation } from '@/hooks/useTranslation'

interface AddArtworkProps {
  isOpen: boolean
  onClose: () => void
  onArtworkAdded: () => void
}

export default function AddArtwork({ isOpen, onClose, onArtworkAdded }: AddArtworkProps) {
  const { address } = useAppKitAccount()
  const toast = useToast()
  const t = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    publicationYear: new Date().getFullYear(),
    type: 'book',
    description: '',
    rating: 5,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/artwork/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          ...formData,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Success!',
          description: data.exists
            ? 'This artwork was already in your collection'
            : 'Artwork added to your collection',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        setFormData({
          name: '',
          author: '',
          publicationYear: new Date().getFullYear(),
          type: 'book',
          description: '',
          rating: 5,
        })

        onClose()
        onArtworkAdded()
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to add artwork',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error adding artwork:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="black" color="white" borderColor="whiteAlpha.300" borderWidth="1px">
        <ModalHeader>Add New Artwork</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  bg="whiteAlpha.100"
                >
                  <option value="book">Book</option>
                  <option value="movie">Movie</option>
                  <option value="music">Music</option>
                  <option value="artwork">Visual Art</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter the title"
                  bg="whiteAlpha.100"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Author/Creator</FormLabel>
                <Input
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Enter the author or creator's name"
                  bg="whiteAlpha.100"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Year</FormLabel>
                <NumberInput
                  min={1000}
                  max={new Date().getFullYear()}
                  value={formData.publicationYear}
                  onChange={(_, val) => handleNumberChange('publicationYear', val)}
                  bg="whiteAlpha.100"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Rating</FormLabel>
                <NumberInput
                  min={1}
                  max={5}
                  value={formData.rating}
                  onChange={(_, val) => handleNumberChange('rating', val)}
                  bg="whiteAlpha.100"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Description/Notes</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add your personal notes about this artwork"
                  bg="whiteAlpha.100"
                  rows={4}
                />
              </FormControl>
            </VStack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bg="#8c1c84"
            color="white"
            _hover={{ bg: '#6d1566' }}
            isLoading={isSubmitting}
            onClick={handleSubmit}
          >
            Add to Collection
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
