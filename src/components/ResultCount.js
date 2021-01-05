import React from 'react';

class ResultCount extends React.Component {

    render() {
        // const person = renderPerson(this.props.result.person_count);
        return (
            <div className="ui center aligned" style={{"display":"inline-flex", 'marginTop':5, 'marginLeft':10}}>
                <div className="field">
                    <h5>Search results for your query:</h5>
                    {
                        this.props.result.person_count > 0
                            ? <button className="ui primary basic active button" onClick={() => this.props.onTypeSelect('user')}>Persons ({this.props.result.person_count})</button>
                            : <button className="ui primary basic disabled button" >Persons ({this.props.result.person_count})</button>
                    }
                    {
                        this.props.result.tree_count > 0
                            ? <button className="ui primary basic active button" onClick={() => this.props.onTypeSelect('tree')}>Trees ({this.props.result.tree_count})</button>
                            : <button className="ui primary basic disabled button" >Trees ({this.props.result.tree_count})</button>
                    }
                    {
                        this.props.result.event_count > 0
                            ? <button className="ui primary basic active button" onClick={() => this.props.onTypeSelect('event')}>Campaigns ({this.props.result.event_count})</button>
                            : <button className="ui primary basic disabled button" >Campaigns ({this.props.result.event_count})</button>
                    }
                    {
                        this.props.result.loc_count > 0
                            ? <button className="ui primary basic active button" onClick={() => this.props.onTypeSelect('loc')}>Locations ({this.props.result.loc_count})</button>
                            : <button className="ui primary basic disabled button" >Locations ({this.props.result.loc_count})</button>
                    }
                </div>
            </div>
        )
    }
}

export default ResultCount;