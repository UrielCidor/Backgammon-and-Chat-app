import { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import logo from '../images/main_logo.jpg';

export default class Navbar extends Component {
    state = { activeItem: 'home' };
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        const { selfUser, setSelfUser, inChatRoom } = this.props;

        return (
            <div>
                <Menu
                    pointing
                    secondary
                    className='navbar_items'>
                    <Menu.Item
                        as={NavLink}
                        // exact
                        to='/'
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        className='navbar_logo'>
                        <Image src={logo} size="small" />
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        {selfUser ? (
                            inChatRoom ? (
                                <Menu.Item
                                    as={NavLink}
                                    // exact
                                    to='/lobby'
                                    name='lobby'
                                    active={activeItem === 'lobby'}
                                    onClick={this.handleItemClick}
                                >Chat Room</Menu.Item>
                            ) : (
                                <Menu.Item
                                    as={NavLink}
                                    className='navbar_play'
                                    // exact
                                    to='/play'
                                    name='play'
                                    active={activeItem === 'play'}
                                    onClick={this.handleItemClick}
                                >
                                    Play Backgammon
                                </Menu.Item>
                            )
                        ) : null}
                        <Menu.Item
                            as={NavLink}
                            // exact
                            to='/about'
                            name='about'
                            active={activeItem === 'about'}
                            onClick={this.handleItemClick}
                        >
                            About
                        </Menu.Item>
                        {selfUser ? (
                            <Menu.Item
                                as={NavLink}
                                // exact
                                to='/profile'
                                name='profile'
                                active={activeItem === 'profile'}
                                onClick={this.handleItemClick}
                            >
                                Profile
                            </Menu.Item>
                        ) : null}
                        {selfUser ? (
							<Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={() => {
                                setSelfUser(null);
                                localStorage.removeItem('token');
                            }}
                        >
                            Log Out
                        </Menu.Item>
                        ) : (
                            <Fragment>
								<Menu.Item
									as={NavLink}
									// exact
									to='/register'
									name='register'
									active={activeItem === 'register'}
									onClick={this.handleItemClick}
									style={{ marginRight: '.5em' }}
								>
									Sign Up
								</Menu.Item>

								<Menu.Item
									as={NavLink}
									// exact
									to='/login'
									name='login'
									active={activeItem === 'login'}
									onClick={this.handleItemClick}
								>
									Log In
								</Menu.Item>
							</Fragment>
                        )}
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}