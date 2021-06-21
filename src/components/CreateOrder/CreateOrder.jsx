import React, { useState, useEffect, Fragment } from "react";
import { Dialog } from "../Dialog/Dialog";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/index";
import "./style.css";

export const CreateOrder = ({ isCreateOrderOpen, onCloseCreateOrder }) => {
  const [fields, setFields] = useState({
    customerName: "",
    customerAddress: "",
    orderDate: "",
    grossOrderAmount: "",
    shippingTax: "",
    totalTax: "",
    shipDate: "",
    totalOrderAmount: "",
  });
  const [items, setItems] = useState({
    itemDescription: "",
    quantity: "",
    rate: "",
  });
  const [totalItems, setTotalItems] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      fields.customerName &&
      fields.customerAddress &&
      fields.orderDate &&
      fields.grossOrderAmount &&
      fields.shipDate &&
      fields.shippingTax &&
      fields.totalOrderAmount
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [
    fields.customerName,
    fields.customerAddress,
    fields.orderDate,
    fields.grossOrderAmount,
    fields.shipDate,
    fields.shippingTax,
    fields.totalOrderAmount,
  ]);

  // onChange for Items
  const _onItemChange = (e) => {
    const { name, value } = e.target;
    if (name === "itemDescription") {
      setItems({ ...items, [name]: value });
    } else {
      setItems({ ...items, [name]: parseFloat(value) });
    }
  };

  // To add Items to order
  const _onAddItem = (e) => {
    totalItems.push(items);
    setTotalItems(totalItems);
    setItems({
      itemDescription: "",
      quantity: 0,
      rate: 0,
    });
  };

  //To save the orders fields on onChange event
  const _onChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  // To save the Order
  const onSave = async (e) => {
    const orderObj = fields;
    const itemsArray = totalItems;
    const { data } = await dispatch(createOrder(fields, itemsArray));
    setFields({
      customerName: "",
      customerAddress: "",
      orderDate: "",
      grossOrderAmount: "",
      shippingTax: "",
      totalTax: "",
      shipDate: "",
      totalOrderAmount: "",
    });
    setItems({
      itemDescription: "",
      quantity: "",
      rate: "",
    });
    setTotalItems([]);
  };

  return (
    <div>
      <Dialog
        isOpen={isCreateOrderOpen}
        onClose={onCloseCreateOrder}
        onSave={onSave}
        title="Create Order"
        isDisabled={!isValid}
      >
        <div className="form-group">
          <div>
            <div className="fields">
              <label>Customer Name:</label>
              <input
                name="customerName"
                value={fields.customerName}
                onChange={_onChange}
                className="form-input"
              ></input>
            </div>
            <div className="fields">
              <label>Customer Address:</label>
              <input
                name="customerAddress"
                value={fields.customerAddress}
                onChange={_onChange}
                className="form-input"
              ></input>
            </div>
            <div className="fields">
              <label>Order Date:</label>
              <input
                name="orderDate"
                value={fields.orderDate}
                onChange={_onChange}
                className="form-input"
              ></input>
            </div>
            <div className="fields">
              <label>Ship Date:</label>
              <input
                name="shipDate"
                value={fields.shipDate}
                onChange={_onChange}
                className="form-input"
              ></input>
            </div>
          </div>
          <div>
            <div className="fields">
              <label>Gross Order Amount:</label>
              <input
                name="grossOrderAmount"
                value={fields.grossOrderAmount}
                onChange={_onChange}
                type="number"
                className="form-input"
              ></input>
            </div>
            <div className="fields">
              <label>Shipping Tax:</label>
              <input
                name="shippingTax"
                value={fields.shippingTax}
                onChange={_onChange}
                type="number"
                className="form-input"
              ></input>
            </div>
            <div className="fields">
              <label>Total Tax:</label>
              <input
                name="totalTax"
                value={fields.totalTax}
                onChange={_onChange}
                type="number"
                className="form-input"
              ></input>
            </div>
            <div className="fields">
              <label>Total Order Amount:</label>
              <input
                name="totalOrderAmount"
                value={fields.totalOrderAmount}
                onChange={_onChange}
                className="form-input"
                type="number"
              ></input>
            </div>
          </div>
        </div>
        {totalItems &&
          totalItems.map((item, index) => {
            return (
              <Fragment>
                <div style={{ fontWeight: "700", color: "#bcbcbc" }}>
                  <span
                    style={{ marginRight: "20px" }}
                  >{`Item Description : ${item.itemDescription}`}</span>
                  <span
                    style={{ marginRight: "20px" }}
                  >{`Quantity : ${item.quantity}`}</span>
                  <span
                    style={{ marginRight: "20px" }}
                  >{`Rate : ${item.rate}`}</span>
                </div>
              </Fragment>
            );
          })}
        <div className="new-item">
          <div style={{ marginRight: "20px" }}>
            <input
              style={{ padding: "5px 4px" }}
              name="itemDescription"
              value={items.itemDescription}
              onChange={_onItemChange}
              placeholder="Item Description"
            ></input>
          </div>
          <div style={{ marginRight: "20px" }}>
            <input
              style={{ padding: "5px 4px" }}
              name="quantity"
              value={items.quantity}
              onChange={_onItemChange}
              placeholder="Quantity"
              type="number"
            ></input>
          </div>
          <div style={{ marginRight: "20px" }}>
            <input
              style={{ padding: "5px 4px" }}
              name="rate"
              value={items.rate}
              onChange={_onItemChange}
              placeholder="Rate"
              type="number"
            ></input>
          </div>

          <button
            onClick={_onAddItem}
            disabled={!items.itemDescription || !items.quantity || !items.rate}
          >
            Add Item
          </button>
        </div>
      </Dialog>
    </div>
  );
};
