import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import PaymentDetails from './PaymentDetails';
import Invoice from './Invoice';
import { useReactToPrint } from 'react-to-print';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, totalCost, serviceCharge, finalTotal, selectedTable, orderNumber } = location.state || {};

  const invoiceRef = useRef();

  const handleCancelOrder = () => {
    navigate('/dashboard');
  };

  // eslint-disable-next-line no-unused-vars
  const handleSendOrder = () => {
    alert('Order sent successfully!');
    navigate('/dashboard');
  };

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return (
    <div className="flex h-full bg-gray-100">
      <OrderSummary 
        order={order} 
        handleRemoveFromOrder={() => {}} // Placeholder, assuming order modifications are not needed in Payment page
        handleDecrementOrder={() => {}} // Placeholder, assuming order modifications are not needed in Payment page
        handleIncrementOrder={() => {}} // Placeholder, assuming order modifications are not needed in Payment page
        handleCancelOrder={handleCancelOrder} 
      />
      <div className="flex flex-col w-1/3 p-6 bg-white border-l border-gray-300">
        <PaymentDetails 
          orderNumber={orderNumber}
          totalCost={totalCost} 
          serviceCharge={serviceCharge} 
          finalTotal={finalTotal} 
          handlePrint={handlePrint}
        /> 
        <Invoice 
          ref={invoiceRef}
          order={order} 
          totalCost={totalCost} 
          serviceCharge={serviceCharge} 
          finalTotal={finalTotal} 
          selectedTable={selectedTable} 
          orderNumber={orderNumber} 
        />
       
      </div>
    </div>
  );
};

export default Payment;



