import Link from "next/link";

async function getUsers(){
    let data = await fetch("http://localhost:3000/api/users");
    return  await data.json();
}


export default async function Page(){
    const users = await getUsers();

    return(
        <div>
            <h1>Users Page</h1>
            {
                users.map((item)=> (
                    <div id={item.id}><Link href={`/users/${item.id}`}>{item.name}</Link></div>
                ))
            }
        </div>
    );
}