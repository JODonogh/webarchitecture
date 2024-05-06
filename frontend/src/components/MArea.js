import React, { useState, useEffect } from 'react';

//importing react bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Members() {

  //setting initial states
const [searchResults, setSearchResults] = useState([]);
const [errorMessage, setErrorMessage] = useState('');

useEffect(()=>{//data loading side effect
  try {
    fetch('http://localhost:3100/personaldb', {mode:'cors'})
        .then(response => response.json())
        .then(data => {
            setSearchResults(data)
        },);
} catch (err) {
    //setting the error message
    setErrorMessage('There was an error searching for the user', errorMessage);
}
}, []);

//search all function
  async function handleSearchall(event) {
    event.preventDefault();
    setErrorMessage('');

    try {
        fetch('http://localhost:3100/personaldb', {mode:'cors'})
            .then(response => response.json())
            .then(data => {
                setSearchResults(data)
            });
    } catch (err) {
        //setting the error message
        setErrorMessage('There was an error searching for the user');
    }
}

//handle delete click event
const handleDeleteClick=(gameId)=>{
  const newUsers= [...searchResults];
  const index = searchResults.findIndex((user)=>user._id === gameId)
  newUsers.splice(index, 1);
  setSearchResults(newUsers);

  try {
    fetch(`http://localhost:3100/personaldb?_id=${gameId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        }
    });
    } catch (err) {
        console.error('Error:', err);      
    }

setSearchResults(newUsers);
}

  return (
    <> 
    <br />
    <Navbar bg="light">
    <Container>
          <Navbar.Brand>Members Saved games</Navbar.Brand>
        </Container>
      </Navbar>
    <Form className="d-flex">
<Button variant="outline-success" onClick={handleSearchall}>See Your Games</Button>
</Form>
<br />
      {searchResults.map((game) => {
        return(
          <>
          <Card 
            text= "dark"
            bg="light"
            style={{ width: '18rem' }}
            key={game._id}>
      <Card.Body>
          <Card.Title>{game.name}</Card.Title>
          <Card.Text>
          {game.price}
        </Card.Text>
        <Card.Text>
          Price
        </Card.Text>
        <Button 
        variant="primary" 
        onClick={()=>handleDeleteClick(game._id)}>Delete </Button>
      </Card.Body>
    </Card>
    </>
       )
      })}    
    </>
  );
    }

export default Members;

