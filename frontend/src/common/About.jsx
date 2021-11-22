import { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";

export default class About extends Component{
    render(){
        return(
            <Fragment>
                <h1>About</h1>
                <Container className="landing_about">
                    <p>
                        Online backgammon game with chat created using MERN stack.
                        utlizies socket.io for real time chat and play.
                    </p>
                </Container>
            </Fragment>
        );
    }
}