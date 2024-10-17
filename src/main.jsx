import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Privacy from './components/Privacy.jsx';
import Terms from './components/Terms.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

const root = createRoot(document.getElementById('root'));

root.render(
    <ChakraProvider theme={theme}>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/privacy" element={<Privacy />} />d
                <Route path="/terms" element={<Terms />} />
            </Routes>
        </Router>
    </ChakraProvider>
);
