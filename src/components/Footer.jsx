import { Box, Container, Stack, Text, Link, IconButton } from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

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
                            aria-label="Twitter"
                            icon={<FaTwitter />}
                            size="md"
                            color="gray.400"
                            variant="ghost"
                        />
                        <IconButton
                            aria-label="Facebook"
                            icon={<FaFacebook />}
                            size="md"
                            color="gray.400"
                            variant="ghost"
                        />
                        <IconButton
                            aria-label="Instagram"
                            icon={<FaInstagram />}
                            size="md"
                            color="gray.400"
                            variant="ghost"
                        />
                        <IconButton
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
