'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { db, auth } from '../../firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from 'firebase/auth';

const DashboardPage = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [auraScore, setAuraScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { userId, getToken } = useAuth();
  const router = useRouter();
  const toast = useToast();

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          if (prevMilliseconds === 99) {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            return 0;
          }
          return prevMilliseconds + 1;
        });
      }, 10);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && milliseconds === 0) {
      setIsRunning(false);
      saveScore();
      redirectToEndScreen();
    }
  }, [timeLeft, milliseconds]);

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

  const handleApply = (url) => {
    toast({
      title: 'Application Sent!',
      description: 'Good luck! Aura Points +100',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    window.open(url, '_blank');
  };

  const handleDone = () => {
    toast({
      title: 'Task Completed!',
      description: 'Aura Points +100',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    setAuraScore((prev) => prev + 100);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, purple.800, pink.600)"
      color="white"
      p={6}
      fontFamily="'Comic Sans MS', cursive"
    >
      {/* Timer Display */}
      <Box
        position="fixed"
        top={4}
        left={4}
        bg="blackAlpha.800"
        color="yellow.300"
        px={4}
        py={2}
        borderRadius="md"
        fontSize="lg"
        zIndex={1000}
        boxShadow="0 0 10px #fff"
      >
        Timer: {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}.${String(
          milliseconds
        ).padStart(2, '0')}`}
      </Box>

      <Heading size="2xl" textAlign="center" mb={8} textShadow="2px 2px #ff00ff">
        ⚡ Aura Dashboard ⚡
      </Heading>
      <Heading size="lg" textAlign="center" mb={6}>
        Aura Score: {auraScore} 🌀 | High Score: {highScore} 🌟
      </Heading>

      <Table variant="simple" bg="blackAlpha.700" borderRadius="md" overflow="hidden" color="white">
        <Thead bg="purple.900">
          <Tr>
            <Th color="white" textAlign="center">
              Company
            </Th>
            <Th color="white">Position</Th>
            <Th color="white" textAlign="center">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[{ company: 'Google', position: 'Intern', link: 'https://google.com' }].map((job, idx) => (
            <Tr key={idx}>
              <Td textAlign="center" fontWeight="bold">
                {job.company}
              </Td>
              <Td>{job.position}</Td>
              <Td textAlign="center">
                <Button colorScheme="yellow" size="sm" onClick={() => handleApply(job.link)} mr={2}>
                  Apply 🚀
                </Button>
                <Button colorScheme="green" size="sm" onClick={handleDone}>
                  Done ✅
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DashboardPage;
