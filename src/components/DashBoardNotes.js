import NoteList from "../NoteList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { services } from "../apis/apiManager";
import Skeleton from "./Skeleton";
import { useQuery } from "react-query";
import { generateurl } from "../helpers/url";

const DashBoardNotes = () => {
  const [filterObj, setFilterObj] = useState({
    _page: 1,
    _limit: 3,
    _sort: "",
    _order: "",
    status: "",
    title_like: "",
  });

  const {
    data: addItem,
    isLoading,
    error,
    isPreviousData,
    refetch,
  } = useQuery(
    ["getData", filterObj],
     () => {
      return services.get({
        url: generateurl(filterObj),
      });
    },
    {
      keepPreviousData: true,
    }
  );
  const hasNext = addItem?.length == filterObj._limit;


  const onDelete = (id) => {
    services
      .deleteById({ id: id, url: "/todo/" })
      .then(function (response) {
        if (response.status == process.env.REACT_APP_UPDATED) {
          refetch();
        }
      })
      .catch(function (error) {});
  };

  const onCompletedNote = (item) => {
    services
      .updateNote({
        id: item.id,
        url: "/todo/",
        note: { ...item, status: !item.status },
      })
      .then(function (response) {
        if (response.status == process.env.REACT_APP_UPDATED) {
          refetch();
        }
      })
      .catch(function (error) {});
  };

  const sortNotesData = (e) => {
    if (e.target.value) {
      setFilterObj((obj) => ({
        ...obj,
        _sort: "title",
        _order: e.target.value,
      }));
    } else {
      setFilterObj((obj) => ({
        ...obj,
        _sort: "",
        _order: "",
      }));
    }
  };

  const filterNotesData = (e) => {
    const value = e.target.value;
    if (value) {
      setFilterObj((obj) => ({
        ...obj,
        status: value == 1 ? "true" : "false",
      }));
    } else {
      setFilterObj((obj) => ({
        ...obj,
        status: "",
      }));
    }
  };

  const handleNextPage = () => {
    if (!isPreviousData && hasNext) {
      setFilterObj((obj) => ({ ...obj, _page: obj._page + 1 }));
    }
  };

  const handlePreviousPage = () => {
    setFilterObj((obj) => ({
      ...obj,
      _page: Math.max(obj._page - 1, 0),
    }));
  };

  return (
    <>
      <div className="addNote_Container">
        <Link to="/add_note">
          <button type="button">Add Note</button>
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Notes"
          value={filterObj.title_like}
          onChange={(e) => {
            setFilterObj((obj) => ({
              ...obj,
              title_like: e.target.value,
            }));
          }}
        />
        Filter By :
        <select onChange={filterNotesData}>
          <option value="">All</option>
          <option value="1">Completed</option>
          <option value="0">Not Completed</option>
        </select>
        Sort By :
        <select onChange={sortNotesData}>
          <option value="">All</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
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
                date={val.date}
                deleteItem={onDelete}
                status={val.status}
                onChangeBox={onCompletedNote}
              />
            );
          })}
      </div>
      <div className="pagination">
        <span>Current Page: {filterObj._page}</span>
        <button onClick={handlePreviousPage} disabled={filterObj._page === 1}>
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={!hasNext}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default DashBoardNotes;
