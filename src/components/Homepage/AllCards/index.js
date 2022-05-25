import React, { Component } from "react";
import StoreContext from "../../../context/StoreContext";
import CardList from "../../../modules/Homepage/CardList";

class AllCards extends Component {
    render() {
        return(
            <>
            <CardList 
                datas={this.context.datas}
                show={this.props.show} h1={this.props.h1} 
                currency={this.props.currency}
                onQuickAdd={this.props.onQuickAdd}
                onAddtoCart={this.props.onAddtoCart}/>
            </>    
        )
    }
}
AllCards.contextType = StoreContext;
export default AllCards;