import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FollowersPage({setAuth}) {
    const username = Object.values(useParams())[0];
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [showFollowing, setShowFollowing] = useState(false);


    useEffect(()=>{
        async function fetchData(){
            //get user data using name
            const userResponse = await fetch(`http://localhost:5000/profile/profile?username=${username}`);
            const userJson = await userResponse.json();
            // Assume the API returns an array and we need the first element
            setUser(userJson);


            const followers_obj = await fetch(`http://localhost:5000/profile/${userJson?.userid}/followers`);
            const followers_data = await followers_obj.json();
        
            setFollowers(followers_data);
            const following_obj = await fetch(`http://localhost:5000/profile/${userJson?.userid}/following`);
            const following_data = await following_obj.json();
            console.log(following_data);

            setFollowing(following_data);

        }
        fetchData();
    }, []);


    return (
        <div>
            <button onClick={()=>{setShowFollowing(false)}}>Followers</button>

            <button onClick={()=>(setShowFollowing(true))}>Following</button>
            {showFollowing ? 
            (<><h1>Following</h1>
            {following?.map((follower)=>(
                
                <div>
                    <div>{follower?.username}</div>
                </div>
                
            ))}
            </>)
        
            :
            (<><h1>Followers</h1>
            {followers?.map((follower)=>(
                <div>
                    <div>{follower?.username}</div>
                </div>
                
            ))}</>)
            }


        </div>
    );
}

export default FollowersPage;