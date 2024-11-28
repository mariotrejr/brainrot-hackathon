'use client';

import { Box, Button, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, purple.700, purple.900, black)"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="whiteAlpha.100"
        borderRadius="lg"
        p={10}
        shadow="xl"
        maxW="lg"
        w="full"
        textAlign="center"
      >
        <Heading
          as="h1"
          size="2xl"
          fontWeight="extrabold"
          bgGradient="linear(to-r, purple.300, purple.500)"
          bgClip="text"
          mb={4}
        >
          Welcome to We R Cooked
        </Heading>
        <Text fontSize="lg" color="gray.200" mb={6}>
          Helping computer science students find internships effortlessly.
        </Text>
        <SignedOut>
          <VStack spacing={4}>
            <SignInButton mode="modal">
              <Button
                bg="purple.500"
                _hover={{ bg: 'purple.600' }}
                size="lg"
                borderRadius="full"
                shadow="md"
              >
                Get Started
              </Button>
            </SignInButton>
            <Link href="/sign-up">
              <Button
                bg="teal.400"
                _hover={{ bg: 'teal.500' }}
                size="lg"
                borderRadius="full"
                shadow="md"
              >
                Sign Up
              </Button>
            </Link>
          </VStack>
        </SignedOut>
        <SignedIn>
          <VStack spacing={4}>
            <UserButton />
            <Text color="gray.300">You’re already signed in!</Text>
          </VStack>
        </SignedIn>
      </Flex>
    </Box>
  );
}
