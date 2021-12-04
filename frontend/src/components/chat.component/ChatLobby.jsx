import { Component } from "react";
import MessagePanel from './MessagePanel';
import Contact from './contact';
// import { Link, Navigate } from 'react-router-dom';
// import {
//     Button,
//     Icon,
//     Card,
//     Container,
//     Message,
//     Popup,
// } from 'semantic-ui-react';

import socket from '../../socketConfig';

export default class ChatLobby extends Component {
    constructor(props) {
        super(props);

        const { selfUser } = this.props;

        this.state = {
            username: selfUser.username,
            selfUser: selfUser,
            contacts: null,
            channel: null,
            onlines: [],
            channelChat: null
        }
    }

    loadContacts = async () => {
        const { apiPath } = this.props;
        try {
            const res = await fetch(
                `${apiPath}/chat/getContacts`
            );
            let data = await res.json();
            console.log(data);
            this.setState({
                contacts: data.users
            });
        } catch (err) {
            console.log('error!', err);
        };
    }

    loadChannelChat = async (username, channel) => {
        const {apiPath} = this.props;
        try {
            const res = await fetch(
                `${apiPath}/chat/getChat/?user1=${username}&user2=${channel}`
            );
            let data = await res.json();
            console.log(data.chat.messages);
            this.setState({
                channelChat: data.chat.messages
            });
        } catch (err) {
            console.log('error finding channel chat!', err);
            this.setState({channelChat:null})
        };

    }

    handleChannelSelected = contactName => {
        let channel = this.state.contacts.find(c => {
            return c.username === contactName;
        });
        this.loadChannelChat(this.state.username, contactName);
        console.log('channel changed')
        this.setState({ channel });
        
    }

    handleSendMessage = (channel, text) => {
        socket.emit("send-message", {channel, text, sender: this.state.username, timeId: Date.now()});
        //update chat messages after sending mesage.
        this.loadChannelChat(this.state.username, channel.username);
        this.setState({channel});
    }


    configureSocket = () => {
        const {username} = this.state;

        socket.on('getOnlines', (onlines) => {
            console.log(onlines);
            this.setState({onlines})

        });
        socket.emit('online', username);

        //update chat messages when user send message to this chat
        socket.on('message', chat => {
            console.log("message recieved to this chat: ", chat);
            if(chat.users.includes(username) && chat.users.includes(this.state.channel)){
                this.loadChannelChat(username, this.state.channel);
            };
        });
    }

    disconnectSocket = () =>{
        const {username} = this.state;

        socket.emit('offline', username);
    }

    componentDidMount() {
        this.loadContacts();
        this.configureSocket();
        
    }

    componentWillUnmount(){
        this.disconnectSocket();
    }
    render() {

        const { contacts, username, selfUser, channel, onlines, channelChat } = this.state;

        let contactsList = 'there are no contacts yet.';

        if (contacts) {
            contacts.forEach(c => {
                contactsList = contacts.map(c =>
                    c.username === username ?
                        null : onlines.includes(c.username) ?
                            <li className="online" key={c._id}>
                                <Contact onClick={this.handleChannelSelected} contactName={c.username} />
                            </li> :
                            <li className="offline" key={c._id}>
                                <Contact onClick={this.handleChannelSelected} contactName={c.username} />
                            </li>
                );
            })
        };

        return (
            <div className="mainChatPanel">
                <div>
                    <h3>contacts</h3>
                    <p>Me: {username}</p>
                    <ul>
                        {contactsList}
                    </ul>
                </div>
                <div>
                <MessagePanel 
                                selfUser={selfUser} 
                                contact={channel} 
                                messages={channelChat}
                                onSendMessage={this.handleSendMessage}
                                apiPath={this.props.apiPath}/>
                </div>
            </div>
        )
    }
}