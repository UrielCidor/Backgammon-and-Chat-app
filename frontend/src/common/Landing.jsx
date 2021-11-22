import { Component, Fragment } from "react";
import {Link} from 'react-router-dom'
import { Container, Button } from "semantic-ui-react";
import './Landing.css'

export default class Landing extends Component {
    render() {
        const { selfUser } = this.props;

        return (
            <Fragment>
                <div className="landing_background"></div>
                <Container className="landing_element">
                    <h1 className='landing_text landing_heading'>Backgammon and Chat Fun</h1>
                    <p className='landing_text landing_subheading'>
                        Play backgammon against your friends. Play today!
                    </p>
                    {selfUser ? (
                        <Button className='orange_button' size='large' as={Link} to='/play'>
                            Play
                        </Button>
                    ) : (
                        <Button
                            className='orange_button'
                            size='large'
                            as={Link}
                            to='/register'
                        >
                            Sign Up
                        </Button>
                    )}
                </Container>
            </Fragment>
        )
    }
}