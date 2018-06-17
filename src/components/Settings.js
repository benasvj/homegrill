import React from 'react';

class Settings extends React.Component{
    state ={
        temp:{name:'', price:0}
    }

    handleInput = (value, type)=>{
        if(type==='price') value = parseFloat(value)
        this.setState({temp:{...this.state.temp, [type]:value}})
    };
    
    render(){
        const items = this.props.special.map((item, i)=>{
            return (
                <li key={i}>
                    {item.name}
                    <span className="delete">X</span>
                    <span className="price">{item.price}€</span>
                </li>
            )
        })
   
        return(
            <div className="settings">
                <h3>Day Special</h3>
                <div className="controls">
                    <input type="text" value={this.state.temp.name} placeholder="Patiekalas" onChange={(e)=>this.handleInput(e.target.value, 'name')}/>
                    <input type="number" value={this.state.temp.price} placeholder="Suma" onChange={(e)=>this.handleInput(e.target.value, 'price')}/>
                    <div
                        onClick={()=>this.props.addSpecial(this.state.temp)}
                        className="btn">Add
                    </div>
                    <ul>
                        {items}
                    </ul>
                </div>
            </div>
        );
    };
};

export default Settings;