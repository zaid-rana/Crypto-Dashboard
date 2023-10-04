import React,{useState,useContext, useEffect} from "react";
import "./Profile.css";
import { connectContext } from "../../Contexts";

import { ethers } from "ethers";

import profileimg from "../Asset/profile.png";


const Profile = () => {
    const {account,provider,tokenData, ethBalance } = useContext(connectContext);
    const [date, setDate] = useState("");


    function formatDateToCustomString() {
        const date = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        return (date.toLocaleDateString(undefined, options));
      }  

    async function getProfile(){
      try{
          setDate(formatDateToCustomString());
          
            
    }catch(err){
         console.log(err);
      }
    }

      function check(){
          console.log( Number(tokenData[1].balance));
          
      }

      const filtered = tokenData.filter((val) => val.balance > 0);

    
     useEffect(() => {
      account && getProfile();
     },[account])
     
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Trader Profile</h1>
      
      </div>
      <div className="profile-content">
        <div className="avatar">
          <img src={profileimg} alt="Profile Avatar" />
        </div>
        <div className="user-info">
          <h2>{account ? String(account) : <>NOT CONNECTED</>}</h2>
          <p>Joined {date}</p>
        </div>
      </div>
      

    
    
    <div className="assets">
        <h2>Assets</h2>
        {
          account ? <> {filtered.map((val,ind) => (
               <div className="asset-item">
                <p>{val.name}</p>
                <p>{Number(ethers.utils.formatEther(val.balance)).toFixed(2)}</p>
                </div>
            ))}</>
            :
             <p>NO TOKENS</p>
        }
      
      </div>

      <div className="account-info">
        <h2>Account</h2>
        <p>ETHER</p>
        <p>{Number(ethBalance)}</p>
      </div>
     
      <div className="trade-now-button">
        <button onClick={() => check()}>Trade Now</button>
      </div>
    </div>
  );
};

export default Profile;


