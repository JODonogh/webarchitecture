import React, {useState, Fragment} from 'react';

//importing various components for use
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';
import Table from 'react-bootstrap/Table'
import AddUser from './AddUser';
import Comment from './Comments'

//importing various bootstrap elements
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminArea = () => {
    //setting various state values
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editFormData, setEditFormData] = useState([]);
    const [edituserId, setEditUserid] = useState(null);

    //search for a user 
    const handleSearchUser=  () =>{
        setErrorMessage('', errorMessage);

        try {
            fetch(`http://localhost:3100/users?name=${name}`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data)
                });
        } catch (err) {
            setErrorMessage('There was an error searching for the user', errorMessage);
        }
    }

    //search all users
    async function handleSearchUserall(event) {
        event.preventDefault();
        setErrorMessage('', errorMessage);
        try {
            fetch('http://localhost:3100/users', {mode:'cors'})
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data)
                });
        } catch (err) {
            // setting error message
            setErrorMessage('There was an error searching for the user', errorMessage);
        }
    }

     //handling the name field change event
      const handleNameFieldChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    //handling tthe edit form submit
      const handleEditFormSubmit= async(event)=>{
        event.preventDefault();
        const newUsers= [...searchResults];//saving out the search results as is
        setSearchResults(newUsers);

        }

    //handling the edit click event
    const handleEditClick = (event, user) =>{
        event.preventDefault();
        setEditUserid(user._id);

        //setting new form values with the users various elements
        const formValues = {
            id: user._id,
            Name: user.name,
            pass: user.pass,
        }
        //setting the form data new form values
        setEditFormData(formValues,editFormData);
     };

     //handling the cancel click by returning the state to null
  const HandleCancelClick = () =>{
    setEditUserid(null);
  };

  //handling save form event from the JS button
  const handleSaveForm = () =>{
    setEditUserid(null);
  };

  //handling the delete button click event
  const handleDeleteClick=(edituserId)=>{
    const newUsers= [...searchResults];//giving newUsers variable the searchresults as they are now
    const index = searchResults.findIndex((user)=>user._id === edituserId)//getting the index for the particular user
    newUsers.splice(index, 1);//slicing them from the new list of users
           
    try {//deleting the user 
        fetch(`http://localhost:3100/users?_id=${edituserId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        });
        } catch (err) {
            console.error('Error:', err);      
        }

    //making the search results this new user list with the one removed
    setSearchResults(newUsers);
  }

    return(//using react Boostrap accordion 
        <>
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add User</Accordion.Header>
                <Accordion.Body>
                    <AddUser/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>View Comments</Accordion.Header>
                    <Accordion.Body>
                        <Comment />
                    </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Search by users</Accordion.Header>
                    <Accordion.Body>
                    <Form className="d-flex" onSubmit={handleEditFormSubmit}>
            <Form.Control
                type="search"
                placeholder="Search by game"
                value= {name}
                onChange={(e) => handleNameFieldChange(e)}
                className="me-2"
                aria-label="Search"
                />
                            <Button onClick={handleSearchUser}>
            Search Individual
            </Button>
            </Form>

            <Button onClick={handleSearchUserall}> Show All Users</Button>
            <br />
            <Table striped bordered hover>
                    <thead>
                    <tr>
                    <th>Name</th>
                    <th>Pass</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                {searchResults.map((user) => {
                                return(
                                <Fragment>
                                    { edituserId === user._id ? (//ternary operator for the event
                                    <EditableRow 
                                        user={user}
                                        HandleCancelClick={HandleCancelClick}
                                        handleSaveForm={handleSaveForm}
                                    />
                                    ) : (<ReadOnlyRow 
                                            user={user} 
                                            handleEditClick= {handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                            />)}  
                                </Fragment>
                                )
                            })}
                </tbody>
            </Table>
            <br />
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>                    
        </>
    );
};

export default AdminArea;
