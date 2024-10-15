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
    ListIcon
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const exercises = [
    {
        title: 'Mindful Breathing',
        description: 'Focus on your breath for 5 minutes, noticing the inhale and exhale.',
        duration: '5 minutes'
    },
    {
        title: 'Body Scan',
        description: 'Progressively relax each part of your body from head to toe.',
        duration: '10 minutes'
    },
    {
        title: 'Loving-Kindness Meditation',
        description: 'Generate feelings of love and kindness towards yourself and others.',
        duration: '15 minutes'
    },
    {
        title: 'Mindful Walking',
        description: 'Take a slow, mindful walk, focusing on each step and your surroundings.',
        duration: '10 minutes'
    },
    {
        title: 'Gratitude Practice',
        description: 'Reflect on three things youre grateful for today.',
        duration: '5 minutes'
    }
];

export const MindfulnessExercises = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
        onOpen();
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
                            {exercise.title} - {exercise.duration}
                        </ListItem>
                    ))}
                </List>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedExercise?.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{selectedExercise?.description}</Text>
                        <Text mt={4}>Duration: {selectedExercise?.duration}</Text>
                        <Button mt={4} colorScheme="teal" onClick={onClose}>
                            Start Exercise
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};
