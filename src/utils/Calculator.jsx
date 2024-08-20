import { useState } from "react";

const SimpleCalculator = () => {
    const [input, setInput] = useState("");
    
    const handleButtonClick = (value) => {
      setInput(input + value);
    };
  
    const calculateResult = () => {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    };
  
    const clearInput = () => {
      setInput("");
    };
  
    return (
      <div className="calculator bg-white text-black p-4 rounded">
        <input type="text" value={input} readOnly className="w-full mb-2 p-2 border" />
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/"].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)} className="p-2 border">{value}</button>
          ))}
          {["4", "5", "6", "*"].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)} className="p-2 border">{value}</button>
          ))}
          {["1", "2", "3", "-"].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)} className="p-2 border">{value}</button>
          ))}
          {["0", ".", "=", "+"].map((value) => (
            <button key={value} onClick={value === "=" ? calculateResult : () => handleButtonClick(value)} className="p-2 border">{value}</button>
          ))}
          <button onClick={clearInput} className="col-span-4 p-2 border bg-red-500 text-white">Clear</button>
        </div>
      </div>
    );
  };

  export default SimpleCalculator;