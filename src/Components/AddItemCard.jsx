import React from "react";
import { useState } from "react";

const AddItemCard = ({ listItems, setListItems, setIsHidden }) => {
  const [name, setName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderItems, setOrderItems] = useState([
    { itemName: "", quantity: "", price: "" },
  ]);
  const [increment, setIncrement] = useState(1);
  const [errorMsg, setErrorMsg] = useState()
  console.log("errorMsg",errorMsg)

  console.log(orderItems);

  const handleChange = (value, itemKey, idx) => {
    const values = [...orderItems];
    if (orderItems.length < idx + 1) {
      let obj = { itemName: "", quantity: "", price: "" };
      values.push(obj);
    }
    values[idx][`${itemKey}`] = value;

    setOrderItems(values);
    setErrorMsg()
  };

  function removeFunc(idx) {
    let values = [...orderItems];
    values.splice(idx, 1);
    setOrderItems(values);
    setIncrement(increment - 1);
  }

  function checkValidation(idx) {
    let status = false;
     if(orderItems.length === idx+1 ) {
         if ( orderItems[idx].itemName === "") 
         {
            setErrorMsg("Item Name")
            return status;
     } else if (orderItems[idx].price === "")
       {
        setErrorMsg("price")
        return status;
       }else if (orderItems[idx].quantity === "") {
        setErrorMsg("quantity")
        return status;
       }
       else {
         setErrorMsg()
        status = true
        return status}
    }
    return status;   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  if(name === ""){
    setErrorMsg("Customer Name")
  }else if(orderDate===""){
    setErrorMsg("order date")
  }else if (checkValidation(orderItems.length -1 ) === false){
    setErrorMsg("Valid Data")
  }
  else {
    let arr = [...listItems];
    let id = listItems.length + 1001;
    arr.push({
      id: id,
      name: name,
      orderDate: orderDate,
      items: orderItems,
      createdAt: Date().toLocaleString(),
      sort: id
    });
    setListItems(arr);
    setName("");
   
    setOrderItems([]);
    setOrderDate("")
    setIsHidden(true)
  }
  };

  return (
    <div className="modalc">
      <div className="modal-contentc card">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-8">
              <label>Customer Name : </label>
              <input
                type="text"
                value={name}
                placeholder="Please enter the name of customer"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <label>Order Date:</label>
              <input
                type="date"
                value={orderDate}
                className="form-control"
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
          </div>
          
          {[...Array(increment)].map((items, idx) => (
            <div className="row mt-3">
              <div className="col-sm-4">
                <label> Name of item</label>
                <input
                  type="text"
                  value={
                    orderItems.length < idx + 1 ? "" : orderItems[idx].itemName
                  }
                  id="itemName"
                  className="form-control"
                  onChange={(e) => {
                    handleChange(e.target.value, e.target.id, idx);
                  }}
                />
              </div>
              <div className="col-sm-3">
                <label>Price </label>
                <input
                  type="number"
                  value={
                    orderItems.length < idx + 1 ? "" : orderItems[idx].price
                  }
                  id="price"
                  className="form-control"
                  onChange={(e) => {
                    handleChange(e.target.value, e.target.id, idx);
                  }}
                />
              </div>
              <div className="col-sm-2">
                <label>Quantity </label>
                <input
                  type="number"
                  value={
                    orderItems.length < idx + 1 ? "" : orderItems[idx].quantity
                  }
                  id="quantity"
                  className="form-control"
                  onChange={(e) => {
                    handleChange(e.target.value, e.target.id, idx);
                  }}
                />
              </div>
              <div className="col-sm-3 d-flex justify-content=between">
                {idx !== 0 ? (
                  <input
                    type="button"
                    className="btn btn-outline-danger mt-4 mr-2"
                    value="-"
                    onClick={() => {
                      removeFunc(idx);
                      setErrorMsg()
                    }}
                  />
                ) : null}
          { increment === idx+1  ?
                <input
                  type="button"
                  className="btn btn-outline-danger mt-4 marleft"
                  value="Add More Item"
                  onClick={() => {
                    checkValidation(idx) === true ?
                    setIncrement(increment + 1) : console.log("Please Enter the valid data")
                  }}
                  
                /> 
                : null }

                
              </div>
              
            </div>
          ))}

<div className=" mt-3">

{errorMsg !== undefined ? <p className="text-danger">Please enter {errorMsg} for the Order.
                </p> : null}
                </div>
          
<div className="d-flex justify-content-between mt-3">
          
            <button type="button" className="btn btn-outline-danger " onClick = {() => {setIsHidden(true)}}>
              Cancel
            </button>
            <button type="submit" className="btn btn-outline-primary ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemCard;
