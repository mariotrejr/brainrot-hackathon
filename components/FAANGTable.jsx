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
} from '@chakra-ui/react';

const FAANGTable = () => {
  const [internships, setInternships] = useState([]);

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

        // Extract and parse the FAANG table
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
    const linkMatch = cell.match(/<a href="(.*?)">(.*?)<\/a>/); // Extract links
    if (linkMatch) {
      return { text: stripHTMLTags(linkMatch[2]), url: linkMatch[1] };
    }
    return { text: stripHTMLTags(cell), url: null }; // Handle non-link cells
  };

  const stripHTMLTags = (str) => {
    // Matches and removes any HTML tags 
    return str.replace(/<[^>]*>/g, '').trim();
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} shadow="lg" borderRadius="lg" p={6} overflowX="auto">
      <Heading as="h2" size="lg" mb={6}>
        USA SWE Internships 🦅
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Company</Th>
            <Th>Position</Th>
            <Th>Location</Th>
            <Th>Posting</Th>
          </Tr>
        </Thead>
        <Tbody>
          {internships.map((item, idx) => (
            <Tr key={idx}>
              <Td>
                {item.company.url ? (
                  <Link href={item.company.url} isExternal>
                    {item.company.text}
                  </Link>
                ) : (
                  item.company.text
                )}
              </Td>
              <Td>
                {item.position.url ? (
                  <Link href={item.position.url} isExternal>
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
                    colorScheme="teal"
                    size="sm"
                  >
                    Apply
                  </Button>
                ) : (
                  'N/A'
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default FAANGTable;

