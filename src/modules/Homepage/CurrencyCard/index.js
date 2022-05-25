import React, { Component } from "react";

class CurrencyCard extends Component{
    render() {
        return(
            <>
            <p className={this.props.cardPriceStyle}>
               {this.props.symbol}{this.props.amount}
            </p>
            </>
        )
    }
}

export default CurrencyCard;