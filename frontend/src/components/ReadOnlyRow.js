import React from "react";
import Button from 'react-bootstrap/Button';

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) =>{
    return (
            <tr
            key={user._id}>
                <td>{user.name}</td>
                <td>{user.pass}</td>
                <td>
                <Button 
                    type="button" 
                    onClick={(event)=> handleEditClick(event, user)}>
                        Edit
                </Button>
                </td>
                <td>
                <Button type="button" onClick={()=>handleDeleteClick(user._id)}>Delete</Button>
                </td>
                {/*Need contact so we can get user id and save it into state*/}
            </tr>

    )
}

export default ReadOnlyRow