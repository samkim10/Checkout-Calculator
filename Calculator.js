import React, {Component} from 'react';

//the item boxes.
class Item extends Component {
  render() {
    return (
      <button className="item" onClick={() => this.props.onClick()}>
        {this.props.name} | {this.props.price}$
      </button>
    );
  }
}

//the sections containing item boxes.
class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items : this.props.items,
      cartItems : Array(),
      itemID : 0,
      totalP : 0,
    };
  }

  renderItem(i) {
    const items = this.props.items.slice();
    let itemAry = [];

    for (let i = 0; i < items.length; i++){
      itemAry.push(
        <Item name={items[i][0]} 
        price={items[i][1]}
        onClick={() => this.addItem(i)}
      />)
    }

    return itemAry;
  }

  renderCartItem() {
    const cartItems = this.state.cartItems.slice();
    let itemAry = [];

    for (let i = 0; i < cartItems.length; i++){
      itemAry.push(
        <Item name={cartItems[i][0]} 
        price={cartItems[i][1]}
        onClick={() => this.removeItem(cartItems[i][2])}
      />)
    }

    return itemAry;
  }

  addItem(i){

    let itemID = this.state.itemID;
    
    const items = this.props.items.slice();
    const cartItems = this.state.cartItems.slice();
    cartItems.push([items[i][0], items[i][1], itemID]);
    this.setState({cartItems: cartItems});

    itemID = itemID + 1;
    this.setState({itemID: itemID});

    this.setState({cartItems: cartItems});
    
    let totalP = this.state.totalP;
    totalP = 0;
    for (let i = 0; i < cartItems.length; i++){
      totalP += cartItems[i][1];
    }

    this.setState({totalP: totalP});
  }

  removeItem(itemID){
    const cartItems = this.state.cartItems.slice();
    let target = -1; 
    for (let i = 0; i <cartItems.length; i++){
      if (cartItems[i][2] == itemID){
        target = i;
      }
    }

    if (target >= 0) { cartItems.splice(target, 1);} 
    this.setState({cartItems: cartItems});

    let totalP = this.state.totalP;
    totalP = 0;

    for (let i = 0; i < cartItems.length; i++){
      totalP += cartItems[i][1];
    }

    this.setState({totalP: totalP});
  }

  render() {
    const title = 'Item List (click to add)';
    const title2 = 'Your Cart (click to remove)';
    let total = 0;

    return (
      <div>
        <div className='listing'>
          <div className='label'>{title}</div>
            {this.renderItem()}
        </div>
          <div className='listing'>
            <div className='label'>{title2}</div>
            {this.renderCartItem()}
          </div>
          <div className = 'listing'>
            <hr></hr>
            <div className='label'>total price: {this.state.totalP}$</div>
          </div>
      </div>
    );
  }
}

  
class Calc extends Component {

  render() {
    return (
      <div>
        <h1>Checkout Price Calculator</h1>
        <Listing items = {this.props.items}/>
      </div>
    );
  }
}

export default Calc;