import React, { useRef } from "react";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
const {ipcRenderer} = window;

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  delete:{
    margin: theme.spacing(1),
    display : 'content'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const Printout = React.forwardRef((props,ref) => {

    const classes = useStyles();
    console.log("Printout PROPS",props);

    const [open, setOpen] = React.useState(false);

    const [current,setCurrent] = React.useState(null);

    const handleClickOpen = () => {
     
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    
  



    return (
        // print
        // <div style = {{ display: 'block',width: 'auto',backgroundColor: '#fff',border: '1px solid #666666',padding: '20px', pageBreakAfter: 'always'}} ref={ref}>
         <div ref={ref} style={{display: 'block',width: '60vw'}}>
         
        {
          props.data.map((el,idx) =>
            <Grid container direction="row" justify="space-between" alignItems="center" style = {{pageBreakInside: 'avoid'}}>

                     
                    
                    <table class="tg" style = {{pageBreakInside: 'avoid', width:'100%'}}> 
                    <tbody> 
                      <tr>
                        <th class="tg-5z6z" style={{minWidth:'50px'}}><b>Nr. {idx+1}</b></th>
                        <th class="tg-jbyd"><img src={el.image} className={classes.margin} style={{width:'600px', filter:'contrast(1.3) grayscale(1)'}} alt="prob"/></th>
                        <th class="tg-iks7" class="hidden-print">

                        <Tooltip title="Editeaza">
                        <IconButton aria-label="delete" className={classes.margin} onClick={() =>{alert('Edit'+(idx+1)+"\n");props.updateEntry(el)}}>
                          <EditIcon />
                        </IconButton>
                        </Tooltip>

                        <Tooltip title="Sterge">
                        <IconButton aria-label="delete" className={classes.margin}  onClick={e =>
                            window.confirm(`Sunteti sigur ca vreti sa stergeti elementul cu Nr:${idx+1}?`) &&
                            props.deleteEntry(el.id)
                        }>
                        
                          <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                        
                          
                          </th>

                      </tr>
                      <tr>
                        <td class="tg-v53v" colspan="3"><i>{el.sesiune+" "+el.an+" "+el.profil+" "+el.capitol}</i></td>
                      </tr>
                      <tr>
                        <td class="tg-v53v" colspan="3"></td>
                        
                      </tr>
                    
                    </tbody>
                    </table>
                  
                    
          
            </Grid>
          )
        }
        <Dialog open={open} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                                <DialogTitle id="alert-dialog-slide-title">{`Esti sigur ca vrei sa stergi elementul ${current}?`}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} color="primary">
                                    Nu
                                  </Button>
                                  <Button onClick={handleClose} color="primary">
                                    Da
                                  </Button>
                                </DialogActions>
                              </Dialog>
       
     </div>
    )
})
