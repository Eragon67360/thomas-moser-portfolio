import React from 'react';

// Set up the initial context
const ThemeContext = React.createContext({
    theme: 'light', // Default to light theme
    colors: {
        background: '#f0f0f0',
        foreground: '#303030',
        primary: '#ffef9f',
        svgFill: '#fff',
    }
});

// Export the provider and consumer
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
export default ThemeContext;
