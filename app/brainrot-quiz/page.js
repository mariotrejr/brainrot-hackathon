'use client';

import React, { useState } from 'react';
import { Box, Heading, Text, Button, VStack, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const questions = [
    {
      question: 'If you were an NPC, what would your go-to line be?',
      options: [
        'Bruh, you’re lagging.',
        'Can I offer you a quest?',
        'Aggressively glitches in the corner.',
      ],
    },
    {
      question: 'Would you rather survive in:',
      options: [
        'An endless Skibidi Toilet maze.',
        'A glitchy Ohio Waffle House.',
        'A Minecraft Hardcore Ohio server.',
      ],
    },
    {
      question: 'What’s your default reaction when someone says they have more rizz than you?',
      options: [
        'Cap.',
        'Certified mid energy.',
        'You can’t out-rizz the Rizzler.',
      ],
    },
    {
      question: 'What’s your Ohio superpower?',
      options: [
        'Infinite rizz.',
        'The ability to speak fluent NPC.',
        'Being the final boss in a Waffle House fight.',
      ],
    },
    {
      question: 'How unspoken is your rizz?',
      options: ['Peak Sigma.', 'Mid.', 'Just straight lagging.'],
    },
    {
      question: 'What’s the most sus thing you’ve seen in Ohio?',
      options: [
        'A Skibidi Toilet in a cornfield.',
        'A Waffle House that’s too peaceful.',
        'A cameraman asking for directions.',
      ],
    },
    {
      question: 'Would you rather lose all your rizz or your ability to hit Ws forever?',
      options: [
        'Lose all my rizz.',
        'Never hit Ws again.',
        'Neither, I’m built different.',
      ],
    },
    {
      question: 'If you could rename Ohio, what would you call it?',
      options: ['Skibidi HQ.', 'The Land of Rizz.', 'Certified Goofy State.'],
    },
    {
      question: 'Baby Gronk or the Rizzler?',
      options: [
        'Baby Gronk, the next big thing.',
        'The Rizzler, unspoken legend.',
        'Neither, I’m my own GOAT.',
      ],
    },
  ];
  

export default function BrainrotQuizPage() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleAnswerChange = (value, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes('')) {
      alert('Please answer all questions before submitting!');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <Box
      bgGradient="linear(to-br, purple.900, blue.800, cyan.700)"
      minH="100vh"
      py={12}
      px={6}
      textAlign="center"
      fontFamily="'Comic Sans MS', cursive, sans-serif"
      color="yellow.50"
    >
      <VStack spacing={8} align="center">
        {!isSubmitted ? (
          <>
            <Heading
              size="2xl"
              bgClip="text"
              bgGradient="linear(to-l, yellow.300, red.400)"
              textShadow="0px 0px 10px rgba(255, 255, 0, 0.8)"
            >
              Brainrot Quiz 🤯
            </Heading>
            <Text fontSize="xl" textShadow="2px 2px 5px rgba(0, 0, 0, 0.6)">
              Answer the questions below to see how cooked you are!
            </Text>
            <VStack spacing={6} align="stretch" width="100%" maxW="600px">
              {questions.map((q, index) => (
                <Box key={index} p={4} bg="whiteAlpha.200" borderRadius="lg" shadow="lg">
                  <Text fontSize="lg" mb={4}>
                    {q.question}
                  </Text>
                  <RadioGroup
                    onChange={(value) => handleAnswerChange(value, index)}
                    value={answers[index]}
                  >
                    <Stack spacing={4}>
                      {q.options.map((option, idx) => (
                        <Radio
                          key={idx}
                          value={option}
                          colorScheme="purple"
                          _hover={{ transform: 'scale(1.1)' }}
                        >
                          {option}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </Box>
              ))}
            </VStack>
            <Button
              colorScheme="pink"
              size="lg"
              mt={8}
              onClick={handleSubmit}
              px={12}
              py={6}
              fontWeight="bold"
              fontSize="xl"
              borderRadius="full"
              textTransform="uppercase"
              _hover={{
                bgGradient: 'linear(to-r, orange.400, red.400)',
                transform: 'scale(1.1)',
                boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.8)',
              }}
            >
              Submit Quiz
            </Button>
          </>
        ) : (
          <>
            <Heading
              size="2xl"
              bgClip="text"
              bgGradient="linear(to-l, red.400, yellow.300)"
              textShadow="0px 0px 10px rgba(255, 255, 0, 0.8)"
            >
              You Are Cooked! 🔥
            </Heading>
            <Text fontSize="lg" mt={4} textShadow="2px 2px 5px rgba(0, 0, 0, 0.6)">
              Congratulations, you’ve achieved peak brainrot levels.
            </Text>
            <Button
              colorScheme="teal"
              size="lg"
              mt={8}
              onClick={() => router.push('/instructions')}
              px={12}
              py={6}
              fontWeight="bold"
              fontSize="xl"
              borderRadius="full"
              textTransform="uppercase"
              _hover={{
                bgGradient: 'linear(to-r, blue.400, green.400)',
                transform: 'scale(1.1)',
                boxShadow: '0px 0px 15px rgba(0, 255, 255, 0.8)',
              }}
            >
              Back to home
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
}
