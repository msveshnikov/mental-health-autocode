import {
    Box,
    Flex,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    IconButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const NAV_ITEMS = [
    { label: 'Home', key: 'home' },
    { label: 'Guided Meditations', key: 'meditations' },
    { label: 'Mindfulness Exercises', key: 'mindfulness' },
    { label: 'Mood Tracker', key: 'moodTracker' },
    { label: 'Journaling Prompts', key: 'journaling' },
    { label: 'Online Therapy', key: 'therapy' },
    { label: 'Community Forums', key: 'forums' }
];

export const Navigation = ({ activeFeature, setActiveFeature }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleNavItemClick = (key) => {
        setActiveFeature(key);
        if (isMobile) {
            onClose();
        }
    };

    const NavItems = () => (
        <>
            {NAV_ITEMS.map((item) => (
                <Button
                    key={item.key}
                    variant={activeFeature === item.key ? 'solid' : 'ghost'}
                    colorScheme="teal"
                    onClick={() => handleNavItemClick(item.key)}
                >
                    {item.label}
                </Button>
            ))}
        </>
    );

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={<HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={onOpen}
                />
                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                        <NavItems />
                    </Stack>
                </Flex>
            </Flex>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4} align="stretch">
                            <NavItems />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};
