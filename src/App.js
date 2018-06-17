import React from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import Stats from './components/Stats';
import Orders from './components/Orders';
import Menu from './components/Menu';
import "./sass/main.scss";
import imgDrinks from './images/drinks.png';
import imgDishes from './images/main_dish.png';
import imgDeserts from './images/cake.png';
import imgSpecial from './images/special.png';
import axios from 'axios';
import _ from 'lodash';
import { Sparklines } from 'react-sparklines';
const API = 'https://enigmatic-cliffs-25405.herokuapp.com/menu';

class App extends React.Component{
  state ={
    tabs:["Orders", "Statistics", "Settings"],
    activeTab:"Orders",
    categories:[
      {name:"drinks", url:imgDrinks},
      {name:"dishes", url:imgDishes},
      {name:"deserts", url:imgDeserts},
      {name:"special", url:imgSpecial},
    ],
    activeCat:'drinks',
    menu:{},
    tables:['North Table', 'At the window', 'close to WC', 'two person table'],
    activeTable:'North Table',
    checkOuts:[],
    orders:[],
    total:0
  };

  componentDidMount(){
    axios.get(API).then((response)=>{
      console.log(response);
      this.setState({menu:response.data.menu})
    })
  }

  addSpecial = (menuItem)=>{
    const special=[...this.state.menu.special, menuItem];
    const menu={...this.state.menu, special};
    this.setState({menu})
  };


  //sukurti nauja uzsakmyma ir ideti ji i aktyvu stala

  addOrder = (item)=>{
    const orders=[...this.state.orders,
      {
        name:item.name, 
        price:item.price, 
        table:this.state.activeTable,
        id:_.uniqueId()
      }
    ];
    this.setState({orders})
  };

  //checkout
  checkOut = (table, amount)=>{
    const orders=this.state.orders.filter((item,i)=>{
      return item.table!==table
    })
    // this.setState({orders, total:this.state.total+total})
    this.setState((prevState)=>{
      return {orders:orders, total:prevState.total+amount}
    });
    const checkOuts = [...this.state.checkOuts, amount]
    this.setState({checkOuts})
  };

  removeOrder = (id)=>{
    const orders = this.state.orders.filter((item, i)=>{
      return item.id!==id
    })
    this.setState({orders})
  };


  //metodas active tab pakeisti
  switchTab = (activeTab)=>{
    this.setState({activeTab})
  };

  switchCategory = (name)=>{
    this.setState({activeCat:name})
  };

  switchTable = (name)=>{
    this.setState({activeTable:name})
  };

  renderContent = ()=>{
    switch(this.state.activeTab){
      case "Orders" : 
        return <Orders
          orders={this.state.orders}
          tables={this.state.tables}
          active={this.state.activeTable}
          removeOrder={this.removeOrder}
          checkOut={this.checkOut}
          switch={this.switchTable}/>
      case "Statistics" : return <Stats total={this.state.total} checkOuts={this.state.checkOuts}/>;
      case "Settings" : return <Settings addSpecial={this.addSpecial} special={this.state.menu.special}/>;
      default : return null
    }
  };

  render(){
    return(
      <div>
        <Header switchTab={this.switchTab} tabs={this.state.tabs}/>
        <Menu
          addOrder={this.addOrder}
          menu={this.state.menu[this.state.activeCat]}
          categories={this.state.categories}
          active={this.state.activeCat}
          switch={this.switchCategory}
        />
        {this.renderContent()}
      </div>
    );
  };
};

export default App;