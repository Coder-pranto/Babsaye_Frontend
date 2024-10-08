

const FormSelect = ({ label, icon, options, ...props }) => {
    return (
        <div className="mb-4 flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <div className="flex flex-col w-full">
                <label className="text-sm font-semibold mb-1">{label}</label>
                <select className="p-2 border rounded w-full" {...props}>
                <option key={0}  value="">Select an option</option>
                    {options.map((option, index) => (
                        <option key={index+1} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FormSelect;
