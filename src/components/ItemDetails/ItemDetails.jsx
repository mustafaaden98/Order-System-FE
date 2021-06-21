import React, { useState } from "react";

export const ItemDetails = ({itemDetails}) => {
    if(itemDetails && itemDetails.length){
        return (
            <div>
              <table style = {{width: '100%'}}>
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {itemDetails &&
                    itemDetails.map((item, index) => {
                      return (
                        <tr key={item.itemCode} >
                          <td className="text-left">{item.itemDescription}</td>
                          <td className="text-left">{item.quantity}</td>
                          <td className="text-left">{item.rate}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )
    }
    else{
        return(
            <div>
                No Items!!!
            </div>
        )
    }

};
