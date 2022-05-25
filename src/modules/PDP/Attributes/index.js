import React, { Component } from "react";
import StoreContext from "../../../context/StoreContext";

export default class Attributes extends Component{

    state={
        atrClassLi: 'noColor',
        atrClassDiv: 'atrSquare',
        z:''
    }

    componentDidMount(){
        if (this.props.type === 'swatch'){
            
            this.setState({atrClassLi:'colorClass', atrClassDiv: 'atrSquareColor'})
        }
    }

    render(){
        let name = this.props.name
        let items = this.props.items
        return(
            <>
                <p className="atr_Name">{name}:</p>
                <div>
                    <ul className="atr_Box">
                        {items.map(item =>
                            <li className={this.state.atrClassLi}  key={item.id}>
                                <Details 
                                    display={item.value} 
                                    value={item.value} 
                                    name={name}
                                    inStock={this.props.inStock}
                                    atrClassDiv={this.state.atrClassDiv} 
                                    type={this.props.type}
                                    id={this.props.id}
                                    onSelectAtr={this.props.onSelectAtr}
                                    atrClassBgC={this.state.atrClassBgC}
                                    setStateOfParent = {this.props.setStateOfParent}
                                    atrClass={this.props.atrClassBgC}
                                    itemID={this.props.itemID}
                                    clickedCountCallback={this.props.clickedCountCallback}
                                    len={this.props.len}
                                   />
                            </li>
                        )}
                    </ul>
                </div>
            </>
        )
    }
}

export  class Details extends Component{
    
    state={
        atrClassBgC:'',
        atrClassC:'',
        detailBox:'',
        c: 'none',
        clicked: false,
        listW:'',
        allList:'',
        click: true,
        font:'',
        disable: false,
        allDisplay: this.props.display,
        atr_ID: this.props.itemID
        
    }
    componentDidMount(e){
        if(this.props.id === "With USB 3 ports"){
            this.setState({allDisplay: [this.props.display + "With USB 3 ports" ]})
        }
        if(this.props.id === "Touch ID in keyboard"){
            this.setState({allDisplay: [this.props.display + "Touch ID in keyboard" ]})
        }
        if(this.props.id === 'Size'){
            this.setState({atrClassBgC:'white'})
        }
        if (this.props.type === 'swatch'){
            
            this.setState({atrClassBgC: this.props.value, atrClassC:'transparent', font: '0'})
        }
        
        if (this.props.value === "#FFFFFF" || this.props.type !== 'swatch'){
            this.setState({c: '1px solid black'})
        }
        if (this.props.type !== 'swatch' && this.props.inStock === false){
            this.setState({atrClassC: '#A6A6A6', c: '1px solid #A6A6A6'})
        }
        if (this.props.inStock === false){
            this.setState({disable: true})
        }else{this.setState({disable: false})}
       
        if(this.props.id !== 'Size' && this.props.id !== 'Color' ){
            this.setState({atrClassBgC:'white'})
        }
    }
    onSquareGreen=(e) => {
        if(this.state.detailBox === '' && this.props.type === 'swatch'){
        this.setState({detailBox: 'detailsBox'})
        } else{
            this.setState({detailBox:''})
        }

        if(this.props.id === 'Size' && this.state.atrClassBgC ==='white' && this.props.inStock === true ){
            this.setState({atrClassBgC:'black', atrClassC: 'white'})
         
        } else if(this.state.type !== 'swatch' && this.props.inStock === false ){
            this.setState({atrClassC: '#A6A6A6', c: '1px solid #A6A6A6', atrClassBgC:'white'})
        }
        else if(this.props.id === 'Size' && this.state.atrClassBgC ==='black'){
            this.setState({atrClassBgC:'white', atrClassC: 'black'})
               
        }else if(this.props.id !== 'Size' && this.props.id !== 'Color' && this.state.atrClassBgC ==='white'){
            this.setState({atrClassBgC:'black', atrClassC: 'white'})

        }else if(this.props.id !== 'Size' && this.props.id !== 'Color' && this.state.atrClassBgC ==='black'){
            this.setState({atrClassBgC:'white', atrClassC: 'black'})
        }
        
    }

    render(){
       let atrClassC = this.state.atrClassC;
       let atrClassBgC = this.state.atrClassBgC;
       let detailBox = this.state.detailBox;
       let font = this.state.font
       let c = this.state.c;
        return(
            <div className={detailBox}>
                <button disabled={this.state.disable} value={this.state.allDisplay} id={this.state.atr_ID} name={this.props.len}
                    onClick ={ (e)=> {this.onSquareGreen(e);  this.props.onSelectAtr(e);}} 
                    style={{color: atrClassC , backgroundColor: atrClassBgC, border: c, fontSize: font }}  
                    className={this.props.atrClassDiv} >
                        {this.props.display}
                </button>
            </div>
        )
    }
}
Attributes.contextType = StoreContext;