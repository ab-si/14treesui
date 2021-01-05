import React from 'react';
import api from '../api/local';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import ResultDetail from './ResultDetail';
import Header from './Header';
import ResultCount from './ResultCount';
import Divider from '@material-ui/core/Divider';

class App extends React.Component {

    state = { 
        userCount: 0,
        locCount: 0,
        treeCount : 0,
        eventCount : 0,
        searchCountResult: [],
        searchResult: [],
        selectedInfo: null, 
        width: 0, 
        height: 0,
        term: '',
        displayResult: false,
        searchType:''
    }

    componentDidMount() {
        this.updateWindowDimensions();
      }

    onCountSearchSubmit = async (term) => {
        console.log(term)
        const res = await api.get('/api/v1/search/getcount', {
            params: { term : term }
        });

        this.setState({ 
            term: term,
            searchCountResult: res.data.data
        })
    }

    onTypeSelect = async (type) => {
        let res = null;
        switch (type) {
            case 'user':
                res = await api.get('/api/v1/search/user', {
                    params : {term : this.state.term}
                });
                break;
            case 'tree':
                res = await api.get('/api/v1/search/tree', {
                    params : {term : this.state.term}
                });
                break;
            case 'loc':
                res = await api.get('/api/v1/search/loc', {
                    params : {term : this.state.term}
                });
                break;
            case 'event':
                res = await api.get('/api/v1/search/event', {
                    params : {term : this.state.term}
                });
                break;
        }
        this.setState({
            searchResult: res.data.data,
            displayResult: true,
            selectedInfo: res.data.data[0],
            searchType: type
        })
    }

    onItemSelect = (item) => {
        const u = Object.keys(this.state.searchResult).filter(res => this.state.searchResult[res].id === item)
        this.setState({selectedInfo: this.state.searchResult[parseInt(u)]})
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    
    render() {

        let searchCount;
        if (this.state.searchCountResult.length === 0) {
            searchCount = "";
        } else {
            searchCount = <ResultCount result={this.state.searchCountResult[0]} onTypeSelect={this.onTypeSelect}/>;
        }

        let displayComponent;
        if (this.state.searchResult.length > 0){
            displayComponent = <ResultDetail data={this.state.selectedInfo}/>
        }
        return (
            <div className="ui fluid container">
                <Header />
                <SearchBar onSubmit={this.onCountSearchSubmit}/>
                <Divider variant="middle"/>
                {searchCount}
                {
                    this.state.displayResult
                            ?   <div className="ui grid" style={{"marginTop":"0.5rem"}}> 
                                    <div className="three wide column">
                                        {
                                            <SearchList onItemSelect={this.onItemSelect} type={this.state.searchType} data={this.state.searchResult} height={this.state.height}/>
                                        }
                                    </div>
                                    <div className="thirteen wide column">
                                        {displayComponent}
                                    </div>
                                </div>
                            : null
                }
            </div>
        )
    }
}

export default App