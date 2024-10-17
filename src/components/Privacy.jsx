import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    UnorderedList,
    ListItem,
    Link
} from '@chakra-ui/react';

const Privacy = () => {
    return (
        <Container maxW="container.xl" py={8}>
            <VStack spacing={6} align="stretch">
                <Heading as="h1" size="2xl">
                    Privacy Policy
                </Heading>
                <Text>
                    At Mental Health & Wellness Platform, we are committed to protecting your
                    privacy and ensuring the security of your personal information. This Privacy
                    Policy outlines how we collect, use, disclose, and safeguard your data.
                </Text>
                <Heading as="h2" size="lg">
                    Information We Collect
                </Heading>
                <UnorderedList spacing={2} pl={4}>
                    <ListItem>Personal information (name, email, phone number)</ListItem>
                    <ListItem>Health information related to mental wellness</ListItem>
                    <ListItem>Usage data and interactions with our platform</ListItem>
                    <ListItem>Device and browser information</ListItem>
                </UnorderedList>
                <Heading as="h2" size="lg">
                    How We Use Your Information
                </Heading>
                <Text>
                    We use your information to provide and improve our services, personalize your
                    experience, and communicate with you about our platform and offerings.
                </Text>
                <Heading as="h2" size="lg">
                    Data Protection and Security
                </Heading>
                <Text>
                    We implement robust security measures to protect your data, including encryption
                    and access controls. We comply with HIPAA regulations for handling sensitive
                    health information.
                </Text>
                <Heading as="h2" size="lg">
                    Your Rights and Choices
                </Heading>
                <Text>
                    You have the right to access, correct, or delete your personal information. You
                    can manage your privacy settings and data preferences within your account.
                </Text>
                <Heading as="h2" size="lg">
                    Updates to This Policy
                </Heading>
                <Text>
                    We may update this Privacy Policy from time to time. We will notify you of any
                    significant changes by posting a notice on our website or sending you an email.
                </Text>
                <Box>
                    <Text>
                        For more information about our privacy practices, please contact us at{' '}
                        <Link href="mailto:privacy@mentalhealthplatform.com" color="teal.500">
                            privacy@mentalhealthplatform.com
                        </Link>
                        .
                    </Text>
                </Box>
            </VStack>
        </Container>
    );
};

export default Privacy;
