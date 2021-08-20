import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CropOverlay from './CropOverlay';
import {useStateIfMounted} from 'use-state-if-mounted';
const Cropper = (props) => {


    const [crop,setCrop] = useStateIfMounted()
    const [completedCrop, setCompletedCrop] = useStateIfMounted();

 
    const renderOverlay = ()=>{
      return  <CropOverlay data={{crop:crop,image:props.image,an:props.an,sesiune:props.sesiune,profil:props.profil}}></CropOverlay>
    }

    return (
        // <div style={{width: "50%", height: "1600px"}}>
        <ReactCrop src={props.image} 
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={c => {console.log(c);setCompletedCrop(c)}}
        renderSelectionAddon={renderOverlay}
        />
        // </div>
    )
}

export default Cropper
