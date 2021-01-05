import React from 'react';
import api from '../api/local';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import UserDetail from './UserDetail';
import Header from './Header';
import ResultCount from './ResultCount';

class App extends React.Component {

    state = { 
        userCount: 0,
        locCount: 0,
        treeCount : 0,
        eventCount : 0,
        searchCountResult: [],
        userSearchResult : [],
        eventSearchResult : [],
        locSearchResult : [],
        treeSearchResult : [],
        selectedInfo: null, 
        width: 0, 
        height: 0,
        term: '',
        displayResult: false
    }

    componentDidMount() {
        this.updateWindowDimensions();
      }

    onCountSearchSubmit = async (term) => {
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
                this.setState({
                    userSearchResult: res.data.data,
                    displayResult: true,
                    selectedInfo: res.data.data[0]
                });
                console.log(this.state.selectedInfo)
                break;
            case 'tree':
                res = await api.get('/api/v1/search/tree', {
                    params : {term : this.state.term}
                });
                this.setState({
                    treeSearchResult: res.data.data,
                    displayResult: true,
                    selectedInfo: res.data.data[0]
                })
                break;
            case 'loc':
                res = await api.get('/api/v1/search/loc', {
                    params : {term : this.state.term}
                });
                this.setState({
                    locSearchResult: res.data.data,
                    displayResult: true,
                    selectedInfo: res.data.data[0]
                })
                break;
            case 'event':
                res = await api.get('/api/v1/search/event', {
                    params : {term : this.state.term}
                });
                this.setState({
                    eventSearchResult: res.data.data,
                    displayResult: true,
                    selectedInfo: res.data.data[0]
                })
                break;
        }
    }

    onUserSelect = (user) => {
        const u = Object.keys(this.state.userSearchResult).filter(res => this.state.userSearchResult[res].person_id === user)
        this.setState({selectedInfo: this.state.userSearchResult[parseInt(u)]})
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
        if (this.state.userSearchResult.length > 0){
            displayComponent = <UserDetail user={this.state.selectedInfo}/>
        }
        return (
            <div className="ui container">
                <Header />
                <SearchBar onSubmit={this.onCountSearchSubmit}/>
                {searchCount}
                {
                    this.state.displayResult
                            ? <div className="ui grid"> 
                                <div className="fourteen wide column">
                                    {displayComponent}
                                    </div>
                                    <div className="two wide column">
                                        {
                                            <SearchList onUserSelect={this.onUserSelect} data={this.state.userSearchResult} height={this.state.height}/>
                                        }
                                </div>
                            </div>
                            : null
                }
            </div>
        )
    }
}

export default App