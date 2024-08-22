// import { useState } from 'react';
// import { FaCog, FaUser, FaPowerOff, FaPlus, FaMinus, FaAngleDown, FaAngleUp } from 'react-icons/fa';
// import { RxDoubleArrowRight } from "react-icons/rx";
// import { useLogout } from '../utils/Logout';
// import { sections } from '../utils/subSections'

// const Sidebar = ({ isCollapsed, handleHover }) => {
//     const [openSections, setOpenSections] = useState({});
//     const logout = useLogout();

//     const toggleSection = (sectionName) => {
//         setOpenSections((prev) => ({
//             ...prev,
//             [sectionName]: !prev[sectionName],
//         }));
//     };

//     const handleSectionClick = (sectionName) => {
//         if (sectionName === "Sign Out") {
//             logout(); // Call logout function
//         } else {
//             toggleSection(sectionName);
//         }
//     };

//     const renderSubSubCategories = (subSubCategories, level = 2) => {
//         return subSubCategories.map((subSubCategory) => (
//             <div key={subSubCategory.name} className={`pl-${level * 4} py-1`}>
//                 <div
//                     className="flex justify-between items-center cursor-pointer p-2 hover:text-blue-400"
//                     onClick={() => toggleSection(subSubCategory.name)}
//                 >
//                     <span className="flex justify-center items-center gap-x-1"> <RxDoubleArrowRight /> {subSubCategory.name}</span>
//                 </div>
//             </div>
//         ));
//     };

//     const renderSubCategories = (subCategories, level = 1) => {
//         return subCategories.map((subCategory) => (
//             <div key={subCategory.name} className={`pl-${level * 4} py-1`}>
//                 <div
//                     className="flex justify-between items-center cursor-pointer p-2 hover:text-blue-400"
//                     onClick={() => toggleSection(subCategory.name)}
//                 >
//                     <span className="flex justify-center items-center gap-x-1"> <RxDoubleArrowRight /> <span>{subCategory.name}</span></span>
//                     {subCategory.subSubCategories && (
//                         openSections[subCategory.name] ? <FaAngleUp /> : <FaAngleDown />
//                     )}
//                 </div>
//                 {openSections[subCategory.name] && subCategory.subSubCategories && (
//                     <div className="pl-4">
//                         {renderSubSubCategories(subCategory.subSubCategories, level + 1)}
//                     </div>
//                 )}
//             </div>
//         ));
//     };

//     return (
//         <div
//             className={`bg-white text-black ${isCollapsed ? 'w-16' : 'w-[320px]'} h-full overflow-y-auto transition-all duration-300`}
//             onMouseEnter={() => handleHover(true)}
//             onMouseLeave={() => handleHover(false)}
//         >
//             <div>
//                 <img src="./l.PNG" className="mx-auto" alt="CompanyLogo" />
//             </div>
//             <div className="p-4 flex flex-col items-center">
//                 {!isCollapsed && (
//                     <div className="mb-4 flex flex-col items-center justify-center">
//                         <h2 className="text-xl">Pranto</h2>
//                         <p className="text-sm">01521206350</p>
//                         <p className="text-sm">SMS Balance: 10.00 Tk</p>
//                     </div>
//                 )}
//                 <div className={`flex ${isCollapsed ? "flex-col space-y-3 mt-8" : "flex-row space-x-2 mb-4"} `}>
//                     <div className="relative group">
//                         <FaCog className="w-8 h-8 p-2 bg-gray-100 border-gray-400 border-2 rounded-full cursor-pointer" />
//                         {!isCollapsed && (
//                             <span className="tooltip-text bg-gray-700 p-2 rounded text-xs text-white absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100">Settings</span>
//                         )}
//                     </div>
//                     <div className="relative group">
//                         <FaUser className="w-8 h-8 p-2 bg-gray-100 border-gray-400 border-2 rounded-full cursor-pointer" />
//                         {!isCollapsed && (
//                             <span className="tooltip-text bg-gray-700 p-2 rounded text-xs text-white absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100">Profile</span>
//                         )}
//                     </div>
//                     <div className="relative group">
//                         <FaPowerOff onClick={logout} className="w-8 h-8 p-2 bg-gray-100 border-gray-400 border-2 rounded-full cursor-pointer" />
//                         {!isCollapsed && (
//                             <span className="tooltip-text bg-gray-700 p-2 rounded text-xs text-white absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100">Logout</span>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div className="">
//                 {sections.map((section) => (
//                     <div key={section.name}>
//                         <div
//                             className={`flex justify-between items-center cursor-pointer p-2 ${openSections[section.name] ? "bg-[#5d5b10] text-white" : ""}
//                             ${section.name === "Dashboard" ? "bg-[#5d5b10] text-white" : ""}
//                             hover:bg-[#5d5b10] hover:text-white`}
//                             onClick={() => handleSectionClick(section.name)}
//                         >
//                             <div className="flex items-center space-x-2">
//                                 {section.icon}
//                                 {!isCollapsed && <span>{section.name}</span>}
//                             </div>
//                             {!isCollapsed && section.subCategories && (
//                                 openSections[section.name] ? <FaMinus /> : <FaPlus />
//                             )}
//                         </div>
//                         {openSections[section.name] && section.subCategories && (
//                             <div className="pl-4 bg-[#cdca9b]">
//                                 {renderSubCategories(section.subCategories)}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;



import { useState } from 'react';
import { FaCog, FaUser, FaPowerOff, FaPlus, FaMinus, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { RxDoubleArrowRight } from "react-icons/rx";
import { useLogout } from '../utils/Logout';
import { sections } from '../utils/subSections';
import { Link , useNavigate} from 'react-router-dom';

const Sidebar = ({ isCollapsed, handleHover }) => {
    const [openSections, setOpenSections] = useState({});
    const logout = useLogout();
    const navigate = useNavigate();

    const toggleSection = (sectionName) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionName]: !prev[sectionName],
        }));
    };

    const handleSectionClick = (sectionName) => {
        if (sectionName === "Sign Out") {
            logout(); // Call logout function
        } else {
            toggleSection(sectionName);
        }
    };

    const renderSubSubCategories = (subSubCategories, level = 2) => {
        return subSubCategories.map((subSubCategory) => (
            <div key={subSubCategory.name} className={`pl-${level * 4} py-1`}>
                <Link
                    to={`/${subSubCategory.name.toLowerCase().replace(/ /g, '_')}`}
                    className="flex justify-between items-center cursor-pointer p-2 hover:text-blue-400"
                >
                    <span className="flex justify-center items-center gap-x-1"><RxDoubleArrowRight /> {subSubCategory.name}</span>
                </Link>
            </div>
        ));
    };

    const renderSubCategories = (subCategories, level = 1) => {
        return subCategories.map((subCategory) => (
            <div key={subCategory.name} className={`pl-${level * 4} py-1`}>
                <div
                    className="flex justify-between items-center cursor-pointer p-2 hover:text-blue-400"
                    onClick={() => toggleSection(subCategory.name)}
                >
                    <span className="flex justify-center items-center gap-x-1"><RxDoubleArrowRight /> <span>{subCategory.name}</span></span>
                    {subCategory.subSubCategories && (
                        openSections[subCategory.name] ? <FaAngleUp /> : <FaAngleDown />
                    )}
                </div>
                {openSections[subCategory.name] && subCategory.subSubCategories && (
                    <div className="pl-4">
                        {renderSubSubCategories(subCategory.subSubCategories, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div
            className={`bg-white text-black ${isCollapsed ? 'w-16' : 'w-[320px]'} h-screen overflow-y-auto transition-all duration-300`}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
        >
            <div>
                <img src="./l.PNG" className="mx-auto" alt="CompanyLogo" />
            </div>
            <div className="p-4 flex flex-col items-center">
                {!isCollapsed && (
                    <div className="mb-4 flex flex-col items-center justify-center">
                        <h2 className="text-xl">Pranto</h2>
                        <p className="text-sm">01521206350</p>
                        <p className="text-sm">SMS Balance: 10.00 Tk</p>
                    </div>
                )}
                <div className={`flex ${isCollapsed ? "flex-col space-y-3 mt-8" : "flex-row space-x-2 mb-4"}`}>
                    <div className="relative group">
                        <FaCog className="w-8 h-8 p-2 bg-gray-100 border-gray-400 border-2 rounded-full cursor-pointer" />
                        {!isCollapsed && (
                            <span className="tooltip-text bg-gray-700 p-2 rounded text-xs text-white absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100">Settings</span>
                        )}
                    </div>
                    <div className="relative group">
                        <FaUser className="w-8 h-8 p-2 bg-gray-100 border-gray-400 border-2 rounded-full cursor-pointer" />
                        {!isCollapsed && (
                            <span className="tooltip-text bg-gray-700 p-2 rounded text-xs text-white absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100" onClick={()=> navigate('/myprofile')}>Profile</span>
                        )}
                    </div>
                    <div className="relative group">
                        <FaPowerOff onClick={logout} className="w-8 h-8 p-2 bg-gray-100 border-gray-400 border-2 rounded-full cursor-pointer" />
                        {!isCollapsed && (
                            <span className="tooltip-text bg-gray-700 p-2 rounded text-xs text-white absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100">Logout</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="pb-4">
                {sections.map((section) => (
                    <div key={section.name}>
                        <div
                            className={`flex justify-between items-center cursor-pointer p-2 ${openSections[section.name] ? "bg-[#5d5b10] text-white" : ""}
                            ${section.name === "Dashboard" ? "bg-[#5d5b10] text-white" : ""}
                            hover:bg-[#5d5b10] hover:text-white`}
                            onClick={() => handleSectionClick(section.name)}
                        >
                            <div className="flex items-center space-x-2">
                                {section.icon}
                                {!isCollapsed && <span>{section.name}</span>}
                            </div>
                            {!isCollapsed && section.subCategories && (
                                openSections[section.name] ? <FaMinus /> : <FaPlus />
                            )}
                        </div>
                        {openSections[section.name] && section.subCategories && (
                            <div className="pl-4 bg-[#cdca9b]">
                                {renderSubCategories(section.subCategories)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;








