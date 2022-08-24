import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import {useState , useEffect} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function AddFriend(){
  
 

    const [name,setName] = useState("");
  const [age,setAge] = useState("0");
  const [description,setDescription] = useState("");

  const [listOfFriends,setListOffriends]= useState([]);

  const addFirends = ()=>{

try{

   Axios.post('http://localhost:5000/addfriend',
   {name:name,age:age,description:description}).then(()=>{
    alert("Save Firend");
    ShowAll();
    setName('');
    setAge('');
    setDescription('');
   }).catch(()=>{
    alert("Not Saved");
   });

  }catch(err){
  alert(err);
  }
  };

  useEffect(()=>{
    Axios.get('http://localhost:5000/read')
    .then((response)=>{
      setListOffriends(response.data)
      
    }).catch(()=>{
      console.log(Error);
    });
  },[]);

  const ShowAll = ()=>{
    Axios.get('http://localhost:5000/read')
    .then((response)=>{
      setListOffriends(response.data)
    }).catch(()=>{
      console.log(Error);
    });
  };

  const updateFriend = (id)=>{
    const newAge = prompt("Enter New Age: ");
    
    Axios.put('http://localhost:5000/update', {newAge: newAge,id:id}).then(()=>{

      
     ShowAll();

    });
    
  };

  const deleteFriend = (id) =>{

   

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                Axios.delete(`http://localhost:5000/delete/${id}`).then(()=>{
                
                ShowAll();
                onClose();
                });
                
              }}
            >
              Yes, Delete it
            </button>
          </div>
        );
      }
    });

  };
  


  return (
    <div className="container-sm">
      <div>
      <Form>
      <Form.Group className="mb-3" controlId="namelbl">
        <Form.Label>Firend Name</Form.Label>

        <Form.Control type="text" value={ name } placeholder="Enter Name"
         onChange={(event)=>{
          setName(event.target.value);
         }} />

      </Form.Group>
      <Form.Group className="mb-3" controlId="agelbl">
        <Form.Label>Firend Age</Form.Label>

        <Form.Control type="number" value={ age } placeholder="Enter Age" 
        onChange={(event)=>{
          setAge(event.target.value);
        }}/>

      </Form.Group>
      <Form.Group className="mb-3" controlId="descriptinlbl">
        <Form.Label>Firend Description</Form.Label>

        <Form.Control type="text" value={ description } placeholder="Enter Description" 
        onChange={(event)=>{
          setDescription(event.target.value);
        }}/>
      
      </Form.Group>
      <Button as="a" variant="primary" type="submit" 
      onClick={addFirends}>Save Firend</Button>{'      '}
       <Button variant="secondary" onClick={ShowAll}>Show All</Button>
    </Form>


    </div>
   
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          
          <th>Name</th>
          <th>age</th>
          <th>Description</th>
          
        </tr>
      </thead>
      <tbody>
      
      {listOfFriends.map((val)=>{
      return (
        <tr>
        <td>{val.name}</td>
        <td>{val.age}</td>
        <td>{val.description}</td>
        <td><Button variant="secondary" onClick={()=>{updateFriend(val._id);
        }}>Update</Button>

        {' '} 

        <Button variant="danger" id='removeBtn' 
        onClick={()=>{
          deleteFriend(val._id);
        }}>X</Button> </td>
        </tr> 
      );
    })}
       
        
      </tbody>
    </Table>

   </div>

);
  
}