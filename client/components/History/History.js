import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { Button, Form, FormGroup, FormControl, Row, Col, ControlLabel, Panel, Checkbox } from 'react-bootstrap';
import _ from 'lodash';

import styles from './History.css';

export default class History extends Component {

    constructor(props) {
        super(props)

        this.state = {
            histories: [],
            user: {}
        }
    }

    componentWillMount() {
        const { messages } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user });
        this.setState({ histories: messages });
    }

    componentWillReceiveProps(nextProps) {
        const { sendMessage } = this.props;
        let { histories } = this.state;
        console.log(nextProps.response)
        if(nextProps.response !== false && sendMessage) {
            histories.push(nextProps.response);
            this.setState({ histories });
        }       
    }

    render() { 
        const { response } = this.props;
        const { histories, user } = this.state;

        return(
            <div className={styles['message-history']} id="message-history">
                {
                    _.map(histories, (history, index) => {
                        return (
                            <div key={index} className={history.from_user === user._id? styles['send-message']: styles['receive-message']}>
                                {history.content}
                            </div>
                       )
                    })
                }
            </div>
        )
    }
}