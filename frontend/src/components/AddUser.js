import React, {useState} from 'react'; //importing useState as well as React

//bootstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddUser = () => {
    //setting the states
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    //handling the name change event
    const handleNameFieldChange = (event) => {
        event.preventDefault();//preventing the default action that happens to the event occurring
        setName(event.target.value);
    }

    //handling the pass change event
    const handlepassFieldChange = (event) => {
        event.preventDefault();
        setPass(event.target.value);//setting the state value with the target value 
    }

    //Creating a user 
    const handleCreateUser = async (event) => {
        event.preventDefault();
        setStatusMessage('');

        let user = {//creating a user object from state variables
            'name': name,
            'pass': pass
        };

        try {//fetching users and post with json file for the user
            fetch("http://localhost:3100/users",  {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => {
                    setStatusMessage('User ' + user.name + ' created');
                });
        } catch (err) {
            //  catching the error and displaying a statusmessage
            setStatusMessage('There was an error creating the user');
        }
    }

    return(//using react bootstrap form elements in the JSX
        <>
            <Form.Group className="mb-3" controlId="NewUsername">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter a name...." 
            value= {name}// setting the name value as an object
            onChange={(e) => handleNameFieldChange(e)}//on change the event handler is called with the event
            />
          <Form.Text className="text-muted">
            Input your username only
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="NewPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter an pass...."
            value= {pass}
            onChange={(e) => handlepassFieldChange(e)}
            />
            
          <Form.Text className="text-muted">
            Input your password
          </Form.Text>
          </Form.Group>
          
          <div>
        <Button onClick={handleCreateUser}>Register</Button></div>
        <p className="text-red-900">
            { statusMessage }
        </p>
    </>
    );
};

export default AddUser
