import React, { useEffect, useState } from 'react'
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState ([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(true);
  
  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Somthing went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation Checks
    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if(!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.API_PATHS.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense",
        error.response?.data?.message || error.message
      );
      
    }
  };

  useEffect(() => {
    fetchExpenseDetails
  
    return () => {}
  }, [])
  

  return (
    <DashboardLayout  activeMenu="Income">
      <div className='my-5 mx-auto'></div>
        <div className=''>
          <div className=''> 
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
             /> 
          </div>
        </div>
    </DashboardLayout>
  )
}

export default Expense