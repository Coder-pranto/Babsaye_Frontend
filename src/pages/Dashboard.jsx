// const Dashboard = () => {
//   return (
//     <div className="flex flex-wrap justify-start gap-8 p-4">
//       <Card 
//         title="Sales" 
//         icon="/dashboard/daily-sale.png"
//         infoLines={[
//           { label: 'Today Sales', value: '0৳' },
//           { label: 'July Sales', value: '0৳' }
//         ]}
//         total="Total Sales"
//         totalValue="0৳"
//       />
//       <Card 
//         title="Receive" 
//         icon="/dashboard/daily-deposit.png"
//         infoLines={[
//           { label: 'Today Receive', value: '0৳' },
//           { label: 'July Receive', value: '0৳' }
//         ]}
//         total="Total Receive"
//         totalValue="0৳"
//       />
//       <Card 
//         title="Expense" 
//         icon="/dashboard/daily-expense.png"
//         infoLines={[
//           { label: 'Today Expense', value: '0৳' },
//           { label: 'July Expense', value: '0৳' }
//         ]}
//         total="Total Expense"
//         totalValue="0৳"
//       />
//       <Card 
//         title="Balance" 
//         icon="/dashboard/daily-deposit.png"
//         infoLines={[
//           { label: 'Today Balance', value: '0৳' },
//           { label: 'July Balance', value: '0৳' }
//         ]}
//         total="Balance"
//         totalValue="0৳"
//       />
//       <Card 
//         title="Due" 
//         icon="/dashboard/due.png"
//         infoLines={[
//           { label: 'Today Due', value: '0৳' },
//           { label: 'July Due', value: '0৳' }
//         ]}
//         total="Total Due"
//         totalValue="0৳"
//       />
//       <div className="flex flex-col justify-start gap-y-20">
//         <HorizontalCard
//           title="Stock Value"
//           icon="/dashboard/shopping-cart.png"
//           totalValue="0৳"
//         />
//         <HorizontalCard
//           title="Client Previous Due"
//           icon="/dashboard/c-due.png"
//           totalValue="0৳"
//         />
//       </div>

//     </div>
//   );
// };

// const Card = ({ title, icon, infoLines, total, totalValue }) => (
//   <div className="w-72 rounded-lg  overflow-hidden">
//     <div className="bg-[#5d5b10] flex justify-evenly items-center text-white p-4">
//       <div className="flex items-center justify-center gap-x-2">
//         <img src={icon} className="w-10 h-10" alt="card-icon" />
//         <h4 className="text-lg font-semibold">{title}</h4>
//       </div>
//       <button className="text-green-500 rounded-lg bg-white text-xl font-bold w-8 h-8 flex items-center justify-center">+</button>
//     </div>
//     <div className="p-4 bg-white text-black mx-4 border-x-2 ">
//       {infoLines.map((line, index) => (
//         <div key={index} className="flex justify-between my-2 border-b border-black ">
//           <span>{line.label}:</span> <span>{line.value}</span>
//         </div>
//       ))}
//     </div>
//     <div className="flex justify-between text-white font-bold bg-[#5d5b10] p-4">
//       <span>{total}:</span> <span>{totalValue}</span>
//     </div>
//   </div>
// );
// const HorizontalCard = ({ title, icon, totalValue }) => (
//   <div className="w-[380px] rounded-lg  overflow-hidden">
//     <div className="bg-[#5d5b10] flex justify-between items-center text-white p-4">
//       <div className="flex items-center justify-center gap-x-2">
//         <img src={icon} className="w-6 h-6" alt="card-icon" />
//         <h4 className="text-lg font-semibold">{title}</h4>
//       </div>
//       <span>{totalValue}</span>
//     </div>

    
//   </div>
// );

// export default Dashboard;




import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: '16 July', value: 0 },
  { name: '17 July', value: 0 },
  { name: '18 July', value: 0 },
  { name: '19 July', value: 0 },
  { name: '20 July', value: 0 },
  { name: '21 July', value: 0 },
  { name: '22 July', value: 0 },
  { name: '23 July', value: 0 },
  { name: '24 July', value: 0 },
  { name: '25 July', value: 0 },
  { name: '26 July', value: 0 },
  { name: '27 July', value: 0 },
  { name: '28 July', value: 0 },
  { name: '29 July', value: 0 }
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap justify-start gap-8 p-4">

        <Card
          title="Sales"
          icon="/dashboard/daily-sale.png"
          infoLines={[
            { label: 'Today Sales', value: '0৳' },
            { label: 'July Sales', value: '0৳' }
          ]}
          total="Total Sales"
          totalValue="0৳"
        />
        <Card
          title="Receive"
          icon="/dashboard/daily-deposit.png"
          infoLines={[
            { label: 'Today Receive', value: '0৳' },
            { label: 'July Receive', value: '0৳' }
          ]}
          total="Total Receive"
          totalValue="0৳"
        />
        <Card
          title="Expense"
          icon="/dashboard/daily-expense.png"
          infoLines={[
            { label: 'Today Expense', value: '0৳' },
            { label: 'July Expense', value: '0৳' }
          ]}
          total="Total Expense"
          totalValue="0৳"
        />
        <Card
          title="Balance"
          icon="/dashboard/daily-deposit.png"
          infoLines={[
            { label: 'Today Balance', value: '0৳' },
            { label: 'July Balance', value: '0৳' }
          ]}
          total="Balance"
          totalValue="0৳"
        />
      </div>
      <div className="flex p-4 gap-x-8">
        <Card
          title="Due"
          icon="/dashboard/due.png"
          infoLines={[
            { label: 'Today Due', value: '0৳' },
            { label: 'July Due', value: '0৳' }
          ]}
          total="Total Due"
          totalValue="0৳"
        />
        <div className="flex flex-col justify-start gap-y-20">
          <HorizontalCard
            title="Stock Value"
            icon="/dashboard/shopping-cart.png"
            totalValue="0৳"
          />
          <HorizontalCard
            title="Client Previous Due"
            icon="/dashboard/c-due.png"
            totalValue="0৳"
          />
        </div>
      </div>
      <div className="flex gap-x-8 p-4">
        <div className="w-full mt-8 bg-white p-4 rounded-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Weekly Analysis</h3>
          <LineChart
            width={800}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 4,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#00c0ef" />
          </LineChart>
        </div>
        <div className="w-full mt-8 bg-white p-4 rounded-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Pie Chart Analysis</h3>
          <PieChart width={400} height={400}>
            <Tooltip />
            <Pie
              data={pieData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
                  onMouseLeave={(e) => (e.target.style.opacity = 1)}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </>
  );
};

const Card = ({ title, icon, infoLines, total, totalValue }) => (
  <div className="w-[360px] rounded-lg overflow-hidden">
    <div className="bg-[#5d5b10] flex justify-evenly items-center text-white p-4">
      <div className="flex items-center justify-center gap-x-2">
        <img src={icon} className="w-10 h-10" alt="card-icon" />
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <button className="text-green-500 rounded-lg bg-white text-xl font-bold w-8 h-8 flex items-center justify-center">+</button>
    </div>
    <div className="p-4 bg-white text-black mx-4 border-x-2 ">
      {infoLines.map((line, index) => (
        <div key={index} className="flex justify-between my-2 border-b border-black ">
          <span>{line.label}:</span> <span>{line.value}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-between text-white font-bold bg-[#5d5b10] p-4">
      <span>{total}:</span> <span>{totalValue}</span>
    </div>
  </div>
);

const HorizontalCard = ({ title, icon, totalValue }) => (
  <div className="w-[380px] rounded-lg overflow-hidden">
    <div className="bg-[#5d5b10] flex justify-between items-center text-white p-4">
      <div className="flex items-center justify-center gap-x-2">
        <img src={icon} className="w-6 h-6" alt="card-icon" />
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <span>{totalValue}</span>
    </div>
  </div>
);

export default Dashboard;
