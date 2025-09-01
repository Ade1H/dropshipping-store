import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import { useCart } from "./context/CartContext";

function Shell({ children }) {
  const { totalItems } = useCart();
  
  return (
    <>
      <Navbar bg="white" className="shadow-sm" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">My Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/shop">Shop</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/cart">
                Cart {totalItems > 0 && <Badge bg="primary">{totalItems}</Badge>}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-4">{children}</Container>
      <footer className="py-5 text-center footer">
        <small>© {new Date().getFullYear()} My Store • Secure checkout by Stripe</small>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />       
        </Routes>
      </Shell>
    </Router>
  );
}

export default App;