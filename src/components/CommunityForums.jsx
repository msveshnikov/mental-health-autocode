import { useState, useEffect, useCallback } from 'react';
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
    useToast,
    Avatar,
    HStack,
    Tag
} from '@chakra-ui/react';

const CommunityForums = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const toast = useToast();

    const fetchPosts = useCallback(async () => {
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
    }, [toast]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

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
                                <HStack spacing={4} mb={2}>
                                    <Avatar size="sm" name={post.author} />
                                    <Text fontWeight="bold">{post.author}</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </Text>
                                </HStack>
                                <Heading as="h4" size="md" mb={2}>
                                    {post.title}
                                </Heading>
                                <Text mb={2}>{post.content}</Text>
                                <HStack spacing={2}>
                                    {post.tags &&
                                        post.tags.map((tag, index) => (
                                            <Tag key={index} size="sm" colorScheme="teal">
                                                {tag}
                                            </Tag>
                                        ))}
                                </HStack>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </VStack>
        </Box>
    );
};

export default CommunityForums;
