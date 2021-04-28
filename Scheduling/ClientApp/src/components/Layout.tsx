import * as React from 'react';
import Cookies from "js-cookie";
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export default (props: { children?: React.ReactNode }) => { 
    return (
        <React.Fragment>
            <NavMenu/>
            <Container>
                {props.children}
            </Container>
        </React.Fragment>
    );
};
