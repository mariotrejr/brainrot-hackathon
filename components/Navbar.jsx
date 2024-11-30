'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Box, Flex, Button } from '@chakra-ui/react';

export default function Navbar() { // Ensure "default" export is used here
  return (
    <Box
      as="header"
      bgGradient="linear(to-r, cyan.500, purple.600)"
      color="white"
      boxShadow="md"
      p={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <Box fontSize="lg" fontWeight="bold" fontFamily="'Source Code Pro', monospace">
          We R{' '}
          <span
            style={{
              background: 'linear-gradient(to right, white, yellow)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Cooked
          </span>
        </Box>

        {/* Authentication Buttons */}
        <Flex gap={4}>
          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                colorScheme="teal"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.2)',
                }}
                size="sm"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Flex>
      </Flex>
    </Box>
  );
}
