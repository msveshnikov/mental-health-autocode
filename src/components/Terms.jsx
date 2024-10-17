import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Link
} from '@chakra-ui/react';

const Terms = () => {
    return (
        <Container maxW="container.lg" py={8}>
            <VStack spacing={6} align="stretch">
                <Heading as="h1" size="2xl">
                    Terms of Service
                </Heading>
                <Text>
                    Welcome to the Mental Health & Wellness Platform. By using our services, you
                    agree to these terms. Please read them carefully.
                </Text>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        1. Acceptance of Terms
                    </Heading>
                    <Text>
                        By accessing or using the Mental Health & Wellness Platform, you agree to be
                        bound by these Terms of Service and all applicable laws and regulations.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        2. Use of Services
                    </Heading>
                    <Text>
                        Our services are intended for individuals seeking mental health support,
                        therapists, counselors, and healthcare providers. You agree to use the
                        services only for lawful purposes and in accordance with these terms.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        3. User Accounts
                    </Heading>
                    <Text>
                        You are responsible for maintaining the confidentiality of your account and
                        password. You agree to notify us immediately of any unauthorized use of your
                        account.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        4. Privacy
                    </Heading>
                    <Text>
                        Your privacy is important to us. Please review our{' '}
                        <Link color="teal.500" href="/privacy">
                            Privacy Policy
                        </Link>{' '}
                        to understand how we collect, use, and share your information.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        5. Content
                    </Heading>
                    <Text>
                        Users are responsible for the content they post on the platform. We reserve
                        the right to remove any content that violates these terms or is otherwise
                        objectionable.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        6. Intellectual Property
                    </Heading>
                    <Text>
                        All content and materials available on the platform are protected by
                        copyright and other intellectual property laws.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        7. Disclaimer of Warranties
                    </Heading>
                    <Text>
                        The platform is provided as is without any warranties, express or implied.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        8. Limitation of Liability
                    </Heading>
                    <Text>
                        We shall not be liable for any indirect, incidental, special, consequential,
                        or punitive damages resulting from your use of the platform.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        9. Changes to Terms
                    </Heading>
                    <Text>
                        We reserve the right to modify these terms at any time. Your continued use
                        of the platform after changes constitutes acceptance of the new terms.
                    </Text>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        10. Contact Information
                    </Heading>
                    <Text>
                        If you have any questions about these Terms, please contact us at{' '}
                        <Link color="teal.500" href="mailto:support@mentalhealthplatform.com">
                            support@mentalhealthplatform.com
                        </Link>
                        .
                    </Text>
                </Box>
            </VStack>
        </Container>
    );
};

export default Terms;