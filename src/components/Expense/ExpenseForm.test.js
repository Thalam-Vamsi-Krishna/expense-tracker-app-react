import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ExpenseForm from "./ExpenseForm";
import { Provider } from "react-redux";
import store from "../Store/Store";

describe("ExpenseForm", () => {
  it("renders the title of the form", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const title = screen.getByText("Expense Form");
    expect(title).toBeInTheDocument();
  });

  it("renders the title input field", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const titleInput = screen.getByPlaceholderText("Enter title");
    expect(titleInput).toBeInTheDocument();
  });
  it("renders the amount input field", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const amountInput = screen.getByPlaceholderText("Enter amount");
    expect(amountInput).toBeInTheDocument();
  });

  it("renders the description input field", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const descInput = screen.getByPlaceholderText("Enter description");
    expect(descInput).toBeInTheDocument();
  });

  it("renders the 'Add Expense' button", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
    const addButton = screen.getByText("Add Expense");
    expect(addButton).toBeInTheDocument();
  });
});
