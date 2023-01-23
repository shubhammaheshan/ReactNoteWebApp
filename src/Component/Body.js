import NoteList from '../NoteList';
import useFetch from '../useFetch';
import { Link } from "react-router-dom";


const Body = ()=>{
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

  
    return (
    <>
    <div className='addNote_Container'>
    <Link to="/add_note">
     <button type="button">
     Add Note
     </button>
    </Link>
    </div>
    <div className='list_container'>
            {isPending && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {addItem && addItem.map((val,index)=>{
                return (<NoteList
                    id={val.id}
                    key = {val.id}
                    title={val.title}
                    content={val.content}
                    deleteItem={onDelete}
            />
            );
        })}
    </div>

 
  
    </>
    )
}

export default Body;