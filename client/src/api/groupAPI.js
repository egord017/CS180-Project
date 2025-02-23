export const getGroups = async () => {
    try {
      const response = await fetch("http://localhost:5000/groups", {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }
      const groups = await response.json();
      return groups; 
    } catch (error) {
      console.error("Error fetching groups:", error);
      return [];
    }
};