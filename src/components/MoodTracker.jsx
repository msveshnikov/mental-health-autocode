import React, { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Select,
    useToast,
    Grid,
    GridItem,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText
} from '@chakra-ui/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const moods = ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Very Sad'];

export const MoodTracker = () => {
    const [currentMood, setCurrentMood] = useState('');
    const [moodHistory, setMoodHistory] = useState([]);
    const toast = useToast();

    useEffect(() => {
        const savedMoodHistory = localStorage.getItem('moodHistory');
        if (savedMoodHistory) {
            setMoodHistory(JSON.parse(savedMoodHistory));
        }
    }, []);

    const handleMoodChange = (event) => {
        setCurrentMood(event.target.value);
    };

    const handleMoodSubmit = () => {
        if (!currentMood) {
            toast({
                title: 'Please select a mood',
                status: 'warning',
                duration: 3000,
                isClosable: true
            });
            return;
        }

        const newMoodEntry = {
            date: new Date().toISOString(),
            mood: currentMood,
            value: moods.indexOf(currentMood)
        };

        const updatedMoodHistory = [...moodHistory, newMoodEntry];
        setMoodHistory(updatedMoodHistory);
        localStorage.setItem('moodHistory', JSON.stringify(updatedMoodHistory));

        setCurrentMood('');
        toast({
            title: 'Mood recorded',
            status: 'success',
            duration: 3000,
            isClosable: true
        });
    };

    const getAverageMood = () => {
        if (moodHistory.length === 0) return 'N/A';
        const sum = moodHistory.reduce((acc, entry) => acc + entry.value, 0);
        const average = sum / moodHistory.length;
        return moods[Math.round(average)];
    };

    const getMoodTrend = () => {
        if (moodHistory.length < 2) return 'Not enough data';
        const lastMood = moodHistory[moodHistory.length - 1].value;
        const secondLastMood = moodHistory[moodHistory.length - 2].value;
        if (lastMood > secondLastMood) return 'Improving';
        if (lastMood < secondLastMood) return 'Declining';
        return 'Stable';
    };

    return (
        <Box>
            <VStack spacing={6} align="stretch">
                <Heading as="h2" size="xl">
                    Mood Tracker
                </Heading>
                <Box>
                    <Text mb={2}>How are you feeling today?</Text>
                    <Select
                        placeholder="Select mood"
                        value={currentMood}
                        onChange={handleMoodChange}
                    >
                        {moods.map((mood) => (
                            <option key={mood} value={mood}>
                                {mood}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Button colorScheme="teal" onClick={handleMoodSubmit}>
                    Record Mood
                </Button>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Stat>
                            <StatLabel>Average Mood</StatLabel>
                            <StatNumber>{getAverageMood()}</StatNumber>
                        </Stat>
                    </GridItem>
                    <GridItem>
                        <Stat>
                            <StatLabel>Mood Trend</StatLabel>
                            <StatNumber>{getMoodTrend()}</StatNumber>
                        </Stat>
                    </GridItem>
                </Grid>
                <Box height="400px">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={moodHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
                            />
                            <YAxis
                                domain={[0, 4]}
                                ticks={[0, 1, 2, 3, 4]}
                                tickFormatter={(value) => moods[value]}
                            />
                            <Tooltip
                                labelFormatter={(label) => new Date(label).toLocaleString()}
                                formatter={(value) => [moods[value], 'Mood']}
                            />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </VStack>
        </Box>
    );
};
