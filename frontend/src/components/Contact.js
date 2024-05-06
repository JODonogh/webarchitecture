import React, {useState} from "react";

//importing react bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const Contact = () =>{//setting initial state values
    const [EmailValid, setEmailValid] = useState(null);
    const [NameValid, setNameValid] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const [comment, setcomment] = useState('');
    const [validated, setValidated] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

  //email validation
  function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);// Regexp.test method
    }

  //name validation
  function isValidName(name) {
      return /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);// Regexp.test method
    }

//event onChange handlers
const handleNameFieldChange = (event) => {
  if (!isValidName(event.target.value)) {//checking if the name is valid
    setNameValid('Name is invalid');
  } else {
    setNameValid(null);
  }
  setName(event.target.value);
};

//on change Email handler
const handleEmailFieldChange = (event) => {
  if (!isValidEmail(event.target.value)) {
    setEmailValid('Email is invalid');
  } else {
    setEmailValid(null);
  }
  setEmail(event.target.value);
};

//on change event handlers
const handlePhoneFieldChange = (event) => {
  event.preventDefault();
  setPhone(event.target.value);
}

const handleCommentFieldChange = (event) => {
  event.preventDefault();
  setcomment(event.target.value);
}

//create comment function
const handleCreateComment = async (event) => {
  {EmailValid?alert("Invalid email"):console.log("email valid")} //checking if the its a valid email/name, if not letting user know
  {NameValid?alert("Invalid Name"):console.log("Name valid")}
  event.preventDefault();
  setStatusMessage('', statusMessage);

  let feedback = {
      'name': name,
      'email': email,
      'phone' : phone,
      'comment': comment
  };

  try {//post http method
      fetch("http://localhost:3100/comments",  {
          method: "POST",
          headers: {
              'Content-Type': "application/json"
          },
          body: JSON.stringify(feedback)
      })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setStatusMessage('Comments ' + feedback.name + ' created');
          });
  } catch (err) {
      // setting error message
      setStatusMessage('There was an error creating the user');
  }
}


    return(
        <Container>
            <Row>
            <Col>
            <h1 align="center">
                <b>Contact us</b>
            </h1>
            </Col>
            </Row>
            <br />

            <Form noValidate>
      <Row className="mb-3">
      <Form.Group as={Col}  md="4"controlId="formGridname">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          required
          type="text" 
          placeholder="Name" 
          value= {name}
          onChange={(e) => handleNameFieldChange(e)}
          />
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}  md="4" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
        <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              required
              type="email"
              placeholder="email"
              aria-describedby="inputGroupPrepend"
              value= {email}
              onChange={(e) => handleEmailFieldChange(e)}
            />
          </InputGroup>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control 
        type="Number" 
        placeholder="Phone Number..." 
        value= {phone}
        onChange={(e) => handlePhoneFieldChange(e)}/>

      </Form.Group>
        
      <Form.Group className="mb-3" controlId="formGridComment">
        <Form.Label>Comments</Form.Label>
        <Form.Control
          required
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '200px' }}
          value= {comment}
          onChange={(e) => handleCommentFieldChange(e)}
          />
</Form.Group>
<br />

      <Button variant="primary" type="submit" onClick={handleCreateComment}>
        Submit
      </Button>
    </Form>
    <br />
    <Row>
    <Col>Jot us a note and we’ll get back to you as quickly as possible.
            </Col>

    </Row> 
    <br />
    <Row>
    <Col>For all general enquiries, please email us here
If you have any questions about a recent webstore order or wish to speak to a member of staff, please use the above form
If you prefer snail mail, please use the following address to send your letters to:
Address: Unit 6 Block 3, City North Business Campus, Stamullen, Co. Meath, Ireland.
</Col>
    </Row>          

        </Container>
    );
};

export default Contact;