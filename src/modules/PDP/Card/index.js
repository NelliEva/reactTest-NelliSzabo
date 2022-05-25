import React, { Component } from "react";
import Attributes from "../Attributes";
import { Link } from "react-router-dom";
import StoreContext from "../../../context/StoreContext";

class Card extends Component{
    state={
        x: '',
        bigImg: this.props.item.gallery[0],
        o:'',
        cart:[],
        disable:false,
        popup: false,
        link: this.props.id,
        Btn: "pdpCard_Btn" 
       
    }
    componentDidMount(){  
      if ( this.props.item.inStock === false ){
            this.setState({disable: true, Btn: 'pdpCard_Btn_disable'})
        }
        else if(this.props.item.inStock !== false ){
            this.setState({disable: false,  Btn: 'pdpCard_Btn'})
        }
      
    }
   
    bigImgHandeler= (e) => {
        this.setState({bigImg: e.target.src})
    }

    onAdd=()=>{
        this.setState((prevState) => ({
            cart: [...prevState.cart, prevState.id],
          }));    
    }
    saveId=(e)=>{
        this.setState({ id: e.target.id });
    }

    onClick=()=>{
    }
 
    render(){
        let item = this.props.item
        return(
            <div className="pdpCardBox" style={{top: '10rem'}}>
               
                <div>
                    <ul>
                        {item.gallery.map(img =>
                        <li key={img}>
                            <img className="pdpGalleryImg" alt="" src={img} onClick={this.bigImgHandeler}/>
                        </li>
                        )}
                    </ul>
                </div>
                <div>
                    <img className="pdpCard_Bigimg" alt="" src={this.state.bigImg}/>
                </div>
                <div className="pdpCard_DetailBox">
                    <h2 className="pdpCard_Brand">{item.brand}</h2>
                    <h3  className="pdpCard_Name">{item.name}</h3>
                    <div>
                        <ul >
                            {item.attributes.map(attribute =>  
                                <li key={attribute.id } style={{minHeight:'5rem'}}>  
                                    <Attributes 
                                        name={ attribute.name} 
                                        items={attribute.items} 
                                        type={attribute.type} 
                                        id={attribute.id}
                                        itemID={item.id}
                                        inStock={item.inStock}
                                        atrClassBgC={this.props.atrClassBgC}
                                        onSelectAtr={this.props.onSelectAtr}
                                        setStateOfParent = {this.props.setStateOfParent}
                                        clickedCountCallback={this.clickedCountCallback}
                                        len={this.props.len}/> 
                                </li>   
                            )}
                        </ul>
                    </div>
                        <div>
                            <p className="atr_Name">PRICE:</p>
                            <ul>
                            {item.prices.filter(price => price.currency.symbol === this.props.currency).map(filteredPrice => 
                                <li key={filteredPrice.currency.label}>
                                    <p className="pdpCard_Price">{filteredPrice.currency.symbol}{filteredPrice.amount}</p>
                                </li>
                                )}
                            </ul>
                        </div> 
<Link to='/'  >
                    <button 
                        className={this.state.Btn}
                        disabled={this.state.disable}
                        id={item.id} 
                        onClick={ (e)=> { this.props.onAddtoCart(e); this.onClick()}} >
                            ADD TO CART
                    </button>
</Link>
            {this.props.quickAcces ? 
                    <div  className="modal">
                        <div className="modal-content">
                            <p className="modalMsg">Item has been added to the cart!</p>
                        </div>
                    </div> : null
            }
                    <p className="pdpCard_Description" dangerouslySetInnerHTML={{__html: item.description}}></p>
                </div> 
            </div>
        )
    }
}
Card.contextType = StoreContext;
export default Card