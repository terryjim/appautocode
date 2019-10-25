import React, { Component } from 'react'
import BigList from './BigList'
export default class main extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             a:1
        }
        //this.aa=this.aa.bind(this)
    }
    componentDidMount = () => {
      setInterval(()=>this.setState({a:this.state.a+1}),100)
    };
   
    aa(){alert(1)}
    render() {
        return (
            <div>
                {this.state.a}
                <BigList aa={()=>alert(11)}  />
            </div>
        )
    }
}
