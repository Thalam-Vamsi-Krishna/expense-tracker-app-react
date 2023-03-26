import { Fragment, useState } from "react";
import ExpenseForm from "../Expense/ExpenseForm";
import ExpenseList from "../Expense/ExpenseList";
import Header from "../Layout/Header";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const addExpenseHandler = (expenseData) => {
    setExpenses((prevExpenses) => [...prevExpenses, { ...expenseData }]);
  };
  return (
    <Fragment>
      <Header />
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <ExpenseList expenses={expenses} />
    </Fragment>
  );
};

export default Home;
