import { Fragment } from "react";
import ExpenseForm from "../Expense/ExpenseForm";
import ExpenseList from "../Expense/ExpenseList";
import Header from "../Layout/Header";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <ExpenseForm />
      <ExpenseList />
    </Fragment>
  );
};

export default Home;
