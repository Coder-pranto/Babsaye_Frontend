

// import React from 'react';

// const Invoice = React.forwardRef(({ order, totalCost, serviceCharge, finalTotal, selectedTable, orderNumber }, ref) => {
//   const discount = (totalCost + serviceCharge) * 0.1; // 10% discount
//   const totalPayment = finalTotal - discount;
//   const cashPaid = 1000; // Example cash paid amount
//   const change = cashPaid - totalPayment;
//   const totalQuantity = order.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <div ref={ref} className="p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Invoice</h2>
//       <p className="text-gray-600 mb-2">Order #: {orderNumber}</p>
//       <p className="text-gray-600 mb-2">Table: {selectedTable}</p>
//       <table className="w-full text-left mt-4 mb-4 border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border-b">Item</th>
//             <th className="py-2 px-4 border-b">Qty</th>
//             <th className="py-2 px-4 border-b">MRP</th>
//             <th className="py-2 px-4 border-b">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {order.map(item => (
//             <tr key={item.orderId} className="border-b">
//               <td className="py-4 px-4 border-r">{item.name}</td>
//               <td className="py-4 px-4 border-r">{item.quantity}</td>
//               <td className="py-4 px-4 border-r">৳{item.price.toFixed(2)}</td>
//               <td className="py-4 px-4">৳{(item.price * item.quantity).toFixed(2)}</td>
//             </tr>
//           ))}
//           <tr>
//             <td className="py-4 px-4 border-r border-b-2 font-bold">Total Price</td>
//             <td className="py-4 px-4 border-r border-b-2">{totalQuantity}</td>
//             <td className="py-4 px-4 border-r border-b-2"></td>
//             <td className="py-4 px-4 border-b-2">৳{totalCost.toFixed(2)}</td>
//           </tr>
//           <tr>
//             <td className="py-4 px-4 border-r border-b-2 font-bold">Total Discount (10%)</td>
//             <td className="py-4 px-4 border-b-2"></td>
//             <td className="py-4 px-4 border-b-2"></td>
//             <td className="py-4 px-4 border-b-2">৳{discount.toFixed(2)}</td>
//           </tr>
//           <tr className="border-t font-bold">
//             <td className="py-4 px-4 border-r">Total Payment</td>
//             <td className="py-4 px-4"></td>
//             <td className="py-4 px-4"></td>
//             <td className="py-4 px-4">৳{totalPayment.toFixed(2)}</td>
//           </tr>
//           <tr className="border-t font-bold">
//             <td className="py-4 px-4 border-r">Cash</td>
//             <td className="py-4 px-4">৳{cashPaid.toFixed(2)}</td>
//             <td className="py-4 px-4"></td>
//             <td className="py-4 px-4">৳{change.toFixed(2)}</td>
//           </tr>
//           <tr className="border-t font-bold">
//             <td className="py-4 px-4 border-r">Paid By</td>
//             <td className="py-4 px-4">Amount</td>
//             <td className="py-4 px-4"></td>
//             <td className="py-4 px-4">Change</td>
//           </tr>
//         </tbody>
//       </table>
//       <div className='text-center justify-normal border-t-3 border-red-300'>
//         <p>Thank you please come again</p>
//         <p>Software Solution by DESHIT-BD</p>
//       </div>

//     </div>
//   );
// });

// Invoice.displayName = 'Invoice';

// export default Invoice;



import React from 'react';
import { format } from 'date-fns';

const Invoice = React.forwardRef(({ order, totalCost, serviceCharge, finalTotal, selectedTable, orderNumber }, ref) => {
  const discount = (totalCost + serviceCharge) * 0.1; // 10% discount
  const totalPayment = finalTotal - discount;
  const cashPaid = 1000; // Example cash paid amount
  const change = cashPaid - totalPayment;
  const totalQuantity = order.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div ref={ref} className="p-6 bg-white shadow-md rounded-lg">
      <div className="text-center mb-6">
        <img src="./logo.jpg" alt="Company Logo" className="w-32 h-32 mx-auto mb-2" />
        <h1 className="text-2xl font-bold">DESI CUISINE</h1>
        <p className="text-gray-600">Telephone: +123-456-7890</p>
      </div>
      <h2 className="text-xl font-bold mb-4">Invoice</h2>
      <div className='flex justify-between'>
      <p className="text-gray-600 mb-2">Order #: {orderNumber}</p>
      <p className="text-gray-600 mb-2">{format(new Date(), "MMMM do yyyy, HH:mm")}</p>
      
      </div>
      <div className='flex justify-between'>
        <p className="text-gray-600 mb-2">Table: {selectedTable}</p>
        <p className="text-gray-600 mb-2">Type: POS CUSTOMER</p>
      </div>

      <table className="w-full text-left mt-4 mb-4 border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Item</th>
            <th className="py-2 px-4 border-b">Qty</th>
            <th className="py-2 px-4 border-b">MRP</th>
            <th className="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.map(item => (
            <tr key={item.orderId} className="border-b">
              <td className="py-4 px-4 border-r">{item.name}</td>
              <td className="py-4 px-4 border-r">{item.quantity}</td>
              <td className="py-4 px-4 border-r">৳{item.price.toFixed(2)}</td>
              <td className="py-4 px-4">৳{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td className="py-4 px-4 border-r border-b-2 font-bold">Total Price</td>
            <td className="py-4 px-4 border-r border-b-2">{totalQuantity}</td>
            <td className="py-4 px-4 border-r border-b-2"></td>
            <td className="py-4 px-4 border-b-2">৳{totalCost.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-4 px-4 border-r border-b-2 font-bold">Total Discount (10%)</td>
            <td className="py-4 px-4 border-b-2"></td>
            <td className="py-4 px-4 border-b-2"></td>
            <td className="py-4 px-4 border-b-2">৳{discount.toFixed(2)}</td>
          </tr>
          <tr className="border-t font-bold">
            <td className="py-4 px-4 border-r">Total Payment</td>
            <td className="py-4 px-4"></td>
            <td className="py-4 px-4"></td>
            <td className="py-4 px-4">৳{totalPayment.toFixed(2)}</td>
          </tr>
          <tr className="border-t font-bold">
            <td className="py-4 px-4 border-r">Cash</td>
            <td className="py-4 px-4">৳{cashPaid.toFixed(2)}</td>
            <td className="py-4 px-4"></td>
            <td className="py-4 px-4">৳{change.toFixed(2)}</td>
          </tr>
          <tr className="border-t font-bold">
            <td className="py-4 px-4 border-r">Paid By</td>
            <td className="py-4 px-4">Amount</td>
            <td className="py-4 px-4"></td>
            <td className="py-4 px-4">Change</td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-6 border-t-4 border-black pt-4">
        <p className='font-semibold'>Thank you, please come again!</p>
        <p className='text-sm'>Software Solution by DESHIT-BD</p>
      </div>
    </div>
  );
});

Invoice.displayName = 'Invoice';

export default Invoice;



