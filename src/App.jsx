import { useState } from 'react';
import {
    ChakraProvider,
    Box,
    VStack,
    Heading,
    Text,
    Button,
    useDisclosure,
    Image
} from '@chakra-ui/react';
import { GuidedMeditations } from './components/GuidedMeditations';
import { MindfulnessExercises } from './components/MindfulnessExercises';
import { MoodTracker } from './components/MoodTracker';
import { JournalingPrompts } from './components/JournalingPrompts';
import { OnlineTherapy } from './components/OnlineTherapy';
import CommunityForums from './components/CommunityForums';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import theme from './theme';

function App() {
    const [activeFeature, setActiveFeature] = useState('home');
    const { onOpen } = useDisclosure();

    const renderFeature = () => {
        switch (activeFeature) {
            case 'meditations':
                return <GuidedMeditations />;
            case 'mindfulness':
                return <MindfulnessExercises />;
            case 'moodTracker':
                return <MoodTracker />;
            case 'journaling':
                return <JournalingPrompts />;
            case 'therapy':
                return <OnlineTherapy />;
            case 'forums':
                return <CommunityForums />;
            default:
                return (
                    <VStack spacing={8} align="center">
                        <Image
                            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                            alt="Mental Health & Wellness"
                            borderRadius="md"
                            maxWidth="100%"
                            height="400px"
                            objectFit="cover"
                        />
                        <Heading as="h1" size="2xl" textAlign="center">
                            Welcome to Mental Health & Wellness Platform
                        </Heading>
                        <Text fontSize="xl" textAlign="center">
                            Your comprehensive solution for accessible and affordable mental health
                            support.
                        </Text>
                        <Button colorScheme="teal" size="lg" onClick={onOpen}>
                            Get Started
                        </Button>
                    </VStack>
                );
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box minHeight="100vh" display="flex" flexDirection="column">
                <Navigation activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
                <Box flex={1} p={8}>
                    {renderFeature()}
                </Box>
                <Footer />
            </Box>
        </ChakraProvider>
    );
}

export default App;
