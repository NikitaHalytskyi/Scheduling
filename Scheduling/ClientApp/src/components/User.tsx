import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as UserStore from '../store/User';
import { LoginForm } from './LoginForm';
import { ProfileForm } from './Profile';
import '../style/LoadingAnimation.css';
import { LoadingAnimation } from './Loading';
import Cookies from 'js-cookie';

type UserProps =
    UserStore.UserState &
    typeof UserStore.actionCreators &
    RouteComponentProps<{}>;

const getUserData = async (token: string) => {
    const query = JSON.stringify({
        query: `{
        getUser{
            name
            surname
            email
            position
            department
            permissions
        }
        }`
    });
    
    return fetch('/graphql', {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: query
    })
    .then(data => data.json());
    };
    

class User extends React.PureComponent<UserProps, { isLoading: boolean, showError: boolean }>{
    public state = {
        isLoading: false,
        showError: false
    };
    
    async componentDidMount(){
        const token = Cookies.get('token');
        
        if(token){
            
            this.props.logIn(token);
            const data = await getUserData(token);    
            
            if(data.data){
                this.props.getData(data.data.getUser); 
            }
        }
      }

    public render(){
        
        if(!this.props.logged){
            if(!this.state.isLoading){
                return (
                    <LoginForm 
                        logIn = {(token: string) => this.props.logIn(token)}
                        toggleLoading = {this.toggleLoading}
                        setError = {(error: boolean) => this.setError(error)}
                        showError = {this.state.showError}
                        token = {this.props.token}
                        getData = {(userData: UserStore.UserData) => this.props.getData(userData)}/>
                );
            }
            return (<LoadingAnimation/>);
        }
        return (<ProfileForm logOut = {() => this.props.logOut()} user = {this.props.user}/>);
        
    }

    private toggleLoading = () => {
        this.setState({
            isLoading: !this.state.isLoading
        });
    }

    private setError(error: boolean) {
        this.setState({
            showError: error
        });
    }
};

export default connect(
    (state: ApplicationState) => state.loggedUser,
    UserStore.actionCreators
)(User);