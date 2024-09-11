import { Navigate, createBrowserRouter } from "react-router-dom";
// import ProtectedRoute from './ProtectedRoute';
import InitialLayout from "../layouts/InitialLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/User/Login";
import Dashboard from "../pages/Dashboard";
import ClientAdd from "../pages/CRM/Client/ClientAdd";
import ClientList from "../pages/CRM/Client/ClientList";
import AccountCreate from "../pages/Account/account/AccountCreate";
import AccountList from "../pages/Account/account/AccountList";
import AccountBalance from "../pages/Account/account/AccountBalance";
import AccountStatement from "../pages/Account/account/AccountStatement";
import AddNewReceive from "../pages/Account/receive/AddNewReceive";
import ReceiveList from "../pages/Account/receive/ReceiveList";
import AddNewExpense from "../pages/Account/expense/AddNewExpense";
import ExpenseList from "../pages/Account/expense/ExpenseList";
import SupplierPayment from "../pages/Account/expense/SupplierPayment";
import MoneyReturn from "../pages/Account/expense/MoneyReturn";
import TransferCreate from "../pages/Account/transfer/TransferCreate";
import TransferList from "../pages/Account/transfer/TransferList";
import AddNewInvoice from "../pages/Bill Invoice/AddNewInvoice";
import DraftInvoice from "../pages/Bill Invoice/DraftInvoice";
import InvoiceList from "../pages/Bill Invoice/InvoiceList";
import AddReturn from "../pages/Bill Invoice/Sales/AddReturn";
import ReturnList from "../pages/Bill Invoice/Sales/ReturnList";
import ProductCreate from "../pages/Product/product/ProductCreate";
import ProductList from "../pages/Product/product/ProductList";
// import ProductGroup from "../pages/Product/product/ProductGroup";
import ProductBrand from "../pages/Product/product asset/ProductBrand";
import ProductSize from "../pages/Product/product asset/ProductSize";
import ProductColor from "../pages/Product/product asset/ProductColor";
import ProductUnit from "../pages/Product/product asset/ProductUnit";
// import ProductBarcode from "../pages/Product/product asset/ProductBarcode";
import ProductStock from "../pages/Product/purchase/ProductStock";
import AddNewPurchase from "../pages/Product/purchase/AddNewPurchase";
import PurchaseList from "../pages/Product/purchase/PurchaseList";
import PurchaseInvoiceList from "../pages/Product/purchase/PurchaseInvoiceList";
import PurchaseReport from "../pages/Product/purchase/PurchaseReport";
import SmsAuth from "../pages/SMS/sms/smsAuth";
import StaffCreate from "../pages/Staff/Staff Misc/StaffCreate";
import StaffList from "../pages/Staff/Staff Misc/StaffList";
import StaffDesignation from "../pages/Staff/Staff Misc/StaffDesignation";
import StaffDepartment from "../pages/Staff/Staff Misc/StaffDepartment";
import StaffPaymentCreate from "../pages/Staff/Staff Payment/StaffPaymentCreate";
import StaffPaymentReport from "../pages/Staff/Staff Payment/StaffPaymentReport";
import StaffSalaryReport from "../pages/Staff/Staff salary/StaffSalaryReport";
import AddStaffSalary from "../pages/Staff/Staff salary/AddStaffSalary";
import ClientGroup from "../pages/CRM/Client/ClientGroup";
import ClientStatement from "../pages/CRM/Client/ClientStatement";
import SupplierAdd from "../pages/CRM/Supplier/SupplierAdd";
import SupplierList from "../pages/CRM/Supplier/SupplierList";
import SupplierGroup from "../pages/CRM/Supplier/SupplierGroup";
import SupplierStatement from "../pages/CRM/Supplier/SupplierStatement";
import DueList from "../pages/DueReport/DueList";
import CustomerWise from "../pages/DueReport/CustomerWise";
import GroupWise from "../pages/DueReport/GroupWise";
import All from "../pages/SalesReport/All";
import ProductWise from "../pages/SalesReport/ProductWise";
import AllDeposit from "../pages/DepositReport/AllDeposit";
import CategoryWiseDeposit from "../pages/DepositReport/CategoryWiseDeposit";
import ClientWiseDeposit from "../pages/DepositReport/ClientWiseDeposit";
import AllExpense from "../pages/ExpenseReport/AllExpense";
import CategoryWiseExpense from "../pages/ExpenseReport/CategoryWiseExpense";
import SupplierPurchasePayment from "../pages/ExpenseReport/SupplierPurchasePayment";
import IncomeCategory from "../pages/SettingsWEB/IncomeCategory";
import IncomeSubcategory from "../pages/SettingsWEB/IncomeSubcategory";
import ExpenseSubcategory from "../pages/SettingsWEB/ExpenseSubcategory";
import ExpenseCategory from "../pages/SettingsWEB/ExpenseCategory";
import AttendanceCreate from "../pages/Staff/StaffAttendance/AttendanceCreate";
import AttendanceReport from "../pages/Staff/StaffAttendance/AttendanceReport";
import MonthlyAttendanceReport from "../pages/Staff/StaffAttendance/MonthlyAttendanceReport";
import ProductGroup from "../pages/Product/product/ProductGroup";
import MyProfile from "../pages/Profile/MyProfile";
import ChangePassword from "../pages/Profile/ChangePassword";
import Role from "../pages/Profile/RoleManagement";
import CompanyInformation from "../pages/Profile/CompanyInformation";
import Register from "../pages/User/Register";
import PaymentMethod from "../pages/SettingsWEB/Payment";
import PaymentCancel from "../pages/SettingsWEB/PaymentCancel";
import PaymentSuccess from "../pages/SettingsWEB/PaymentSuccess";
import Bank from "../pages/SettingsWEB/Bank";
import BankList from "../pages/SettingsWEB/BankList";


const dummyUser = {
  name: 'Pranto',
  email: 'pranto@gmail.com',
  phone: '01521206350',
  address: '456 Elm St, Metropolis, USA',
  bio: 'Experienced project manager with a passion for leading teams to success. Skilled in Agile methodologies and cross-functional collaboration.',
};


const router = createBrowserRouter([
  {
    path: "/", 
    errorElement: <ErrorPage />,
    element: <Navigate to="/login" replace={true} />
  },
  {
    path: "/",
    element: <InitialLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element:<Dashboard/>
      },
      {
        path: "/client_add",
        element:<ClientAdd/>
      },
      {
        path: "/client_list",
        element:<ClientList/>
      },
      {
        path: "/client_group",
        element:<ClientGroup/>
      },
      {
        path: "/client_statement",
        element:<ClientStatement/>
      },
      {
        path: "/supplier_add",
        element:<SupplierAdd/>
      },
      {
        path: "/supplier_list",
        element:<SupplierList/>
      },
      {
        path: "/supplier_group",
        element:<SupplierGroup/>
      },
      {
        path: "/supplier_statement",
        element:<SupplierStatement/>
      },
      {
        path: "/account_create",
        element:<AccountCreate/>
      },
      {
        path: "/account_list",
        element:<AccountList/>
      },
      {
        path: "/account_balance",
        element:<AccountBalance/>
      },
      {
        path: "/account_statement",
        element:<AccountStatement/>
      },
      {
        path: "/add_new_receive",
        element:<AddNewReceive/>
      },
      {
        path: "/receive_list",
        element:<ReceiveList/>
      },
      {
        path: "/add_new_expense",
        element:<AddNewExpense/>
      },
      {
        path: "/expense_list",
        element:<ExpenseList/>
      },
      {
        path: "/supplier_payment",
        element:<SupplierPayment/>
      },
      {
        path: "/money_return",
        element:<MoneyReturn/>
      },
      {
        path: "/transfer_create",
        element:<TransferCreate/>
      },
      {
        path: "/transfer_list",
        element:<TransferList/>
      },
      {
        path: "/add_new_invoice",
        element:<AddNewInvoice/>
      },
      {
        path: "/draft_invoice",
        element:<DraftInvoice/>
      },
      {
        path: "/invoice_list",
        element:<InvoiceList/>
      },
      {
        path: "/add_return",
        element:<AddReturn/>
      },
      {
        path: "/return_list",
        element:<ReturnList/>
      },
      {
        path: "/product_create",
        element:<ProductCreate/>
      },
      {
        path: "/product_list",
        element:<ProductList/>
      },
      {
        path: "/product_group",
        element:<ProductGroup/>
      },
      {
        path: "/product_brand",
        element:<ProductBrand/>
      },
      {
        path: "/product_size",
        element:<ProductSize/>
      },
      {
        path: "/product_color",
        element:<ProductColor/>
      },
      {
        path: "/product_unit",
        element:<ProductUnit/>
      },
      {
        path: "/product_stock",
        element:<ProductStock/>
      },
      {
        path: "/add_new_purchase",
        element:<AddNewPurchase/>
      },
      {
        path: "/purchase_list",
        element:<PurchaseList/>
      },
      {
        path: "/purchase_invoice_list",
        element:<PurchaseInvoiceList/>
      },
      {
        path: "/purchase_report",
        element:<PurchaseReport/>
      },
      {
        path: "/sms_auth",
        element:<SmsAuth/>
      },
      {
        path: "/staff_create",
        element:<StaffCreate/>
      },
      {
        path: "/staff_list",
        element:<StaffList/>
      },
      {
        path: "/staff_designation",
        element:<StaffDesignation/>
      },
      {
        path: "/staff_department",
        element:<StaffDepartment/>
      },
      {
        path: "/staff_payment_create",
        element:<StaffPaymentCreate/>
      },
      {
        path: "/staff_payment_report",
        element:<StaffPaymentReport/>
      },
      {
        path: "/add_staff_salary_report",
        element:<AddStaffSalary/>
      },
      {
        path: "/staff_salary_report",
        element:<StaffSalaryReport/>
      },
      {
        path: "/due_list",
        element:<DueList/>
      },
      {
        path: "/customer_wise",
        element:<CustomerWise/>
      },
      {
        path: "/group_wise",
        element:<GroupWise/>
      },
      {
        path: "/all",
        element:<All/>
      },
      {
        path: "/product_wise",
        element:<ProductWise/>
      },
      {
        path: "/all_deposit",
        element:<AllDeposit/>
      },
      {
        path: "/category_wise_deposit",
        element:<CategoryWiseDeposit/>
      },
      {
        path: "/customer_wise_deposit",
        element:<ClientWiseDeposit/>
      },
      {
        path: "/all_expense",
        element:<AllExpense/>
      },
      {
        path: "/category_wise_expense",
        element:<CategoryWiseExpense/>
      },
      {
        path: "/supplier_purchase_payment",
        element:<SupplierPurchasePayment/>
      },
      {
        path: "/income_category",
        element:<IncomeCategory/>
      },
      {
        path: "/income_subcategory",
        element:<IncomeSubcategory/>
      },
      {
        path: "/expense_category",
        element:<ExpenseCategory/>
      },
      {
        path: "/expense_subcategory",
        element:<ExpenseSubcategory/>
      },
      {
        path: "/attendance_create",
        element:<AttendanceCreate/>
      },
      {
        path: "/attendance_report",
        element:<AttendanceReport/>
      },
      {
        path: "/monthly_attendance_report",
        element:<MonthlyAttendanceReport/>
      },
      {
        path: "/add_staff_salary",
        element:<AddStaffSalary/>
      },
      {
        path: "/myprofile",
        element:<MyProfile  user={dummyUser} />
      },
      {
        path: "/change_password",
        element:<ChangePassword/>
      },
      {
        path: "/role",
        element:<Role/>
      },
      {
        path: "/company_information",
        element:<CompanyInformation/>
      },
      {
        path: "/payment_method",
        element:<PaymentMethod/>
      },
      {
        path: "/payment/fail",
        element:<PaymentCancel/>
      },
      {
        path: "/payment/success",
        element:<PaymentSuccess/>
      },
      {
        path: "/bank",
        element:<Bank/>
      },
      {
        path: "/bank_list",
        element:<BankList/>
      },

    //   {
    //     path: "/menu",
    //     element: <ProtectedRoute element={<Products />} />,
    //   }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;




