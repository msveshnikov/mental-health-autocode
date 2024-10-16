import { useState } from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    List,
    ListItem,
    ListIcon,
    Progress,
    useToast
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const exercises = [
    {
        title: 'Mindful Breathing',
        description: 'Focus on your breath for 5 minutes, noticing the inhale and exhale.',
        duration: 300
    },
    {
        title: 'Body Scan',
        description: 'Progressively relax each part of your body from head to toe.',
        duration: 600
    },
    {
        title: 'Loving-Kindness Meditation',
        description: 'Generate feelings of love and kindness towards yourself and others.',
        duration: 900
    },
    {
        title: 'Mindful Walking',
        description: 'Take a slow, mindful walk, focusing on each step and your surroundings.',
        duration: 600
    },
    {
        title: 'Gratitude Practice',
        description: 'Reflect on three things youre grateful for today.',
        duration: 300
    }
];

export const MindfulnessExercises = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const toast = useToast();

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
        setTimer(exercise.duration);
        setIsActive(false);
        onOpen();
    };

    const handleStartExercise = () => {
        setIsActive(true);
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(interval);
                    setIsActive(false);
                    toast({
                        title: 'Exercise Completed',
                        description: `You've completed the ${selectedExercise.title} exercise.`,
                        status: 'success',
                        duration: 3000,
                        isClosable: true
                    });
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <Box>
            <VStack spacing={8} align="stretch">
                <Heading as="h1" size="xl" textAlign="center">
                    Mindfulness Exercises
                </Heading>
                <Text fontSize="lg" textAlign="center">
                    Explore these mindfulness exercises to help reduce stress and improve your
                    well-being.
                </Text>
                <List spacing={3}>
                    {exercises.map((exercise, index) => (
                        <ListItem
                            key={index}
                            cursor="pointer"
                            onClick={() => handleExerciseClick(exercise)}
                        >
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            {exercise.title} - {formatTime(exercise.duration)}
                        </ListItem>
                    ))}
                </List>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedExercise?.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={4}>{selectedExercise?.description}</Text>
                        <Text mb={4}>Duration: {formatTime(selectedExercise?.duration)}</Text>
                        <Progress
                            value={
                                ((selectedExercise?.duration - timer) /
                                    selectedExercise?.duration) *
                                100
                            }
                            size="lg"
                            colorScheme="teal"
                            mb={4}
                        />
                        <Text fontSize="2xl" textAlign="center" mb={4}>
                            {formatTime(timer)}
                        </Text>
                        <Button
                            colorScheme="teal"
                            onClick={handleStartExercise}
                            isDisabled={isActive || timer === 0}
                            width="100%"
                        >
                            {timer === 0 ? 'Exercise Completed' : 'Start Exercise'}
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};
