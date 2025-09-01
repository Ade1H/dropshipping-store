import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert, Form, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
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

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="py-5">
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading products…</span>
        </div>
      </Container>
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
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
        <h1 className="mb-3 mb-md-0">Shop</h1>
        <Form style={{ maxWidth: 320, width: "100%" }}>
          <Form.Control
            placeholder="Search products…"
            value={q}
            onChange={e => setQ(e.target.value)}
            size="lg"
          />
        </Form>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No products found.</h4>
          <p className="text-muted">Try adjusting your search terms.</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filtered.map(p => (
            <Col key={p.id}>
              <ProductCard product={p} onAddToCart={addToCart} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}