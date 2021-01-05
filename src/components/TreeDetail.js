import React from 'react';

const TreeDetail = ({ tree }) => {
    if(!tree){
        return <div>Loading...</div>
    }
    console.log(tree)
    return (
        <div className="ui segment">
            <img className="ui avatar tiny image"src={tree.user_image} />
            <h3 className="ui content">Name: {tree.name}</h3>
            <h4 className="ui description">Sapling ID: {tree.sapling_id}</h4>
            <h4 className="ui content">Tree Name: {tree.tree_name}</h4>
            <img src={tree.tree_image}/>
        </div>
    )
}

export default TreeDetail;