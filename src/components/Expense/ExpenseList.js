import { useState, useEffect, useCallback, useContext } from "react";
import { Container, Table } from "react-bootstrap";
import AuthContext from "../Store/AuthContext";

const ExpenseList = () => {
  const authCtx = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const email = authCtx.email.replace(/[^a-zA-Z0-9]/g, "");

  const fetchExpenseHandler = useCallback(async () => {
    const response = await fetch(
      `https://expense-tracker-app-012-default-rtdb.asia-southeast1.firebasedatabase.app/expenses${email}.json`
    );
    if (!response.ok) {
      console.log("Failed to fetch expenses");
    }
    const data = await response.json();
    let loadedExpenses = [];
    for (const key in data) {
      loadedExpenses.push({
        id: key,
        title: data[key].title,
        amount: data[key].amount,
        desc: data[key].desc,
      });
    }
    setExpenses(loadedExpenses);
  }, []);

  useEffect(() => {
    fetchExpenseHandler();
  }, [fetchExpenseHandler]);

  return (
    <Container>
      <h3
        className="d-flex justify-content-center"
        style={{ marginTop: "15px", backgroundColor: "red", color: "white" }}
      >
        Expense Details
      </h3>
      <Table bordered hover className="justify-content-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.title}</td>
              <td>$ {expense.amount}</td>
              <td>{expense.desc}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ExpenseList;
