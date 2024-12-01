'use client';

import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function InstructionsPage() {
  const router = useRouter();
  const audioRef = useRef(null);

  useEffect(() => {
    // Play the chicken.mp3 audio on a loop when the component mounts
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error('Audio playback failed:', err));
    }
  }, []);

  return (
    <Box
      bgGradient="linear(to-br, purple.800, pink.600, orange.400)"
      minH="100vh"
      py={12}
      px={6}
      textAlign="center"
      fontFamily="'Comic Sans MS', cursive, sans-serif"
      color="yellow.50"
    >
      {/* Audio Element */}
      <audio ref={audioRef} src="/sounds/chiken.mp3" loop />

      <VStack spacing={8} align="center">
        <Heading
          size="2xl"
          bgClip="text"
          bgGradient="linear(to-l, yellow.300, red.400)"
          textShadow="0px 0px 10px rgba(255, 255, 0, 0.8)"
        >
          🚀 Welcome to Brainrot Speed Run! 💥
        </Heading>
        <Text
          fontSize="xl"
          textShadow="2px 2px 5px rgba(0, 0, 0, 0.6)"
          transform="rotate(-2deg)"
          lineHeight="1.6"
        >
          Your mission, should you accept it, is to **apply to as many internships as humanly 
          possible** before the timer runs out. But beware! The internet is full of distractions, 
          from 🐸 memes to endless cat videos. Stay sharp, intern-seeker!
        </Text>
        <Text
          fontSize="md"
          fontStyle="italic"
          color="purple.200"
          textShadow="1px 1px 3px rgba(0, 0, 0, 0.5)"
        >
          💡 Pro Tip: The more chaotic your focus, the higher your score multiplier!
        </Text>
        <VStack spacing={4}>
          <Button
            colorScheme="pink"
            size="lg"
            px={12}
            py={6}
            fontWeight="bold"
            fontSize="xl"
            borderRadius="full"
            textTransform="uppercase"
            _hover={{
              bgGradient: 'linear(to-r, orange.400, red.400)',
              transform: 'scale(1.1) rotate(5deg)',
              boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)',
            }}
            onClick={() => router.push('/engines')}
          >
            Start the Madness 😈
          </Button>
          <Button
            colorScheme="teal"
            size="lg"
            px={12}
            py={6}
            fontWeight="bold"
            fontSize="xl"
            borderRadius="full"
            textTransform="uppercase"
            _hover={{
              bgGradient: 'linear(to-r, blue.400, green.400)',
              transform: 'scale(1.1) rotate(-5deg)',
              boxShadow: '0px 0px 15px rgba(0, 255, 255, 0.8)',
            }}
            onClick={() => router.push('/brainrot-quiz')}
          >
            Test How Cooked You Are 🤔
          </Button>
          <Button
            colorScheme="yellow"
            size="lg"
            px={12}
            py={6}
            fontWeight="bold"
            fontSize="xl"
            borderRadius="full"
            textTransform="uppercase"
            _hover={{
              bgGradient: 'linear(to-r, yellow.400, orange.400)',
              transform: 'scale(1.1) rotate(3deg)',
              boxShadow: '0px 0px 15px rgba(255, 255, 0, 0.8)',
            }}
            onClick={() => router.push('/leaderboard')}
          >
            View the Leaderboard 🏆
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
