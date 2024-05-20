"use client"
import { useEffect, useState } from 'react';
import './../../../style.css'
export default function Page({params}){

    let id = params.userid;
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=> {
        getUserDetails();
    }, []);

    const getUserDetails = async() => {
        let response = await fetch(`http://localhost:3000/api/users/${id}`);
        response = await response.json();
        setName(response.result.name);
        setAge(response.result.age);
        setEmail(response.result.email);
    }

    const updateUser = async() => {
        console.log(name, age, email);
        let response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'Put',
            body: JSON.stringify({name, age, email})
        });
        response = await response.json()
        console.log(response);
        if (response.success) {
           alert("User updated!");
        }else{
            alert("Update failed!");
        }
    }

    return(
        <div className='add-user'>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Eneter Name" className="input-field" />
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)}  placeholder="Eneter Age" className="input-field"/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Eneter Email" className="input-field"/>
            <button onClick={updateUser} className="btn">Update User</button>
        </div>
    );
}