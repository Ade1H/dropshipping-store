import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";

// Use backend URL from env var, fallback to local dev server
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function Cart() {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice, setQuantity } = useCart();

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${API_BASE}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const text = await res.text();
      console.log("Checkout status:", res.status);
      console.log("Checkout raw response:", text);

      if (!res.ok) {
        alert("Server error: " + text);
        return;
      }

      const data = JSON.parse(text);
      if (data.url) {
        window.location.href = data.url; // Stripe Checkout
      } else {
        alert("Server did not return a checkout URL.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error connecting to payment server");
    }
  };

  if (cart.length === 0) return <h2 className="mt-3">Your cart is empty 🛒</h2>;

  return (
    <div>
      <h1 className="mb-4">Your Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th style={{ width: 120 }}>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => setQuantity(item.id, Number(e.target.value))}
                />
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Total Items: {totalItems}</h4>
      <h4>Total Price: ${totalPrice.toFixed(2)}</h4>

      <div className="d-flex gap-2 mt-3">
        <Button variant="warning" onClick={clearCart}>
          Clear Cart
        </Button>
        <Button variant="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
