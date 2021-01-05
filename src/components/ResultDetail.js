import React from 'react';

const ResultDetail = ({data}) => {
    if(!data){
        return <div>Loading...</div>
    }

    console.log(data)
    return (
        <div className="ui segment">
            {/* <img className="ui avatar tiny image"src={user.user_image} /> */}
            <h3 className="ui content">Name: {data.name}</h3>
            {/* <h4 className="ui description">Sapling ID: {user.sapling_id}</h4> */}
            {/* <h4 className="ui content">Tree Name: {user.tree_name}</h4> */}
            {/* <img src={props.tree_image}/> */}
        </div>
    )
}

export default ResultDetail;