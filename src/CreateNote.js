import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import './App.css';

function CreateNote(props) {

  const [expand, setExpand] = useState(false);
  
  const [note,setNote] = useState({
    title : "",
    content : "",
  });

  const InputEvent = (event) => {

    //const value = event.target.value;
    //const name = event.target.name;

    const {name , value} = event.target;

    setNote((prevData) => {
      return {
        ...prevData,
        [name] : value,
      };
    });
    console.log(note);

  };

  const addEvent = () => {
    props.passNote(note);
    setNote({
      title : "",
      content : "",
    });
    
  };

  const expandIt = () => {
        setExpand(true);
  };
  const bToNormal = () => {
    setExpand(false);
  };
  return (
    <>
      <div className='main_note' onDoubleClick={bToNormal}>
        <form>
          {expand ?
          <input 
            type='text' 
            name = "title" 
            value={note.title} 
            onChange={InputEvent}
            placeholder='Title' 
            autoComplete='off' 
            /> : null}


          <textarea 
            rows="" 
            column="" 
            name = "content" 
            value = {note.content} 
            onChange={InputEvent} 
            placeholder="Write a note..."
            onClick={expandIt}
            ></textarea>

          {expand ? 
          <Button onClick={addEvent}>
            <AddIcon className="plus_sign" />
          </Button> : null}
        </form>
      </div>
    </>
  );
  
};

export default CreateNote;