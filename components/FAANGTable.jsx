'use client';

import React, { useEffect, useState } from 'react';
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
  useColorModeValue,
} from '@chakra-ui/react';

const FAANGTable = () => {
    
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/speedyapply/2025-SWE-College-Jobs/main/INTERN_INTL.md'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch markdown file');
        }
        const markdown = await response.text();

        // Parse markdown table into JSON
        const parsedTable = parseMarkdownTable(markdown);
        setInternships(parsedTable);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarkdown();
  }, []);


    const parseMarkdownTable = (markdown) => {
        const lines = markdown.split('\n');
        const tableStart = lines.findIndex((line) => line.includes('| Company |'));
        if (tableStart === -1) return [];
      
        const tableLines = lines.slice(tableStart);
        const headers = tableLines[0]
          .split('|')
          .map((header) => header.trim())
          .filter((header) => header);
      
        const rows = tableLines.slice(2).map((line) =>
          line
            .split('|')
            .map((cell) => stripHTMLTags(cell.trim()))
            .filter((cell) => cell)
        );
      
        return rows.map((row) => {
          const internship = {};
          headers.forEach((header, idx) => {
            internship[header.toLowerCase()] = row[idx];
          });
          return internship;
        });
      };
      
      const stripHTMLTags = (str) => {
        // Matches and removes any HTML tags
        return str.replace(/<[^>]*>/g, '').trim();
      };
      

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} shadow="lg" borderRadius="lg" p={6} overflowX="auto">
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
          {internships.map((item, idx) => (
            <Tr key={idx}>
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
  );
};

export default FAANGTable;
