import { useEffect, useState } from "react";
import GetSortOrder from "../Utils/GetSortOrder";
import AddItemCard from "./AddItemCard";
import "bootstrap/dist/css/bootstrap.min.css";
const OrderManagement = () => {
  const [listItems, setListItems] = useState([]);
const [isHidden, setIsHidden] = useState (true);
  const [listToDisplay, setListToDisplay] = useState([]);
console.log(listToDisplay)
  useEffect(() => {
    let sortedList = listItems.sort(GetSortOrder("id")).reverse();
    console.log("sotedList", sortedList);
    setListToDisplay(sortedList);
  }, [listItems]);

  //Search Fuctionality
  const searchFunctionality = (value) => {
    console.log("filteredList", value);
    if (!value) {
      setListToDisplay(listItems);
    } else {
      let filteredList = listItems.filter(
        (items) =>
          items.name.toLowerCase().includes(value.toLowerCase()) ||
          items.value.toLowerCase().includes(value.toLowerCase())
      );
      setListToDisplay(filteredList);
    }
  };

  const sortingFunction = (type) => {
    console.log(type);
    let sortedArr = listItems.sort(GetSortOrder(`${type}`));
    console.log("sodf", sortedArr);
    // setListToDisplay(sortedArr);
    setListItems(sortedArr);
  };

  console.log("listToDIspaly", listToDisplay);
  //Adding Item to the list function

  //Item delete function
  const handleDelete = (e) => {
    console.log("e", e);
    let newArr = listItems.filter((event) => event.id !== e);
    console.log("atte", newArr);
    setListItems(newArr);
  };
  console.log("name", listItems);
  return (
    <>
    <div className="container">
      {/* Search box */}
      <div className="d-flex justify-content-center">
        <div>
          <input
            type="text"
            onChange={(e) => searchFunctionality(e.target.value)}
            className="form-control-sm float-right"
            placeholder="Search here"
          />
        </div>
        <div>
          <button type="button" class="btn btn-outline-primary">
            Export to Excel
          </button>
          <button type="button" class="btn dark-button" onClick={() => {setIsHidden(false)}}>
            + New Order
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="row">
        <table className="table  table-bordered text-center border border-dark ">
          <thead>
            <tr className="bg-dark text-white">
              <th onClick={() => sortingFunction("name")}>Order ID</th>
              <th onClick={() => sortingFunction("value")}>Date</th>
              <th onClick={() => sortingFunction("id")}>Customer Name </th>
              <th onClick={() => sortingFunction("id")}>Items </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listToDisplay.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>#{item.id}</td>
                  <td>{item.orderDate}</td>
                  <td>{item.name}</td>
                  <td>{item.items.length}</td>

                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
     { isHidden == false ?  <AddItemCard listItems={listItems} setListItems={setListItems} setIsHidden={setIsHidden}/> : null }
      </>
  );
};
export default OrderManagement;
