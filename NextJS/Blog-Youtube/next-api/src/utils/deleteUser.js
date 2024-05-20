"use client"
export default function DeleteUser(props){
    const id = props.id;

    const deleteUser = async() => {
        let response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'Delete'
        });
        response = await response.json();
        alert(response.result);
    }
    return(
        <button onClick={deleteUser}>Delete</button>
    );
}