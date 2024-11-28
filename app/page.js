'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  RadioGroup,
  Radio,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function LandingPage() {
  const bgColor = useColorModeValue('gray.900', 'black');
  const cardColor = useColorModeValue('gray.800', 'gray.700');
  const textColor = useColorModeValue('white', 'whiteAlpha.900');

  return (
    <Box bg={bgColor} minH="100vh" py={10} px={6} color={textColor}>
      {/* Navbar */}
      <Box bg="gray.800" w="full" py={4} px={8} shadow="sm">
        <HStack justify="space-between" align="center" maxW="6xl" mx="auto">
          <Heading size="md" fontWeight="bold" color="whiteAlpha.900">
            We R Cooked
          </Heading>
          <SignedIn>
            <UserButton showName={false} />
          </SignedIn>
          <SignedOut>
            <Button
              size="sm"
              colorScheme="teal"
              variant="outline"
              _hover={{ bg: 'teal.700' }}
              onClick={() => window.location.replace('/sign-in')}
            >
              Log In
            </Button>
          </SignedOut>
        </HStack>
      </Box>

      {/* Content */}
      <Box maxW="6xl" mx="auto" py={16}>
        <SignedIn>
          {/* Signed-In Content */}
          <VStack spacing={12} align="center">
            {/* Hero Section */}
            <VStack textAlign="center" spacing={6}>
              <Heading
                size="2xl"
                fontWeight="bold"
                lineHeight="short"
                color="whiteAlpha.900"
              >
                We R Cooked
              </Heading>
              <Text fontSize="lg" maxW="lg" color="gray.400">
                It might be too late for you... but there's still time to apply for internships and laugh at memes while you’re at it.
              </Text>
            </VStack>

            {/* Filters Section */}
            <RadioGroup defaultValue="Internships">
              <HStack spacing={4}>
                <Radio value="Internships" colorScheme="purple">
                  Internships
                </Radio>
                <Radio value="Memes" colorScheme="purple">
                  Memes
                </Radio>
                <Radio value="Both" colorScheme="purple">
                  Both
                </Radio>
              </HStack>
            </RadioGroup>

            <Divider borderColor="gray.600" />

            {/* Featured Content Section */}
            <HStack align="start" spacing={12} w="full" justify="space-between">
              {/* Left Content */}
              <VStack align="start" spacing={4} flex="1">
                <Heading size="lg" fontWeight="semibold">
                  Apply Before It’s Too Late
                </Heading>
                <Box
                  as="img"
                  src="https://via.placeholder.com/600x300" // Replace with an actual app or meme image
                  alt="Internships and Memes"
                  borderRadius="lg"
                  shadow="lg"
                />
                <Text fontSize="sm" color="gray.400">
                  Find curated internships for computer science students and enjoy
                  the freshest tech memes to lighten the stress.
                </Text>
              </VStack>

              {/* Right Content */}
              <Box
                bg={cardColor}
                p={6}
                borderRadius="md"
                shadow="md"
                flex="1"
                maxW="sm"
              >
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  color="teal.300"
                  fontWeight="bold"
                  mb={2}
                >
                  Why Use We R Cooked?
                </Text>
                <Heading size="sm" mb={4}>
                  Save Yourself (Maybe)
                </Heading>
                <Text fontSize="sm" color="gray.300" mb={2}>
                  - Get tailored internship listings for computer science students.
                </Text>
                <Text fontSize="sm" color="gray.300" mb={2}>
                  - Laugh out loud with the funniest programming memes.
                </Text>
                <Text fontSize="sm" color="gray.300">
                  - Join a community of students navigating the chaos of tech.
                </Text>
              </Box>
            </HStack>
          </VStack>
        </SignedIn>

        <SignedOut>
          {/* Signed-Out Content */}
          <VStack spacing={12} align="center">
            {/* Hero Section */}
            <VStack textAlign="center" spacing={6}>
              <Heading
                size="2xl"
                fontWeight="bold"
                lineHeight="short"
                color="whiteAlpha.900"
              >
                We R Cooked
              </Heading>
              <Text fontSize="lg" maxW="lg" color="gray.400">
                Don’t let it be too late for you. Sign in to start applying for internships and enjoying the best tech memes!
              </Text>
            </VStack>

            {/* Call to Action */}
            <Button
              size="lg"
              colorScheme="teal"
              mt={6}
              onClick={() => window.location.replace('/sign-in')}
            >
              Log In Now
            </Button>
          </VStack>
        </SignedOut>
      </Box>
    </Box>
  );
}
