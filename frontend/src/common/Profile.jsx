import { Component, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

export default class Profile extends Component {
	constructor(props) {
		super(props);

		const { selfUser } = this.props;

		this.state = {
			username: selfUser.username,
			gamesCompleted: 0,
			gamesWon: 0,
		};
	}

	async componentDidMount() {
		const { selfUser, apiPath } = this.props;
		try {
			const res = await fetch(
				`${apiPath}/profile?username=${selfUser.username}`
			);
			const { user } = await res.json();
			this.setState({
				gamesCompleted: user.gamesCompleted,
				gamesWon: user.gamesWon,
			});
		} catch (err) {
			console.log('error', err);
		}
	}

	render() {
		const { selfUser } = this.props;
		const { username, gamesCompleted, gamesWon } = this.state;

		if (!selfUser) {
			return <Navigate to='/' />;
		}

		return (
			<Fragment>
				<div className='profile_background'></div>
				<h1>Profile Page</h1>
				<Card>
					<Card.Content>
						<Card.Header textAlign={'center'}>{username}</Card.Header>
					</Card.Content>
					<Card.Content>
						<Card.Description>
							Races Completed: {gamesCompleted}
						</Card.Description>
						<Card.Description>Races Won: {gamesWon}</Card.Description>
					</Card.Content>
				</Card>
			</Fragment>
		);
	}
}