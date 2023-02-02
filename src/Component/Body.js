import NoteList from "../NoteList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { services } from "../Api/api_manager";
import Skeleton from "./Skeleton";

const Body = () => {
  const [addItem, setAddItem] = useState(null);
  const [filterItem, setFilterItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getNotesData();
  }, []);

  const getNotesData = () => {
    services
      .getAll({ url: "/todo" })
      .then(function (response) {
        setAddItem(response?.data);
        setFilterItem(response?.data);
        setIsLoading(false);
        setError(null);
      })
      .catch(function (error) {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const onDelete = (id) => {
    services
      .deleteById({ id: id, url: "/todo/" })
      .then(function (response) {
        if (response.status == process.env.REACT_APP_UPDATED) {
          getNotesData();
        }
      })
      .catch(function (error) {
        setError(error.message);
        setIsLoading(false);
      });
  };
  const onChangeBox = (item) => {
    services
      .updateNote({
        id: item.id,
        url: "/todo/",
        note: { ...item, status: !item.status },
      })
      .then(function (response) {
        if (response.status == process.env.REACT_APP_UPDATED) {
          getNotesData();
        }
      })
      .catch(function (error) {
        setError(error.message);
        setIsLoading(false);
      });
  };
  const handleChange = (e) => {
    if (e.target.value) {
      setFilterItem(
        addItem.filter((data) => {
          return data.status == e.target.value;
        })
      );
    } else {
      getNotesData();
    }
  };
  function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  }
  const functionSortBy = (e) => {
    if (e.target.value) {
      setFilterItem([...addItem].sort(dynamicSort(e.target.value)));
    } else {
      getNotesData();
    }
  };

  function filterData(searchInput, rowData) {
    let searchData = rowData.filter((item) => {
      if (item?.title) {
        return item?.title?.toLowerCase().includes(searchInput.toLowerCase());
      }
    });
    return searchData;
  }

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
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
            let filtered = filterData(e.target.value, addItem);
            setFilterItem(filtered);
          }}
        />
        Filter By :
        <select onChange={handleChange}>
          <option value="">All</option>
          <option value="1">Completed</option>
          <option value="0">Not Completed</option>
        </select>
        Sort By :
        <select onChange={functionSortBy}>
          <option value="">All</option>
          <option value="title">A-Z</option>
          <option value="-title">Z-A</option>
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
        {filterItem &&
          filterItem.map((val, index) => {
            return (
              <NoteList
                id={val.id}
                key={val.id}
                title={val.title}
                content={val.content}
                date={val.date}
                deleteItem={onDelete}
                status={val.status}
                onChangeBox={onChangeBox}
              />
            );
          })}
      </div>
    </>
  );
};

export default Body;
