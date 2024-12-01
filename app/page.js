'use client';

import { Box, Heading, Text, Button, VStack, Flex, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from '@chakra-ui/react';
import { SignedIn, SignedOut, SignUpButton, SignInButton, useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const rejectionEmails = [
  '/images/rejection1.webp',
  '/images/rejection2.jpg',
];

export default function LandingPage() {
  const [imageIndex, setImageIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Initialize audio instance but do not play it until user interacts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audioInstance = new Audio('/chill-guy-song-made-with-Voicemod.mp3');
      audioInstance.loop = true;
      setAudio(audioInstance);
    }
  }, []);

  // Rotate rejection emails every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % rejectionEmails.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Redirect to instructions page if logged in
  useEffect(() => {
    if (isSignedIn) {
      router.push('/instructions');
    }
  }, [isSignedIn, router]);

  // Open the sound enable modal on page load
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleEnableSound = () => {
    if (audio) {
      audio.play().catch(() => console.log('User interaction required to play audio.'));
    }
    onClose();
  };

  return (
    <Box
      bgGradient="linear(to-r, #ff007f, #ff8c00, #ffd700, #00ff7f, #00ffff, #8a2be2)"
      bgSize="200% 200%"
      animation="gradientAnimation 5s ease infinite"
      color="white"
      minH="100vh"
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
      py={12}
      px={6}
      fontFamily="'Comic Sans MS', 'Comic Sans', cursive"
    >
      {/* Modal for enabling sound */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            py={6}
          >
            <Heading size="md" mb={4}>
              Enable Sound
            </Heading>
            <Text mb={6}>
              Click below to enable sound and enjoy the full experience!
            </Text>
            <Button
              onClick={handleEnableSound}
              bgGradient="linear(to-r, green.400, teal.400)"
              color="white"
              _hover={{
                bgGradient: 'linear(to-r, teal.400, green.400)',
                transform: 'scale(1.1)',
              }}
            >
              Enable Sound
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Fixed Crying Guy GIF Above Subway Surfers */}
      <motion.img
        src="/images/cryingguy.gif"
        alt="Crying Guy"
        style={{
          position: 'fixed',
          bottom: '200px',
          right: '20px',
          width: '150px',
          height: 'auto',
          zIndex: 1001,
        }}
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />

      {/* Fixed Subway Surfer GIF */}
      <img
        src="/images/subway-surfers.gif"
        alt="Subway Surfer"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '150px',
          height: 'auto',
          zIndex: 1000,
        }}
      />

      {/* Stacked Gifs on Bottom-Left Corner */}
      <Box
        position="fixed"
        bottom="20px"
        left="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="10px"
        zIndex={1000}
      >
        <motion.img
          src="/images/spongebob-dancing.gif"
          alt="Spongebob Dancing"
          style={{
            width: '120px',
            height: 'auto',
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
        <motion.img
          src="/images/donpollolight.gif"
          alt="Don Pollo Light"
          style={{
            width: '120px',
            height: 'auto',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      </Box>

      {/* Main Content */}
      <VStack spacing={6} textAlign="center" zIndex={1}>
        <Heading
          size="2xl"
          fontWeight="bold"
          fontFamily="'Comic Sans MS', 'Comic Sans', cursive"
        >
          We R{' '}
          <motion.span
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, orange, red)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            Cooked
          </motion.span>
        </Heading>
        <Text
          fontSize="lg"
          color="white"
          transform="rotate(-5deg)"
          textShadow="2px 2px 5px rgba(0, 0, 0, 0.6)"
        >
          Welcome to the ultimate challenge for Computer Science students. Apply to as many internships as possible
          while fighting off distractions like memes, viral videos, and brainrot-inducing chaos. Are you ready to
          prove yourself?
        </Text>
        <Text fontSize="md" fontStyle="italic" color="whiteAlpha.800">
          Join over <strong>1,024</strong> users already battling the chaos.
        </Text>
        <SignedOut>
          <Flex gap={4}>
            <SignUpButton mode="modal">
              <Button
                bgGradient="linear(to-r, cyan.400, purple.400)"
                size="lg"
                fontWeight="bold"
                _hover={{
                  bgGradient: 'linear(to-r, purple.400, cyan.400)',
                  transform: 'scale(1.1)',
                }}
              >
                Get Started
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button
                bgGradient="linear(to-r, orange.400, red.400)"
                size="lg"
                fontWeight="bold"
                _hover={{
                  bgGradient: 'linear(to-r, red.400, orange.400)',
                  transform: 'scale(1.1)',
                }}
              >
                Log In Now
              </Button>
            </SignInButton>
          </Flex>
        </SignedOut>
      </VStack>

      {/* Rejection Emails Section */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        transform="rotate(-10deg)"
        textShadow="2px 2px 5px rgba(0, 0, 0, 0.5)"
        color="red.300"
      >
        This is you! 🥲
      </Text>
      <Box
        w="90%"
        maxW="1200px"
        mx="auto"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        boxShadow="0 8px 15px rgba(0, 0, 0, 0.5)"
        bg="whiteAlpha.200"
        p={4}
      >
        <AnimatePresence>
          <motion.img
            key={rejectionEmails[imageIndex]}
            src={rejectionEmails[imageIndex]}
            alt={`Rejection Email ${imageIndex}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
            }}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          />
        </AnimatePresence>
      </Box>

      {/* Footer */}
      <Box as="footer" textAlign="center" pt={8} zIndex={1}>
        <Text fontSize="sm" color="whiteAlpha.800">
          © 2024 We R Cooked. All rights reserved.
        </Text>
      </Box>

      {/* Keyframe Animations */}
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Box>
  );
}
