import React,{Component} from "react";
import axios from "axios";


class CurrencyList extends Component{

    state = {
        data: {
            data:{
            currencies: []
            }
        },
        
    }
    componentDidMount() {
        axios({
            url: 'http://localhost:4000/',
            method: 'post',
            data: {
              query: `
              query currencies{
                currencies{
                  symbol
                  label
                }
                
              }
                `
            }
          }).then((result) => {
           console.log(result.data)
           this.setState({
            data:  result.data
          })
          })
      }
    render() {
        return(
            <div className="currencyListContainer">
                <ul className="currencyListBox">
                    {this.state.data.data.currencies.map(currencies =>
                        <li className="currency_list" key={currencies.symbol} >
                           <button onClick={this.props.onCurrencyChange}>{currencies.symbol} {currencies.label}</button>   
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default CurrencyList;