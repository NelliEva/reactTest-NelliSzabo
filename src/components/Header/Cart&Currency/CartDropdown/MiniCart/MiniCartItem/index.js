import React, { Component } from "react";


export default class MiniCartItem extends Component{
    state={
        atrClassLi: 'noColor',
        atrClassDiv: 'mini_atrSquare',
        z:''  
    }

    componentDidMount(){
        if (this.props.type === 'swatch'){
            this.setState({atrClassLi:'colorClass', atrClassDiv: 'mini_atrSquareColor'})
        }       
    }

    render(){
        
        let name = this.props.name
        let items = this.props.items
        return(
            <>
                <p  className="mini_atr_Name">{name}:</p>
                <div>
                    <ul className="atrBox">
                        {items.map(item =>
                            <li className={this.state.atrClassLi}  key={item.id}>
                                <Details 
                                    atrSelected={this.props.atrSelected}
                                    atrSelected_Second={this.props.atrSelected_Second}
                                    atrSelected_Third={this.props.atrSelected_Third}
                                    display={item.value} 
                                    value={item.value} 
                                    atrClassDiv={this.state.atrClassDiv} 
                                    type={this.props.type} 
                                    id={this.props.id}
                                    valueKey={this.props.value}
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
        detailBox:'',
        atrClassBgC:'',
        atrClassC:'',
        atrWidth: ''
      
    }
    componentDidMount(){

        if (this.props.type === 'swatch'){
            
            this.setState({atrClassBgC: this.props.value, atrClassC:'transparent'})
        }
          if (this.props.type !== 'swatch' &&  this.props.atrSelected === this.props.display ){
            this.setState({atrClassBgC: 'black', atrClassC: 'white'})

        }
       
        else if (this.props.type === 'swatch' && this.props.atrSelected === this.props.display ){
            this.setState({detailBox: 'mini_detailsBox', })
        }
        
        else if(this.props.type !== 'swatch' && this.props.id === "With USB 3 ports" && this.props.atrSelected_Second === (this.props.display + "With USB 3 ports")){
            this.setState({atrClassBgC: 'black', atrClassC: 'white'})
        }
        else if(this.props.type !== 'swatch' && this.props.id === "With USB 3 ports" && this.props.atrSelected_Third === (this.props.display + "With USB 3 ports")){
            this.setState({atrClassBgC: 'black', atrClassC: 'white'})
        }
        else if(this.props.type !== 'swatch' && this.props.id === "Touch ID in keyboard" && this.props.atrSelected_Third === (this.props.display + "Touch ID in keyboard")){
            this.setState({atrClassBgC: 'black', atrClassC: 'white'})
        }
        else if(this.props.type !== 'swatch' && this.props.id === "Touch ID in keyboard" && this.props.atrSelected_Second === (this.props.display + "Touch ID in keyboard")){
            this.setState({atrClassBgC: 'black', atrClassC: 'white'})
        }

        if (this.props.type === 'swatch' && this.props.atrSelected_Second === this.props.display){
            this.setState({detailBox: 'mini_detailsBox', atrClassBgC: this.props.value, atrClassC:'transparent'})
        }
        
        if(this.props.display.length > 3 && this.props.type !== 'swatch'){
            this.setState({atrWidth:'2.7rem'})
        }
    }

    render(){
       let atrClassC = this.state.atrClassC;
       let atrClassBgC = this.state.atrClassBgC;
       let detailBox = this.state.detailBox;
       let atrWidth = this.state.atrWidth;
        return(
            <div className={detailBox}>
                <button value={this.props.display}
                style={{color: atrClassC , backgroundColor: atrClassBgC, width: atrWidth }}  
                className={this.props.atrClassDiv} >
                    {this.props.display}
                </button>
            </div>
        )
    }
}
