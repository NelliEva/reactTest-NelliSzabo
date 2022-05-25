import React, {Component} from "react";
import StoreContext from "../../context/StoreContext";
import axios from "axios";
import logo from '../../brandlogo.svg';
import CartnCurrency from "./Cart&Currency";
import { Link } from "react-router-dom";



class Header extends Component{
 
    state = {
        data: {
            data:{
            categories: []
            }
        },
        childData:''
    }


      componentDidMount() {
        axios({
            url: 'http://localhost:4000/',
            method: 'post',
            data: {
              query: `
              query categories{
                  categories{
                    name
                  }
                }
                `
            }
          }).then((result) => {
           this.setState({
            data:  result.data
          })
          })
      }  
    render()
    {
        return(
            <>
            <div className="headerContainer">
                <nav className="headerNavBox">
                    <ul className="headerListUl">
                        {this.state.data.data.categories.map(categories =>
                            <li  key={categories.name} className="headerList">
                                <div className="headerBtn" href="" >
                                    <Link to='/'>
                                    <button 
                                        id={categories.name}
                                        className={this.props.headerStyle}   
                                        onClick={(e) => {this.props.onCategoryChange(e); this.props.onSelect(e)}} >
                                            {categories.name} 
                                    </button>
                                    </Link>
                                </div>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="logoBox">
                    <Link to='/'>
                    <img  alt='' src={logo} />
                    </Link>
                </div>
                <CartnCurrency 
                    onCurrencyChange={this.props.onCurrencyChange} 
                    onCurrencyChange2={this.props.onCurrencyChange2} 
                    symbol={this.props.symbol} 
                    s={this.props.s} 
                    arrowStyle={this.props.arrowStyle}
                    sumQuantity={this.props.sumQuantity} 
                    c={this.props.c}
                    cartAll={this.props.cartAll}
                    currency={this.props.currency}
                    bagCounter={this.props.bagCounter}
                    />
            </div>
            </>
        );
    }
}
Header.contextType = StoreContext;

export default Header;