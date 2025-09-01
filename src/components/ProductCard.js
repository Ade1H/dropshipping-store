import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

function ProductCard({ product, onAddToCart }) {
  const { title, image, price, description } = product;

  return (
    <Card className="h-100 shadow-sm product-card">
      <div
        className="d-flex align-items-center justify-content-center p-3 bg-white"
        style={{ height: 200, overflow: "hidden" }}
      >
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{ maxHeight: "100%", width: "auto" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-title fs-6">{title}</Card.Title>
        {description && (
          <Card.Text className="small text-muted flex-grow-1 product-description">
            {description}
          </Card.Text>
        )}
        <div className="mt-auto d-flex align-items-center justify-content-between">
          <Badge bg="primary" className="badge-price fs-6">
            ${price?.toFixed?.(2)}
          </Badge>
          <Button 
            variant="primary" 
            onClick={() => onAddToCart?.(product)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;