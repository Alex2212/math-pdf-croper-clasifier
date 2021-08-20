import React , {useState, useEffect} from "react";
import Filter from './Filter';

const {ipcRenderer} = window;



const ProblemList = () => {

   
  const [data,setData] = useState([]);

  useEffect(()=>{

    ipcRenderer.invoke('getAll').then(answer =>{
        setData(answer);
    }).catch((e)=>{console.log(e)});

  },[]);

  
  const deleteEntry = (id) =>{
    console.log('Delete ',id);
    ipcRenderer.invoke('delete',id).then(answer =>{
        console.log("the "+id+" entry has been deleted succesfully");
        ipcRenderer.invoke('getAll').then(answer =>{
          setData(answer);
      }).catch((e)=>{console.log(e)});

    }).catch((e)=>{console.log(e)});
  }

  const updateEntry = (data) =>{
    console.log('update ',data);

    
  }

  const getFilterData = ([...data]) =>{
      let res = []; 
      data.map(el=>el= {an:el.an,sesiune:el.sesiune,profil:el.profil,capitol:el.capitol}).forEach(el=>{
        for(const key in el){
           // console.log(`${key} : ${el[key]}`);
            res.push({type:key+"",value:el[key]});
        }
      });
      return [...new Set(res.map(el => JSON.stringify(el)))].map(e => JSON.parse(e));
    }


console.log('Problem-list-mounted;',data);

  return (
    
    <Filter filterData={getFilterData(data)} data= {data} deleteEntry={deleteEntry} updateEntry={updateEntry}/>
    
  );
};

export default ProblemList;
