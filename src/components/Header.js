import React from 'react';

const Header = (props)=>{

    const tabs = props.tabs.map(tab=>{
        return (
        <li 
            onClick={()=>props.switchTab(tab)}
            key={tab}>{tab}  
        </li>
        )
    });
    return(
        <header>
            <h2>Menu</h2>
            <h1>HOME <span>GRILL</span></h1>
            <ul>
                {tabs}
            </ul>
        </header>
    )

};

export default Header;