import { useState } from 'react';

const useFormFileInput = (initialFile = null) => {
    const [file, setFile] = useState(initialFile);

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]); // Get the first file
        } else {
            setFile(null); // Clear the file if none is selected
        }
    };

    return {
        file,
        onChange: handleChange,
    };
};

export default useFormFileInput;

