import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

export default function ResultCount(props) {

    const handlePageChange = (event, value) => {
        props.handlePageChange(value);
    }

    return (
        <div className="ui center aligned" style={{"display":"inline-flex", 'marginTop':5, 'marginLeft':10}}>
            <div className="field">
                <h5>Search results for your query:</h5>
                {
                    props.result.user_count > 0
                        ? <button className="ui primary basic active button" onClick={() => props.onTypeSelect('user')}>Persons ({props.result.user_count})</button>
                        : <button className="ui primary basic disabled button" >Persons ({props.result.user_count})</button>
                }
                {
                    props.result.tree_count > 0
                        ? <button className="ui primary basic active button" onClick={() => props.onTypeSelect('tree')}>Trees ({props.result.tree_count})</button>
                        : <button className="ui primary basic disabled button" >Trees ({props.result.tree_count})</button>
                }
                {
                    props.result.event_count > 0
                        ? <button className="ui primary basic active button" onClick={() => props.onTypeSelect('event')}>Campaigns ({props.result.event_count})</button>
                        : <button className="ui primary basic disabled button" >Campaigns ({props.result.event_count})</button>
                }
                {
                    props.result.loc_count > 0
                        ? <button className="ui primary basic active button" onClick={() => props.onTypeSelect('loc')}>Locations ({props.result.loc_count})</button>
                        : <button className="ui primary basic disabled button" >Locations ({props.result.loc_count})</button>
                }
                <Pagination onChange={handlePageChange} count={Math.floor(props.selectedSearchCount / 10) + 1} color="primary" size="medium" siblingCount={1} style={{"marginLeft":15, "display":"inline-block"}}/>
            </div>
        </div>
    )
}
