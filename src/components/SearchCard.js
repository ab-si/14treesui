import React from 'react';
import './Common.css'

class SearchCard extends React.Component {

    render(){
        return (
            <div onClick={() => this.props.onUserSelect(this.props.person_id)} className="ui card item">
                {/* <div className="ui slide masked reveal image">
                    <img src={this.props.image} className="visible content" />
                    <img src={this.props.tree_image} className="hidden content" />
                </div> */}
                <div className="content">
                    <div className="header">{this.props.name}</div>
                    {/* <div className="description">{this.props.tree_name}</div> */}
                </div>
            </div>
            )
    }
}

export default SearchCard;