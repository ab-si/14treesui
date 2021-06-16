import React from 'react';
import './App.css';

const UserInfo = (props) => {
    return (
        <div>
            <div className="App-header">
                <div className="App-data">
                    <h1>Your Plant</h1>
                    <h2 className="card-title">Name : {props.name}</h2>
                    <h2 className="card-subtitle mb-2 text-muted">Your Tree: {props.contact}</h2>
                    <h5 className="card-subtitle mb-2 text-muted">Address: {props.address}</h5>
                </div>
                <div className="App-image">
                    <img src={props.image}  style={{width: 300, height: 300}}></img>
                </div>
            </div>
        </div>
    )
};

export default UserInfo