import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import "../App.css";
import { Link } from "react-router-dom";
import { services } from "../Api/api_manager";

function AddNote(props) {
  const [expand, setExpand] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    status: false
  });
  const InputEvent = (event) => {
    const { name, value } = event.target;

    setNote((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const addEvent = () => {
    services
      .addNote({ url: "/todo", note })
      .then(function (response) {
        if (response.status == process.env.CREATED) {
          setNote({
            title: "",
            content: "",
          });
        }
      })
      .catch(function (error) {});
  };

  const expandIt = () => {
    setExpand(true);
  };
  const bToNormal = () => {
    setExpand(false);
  };

  return (
    <>
      <div className="main_note" onDoubleClick={bToNormal}>
        <form>
          {expand ? (
            <>
              <input
                type="text"
                name="title"
                value={note.title}
                onChange={InputEvent}
                placeholder="Title"
                autoComplete="off"
              />
              <input
                type="date"
                name="date"
                value={note.date}
                onChange={InputEvent}
              />
            </>
          ) : null}

          <textarea
            rows=""
            column=""
            name="content"
            value={note.content}
            onChange={InputEvent}
            placeholder="Write a note..."
            onClick={expandIt}
          ></textarea>

          {expand ? (
            <Link to="/">
              <Button
                onClick={addEvent}
                disabled={!(note.title && note.content && note.date)}
              >
                <AddIcon className="plus_sign" />
              </Button>{" "}
            </Link>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default AddNote;
