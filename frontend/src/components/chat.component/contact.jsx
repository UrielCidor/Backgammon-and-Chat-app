import { Component } from "react";

export default class Contact extends Component{
constructor(props){
    super(props);

    this.state ={
        contact: null
    }

}

componentDidMount(){
    const {contactName} = this.props;
    if(contactName != null) {
        this.setState({contact:contactName})
    }
}

    click = () =>{
        this.props.onClick(this.state.contact);
    }

    render(){
        const {contact} = this.state;
        return(
            <div onClick={this.click}>
                <div>{contact}</div>
            </div>
        )
    }
}