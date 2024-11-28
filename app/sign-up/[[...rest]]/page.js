'use client';

import { Box, Heading, VStack } from '@chakra-ui/react';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, purple.800, black)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
    >
      <VStack spacing={6} p={8} bg="white" borderRadius="lg" shadow="lg">
        <Heading as="h1" size="lg" color="black">
          Create Your Account
        </Heading>
        <Box w="100%">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            afterSignUpUrl="/dashboard"
          />
        </Box>
      </VStack>
    </Box>
  );
}
