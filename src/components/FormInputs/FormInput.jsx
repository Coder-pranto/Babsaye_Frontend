// src/components/FormInput.jsx

const FormInput = ({ label, icon, ...props }) => {
    
    return (
        <div className="mb-4 flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <div className="flex flex-col w-full">
                <label className="text-sm font-semibold mb-1">{label}</label>
                <input className="p-2 border rounded w-full" {...props} />
            </div>
        </div>
    );
};

export default FormInput;
