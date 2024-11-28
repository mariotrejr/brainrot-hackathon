'use client';
import { withAuth } from "@clerk/nextjs";
import React from 'react';
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
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

const DashboardPage = () => {
  // Mock data for internships
  const internships = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineering Intern',
      location: 'Mountain View, CA',
      deadline: '2024-12-15',
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Backend Developer Intern',
      location: 'Redmond, WA',
      deadline: '2024-12-20',
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Cloud Solutions Intern',
      location: 'Seattle, WA',
      deadline: '2024-12-10',
    },
    {
      id: 4,
      company: 'Meta',
      position: 'Frontend Engineer Intern',
      location: 'Menlo Park, CA',
      deadline: '2024-11-30',
    },
    {
      id: 5,
      company: 'Netflix',
      position: 'Data Science Intern',
      location: 'Los Gatos, CA',
      deadline: '2024-12-25',
    },
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const tableColor = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" bg={bgColor} py={8} px={6}>
      {/* Navbar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={8}
        py={4}
        px={8}
        bg="purple.700"
        color="white"
        borderRadius="md"
      >
        <Heading size="lg" fontWeight="bold">
          Internship Dashboard
        </Heading>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Box>

      {/* Dashboard Content */}
      <VStack spacing={8} align="stretch">
        <Box
          bg={tableColor}
          shadow="md"
          borderRadius="lg"
          p={6}
          overflowX="auto"
        >
          <Heading as="h2" size="md" mb={4}>
            Available Internships
          </Heading>
          <Table variant="simple">
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
              {internships.map((internship) => (
                <Tr key={internship.id}>
                  <Td>{internship.company}</Td>
                  <Td>{internship.position}</Td>
                  <Td>{internship.location}</Td>
                  <Td>{internship.deadline}</Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={() => alert(`Applying to ${internship.position}`)}
                    >
                      Apply
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      {/* Signed-Out Message */}
      <SignedOut>
        <Text color="red.500" mt={6} textAlign="center">
          Please sign in to view and apply to internships.
        </Text>
      </SignedOut>
    </Box>
  );
};

export default withAuth(DashboardPage, {
    redirectTo: "/sign-in", // Redirects to the sign-in page if not authenticated
  });