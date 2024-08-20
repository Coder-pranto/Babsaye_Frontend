/* eslint-disable react/prop-types */

import { IoMdRemoveCircleOutline } from "react-icons/io";

const OrderSummary = ({ order, handleRemoveFromOrder, handleDecrementOrder, handleIncrementOrder, handleCancelOrder }) => {
  return (
    <div className="w-full md:w-2/3 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-4">Item</th>
            <th className="pb-4">Price</th>
            <th className="pb-4">Qty</th>
            <th className="pb-4">Subtotal</th>
            <th className="pb-4"></th>
          </tr>
        </thead>
        <tbody>
          {order.map(item => (
            <tr key={item.orderId} className="border-b">
              <td className="py-4">{item.name}</td>
              <td className="py-4">${item.price.toFixed(2)}</td>
              <td className="py-4 flex items-center">
                <button onClick={() => handleDecrementOrder(item.orderId)} className="px-2 py-1 bg-gray-200 rounded-md mr-2">-</button>
                {item.quantity}
                <button onClick={() => handleIncrementOrder(item.orderId)} className="px-2 py-1 bg-gray-200 rounded-md ml-2">+</button>
              </td>
              <td className="py-4">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="py-4">
                <button onClick={() => handleRemoveFromOrder(item.orderId)} className="text-red-500"><IoMdRemoveCircleOutline size={20} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className=" mt-4">
        <button onClick={handleCancelOrder} className="w-full px-4 py-2 bg-red-400 text-slate-700 rounded-md tracking-widest">CANCEL ORDER</button>
      </div>

    </div>
  );
};

export default OrderSummary;
