import { Box, Container, Stack, Text, Link, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export const Footer = () => {
    const bgColor = useColorModeValue('gray.100', 'gray.900');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    return (
        <Box as="footer" role="contentinfo" bg={bgColor} py={8}>
            <Container maxW="6xl">
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 6, md: 8 }}
                    align="center"
                    justify="space-between"
                >
                    <Text fontSize="sm" color={textColor}>
                        © {new Date().getFullYear()} MaxSoft. All rights reserved.
                    </Text>
                    <Stack direction="row" spacing={4}>
                        <Link href="/privacy" color={textColor}>
                            Privacy Policy
                        </Link>
                        <Link href="/terms" color={textColor}>
                            Terms of Service
                        </Link>
                    </Stack>
                    <Stack direction="row" spacing={4}>
                        <IconButton
                            as="a"
                            href="https://twitter.com/MangaTVShop"
                            aria-label="Twitter"
                            icon={<FaTwitter />}
                            size="md"
                            color={textColor}
                            variant="ghost"
                        />
                        <IconButton
                            as="a"
                            href="https://www.linkedin.com/in/max-sveshnikov-852248b4/"
                            aria-label="LinkedIn"
                            icon={<FaLinkedin />}
                            size="md"
                            color={textColor}
                            variant="ghost"
                        />
                        <IconButton
                            as="a"
                            href="https://github.com/msveshnikov"
                            aria-label="GitHub"
                            icon={<FaGithub />}
                            size="md"
                            color={textColor}
                            variant="ghost"
                        />
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};
