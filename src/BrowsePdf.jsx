import React, { useState } from 'react';
import {useStateIfMounted} from 'use-state-if-mounted';
import {Button} from '@material-ui/core';
import Cropper from './Cropper';
const {ipcRenderer,remote} = window;

const BrowsePdf = (props) => {
    
  const [fooKey, setFooKey] = useStateIfMounted(1);
 
  ipcRenderer.on('newData',(e,message)=>{
    setFooKey(fooKey+1);
  });
  return (
    
    <div>
    <Cropper key={fooKey} image={props.image} an={props.an} sesiune={props.sesiune} profil={props.profil}></Cropper></div>
    
  )

}

export default BrowsePdf
