import React, { Component } from "react";
import AllItems from "./AllItems";
import StoreContext from "../../../context/StoreContext";
import { Link } from "react-router-dom";


class Cart extends Component{
  constructor(props) {
    super(props);
    this.state= {
          popup: false,   
         
    } 
  }
    onOrder=()=>{
        this.setState({popup: true})
       }

    render() {
        return(
            <>
            <h2>CART</h2> 
            {this.context.AllinCart.map((cart, index) =>
                <li key={index} >
                    <AllItems 
                        cart={cart}
                        cartTotal={cart.slice(0, 2).join()}
                        datas={this.context.datas}
                        currency={this.props.currency}
                        selectedAtr={this.props.selectedAtr}
                        atrCart={this.props.atrCart}
                        cartAll={this.props.cartAll}
                        value={this.props.value}
                        index={index}
                        />
                </li>
                )}
               
                <div className="order_Box">
                  <table>
                    <tbody>
                      <tr>
                        <td>Tax 21%:</td>
                        <td className="order_Detail">{this.props.currency}{this.context.Tax}</td>
                      </tr>
                      <tr>
                        <td>Quantity:</td>
                        <td className="order_Detail">{this.context.sumQuantity}</td>
                      </tr>
                      <tr>
                        <td>Total:</td>
                        <td className="order_Detail">{this.props.currency}{this.context.sumPrices}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="order_Btn" onClick={this.onOrder}>
                   Order
                    </button>
                </div>
            {this.state.popup &&
                    <div  className="modal_Order">
                        <div className="modal-content">
                            <p className="modalMsg">Thank you for your order!<br/>
                            <Link to='/'className="modalMsg order_link">Home Page</Link></p>
                        </div>
                    </div>
            }
            </>
        )
    }
}
Cart.contextType = StoreContext;
export default Cart;