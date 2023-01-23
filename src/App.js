import React from "react";
import "./index.css"
import Header from './Component/Header';
import Footer from './Component/Footer';


import './App.css';

// router config
import {Outlet} from 'react-router-dom'

const AppLayout = ()=> {


  return (
      <div className="container">
            <Header />

            <Outlet />
            <Footer/>
      </div>
  );
}

export default AppLayout;