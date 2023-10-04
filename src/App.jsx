import React from 'react'
import Navbar from './component/Navbar/Navbar';
import Profile from './component/profile/Profile';
import Swap from './component/Swap/Swap';
import {
   BrowserRouter as Router,
   Route,
   Routes
} from "react-router-dom";
import Activity from './component/Activity/Activity';

const App = () => {
  return (
    <Router>
       <Navbar/>
       
        <Routes>

       <Route path='/' element= {
            <Profile/>
        }/>

        <Route path='/activity' element={
           <Activity/>
        }/>

         <Route path='/swap' element={
           <Swap/>
        }/>

        </Routes>

    </Router>
  )
}

export default App
