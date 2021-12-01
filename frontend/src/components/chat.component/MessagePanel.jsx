import { Component } from "react";
// import socket from '../../socketConfig';


export default class MessagePanel extends Component {

    state = {input_value: ""}

    handleInput = e => {
        this.setState({input_value: e.target.value});
    }

    send = () =>{
        if(this.state.input_value && this.state.input_value !== ''){
            this.props.onSendMessage(this.props.contact, this.state.input_value);
            this.setState({input_value:''});
        }
    }
    

    render() {
        const { selfUser, contact, messages } = this.props;

        let messageList;
        console.log(messages);
        if (messages) {
            messages.forEach(m => {
                messageList = messages.map(msg =>
                    <li key={msg.id}>{msg.message}</li>
                )
            })
        } else{
            messageList = 'there are not messages yet';
        }

        return (
            <div>
                <h2>{selfUser.username} chat with {(contact)? contact.username : ""}</h2>
                <div>
                    {messageList}
                </div>
                <div>
                    <input type="text" onChange={this.handleInput} value={this.state.input_value}/>
                    <button onClick={this.send}>send</button>
                </div>
            </div>
        )
    }
}