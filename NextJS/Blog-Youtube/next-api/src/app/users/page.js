import Link from "next/link";
import '../style.css'
import DeleteUser from "@/utils/deleteUser";

async function getUsers() {
    // let data = await fetch("http://localhost:3000/api/users");
    let data = await fetch("http://localhost:3000/api/users",{cache: "no-cache"}); // To avoid cached data
    return await data.json();
}


export default async function Page() {
    const users = await getUsers();

    return (
        <div>
            <h1>Users Page</h1>
            {
                users.map((item) => (
                    <div id={item.id} className="user-item">
                        <span>
                        <Link href={`/users/${item.id}`}>{item.name}</Link>
                        </span>
                        <span>
                            <Link href={`/users/${item.id}/update`}>Edit</Link>
                        </span>
                        <span>
                            <DeleteUser id={item.id} />
                        </span>
                    </div>
                ))
            }
        </div>
    );
}