import React, { Component } from 'react';
import AllCards from './AllCards';
import StoreContext from '../../context/StoreContext';

class Homepage extends Component{
    render() {
        return(
            <div className='mainContainer'>
                 <h1 onChange={this.onChangeH} >{this.props.h1}</h1>
                <AllCards  
                    show={this.props.show} 
                    h1={this.props.h1} 
                    currency={this.props.currency}
                    onQuickAdd={this.props.onQuickAdd}
                    onAddtoCart={this.props.onAddtoCart}/>
            {this.context.popup &&
                    <div  className="modal">
                        <div className="modal-content">
                            <p className="modalMsg">Item has been added to your cart!</p>
                        </div>
                    </div>
            }
            </div>
        )
    }
}

Homepage.contextType = StoreContext;
export default Homepage;