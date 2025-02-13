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
            console.log(groups)
          } catch (error) {
            console.error("Error fetching groups:", error);
          }
        };
    
        fetch_groups();  // Call the fetch function inside useEffect
        
      }, []);  // Empty dependency array to run the effect only once (on mount)
    

      return (
        <div>
          {all_groups.map(group => (
            <div key={group.id}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
            </div>
          ))}
        </div>
      );
}

export default GroupList;