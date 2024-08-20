import React from 'react';

const FormFileInput = ({ label, icon, onChange }) => {
    return (
        <div className="mb-4 flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <div className="flex flex-col w-full">
                <label className="text-sm font-semibold mb-1">{label}</label>
                <input
                    type="file"
                    onChange={onChange}
                    className="p-2 border rounded w-full"
                />
            </div>
        </div>
    );
};

export default FormFileInput;
