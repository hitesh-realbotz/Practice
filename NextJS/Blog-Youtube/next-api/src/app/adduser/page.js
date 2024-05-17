"use client"
import { useState } from 'react';
import './../style.css'
export default function Page(){

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    const addUser = async() => {
        console.log(name, age, email);
        let response = await fetch('http://localhost:3000/api/users', {
            method: 'Post',
            body: JSON.stringify({name, age, email})
        });
        response = await response.json()
        console.log(response);
        console.log('Post API called from addUser');
        if (response.success) {
           alert(response.result);
        }else{
            alert(response.result);
        }
    }

    return(
        <div className='add-user'>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Eneter Name" className="input-field" />
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)}  placeholder="Eneter Age" className="input-field"/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Eneter Email" className="input-field"/>
            <button onClick={addUser} className="btn">Add User</button>
        </div>
    );
}