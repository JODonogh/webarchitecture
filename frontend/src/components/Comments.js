import React, { useState, useEffect } from 'react';

//importing react bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Comment = () =>{
  //setting initial state values
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{//data loading side effect loading in the comments
        try {
          fetch('http://localhost:3100/comments', {mode:'cors'})
              .then(response => response.json())
              .then(data => {
                  setSearchResults(data)
              },);
      } catch (err) {
          // Remediation logic
          setErrorMessage('There was an error searching for the user', errorMessage);
      }
      }, []);

      //handle delete click
      const handleDeleteClick=(commentId)=>{
        const newComments= [...searchResults];
        const index = searchResults.findIndex((comment)=>comment._id === commentId)
        newComments.splice(index, 1);//deleting the comment out of the list by its index
        setSearchResults(newComments);
        try {
          fetch(`http://localhost:3100/comments?_id=${commentId}`, {
              method: "DELETE",
              headers: {
                  'Content-Type': "application/json"
              }
          });
          } catch (err) {
              console.error('Error:', err);      
          }
          setSearchResults(newComments);
}

return(
    <div>
    { searchResults.map((comment) => {
        return(
          <>
          <Card 
          text= "dark"
          bg="light"
          style={{ width: '18rem' }}
          key={comment._id}>
          
      <Card.Body>
          <Card.Title>{comment.name}</Card.Title>
          <Card.Text>
          {comment.email}
        </Card.Text>
          <Card.Text>
          {comment.comment}
        </Card.Text>
        <Card.Text>
          {comment.phone}
        </Card.Text>
        <Button 
        variant="primary" 
        onClick={()=>handleDeleteClick(comment._id)}>Delete </Button>
      </Card.Body>
    </Card>
    <br />
    </>
       )
      })} 
    </div>
  );
}

export default Comment;
