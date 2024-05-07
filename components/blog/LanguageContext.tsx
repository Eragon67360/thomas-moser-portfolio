'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface LanguageContextType {
    selectedLanguages: string[];
    setSelectedLanguages: (languages: string[]) => void;
}
interface LanguageProviderProps {
    children: ReactNode;
  }
  
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguageContext must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }: any) => {
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['english']);
    return (
        <LanguageContext.Provider value={{ selectedLanguages, setSelectedLanguages }}>
            {children}
        </LanguageContext.Provider>
    );
};
