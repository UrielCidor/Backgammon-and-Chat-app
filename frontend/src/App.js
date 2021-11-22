import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navbar from './common/Navbar';
import Landing from './common/Landing';
import Login from './common/Login';
import Profile from './common/Profile';
import Register from './common/Register';
// import Verify from './common/Verify';
// import Resend from './Resend';
import About from './common/About';

// import Play from './common/Play';
// import Lobby from './Lobby';
// import Type from './Type';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.updateLobbyStatus = this.updateChatRoomStatus.bind(this);
	}

	state = {
		apiPath: 'http://localhost:8080/api',

		selfUser: null,
		loadingSelf: true,
		inChatRoom: false,
	};

	async componentDidMount() {
		// Try to retrieve the login token
		const token = localStorage.getItem('token');
		if (!token) {
			return this.setState({
				loadingSelf: false,
			});
		}

		const { apiPath } = this.state;

		try {
			// Authenticate the token and user using API route
			const res = await fetch(`${apiPath}/users/self`, {
				headers: {
					Authorization: token,
				},
			});
			if (!res.ok) throw res.status;
			const { user } = await res.json();

			this.setState({
				selfUser: user,
				loadingSelf: false,
			});
		} catch (err) {
			console.log(err);
			this.setState({
				loadingSelf: false,
			});
		}
	}

	setSelfUser(selfUser, token) {
		this.setState({
			selfUser,
		});
	}

	// https://stackoverflow.com/questions/34734301/passing-data-between-two-sibling-react-js-components
	// updateLobbyStatus is a function that is passed between the lobby, play, and type components so that there is synchronization of the user's inLobby status
	updateChatRoomStatus(status) {
		this.setState({
			inChatRoom: status,
		});
	}

	render() {
		const { apiPath, selfUser, loadingSelf, inChatRoom } = this.state;

		// If still loading, render a loader on the page
		if (loadingSelf) {
			return <div className='ui massive active loader' />;
		}

		const setSelfUser = this.setSelfUser.bind(this);

		return (
			<Container className='app_container'>
				<BrowserRouter>
					<Navbar
						selfUser={selfUser}
						setSelfUser={setSelfUser}
						inChatRoom={inChatRoom}
					/>
					{/* <Switch> */}
          <Routes>
						<Route
							exact path='/'
              element={<Landing apiPath={apiPath} selfUser={selfUser}/>}
							render={(props) => (
								<Landing {...props} apiPath={apiPath} selfUser={selfUser} />
							)}
						/>
						<Route
							exact path='/login'
              element={<Login apiPath={apiPath} selfUser={selfUser} setSelfUser={setSelfUser} />}
							render={(props) => (
								<Login
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									setSelfUser={setSelfUser}
								/>
							)}
						/>
						<Route
							exact path='/about'
							element={<About apiPath={apiPath} selfUser={selfUser}/>}
              render={(props) => (
								<About {...props} apiPath={apiPath} selfUser={selfUser} />
							)
            }
						/>
						<Route
							exact path='/profile'
              element={<Profile apiPath={apiPath} selfUser={selfUser}/>}
							render={(props) => (
								<Profile {...props} apiPath={apiPath} selfUser={selfUser} />
							)}
						/>
						<Route
							exact path='/register'
              element={<Register apiPath={apiPath}
              selfUser={selfUser}
              setSelfUser={setSelfUser}/>}
							render={(props) => (
								<Register
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									setSelfUser={setSelfUser}
								/>
							)}
						/>
						{/* <Route
							path='/verify/:id'
              element={<Verify
                apiPath={apiPath}
                selfUser={selfUser}
                setSelfUser={setSelfUser}/>}
							render={(props) => (
								<Verify
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									setSelfUser={setSelfUser}
								/>
							)}
						/> */}
						{/* <Route
							exact
							path='/resend'
							render={(props) => (
								<Resend
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									setSelfUser={setSelfUser}
								/>
							)}
						/> */}

            {/* <Route
              exact
              path='/play'
              element={<Play
                apiPath={apiPath}
                selfUser={selfUser}
                setSelfUser={setSelfUser}
                inChatRoom={inChatRoom}
                updateLobbyStatus={this.updateLobbyStatus}/>}
              render={(props) => (
                <Play
                  {...props}
                  apiPath={apiPath}
                  selfUser={selfUser}
                  setSelfUser={setSelfUser}
                  inChatRoom={inChatRoom}
                  updateLobbyStatus={this.updateLobbyStatus}
                />
              )}
            /> */}
						{/*<Route
							exact
							path='/lobby'
							render={(props) => (
								<Lobby
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									setSelfUser={setSelfUser}
									inChatRoom={inChatRoom}
									updateLobbyStatus={this.updateLobbyStatus}
								/>
							)}
						/>
						<Route
							exact
							path='/type'
							render={(props) => (
								<Type
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
									setSelfUser={setSelfUser}
									inChatRoom={inChatRoom}
									updateLobbyStatus={this.updateLobbyStatus}
								/>
							)}
              /> */}
					{/* </Switch> */}
          </Routes>
				</BrowserRouter>
			</Container>
		);
	}
}