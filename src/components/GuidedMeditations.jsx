import React, { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Image,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';

const meditations = [
    {
        id: 1,
        title: 'Mindful Breathing',
        description: 'A 5-minute guided meditation focusing on breath awareness.',
        imageUrl:
            'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        audioUrl: 'https://example.com/mindful-breathing.mp3'
    },
    {
        id: 2,
        title: 'Body Scan Relaxation',
        description: 'A 10-minute guided meditation for full-body relaxation.',
        imageUrl:
            'https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        audioUrl: 'https://example.com/body-scan.mp3'
    },
    {
        id: 3,
        title: 'Loving-Kindness Meditation',
        description: 'A 15-minute guided meditation to cultivate compassion.',
        imageUrl:
            'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        audioUrl: 'https://example.com/loving-kindness.mp3'
    }
];

const MeditationCard = ({ meditation, onSelect }) => (
    <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        cursor="pointer"
        onClick={() => onSelect(meditation)}
    >
        <Image
            src={meditation.imageUrl}
            alt={meditation.title}
            mb={4}
            objectFit="cover"
            h="200px"
            w="100%"
        />
        <Heading as="h3" size="md" mb={2}>
            {meditation.title}
        </Heading>
        <Text>{meditation.description}</Text>
    </Box>
);

const MeditationPlayer = ({ meditation, onClose }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <VStack spacing={4} align="center">
            <Heading as="h2" size="xl">
                {meditation.title}
            </Heading>
            <Image
                src={meditation.imageUrl}
                alt={meditation.title}
                boxSize="300px"
                objectFit="cover"
            />
            <Text>{meditation.description}</Text>
            <audio ref={audioRef} src={meditation.audioUrl} />
            <Button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</Button>
            <Button onClick={onClose}>Close</Button>
        </VStack>
    );
};

export const GuidedMeditations = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedMeditation, setSelectedMeditation] = useState(null);

    const handleSelectMeditation = (meditation) => {
        setSelectedMeditation(meditation);
        onOpen();
    };

    return (
        <Box>
            <Heading as="h1" size="2xl" mb={8}>
                Guided Meditations
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {meditations.map((meditation) => (
                    <MeditationCard
                        key={meditation.id}
                        meditation={meditation}
                        onSelect={handleSelectMeditation}
                    />
                ))}
            </SimpleGrid>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Guided Meditation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedMeditation && (
                            <MeditationPlayer meditation={selectedMeditation} onClose={onClose} />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};
