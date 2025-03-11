//I didnt know what to name this, but
//basically it just grabs the user

//checks if its admin for the group theyre in?
export async function isAdminOfGroup(group_id){
    //gotta fetch lol
    const user_id = localStorage.getItem('userID');
    const results = await fetch(`http://localhost:5000/usersgroups/${group_id}/is-admin?user_id=${user_id}`);
    if (results?.role_id==1){
        return true;
    }
    return false;
}

//return true or false : 
export async function isMemberOfGroup(group_id){
    try{
        const user_id = localStorage.getItem('userID');
        console.log("groupid:", group_id, user_id);
        const results = await fetch(`http://localhost:5000/usersgroups/${group_id}/get-member?user_id=${user_id}`);
        const data = await results.json();
        if (results.ok){
            return true;
        }
        // if (results.text ==""){
        //     return false;
        // }
        
        return false;
    }
    //have to fetch usergroups...
    catch(err){
        return false;
    }
    
}

//returns true if user_id matches the given id. 
export function isOwnerOfID(id){
    const user_id = localStorage.getItem('userID');
    return (user_id==id);
}

export function getUserID(){
    return localStorage.getItem('userID');
}

export async function getUsername(){
    const id = localStorage.getItem('userID');
    console.log("ID:", id);
    const results = await fetch(`http://localhost:5000/profile/${id}`);
   
    if (results.ok){
        const data = await results.json();
        console.log("data");
        return data.username;
    }

    return null;
}