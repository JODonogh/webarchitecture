import React, {useState} from 'react';

// react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// adminarea component
import AdminArea from './AdminArea'

const Admin = () => {//setting initial values for the various states
    const [name, setName] = useState('');
    const [pass, setPass] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setLoggin] = useState(0);

    //event handlers for changing the various fields
    const handleNameFieldChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handlePassFieldChange = (event) => {
        event.preventDefault();
        setPass(event.target.value);
    }

    const login= async (event) =>{
        event.preventDefault();
        setErrorMessage('', errorMessage);

        try {
            fetch(`http://localhost:3100/adminstrate?name=${name}`)
                .then(response => response.json())
                .then(data => {
                    if (name.toString() === data["0"].name.toString() && pass.toString() === data["0"].pass.toString()){//converting all to strings and comparing the values
                        setLoggin(isLoggedIn + 1);
                    } else{
                        throw new Error('Invalid password');
                    }
                })//alerting the user of invalid login details
                .catch(error=>{alert("Invalid Login details!", error)})
        } catch (err) {
            // set Error message return
            setErrorMessage('There was an error searching for the user');
        }
    }

    const logout =()=>{//logging out by bringing the state value down one
        console.log(isLoggedIn);
        setLoggin(isLoggedIn - 1);
    }

    return(
        <>
        {isLoggedIn?<Button variant="primary" type="submit" onClick={logout}>Logout</Button>://if the its logged in the logout button will be shown
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Enter your Password" 
          value={pass}
          autoComplete ="current-password"
          onChange={(e) => handlePassFieldChange(e)}
          />
        </Form.Group>
        <Button 
            variant="primary" 
            type="submit" 
            onClick={login}>
          Submit
        </Button>

      </Form>
      }
      { isLoggedIn? <AdminArea /> : <div></div>}
        </>
    );
};
export default Admin;
