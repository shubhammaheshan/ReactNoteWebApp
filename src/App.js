import Header from './Header';
import Footer from './Footer';
import CreateNote from './CreateNote';
import NoteList from './NoteList';

import './App.css';
import useFetch from './useFetch';


function App() {
  const {addItem, isPending, error, setAddItem} = useFetch('http://localhost:8000/todo');

  const addNote = (note) => {
    setAddItem((prevData)=>{
      return[...prevData,note];
    })
  };

  const onDelete =(id)=>{

    fetch('http://localhost:8000/todo/'+ id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((data) => {
      setAddItem((olddata)=>
      olddata.filter((currdata,indx) => {
        return currdata.id !== id;
      })
    );
    }).catch((err) => {
      console.log(err);
    })
  };

  const callFetchData = ()=>{
    
  }


  return (
    <>
      <Header />
      <CreateNote passNote={addNote}/>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {addItem && addItem.map((val,index)=>{
        return (<NoteList
            key = {val.id}
            id = {val.id}
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
