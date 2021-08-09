import {useState, useEffect} from 'react';
import Header from './Header';
import Timestamp from './Timestamp';
import Button from './Button';
import {saveData} from './indexdb';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const initialState = {
  'btn1': {'start': null,'end': null,'startSave': null,'endSave': null},
  'btn2': {'start': null,'end': null,'startSave': null,'endSave': null},
  'btn3': {'start': null,'end': null,'startSave': null,'endSave': null},
  'btn4': {'start': null,'end': null,'startSave': null,'endSave': null},
};


/**App Component is described here.*/
const App = ()=>{
  const [time, setTime] = useState(initialState);

  const apiCall = async (url, id) =>{
    /**Handle Api call and Save the Api data into IndexedDB ... */
    try{
        let start_time = new Date().toLocaleTimeString();
        const response = await fetch(url);
        const data = await response.json();
        let end_time = new Date().toLocaleTimeString();
        time[id] = {...time[id],'start':start_time,'end':end_time};
        setTime({...time});
        try{
          start_time = new Date().toLocaleTimeString();
          saveData(id, data);
          end_time = new Date().toLocaleTimeString();
          time[id] = {...time[id],'startSave':start_time,'endSave':end_time};
          setTime({...time});
        }catch(error){
          console.log("Error while Saving Data for "+id);
        }
    }catch(error){
        console.log("error while Fetching Data for"+id);
    }
  }

  const btnClick = (type)=>{
    /** This code will run when any button click event happen ... */
    switch(type){
      case 'Button 1':
        apiCall('https://jsonplaceholder.typicode.com/comments', 'btn1');
        break;
      case 'Button 2':
        apiCall('https://jsonplaceholder.typicode.com/photos', 'btn2');
        break;
      case 'Button 3':
        apiCall('https://jsonplaceholder.typicode.com/todos', 'btn3');
        break;
      case 'Button 4':
        apiCall('https://jsonplaceholder.typicode.com/posts', 'btn4');
        break;
      default:
        console.log('unix');
    }
  }

  useEffect(()=>{
    /**To call the all the four API's once the screen load after 5 seconds...*/
    setTimeout(function(){
      apiCall('https://jsonplaceholder.typicode.com/comments', 'btn1');
      apiCall('https://jsonplaceholder.typicode.com/photos', 'btn2');
      apiCall('https://jsonplaceholder.typicode.com/todos', 'btn3');
      apiCall('https://jsonplaceholder.typicode.com/posts', 'btn4');
    }, 5000);
  },[]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
            <Timestamp time={time.btn1}/>
            <Timestamp time={time.btn2}/>
        </div>
        <div className="row">
            <Timestamp time={time.btn3}/>
            <Timestamp time={time.btn4}/>
        </div>
      </div>
      <div className="container">
        <div className="row">
            <Button value={{name:'Button 1',btnClick}}/>
            <Button value={{name:'Button 2',btnClick}}/>
        </div>
        <div className="row">
            <Button value={{name:'Button 3',btnClick}}/>
            <Button value={{name:'Button 4',btnClick}}/>
        </div>
        <div className="row">
            <Button value={{name:'Current UNIX Timestamp',btnClick}}/>
        </div>
      </div>
    </>
  );
}

export default App;
