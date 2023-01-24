import NoteList from "../NoteList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { services } from "../Api/api_manager";
import Skeleton from "./Skeleton";

const Body = () => {
  const [addItem, setAddItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    services
      .getAll()
      .then(function (response) {
        setAddItem(response?.data);
        setIsLoading(false);
        setError(null);
      })
      .catch(function (error) {
        setError(error.message);
        setIsLoading(false);
      });
  }, [setAddItem]);

  const onDelete = (id) => {
    services
      .deleteById(id)
      .then(function (response) {
        setAddItem((value) =>
          value.filter((currdata, indx) => {
            return currdata.id !== id;
          })
        );
      })
      .catch(function (error) {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="addNote_Container">
        <Link to="/add_note">
          <button type="button">Add Note</button>
        </Link>
      </div>
      <div className="list_container">
        {isLoading && (
          <div className="skeleton">
            {Array(4)
              .fill("")
              .map((e, index) => (
                <Skeleton key={index} />
              ))}
          </div>
        )}
        {error && <div>{error}</div>}
        {addItem &&
          addItem.map((val, index) => {
            return (
              <NoteList
                id={val.id}
                key={val.id}
                title={val.title}
                content={val.content}
                deleteItem={onDelete}
              />
            );
          })}
      </div>
    </>
  );
};

export default Body;
