'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue,
  Text,
  extendTheme,
  ChakraProvider,
} from '@chakra-ui/react';
import IncomingCall from '../IncomingCall/IncomingCall';
import FAANGTable from '@/components/FAANGTable';
import { motion } from 'framer-motion';
import DinoGame from "../lib/DinoGame"; // Import the new React component

const contacts = [
  {
    name: 'FreakBob',
    message: 'I miss you ❤️',
    image: '/images/freakbob.jpg',
  },
  {
    name: 'John Pork',
    message: 'Can you please give me my kids back?',
    image: '/images/johnpork.jpeg',
  },
  {
    name: 'Karen',
    message: 'I need to speak to your manager.',
    image: '/images/karen.png',
  },
  {
    name: 'Chad',
    message: 'Let’s hit the gym, bro!',
    image: '/images/chad.png',
  },
];

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
      },
    },
  },
});

const DashboardPage = () => {
  const [timeLeft, setTimeLeft] = useState(120); // Timer starts at 120 seconds (2 minutes)
  const [milliseconds, setMilliseconds] = useState(0); // Track milliseconds
  const [isRunning, setIsRunning] = useState(true); // Timer running state
  const [notification, setNotification] = useState(null); // Current notification

  // Play notification sound
  const playSound = () => {
    const audio = new Audio('/sounds/samsung.mp3'); // Add a notification sound file
    audio.play();
  };

  // Show a notification at random intervals
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const randomContact =
        contacts[Math.floor(Math.random() * contacts.length)];
      setNotification(randomContact);
      playSound();
      setTimeout(() => setNotification(null), 4000); // Hide after 4 seconds
    }, 15000); // Show every 15 seconds
    return () => clearInterval(notificationInterval);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setMilliseconds((prev) => {
          if (prev === 99) {
            setTimeLeft((time) => time - 1);
            return 0;
          }
          return prev + 1;
        });
      }, 10); // Millisecond precision
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && milliseconds === 0) {
      setIsRunning(false); // Stop the timer
      alert('Time is up! The speedrun has ended.');
    }
  }, [timeLeft, milliseconds]);

  // Add background music
  useEffect(() => {
    const audio = new Audio('/sounds/skibidisong.mp3'); // Update to your correct path
    audio.loop = true; // Loop the audio
    audio.play().catch((err) => console.warn('Autoplay failed:', err));

    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset the audio on component unmount
    };
  }, []);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const tableColor = useColorModeValue('white', 'gray.800');

  // Determine timer color based on time left
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'red.400'; // Critical zone
    if (timeLeft <= 30) return 'orange.400'; // Warning zone
    return 'green.400'; // Safe zone
  };

  const getTextShadow = () => {
    if (timeLeft <= 10) return '0 0 15px red, 0 0 30px crimson';
    if (timeLeft <= 30) return '0 0 10px orange, 0 0 20px gold';
    return '0 0 10px green, 0 0 20px limegreen';
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={bgColor} py={12} px={6} position="relative">
        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              width: '90%',
              maxWidth: '600px',
              background: 'white',
              padding: '20px 30px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
            }}
          >
            <img
              src={notification.image}
              alt={notification.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <Box>
              <Text fontWeight="bold" fontSize="xl">
                {notification.name}
              </Text>
              <Text fontSize="lg" color="gray.700">
                {notification.message}
              </Text>
            </Box>
          </motion.div>
        )}

        {/* Fixed Timer */}
        <Box
          position="fixed"
          bottom={20}
          right={20}
          background="black"
          padding="10px 20px"
          borderRadius="10px"
          boxShadow="0 0 15px limegreen"
          zIndex={1000}
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color={getTimerColor()}
            textShadow={getTextShadow()}
          >
            {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}.${String(
              milliseconds
            ).padStart(2, '0')}`}
          </Text>
        </Box>

        {/* Dashboard Content */}
        <VStack spacing={8} align="stretch">
          <FAANGTable/>

          {/* DinoGame Section */}
          <Box
            position="fixed"
            bottom="20px"
            left="20px"
            width="300px"
            height="200px"
            bg="white"
            borderRadius="lg"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={2}
          >
            <DinoGame />
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default DashboardPage;

