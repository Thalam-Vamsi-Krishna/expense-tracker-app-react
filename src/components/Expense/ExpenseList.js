import { useState, useEffect, useCallback, useContext } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import AuthContext from "../Store/AuthContext";

const ExpenseList = () => {
  const authCtx = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

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

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setExpenseToEdit(null);
  };

  const handleEditModalShow = (expense) => {
    setShowEditModal(true);
    setExpenseToEdit(expense);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  const handleDeleteModalShow = (expense) => {
    setShowDeleteModal(true);
    setExpenseToDelete(expense);
  };

  const handleEditExpense = async (event) => {
    event.preventDefault();
    const updatedExpense = {
      ...expenseToEdit,
      title: event.target.title.value,
      amount: event.target.amount.value,
      desc: event.target.desc.value,
    };
    const response = await fetch(
      `https://expense-tracker-app-012-default-rtdb.asia-southeast1.firebasedatabase.app/expenses${email}/${updatedExpense.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedExpense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log("Failed to update expense");
    }
    handleEditModalClose();
    fetchExpenseHandler();
  };

  const handleDeleteExpense = async () => {
    const response = await fetch(
      `https://expense-tracker-app-012-default-rtdb.asia-southeast1.firebasedatabase.app/expenses${email}/${expenseToDelete.id}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.log("Failed to delete expense");
    }
    handleDeleteModalClose();
    fetchExpenseHandler();
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.title}</td>
              <td>$ {expense.amount}</td>
              <td>{expense.desc}</td>
              <td>
                <Button
                  variant="success"
                  style={{ marginRight: "15px" }}
                  onClick={() => handleEditModalShow(expense)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteModalShow(expense)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Form onSubmit={handleEditExpense}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={expenseToEdit ? expenseToEdit.title : ""}
              />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                defaultValue={expenseToEdit ? expenseToEdit.amount : ""}
              />
            </Form.Group>
            <Form.Group controlId="desc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                defaultValue={expenseToEdit ? expenseToEdit.desc : ""}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this expense?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteExpense}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ExpenseList;
