'use client';

import { Box, Heading } from '@chakra-ui/react';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <Box
      minH="100vh"
      bg="gray.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg="white" p={8} rounded="lg" shadow="lg" width="md">
        <Heading as="h1" size="lg" textAlign="center" mb={4}>
          Welcome Back
        </Heading>
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
        />
      </Box>
    </Box>
  );
}
