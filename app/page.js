'use client';

import { Box, Heading, Text, Button, Image, Flex } from '@chakra-ui/react';
import { SignedIn, SignedOut, UserButton, SignUpButton, SignInButton, useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const brainrotMemes = [
  '/images/subway-surfers.gif', // Replace with actual image paths
  '/images/don-pollo.jpg',
  '/images/chillguy.webp',
];

export default function LandingPage() {
  const [memeIndex, setMemeIndex] = useState(0);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // Rotate memes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMemeIndex((prevIndex) => (prevIndex + 1) % brainrotMemes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

  return (
    <Box
      bg="linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)"
      color="white"
      minH="100vh"
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >
<IncomingCall />

      {/* Background Animation */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={0}
        opacity={0.1}
        backgroundImage="url('/images/matrix-code.png')" // Replace with a matrix-like background image
        backgroundRepeat="repeat"
        backgroundSize="cover"
      />

      {/* Main Content */}
      <Flex
        as="main"
        flex="1"
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={4}
        zIndex={1}
      >
        {/* Header */}
        <Heading
          size="4xl"
          fontWeight="bold"
          mb={4}
          style={{
            fontFamily: "'Source Code Pro', monospace",
            textShadow: '0 4px 10px rgba(255, 255, 255, 0.2)',
          }}
        >
          We R{' '}
          <span
            style={{
              background: 'linear-gradient(to right, cyan, purple)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Cooked
          </span>
        </Heading>

        {/* Rotating Meme Section */}
        <Box
          w="400px"
          h="500px"
          borderRadius="lg"
          overflow="hidden"
          mb={6}
          position="relative"
          boxShadow="0 8px 15px rgba(0, 255, 255, 0.2)"
        >
          <AnimatePresence>
            <motion.div
              key={memeIndex}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src={brainrotMemes[memeIndex]}
                alt="Brainrot meme"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Fun Counter */}
        <Text fontSize="xl" mb={6} fontFamily="'Source Code Pro', monospace">
          Over <strong>1,024</strong> users have joined the Brainrot Speed Run!
        </Text>

        {/* Call-to-Action Buttons */}
        <SignedOut>
          <Flex gap={4}>
            <SignUpButton mode="modal">
              <Button
                bgGradient="linear(to-r, cyan.400, blue.400)"
                color="white"
                _hover={{
                  bgGradient: 'linear(to-r, blue.400, cyan.400)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                }}
                _active={{
                  transform: 'scale(0.95)',
                }}
                size="lg"
                borderRadius="full"
                px={6}
                py={4}
                fontWeight="bold"
              >
                Get Started
              </Button>
            </SignUpButton>

            <SignInButton mode="modal">
              <Button
                bgGradient="linear(to-r, purple.400, pink.400)"
                color="white"
                _hover={{
                  bgGradient: 'linear(to-r, pink.400, purple.400)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                }}
                _active={{
                  transform: 'scale(0.95)',
                }}
                size="lg"
                borderRadius="full"
                px={6}
                py={4}
                fontWeight="bold"
              >
                Log In Now
              </Button>
            </SignInButton>
          </Flex>
        </SignedOut>

        <SignedIn>
          <Flex direction="column" alignItems="center" gap={4}>
            <UserButton />
            <Button
              mt={4}
              bgGradient="linear(to-r, green.400, teal.400)"
              color="white"
              _hover={{
                bgGradient: 'linear(to-r, teal.400, green.400)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out',
              }}
              _active={{
                transform: 'scale(0.95)',
              }}
              size="lg"
              borderRadius="full"
              px={6}
              py={4}
              fontWeight="bold"
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </Flex>
        </SignedIn>
      </Flex>

      {/* Footer */}
      <Box as="footer" p={4} textAlign="center" zIndex={1}>
        <Text fontSize="sm" fontFamily="'Source Code Pro', monospace">
          © 2024 We R Cooked. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
