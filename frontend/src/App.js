import React from 'react';
import './App.css';
import AddUser from "./users/AddUser";
import SearchUser from "./users/SearchUser";

export default function App() {

  return (
      <div className="grid grid-cols-2 divide-x"> 
          <div align='center'><SearchUser></SearchUser></div>
          <br></br>
          <div align='center'><AddUser></AddUser></div>
      </div>
  )
}