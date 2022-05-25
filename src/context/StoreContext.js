import React, {Component} from "react";
import axios from "axios";

const StoreContext = React.createContext();

export class StoreProvider extends Component{
  constructor(props) {
    super(props);
    this.state= {
        data: {
            data:{
            category: {
                products:[
                  
                ]  
            }
            }
        },
        d:[],
        datas:[],
        attributes:[],
        selectedID: '',
        selectedAtr: [],
        atrCart: [],
        multyAtrCart:[],
        cartAll: [],
        multyCartAll:[],
        popup: false,
        quantity: [],
        quantity2:[],
        price:[],
        sumQuantity:'',
        sumPrices:'',
        Tax: '',
        allKeys:[],
        filteredPriceAmount:[],
        counter:[],
        counter2:[],
        disable: true,
        updated: false, 
        selectedAtrLen:[],
        AllselectedItem:[],
        multyArtRes: [],
        result_1:[],
        result_2:[],
        result_3:[],
        firstQuantity:[],
        list:[], 
        currency:[]
    }
  }
    componentDidMount(){
      this.X()

    }
    X() {
        axios({
            url: 'http://localhost:4000/',
            method: 'post',
            data: {
              query: `
              query category($categoryInput: CategoryInput) {
                category(input: $categoryInput) {
                    products{
                     id
                     brand
                    name
                    gallery
                    inStock
                    category
                    description
                    attributes{
                      id
                      name
                      type
                      items{
                        displayValue
                        value
                        id
                      }
                    }
                    prices{
                      currency{
                        label
                        symbol
                      }
                      amount
                    }
                  }
                }
              }
                `
            }
          }).then((result) => {
       
           this.setState({
            data:  result.data
          })
          })
         
      }

  onSelectAtr = (e) => { 
        this.setState({ selectedID: e.target.id });
        this.setState({ selectedAtr: e.target.value });
        this.setState({selectedAtrLen: e.target.name})
    
        let datas =[]
         this.state.data.data.category.products.map(data =>  
          datas.push(data)
          )

        this.setState((prevState) => ({
          atrCart: [
            ...prevState.atrCart,
            [prevState.selectedID, prevState.selectedAtr, prevState.selectedAtrLen],
          ],
        }));
      };
     
  onAddtoCart = (e) => {
      let datas =[]
      this.state.data.data.category.products.map(data =>  
         datas.push(data)
         )

      datas.forEach( data =>
      {
          if(data.attributes.length === 0 && data.id === e.target.id){
          this.state.atrCart.push([ e.target.id, '', 0])
          }
        }) 
      ///////Calculation what was really selected/////////////  
      const count = {};

      this.state.atrCart.forEach(element => {
              count[element] = (count[element] || 0) + 1;
            });

      let allKeys = []
        for (let [key, value] of Object.entries(count)) {
                if(value % 2 !== 0 ){
                allKeys.push(key) 
        }
      }

      let atrResult = []
      allKeys.filter(x => x.split(',')[0] === e.target.id).map(
        res => atrResult.push(res)
      )
      ///////Actions if not all attributes are selected/////////////
      let atrLength 
      datas.filter(f => f.id === e.target.id).map(el => atrLength = (el.attributes.length))

            if((atrLength === 2 && atrResult.length % 2 !== 0) 
                || 
                (atrLength === 3 && atrResult.length % 3 !== 0) 
                || 
                (atrLength === 1 && atrResult.length === 0) 
                )
                {
                  this.setState({atrCart: ''}, () => {
                    alert( "Please select your preferences.");
                  })
                }
            else if( (atrLength === 2 && atrResult.length % 2 === 0)
                  || 
                  (atrLength === 3 && atrResult.length % 3 === 0)
                  ||
                  (atrLength === 1 && atrResult.length % 1 === 0)
                  ||
                  (atrLength === 0 )
                )
                {
                  this.setState({AllselectedItem: allKeys})  
                  this.setState({updated: true})
                  this.setState(prevState => ({
                      popup: !prevState.popup
                    }));

                  setTimeout( () => {
                        this.setState( prevState => ({
                          popup: false
                        }));
                      }, 3000);
                }
      }
//////////////////CALLBACKs - datas from childs///////////////////////////////
      handleCountCallback = (childCount) =>{
        this.setState((prevState) => ({
            quantity: 
             [
               ...prevState.quantity,
             childCount
             ]
          }
          ));

          this.setState((prevState) => ({
            counter: 
             [
               ...prevState.counter,
             childCount
             ]
          }
          ));
        }  

        handleCountCallback2 = (childCount2) =>{
          this.setState((prevState) => ({
            quantity2: 
             [
               ...prevState.quantity2,
             childCount2,
             
             ]
          }));
          console.log(childCount2)

          this.setState((prevState) => ({
            counter2: 
             [
               ...prevState.counter2,
             childCount2
             ]
          }
          ));
        }
        handleCurrencyCallback =(childCurrency) => {
            this.setState({currency: childCurrency})
      
        }
   
  render(){
  
        let datas =[]
        let attributes =[]
        this.state.data.data.category.products.map(data =>  datas.push(data))

      
    //////Added Items regroupping according their attributes////////
      let array = []
      this.state.AllselectedItem.map(x => 
        array.push(x.split(','))
      )
      
      let result_0 = [];
      array.filter(a => a[2] === '0').map(filteredArr => result_0.push(filteredArr))
      let result_1 = [];
      array.filter(a => a[2] === '1').map(filteredArr => result_1.push(filteredArr))
        
      let filtered_2 = [];
      let result_2 = [];
        array.filter(a => a[2] === '2').map(filteredArr => filtered_2.push(filteredArr))

          const res2 = [];
          const result2 =[];
            for (let i = 0; i < filtered_2.length; i += 2) {
                const chunk = filtered_2.slice(i, i + 2);
                res2.push(chunk);  
            }
            
          res2.map(r => result2.push([...new Set(r[0].concat(r[1]))]))
          result_2 = result_2.concat(result2)


      let filtered_3 = []
      let result_3 = [];
        array.filter(a => a[2] === '3').map(filteredArr => filtered_3.push(filteredArr))
          
          const res3 = [];
          const result3 =[];
            for (let i = 0; i < filtered_3.length; i += 3) {
                const chunk = filtered_3.slice(i, i + 3);
                res3.push(chunk);  
              }
              
          res3.map(r => result3.push([...new Set(r[0].concat(r[1], r[2]))]))
          result_3 = result_3.concat(result3)


      let All = [];
      All.push(result_0, result_1, result_2, result_3)

      let AllinCart = All.flat()

          ////////Calculations of totals////////////////////////
      let itemsList = []
          AllinCart.map(x => itemsList.push([x[0].concat(',', x[1]), 1]))
 
        ////////Totals on Cart////////////////////////////////  
      let quantity = itemsList.concat(this.state.quantity)

      let quantities = quantity.reduce((acc, cur) => {
              acc[cur[0]] ? acc[cur[0]].push(cur[1]) : acc[cur[0]] = [ cur[1] ];
                return acc
                }, {});       
                
      let idList =[]
      let quantityList =[]
            for (const [key, value] of Object.entries(quantities)) {
              quantityList.push(value[value.length -1])
              idList.push(key.split(',')[0])
            }

      const initialQuantity = 0;
      const sumQuantity = quantityList.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          initialQuantity
        )

      let price =[]

      idList.forEach(id => {
        datas.filter(f => f.id === id)
          .map(x => x.prices.filter(p => p.currency.symbol === this.state.currency)
            .map(filteredprice => price.push(filteredprice.amount)))
      })
   
      const totalPrice = price.map((e, i) => e * quantityList[i]);
      const initialValue = 0;
      const sumPrice = totalPrice.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
          );

      const sumPrices = sumPrice.toFixed(2)
      const Tax = (sumPrice * 0.20).toFixed(2)

      //////////Totals on Mini-Cart///////////////////////////////////
      let quantity_2 = itemsList.concat(this.state.quantity2)

      let quantities_2 = quantity_2.reduce((acc, cur) => {
              acc[cur[0]] ? acc[cur[0]].push(cur[1]) : acc[cur[0]] = [ cur[1] ];
                return acc
                }, {});       
                
      let idList_2 =[]
      let quantityList_2 =[]
            for (const [key, value] of Object.entries(quantities_2)) {
              quantityList_2.push(value[value.length -1])
              idList_2.push(key.split(',')[0])
            }

      const initialQuantity_2 = 0;
      const sumQuantity_2 = quantityList_2.reduce(
          (previousValue_2, currentValue_2) => previousValue_2 + currentValue_2,
          initialQuantity_2
        )
        
      let price_2 =[]

      idList_2.forEach(id => {
        datas.filter(f => f.id === id)
          .map(x => x.prices.filter(p => p.currency.symbol === this.state.currency)
            .map(filteredprice => price_2.push(filteredprice.amount)))
      })
   
      const totalPrice_2 = price_2.map((e, i) => e * quantityList_2[i]);
      const initialValue_2 = 0;
      const sumPrice_2 = totalPrice_2.reduce(
            (previousValue_2, currentValue_2) => previousValue_2 + currentValue_2,
            initialValue_2
          );

      const sumPrices_2 = sumPrice_2.toFixed(2)
     ///////////Bag Counter Style////////////////////////////////////// 
      let bagStyle=''
      if(sumQuantity === 0){
         bagStyle = 'nobag_Counter'
      }else if(sumQuantity > 0){
         bagStyle = 'bag_Counter'
      }
     
        const { onSelectAtr, 
                onAddtoCart, 
                handleCountCallback, 
                handleCountCallback2,
                handleCurrencyCallback} = this;
        const { popup, 
                selectedID, 
                selectedAtr, 
                selectedAtr2, 
                atrCart, 
                multyCartAll, 
                cartAll, 
                counter, 
                counter2, 
                updated,
                AllselectedItem,
                disable,
              firstQuantity,
            } = this.state

        return(
            <StoreContext.Provider value={{
            quantity,  datas,attributes, popup,selectedID, selectedAtr, selectedAtr2, atrCart, multyCartAll, cartAll, sumQuantity, sumPrices, Tax, counter, counter2, 
            bagStyle, updated, disable, AllselectedItem, AllinCart, firstQuantity, sumQuantity_2, sumPrices_2,
                onSelectAtr,
                onAddtoCart,
                handleCountCallback,
                handleCountCallback2,
                handleCurrencyCallback,
            }}>
              
                {this.props.children}
            </StoreContext.Provider>
        )
    }
}

export default StoreContext;