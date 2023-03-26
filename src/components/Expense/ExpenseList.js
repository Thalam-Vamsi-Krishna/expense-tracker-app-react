import { Container, Table } from "react-bootstrap";

const ExpenseList = ({ expenses }) => {
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
