'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Box, Flex, Button, Text, IconButton } from '@chakra-ui/react';
import { FaRocket } from 'react-icons/fa';

export default function Navbar() {
  return (
    <Box
      as="header"
      bg="gray.800"
      color="white"
      boxShadow="lg"
      p={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Home"
            icon={<FaRocket />}
            colorScheme="teal"
            variant="solid"
            size="sm"
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily="'Source Code Pro', monospace"
            bgGradient="linear(to-r, cyan.400, purple.400)"
            bgClip="text"
          >
            We R Cooked
          </Text>
        </Flex>

        {/* Authentication Buttons */}
        <Flex gap={4} align="center">
          <SignedOut>
            <SignInButton>
              <Button
                colorScheme="teal"
                variant="solid"
                size="md"
                px={6}
                fontWeight="bold"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                }}
                _active={{
                  transform: 'scale(0.95)',
                }}
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              userProfileMode="modal"
              showName
              size="md"
              border="1px solid teal"
              bg="transparent"
              _hover={{
                bg: 'teal.600',
              }}
              _active={{
                transform: 'scale(0.95)',
              }}
            />
          </SignedIn>
        </Flex>
      </Flex>
    </Box>
  );
}
