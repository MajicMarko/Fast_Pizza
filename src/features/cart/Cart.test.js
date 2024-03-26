import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // You may need to install this package

// Import the Cart component to be tested
import Cart from "./Cart";

// Mocked Redux store
const mockStore = configureStore([]);
const initialState = {
  cart: [], // Add sample cart data if needed
  user: {
    username: "JohnDoe", // Sample username
  },
};
const store = mockStore(initialState);

describe("Cart Component", () => {
  it("renders EmptyCart when the cart is empty", () => {
    const { container } = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    // Check if EmptyCart is rendered when the cart is empty
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("renders the Cart component when the cart is not empty", () => {
    const cartItems = [
      // Add sample cart items here
      { pizzaId: 1, name: "Pizza 1", price: 10 },
      { pizzaId: 2, name: "Pizza 2", price: 12 },
    ];

    const { container } = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    // Check if the Cart component is rendered
    expect(screen.getByText("Your cart, JohnDoe")).toBeInTheDocument();

    // Check if CartItem components are rendered for each item in the cart
    cartItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price.toFixed(2)}`)).toBeInTheDocument();
    });

    // Check if "Clear cart" button is rendered
    expect(screen.getByText("Clear cart")).toBeInTheDocument();
  });

  it("handles the clear cart action", () => {
    // Mock the clearCart action
    const clearCart = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    // Find and click the "Clear cart" button
    const clearCartButton = screen.getByText("Clear cart");
    fireEvent.click(clearCartButton);

    // Check if the clearCart action was called
    expect(clearCart).toHaveBeenCalled();
  });
});
