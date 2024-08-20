import { useState, useRef } from 'react';
import { FaArrowLeft, FaIdCard } from 'react-icons/fa';
import Button from '../../../components/Button'; // Adjust the path as needed

const SmsAuth = () => {
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [tradeLicence, setTradeLicence] = useState(null);

  const nidFrontInputRef = useRef(null);
  const nidBackInputRef = useRef(null);
  const tradeLicenceInputRef = useRef(null);

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Implement save functionality here
  };

  return (
    <div className="container mx-auto p-4 mt-10 mb-4">
      <div className="flex justify-between items-center bg-[#5D5B10] p-4 mb-4">
        <div className="flex items-center">
          <FaArrowLeft className="text-white mr-2" />
          <h2 className="text-2xl font-bold text-white">SMS AUTHENTICATION</h2>
        </div>
        <Button
          text="Go Back"
          bgColor="bg-gray-700 hover:bg-gray-500"
          textColor="text-white"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center">
          <label className="block text-lg font-medium text-gray-700 mb-2">Nid Front Image</label>
          <div 
            className="w-48 h-32 border-4 border-dashed border-gray-500 flex items-center justify-center mb-2"
            onClick={() => nidFrontInputRef.current.click()}
          >
            {nidFront ? <img src={nidFront} alt="Nid Front" className="h-full" /> : <FaIdCard className="text-2xl text-gray-500" />}
          </div>
          <input 
            type="file" 
            ref={nidFrontInputRef}
            onChange={(e) => handleFileChange(e, setNidFront)} 
            className="hidden" 
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="block text-lg font-medium text-gray-700 mb-2">Nid Back Image</label>
          <div 
            className="w-48 h-32 border-4 border-dashed border-gray-500 flex items-center justify-center mb-2"
            onClick={() => nidBackInputRef.current.click()}
          >
            {nidBack ? <img src={nidBack} alt="Nid Back" className="h-full" /> : <FaIdCard className="text-2xl text-gray-500" />}
          </div>
          <input 
            type="file" 
            ref={nidBackInputRef}
            onChange={(e) => handleFileChange(e, setNidBack)} 
            className="hidden" 
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="block text-lg font-medium text-gray-700 mb-2">Trade Licence Image</label>
          <div 
            className="w-48 h-32 border-4 border-dashed border-gray-500 flex items-center justify-center mb-2"
            onClick={() => tradeLicenceInputRef.current.click()}
          >
            {tradeLicence ? <img src={tradeLicence} alt="Trade Licence" className="h-full" /> : <FaIdCard className="text-2xl text-gray-500" />}
          </div>
          <input 
            type="file" 
            ref={tradeLicenceInputRef}
            onChange={(e) => handleFileChange(e, setTradeLicence)} 
            className="hidden" 
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          text="Save"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default SmsAuth;
