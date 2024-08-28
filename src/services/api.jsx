import axios from "axios";

// export const BASE_URL = 'http://localhost:5005/api/v1';
// export const BASE_URL = 'http://pos.tailormaster.xyz/api/v1';
export const BASE_URL = 'https://babsaye-backend.onrender.com/api/v1';


const api = axios.create({
    baseURL: BASE_URL,
});

const getToken = () =>{
    const token = localStorage.getItem('user_token');

    return token ? `Bearer ${token}`:"";
};

getToken();


//* Clients API call
export const fetchClients = () => api.get('/clients');

export const fetchClientById = (id) => api.get(`/clients/${id}`);

export const addClient = (data) => api.post('/clients', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const updateClient = (id, data) => api.put(`/clients/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteClient = (id) => api.delete(`/clients/${id}`);



//* Client Group API calls
export const fetchClientGroups = () => api.get('/client-groups');

export const fetchClientGroupById = (id) => api.get(`/client-groups/${id}`);

export const addClientGroup = (data) => api.post('/client-groups', data);

export const updateClientGroup = (id, data) => api.put(`/client-groups/${id}`, data);

export const deleteClientGroup = (id) => api.delete(`/client-groups/${id}`);


//* Clients API call
export const fetchSuppliers = () => api.get('/supplier');

export const fetchSuppliersById = (id) => api.get(`/supplier/${id}`);

export const addSupplier = (data) => api.post('/supplier', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const updateSupplier = (id, data) => api.put(`/supplier/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteSupplier = (id) => api.delete(`/supplier/${id}`);



//* Supplier Group API calls

export const fetchSupplierGroups = () => api.get('/supplier-groups');

export const fetchSupplierGroupsById = (id) => api.get(`/supplier-groups/${id}`);

export const addSupplierGroup = (data)=> api.post('/supplier-groups', data);

export const updateSupplierGroup = (id, data) => api.put(`/supplier-groups/${id}`, data);

export const deleteSupplierGroup = (id) => api.delete(`/supplier-groups/${id}`);


//* Account api calls

export const fetchAllAccount = () => api.get('/accounts');

export const fetchAccountById = (id) => api.get(`/accounts/${id}`);

export const addAccount = (data) => api.post('/accounts', data, {
    headers: { 'Content-Type': 'application/json' }
});

export const updateAccount = (id, data) => api.put(`/accounts/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});

export const deleteAccount = (id) => api.delete(`/accounts/${id}`);

//! Fetch account balance by account ID
export const fetchAccountBalance = (accountId) => api.get(`/accounts/accbalance/${accountId}`);

//! Fetch account statement by account ID
export const fetchAccountStatement = (accountId) => api.get(`/accounts/accStatement/${accountId}/statement`);




 //* Transaction API calls

export const fetchAllTransactions = () => api.get('/transactions');

export const fetchTransactionById = (id) => api.get(`/transactions/${id}`);
export const addTransaction = (data) => api.post('/transactions/create', data, {
    headers: { 'Content-Type': 'application/json' }
});
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});

export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);



 //* Receive api calls

 export const fetchAllReceives = () => api.get('/receives');

export const createReceive = (data) => api.post('/receives', data);

export const fetchReceiveById = (id) => api.get(`/receives/${id}`);

export const updateReceive = (id, data) => api.put(`/receives/${id}`, data);

export const deleteReceive = (id) => api.delete(`/receives/${id}`);

//* Receive category API calls
export const fetchReceiveCategories = () => api.get('/receive-categories');

export const fetchReceiveCategoryById = (id) => api.get(`/receive-categories/${id}`);

export const createReceiveCategory = (data) => api.post('/receive-categories', data);

export const updateReceiveCategory = (id, data) => api.put(`/receive-categories/${id}`, data);

export const deleteReceiveCategory = (id) => api.delete(`/receive-categories/${id}`);


//* Receive Subcategories API calls

export const fetchReceiveSubCategories = () => api.get('/receive-subcategories');

export const fetchReceiveSubCategoryById = (id) => api.get(`/receive-subcategories/${id}`);

export const createReceiveSubCategory = (data) => api.post('/receive-subcategories', data);

export const updateReceiveSubCategory = (id, data) => api.put(`/receive-subcategories/${id}`, data);

export const deleteReceiveSubCategory = (id) => api.delete(`/receive-subcategories/${id}`);


//* Expenses API calls
export const fetchExpenses = () => api.get('/expenses');

export const fetchExpenseById = (id) => api.get(`/expenses/${id}`);

export const createExpense = (data) => api.post('/expenses', data,{
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);

export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

//* Expense Categories API calls
export const fetchExpenseCategories = () => api.get('/expense-categories');

export const fetchExpenseCategoryById = (id) => api.get(`/expense-categories/${id}`);

export const createExpenseCategory = (data) => api.post('/expense-categories', data);

export const updateExpenseCategory = (id, data) => api.put(`/expense-categories/${id}`, data);

export const deleteExpenseCategory = (id) => api.delete(`/expense-categories/${id}`);


//* Expense Subcategories API calls
export const fetchExpenseSubCategories = () => api.get('/expense-subcategories');

export const fetchExpenseSubCategoryById = (id) => api.get(`/expense-subcategories/${id}`);

export const createExpenseSubCategory = (data) => api.post('/expense-subcategories', data);

export const updateExpenseSubCategory = (id, data) => api.put(`/expense-subcategories/${id}`, data);

export const deleteExpenseSubCategory = (id) => api.delete(`/expense-subcategories/${id}`);



//receive or income category API calls

export const fetchCategories = () => api.get('/receive-categories');

export const fetchCategoryById = (id) => api.get(`/receive-categories/${id}`);

export const addCategory = (data) => api.post('/receive-categories', data, {
    headers: { 'Content-Type': 'application/json' }
});

export const updateCategory = (id, data) => api.put(`/receive-categories/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});

export const deleteCategory = (id) => api.delete(`/receive-categories/${id}`);


//* receive or income sub-category API calls

export const fetchSubcategories = () => api.get('/receive-subcategories');

export const fetchSubcategoryById = (id) => api.get(`/receive-subcategories/${id}`);

export const addSubcategory = (data) => api.post('/receive-subcategories', data, {
    headers: { 'Content-Type': 'application/json' }
});

export const updateSubcategory = (id, data) => api.put(`/receive-subcategories/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});

export const deleteSubcategory = (id) => api.delete(`/receive-subcategories/${id}`);


//* Products API calls

export const fetchProducts = () => api.get('/products');

export const fetchProductById = (id) => api.get(`/products/${id}`);

export const addProduct = (formData) => api.post('/products', formData, {
    headers: { 
        'Content-Type': 'multipart/form-data'
    }
});

export const updateProduct = (id, formData) => api.put(`/products/${id}`, formData, {
    headers: { 
        'Content-Type': 'multipart/form-data' 
    }
});

export const deleteProduct = (id) => api.delete(`/products/${id}`);



// Product Unit API calls
export const fetchUnits = () => api.get('/products/misc/units');
export const fetchUnitById = (id) => api.get(`/products/misc/unit/${id}`);
export const addUnit = (data) => api.post('/products/misc/unit', data, {
    headers: { 'Content-Type': 'application/json' }
});
export const updateUnit = (id, data) => api.put(`/products/misc/unit/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});
export const deleteUnit = (id) => api.delete(`/products/misc/unit/${id}`);



// Product Color API calls
export const fetchColors = () => api.get('/products/misc/colors');
export const fetchColorById = (id) => api.get(`/products/misc/color/${id}`);
export const addColor = (data) => api.post('/products/misc/color', data, {
    headers: { 'Content-Type': 'application/json' }
});
export const updateColor = (id, data) => api.put(`/products/misc/color/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});
export const deleteColor = (id) => api.delete(`/products/misc/color/${id}`);



// Product Size API calls
export const fetchSizes = () => api.get('/products/misc/sizes');
export const fetchSizeById = (id) => api.get(`/products/misc/size/${id}`);
export const addSize = (data) => api.post('/products/misc/size', data, {
    headers: { 'Content-Type': 'application/json' }
});
export const updateSize = (id, data) => api.put(`/products/misc/size/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});
export const deleteSize = (id) => api.delete(`/products/misc/size/${id}`);



// Product Brand API calls
export const fetchBrands = () => api.get('/products/misc/brands');
export const fetchBrandById = (id) => api.get(`/products/misc/brand/${id}`);
export const addBrand = (data) => api.post('/products/misc/brand', data, {
    headers: { 'Content-Type': 'application/json' }
});
export const updateBrand = (id, data) => api.put(`/products/misc/brand/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});
export const deleteBrand = (id) => api.delete(`/products/misc/brand/${id}`);



// Product Group API calls
export const fetchGroups = () => api.get('/products/misc/groups');
export const fetchGroupById = (id) => api.get(`/products/misc/group/${id}`);
export const addGroup = (data) => api.post('/products/misc/group', data, {
    headers: { 'Content-Type': 'application/json' }
});
export const updateGroup = (id, data) => api.put(`/products/misc/group/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
});
export const deleteGroup = (id) => api.delete(`/products/misc/group/${id}`);
