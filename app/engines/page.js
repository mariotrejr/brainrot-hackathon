'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, VStack, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const PreSpeedrunPage = () => {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  // Timer to show the "Let's Goooo" button
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 18000); // Show button after 18 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      bgGradient="radial(at top, black, purple.900)"
      color="white"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      fontFamily="'Comic Sans MS', cursive"
      px={6}
    >
      <VStack spacing={8}>
        {/* Video Container */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          boxShadow="0 0 20px rgba(255, 0, 0, 0.9)"
          borderRadius="md"
          overflow="hidden"
        >
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Vfcp_Ahh-tY?autoplay=1&start=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </MotionBox>

        {/* Headline */}
        <MotionBox
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Heading size="2xl" bgClip="text" bgGradient="linear(to-r, yellow.400, pink.400)">
            ⚡ Get Ready to Cook! ⚡
          </Heading>
          <Text mt={4} fontSize="lg">
            Watch the hype video before diving into the speedrun madness.
          </Text>
        </MotionBox>

        {/* Let's Goooo Button */}
        {showButton && (
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            mt={4}
          >
            <Button
              size="lg"
              px={8}
              py={6}
              fontWeight="bold"
              textTransform="uppercase"
              bgGradient="linear(to-r, purple.400, pink.400)"
              _hover={{
                bgGradient: 'linear(to-r, pink.400, purple.400)',
                transform: 'scale(1.1)',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
              }}
              onClick={() => router.push('/speedrun')}
            >
              Let&apos;s Goooo 🚀
            </Button>
          </MotionBox>
        )}
      </VStack>
    </Box>
  );
};

export default PreSpeedrunPage;
