import { Fragment, useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

const ExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newExpense = {
      title: title,
      amount: amount,
      date: date,
    };
    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
    setDate("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <Fragment>
      <Container className="d-flex justify-content-center">
        <Form
          onSubmit={handleSubmit}
          style={{ marginRight: "10%", marginTop: "2%" }}
        >
          <Form.Group controlId="title">
            <Form.Label>Enter Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Enter Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: "15px" }}>
            Add Expense
          </Button>
        </Form>
        <Table bordered hover style={{ marginTop: "4%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.title}</td>
                <td>$ {expense.amount}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

export default ExpenseForm;
