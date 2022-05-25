import React, { Component } from "react";
import Item from "../Item";
import StoreContext from "../../../context/StoreContext";

class ItemsList extends Component{
    constructor(props) {
        super(props);
    this.state={
        bigImg: this.props.item.gallery[0],
        count:  1,
        index: 1,
        currentIndex:0,
        length:'',
        up:'no',
        loaded:'yes'  
    }
}


    componentDidMount(e){
        let index = this.props.i.join()
 
        this.context.counter2.filter(c => c[0] === this.props.cartTotal).map(filteredCounter =>
            this.setState({count: (filteredCounter[1] )}, () => {
                this.context.handleCountCallback([index, this.state.count])
            }))
  
        let gallery =this.props.item.gallery.map(item => item.gallery)
            this.setState({length: gallery.length})   
        }

    onPlus= (e) => {
            this.setState({ count: this.state.count + 1 }, () => {
                this.context.handleCountCallback([e.target.id, this.state.count]);   
            });
    }
    onMinus= (e) =>{
            if(this.state.count < 1){
                this.setState({
                    count:0
                });
            }else {
                this.setState({ count: this.state.count -1 }, () => {
                    this.context.handleCountCallback([e.target.id, this.state.count]); 
                });
            }
    }
    next = () => {
            if (this.state.currentIndex < (this.state.length - 1)) {
                this.setState((prevState) => ({
                        currentIndex: prevState.currentIndex + 1,
                    }));
            }
    }
    prev = () => {
            if (this.state.currentIndex > 0) {
                this.setState((prevState) => ({
                    currentIndex: prevState.currentIndex - 1,
                }));
            }
    }
    
    render(){
    console.log(this.state.count)
        let item = this.props.item
        let i = this.props.i
        return(
            <div className="cartBox"> 
                <div className="cartBox_imgBox">
                    <div className="cartBox_count">
                        <div style={{ textAlign:'center'}}>
                            <button 
                               id={i}
                                onClick={this.onPlus} 
                                className="plus_minus">
                                    +
                            </button>
                        </div>
                        <button className="count">
                                {this.state.count} 
                        </button>
                        <div style={{textAlign:'center'}} >
                            <button 
                                dangerouslySetInnerHTML={{__html: '&#8211'}}
                                id={i}
                                onClick={this.onMinus}
                                className="plus_minus">
                            </button>
                        </div>
                    </div>
                    <ul>
                    <div style={{width:'15rem'}}>
                        <div className="carousel-container">
                            <div className="carousel-wrapper">
                            <div className="arrows_Box">
                        <button 
                                dangerouslySetInnerHTML={{__html: '&#8249;'}}
                                className="arrows" 
                                onClick={this.prev}/>
                        <button 
                                dangerouslySetInnerHTML={{__html: '&#8250;'}}
                                className="arrows" 
                                onClick={this.next}/>
                    </div>
                                <div className="carousel-content-wrapper">
                                    <div className="carousel-content"  style={{ transform: `translateX(-${this.state.currentIndex * 100}%)` }}>
                                        {item.gallery.map(img =>
                                            <li key={img}>
                                                <img className="cartImg" alt="" src={img} />
                                            </li>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </ul>
                </div>
                <div>
                    <h2 className="pdpCard_Brand">{item.brand}</h2>
                    <h3 className="pdpCard_Name">{item.name}</h3>
                    <ul>
                        {item.prices.filter(price => price.currency.symbol === this.props.currency).map(filteredPrice => 
                            <li key={filteredPrice.currency.label}>
                                <p className="pdpCard_Price">{filteredPrice.currency.symbol}{filteredPrice.amount}</p>
                            </li>
                            )}
                        </ul>
                    <div>
                        <ul>
                            {item.attributes.map(attribute =>  
                                <li key={attribute.id }>  
                                    <Item 
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
ItemsList.contextType = StoreContext;

export default ItemsList;