'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Heading, Text, Button, VStack, Image, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { db, auth } from '../../firebase'; // Adjust the import based on your project structure
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from 'firebase/auth';

const MotionBox = motion(Box);

const EndScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auraScore = searchParams.get('auraScore') || 0;
  const [highScore, setHighScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId, getToken } = useAuth();

  // Sign into Firebase
  const signIntoFirebase = async () => {
    try {
      const token = await getToken({ template: 'integration_firebase' });
      await signInWithCustomToken(auth, token);
      console.log('Signed in to Firebase');
    } catch (error) {
      console.error('Error signing into Firebase:', error);
    }
  };

  // Fetch High Score from Firestore
  useEffect(() => {
    const fetchHighScore = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        await signIntoFirebase(); // Authenticate user before fetching data
        const userRef = doc(db, 'leaderboard', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setHighScore(userData.highScore || 0);
        } else {
          setHighScore(0);
        }
      } catch (error) {
        console.error('Error fetching high score:', error);
        setHighScore(0);
      } finally {
        setLoading(false);
      }
    };

    fetchHighScore();
  }, [userId]);

  if (loading) {
    return (
      <Box
        bgGradient="linear(to-br, black, purple.900)"
        color="white"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4} textAlign="center">
          <Spinner size="xl" color="pink.400" />
          <Text fontSize="lg" mt={4}>
            Fetching your Aura Score...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      bgGradient="linear(to-br, black, purple.900)"
      color="white"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      fontFamily="'Comic Sans MS', cursive"
    >
      <VStack spacing={8}>
        {/* Aura Score Display */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          bg="blackAlpha.800"
          p={6}
          borderRadius="md"
          boxShadow="0 0 20px rgba(255, 0, 255, 0.7)"
        >
          <Heading size="2xl" bgClip="text" bgGradient="linear(to-r, pink.400, orange.400)">
            🌟 Your Aura Score: {auraScore} 🌀
          </Heading>
          <Text fontSize="lg" mt={2}>
            High Score: {highScore} 🌟
          </Text>
        </MotionBox>

        {/* Motivational(?) Message */}
        <MotionBox
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          px={4}
        >
          <Heading size="lg" textShadow="1px 1px #ff00ff" mb={4}>
            🤡 You're still cooked, buddy. 🤡
          </Heading>
          <Text fontSize="xl" fontStyle="italic">
            We both know you’re getting rejected anyway, but hey, great hustle! 👏
          </Text>
        </MotionBox>

        {/* Redirect Buttons */}
        <VStack spacing={4}>
          <Button
            colorScheme="pink"
            size="lg"
            px={8}
            py={6}
            fontWeight="bold"
            textTransform="uppercase"
            bgGradient="linear(to-r, purple.500, pink.400)"
            _hover={{
              bgGradient: 'linear(to-r, pink.400, purple.500)',
              transform: 'scale(1.1)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
            }}
            onClick={() => router.push('/leaderboard')}
          >
            See Where You Rank 🏆
          </Button>
          <Button
            colorScheme="teal"
            size="lg"
            px={8}
            py={6}
            fontWeight="bold"
            textTransform="uppercase"
            bgGradient="linear(to-r, blue.400, green.400)"
            _hover={{
              bgGradient: 'linear(to-r, green.400, blue.400)',
              transform: 'scale(1.1)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
            }}
            onClick={() => router.push('/speedrun')}
          >
            Try Again? 🔁
          </Button>
        </VStack>

        {/* Funny Image */}
        <MotionBox
          mt={8}
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 10, scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
        >
          <Image
            src="/images/elmoonfire.webp"
            alt="Cooked Avatar"
            boxSize="120px"
            borderRadius="full"
            boxShadow="0 0 20px rgba(255, 0, 255, 0.8)"
          />
        </MotionBox>
      </VStack>
    </Box>
  );
};

export default EndScreen;
