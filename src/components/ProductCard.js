import React from "react";
import { Card, Button } from "react-bootstrap";


function ProductCard({ product, onAddToCart }) {
const { title, image, price, description } = product;


return (
<Card className="h-100 shadow-sm">
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
<Card.Title className="fs-6">{title}</Card.Title>
<Card.Text className="text-muted mb-2">${price?.toFixed?.(2)}</Card.Text>
<Card.Text className="small flex-grow-1 text-truncate">
{description}
</Card.Text>
<Button
variant="primary"
className="mt-2"
onClick={() => onAddToCart?.(product)}
>
Add to Cart
</Button>
</Card.Body>
</Card>
);
}


export default ProductCard;