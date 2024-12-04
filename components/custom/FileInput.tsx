// import React, { ChangeEvent, useState } from 'react';

// interface FileInputProps {
//     onChange: (files: File[]) => void;
//     label?: string;
//     accept?: string;
//     multiple?: boolean;  // Allow specifying if multiple files can be selected
// }

// const FileInput: React.FC<FileInputProps> = ({ onChange, multiple = false, accept = "image/*", label = "Add files" }) => {
//     // State to hold the names of selected files
//     const [fileNames, setFileNames] = useState<string[]>([]);

//     // Handle file selection
//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const fileList = event.target.files;
//         if (fileList) {
//             // Convert FileList to an array of File objects
//             const filesArray = Array.from(fileList);

//             // Call onChange with the selected files
//             onChange(filesArray);

//             // Update fileNames state with the names of the selected files
//             const namesArray = filesArray.map(file => file.name);
//             setFileNames(namesArray);
//         }
//     };

//     return (
//         <div className='w-full'>

//             <label htmlFor="file-input" className='w-full inline-block px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-ring'>{label}</label>
//             <input
//                 className='hidden'
//                 type="file"
//                 id="file-input"
//                 multiple={multiple}
//                 accept={accept}
//                 onChange={handleFileChange}
//             />
            
//             {fileNames.length > 0 && (
//                 <ul className="px-2 pb-1 text-xs text-muted-foreground">
//                     {fileNames.map((name, index) => (
//                         <li key={index}>{name}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default FileInput;
import React, { ChangeEvent, useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md"; // Import the icon

interface FileInputProps {
  onChange: (files: File[]) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  onChange,
  multiple = false,
  accept = "image/*",
  label = "Upload attachment",
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      onChange(filesArray);
      const namesArray = filesArray.map((file) => file.name);
      setFileNames(namesArray);
    }
  };

  return (
    <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center mt-4">
      <label
        htmlFor="file-input"
        className="bg-white text-blue-500 border border-gray-300 px-4 py-2 rounded-md inline-flex items-center gap-2 cursor-pointer hover:bg-blue-50 transition"
      >
        <MdOutlineAttachFile className="text-lg" /> {/* Icon beside the label */}
        {label}
      </label>
      <input
        type="file"
        id="file-input"
        multiple={multiple}
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
      <p className="mt-2 text-sm text-gray-500">Or drop files</p>
      {fileNames.length > 0 && (
        <ul className="mt-3 text-sm text-gray-600">
          {fileNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileInput;

