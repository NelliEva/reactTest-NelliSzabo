import React, { Component } from "react";
import CurrencyCard from "../CurrencyCard";
import cartGreen from "../../../cartGreen.png";


class Card extends Component{
    state={
        stock: '',
        cardNameStyle:'cardName',
        popup:false,
       
    }
  
    render() {
        let stock
        let cart
        let cardNameStyle
        let cardPriceStyle
        if(this.props.inStock === false){
            stock=true
            cart=false
            cardNameStyle='cardName_outStock'
            cardPriceStyle='cardPrice_outStock'
        } else{
            stock= false
            cart=true
            cardNameStyle='cardName'
            cardPriceStyle='cardPrice'
        }
        return(
           <div >
                <img onClick={this.props.OnSelect}  className="cardImg" alt="" src={this.props.img} />
                {cart && 
                    <input  
                        onClick={ (e)=> {this.props.onQuickAdd(e)}} id={this.props.id} 
                        className="cartGreen" type="image" src={cartGreen} alt=''
                    />
                }
               
                {stock &&  <div className="cardImg_outStock"><p>OUT OF STOCK</p></div>}
                <div>
                    <p className={cardNameStyle}>{this.props.brand} {this.props.name}</p>
                    <ul>
                        {this.props.price.filter(x => x.currency.symbol === this.props.currency).map(filteredprice => 
                            <li key={filteredprice.currency.symbol} >
                                <CurrencyCard 
                                    amount={filteredprice.amount} 
                                    symbol={filteredprice.currency.symbol} 
                                    cardPriceStyle={cardPriceStyle}/>
                            </li>
                        )}
                    </ul>
                </div> 
            </div> 
        )
    }
}

export default Card;