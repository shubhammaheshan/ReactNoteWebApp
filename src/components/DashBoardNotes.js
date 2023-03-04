import NoteList from "../NoteList";
import { Link } from "react-router-dom";
import { useReducer } from "react";
import { services } from "../apis/apiManager";
import Skeleton from "./Skeleton";
import { useQuery } from "react-query";
import { generateurl } from "../helpers/url";

const initialState = {
  _page: 1,
  _limit: 3,
  _sort: "",
  _order: "",
  status: "",
  title_like: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PAGINATION_ASC":
      return {
        ...state,
        _page: state._page + 1,
      };
    case "PAGINATION_DESC":
      return {
        ...state,
        _page: Math.max(state._page - 1, 0),
      };
    case "ORDERBY":
      return action.value
        ? { ...state, _sort: "title", _order: action.value }
        : { ...state, _sort: "", _order: "" };
    case "STATUSBY":
      return action.value
        ? { ...state, status: action.value == 1 ? "true" : "false" }
        : { ...state, status: "" };
    case "TITLEBY":
      return { ...state, title_like: action.value };
    default:
      return state;
  }
};
const DashBoardNotes = () => {
  const [notesFilter, dispatch] = useReducer(reducer, initialState);
  const {
    data: addItem,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["getData", notesFilter],
    () => {
      return services.get({
        url: generateurl(notesFilter),
      });
    },
    {
      keepPreviousData: true,
    }
  );
  const hasNext = addItem?.length == notesFilter._limit;

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
          value={notesFilter.title_like}
          onChange={(e) => {
            dispatch({ type: "TITLEBY", value: e.target.value });
          }}
        />
        Filter By :
        <select
          onChange={(e) => {
            dispatch({ type: "STATUSBY", value: e.target.value });
          }}
        >
          <option value="">All</option>
          <option value="1">Completed</option>
          <option value="0">Not Completed</option>
        </select>
        Sort By :
        <select
          onChange={(e) => {
            dispatch({ type: "ORDERBY", value: e.target.value });
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
        <span>Current Page: {notesFilter._page}</span>
        <button
          onClick={() => {
            dispatch({ type: "PAGINATION_DESC" });
          }}
          disabled={notesFilter._page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            dispatch({ type: "PAGINATION_ASC" });
          }}
          disabled={!hasNext}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default DashBoardNotes;
