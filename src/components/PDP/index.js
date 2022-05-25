import React, { Component } from "react";
import StoreContext from "../../context/StoreContext";
import Card from "../../modules/PDP/Card";

class PDP extends Component{

    render() { 
        return(
            <div>
          {this.context.datas.filter(id => id.id === this.props.id).map(filteredItem => (
                  <li key={filteredItem.id} >
                    <Card 
                        item={filteredItem} 
                        len={filteredItem.attributes.length}
                        currency={this.props.currency} 
                        selectedID={this.props.selectedID}
                        onAddtoCart={this.props.onAddtoCart}
                        onSelectAtr={this.props.onSelectAtr}
                        atrClassBgC={this.props.atrClassBgC}
                        setStateOfParent = {this.props.setStateOfParent}
                        popup={this.props.popup}
                        id = {this.props.id}
                        quickAcces={this.props.quickAcces}
                        />
                  </li>
                ))}
            </div>
        )  
    }
}
PDP.contextType = StoreContext;

export default PDP;