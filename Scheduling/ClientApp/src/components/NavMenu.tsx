import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import './NavMenu.css';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/User/actions';
import { UserState } from '../store/User/types';

type UserProps =
    UserState &
    typeof actionCreators &
    RouteComponentProps<{}>;


class NavMenu extends React.PureComponent<UserProps, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        if(this.props.logged)
            return (
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">Scheduling</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} className="mr-2"/>
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/vacationrequest">Vacation</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
            );
        else
            return (
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">Scheduling</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} className="mr-2"/>
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
            );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => state.loggedUser,
    actionCreators
)(NavMenu);
