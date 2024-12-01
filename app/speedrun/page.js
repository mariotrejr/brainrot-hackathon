'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  useToast,
  useColorModeValue,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { db, auth } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from 'firebase/auth';
import DinoGame from '../lib/DinoGame'; // Import the new React component
import FAANGTable from '@/components/FaangTable';
import { motion } from 'framer-motion';
import IncomingCall from '../IncomingCall/IncomingCall';

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
    image: '/images/karen.webp',
  },
  {
    name: 'GigaChad',
    message: 'Let’s hit the gym, bro!',
    image: '/images/Gigachad.webp',
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

  const [milliseconds, setMilliseconds] = useState(0);
  const [notification, setNotification] = useState(null);
  const [auraScore, setAuraScore] = useState(0);
  const { userId, getToken } = useAuth();
  const router = useRouter();
  const toast = useToast();

  // Play notification sound
  const playSound = () => {
    const audio = new Audio('/sounds/samsung.mp3');
    audio.play();
  };

  // Show a notification at random intervals
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
      setNotification(randomContact);
      playSound();
      setTimeout(() => setNotification(null), 1500);
    }, 15000);
    return () => clearInterval(notificationInterval);
  }, []);

  const [timeLeft, setTimeLeft] = useState(60); // Start at 30 seconds
const [isRunning, setIsRunning] = useState(true);

useEffect(() => {
  if (isRunning) {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(timer);
          saveScore(); // Save the score when the timer reaches zero
          redirectToEndScreen();
          return 0;
        }
        return prevTimeLeft - 1; // Decrease by 1 second
      });
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clear the interval on component unmount
  }
}, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && milliseconds === 0) {
      setIsRunning(false);
      saveScore();
      redirectToEndScreen();
    }
  }, [timeLeft, milliseconds]);

  // Add background music
  useEffect(() => {
    const audio = new Audio('/sounds/skibidisong.mp3');
    audio.loop = true;
    audio.play().catch((err) => console.warn('Autoplay failed:', err));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Sign into Firebase with Clerk
  const signIntoFirebase = async () => {
    try {
      const token = await getToken({ template: 'integration_firebase' });
      await signInWithCustomToken(auth, token);
      console.log('Signed in to Firebase');
    } catch (error) {
      console.error('Error signing in to Firebase:', error);
    }
  };

  useEffect(() => {
    if (userId) signIntoFirebase();
  }, [userId]);

  // Save score to Firestore
  const saveScore = async () => {
    if (!userId) return;
    try {
      const userRef = doc(db, 'leaderboard', userId);
      const userDoc = await getDoc(userRef);
      const newHighScore = Math.max(auraScore, userDoc.exists() ? userDoc.data().highScore : 0);

      await setDoc(
        userRef,
        {
          userId,
          auraScore,
          highScore: newHighScore,
          timestamp: new Date(),
        },
        { merge: true }
      );

      setHighScore(newHighScore);

      toast({
        title: 'Score Saved!',
        description: `Your Aura Score: ${auraScore}, High Score: ${newHighScore}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      console.error('Error saving score:', err);
    }
  };

  // Redirect to End Screen
  const redirectToEndScreen = () => {
    const queryParams = new URLSearchParams({
      auraScore: auraScore.toString(),
      highScore: highScore.toString(),
    }).toString();

    router.push(`/end-screen?${queryParams}`);
  };

  const getTimerColor = () => {
    if (timeLeft <= 10) return 'red.400';
    if (timeLeft <= 30) return 'orange.400';
    return 'green.400';
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bgGradient="linear(to-br, purple.800, pink.600)" p={6} position="relative">
        {/* Notification */}
       {/* Notification */}
{notification && (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -100, opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      position: 'fixed',
      top: '20px', // Adjusted to top of the screen
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'white',
      padding: '20px 30px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      maxWidth: '90%', // Ensure it doesn't overflow
      width: 'auto', // Adjust width based on content
    }}
  >
    <img
      src={notification.image}
      alt={notification.name}
      style={{
        width: '60px', // Slightly smaller for top placement
        height: '60px',
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
    <Box>
      <Text fontWeight="bold" fontSize="lg">
        {notification.name}
      </Text>
      <Text fontSize="md" color="gray.700">
        {notification.message}
      </Text>
    </Box>
  </motion.div>
)}

<Box
  position="fixed"
  bottom={20}
  right={20}
  background="black"
  padding="20px 40px"
  borderRadius="20px"
  boxShadow="0 0 20px limegreen"
  zIndex={1500}
>
  <Text
    fontSize="6xl"
    fontWeight="extrabold"
    color={getTimerColor()}
    textShadow="0 0 20px rgba(0, 255, 0, 0.9), 0 0 40px limegreen"
  >
    {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
  </Text>
</Box>


        {/* Dashboard Content */}
        <VStack spacing={8} align="stretch">
          <Heading size="2xl" textAlign="center" mb={6} textShadow="2px 2px #ff00ff">
            ⚡ Aura Dashboard ⚡
          </Heading>
          <Heading size="lg" textAlign="center" mb={6}>
            Aura Score: {auraScore} 🌀 
          </Heading>
          <IncomingCall />

          <FAANGTable
  addAuraPoints={(points) => {
    setAuraScore((prev) => prev + points);
    toast({
      title: 'Task Completed!',
      description: `You gained ${points} Aura Points!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  }}
/>


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
