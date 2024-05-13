async function getUser(id){
    console.log('Fun ',id);
    let data = await fetch(`http://localhost:3000/api/users/${id}`);
    data = await data.json();
    console.log('Fun ');
    console.log(data.result);
    return await data.result[0];
}


export default async function Page({params}){
    console.log(params.userid);
    const userData = await getUser(params.userid);
    console.log(userData);
return (
    <div>
        <h2>{params.id}</h2>
        <h4>Name - {userData.name}, Age - {userData.age}</h4>
    </div>
);
}