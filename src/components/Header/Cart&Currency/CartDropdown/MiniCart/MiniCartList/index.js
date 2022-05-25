import React, { Component } from "react";
import StoreContext from "../../../../../../context/StoreContext";
import MiniCartItem from "../MiniCartItem";

class MiniCartList extends Component{
    state={
        bigImg: this.props.item.gallery[0],
        count2:1,
        index: 0,
        currentIndex:0,
        length:'',
        up:'no'
        
    }

    componentDidMount(e){    
      
        this.context.counter.filter(c => c[0] === this.props.cartTotal).map(filteredCounter =>  
            this.setState({count2: filteredCounter[1]}, () => {
                this.context.handleCountCallback2([this.props.i, this.state.count2])
            }))
        
        let gallery =this.props.item.gallery.map(item => item.gallery)
            this.setState({length: gallery.length})    
        }
    
    onPlus= (e) => {
            this.setState({ count2: this.state.count2 + 1 }, () => {
                this.context.handleCountCallback2([e.target.id, this.state.count2]);   
            });
        }
    
    onMinus= (e) =>{
            if(this.state.count2 < 1){
                this.setState({
                    count2:0
                });
            }else {
                this.setState({ count2: this.state.count2 -1 }, () => {
                    this.context.handleCountCallback2([e.target.id, this.state.count2]); 
                });
            }
    }
    render(){
        console.log(this.state.count2)
        let item = this.props.item
        let i = this.props.i
        return(
            <div className="mini_cartBox"> 
                <div className="cartBox_imgBox">
                    <div className="cartBox_count">
                        <div style={{ textAlign:'center'}}>
                            <button 
                               id={i}
                                onClick={this.onPlus} 
                                className="mini_plus_minus">+</button></div>
                        <button className="mini_count">
                                {this.state.count2}
                        </button>
                        <div style={{textAlign:'center'}} >
                            <button 
                                dangerouslySetInnerHTML={{__html: '&#8211'}}
                                id={i}
                                onClick={this.onMinus}
                                className="mini_plus_minus"></button></div>
                    </div>
                    <div>
                        <img className="mini_cartImg" alt="" src={this.state.bigImg}/> 
                    </div>
                </div>
                <div>
                    <h2 className="mini_pdpCard_Brand">{item.brand}</h2>
                    <h3 className="mini_pdpCard_Name">{item.name}</h3>
                    <ul>
                        {item.prices.filter(price => price.currency.symbol === this.props.currency).map(filteredPrice => 
                            <li key={filteredPrice.currency.label}>
                                <p className="mini_pdpCard_Price">{filteredPrice.currency.symbol}{filteredPrice.amount}</p>
                            </li>
                            )}
                        </ul>
                    <div>
                       
                        <ul>
                            {item.attributes.map(attribute =>  
                                <li key={attribute.id }>  
                                    <MiniCartItem 
                                        atrSelected={this.props.atrSelected}
                                        atrSelected_Second={this.props.atrSelected_Second}
                                        atrSelected_Third={this.props.atrSelected_Third}
                                        name={ attribute.name} 
                                        items={attribute.items} 
                                        type={attribute.type} 
                                        id={attribute.id}
                                        atrCart={this.props.atrCart} 
                                        value={this.props.value}/> 
                                </li>   
                            )}
                        </ul>
                    </div>
                </div>
                
            </div>
        )
    }
}
MiniCartList.contextType = StoreContext;

export default MiniCartList;