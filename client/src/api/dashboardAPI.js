export const getUserGroups = async () => {
    try {
        const response = await fetch("http://localhost:5000/dashboard/usergroups", {
            method: "GET",
            headers: {"Content-Type": "application/json", token: localStorage.token}
        });

         const parseResponse = await response.json();
         return parseResponse;
    } catch (error) {
        console.error(error);
    }
}

export const getFollowingThreads = async (LIMIT, offset) => {
    try {
        //console.log("test");
        const response = await fetch("http://localhost:5000/dashboard/followedthreads?limit=${LIMIT}&offset=${offset}", {
            method: "GET",
            headers: {"Content-Type": "application/json", token: localStorage.token}
        });

        const parseResponse = await response.json();
        console.log(parseResponse);
        return parseResponse;
    } catch (error) {
        console.error(error);
    }
}