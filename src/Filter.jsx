import React, {Component, PropTypes, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper'
import { Printout } from "./Printout";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    border: 'solid 0.25px #2d2c2c21'
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  listDiv:{
      display:'inline-flex'
  },
  filtreButton:{
      padding: theme.spacing(4)
  }

}));




function not (a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const groupBy = (items, key) =>Object.values(
    items.reduce((result, item) => ({
      ...result,[item[key]]: [...(result[item[key]] || []),item,],
    }), 
    {},
  ));



export default function Filter(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [inactive, setInactive] = React.useState([]);
  const [active, setActive] = React.useState([]);

   console.log("Filter PROPS",props);
 

  const inactiveChecked = intersection(checked, inactive);
  const activeChecked = intersection(checked, active);

  const componentRef = useRef();

  React.useEffect(() => {
    setInactive(props.filterData);
    
  }, [props.data]);

  const filterData = () =>{
     
     
      let groupedFilters = groupBy(active,'type');
      let data2 = [...props.data];
      console.log('GF',groupedFilters);

      data2 = data2.filter(el =>{
        let resfinal = true;
        console.log('filtre active',active);
        groupedFilters.forEach(filterGroup =>{
            let res = false
            filterGroup.forEach(filter =>{
            
            console.log(`entry ${el} => filter ${filter}`);
            res = res || (el[filter.type] === filter.value);
        
        })
        resfinal = resfinal && res
        })
        return resfinal;
      })
      
      return data2;

      
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedactive = () => {
    setActive(active.concat(inactiveChecked));
    setInactive(not(inactive, inactiveChecked));
    setChecked(not(checked, inactiveChecked));
  };

  const handleCheckedinactive = () => {
    setInactive(inactive.concat(activeChecked));
    setActive(not(active, activeChecked));
    setChecked(not(checked, activeChecked));
  };

  const customActiveList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selectate`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value.type+value.value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  const customInactiveList = (title, items) => (
    <Card>  
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selectate`}
      />
        
      <Divider />
      
      <Grid container direction="row" justify="flex-start" alignItems="center">
      { groupBy(items,'type').map((group)=>{
      return(
        <Card>
        <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(group)}
            checked={numberOfChecked(group) === group.length && group.length !== 0}
            indeterminate={numberOfChecked(group) !== group.length && numberOfChecked(group) !== 0}
            disabled={group.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={`Filtru ${group[0].type}`}
        subheader={`${numberOfChecked(group)}/${group.length} selectate`}
      />
        
      <Divider />
         
        <List className={classes.list} dense component="div" role="list">
            {group.map((el) => {
                // console.log('el',el);
            const labelId = `transfer-list-all-item-${el.type+el.value}-label`;
            

            return (<>
                
                <ListItem key={el.type+el.value} role="listitem" button onClick={handleToggle(el)}>
                <ListItemIcon>
                    <Checkbox
                    checked={checked.indexOf(el) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${el.value}`} />
                </ListItem>
            </>);
            })}
            <ListItem />
        </List>
        </Card>
     )})}
       </Grid>
       
    </Card>
  );

        // console.log(active)

  return (
  <Grid container direction="column" justify="flex-start" alignItems="center">
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customInactiveList('Filtre Inactive', inactive)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedactive}
            disabled={inactiveChecked.length === 0}
            aria-label="move selected active"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedinactive}
            disabled={activeChecked.length === 0}
            aria-label="move selected inactive"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customActiveList('Filtre Active', active)}</Grid>
    </Grid>
    {/* <Button variant="contained" size="large" color="primary" className={classes.margin}>Filtreaza</Button> */}
    <br/>
    

    <div>
     
      <ReactToPrint
          trigger={() => <Button variant="contained" color="primary">Print</Button>}
          content={() => componentRef.current}
      />
       <Paper elevation={5} style={{padding:'100px'}}>
      <Printout data={filterData()}  ref={componentRef} deleteEntry={props.deleteEntry} updateEntry={props.updateEntry}/>
      </Paper>
        
    </div>
  </Grid>
    
  );
}