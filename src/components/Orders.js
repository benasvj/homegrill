import React from 'react';
import Table from './Table';

const Orders = (props)=>{
const tables = props.tables.map((table, i)=>{
    return <Table
        orders={props.orders.filter((order)=>order.table===table)}
        switch={props.switch}
        key={i} 
        active={props.active}
        removeOrder={props.removeOrder}
        checkOut={props.checkOut}
        name={table}/>
});
    return(
        <div className="orders">
            {tables}
        </div>
    );
};

export default Orders;