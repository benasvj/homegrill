import React from 'react';

const Table = (props)=>{

    const total = props.orders.reduce((total, order)=>{
        return total+order.price
    },0);
    const orders = props.orders.map((order,i)=>{
        return(
            <li key={i}>
                {order.name}
                <span className="delete" onClick={()=>props.removeOrder(order.id)}>X</span>
                <span className="price">{order.price}€</span>
            </li>
        )
    });
    
    return(
        <div 
            onClick={()=>{props.switch(props.name)}}
            className={props.active===props.name? "table active-table" : "table"}>
            <h4>{props.name}</h4>
            <ul>
                {orders}
            </ul>
            <nav>
                <div className="btn" onClick={()=>props.checkOut(props.name, total)}>Checkout</div>
                <h5>Total: {total.toFixed(2)}€</h5>
            </nav>
        </div>
    );
};

export default Table;