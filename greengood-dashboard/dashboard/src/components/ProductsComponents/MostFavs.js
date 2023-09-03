import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function FavProducts() {

  const [SliderData, setSliderData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/product/stats`);
        const data = await response.json();

        let SliderData = {};
        
        if (data.meta.success) {
          SliderData = data.favCounts;

          setSliderData(SliderData);
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      };
    };

    fetchData();
  }, []);

  if (!SliderData) {
    return <div>Cargando información...</div>
  };

  const generateStarRating = (position) => {
    const maxStars = 3; // El máximo número de estrellas
    return maxStars - position + 1; // El producto más vendido tendrá 5 estrellas, el último 1 estrella
  };


  return (
    <>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={SliderData[0].image} />
          <div className="star-rating">
              {Array.from({ length: generateStarRating(1) }, (_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon={faStar} style={{ marginTop: "10px", color: "red" }} />
              ))}
          </div>
          <Card.Body>
            <Card.Title style={{color: "red"}}>Primer puesto:</Card.Title>
            <Card.Text>{SliderData[0].title}</Card.Text>
            <Card.Text><small className="text-muted">{SliderData[0].description}</small></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small  style={{color: "red"}}>Total: {SliderData[0].sum} Favs</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={SliderData[1].image} />
          {Array.from({ length: generateStarRating(2) }, (_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon={faStar} style={{ marginTop: "10px", color: "#c8920a" }} />
              ))}
          <Card.Body>
            <Card.Title style={{color: "#c8920a"}}>Segundo puesto:</Card.Title>
            <Card.Text>{SliderData[1].title}</Card.Text>
            <Card.Text><small className="text-muted">{SliderData[1].description}</small></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small  style={{color: "#c8920a"}}>Total: {SliderData[1].sum} Favs</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={SliderData[2].image} />
          {Array.from({ length: generateStarRating(3) }, (_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon={faStar} style={{ marginTop: "10px", color: "#1cc88a" }} />
              ))}
          <Card.Body>
            <Card.Title style={{color: "#1cc88a"}}>Tercer puesto:</Card.Title>
            <Card.Text>{SliderData[2].title}</Card.Text>
            <Card.Text><small className="text-muted">{SliderData[2].description}</small></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small  style={{color: "#1cc88a"}}>Total: {SliderData[2].sum} Favs</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default FavProducts;