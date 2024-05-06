import React, {useState} from 'react';

//react bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//other components
import Members from './MArea';

const AuthenUser = () => {//setting initial states
    const [name, setName] = useState('');
    const [pass, setpass] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setLoggin] = useState(0);

    //onChange event handlers
    const handleNameFieldChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handlepassFieldChange = (event) => {
        event.preventDefault();
        setpass(event.target.value);
    }
    //login function
    const login= async (event) =>{
        event.preventDefault();
        setErrorMessage('', errorMessage);

        try {
            console.log(name, pass)
            fetch(`http://localhost:3100/users?name=${name}`)
                .then(response => response.json())
                .then(data => {
                    if (name.toString() === data["0"].name.toString() && pass.toString() === data["0"].pass.toString()){
                        setLoggin(isLoggedIn + 1);
                    } else{
                        throw new Error('Invalid password');
                    }
                });
        } catch (err) {
            // set Error message value
            setErrorMessage('There was an error searching for the user');
        }
    }

    const logout =()=>{
        setLoggin(isLoggedIn - 1);
    }

    return(
        <>
        <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter your Username" 
            value= {name}
            autoComplete ="off"
            onChange={(e) => handleNameFieldChange(e)}
            />
          <Form.Text className="text-muted">
            Input your username only
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Enter your Password" 
          autoComplete ="off"
          value={pass}
          onChange={(e) => handlepassFieldChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button 
            variant="primary" 
            type="submit" 
            onClick={login}>
          Submit
        </Button>
      <Button 
            variant="primary" 
            type="submit" 
            onClick={logout}>
          Logout
        </Button>
      </Form>
      { isLoggedIn? <Members /> : <div></div>}
        </>
    );
};
export default AuthenUser;
