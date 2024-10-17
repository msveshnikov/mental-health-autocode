import { Box, Container, Stack, Text, Link, IconButton } from '@chakra-ui/react';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
    return (
        <Box
            as="footer"
            role="contentinfo"
            mx="auto"
            maxW="7xl"
            py="12"
            px={{ base: '4', md: '8' }}
        >
            <Container maxW="6xl">
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: '4', md: '8' }}
                    align="center"
                    justify="space-between"
                >
                    <Text fontSize="sm">
                        © {new Date().getFullYear()} MaxSoft. All rights reserved.
                    </Text>
                    <Stack direction="row" spacing="4">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </Stack>
                    <Stack direction="row" spacing="4">
                        <IconButton
                            as="a"
                            href="https://x.com/MangaTVShop"
                            aria-label="Twitter"
                            icon={<FaTwitter />}
                            size="md"
                            color="gray.400"
                            variant="ghost"
                        />
                        <IconButton
                            as="a"
                            href="https://www.linkedin.com/in/max-sveshnikov-852248b4/"
                            aria-label="LinkedIn"
                            icon={<FaLinkedin />}
                            size="md"
                            color="gray.400"
                            variant="ghost"
                        />
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};