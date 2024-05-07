'use client'
import React, { FC, useMemo, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import { Selection } from "@react-types/shared";
import { useLanguageContext } from "./LanguageContext";

interface LanguageDropdownProps {
    selectedLanguages: string[];
    setSelectedLanguages: (languages: string[]) => void;
}

const LanguageDropdown: FC<LanguageDropdownProps> = ({ selectedLanguages, setSelectedLanguages }: LanguageDropdownProps) => {

    // const { selectedLanguages, setSelectedLanguages } = useLanguageContext();
    const selectedValue = useMemo(
        () => selectedLanguages.join(", ").replaceAll("_", " "),
        [selectedLanguages]
    );
    const handleSelectionChange = (keys: Selection) => {
        const languages = Array.from(keys as Set<string>);
        setSelectedLanguages(languages.map(key => key.replace('_', ' ')));
    };

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        endContent={<IoIosArrowDown />}
                        variant="bordered"
                        className="capitalize"
                    >
                        {selectedValue || "Select Language"}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Multiple selection example"
                    variant="flat"
                    closeOnSelect={false}
                    disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={new Set(selectedLanguages)}
                    onSelectionChange={handleSelectionChange}
                >
                    <DropdownItem key="english">English</DropdownItem>
                    <DropdownItem key="french">French</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default LanguageDropdown;
// "use client"
// import React, { useState } from 'react';
// import { Checkbox, Spacer } from '@nextui-org/react';

// interface LanguageDropdownProps {
//   selectedLanguages: string[];
//   onLanguageChange: (languages: string[]) => void;
// }

// const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ selectedLanguages, onLanguageChange }) => {
//   const [languages, setLanguages] = useState<string[]>(selectedLanguages);

//   const handleLanguageChange = (language: string, checked: boolean) => {
//     let updatedLanguages = checked
//       ? [...languages, language]
//       : languages.filter(lang => lang !== language);

//     // Ensure at least one language is always selected
//     if (updatedLanguages.length === 0) {
//       updatedLanguages = [language];
//       setLanguages(updatedLanguages);
//     } else {
//       setLanguages(updatedLanguages);
//     }
//     onLanguageChange(updatedLanguages);
//   };

//   return (
//     <>
//       <Checkbox
//         checked={languages.includes('english')}
//         onChange={(e) => handleLanguageChange('english', e.target.checked)}
//       >
//         English
//       </Checkbox>
//       <Spacer x={0.5} />
//       <Checkbox
//         checked={languages.includes('french')}
//         onChange={(e) => handleLanguageChange('french', e.target.checked)}
//       >
//         French
//       </Checkbox>
//     </>
//   );
// };

// export default LanguageDropdown;
