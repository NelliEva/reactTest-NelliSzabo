import React, { Component } from "react";
import StoreContext from "../../../../../context/StoreContext";
import MiniCartList from "./MiniCartList";


class MiniCart extends Component{

    render(){
        return(
            <div>
                <ul className="cartContainerUl">
                {this.context.datas.filter(data => data.id === this.props.cart[0] ).map((list, index) =>
                  <li className="cartContainerLi" key={index}>
                    <MiniCartList
                        index={this.props.cart}
                        id={this.props.cart[0]}
                        atrSelected={this.props.cart[1]}
                        atrSelected_Second={this.props.cart[3]}
                        atrSelected_Third={this.props.cart[4]}
                        cartTotal={this.props.cartTotal}
                        item={list}  
                        currency={this.props.currency} 
                        atrCart={this.props.atrCart}  
                        show={this.props.show}
                        update={this.props.update}
                        i={[list.id, this.props.cart[1]].join()}
                        />
                  </li>  
                )}
                </ul>
            </div>
        )
    }
}
MiniCart.contextType = StoreContext;

export default MiniCart;