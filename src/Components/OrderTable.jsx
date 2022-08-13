import React, { useState } from "react";
import GetSortOrder from "../Utils/GetSortOrder";



const OrderTable = ({setListItems, listItems, listToDisplay}) => {
    const [hidden, setHidden] = useState({});
    const [clicked, setClicked] = useState({});

     // Sorting Funciton - it take type parameter in order to know which key to use for sorting.
 const sortingFunction = (type) => {
    let sortedArr = listItems.sort(GetSortOrder(`${type}`));
    let newArr = [];
    for (let index = 0; index < sortedArr.length; index++) {
      const data = {
        id: sortedArr[index].id,
        name: sortedArr[index].name,
        orderDate: sortedArr[index].orderDate,
        items: sortedArr[index].items,
        createdAt: sortedArr[index].createdAt,
        sort: index,
      };
      newArr.push(data);
      setListItems(newArr);
    }
  };
  const toggleHide = (index) => {
    setHidden({ ...hidden, [index]: !hidden[index] });
  };
  const toggleClick = (index) => {
    setClicked({  [index]: !clicked[index] });
  };
  // console.log("listToDIspaly", listToDisplay);

  //Item delete function
  const handleDelete = (e) => {
    // console.log("e", e);
    let newArr = listItems.filter((event) => event.id !== e);
    setListItems(newArr);
  };
    
    return (
        <div className="row">
          <table className="table table-success table-striped text-center " id="orderTable">
            <thead>
              <tr>
                <th className="cursor-pointer"  onClick={() => {sortingFunction("id") ; toggleClick(1)}}>Order ID {clicked[1] ? <>&#9650;</> : <>&#9660;</>}</th>
                <th className="cursor-pointer" onClick={() => {clicked[2]?sortingFunction("id") : sortingFunction("orderDate"); toggleClick(2)}}>Date {clicked[2] ? <>&#9650;</> : <>&#9660;</>}</th>
                <th className="cursor-pointer" onClick={() => {clicked[3] ?  sortingFunction("id") : sortingFunction("name"); toggleClick(3)}}>Customer Name {clicked[3] ? <>&#9650;</> : <>&#9660;</>} </th>
                <th >Items </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listToDisplay.map((item, idx) => {
                return (
                  <>
                    <tr key={idx}>
                      <td>#{item.id}</td>
                      <td>{item.orderDate}</td>
                      <td>{item.name}</td>
                      <td>
                        <span className="d-flex justify-content-center">
                          {item.items.length}{" "}
                          <p
                            className="cursor-pointer"
                            onClick={() => toggleHide(idx)}
                          >
                            {" "}
                            {hidden[idx] ? <>&#9650;</> : <>&#9660;</>}
                          </p>
                        </span>{" "}

                        {/* Nested Table starts from here it contains details of purchased items. */}
                        {hidden[idx] ? (
                          <table className=" table table-success table-striped border  ">
                            <thead>
                              <tr className="">
                                <th >
                                  #
                                </th>
                                <th >
                                  Item name
                                </th>
                                <th >
                                  Quantity{" "}
                                </th>
                                <th >
                                  Price{" "}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.items.map((i, index) => {
                                return (
                                  <tr key={index}>
                                    <td> {index + 1}</td>

                                    <td>{i.itemName}</td>
                                    <td>{i.quantity}</td>
                                    <td>₹ {i.price}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : null}
                      </td>

                      <td>
                        {/* Delete Button */}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete()}
                        >
                          {" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
    )
}

export default OrderTable;