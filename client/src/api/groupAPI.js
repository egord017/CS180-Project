export const getGroups = async () => {
    try {
      const response = await fetch("http://localhost:5000/groups", {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }
      const groups = await response.json();
      return groups || []; 
    } catch (error) {
      console.error("Error fetching groups:", error);
      return [];
    }
};

export const newGroup = async (group_name, group_description, user_id) => {
  try {
    const body = {group_name, group_description, user_id}

    const response = await fetch("http://localhost:5000/groups/create", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });

    const parseResponse = await response.json();
    //console.log(parseResponse)

    return parseResponse;

  } catch (error) {
    console.error("Error creating group:", error);
  }
};

export const joinGroup = async (group_id, user_id) => {
  try {
    const body = {group_id, user_id};

    const response = await fetch("http://localhost:5000/groups/join", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });

    const parseResponse = await response.json();
    console.log(parseResponse);

    return parseResponse;

  } catch (error) {
    console.error("Error joining group", error);
  }
};

export const leaveGroup = async (group_id, user_id) => {
  try {
    const body = {group_id, user_id};

    const response = await fetch("http://localhost:5000/groups/leave", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });

    const parseResponse = await response.json();
    console.log(parseResponse);

    return parseResponse;

  } catch (error) {
    console.error("Error leaving grouop", error);
  }
};
