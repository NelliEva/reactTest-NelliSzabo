import React,{Component} from "react";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import axios from "axios";
import cart from '../../../cart.jpg';
import CartDropdown from "./CartDropdown";
import CurrencyList from "./CurrencyList";
import StoreContext from "../../../context/StoreContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class CartnCurrency extends Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            update: false,
            bagCounter:''  
        };
      }

 onCartOn=(e)=>{
        this.setState((prevState) => ({
            show: !prevState.show,
          }));
          this.setState({update: true})   
      }
    render() {
       
        let currencyList;
        if(this.props.s) {
            currencyList= <CurrencyList onCurrencyChange={this.props.onCurrencyChange} />
        }
        let cartList;
        if(this.state.show === true) {
            cartList= <CartDropdown  
                           onCartOn={this.onCartOn}
                           currency={this.props.currency}
                           show={this.state.show}
                           update={this.state.update}
                            />
        }

        return(
            <div className="action">
                   <div className="cart">
                       <Link to='/'>
                            <button  onClick={this.onCartOn}>
                                    <div className={this.context.bagStyle}>{this.context.sumQuantity}</div>
                                    <img className='' alt="" src={cart}/>
                            </button>
                        </Link>
                    </div>
                    {cartList}
                   <div className="currency">
                       <button className="currencyBtn"  onClick={this.props.onCurrencyChange2}>
                           {this.props.symbol}  <i className={this.props.arrowStyle}></i>
                       </button>
                    </div>
                    {currencyList}        
            </div>
        )
    }
}

CartnCurrency.contextType = StoreContext;
export default CartnCurrency;