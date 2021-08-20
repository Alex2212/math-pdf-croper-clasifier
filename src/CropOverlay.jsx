import React ,{useState} from 'react';
import {useStateIfMounted} from 'use-state-if-mounted';
const {ipcRenderer,remote} = window;

const options = [
    ['Numere complexe','Progresii aritmetice si geometrice','Functii si proprietati','Puteri, exponentiale, logaritmice','Ecuatii cu radicali',
    'Ecuatia de gradul 2 si relatiile Viete','Numere reale','Geometrie analitica','Calcul vectorial','Probleme de numarare, probabilitati, binomul lui Newton','Trigonometrie, ecuatii trigonomerice'],
    ['Algebra Clasa XI','Legi de compozitie','Polinoame'],
    ['Analiza Matematica Clasa XI','Analiza matematica Clasa XII']
]
// de adaugat diacritice


const CropOverlay = (props) => {
    const [subiect,setSubiect] = useStateIfMounted("0");
    const [capitol,setCapitol] = useStateIfMounted('Numere Complexe');
    


    // console.log(props);


    const handleSubmit=(event)=>{
        const an = props.data.an;
        const profil = props.data.profil;
        const sesiune = props.data.sesiune;
        const image = document.getElementsByClassName("ReactCrop__image")[0]
        const crop = props.data.crop;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image,crop.x * scaleX,crop.y * scaleY,crop.width * scaleX, crop.height * scaleY,0,0,crop.width,crop.height,);
        
            
            // console.log('subiect:',subiect,'/n capitol:',capitol);
            // console.log('crop base64',{crop:canvas.toDataURL('image/png')});
            const data = {
                an:an,
                sesiune:sesiune,
                profil:profil,
                subiect:''+(Number(subiect)+1),
                capitol:capitol,
                image:canvas.toDataURL('image/png')
            }

            console.log(data);
            ipcRenderer.send('adauga',data);

            // storage.set(Date.now(), data, function(error) {
            //     if (error) throw error;
            //   });

            //   storage.getAll(function(error, data) {
            //     if (error) throw error;
              
            //     console.log(data);
            //   });

         event.preventDefault();
      }
    
      const handleChangeCapitol = (event) => {
        setCapitol(event.target.value);
       
      };

      const handleChangeSubiect = (event) => {
  
        console.log(event.target.value)
        switch(event.target.value){
            case '0' : {setSubiect('0');setCapitol('Numere complexe');} break;
            case '1' : {setSubiect('1');setCapitol('Algebra Clasa XI');} break;
            case '2' : {setSubiect('2');setCapitol('Analiza Clasa XI');} break;
        }

      };
     
    //   console.log(subiect,capitol)
     

    return (
        
        <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100%',marginTop: '-6%'}}>

            



            <form onSubmit={handleSubmit}>
            <label>
            <select value={subiect} onChange={handleChangeSubiect}>
                <option value="0">Subiect 1</option>
                <option value="1">Subiect 2</option>
                <option value="2">Subiect 3</option>
                
            </select>
            <select value={capitol} onChange={handleChangeCapitol}>
               { options[subiect].map(el => 
                        <option value={""+el}>{el}</option>
                )}
               
                
            </select>
            </label>
            <input style={{borderRadius: '50%',border: '1px solid green',margin:'5px'}} type="submit" value="✔"/>
            </form>
        </div>
       
        
    )
}

export default CropOverlay
