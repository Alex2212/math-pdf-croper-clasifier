import React, { useState, useEffect,useRef  } from 'react';
import { Tabs, Tab, AppBar } from "@material-ui/core";
import ProblemList from "./ProblemList";
import Adder from "./Adder";
import {useStateIfMounted} from 'use-state-if-mounted';



const Home = () => {

  const [value, setValue] = useStateIfMounted(0);


 
  // }
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={(e,val)=>{setValue(val)}} indicatorColor="primary" textColor="primary" variant="fullWidth" centered selectionFollowsFocus >
          <Tab label="Lista Probleme" />
          <Tab label="Adaugare Probleme" />
  
        </Tabs>
      </AppBar>
      
      
        {/* {value === 0 && <ProblemList/>}
        {value === 1 && <Adder/>}  */}
       {( ()=>{
           switch(value){
               case 0: return <ProblemList/>;
               case 1: return <Adder/>; 
           }

       })()}
     
          {/* <Adder/> */}
    </div>
  );
};


export default Home;
