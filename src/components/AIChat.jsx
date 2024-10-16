import { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    Input,
    Button,
    Text,
    Spinner,
    useToast,
    Flex,
    Avatar,
    Select
} from '@chakra-ui/react';

const API_URL = 'https://allchat.online/api';

const AIChat = () => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isModelResponding, setIsModelResponding] = useState(false);
    const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
    const toast = useToast();

    useEffect(() => {
        const storedChatHistory = localStorage.getItem('chatHistory');
        if (storedChatHistory) {
            setChatHistory(JSON.parse(storedChatHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }, [chatHistory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const token = import.meta.env.VITE_CHAT_TOKEN;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        setChatHistory([...chatHistory, { role: 'user', content: input }]);
        setInput('');
        setIsModelResponding(true);

        try {
            const response = await fetch(`${API_URL}/interact`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    input,
                    lang: (navigator.languages && navigator.languages[0]) || navigator.language,
                    model: selectedModel,
                    customGPT: 'Mental Health Assistance',
                    chatHistory: chatHistory.map((h) => ({ role: h.role, content: h.content }))
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();
            setChatHistory((prev) => [
                ...prev,
                { role: 'assistant', content: data.textResponse }
            ]);
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            setChatHistory((prev) => [
                ...prev,
                { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
            ]);
        } finally {
            setIsModelResponding(false);
        }
    };

    return (
        <Box maxWidth="800px" margin="auto" p={4}>
            <VStack spacing={4} align="stretch">
                <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </Select>
                <Box height="400px" overflowY="auto" borderWidth={1} borderRadius="md" p={4}>
                    {chatHistory.map((message, index) => (
                        <Flex
                            key={index}
                            mb={4}
                            flexDirection={message.role === 'user' ? 'row' : 'row-reverse'}
                        >
                            <Avatar
                                size="sm"
                                name={message.role === 'user' ? 'User' : 'AI'}
                                src={message.role === 'user' ? null : '/ai-avatar.png'}
                                mr={message.role === 'user' ? 2 : 0}
                                ml={message.role === 'user' ? 0 : 2}
                            />
                            <Box
                                bg={message.role === 'user' ? 'blue.100' : 'green.100'}
                                p={2}
                                borderRadius="md"
                                maxWidth="70%"
                            >
                                <Text>{message.content}</Text>
                            </Box>
                        </Flex>
                    ))}
                    {isModelResponding && (
                        <Flex justifyContent="flex-end">
                            <Spinner size="sm" mr={2} />
                            <Text>AI is thinking...</Text>
                        </Flex>
                    )}
                </Box>
                <form onSubmit={handleSubmit}>
                    <Flex>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message here..."
                            mr={2}
                        />
                        <Button type="submit" colorScheme="blue" isLoading={isModelResponding}>
                            Send
                        </Button>
                    </Flex>
                </form>
            </VStack>
        </Box>
    );
};

export default AIChat;