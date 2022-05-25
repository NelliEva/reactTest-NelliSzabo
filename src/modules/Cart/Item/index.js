import React, { Component } from "react";


export default class Item extends Component{
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
                <p  className="atr_Name">{name}:</p>
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
      
    }
    componentDidMount(){

        if (this.props.type === 'swatch'){
            
            this.setState({atrClassBgC: this.props.value, atrClassC:'transparent'})
        }
          if (this.props.type !== 'swatch' &&  this.props.atrSelected === this.props.display ){
            this.setState({atrClassBgC: 'black', atrClassC: 'white'})

        }
       
        else if (this.props.type === 'swatch' && this.props.atrSelected === this.props.display ){
            this.setState({detailBox: 'detailsBox', })
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
            this.setState({detailBox: 'detailsBox', atrClassBgC: this.props.value, atrClassC:'transparent'})
        }
    }

    render(){
       let atrClassC = this.state.atrClassC;
       let atrClassBgC = this.state.atrClassBgC;
       let detailBox = this.state.detailBox;
        return(
            <div className={detailBox}>
                <button value={this.props.display}
                style={{color: atrClassC , backgroundColor: atrClassBgC }}  
                className={this.props.atrClassDiv} >
                    {this.props.display}
                </button>
            </div>
        )
    }
}
