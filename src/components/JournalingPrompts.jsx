import { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Textarea,
    Button,
    useToast,
    List,
    ListItem,
    Divider,
    useColorModeValue
} from '@chakra-ui/react';

const prompts = [
    "What are three things you're grateful for today?",
    "Describe a challenge you've overcome recently and what you learned from it.",
    "What's something you're looking forward to in the near future?",
    'Reflect on a recent accomplishment and how it made you feel.',
    'Write about a person who has positively influenced your life.',
    "What's a goal you'd like to achieve in the next month?",
    'Describe your ideal day from start to finish.',
    "What's a fear you'd like to overcome and why?",
    'Write about a place that makes you feel calm and peaceful.',
    "What's a skill you'd like to learn or improve upon?"
];

export const JournalingPrompts = () => {
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);
    const toast = useToast();
    const bgColor = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    useEffect(() => {
        setCurrentPrompt(getRandomPrompt());
        loadEntries();
    }, []);

    const getRandomPrompt = () => {
        return prompts[Math.floor(Math.random() * prompts.length)];
    };

    const handleNewPrompt = () => {
        setCurrentPrompt(getRandomPrompt());
        setEntry('');
    };

    const handleEntryChange = (e) => {
        setEntry(e.target.value);
    };

    const handleSaveEntry = () => {
        if (entry.trim()) {
            const newEntry = {
                prompt: currentPrompt,
                content: entry,
                date: new Date().toISOString()
            };
            const updatedEntries = [newEntry, ...entries];
            setEntries(updatedEntries);
            localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
            setEntry('');
            toast({
                title: 'Entry saved',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
            handleNewPrompt();
        } else {
            toast({
                title: 'Entry is empty',
                description: 'Please write something before saving.',
                status: 'warning',
                duration: 2000,
                isClosable: true
            });
        }
    };

    const loadEntries = () => {
        const savedEntries = localStorage.getItem('journalEntries');
        if (savedEntries) {
            setEntries(JSON.parse(savedEntries));
        }
    };

    return (
        <Box>
            <VStack spacing={6} align="stretch">
                <Heading as="h2" size="xl">
                    Journaling Prompts
                </Heading>
                <Box bg={bgColor} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Todays Prompt:
                    </Text>
                    <Text fontSize="xl">{currentPrompt}</Text>
                </Box>
                <Textarea
                    value={entry}
                    onChange={handleEntryChange}
                    placeholder="Write your journal entry here..."
                    size="lg"
                    minHeight="200px"
                    bg={bgColor}
                    borderColor={borderColor}
                />
                <Button colorScheme="teal" onClick={handleSaveEntry}>
                    Save Entry
                </Button>
                <Button onClick={handleNewPrompt} variant="outline">
                    Get New Prompt
                </Button>
                <Divider />
                <Heading as="h3" size="lg">
                    Previous Entries
                </Heading>
                <List spacing={3}>
                    {entries.map((entry, index) => (
                        <ListItem
                            key={index}
                            p={4}
                            bg={bgColor}
                            borderRadius="md"
                            borderWidth={1}
                            borderColor={borderColor}
                        >
                            <Text fontWeight="bold">
                                {new Date(entry.date).toLocaleDateString()}
                            </Text>
                            <Text fontStyle="italic" mt={2}>
                                {entry.prompt}
                            </Text>
                            <Text mt={2}>{entry.content}</Text>
                        </ListItem>
                    ))}
                </List>
            </VStack>
        </Box>
    );
};
