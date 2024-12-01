'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { db, auth } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from 'firebase/auth';

const MotionBox = motion(Box);

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, getToken } = useAuth();
  const userRowRef = useRef(null);

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
    if (userId) {
      signIntoFirebase();
    }
  }, [userId]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardRef = collection(db, 'leaderboard');
        const leaderboardQuery = query(leaderboardRef, orderBy('highScore', 'desc'));
        const querySnapshot = await getDocs(leaderboardQuery);

        const leaderboardData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const enrichedLeaderboard = await Promise.all(
          leaderboardData.map(async (entry) => {
            const response = await fetch(`/api/leaderboard?userId=${entry.userId}`);
            const userData = await response.json();

            return {
              ...entry,
              userName: userData.firstName || userData.lastName || 'Unknown User',
              userImage: userData.imageUrl,
            };
          })
        );

        setLeaderboard(enrichedLeaderboard);

        // Scroll to the user's row after leaderboard loads
        setTimeout(() => {
          if (userRowRef.current) {
            userRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLeaderboard();
    }
  }, [userId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        bgGradient="linear(to-br, purple.800, pink.600)"
      >
        <Spinner size="xl" color="white" />
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      p={6}
      bgGradient="radial(at top, purple.900, black)"
      color="white"
      fontFamily="'Comic Sans MS', cursive"
    >
      <MotionBox
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        mb={4}
        textAlign="center"
      >
        <Heading size="2xl" textShadow="2px 2px #ff00ff">
          🏆 The Hall of Legends 🏆
        </Heading>
        <Text fontSize="lg" mt={2}>
          The mightiest Aura Scorers battle for glory!
        </Text>
      </MotionBox>
      <Table variant="simple" size="lg" bg="blackAlpha.700" borderRadius="md" overflow="hidden">
        <Thead bg="purple.600">
          <Tr>
            <Th color="white" textAlign="center">
              Rank
            </Th>
            <Th color="white">Champion</Th>
            <Th color="white" textAlign="center">
              High Score
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderboard.map((entry, index) => (
            <Tr
              key={entry.id}
              ref={entry.userId === userId ? userRowRef : null}
              bg={entry.userId === userId ? 'yellow.600' : index % 2 === 0 ? 'gray.800' : 'gray.700'}
              boxShadow={entry.userId === userId ? '0px 0px 10px rgba(255, 255, 0, 0.8)' : 'none'}
              transition="all 0.3s ease"
            >
              <Td textAlign="center" fontWeight="bold">
                {index + 1}
              </Td>
              <Td>
                <Box display="flex" alignItems="center">
                  <Image
                    src={entry.userImage}
                    alt={entry.userName}
                    boxSize="50px"
                    borderRadius="full"
                    mr={4}
                    border="2px solid white"
                  />
                  <Text>{entry.userName}</Text>
                </Box>
              </Td>
              <Td textAlign="center" fontWeight="bold" color="yellow.300">
                {entry.highScore}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LeaderboardPage;
