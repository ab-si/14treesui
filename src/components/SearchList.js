import React from 'react';
import SearchCard from './SearchCard';

const SearchList = (props) => {

    var scope = {
        newHeight: {
            height: props.height
        }
    };

    const result = props.data.map((e) => {
        return <SearchCard onUserSelect={props.onUserSelect} id={e.person_id} name={e.name}/>
    });
    
    return (
        <div className="ui cards" style={{"height": `${props.height - 140}px`, 'overflow': 'auto'}}>
            {result}
        </div>
        )
    
}

export default SearchList;