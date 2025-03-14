import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./followersPage.css";
import Header from './Header';

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
    <div className="followers-page-container">
    <Header setAuth={setAuth}/>

            
            <div className="followers-buttons-container">
                <button id="followers" onClick={()=>{setShowFollowing(false)}}>Followers</button>
                <button id="followers" onClick={()=>(setShowFollowing(true))}>Following</button>
            </div>

            {showFollowing ? 
            (
            <> <div className="followers-title"><h1>Following</h1></div>

            
                {following?.map((follower)=>(
            
                    <div className="followers-list-container">
                        <li>{follower?.username}</li>
                    </div>

                ))
                }
            
            
            </> 
            )
        
            :
            (<><div className="followers-title"><h1>Followers</h1></div>
            {followers?.map((follower)=>(
                <div className="followers-list-container">
                    <li>{follower?.username}</li>
                </div>
                
            ))}</>)
            }
            


            

    </div>

    );
}

export default FollowersPage;