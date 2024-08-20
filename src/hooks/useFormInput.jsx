// src/hooks/useFormInput.js
import { useState } from 'react';

const useFormInput = (initialValue, type='text') => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return {
        type,
        value,
        onChange: handleChange,
    };
};

export default useFormInput;
