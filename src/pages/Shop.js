import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading products…</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Oops! Something went wrong.</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Shop</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} onAddToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
