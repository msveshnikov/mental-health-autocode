import React, { useState, useEffect, useRef } from 'react';
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
    useDisclosure,
    useColorModeValue,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Flex
} from '@chakra-ui/react';

const meditations = [
    {
        id: 1,
        title: 'Mindful Breathing',
        description: 'A 5-minute guided meditation focusing on breath awareness.',
        imageUrl:
            'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        audioUrl: '/music1.mp3',
        duration: '5 minutes'
    },
    {
        id: 2,
        title: 'Body Scan Relaxation',
        description: 'A 10-minute guided meditation for full-body relaxation.',
        imageUrl:
            'https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        audioUrl: '/music2.mp3',
        duration: '10 minutes'
    },
    {
        id: 3,
        title: 'Loving-Kindness Meditation',
        description: 'A 15-minute guided meditation to cultivate compassion.',
        imageUrl:
            'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        audioUrl: '/music3.mp3',
        duration: '15 minutes'
    }
];

const MeditationCard = ({ meditation, onSelect }) => {
    const cardBg = useColorModeValue('white', 'gray.700');

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            cursor="pointer"
            onClick={() => onSelect(meditation)}
            bg={cardBg}
            transition="all 0.3s"
            _hover={{ transform: 'scale(1.05)', shadow: 'lg' }}
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
            <Text mb={2}>{meditation.description}</Text>
            <Text fontWeight="bold">Duration: {meditation.duration}</Text>
        </Box>
    );
};

const MeditationPlayer = ({ meditation, onClose }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
        audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
        return () => {
            audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
            audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const handleSliderChange = (value) => {
        audioRef.current.currentTime = value;
        setCurrentTime(value);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

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
                borderRadius="md"
            />
            <Text>{meditation.description}</Text>
            <Text fontWeight="bold">Duration: {meditation.duration}</Text>
            <audio ref={audioRef} src={meditation.audioUrl} />
            <Flex w="100%" align="center">
                <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    colorScheme="teal"
                    leftIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}
                    mr={4}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Text mr={4}>{formatTime(currentTime)}</Text>
                <Slider
                    flex="1"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSliderChange}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <Text ml={4}>{formatTime(duration)}</Text>
            </Flex>
            <Button onClick={onClose} variant="outline">
                Close
            </Button>
        </VStack>
    );
};

const PlayIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const PauseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
);

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
            <Text fontSize="lg" mb={6}>
                Explore our collection of guided meditations to help reduce stress and improve your
                well-being.
            </Text>
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
