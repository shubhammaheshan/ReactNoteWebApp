import NoteList from "../NoteList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { services } from "../Api/apiManager";
import Skeleton from "./Skeleton";
import { useQuery } from "react-query";

const Body = () => {
  const [filterObj, setFilterObj] = useState({
    page: 1,
    pageLimit: 3,
    sort: "",
    order: "",
    completed: "",
    search_title: "",
  });

  const generateurl = () => {
    let url = `/todo?_page=${filterObj.page}&_limit=${filterObj.pageLimit}&_sort=${filterObj.sort}&_order=${filterObj.order}&title_like=${filterObj.search_title}`;
    if (filterObj.completed) {
      url = url + `&status=${filterObj.completed}`;
    }
    return url;
  };

  const getNotesData = async () => {
    return await services.getAll({
      url: generateurl(),
    });
  };

  const {
    data: addItem,
    isLoading,
    error,
    isPreviousData,
    refetch,
  } = useQuery(["getData", filterObj], getNotesData, {
    staleTime: 10000,
    keepPreviousData: true,
  });
  const hasNext = addItem?.length == filterObj.pageLimit;

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
          value={filterObj.search_title}
          onChange={(e) => {
            setFilterObj((obj) => ({
              ...obj,
              search_title: e.target.value,
            }));
          }}
        />
        Filter By :
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setFilterObj((obj) => ({
                ...obj,
                completed: value == 1 ? "true" : "false",
              }));
            } else {
              setFilterObj((obj) => ({
                ...obj,
                completed: "",
              }));
            }
          }}
        >
          <option value="">All</option>
          <option value="1">Completed</option>
          <option value="0">Not Completed</option>
        </select>
        Sort By :
        <select
          onChange={(e) => {
            if (e.target.value) {
              setFilterObj((obj) => ({
                ...obj,
                sort: "title",
                order: e.target.value,
              }));
            } else {
              setFilterObj((obj) => ({
                ...obj,
                sort: "",
                order: "",
              }));
            }
          }}
        >
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
        <span>Current Page: {filterObj.page}</span>
        <button
          onClick={() => {
            setFilterObj((obj) => ({
              ...obj,
              page: Math.max(obj.page - 1, 0),
            }));
          }}
          disabled={filterObj.page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (!isPreviousData && hasNext) {
              setFilterObj((obj) => ({ ...obj, page: obj.page + 1 }));
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={!hasNext}
        >
          Next Page
        </button>
        <div>{JSON.stringify(filterObj)}</div>
      </div>
    </>
  );
};

export default Body;
