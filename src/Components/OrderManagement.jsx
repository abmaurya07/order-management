import { useEffect, useState } from "react";
import GetSortOrder from "../Utils/GetSortOrder";
import AddItemCard from "./AddItemCard";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactHtmlToExcel from "react-html-to-excel";
import OrderTable from "./OrderTable";
import NoData from "../assets/images/NoData.jpg";
const OrderManagement = () => {
  const [listItems, setListItems] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [listToDisplay, setListToDisplay] = useState([]);

  //UseEffect - ListtoDisplay is the array which is shown in the table.
  useEffect(() => {
    let sortedList = listItems.sort(GetSortOrder("sort"));
    setListToDisplay(sortedList);
  }, [listItems]);

  //----------------Search Fuctionality works on order Date, Customer Name & item Name ------------------------//
  
  const searchFunctionality = (value) => {
    // console.log("filteredList", value);
    if (!value) {
      setListToDisplay(listItems);
    } else {
      let filteredList = listItems.filter(
        (items) =>
          items.name.toLowerCase().includes(value.toLowerCase()) ||
          items.orderDate.toLowerCase().includes(value.toLowerCase()) ||
          items.items.some((e) =>
            e.itemName.toLowerCase().includes(value.toLowerCase())
          )
      );
      setListToDisplay(filteredList);
    }
  };

  return (
    <>
      <div className="container">
        {/* Header of the Card contains Search box, Export button & Add order button */}
       
        <h1 className="dark-mode"> Orders</h1>
        <div className=" d-flex justify-content-between mb-2">
        {listToDisplay.length !== 0 ?(<>
          <div className="col-sm-6">
            <input
              type="text"
              onChange={(e) => searchFunctionality(e.target.value)}
              className="form-control"
              placeholder="Search here ..."
            />
          </div>
          </> ) : <div></div>}

          <div>
        {listToDisplay.length !== 0  &&

            <ReactHtmlToExcel
              id="excelComp"
              className=" btn btn-outline-success"
              table="orderTable"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export to Excel"
            />
        }
            <button
              type="button"
              className="btn dark-button marleft"
              onClick={() => {
                setIsHidden(false);
              }}
            >
              + New Order
            </button>
          </div>
        </div>

        {/* Table starts from here it contains nested table*/}
        {listToDisplay.length !== 0 ? (
          <OrderTable
            setListItems={setListItems}
            listItems={listItems}
            listToDisplay={listToDisplay}
          />
        ) : (
          <img
            src={NoData}
            alt="No Data"
            height="600"
            width="80%"
            // className="img-fluid"
          />
        )}
      </div>

      {/* Add Order Component it is hidden by default */}
      {isHidden === false ? (
        <AddItemCard
          listItems={listItems}
          setListItems={setListItems}
          setIsHidden={setIsHidden}
        />
      ) : null}
    </>
  );
};
export default OrderManagement;
