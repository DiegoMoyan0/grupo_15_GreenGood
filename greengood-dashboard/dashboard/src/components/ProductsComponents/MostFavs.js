import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function FavProducts() {

  let [FavsData, setFavsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/product/stats`);
        const data = await response.json();

        let favs;

        if (data.meta.success) {
          favs = data.favCounts;
          console.log(data);
          setFavsData(favs);
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      };
    };

    fetchData();
  }, []);
  
  if (!FavsData || FavsData.length === 0) {
    return <div>Cargando información...</div>
  };

  const generateStarRating = (position) => {
    const maxStars = 3; 
    return maxStars - position + 1;
  };


  return (
    <>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={FavsData[0].image} />
          <div className="star-rating">
              {Array.from({ length: generateStarRating(1) }, (_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon={faStar} style={{ marginTop: "10px", color: "red" }} />
              ))}
          </div>
          <Card.Body>
            <Card.Title style={{color: "red"}}>Primer puesto:</Card.Title>
            <Card.Text>{FavsData[0].title}</Card.Text>
            <Card.Text><small className="text-muted">{FavsData[0].description}</small></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small  style={{color: "red"}}>Total: {FavsData[0].sum} Favs</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={FavsData[1].image} />
          {Array.from({ length: generateStarRating(2) }, (_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon={faStar} style={{ marginTop: "10px", color: "#c8920a" }} />
              ))}
          <Card.Body>
            <Card.Title style={{color: "#c8920a"}}>Segundo puesto:</Card.Title>
            <Card.Text>{FavsData[1].title}</Card.Text>
            <Card.Text><small className="text-muted">{FavsData[1].description}</small></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small  style={{color: "#c8920a"}}>Total: {FavsData[1].sum} Favs</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={FavsData[2].image} />
          {Array.from({ length: generateStarRating(3) }, (_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon={faStar} style={{ marginTop: "10px", color: "#1cc88a" }} />
              ))}
          <Card.Body>
            <Card.Title style={{color: "#1cc88a"}}>Tercer puesto:</Card.Title>
            <Card.Text>{FavsData[2].title}</Card.Text>
            <Card.Text><small className="text-muted">{FavsData[2].description}</small></Card.Text>
          </Card.Body>
          <Card.Footer>
            <small  style={{color: "#1cc88a"}}>Total: {FavsData[2].sum} Favs</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default FavProducts;