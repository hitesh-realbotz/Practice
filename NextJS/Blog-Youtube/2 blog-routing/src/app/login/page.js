'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";


const Login =()=>{
    const navigate = useRouter();
    const handleOnChange = (event) =>{
        console.log(event.target.value);
        if (event.target.value === '/') {
            // navigate.push(event.target.value);
            navigate.push('/about');
        }
    }
    return(
        <div>
            <h1>Login Page</h1>
            <input value=""  onChange={(event) => handleOnChange(event)} />
            <Link href="/" >Go to Home Page</Link>
        </div>
    )
}

export default Login;