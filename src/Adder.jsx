import React, { useState, useCallback } from "react";
import {useStateIfMounted} from 'use-state-if-mounted';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import BrowsePdf from './BrowsePdf';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
const {ipcRenderer,remote} = window;

const profile = [
    {value:'M1',label:'M1'},
    {value:'M2',label:'M2'},
    {value:'St. naturii',label:'St. Naturii'},
    {value:'Tehnic',label:'Tehnic'},
    {value:'Pedagogic',label:'Pedagogic'}
];
const sesiuni = [
    {value: 'Mai - ses. speciala', label:"Mai ses. speciala"},
    {value: 'Iunie', label:"Iunie"},
    {value: 'Rezerva iunie', label:"Rezerva iunie"},
    {value: 'August', label:"August"},
    {value: 'Rezerva august', label:"Rezerva august"},
    {value: 'Simulare Cls. XI', label:"Simulare Cls. XI"},
    {value: 'Simulare Cls. XII', label:"Simulare Cls. XII"},
    {value: 'Model Edu', label:"Model Edu"},
    {value: 'Test de antrenament', label:"Test de antrenament"}

];

const ani = ["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];





const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
       
        margin: theme.spacing(1),
        width: '25ch'
      },
    },
  }));

const Adder = (props)=> {
    const classes = useStyles();
    // const [year,setYear] = useStateIfMounted("2020");
    // const [sesiune,setSesiune] = useStateIfMounted('Mai - ses. speciala');
    // const [profil,setProfil] = useStateIfMounted('M1');
    const [png64, setPng64] = useStateIfMounted('');


    const [year,setYear] = useState(''+new Date().getFullYear());
    const onYearChange = useCallback(
      (e, newYear) => {
        setSesiune(newYear ? newYear.trim() :'');
      },
      [setYear]
    );

    const [sesiune,setSesiune] = useState('Mai - ses. speciala');
    const onSesiuneChange = useCallback(
      (e, newSesiune) => {
        setSesiune(newSesiune ? newSesiune.trim() :'');
      },
      [setSesiune]
    );

    const [profil,setProfil] = useState('M1');
    const onProfilChange = useCallback(
      (e, newProfil) => { 
        setProfil(newProfil ? newProfil.trim() :'');
      },
      [setProfil]
    );

    console.log(`An ${year} | Sesiune ${sesiune} | profil ${profil}`);


    const browsePdf = (e) =>{
        remote.dialog.showOpenDialog({properties: ['openFile'],filters:[{name:'PDF',extensions:['pdf']}]}).then(result => {
          if(!result.canceled){
            console.log(result.filePaths[0])
            ipcRenderer.send('BrowsePDF',{path:result.filePaths[0]});
          }
      }).catch(err => {
          console.log(err);
          remote.dialog.showOpenDialog({title:"EROARE",message: err});
  
      });

    
      ipcRenderer.on('RecievePNG',(e,data)=>{
      
        setPng64(data);
        console.log('PNG',png64)
  
      })
    }

    
 

    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <Grid container direction="row" justify="space-evenly" alignItems="center">
            
            <Button variant="contained" color="primary" component="label" onClick={browsePdf}>
                Deschide PDF
            </Button>
        
            <form className={classes.root} noValidate autoComplete="on" style={{display:'flex'}}>
            <TextField id="outlined-basic" label="AN" variant="filled" type="number" value={year} onChange={(e)=>{setYear(e.target.value)}} />
            
            <Autocomplete id="sesiune-bac"
            options={sesiuni.map(s=>s.label)} freeSolo value={sesiune} onChange={onSesiuneChange}
            renderInput={params => (<TextField {...params} label="SESIUNE" variant="filled"/>
            )}/>

            <Autocomplete id="sesiune-bac"
            options={profile.map(s=>s.label)} freeSolo value={profil} onChange={onProfilChange}
            renderInput={params => (<TextField {...params} label="PROFIL" variant="filled"/>
            )}/>



            </form>
            

            </Grid>
            
              {png64 && <Paper elevation={3}><BrowsePdf image={png64} an={year} sesiune = {sesiune} profil = {profil}></BrowsePdf></Paper>}
           
        </Grid>
    )
}
export default Adder