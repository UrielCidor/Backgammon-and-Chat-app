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

import ChatLobby from './components/chat.component/ChatLobby';
import './components/chat.component/chat.css'


export default class App extends Component {

	state = {
		apiPath: 'http://localhost:8080/api',

		selfUser: null,
		loadingSelf: true,
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
			selfUser
		});
	}


	render() {
		const { apiPath, selfUser, loadingSelf } = this.state;

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
					/>
					{/* <Switch> */}
          <Routes>
						<Route
							exact path='/'
							element={<Landing apiPath={apiPath} selfUser={selfUser} />}
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
						<Route
							exact path='/chatLobby'
              element={<ChatLobby apiPath={apiPath}
              selfUser={selfUser}
              setSelfUser={setSelfUser}/>}
							render={(props) => (
								<ChatLobby
									{...props}
									apiPath={apiPath}
									selfUser={selfUser}
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

          </Routes>
				</BrowserRouter>
			</Container>
		);
	}
}