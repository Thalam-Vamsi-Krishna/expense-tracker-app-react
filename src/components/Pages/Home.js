import { useState, useEffect } from "react";
import Header from "../Layout/Header";
import ExpenseForm from "../Expense/ExpenseForm";
import ExpenseList from "../Expense/ExpenseList";
import { themeActions } from "../Store/ThemeReducer";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentTheme = useSelector((state) => state.theme);
  const { totalAmount } = useSelector((state) => state.expense);
  const [isPremiumActive, setIsPremiumActive] = useState(false);

  useEffect(() => {
    if (totalAmount >= 10000) {
      setIsPremiumActive(true);
      if (!currentTheme.darkTheme) {
        dispatch(themeActions.onThemeChange());
      }
    } else {
      setIsPremiumActive(false);
      if (currentTheme.darkTheme) {
        dispatch(themeActions.onThemeChange());
      }
    }
  }, [totalAmount, currentTheme.darkTheme, dispatch]);

  const handleToggle = () => {
    setIsPremiumActive((prevState) => !prevState);
  };

  return (
    <div style={{ backgroundColor: currentTheme.darkTheme ? "grey" : null }}>
      <Header />
      {isLoggedIn && totalAmount >= 10000 && (
        <Form.Check
          type="switch"
          id="premium-switch"
          label="Activated Premium"
          checked={isPremiumActive}
          onChange={handleToggle}
          style={{ marginLeft: "78%", marginTop: "1%", color: "white" }}
        />
      )}
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default Home;
