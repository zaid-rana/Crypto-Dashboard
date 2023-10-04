import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import style from "./Navbar.module.css";
import icon from "../Asset/icon.png"
import { connectContext } from '../../Contexts';
const Navbar = () => {
     const {connect,account} = useContext(connectContext);
  return (
    <div className={style.container}> 
    <nav className={style.navbar}>
          <div className={style.img}>
               <img src={icon} alt="" width={200} height={50}/>
          </div>
             
              <ul className={style.navItems}>
                   <li><Link className={style.link} to={"/"}>home</Link></li>
                   <li><Link className={style.link} to={"/swap"}>swap</Link></li>
                   <li><Link className={style.link} to={"/activity"}>activity</Link></li>
                  
              </ul>
      
              <div className={style.connect}>
                     <button onClick={() => connect()}>{account ? <>connected</> : <>connect</>}</button>
              </div>
    </nav>
</div>

  )
}

export default Navbar