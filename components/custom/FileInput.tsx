import React, { ChangeEvent, useState } from 'react';

interface FileInputProps {
    onChange: (files: File[]) => void;
    label?: string;
    accept?: string;
    multiple?: boolean;  // Allow specifying if multiple files can be selected
}

const FileInput: React.FC<FileInputProps> = ({ onChange, multiple = false, accept = "image/*", label = "Add files" }) => {
    // State to hold the names of selected files
    const [fileNames, setFileNames] = useState<string[]>([]);

    // Handle file selection
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            // Convert FileList to an array of File objects
            const filesArray = Array.from(fileList);

            // Call onChange with the selected files
            onChange(filesArray);

            // Update fileNames state with the names of the selected files
            const namesArray = filesArray.map(file => file.name);
            setFileNames(namesArray);
        }
    };

    return (
        <div className='w-full'>

            <label htmlFor="file-input" className='w-full inline-block px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-ring'>{label}</label>
            <input
                className='hidden'
                type="file"
                id="file-input"
                multiple={multiple}
                accept={accept}
                onChange={handleFileChange}
            />
            
            {fileNames.length > 0 && (
                <ul className="px-2 pb-1 text-xs text-muted-foreground">
                    {fileNames.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FileInput;
