import React, { Component } from 'react';
// import StoreContext, {StoreProvider} from '../context/StoreContext';

import Homepage from '../components/Homepage';
import Header from '../components/Header';
import PDP from '../components/PDP';
import Cart from '../components/Cart/Cart';
import Checkout from '../modules/Checkout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StoreContext from '../context/StoreContext';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h1: 'all',
      headerStyle:'headerLable',
      x: '',
      id: '',
      show: true,
      currency: '$',
      symbol: '$',
      s: false,
      arrowStyle: 'down',
      totalDatas: [],
      cart: [],
      atrEmpty: [],
      idCart: '',
      black: '',
      click: true,
      listW: '',
      atrClassBgC: '',
      count: '',
      countCart: '',
      value: [],
      b:[], 
      path:'/pdp/:id',
      bagCounter:'bag_Counter',
      quickAcces: false,
      
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  componentDidMount(){
  this.setState({x: 'updated'})
  this.context.handleCurrencyCallback(this.state.currency)
}

  onCategoryChange = (e) => {
    this.setState({ h1: e.target.textContent});
    
  };
  onSelect = (e) => {
    if (e.target.textContent === 'all') {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  };
  onCurrencyChange = (e) => {
    this.setState({
      currency: e.target.firstChild.textContent,
      symbol: e.target.firstChild.textContent,
      s: false,
      arrowStyle: 'down',
    }, () => {    this.context.handleCurrencyCallback(this.state.currency)}
    ); 
  };

  onCurrencyChange2 = () => {
    this.setState((prevState) => ({
      s: !prevState.s,
    }));
    if (this.state.arrowStyle === 'down') {
      this.setState({ arrowStyle: 'up' });
    } else {
      this.setState({ arrowStyle: 'down' });
    }
  };

  onQuickAdd= (e)=>{
    if (e.target.id === 'apple-airtag'){
      this.context.onAddtoCart(e);
      this.setState({quickAcces: true}, () => {
        setTimeout( () => {
          this.setState( prevState => ({
            quickAcces: false
          }));
        }, 3000);
      })

    } else{
      return false
    }
  }


  render() {

    const { h1 } = this.state;
    return (
      <Router>
        <Header
          onCategoryChange={this.onCategoryChange}
          headerStyle={this.state.headerStyle}
          onSelect={this.onSelect}
          onCurrencyChange={this.onCurrencyChange}
          onCurrencyChange2={this.onCurrencyChange2}
          symbol={this.state.symbol}
          show={this.state.show}
          s={this.state.s}
          arrowStyle={this.state.arrowStyle}
          bagCounter={this.state.bagCounter}
          currency={this.state.currency}
          x={this.state.x}

        />
        <Switch>
          <Route exact path='/'>
            <Homepage
              h1={h1}
              show={this.state.show}
              currency={this.state.currency}
              onQuickAdd={this.onQuickAdd}
              onAddtoCart={this.context.onAddtoCart}
            />
          </Route>
          <Route
            exact
            path= {this.state.path}
            render={(props) => (
              <PDP
                id={props.match.params.id}
                currency={this.state.currency}
                atrClassBgC={this.state.atrClassBgC}
                onSelectAtr={this.context.onSelectAtr}
                onAddtoCart={this.context.onAddtoCart}
                setStateOfParent={this.setStateOfParent}
                popup={this.context.popup}
                quickAcces={this.state.quickAcces}
              />
            )}
          />
          <Route path='/cart'>
          
            <Cart
              currency={this.state.currency}
              selectedID={this.context.selectedID}
              selectedAtr={this.context.selectedAtr}
              cart={this.state.cart}
              atrCart={this.context.atrCart}
              totalDatas={this.state.totalDatas}
              cartAll={this.context.cartAll}
              c={this.context.multyCartAll}
              totalCountCallback={this.totalCountCallback}
              updated={this.context.updated}
              
             
            />
          </Route>
          <Route path='/checkout'>
            <Checkout/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.contextType = StoreContext;
export default App;
