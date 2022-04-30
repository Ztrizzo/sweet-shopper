import React from "react";

function OrderSummary (props){
    const lines = !props.cart ? props.location.state.order.lineitems : props.cart.lineitems;
    const total = !props.total ? props.location.state.order.total : props.total;

    return(
        <div>
            <h3>Order Summary</h3>
            
            {/* Eventually include image of candy */}

            {lines.map(line=>{
                return (
                    <div key = {line.id}>
                        <span>
                            {line.candy.name} x {line.qty}
                        </span>
                        <span>
                            <br/>
                            Price: ${(line.qty * line.candy.price).toFixed(2)}
                            <br/>
                            <br/>
                        </span>
                    </div>
                )
            })}

            <span><b>Total: </b>${total}</span>
        </div>
    )
    
}

export default OrderSummary;
