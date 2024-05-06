import React, { useState, useEffect } from 'react';

//importing react bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//importing css files
import '../App.css';
import './darkmode.css';

function Games({ login } ) {
//setting states initial values & methods
const [searchResults, setSearchResults] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const [statusMessage, setStatusMessage] = useState('');
const [name, setName] = useState('');
const [show, setShow] = useState(false);

//on handle close and show events setting the values to true/false
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(()=>{//data loading side effect
  try {
    fetch('http://localhost:3100/games/all', {mode:'cors'})
        .then(response => response.json())
        .then(data => {
            setSearchResults(data)
        },);
} catch (err) {
    //setting the error message
    setErrorMessage('There was an error searching for the user');
}
}, []);

//searching by individual ip
const handleSearchIP= (ip) =>{
  setErrorMessage('', errorMessage);

  try {
      
      fetch(`http://localhost:3100/games?ip=${ip}`)
          .then(response => response.json())
          .then(data => {
              setSearchResults(data)
          });
  } catch (err) {
      //setting the error message
      setErrorMessage('There was an error searching for the user');
  }
}
//the radio button search by price
const handleSearchPrice= (price) =>{
  setErrorMessage('', errorMessage);

  try {
      
      fetch(`http://localhost:3100/games?price=${price}`)
          .then(response => response.json())
          .then(data => {
              setSearchResults(data)
          });
  } catch (err) {
      //setting the error message
      setErrorMessage('There was an error searching for the user');
  }
}
//search all function
  async function handleSearchall(event) {
    event.preventDefault();
    setErrorMessage('', errorMessage);

    try {
        fetch('http://localhost:3100/games/all', {mode:'cors'})
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setSearchResults(data)
            });
    } catch (err) {
        //setting the error message
        setErrorMessage('There was an error searching for the user');
    }
}

async function handleSearchart(event) {
  event.preventDefault();
  setErrorMessage('', errorMessage);

  try {
      fetch('http://localhost:3100/art', {mode:'cors'})
          .then(response => response.json())
          .then(data => {
              console.log(data)
              setSearchResults(data)
          });
  } catch (err) {
      //setting the error message
      setErrorMessage('There was an error searching for the user');
  }
}

//handle save click button
const handleSaveClick=(name, price)=>{
  setErrorMessage('', errorMessage);

  let game = {
      'name': name,
      'price': price
 };

  try {
      fetch("http://localhost:3100/personaldb",  {
          method: "POST",
          headers: {
              'Content-Type': "application/json"
          },
          body: JSON.stringify(game)
      })
          .then(response => response.json())
          .then(data => {
              console.log(game);
              setStatusMessage('Game ' + game.name + ' created');
          });
  } catch (err) {
      //setting the error message
      setStatusMessage('Oh no! There was an error creating the game', statusMessage);
  }

}
  //event handlers
const handleNameFieldChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  }

//changing the card colours
const cardColour=(ip)=>{
  if (ip.toString()==="AOS".toString()){
    return 'warning'
  } else if (ip.toString()==="WFRP".toString()){
    return 'secondary'
}else if (ip.toString()==="40K".toString()){
  return 'danger'
}else{
  return 'primary'
}
}

  return (
    <div>
<Container fluid>
  <Row>
    <Col>
<Button 
variant="outline-primary"
onClick={handleShow}>Show Filters</Button>
</Col>
<Col>
<Button variant="outline-primary" onClick={handleSearchall}>Show All Games</Button>
</Col>
</Row>
</Container>
<br />
<Offcanvas show={show} onHide={handleClose} placement='top' id="Offcanvas">
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Game Filters</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body>
<Form>
      {['radio'].map((type) => (//react bootstrap radio buttons
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="40K"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            onInput={()=>handleSearchIP("40K")}
          />
          <Form.Check
            inline
            label="WFRP"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            onInput={()=>handleSearchIP("WFRP")}
          />
            <Form.Check
            inline
            label="AOS"
            name="group1"
            type={type}
            id={`inline-${type}-3`}
            onInput={()=>handleSearchIP( "AOS")}
          />
            <Form.Check
            inline
            label="Dr. Who"
            name="group1"
            type={type}
            id={`inline-${type}-4`}
            onInput={()=>handleSearchIP("Dr")}
          />
        </div>
      ))}
    </Form>
    <Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="0-35 dollars"
            name="group2"
            type={type}
            id={`inline-${type}-1`}
            onInput={()=>handleSearchPrice(10)}
          />
          <Form.Check
            inline
            label="35 or more dollars"
            name="group2"
            type={type}
            id={`inline-${type}-2`}
            onInput={()=>handleSearchPrice(20)}
          />
        </div>
      ))}
    </Form>
    </Offcanvas.Body>
</Offcanvas>
<br />
{ searchResults.map((game) => {//mapping out the games to their cards
        return(
          <>
          <Card 
          bg={cardColour(game.ip)}
          text="light"
          style={{ width: '18rem' }}
          key={game._id}>
          
      <Card.Body >
          <Card.Title>{game.name}</Card.Title>
          <Card.Text>
          Price: {game.price}
        </Card.Text>
        {login?
        <Button onClick={()=>handleSaveClick(game.name, game.price)}>Save </Button>:
        <div />}
      </Card.Body>
    </Card>
    <br />
    </>
       )
      })} 
    </div>
  );
}

export default Games;

