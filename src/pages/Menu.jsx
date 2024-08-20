


// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { v4 as uuidv4 } from 'uuid';
// import foodItems from '../data/foodData';

// const Menu = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedTable = location.state?.selectedTable;
//   const uniqueId = uuidv4();

//   const categories = [...new Set(foodItems.map(item => item.category))];

//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [order, setOrder] = useState([]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleAddToOrder = (item) => {
//     const existingItem = order.find(orderItem => orderItem.id === item.id);
//     if (existingItem) {
//       setOrder(order.map(orderItem => 
//         orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
//       ));
//     } else {
//       setOrder([...order, { ...item, orderId: `${selectedTable.id}-${Date.now()}`, quantity: 1 }]);
//     }
//   };

//   const handleDecrementOrder = (orderId) => {
//     const itemToDecrement = order.find(item => item.orderId === orderId);
//     if (itemToDecrement.quantity > 1) {
//       setOrder(order.map(item =>
//         item.orderId === orderId ? { ...item, quantity: item.quantity - 1 } : item
//       ));
//     }
//   };

//   const handleRemoveFromOrder = (orderId) => {
//     setOrder(order.filter(item => item.orderId !== orderId));
//   };

//   const totalCost = order.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const serviceCharge = totalCost * 0.05;
//   const finalTotal = totalCost + serviceCharge;

//   const handleCancelOrder = () => {
//     setOrder([]);
//     navigate('/dashboard');
//   };

//   const handleSendOrder = () => {
//     navigate('/payment', { state: { order, selectedTable, totalCost, serviceCharge, finalTotal } });
//   };

//   return (
//     <div className="flex h-full bg-gray-100">
//       <div className="flex-1 p-6">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Menu</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {foodItems
//             .filter(item => item.category === selectedCategory)
//             .map((item) => (
//               <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
//                 <img src={item.image} alt={item.name} className="w-full h-20 sm:h-48 object-cover" />
//                 <div className="p-2">
//                   <h2 className="text-xl font-bold mb-2 text-gray-700">{item.name}</h2>
//                   <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
//                   <button
//                     className="w-full py-2 px-4 bg-green-500 text-white rounded-lg flex items-center justify-center"
//                     onClick={() => handleAddToOrder(item)}
//                   >
//                     <IoMdAddCircleOutline className="mr-2" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>

//         <div className="flex mt-8 justify-center">
//           {categories.map((category) => (
//             <button
//               key={category}
//               className={`px-4 py-2 mr-2 text-gray-700 font-medium ${selectedCategory === category ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
//               onClick={() => handleCategoryChange(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="w-1/3 p-6 border-l border-gray-300 bg-white">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Order # zx{uniqueId.slice(0, 8)}</h2>
//         <p className="mb-4 text-gray-600">Guest: {selectedTable ? selectedTable.guests : '-'}</p>
//         <p className="mb-4 text-gray-600">Table: {selectedTable ? `T${selectedTable.id}` : '-'}</p>
//         <ul className="mb-6">
//           {order.map(item => (
//             <li key={item.orderId} className="flex justify-between items-center mb-4 text-gray-700">
//               <span>{item.name}</span>
//               <span>${(item.price * item.quantity).toFixed(2)} ({item.quantity})</span>
//               <div className="flex items-center">
//                 <button className="px-2 py-1 bg-red-500 text-white rounded-lg" onClick={() => handleDecrementOrder(item.orderId)}> - </button>
//                 <button className="px-2 py-1 bg-green-500 text-white rounded-lg ml-2" onClick={() => handleAddToOrder(item)}> + </button>
//                 <button className="px-2 py-1 bg-yellow-500 text-white rounded-lg ml-2" onClick={() => handleRemoveFromOrder(item.orderId)}>Remove</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <div className="mt-4">
//           <p className="text-lg text-gray-700">Total Cost: ${totalCost.toFixed(2)}</p>
//           <p className="text-lg text-gray-700">Service Charge (5%): ${serviceCharge.toFixed(2)}</p>
//           <p className="text-xl font-bold text-gray-800">Final Total: ${finalTotal.toFixed(2)}</p>
//         </div>
//         <div className="mt-6 flex">
//           <button className="w-full py-2 px-4 bg-red-500 text-white rounded-lg mr-2" onClick={handleCancelOrder}>Cancel Order</button>
//           <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg" onClick={handleSendOrder}>Send Order</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import foodItems from '../data/foodData';

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTable = location.state?.selectedTable;
  const orderNumber = location.state?.orderNumber;

  const categories = [...new Set(foodItems.map(item => item.category))];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [order, setOrder] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCheckboxChange = (item) => {
    const existingItem = order.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      setOrder(order.filter(orderItem => orderItem.id !== item.id));
    } else {
      setOrder([...order, { ...item, orderId: `${selectedTable}-${Date.now()}`, quantity: 1 }]);
    }
  };

  const handleIncrementOrder = (itemId) => {
    setOrder(order.map(item => 
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrementOrder = (orderId) => {
    const itemToDecrement = order.find(item => item.orderId === orderId);
    if (itemToDecrement.quantity > 1) {
      setOrder(order.map(item =>
        item.orderId === orderId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const handleRemoveFromOrder = (orderId) => {
    setOrder(order.filter(item => item.orderId !== orderId));
  };

  const totalCost = order.reduce((total, item) => total + (item.price * item.quantity), 0);
  const serviceCharge = totalCost * 0.05;
  const finalTotal = totalCost + serviceCharge;

  const handleCancelOrder = () => {
    setOrder([]);
    navigate('/dashboard');
  };

  const handleSendOrder = () => {
    navigate('/payment', { state: { order, selectedTable, totalCost, serviceCharge, finalTotal, orderNumber } });
  };

  return (
    <div className="flex h-full bg-gray-100">
      <div className="flex-grow p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 ">Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {foodItems
            .filter(item => item.category === selectedCategory)
            .map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
                <img src={item.image} alt={item.name} className="w-full h-20 sm:h-48 object-cover" />
                <div className="p-2">
                  <h2 className="text-xl font-bold mb-2 text-gray-700">{item.name}</h2>
                  <p className="text-gray-600 mb-4">৳{item.price.toFixed(2)}</p>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!!order.find(orderItem => orderItem.id === item.id)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    <span className="ml-2 text-gray-700">Add to Order</span>
                  </label>
                </div>
              </div>
            ))}
        </div>

        <div className="flex mt-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 mr-2 text-gray-700 font-medium ${selectedCategory === category ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="w-[40%] p-6 border-l border-gray-300 bg-white">
        <h2 className="text-xl font-bold mb-6 text-green-800">Order # {orderNumber}</h2>
        <p className="mb-4 text-gray-600">Table: {selectedTable ? `T${selectedTable}` : '-'}</p>
        <ul className="mb-6">
          {order.map(item => (
            <li key={item.orderId} className="flex justify-between items-center mb-4 text-gray-700 bg-[#b1ced4] p-1 rounded-lg border-2 border-blue-400">
              <span>{item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)} ({item.quantity})</span>
              <div className="flex items-center">
                <button className="px-2 py-1 bg-red-500 text-white rounded-lg" onClick={() => handleDecrementOrder(item.orderId)}> - </button>
                <button className="px-2 py-1 bg-green-500 text-white rounded-lg ml-2" onClick={() => handleIncrementOrder(item.id)}> + </button>
                <button className="px-2 py-1 bg-yellow-500 text-white rounded-lg ml-2" onClick={() => handleRemoveFromOrder(item.orderId)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="text-lg text-gray-700">Total Cost: ৳{totalCost.toFixed(2)}</p>
          <p className="text-lg text-gray-700">Service Charge (5%): ৳{serviceCharge.toFixed(2)}</p>
          <p className="text-xl font-bold text-gray-800">Final Total: ৳{finalTotal.toFixed(2)}</p>
        </div>
        <div className="mt-6 flex">
          <button className="w-full py-2 px-4 bg-red-500 text-white rounded-lg mr-2" onClick={handleCancelOrder}>Cancel Order</button>
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg" onClick={handleSendOrder}>Send Order</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
