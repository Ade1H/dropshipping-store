
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="text-center mt-5">
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your order. A confirmation email will be sent shortly.</p>
      <Link to="/">
        <Button variant="primary" className="mt-3">
          Back to Shop
        </Button>
      </Link>
    </div>
  );
}
