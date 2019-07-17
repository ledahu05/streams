import React, { Component } from 'react'
import keys from '../config/keys';

class GoogleAuth extends Component {

    componentDidMount() {
        //console.log(keys);
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: keys.google_clientId,
                scope: 'email'
            });
        });

    }
    render() {
        return (
            <div>
                GoogleAuth
            </div>
        )
    }
}

export default GoogleAuth;
