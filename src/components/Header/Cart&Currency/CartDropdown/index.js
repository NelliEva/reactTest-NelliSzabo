import React, { Component } from "react";
import StoreContext from "../../../../context/StoreContext";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";



class CartDropdown extends Component{
    
    render(){
        return(
            <>
            <div className="miniCart_Modal"></div>
            <div className="miniCart_Box">
                <p className="miniCart_title"><strong>My Bag,</strong> {this.context.sumQuantity_2} items</p>
                <ul className="mini_listContainer">
                    {this.context.AllinCart.map((cart, index) =>
                        <li key={index} >
                            <MiniCart 
                                cart={cart}
                                cartTotal={cart.slice(0, 2).join()}
                                datas={this.context.datas}
                                currency={this.props.currency}
                                selectedAtr={this.context.selectedAtr}
                                atrCart={this.props.atrCart}
                                cartAll={this.props.cartAll}
                                value={this.props.value}
                                index={index}
                                show={this.props.show}
                                update={this.props.update}
                                />
                        </li>
                    )}
               </ul>
                <div className="miniCart_total">
                    <p>Total</p>
                    <p>{this.context.sumPrices_2}</p>
                </div>
                <div className="mini_Btn">
                    <Link to='/cart'><button onClick={this.props.onCartOn} className="miniCart_Btn white">VIEW BAG</button></Link>
                    <Link to='/checkout'><button onClick={this.props.onCartOn} className="miniCart_Btn green">CHECK OUT</button></Link> 
                </div>
            </div>
            </>
        )
    }
}
CartDropdown.contextType = StoreContext;

export default CartDropdown;