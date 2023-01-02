import { useState } from 'react';
import logo from './logo.svg';
import Header from './Header';
import Footer from './Footer';
import CreateNote from './CreateNote';
import NoteList from './NoteList';

import './App.css';


function App() {
  const [addItem , setAddItem] = useState([]);

  const addNote = (note) => {
    //alert("I am clicked");
    setAddItem((prevData)=>{
      return[...prevData,note];
    })
  };

  const onDelete =(id)=>{
    setAddItem((olddata)=>
      olddata.filter((currdata,indx) => {
        return indx !== id;
      })
    );
  };

  return (
    <>
      <Header />
      <CreateNote passNote={addNote}/>

      {addItem.map((val,index)=>{
        return (<NoteList
            key = {index}
            id = {index}
            title={val.title}
            content={val.content}
            deleteItem={onDelete}
          />
        );
      })}

      <Footer/>
    </>
  );
}

export default App;
