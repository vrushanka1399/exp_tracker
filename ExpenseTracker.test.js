import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseTracker from "../ExpenseTracker";

describe("Expense Tracker App", () => {

  // 1
  test("renders heading", () => {
    render(<ExpenseTracker />);
    expect(screen.getByText(/expense tracker/i)).toBeInTheDocument();
  });

  // 2
  test("renders input field", () => {
    render(<ExpenseTracker />);
    expect(screen.getByPlaceholderText(/enter amount/i)).toBeInTheDocument();
  });

  // 3
  test("renders add button", () => {
    render(<ExpenseTracker />);
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  // 4
  test("adds new expense", () => {
    render(<ExpenseTracker />);

    const input = screen.getByPlaceholderText(/enter amount/i);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "100" }});
    fireEvent.click(button);

    expect(screen.getByText("100")).toBeInTheDocument();
  });

  // 5
  test("clears input after add", () => {
    render(<ExpenseTracker />);

    const input = screen.getByPlaceholderText(/enter amount/i);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "200" }});
    fireEvent.click(button);

    expect(input.value).toBe("");
  });

  // 6
  test("does not add empty expense", () => {
    render(<ExpenseTracker />);

    const button = screen.getByRole("button", { name: /add/i });
    fireEvent.click(button);

    expect(screen.queryByText("")).not.toBeInTheDocument();
  });

  // 7
  test("shows total balance", () => {
    render(<ExpenseTracker />);
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });

  // 8
  test("updates total after adding expense", () => {
    render(<ExpenseTracker />);

    const input = screen.getByPlaceholderText(/enter amount/i);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "50" }});
    fireEvent.click(button);

    expect(screen.getByText(/50/)).toBeInTheDocument();
  });

  // 9
  test("renders expense list", () => {
    render(<ExpenseTracker />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  // 10
  test("can add multiple expenses", () => {
    render(<ExpenseTracker />);

    const input = screen.getByPlaceholderText(/enter amount/i);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "100" }});
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "200" }});
    fireEvent.click(button);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

});
