import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseTracker from "../ExpenseTracker";
import { fetchExpenses, addExpense } from "../api";

jest.mock("../api");

describe("Expense Tracker App", () => {

  beforeEach(() => {
    jest.clearAllMocks();

    fetchExpenses.mockResolvedValue([]);
    addExpense.mockResolvedValue({ id: 99, amount: "0" });
  });

  test("renders heading", async () => {
    render(<ExpenseTracker />);
    expect(
      await screen.findByText(/expense tracker/i)
    ).toBeInTheDocument();
  });

  test("adds new expense", async () => {
    addExpense.mockResolvedValueOnce({
      id: 1,
      amount: "100"
    });

    render(<ExpenseTracker />);

    const input = await screen.findByPlaceholderText(/enter amount/i);
    const btn = await screen.findByRole("button", { name: /add/i });

    fireEvent.change(input, {
      target: { value: "100" }
    });

    fireEvent.click(btn);

    expect(
      await screen.findByText("100")
    ).toBeInTheDocument();
  });

  test("does not call api for empty input", async () => {
    render(<ExpenseTracker />);
    const btn = await screen.findByRole("button", { name: /add/i });

    fireEvent.click(btn);
    expect(addExpense).not.toHaveBeenCalled();
  });

});
