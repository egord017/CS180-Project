import { useEffect, useState } from "react"
import {get_groups} from "./api.js"

function GroupList({showAll=true}){
    const [all_groups, setAllGroups] = useState([]);
    useEffect(() => {
        // Assuming `get_groups()` is an async function that fetches the groups
        const fetch_groups = async () => {
          try {
            const groups = await get_groups();  // Fetch the groups
            setAllGroups(groups);  // Update the state with the fetched groups
            return groups;
          } catch (error) {
            console.error("Error fetching groups:", error);
          }
        };
    
        groups = fetch_groups();  // Call the fetch function inside useEffect
        console.log(groups)
      }, []);  // Empty dependency array to run the effect only once (on mount)
    

    return (
        <p>hi</p>
    );
}

export default GroupList;