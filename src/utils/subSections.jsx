
import { FaUsers, FaFileInvoice, FaBox, FaSms, FaUserTie, FaClipboardList, FaChartBar, FaMoneyCheckAlt, FaFileInvoiceDollar, FaChartPie, FaTools, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

export const sections = [
    {
        name: "Dashboard",
        icon: <MdOutlineDashboard size={30} />
    },
    {
        name: "CRM",
        icon: <FaUsers size={30} />,
        subCategories: [
            {
                name: "Client",
                subSubCategories: [
                    { name: "Client Add" },
                    { name: "Client List" },
                    { name: "Client Group" },
                    // { name: "Client Statement" }
                ]
            },
            {
                name: "Supplier",
                subSubCategories: [
                    { name: "Supplier Add" },
                    { name: "Supplier List" },
                    { name: "Supplier Group" },
                    // { name: "Supplier Statement" }
                ]
            }
        ]
    },
    {
        name: "Account",
        icon: <FaFileInvoice size={30} />,
        subCategories: [
            {
                name: "Accounts",
                subSubCategories: [
                    { name: "Account Create" },
                    { name: "Account List" },
                    { name: "Account Balance" },
                    { name: "Account Statement" }
                ]
            },
            {
                name: "Receive",
                subSubCategories: [
                    { name: "Add New Receive" },
                    { name: "Receive List" }
                ]
            },
            {
                name: "Expense",
                subSubCategories: [
                    { name: "Add New Expense" },
                    { name: "Expense List" },
                    { name: "Supplier Payment" },
                    { name: "Money Return" }
                ]
            },
            {
                name: "Transfer",
                subSubCategories: [
                    { name: "Transfer Create" },
                    { name: "Transfer List" }
                ]
            }
        ]
    },
    {
        name: "Bill Invoice",
        icon: <FaFileInvoiceDollar size={30} />,
        subCategories: [
            {
                name: "Invoice",
                subSubCategories: [
                    { name: "Add New Invoice" },
                    { name: "Invoice List" },
                    { name: "Draft Invoice" },
                ]

            },
            {
                name: "Sales",
                subSubCategories: [
                    { name: "Add Return" },
                    { name: "Return List" }
                ]
            },
        ]
    },
    {
        name: "Product",
        icon: <FaBox size={30} />,
        subCategories: [
            {
                name: "Products",
                subSubCategories: [
                    { name: "Product Create" },
                    { name: "Product List" },
                    { name: "Product Group" },
                ]
            },
            {
                name: "Product Asset",
                subSubCategories: [
                    { name: "Product Brand" },
                    { name: "Product Size" },
                    { name: "Product Color" },
                    { name: "Product Unit" },
                    // { name: "Product Barcode" }
                ]
            },
            {
                name: "Purchase",
                subSubCategories: [
                    { name: "Add New Purchase" },
                    { name: "Purchase List" },
                    { name: "Purchase Invoice List" },
                    { name: "Purchase Report" },
                    { name: "Product Stock" }
                ]
            }
            
        ]
    },
    {
        name: "SMS",
        icon: <FaSms size={30} />,
        subCategories: [
            {
                name: "SMS",
                subSubCategories: [
                    { name: "SMS Auth" },
                    // { name: "Customer" },
                    // { name: "Customer Group" },
                    // { name: "Supplier" },
                    // { name: "Supplier Group" },
                    // { name: "SMS Schedule" },
                    // { name: "Schedule Report" }
                ]
            },
        ]
    },
    {
        name: "Staff",
        icon: <FaUserTie size={30} />,
        subCategories: [
            {
                name: "Staff Misc",
                subSubCategories: [
                    { name: "Staff Create" },
                    { name: "Staff List" },
                    { name: "Staff Department" },
                    { name: "Staff Designation" }
                ]
            },
            {
                name: "Staff Payment",
                subSubCategories: [
                    { name: "Staff Payment Create" },
                    { name: "Staff Payment Report" }
                ]
            },
            {
                name: "Staff Salary",
                subSubCategories: [
                    { name: "Add Staff Salary" },
                    { name: "Staff Salary Report" }
                ]
            },
            {
                name: "Staff Attendance",
                subSubCategories: [
                    { name: "Attendance Create" },
                    { name: "Attendance Report" },
                    { name: "Monthly Attendance Report" }
                ]
            },
     
        ]
    },{
        name: "Due Report",
         icon: <FaClipboardList size={30} />,
        subCategories:[
            {
                name:"Reports",
                subSubCategories:[
                    { name: "Due List" },
                    { name: "Customer Wise" },
                    { name: "Group Wise" }
                ]

            }
        ]
    },
    { name: "Sales Report", icon: <FaChartBar size={30} />, subCategories: [
        {
            name: "Reports",
            subSubCategories:[
                { name: "All" }, 
                // { name: "Daily" },
                // { name: "Customer Wise" },
                // { name: "Group Wise" },
                { name: "Product Wise" }
            ]
        }
    ] },
    { name: "Deposit Report", icon: <FaMoneyCheckAlt size={30} />, subCategories: [
        {
            name: "Reports",
            subSubCategories:[
                { name: "All Deposit" }, 
                { name: "Category Wise Deposit" }, 
                { name: "Customer Wise Deposit" }
            ]
        }
    ] },
    { name: "Expense Report", icon: <FaFileInvoiceDollar size={30} />, subCategories: [
        {
            name: "Reports",
            subSubCategories:[
                { name: "All Expense" }, 
                { name: "Category Wise Expense" }, 
                { name: "Supplier Purchase Payment" }
            ]
        }
    ] },
    {
        name: "Settings",
        icon: <FaTools size={30} />,
        subCategories: [
            {
                name: "Income Categorization",
                subSubCategories: [
                    { name: "Income Category" },
                    { name: "Income Subcategory" }
                ]
            },
            {
                name: "Expense Categorization",
                subSubCategories: [
                    { name: "Expense Category" },
                    { name: "Expense Subcategory" }
                ]
            },
            { name: "Shortcut Menu" },
            { name: "Payment Method" },
            { name: "Company Information" },
            { name: "Bank" }
        ]
    },
    {
        name: "DeshIt Service",
        icon: <FaChartPie size={30} />,
        subCategories: [
            { name: "Manage Services" }
        ]
    },
    { name: "Sign Out", icon: <FaSignOutAlt size={30} /> }
];
