// import '../../app/adduser/style.css'
import './../style.css'
export default function Page(){
    return(

        <div className='add-user'>
            <input type="text" placeholder="Eneter Name" className="input-field" />
            <input type="text" placeholder="Eneter Age" className="input-field"/>
            <input type="text" placeholder="Eneter Email" className="input-field"/>
            <button className="btn">Add User</button>
        </div>
    );
}