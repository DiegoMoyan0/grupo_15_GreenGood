import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function BestSellers() {

  const [ProductsData, setProductsData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/product/mostSelled`);
        const data = await response.json();

        let ProductsData = [];
        
        if (data.meta.success) {
          ProductsData = data.data;
          setProductsData(ProductsData);
        };

      } catch (error) {
        console.error('Error fetching data:', error)
      };
    };

    fetchData();
  }, []);

  if (!ProductsData || ProductsData.length === 0) {
    return <div>Cargando información...</div>
  };

  const generateStarRating = (position) => {
    const maxStars = 5; // El máximo número de estrellas
    return maxStars - position + 1; // El producto más vendido tendrá 5 estrellas, el último 1 estrella
  };

  return (
    <>
      <CardGroup >
        {ProductsData.map((product, index) => (
            <Card key={index + "bestSellerskey"} >
                <Card.Img variant="top" src={product.image} />
                <div className="star-rating">
                    {Array.from({ length: generateStarRating(index + 1) }, (_, starIndex) => (
                        <FontAwesomeIcon key={starIndex} icon={faStar} style={{ marginTop: "10px", color: "red" }} />
                    ))}
                </div>
                <Card.Body>
                    <Card.Title style={{color: "red"}}></Card.Title>
                    <Card.Text>{product.title}</Card.Text>
                    <Card.Text><small className="text-muted">{product.description}</small></Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small  style={{color: "red"}}>Ventas: {Math.round(product.sales_amount)}</small>
                </Card.Footer>
            </Card>
        ))}
      </CardGroup>
    </>
  );
}

export default BestSellers;