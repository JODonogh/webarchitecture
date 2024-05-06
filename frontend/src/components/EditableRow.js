import React, {useState} from "react";
import Button from 'react-bootstrap/Button';

const EditableRow = ({ user, HandleCancelClick, handleSave}) => {
    const [name, setName] = useState(user.name);
    const [pass, setpass] = useState(user.pass);
    const oldName = user.name;

    //handle onChange event 
    const handleNameFieldChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handlepassFieldChange = (event) => {
        event.preventDefault();
        setpass(event.target.value);
    }

    //saving the form
    const handleSaveForm= async(event)=>{
        event.preventDefault();
        
         let user = {
            'name': name,
            'pass': pass
        };

               try {
                console.log(oldName)
                console.log(user)
            fetch(`http://localhost:3100/users?name=${oldName}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            });
            } catch (err) {
                console.error('Error:', err);
                
            }
            window.location.reload();
        }
    return(
        <tr key={user._id}>
            <td>
            <input type="text" 
                required="required" 
                placeholder= "Enter a name...." 
                name="fullName"
                value={name}
                onChange={(e) => handleNameFieldChange(e)}
                ></input>
            </td>
            <td>
            <input type="text" 
                required="required" 
                placeholder= "Enter an pass...." 
                name="pass"
                value={pass}
                onChange={(e) => handlepassFieldChange(e)}
                ></input>
            </td>
            <td>
                <Button type="submit" onClick={handleSaveForm} >Save</Button>
                <Button type="button" onClick={HandleCancelClick} >Cancel</Button>
            </td>
        </tr>
    )
}

export default EditableRow;