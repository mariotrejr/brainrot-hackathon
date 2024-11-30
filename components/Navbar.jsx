'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Box, Flex, Button, Text, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <Box
      as="header"
      bgGradient="linear(to-r, purple.900, pink.700, orange.600)"
      boxShadow="0 8px 30px rgba(0, 0, 0, 1)"
      p={4}
      position="sticky"
      top={0}
      zIndex={10}
      overflow="hidden"
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto" gap={6}>
        {/* Logo Section */}
        <Flex align="center" gap={4}>
          <motion.div
            animate={{
              rotate: [0, 20, -20, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{ cursor: 'pointer' }}
            onClick={() => router.push('/instructions')} // Navigate to /instructions on click
          >
            <Image
              src="/images/elmoonfire.webp"
              alt="Logo"
              boxSize="70px"
              borderRadius="full"
              boxShadow="0 0 25px rgba(255, 255, 255, 0.9)"
            />
          </motion.div>
          <Text
            fontSize="2xl"
            fontWeight="extrabold"
            fontFamily="'Comic Sans MS', cursive"
            bgGradient="linear(to-r, yellow.400, red.400)"
            bgClip="text"
            animation="textFlash 1.2s infinite"
          >
            We R{' '}
            <motion.span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(to right, red, orange)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Cooked
            </motion.span>
          </Text>
        </Flex>

        {/* Authentication Section */}
        <Flex gap={4} align="center">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                bgGradient="linear(to-r, pink.400, orange.500)"
                fontWeight="bold"
                _hover={{
                  transform: 'scale(1.1)',
                  bgGradient: 'linear(to-r, orange.500, pink.400)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.9)',
                }}
                _active={{
                  transform: 'scale(0.95)',
                }}
              >
                🚀 Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              userProfileMode="modal"
              showName={false}
              size="md"
              border="2px solid white"
              bgGradient="linear(to-r, teal.400, blue.500)"
              _hover={{
                transform: 'scale(1.2)',
                bgGradient: 'linear(to-r, blue.500, teal.400)',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)',
              }}
              _active={{
                transform: 'scale(0.9)',
              }}
            />
          </SignedIn>
        </Flex>
      </Flex>

      {/* Background Animation */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'radial-gradient(circle, rgba(255, 255, 0, 0.3) 10%, transparent 80%)',
        }}
        animate={{
          opacity: [0.9, 0.6, 0.9],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* Neon Line Animation */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '6px',
          background:
            'linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 0, 255, 1), rgba(0, 255, 255, 1), rgba(255, 255, 255, 0.7))',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Keyframe Animations */}
      <style jsx global>{`
        @keyframes textFlash {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}
