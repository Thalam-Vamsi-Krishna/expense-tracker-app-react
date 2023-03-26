import { Fragment } from "react";
import ExpenseForm from "../Expense/ExpenseForm";
import Header from "../Layout/Header";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <ExpenseForm />
    </Fragment>
  );
};

export default Home;
