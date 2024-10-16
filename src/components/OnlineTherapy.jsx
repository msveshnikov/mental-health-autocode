import { useState, useEffect } from 'react';
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
    SimpleGrid,
    Input,
    Select,
    FormControl,
    FormLabel,
    useToast,
    Spinner,
    Alert,
    AlertIcon,
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
    const [sessionDate, setSessionDate] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [localProviders, setLocalProviders] = useState([]);
    const [zipCode, setZipCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    const handleSelectTherapist = (therapist) => {
        setSelectedTherapist(therapist);
        onOpen();
    };

    const handleBookSession = () => {
        if (!sessionDate || !sessionTime) {
            toast({
                title: 'Error',
                description: 'Please select both date and time for the session.',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            return;
        }
        toast({
            title: 'Session Booked',
            description: `Your session with ${selectedTherapist.name} is scheduled for ${sessionDate} at ${sessionTime}.`,
            status: 'success',
            duration: 5000,
            isClosable: true
        });
        onClose();
    };

    useEffect(() => {
        const fetchLocalProviders = async () => {
            if (zipCode.length === 5) {
                setIsLoading(true);
                setError(null);
                try {
                    const response = await fetch(
                        `https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1&address_purpose=LOCATION&city=&state=&postal_code=${zipCode}&country_code=US&limit=100&skip=&pretty=&enumeration_type=&taxonomy_description=Mental%20Health`
                    );

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();

                    if (data.result_count > 0) {
                        const providers = data.results
                            .map((provider) => ({
                                name: `${provider.basic.first_name} ${provider.basic.last_name}`,
                                type: provider.taxonomies[0]?.desc || 'Not specified',
                                phone: provider.addresses[0]?.telephone_number || 'Not available'
                            }))
                            .filter((provider) => provider.name !== 'undefined undefined');
                        setLocalProviders(providers);
                    } else {
                        setLocalProviders([]);
                    }
                } catch (error) {
                    console.error('Failed to fetch providers:', error);
                    setError('Failed to fetch local providers. Please try again.');
                    setLocalProviders([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setLocalProviders([]);
            }
        };

        fetchLocalProviders();
    }, [zipCode]);

    return (
        <Box>
            <Heading mb={6}>Online Therapy Sessions</Heading>
            <Text mb={4}>
                Connect with licensed therapists for confidential online sessions. Choose a
                therapist that specializes in your area of concern.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
                {therapists.map((therapist) => (
                    <TherapistCard
                        key={therapist.id}
                        therapist={therapist}
                        onSelect={handleSelectTherapist}
                    />
                ))}
            </SimpleGrid>

            <Heading size="md" mb={4}>
                Find Local Mental Health Resources
            </Heading>
            <FormControl mb={4}>
                <FormLabel>Enter ZIP Code</FormLabel>
                <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP Code"
                    maxLength={5}
                />
            </FormControl>
            {isLoading && <Spinner />}
            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            {localProviders.length > 0 && (
                <VStack align="start" spacing={2} mb={8}>
                    <Heading size="sm">Local Mental Health Providers:</Heading>
                    {localProviders.map((provider, index) => (
                        <Text key={index}>
                            {provider.name} - Specializes in {provider.type} - Phone: {provider.phone}
                        </Text>
                    ))}
                </VStack>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Book a Session</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedTherapist && (
                            <VStack align="start" spacing={4}>
                                <Text>
                                    You are about to book a session with {selectedTherapist.name},
                                    specializing in {selectedTherapist.specialty}.
                                </Text>
                                <FormControl>
                                    <FormLabel>Select Date</FormLabel>
                                    <Input
                                        type="date"
                                        value={sessionDate}
                                        onChange={(e) => setSessionDate(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Select Time</FormLabel>
                                    <Select
                                        placeholder="Select time"
                                        value={sessionTime}
                                        onChange={(e) => setSessionTime(e.target.value)}
                                    >
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="15:00">03:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                    </Select>
                                </FormControl>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleBookSession}>
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