import { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Input,
    Button,
    Textarea,
    List,
    ListItem,
    Divider,
    useToast
} from '@chakra-ui/react';

const CommunityForums = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const toast = useToast();

    useEffect(() => {
        fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch posts. Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.content) {
            toast({
                title: 'Error',
                description: 'Please fill in both title and content.',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            return;
        }
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });
            if (response.ok) {
                fetchPosts();
                setNewPost({ title: '', content: '' });
                toast({
                    title: 'Success',
                    description: 'Your post has been published.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast({
                title: 'Error',
                description: 'Failed to create post. Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };

    return (
        <Box>
            <Heading as="h2" size="xl" mb={6}>
                Community Forums
            </Heading>
            <VStack spacing={6} align="stretch">
                <Box>
                    <Heading as="h3" size="lg" mb={4}>
                        Create a New Post
                    </Heading>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="stretch">
                            <Input
                                placeholder="Post Title"
                                name="title"
                                value={newPost.title}
                                onChange={handleInputChange}
                            />
                            <Textarea
                                placeholder="Post Content"
                                name="content"
                                value={newPost.content}
                                onChange={handleInputChange}
                                rows={4}
                            />
                            <Button type="submit" colorScheme="teal">
                                Submit Post
                            </Button>
                        </VStack>
                    </form>
                </Box>
                <Divider />
                <Box>
                    <Heading as="h3" size="lg" mb={4}>
                        Recent Posts
                    </Heading>
                    <List spacing={4}>
                        {posts.map((post) => (
                            <ListItem key={post.id} p={4} borderWidth={1} borderRadius="md">
                                <Heading as="h4" size="md">
                                    {post.title}
                                </Heading>
                                <Text mt={2}>{post.content}</Text>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </VStack>
        </Box>
    );
};

export default CommunityForums;
