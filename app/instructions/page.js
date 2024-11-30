'use client';

import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function InstructionsPage() {
  const router = useRouter();

  return (
    <Box bg="white" minH="100vh" py={12} px={6} textAlign="center">
      <VStack spacing={8} align="center">
        <Heading size="2xl" color="gray.800">
          Welcome to Brainrot Speed Run
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Your goal is to apply to as many internships as possible within the time limit. 
          Watch out for distractions like memes, viral videos, and other brainrot-inducing 
          content. Can you beat the odds and secure your dream internship?
        </Text>
        <Text fontSize="md" fontStyle="italic" color="gray.500">
          Pro Tip: Stay focused and manage your time wisely!
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => router.push('/dashboard')}
        >
          Start Brainrot Speed Run
        </Button>
      </VStack>
    </Box>
  );
}
