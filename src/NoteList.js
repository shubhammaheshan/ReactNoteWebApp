import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./App.css";

const NoteList = (props) => {
  const deleteNote = () => {
    props.deleteItem(props.id);
  };
  return (
    <>
      <div className="note" key={props.id}>
        <h1>{props.title}</h1>
        <br />
        <h5>{props.date}</h5>
        <br />
        <p>{props.content}</p>
        <input type="checkbox" onClick={(todos) => {props.onChangeBox(props)}}
          defaultChecked={props.status}/>
        <button className="btn" onClick={deleteNote}>
          <DeleteOutlineIcon className="deleteIcon" />
        </button>
      </div>
    </>
  );
};

export default NoteList;
