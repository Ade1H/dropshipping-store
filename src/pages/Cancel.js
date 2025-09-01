// src/pages/Cancel.js
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="text-center mt-5">
      <h1>❌ Payment Cancelled</h1>
      <p>Your checkout was cancelled. Don’t worry — you can try again anytime.</p>
      <Link to="/cart">
        <Button variant="warning" className="mt-3">
          Back to Cart
        </Button>
      </Link>
    </div>
  );
}
