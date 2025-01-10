import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import ThemeToggle from './components/ThemeToggle';
import './styles/styles.css';

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <div>
                    <ThemeToggle />
                    <Routes>
                        <Route path="/" element={<PokemonList />} />
                        <Route path="/pokemon/:name" element={<PokemonDetail />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
