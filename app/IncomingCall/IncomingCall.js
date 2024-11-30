'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Image from 'next/image';

export default function IncomingCall() {
  const [isCalling, setIsCalling] = useState(false);
  const [isOnCall, setIsOnCall] = useState(false);
  const ringtoneRef = useRef(null); // Persist ringtone instance

  useEffect(() => {
    // Initialize ringtone only once
    ringtoneRef.current = new Audio('/don_pollo_linganguli.mp3');
    ringtoneRef.current.loop = true; // Loop the ringtone until manually stopped
  }, []);

  const playRingtone = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.play().catch((err) =>
        console.error('Error playing ringtone:', err)
      );
    }
  };

  const stopRingtone = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0; // Reset playback time
    }
  };

  // Wrap triggerCall in useCallback to stabilize the reference
  const triggerCall = useCallback(() => {
    setIsCalling(true);
    playRingtone();
  }, []);

  const declineCall = () => {
    setIsCalling(false);
    stopRingtone();
  };

  const acceptCall = () => {
    setIsOnCall(true);
    setIsCalling(false);
    stopRingtone();
  };

  const endCall = () => {
    setIsOnCall(false);
    stopRingtone();
  };

  useEffect(() => {
    // Automatically trigger a call every 5 minutes if not answered or declined
    const callInterval = setInterval(() => {
      if (!isOnCall) {
        triggerCall();
      }
    }, 3600000000000); // 60000 for 1 minute //changed to 3600000 (1 hour) to add other features without don pollo disturbing

    return () => clearInterval(callInterval);
  }, [isOnCall, triggerCall]);

  return (
    <>
      {/* Full-Screen Overlay for Incoming Call or On Call */}
      {(isCalling || isOnCall) && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.9)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          color="white"
          zIndex="1100"
        >
          {/* Header */}
          <Heading
            style={{
              marginBottom: '10px', // Reduced spacing below heading
              marginTop: '-300px', // Moved heading further up
            }}
          >
            {isCalling
              ? 'Incoming Call from 🥵 Don Pollo... 🍗'
              : 'On Call with 🥵 Don Pollo... 🍗'}
          </Heading>

          {/* Avatar */}
          <Box
            width="200px"
            height="200px"
            borderRadius="50%"
            overflow="hidden"
            margin="5px 0"
            style={{
              marginTop: '25px',
              position: 'relative', // Required for next/image with layout="fill"
            }}
          >
            <Image
              src="/don-pollo-avatar.jpg"
              alt="Don Pollo Avatar"
              layout="fill" // Makes the image fill the parent container
              objectFit="cover" // Ensures the image covers the circle area
            />
          </Box>

          {/* ElevenLabs Widget and Decline Button */}
          <Box
            id="widget-container"
            style={{
              marginTop: '20px', // Moved widget closer to the avatar
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
              transform: 'translateX(35px)', // Shift the buttons to the right
            }}
          >
            {/* Decline Button */}
            {isCalling && (
              <Box
                style={{
                  position: 'static',
                  width: '100px', // Same width as widget
                  height: '50px', // Same height as widget
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: '15px',
                  backgroundColor: '#ff4d4f', // Red background
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginRight: '10px', // Add space between Decline and Accept
                }}
                onClick={declineCall}
              >
                Decline
              </Box>
            )}

            <elevenlabs-convai
              agent-id="qYJDQ63g0Z07cBgoT0yH"
              style={{
                position: 'static',
                width: '300px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => {
                stopRingtone(); // Stop ringtone when widget is pressed
                if (isCalling) {
                  acceptCall(); // Accept the call
                } else if (isOnCall) {
                  endCall(); // End the call
                }
              }}
            >
              {isCalling ? 'Accept' : 'End Call'}
            </elevenlabs-convai>
          </Box>
        </Box>
      )}

      <script
        src="https://elevenlabs.io/convai-widget/index.js"
        async
        type="text/javascript"
      ></script>
    </>
  );
}
