"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { db, auth } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import DinoGame from "../lib/DinoGame";
import FAANGTable from "@/components/FAANGTable";
import { motion } from "framer-motion";
import IncomingCall from "../IncomingCall/IncomingCall";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
      },
    },
  },
});

const DashboardPage = () => {
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds
  const [auraScore, setAuraScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false); // Tracks whether the game has started
  const [scamModal, setScamModal] = useState(false); // Tracks scam modal visibility
  const [rejectModal, setRejectModal] = useState(false); // Tracks rejection modal visibility
  const { userId, getToken } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const audioRef = useRef(null); // Reference for the audio element
  const notificationSoundRef = useRef(null); // Reference for notification sound
  const [notification, setNotification] = useState(null); // For notifications

  const contacts = [
    { name: "FreakBob", message: "I miss you ❤️", image: "/images/freakbob.jpg" },
    { name: "John Pork", message: "Can you please give me my kids back?", image: "/images/johnpork.jpeg" },
    { name: "Karen", message: "I need to speak to your manager.", image: "/images/karen.webp" },
    { name: "GigaChad", message: "Let’s hit the gym, bro!", image: "/images/Gigachad.webp" },
  ];

  const startGame = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio playback failed:", err));
    }
  };

  // Timer logic
  useEffect(() => {
    if (hasStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      saveScore();
      redirectToEndScreen();
    }
  }, [hasStarted, timeLeft]);

  // Notification logic
  useEffect(() => {
    if (hasStarted) {
      const notificationInterval = setInterval(() => {
        const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
        setNotification(randomContact);

        // Play notification sound
        if (notificationSoundRef.current) {
          notificationSoundRef.current.play().catch((err) => console.error("Notification sound error:", err));
        }

        setTimeout(() => setNotification(null), 4000); // Hide notification after 4 seconds
      }, 8000); // Show a new notification every 15 seconds
      return () => clearInterval(notificationInterval);
    }
  }, [hasStarted]);

  // Fetch high score from Firebase
  useEffect(() => {
    const fetchHighScore = async () => {
      if (!userId) return;
      try {
        const userRef = doc(db, "leaderboard", userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setHighScore(userDoc.data().highScore || 0);
        }
      } catch (err) {
        console.error("Error fetching high score:", err);
      }
    };

    fetchHighScore();
  }, [userId]);

  // Firebase authentication
  const signIntoFirebase = async () => {
    try {
      const token = await getToken({ template: "integration_firebase" });
      await signInWithCustomToken(auth, token);
    } catch (error) {
      console.error("Error signing in to Firebase:", error);
    }
  };

  useEffect(() => {
    if (userId) signIntoFirebase();
  }, [userId]);

  const saveScore = async () => {
    if (!userId) return;
    try {
      const userRef = doc(db, "leaderboard", userId);
      const userDoc = await getDoc(userRef);
      const newHighScore = Math.max(auraScore, userDoc.exists() ? userDoc.data().highScore : 0);
      await setDoc(
        userRef,
        {
          userId,
          auraScore,
          highScore: newHighScore,
          timestamp: new Date(),
        },
        { merge: true }
      );
      setHighScore(newHighScore);
      toast({
        title: "Score Saved!",
        description: `Your Aura Score: ${auraScore}, High Score: ${newHighScore}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.error("Error saving score:", err);
    }
  };

  const redirectToEndScreen = () => {
    const queryParams = new URLSearchParams({
      auraScore: auraScore.toString(),
      highScore: highScore.toString(),
    }).toString();
    router.push(`/end-screen?${queryParams}`);
  };

  const handleTaskComplete = () => {
    const outcome = Math.random();
    if (outcome < 0.2) {
      // Scam outcome
      setAuraScore((prev) => prev - 100); // No Math.max, allow negative values
      setScamModal(true);
    } else if (outcome < 0.4) {
      // Instant rejection outcome
      setAuraScore((prev) => prev - 300); // No Math.max, allow negative values
      setRejectModal(true);
    } else {
      // Success outcome
      setAuraScore((prev) => prev + 100);
      toast({
        title: "Task Completed!",
        description: "You gained 100 Aura Points!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bgGradient="linear(to-br, purple.800, pink.600)" p={6}>
        {/* Audio Elements */}
        <audio ref={audioRef} src="/sounds/skibidisong.mp3" loop />
        <audio ref={notificationSoundRef} src="/sounds/samsung.mp3" />

        {/* Scam Modal */}
        <Modal isOpen={scamModal} onClose={() => setScamModal(false)} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Scammed! 😭</ModalHeader>
            <ModalBody>
              <Text>You fell for a scam and lost 100 Aura Points. Be more careful next time!</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={() => setScamModal(false)}>
                Okay
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Rejection Modal */}
        <Modal isOpen={rejectModal} onClose={() => setRejectModal(false)} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Rejected! ❌</ModalHeader>
            <ModalBody>
              <Text>You were instantly rejected and lost 300 Aura Points. Better luck next time!</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={() => setRejectModal(false)}>
                Okay
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Start Cooking Button */}
        {!hasStarted && (
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            p={8}
            borderRadius="20px"
            textAlign="center"
            boxShadow="0 0 30px rgba(0, 0, 0, 0.5)"
            zIndex={2000}
          >
            <Heading size="lg" mb={4} color="purple.700">
              Ready to Start Cooking? 🍳
            </Heading>
            <Button colorScheme="teal" size="lg" onClick={startGame}>
              Start Cooking!
            </Button>
          </Box>
        )}

        {/* Timer */}
        {hasStarted && (
          <Box
            position="fixed"
            bottom={20}
            right={20}
            bg="black"
            p="20px 40px"
            borderRadius="20px"
            zIndex={2000}
            boxShadow="0 0 20px limegreen"
          >
            <Text fontSize="6xl" fontWeight="extrabold" color="white" textAlign="center">
              {timeLeft}s
            </Text>
          </Box>
        )}

        {/* Notifications */}
        {notification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            style={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              zIndex: 3000,
              display: "flex",
              alignItems: "center",
              gap: "15px",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <img
              src={notification.image}
              alt={notification.name}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Box>
              <Text fontWeight="bold">{notification.name}</Text>
              <Text>{notification.message}</Text>
            </Box>
          </motion.div>
        )}

        {/* Main Content */}
        {hasStarted && (
          <VStack spacing={8} align="stretch">
            <Heading size="2xl" textAlign="center">
              ⚡ Aura Dashboard ⚡
            </Heading>
            <Heading size="lg" textAlign="center">
              Aura Score: {auraScore} 🌀 | High Score: {highScore} 🌟
            </Heading>
            <IncomingCall />
            <FAANGTable addAuraPoints={handleTaskComplete} />
            <Box position="fixed" bottom={20} left={20} width="400px" height="300px" p={4}>
              <DinoGame />
            </Box>
          </VStack>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default DashboardPage;
