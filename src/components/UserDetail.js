import React from 'react';

const UserDetail = ({ user }) => {
    if(!user){
        return <div>Loading...</div>
    }
    return (
        <div className="ui segment">
            <img className="ui avatar tiny image"src={user.user_image} />
            <h3 className="ui content">Name: {user.name}</h3>
            <h4 className="ui description">Sapling ID: {user.sapling_id}</h4>
            <h4 className="ui content">Tree Name: {user.tree_name}</h4>
            <img src={user.tree_image}/>
        </div>
    )
}

export default UserDetail;