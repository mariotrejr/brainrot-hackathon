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
  Link,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const FAANGTable = ({ addAuraPoints }) => {
  const [internships, setInternships] = useState([]);
  const [completed, setCompleted] = useState({}); // Track completed rows

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/speedyapply/2025-SWE-College-Jobs/main/README.md'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch markdown file');
        }
        const markdown = await response.text();

        const faangTableMarkdown = extractFAANGTable(markdown);
        const parsedTable = parseMarkdownTable(faangTableMarkdown);
        setInternships(parsedTable);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarkdown();
  }, []);

  const extractFAANGTable = (markdown) => {
    const start = markdown.indexOf('<!-- TABLE_FAANG_START -->');
    const end = markdown.indexOf('<!-- TABLE_FAANG_END -->');
    if (start === -1 || end === -1) return '';
    return markdown.slice(start, end).trim();
  };

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
        .map((cell) => cell.trim())
        .filter((cell) => cell)
    );

    return rows.map((row) => {
      const internship = {};
      headers.forEach((header, idx) => {
        internship[header.toLowerCase()] = parseCell(row[idx]);
      });
      return internship;
    });
  };

  const parseCell = (cell) => {
    const linkMatch = cell.match(/<a href="([^"]*)">(.*?)<\/a>/);
    if (linkMatch) {
      return { text: stripHTMLTags(linkMatch[2]), url: linkMatch[1] };
    }
    return { text: stripHTMLTags(cell), url: null };
  };

  const stripHTMLTags = (str) => {
    return str.replace(/<[^>]*>/g, '').trim();
  };

  const handleDone = (index) => {
    if (!completed[index]) {
      setCompleted((prev) => ({ ...prev, [index]: true }));
      addAuraPoints(100);
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <MotionBox
      bg={bgColor}
      shadow="lg"
      borderRadius="lg"
      p={6}
      overflowX="auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Heading
        as="h2"
        size="lg"
        mb={6}
        textAlign="center"
        bgGradient="linear(to-r, orange.400, pink.400)"
        bgClip="text"
        textShadow="0px 0px 10px rgba(255, 0, 255, 0.8)"
      >
        🌟 USA SWE Internships 🦅
      </Heading>
      <Table variant="striped" colorScheme="pink">
        <Thead>
          <Tr>
            <Th textAlign="center" color="pink.500">
              Company
            </Th>
            <Th textAlign="center" color="pink.500">
              Position
            </Th>
            <Th textAlign="center" color="pink.500">
              Location
            </Th>
            <Th textAlign="center" color="pink.500">
              Posting
            </Th>
            <Th textAlign="center" color="pink.500">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {internships.map((item, idx) => (
            <Tr key={idx} bg={completed[idx] ? 'gray.700' : 'white'}>
              <Td>
                {item.company.url ? (
                  <Link
                    href={item.company.url}
                    isExternal
                    fontWeight="bold"
                    color="teal.500"
                    _hover={{ textDecoration: 'underline', color: 'teal.300' }}
                  >
                    {item.company.text}
                  </Link>
                ) : (
                  item.company.text
                )}
              </Td>
              <Td>
                {item.position.url ? (
                  <Link
                    href={item.position.url}
                    isExternal
                    fontWeight="bold"
                    color="teal.500"
                    _hover={{ textDecoration: 'underline', color: 'teal.300' }}
                  >
                    {item.position.text}
                  </Link>
                ) : (
                  item.position.text
                )}
              </Td>
              <Td>{item.location.text}</Td>
              <Td>
                {item.posting.url ? (
                  <Button
                    as={Link}
                    href={item.posting.url}
                    isExternal
                    colorScheme="purple"
                    size="sm"
                    _hover={{ transform: 'scale(1.1)' }}
                  >
                    Apply 🚀
                  </Button>
                ) : (
                  <Text fontStyle="italic" color="gray.500">
                    N/A
                  </Text>
                )}
              </Td>
              <Td>
                <Button
                  colorScheme={completed[idx] ? 'gray' : 'green'}
                  size="sm"
                  onClick={() => handleDone(idx)}
                  isDisabled={completed[idx]}
                  _hover={{
                    transform: completed[idx] ? 'none' : 'scale(1.1)',
                    bg: completed[idx] ? 'gray.600' : 'green.300',
                  }}
                >
                  {completed[idx] ? '✅ Done' : '🎯 Complete'}
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </MotionBox>
  );
};

export default FAANGTable;
