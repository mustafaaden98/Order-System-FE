import React, {Fragment} from "react";
import "./style.css";


export const Dialog = ({
    isOpen, 
    children, 
    title,
    onClose,
    isViewItemDetails,
    onViewItemDetails, 
    onSave,
    isDisabled,
}) => {
    return(
        <Fragment>
            {isOpen &&
                <div className = "modal-overlay">
                    <div className = "modal-window">
                        <div className = "modal-header">
                            <div className = "modal-title">
                                <div>{title}</div>
                            </div>
                            <button style = {{padding: '11px 15px', cursor:'pointer'}} onClick = {onClose}>
                                Close
                            </button>
                        </div>
                        <div className="modal-body">{children}</div>
                        <div className = {isViewItemDetails ? "btn-fragment" : "btn-fragment-create"} >
                            <div>
                            {isViewItemDetails && <button className = "btn-details" onClick = {onViewItemDetails}>
                                View Item Details
                            </button>}
                            </div>

                        <button className =  {isDisabled ? "btn-disabled" : "btn-save"}  onClick = {onSave} disabled = {isDisabled}> 
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}