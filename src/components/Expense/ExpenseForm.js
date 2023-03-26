import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const descChangeHandler = (event) => {
    setDesc(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: title,
      amount: amount,
      desc: desc,
    };
    onAddExpense(expenseData);
    setTitle("");
    setAmount("");
    setDesc("");
  };

  return (
    <Container>
      <h3
        className="d-flex justify-content-center"
        style={{ marginTop: "15px", backgroundColor: "red", color: "white" }}
      >
        Expense Form
      </h3>
      <Form className="d-flex justify-content-center">
        <Form.Group style={{ marginRight: "15px" }}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={titleChangeHandler}
            required
          />
        </Form.Group>
        <Form.Group style={{ marginRight: "15px" }}>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={amountChangeHandler}
            required
          />
        </Form.Group>
        <Form.Group style={{ marginRight: "15px" }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={desc}
            onChange={descChangeHandler}
          />
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        type="submit"
        onClick={submitHandler}
        style={{ marginLeft: "44%", marginTop: "15px", marginBottom: "15px" }}
      >
        Add Expense
      </Button>
    </Container>
  );
};

export default ExpenseForm;
