/* eslint-disable react/prop-types */
import  { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Avatar,
    Badge,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    SimpleGrid
} from '@chakra-ui/react';

const therapists = [
    { id: 1, name: 'Dr. Jane Smith', specialty: 'Anxiety', rating: 4.8 },
    { id: 2, name: 'Dr. John Doe', specialty: 'Depression', rating: 4.9 },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'PTSD', rating: 4.7 },
    { id: 4, name: 'Dr. Michael Lee', specialty: 'Relationships', rating: 4.6 }
];

const TherapistCard = ({ therapist, onSelect }) => (
    <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        shadow="md"
        transition="all 0.2s"
        _hover={{ shadow: 'lg' }}
    >
        <VStack align="start" spacing={3}>
            <HStack>
                <Avatar name={therapist.name} size="md" />
                <VStack align="start" spacing={0}>
                    <Heading size="sm">{therapist.name}</Heading>
                    <Badge colorScheme="green">{therapist.specialty}</Badge>
                </VStack>
            </HStack>
            <Text>Rating: {therapist.rating}/5</Text>
            <Button colorScheme="teal" onClick={() => onSelect(therapist)}>
                Book Session
            </Button>
        </VStack>
    </Box>
);

export const OnlineTherapy = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTherapist, setSelectedTherapist] = useState(null);

    const handleSelectTherapist = (therapist) => {
        setSelectedTherapist(therapist);
        onOpen();
    };

    return (
        <Box>
            <Heading mb={6}>Online Therapy Sessions</Heading>
            <Text mb={4}>
                Connect with licensed therapists for confidential online sessions. Choose a
                therapist that specializes in your area of concern.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {therapists.map((therapist) => (
                    <TherapistCard
                        key={therapist.id}
                        therapist={therapist}
                        onSelect={handleSelectTherapist}
                    />
                ))}
            </SimpleGrid>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Book a Session</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedTherapist && (
                            <VStack align="start" spacing={3}>
                                <Text>
                                    You are about to book a session with {selectedTherapist.name},
                                    specializing in {selectedTherapist.specialty}.
                                </Text>
                                <Text>Please select a date and time for your session.</Text>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Confirm Booking
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
