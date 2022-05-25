import React, { Component } from "react";
import ItemsList from "../../../../modules/Cart/ItemsList";
import StoreContext from "../../../../context/StoreContext";


class AllItems extends Component{
       
    render() {
        return(
            <div>
              <ul className="cartContainerUl">
                {this.props.datas.filter(data => data.id === this.props.cart[0] ).map((list, index) =>
                  <li className="cartContainerLi" key={index} >
                    <ItemsList 
                        index={this.props.cart}
                        atrSelected={this.props.cart[1]}
                        atrSelected_Second={this.props.cart[3]}
                        atrSelected_Third={this.props.cart[4]}
                        cartTotal={this.props.cartTotal}
                        item={list}  
                        currency={this.props.currency} 
                        atrCart={this.props.atrCart}  
                        black={this.props.black}
                        value={this.props.value}
                        i={[list.id, this.props.cart[1]]}
                        />
                         
                  </li>
                 
                )}
              </ul>  
            </div>  
        )  
    }
}

AllItems.contextType = StoreContext;
         
export default AllItems;