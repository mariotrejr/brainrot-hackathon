'use client'; // Ensure this is a Client Component

import React, { Suspense } from 'react';
import EndScreenClient from './EndScreenClient'; // The main component
import { Spinner } from '@chakra-ui/react';

export default function EndScreenPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Spinner size="xl" color="pink.400" />
        </div>
      }
    >
      <EndScreenClient />
    </Suspense>
  );
}
