import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container, Badge } from "react-bootstrap";
import { useCart } from "../context/CartContext";

function NavbarComponent() {
  const { totalItems } = useCart(); // 👈 live cart count

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">MyStore</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Right side: Cart with badge */}
          <Nav>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
              🛒 Cart{" "}
              <Badge bg="primary" pill className="ms-2">
                {totalItems}
              </Badge>
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default NavbarComponent;
