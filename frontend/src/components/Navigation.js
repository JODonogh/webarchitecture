import React, { useState, useEffect } from 'react' ;

//import various components
import About from './About'
import Contact from './Contact'
import HowToPlay from './HowToPlay'
import Admin from './Admin';
import AuthenUser from './authenUser';
import Games from './Games'
import AddUser from './AddUser';

//css for the darkmode
import './darkmode.css';
import C7Logo from './images/C7Logo.png'
import Container from 'react-bootstrap/Container';

//importing react bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Members from './MArea'

function Navigation() {
  //setting states initial values & methods
  const [show, setShow]= useState(0)
  const [name, setName] = useState('');
  const [pass, setpass] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setLoggin] = useState(0);
  const [theme, setTheme] = useState('light');//setting initial theme to light
  const [register, setRegister] = useState(0);

  useEffect(() => {// updating the className of the document.body element based on the dark theme state variable.
    document.body.className = theme;
    }, [theme]);

    //toggle between themes function
  const toggleTheme = () => {
    if (theme === 'light') {
    setTheme('dark');
    } else {
    setTheme('light');
    }
    };

  //for closing or showing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for showing or hidding the register tab
  const RegisterShow= () => setRegister(true);  

      //onChange event handlers
      const handleNameFieldChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handlepassFieldChange = (event) => {
        setpass(event.target.value);
    }

    const login= async (event) =>{
        event.preventDefault();
        setErrorMessage('');

        try {
            console.log(name, pass)
            fetch(`http://localhost:3100/users?name=${name}`)
                .then(response => response.json())
                .then(data => {
                    if (name.toString() === data["0"].name.toString() && pass.toString() === data["0"].pass.toString()){//checking log in details
                        setLoggin(isLoggedIn + 1);
                        handleClose()
                    } else{
                        throw new Error('Invalid Login details');
                    }
                }).catch(error=>{alert("Invalid Login details'!", error)})
        } catch (err) {
            // Remediation logic
            setErrorMessage('There was an error searching for the user', errorMessage);
        }
    }
 
  return (
    <div className={`App ${theme}`}>
    <Navbar id="Navbar">
    <img
              src={C7Logo}
              width="65"
              height="65"
              className="d-inline-block align-top"
              alt="Cubicle 7 Banner logo"
            />{''}
        <Container>
          <Navbar.Brand id="home">Cubicle 7 Entertainment</Navbar.Brand>
          <Form className="d-flex">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
          <br />
          <Button  variant="primary" 
            onClick={handleShow}>
              Login
              </Button>
          <Button onClick={RegisterShow}>Register</Button>
      </Form>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} id="Modal">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter your Username" 
            value= {name}
            onChange={(e) => handleNameFieldChange(e)}
            />
          <Form.Text className="text-muted">
            Input your username 
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Enter your Password" 
          value={pass}
          onChange={(e) => handlepassFieldChange(e)}
          />
        </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={login }>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

    <Tabs
    defaultActiveKey="games"
    id="uncontrolled-tab-example"
    className="mb-3">  
    <Tab eventKey="about" title="About">
      <About />
    </Tab>
    <Tab eventKey="contact" title="Contact">
      <Contact />
    </Tab>
    <Tab eventKey="howtoplay" title="HowToPlay">
      <HowToPlay />
    </Tab>
    <Tab eventKey="games" title="Games">
      {isLoggedIn? <Games login= {1}/>: <Games login= {0}/>}
    </Tab>
    {isLoggedIn?//ternary operator to show members tab if you are logged in
    <Tab eventKey="members" title="Members">
      {isLoggedIn?<Members/>: <AuthenUser />}
    </Tab>:<Tab />}
    <Tab eventKey="admin" title="Admin">
      <Admin />
      </Tab>
    {register?//showing the register tab
    <Tab eventKey="Register" title="Register">
      <AddUser />
    </Tab>:<Tab />}
  </Tabs>
  </div>
);
}


export default function Header() {
    //  <Logo />
  return (
      <header>
      
        <Navigation />
      </header>
  );
}