'use client';

import { Box, Heading, Text, Button, Flex, VStack } from '@chakra-ui/react';
import { SignedIn, SignedOut, SignUpButton, SignInButton, useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const brainrotMemes = [
  '/images/subway-surfers.gif',
  '/images/don-pollo.jpg', 
  '/images/chillguy.webp',
];

export default function LandingPage() {
  const [memeIndex, setMemeIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // Initialize Audio in the Client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audioInstance = new Audio('/chill-guy-song-made-with-Voicemod.mp3');
      setAudio(audioInstance);

      // Start the audio muted first to test autoplay
      audioInstance.muted = true;
      audioInstance.play().catch((error) => {
        console.warn('Autoplay failed:', error);
      });

      // Replay the audio when it ends
      audioInstance.addEventListener('ended', () => {
        audioInstance.currentTime = 0;
        audioInstance.play().catch((error) => {
          console.warn('Failed to replay audio:', error);
        });
      });

      // Unmute after a brief delay
      setTimeout(() => {
        audioInstance.muted = false;
      }, 500); // Unmute after 500ms to test autoplay

      // Clean up the audio and event listeners on unmount
      return () => {
        audioInstance.pause();
        audioInstance.currentTime = 0;
        audioInstance.removeEventListener('ended', () => {});
      };
    }
  }, []);

  // Rotate memes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMemeIndex((prevIndex) => (prevIndex + 1) % brainrotMemes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Redirect to instructions page if logged in
  useEffect(() => {
    if (isSignedIn) {
      router.push('/instructions');
    }
  }, [isSignedIn, router]);

  return (
    <Box bg="white" color="gray.800" minH="100vh" display="flex" flexDirection="column" py={12} px={6}>
      {/* Main Content */}
      <Flex as="main" flex="1" direction={{ base: 'column', md: 'row' }} align="center" justify="center" gap={8}>
        {/* Left Content: Text Section */}
        <VStack align="start" spacing={6} maxW="lg">
          <Heading
            size="2xl"
            fontWeight="bold"
            fontFamily="'Source Code Pro', monospace"
            bgGradient="linear(to-r, cyan.400, purple.400)"
            bgClip="text"
          >
            We R Cooked
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Welcome to the ultimate challenge for Computer Science students. Apply to as many internships as possible
            while fighting off distractions like memes, viral videos, and brainrot-inducing chaos. Are you ready to
            prove yourself?
          </Text>
          <Text fontSize="md" fontStyle="italic" color="gray.500">
            Join over <strong>1,024</strong> users already battling the chaos.
          </Text>
          <SignedOut>
            <Flex gap={4}>
              <SignUpButton forceRedirectUrl="/instructions">
                <Button
                  colorScheme="cyan"
                  size="lg"
                  fontWeight="bold"
                  _hover={{
                    bg: 'cyan.500',
                  }}
                >
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton forceRedirectUrl="/instructions">
                <Button
                  colorScheme="purple"
                  size="lg"
                  fontWeight="bold"
                  _hover={{
                    bg: 'purple.500',
                  }}
                >
                  Log In Now
                </Button>
              </SignInButton>
            </Flex>
          </SignedOut>
        </VStack>

        {/* Right Content: Rotating Meme Section */}
        <Box
          w={{ base: '100%', md: '400px' }}
          h="500px"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          boxShadow="0 8px 15px rgba(0, 0, 0, 0.2)"
        >
          <AnimatePresence>
            <motion.img
              key={brainrotMemes[memeIndex]} // Dynamically change the key based on the current meme
              src={brainrotMemes[memeIndex]}
              alt={`Meme ${memeIndex}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AnimatePresence>
        </Box>
      </Flex>

      {/* Footer */}
      <Box as="footer" textAlign="center" pt={8}>
        <Text fontSize="sm" color="gray.500">
          © 2024 We R Cooked. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
