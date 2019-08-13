import React,{Component} from 'react';
import axios from 'axios';



class App extends Component {

  state ={
    data :[],
    id :0,
    message:null,
    intervalIsSet:false,
    IdToDelete:null,
    IdToUpdate:null,
    objectToUpdate : null
  };

  componentDidMount(){
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb,1000);
      this.setState({intervalIsSet:interval});
    }
  }

  componentWillUnmount(){
    if(this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({intervalIsSet:null});
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({data:res.data}));
  }

  putDataToDb = (message) => {
    let currentIds = this.state.data.map( (data) => data.id);
    let idToBeAdded  = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message : message
    });
  }

  deleteFromDb = (IdToDelete) => {
    parseInt(IdToDelete);
    let objectToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === IdToDelete) {
        objectToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData' , {
        data : {
          id: objectToDelete
        }
      }
    );
  }

  updateDb = (idToUpdate, updateToapply) => {
    let objectIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if(dat.id === idToUpdate) {
        objectIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objectIdToUpdate,
      update : {
        message : updateToapply
      }
    });
  };

  render(){

    const {data} = this.state;

    return (
      <div>
        <ul>
          {data.length <=0 
            ? 'NO DB ENTRIES YET' 
            : data.map((dat) => (
                <li style={{padding:'10px'}} key ={data.message}>
                  <span style={{color:'gray'}}>id:</span> {dat.id} <br />
                  <span style={{color:'gray'}}>data:</span> {dat.message}
                </li>
            ))}
        </ul>
        <div style={{padding:'10px'}}>
          <input 
            type="text"
            onChange={(e) => this.setState({message:e.target.value})}
            placeholder="ADD SOMETHING"
            style={{width:'200px'}} />
          <button onClick={() => this.putDataToDb(this.state.message)} >
            ADD
          </button>
        </div>
        <div style={{padding:'10px'}} >
          <input 
            type ="text"
            style={{width:'200px'}}
            onChange={(e) => this.setState({updateToapply:e.target.value})}
            placeholder="PUT SOMETHING TO UPDATE" />
            <button 
              onClick={() => 
              this.updateDb(this.state.IdToUpdate,this.state.updateToapply)
            }>
              UPDATE
            </button>
        </div>
        <div style={{padding:'10px'}}>
          <input 
            type="text"
            style={{width:'200px'}}
            onChange={(e) => this.setState({IdToDelete:e.target.value})}
            placeholder="PUT ID ITEM TO DELETE" />
            <button onClick={() => this.deleteFromDb(this.state.IdToDelete)}>
              DELETE
            </button>
        </div>
      </div>
    );
  }
}

export default App;
