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
  Flex,
  Text,
} from '@chakra-ui/react';
import IncomingCall from '../IncomingCall/IncomingCall';
import FAANGTable from '@/components/FaangTable';

const DashboardPage = () => {
  const [timeLeft, setTimeLeft] = useState(120); // Timer starts at 120 seconds (2 minutes)
  const [milliseconds, setMilliseconds] = useState(0); // Track milliseconds
  const [isRunning, setIsRunning] = useState(true); // Timer running state

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

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const tableColor = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" bg={bgColor} py={12} px={6}>
      {/* Timer Section */}
      <IncomingCall />
      <Flex justify="center" align="center" mb={8} direction="column">
        <Text
          fontSize="6xl"
          fontWeight="bold"
          color="green.400"
          fontFamily="monospace"
          textShadow="0 0 10px green, 0 0 20px limegreen"
        >
          {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}.${String(
            milliseconds
          ).padStart(2, '0')}`}
        </Text>
        <Heading size="md" mt={4}>
          Speedrun Timer
        </Heading>
      </Flex>

      {/* Page Heading */}
      <Box textAlign="center" mb={12}>
        <Heading size="2xl" mb={4} color="gray.700" fontFamily="'Source Code Pro', monospace">
          Internship Dashboard
        </Heading>
        <Text fontSize="lg" color="gray.500">
          Browse and apply to top internships.
        </Text>
      </Box>

      {/* Dashboard Content */}
      <VStack spacing={8} align="stretch">
        <Box bg={tableColor} shadow="lg" borderRadius="lg" p={6} overflowX="auto">
          <Heading as="h2" size="lg" mb={6}>
            Available Internships
          </Heading>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Company</Th>
                <Th>Position</Th>
                <Th>Location</Th>
                <Th>Deadline</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Example data */}
              {[
                { id: 1, company: 'Google', position: 'Software Intern', location: 'CA', deadline: '2024-12-15' },
                { id: 2, company: 'Microsoft', position: 'Backend Intern', location: 'WA', deadline: '2024-12-20' },
              ].map((item) => (
                <Tr key={item.id}>
                  <Td>{item.company}</Td>
                  <Td>{item.position}</Td>
                  <Td>{item.location}</Td>
                  <Td>{item.deadline}</Td>
                  <Td>
                    <Button colorScheme="teal" size="sm">
                      Apply
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
      <VStack>
        <FAANGTable/>
      </VStack>
    </Box>
  );
};

export default DashboardPage;
