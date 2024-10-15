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
    Divider
} from '@chakra-ui/react';

const prompts = [
    'What are three things youre grateful for today?',
    'Describe a challenge youve overcome recently and what you learned from it.',
    'Whats something youre looking forward to in the near future?',
    'Reflect on a recent accomplishment and how it made you feel.',
    'Write about a person who has positively influenced your life.'
];

export const JournalingPrompts = () => {
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);
    const toast = useToast();

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
            const updatedEntries = [...entries, newEntry];
            setEntries(updatedEntries);
            localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
            setEntry('');
            toast({
                title: 'Entry saved',
                status: 'success',
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
                <Text fontSize="lg" fontWeight="bold">
                    Todays Prompt:
                </Text>
                <Text fontSize="xl">{currentPrompt}</Text>
                <Textarea
                    value={entry}
                    onChange={handleEntryChange}
                    placeholder="Write your journal entry here..."
                    size="lg"
                    minHeight="200px"
                />
                <Button colorScheme="teal" onClick={handleSaveEntry}>
                    Save Entry
                </Button>
                <Button onClick={handleNewPrompt}>Get New Prompt</Button>
                <Divider />
                <Heading as="h3" size="lg">
                    Previous Entries
                </Heading>
                <List spacing={3}>
                    {entries.map((entry, index) => (
                        <ListItem key={index}>
                            <Text fontWeight="bold">
                                {new Date(entry.date).toLocaleDateString()}
                            </Text>
                            <Text fontStyle="italic">{entry.prompt}</Text>
                            <Text>{entry.content}</Text>
                        </ListItem>
                    ))}
                </List>
            </VStack>
        </Box>
    );
};
