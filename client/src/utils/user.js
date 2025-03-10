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
    //have to fetch usergroups...
    const user_id = localStorage.getItem('userID');
    const results = await fetch(`http://localhost:5000/usersgroups/${group_id}/is-admin?user_id=${user_id}`);
    return results;
}

//returns true if user_id matches the given id. 
export function isOwnerOfID(id){
    const user_id = localStorage.getItem('userID');
    return (user_id==id);
}

export function getUserID(){
    return localStorage.getItem('userID');
}