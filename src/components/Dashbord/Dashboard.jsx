import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  getItemsPerOrder,
  searchOrder,
  deleteOrder,
  updateOrder,
} from "../../redux/actions";
import { Dialog } from "../Dialog/Dialog";
import { CreateOrder } from "../CreateOrder/CreateOrder";
import { ItemDetails } from "../ItemDetails/ItemDetails";
import exportFromJSON from "export-from-json";
import "./style.css";

export const Dashboard = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(undefined);
  const [isCreateOrderOpen, setCreateOrderOpen] = useState(false);
  const [viewItemDetails, setViewItemDetails] = useState(false);
  const [fields, setFields] = useState({
    customerName: "",
    customerAddress: "",
  });
  const dispatch = useDispatch();
  let orders = useSelector((state) => state.ordersReducer.orders);
  useEffect(() => {
    _getAllOrders();
  }, []);

  useEffect(() => {
    setFields({
      ...fields,
      customerName: selectedOrder ? selectedOrder.customerName : "",
      customerAddress: selectedOrder ? selectedOrder.customerAddress : "",
    });
  }, [selectedOrder]);

  //To get all the orders and set to component state
  const _getAllOrders = async () => {
    const { data } = await dispatch(getOrders());
    setOrdersList(data.data.getOrders);
  };
  /**
   *
   */
  const _onChange = async (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const _onSearch = async (e) => {
    if (e.charCode == 13) {
      const { data } = await dispatch(searchOrder(search));
      setOrdersList(data.data.getFilteredOrder);
    }
  };
  /**
   *
   */
  const _onRowClick = async (item) => {
    setDialogOpen(true);
    setSelectedOrder(item);
  };

  /**
   *
   */
  const _editOrder = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  /**
   *
   */
  const onClose = (e) => {
    setDialogOpen(false);
    setViewItemDetails(false);
    setSelectedOrder(undefined);
  };
  /**
   *
   */
  const _createOrder = (e) => {
    setCreateOrderOpen(true);
  };
  /**
   *
   */
  const onCloseCreateOrder = (e) => {
    setCreateOrderOpen(false);
  };
  /**
   *
   */
  const onViewItemDetails = async (e) => {
    if (!viewItemDetails && !selectedOrder?.items) {
      await dispatch(getItemsPerOrder(selectedOrder.id));
    }
    setViewItemDetails(!viewItemDetails);
  };
  const _onDeleteClick = async (item) => {
    const { data } = await dispatch(deleteOrder(item.id));
    setOrdersList(data.data.deleteOrder);
  };
  const data = orders;
  const fileName = "orders";
  const exportType = "xls";
  const _exportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };
  const onSave = async (e) => {
    const { data } = await dispatch(
      updateOrder(selectedOrder.id, fields.customerName, fields.customerAddress)
    );
    let updatedOrder = ordersList.map((order, index) => {
      if (order.id == data.data.updateOrder.id) {
        return data.data.updateOrder;
      } else {
        return order;
      }
    });
    setOrdersList(updatedOrder);
    onClose(e);
  };
  return (
    <div>
      <div className="search-center">
        <input
          className="search-field"
          value={search}
          onChange={_onChange}
          placeholder="Search for orders"
          onKeyPress={_onSearch}
        />
        <div>
          <button className="btn-new" onClick={_createOrder}>
            Create Order
          </button>
          <button className="btn-new-export" onClick={_exportToExcel}>
            Export
          </button>
        </div>
      </div>
      <div className="table-center">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Address</th>
              <th>Order Date</th>
              <th>Gross Order Amount</th>
              <th>Shipping Tax</th>
              <th>Total Tax</th>
              <th>Ship Date</th>
              <th>Total Order Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {ordersList &&
              ordersList.map((item, index) => {
                return (
                  <tr key={item.id} onDoubleClick={() => _onRowClick(item)}>
                    <td className="text-left">{item.customerName}</td>
                    <td className="text-left">{item.customerAddress}</td>
                    <td className="text-left">{item.orderDate}</td>
                    <td className="text-right">{item.grossOrderAmount}</td>
                    <td className="text-right">{item.shippingTax}</td>
                    <td className="text-right">{item.totalTax}</td>
                    <td className="text-left">{item.shipDate}</td>
                    <td className="text-right">{item.totalOrderAmount}</td>
                    <td
                      onClick={() => _onDeleteClick(item)}
                      className="text-right"
                      style={{ textAlign: "center" }}
                    >
                      <i
                        class="fa fa fa-archive"
                        aria-hidden="true"
                        style={{ color: "#cb0404" }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {isDialogOpen && (
        <Dialog
          isOpen={isDialogOpen}
          title={"Order Details"}
          onClose={onClose}
          isViewItemDetails={true}
          onViewItemDetails={onViewItemDetails}
          onSave={onSave}
        >
          <div>
            <div className="fields">
              <label>Customer Name</label>
              <input
                name="customerName"
                value={fields.customerName}
                onChange={_editOrder}
                className="form-input"
              ></input>
            </div>
            <div className="fields">
              <label>Customer Address</label>
              <input
                name="customerAddress"
                value={fields.customerAddress}
                onChange={_editOrder}
                className="form-input"
              ></input>
            </div>
            <div className="fields">
              <span>Order Date:</span>
              <span>{selectedOrder.orderDate}</span>
            </div>
            <div className="fields">
              <span>Gross Order Amount:</span>
              <span>{selectedOrder.grossOrderAmount}</span>
            </div>
            <div className="fields">
              <span>Shipping Tax:</span>
              <span>{selectedOrder.shippingTax}</span>
            </div>
            <div className="fields">
              <span>Total Tax:</span>
              <span>{selectedOrder.totalTax}</span>
            </div>
            <div className="fields">
              <span>Shipping Date:</span>
              <span>{selectedOrder.shipDate}</span>
            </div>
            <div className="fields">
              <span>Total Order Amount:</span>
              <span>{selectedOrder.totalOrderAmount}</span>
            </div>
            {viewItemDetails && (
              <div>
                <ItemDetails
                  key={selectedOrder.id}
                  itemDetails={selectedOrder.items}
                />
              </div>
            )}
          </div>
        </Dialog>
      )}
      {isCreateOrderOpen && (
        <CreateOrder
          isCreateOrderOpen={isCreateOrderOpen}
          onCloseCreateOrder={onCloseCreateOrder}
        />
      )}
    </div>
  );
};
