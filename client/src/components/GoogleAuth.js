import React, { Component } from 'react'
import keys from '../config/keys';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
    
    componentDidMount() {
        //console.log(keys);
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: keys.google_clientId,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });

    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();   
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick =() => {
        this.auth.signOut();
    }
    
    
    

    renderAuthButton() {
        const {isSignedIn} = this.props;
        if(isSignedIn === null) {
           return null;
        } else if (isSignedIn) {
           return (
           <button className="ui red google button" onClick={this.onSignOutClick}>
                   <i className="google icon" />Sign Out 
           </button>
           );
       } else {
           return (
               <button className="ui red google button" onClick={this.onSignInClick}>
                   <i className="google icon" />Sign In with Google
               </button>
           );
       }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
