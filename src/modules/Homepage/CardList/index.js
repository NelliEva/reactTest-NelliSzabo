import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";

class CardList extends Component {
    constructor() {
        super();
        this.state = {
          c: ''  
        };
      }
  
    render() {
        return(
            <>
           <div className="cardContainer" >
                <ul className="cardUl">
                     {this.props.datas.filter(data => data.category === this.props.h1 ).map(filtereddatas =>(
                        <li className="cardLi" key={filtereddatas.id}  > 
                            <Link to={`pdp/${filtereddatas.id}`} onClick={this.props.onSelect} >
                                <Card 
                                    name={filtereddatas.name} 
                                    brand={filtereddatas.brand} 
                                    img={filtereddatas.gallery[0]}
                                    price={filtereddatas.prices} 
                                    id={filtereddatas.id}
                                    currency= {this.props.currency}
                                    inStock={filtereddatas.inStock}
                                    onAddtoCart={this.props.onAddtoCart}
                                    onQuickAdd={this.props.onQuickAdd}
                                    /> 
                            </Link>
                        </li>
                    ))
                     }
                    
                    {this.props.show &&  
                                    this.props.datas.map(datas=>
                                            <li className="cardLi" key={datas.id}  >
                                                <Link to={`pdp/${datas.id}`} onClick={this.props.onSelect} >
                                                    <Card 
                                                        name={datas.name} 
                                                        brand={datas.brand} 
                                                        img={datas.gallery[0]} 
                                                        price={datas.prices}
                                                        id={datas.id}
                                                        currency= {this.props.currency}
                                                        inStock={datas.inStock}
                                                        onAddtoCart={this.props.onAddtoCart}
                                                        onQuickAdd={this.props.onQuickAdd}
                                                        />
                                                </Link>
                                            </li>
                                        )}
            </ul>
           </div> 
           </>
        )
    }
}

export default CardList;