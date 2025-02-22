export async function get_groups(){
 
    const response = await fetch('http://localhost:5000/groups',
        {
            method:"GET"
        }
    );
    console.log(response);
    const groups = await response.json();
    return groups;
}