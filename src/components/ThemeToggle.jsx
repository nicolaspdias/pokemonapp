import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styled from 'styled-components';

const ToggleButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <ToggleButton onClick={toggleTheme}>
            {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        </ToggleButton>
    );
};

export default ThemeToggle;