import React from 'react';
import api from '../api/local';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import ResultDetail from './ResultDetail';
import Header from './Header';
import ResultCount from './ResultCount';
import DataDisplay from './DataDisplay'

class App extends React.Component {

    state = {
        userCount: 0,
        locCount: 0,
        treeCount : 0,
        eventCount : 0,
        searchCountResult: [],
        selectedSearchCount: 0,
        searchResult: [],
        selectedInfo: null,
        selectedType: '',
        width: 0,
        height: 0,
        term: '',
        displayResult: false,
        searchType:'',
        searchSize: 10,
        currentResultListPage: 1,
        type:''
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

    fetchData = async (type) => {
        let selectedType = type + "_count";
        let params = {
            type: type,
            term : this.state.term,
            size: this.state.searchSize,
            index: this.state.currentResultListPage
        }
        const res = await api.get('/api/v1/search/getsearchlist', {
            params : params
        });

        this.setState({
            type: type,
            searchResult: res.data.data,
            displayResult: true,
            selectedInfo: res.data.data[0],
            searchType: type,
            selectedSearchCount: this.state.searchCountResult[0][selectedType]
        })
    }

    getResult = async (type) => {
        this.setState({
            currentResultListPage: 1
        }, () => {
            this.fetchData(type)
        })
    }

    handlePageChange = (page) => {
        this.setState({
            currentResultListPage: page
        }, () => {
            this.fetchData(this.state.searchType)
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
            searchCount = <ResultCount selectedSearchCount={this.state.selectedSearchCount} result={this.state.searchCountResult[0]} onTypeSelect={this.getResult} handlePageChange={this.handlePageChange}/>;
        }

        return (
            <div className="ui fluid container">
                <Header />
                <SearchBar onSubmit={this.onCountSearchSubmit}/>
                {searchCount}
                <DataDisplay data={this.state.searchResult} type={this.state.type}/>
                {/* { old version
                    this.state.displayResult
                            ?   <div className="ui grid" style={{"marginTop":"0.5rem"}}>
                                    <div className="three wide column">
                                        <Pagination onChange={this.handlePageChange} count={Math.floor(this.state.selectedSearchCount / 10) + 1} color="primary" size="small" siblingCount={1} style={{"marginLeft":15}}/>
                                        {
                                            <SearchList onItemSelect={this.onItemSelect} type={this.state.searchType} data={this.state.searchResult} height={this.state.height}/>

                                        }
                                    </div>
                                    <div className="thirteen wide column">
                                        {displayComponent}
                                    </div>
                                </div>
                            : null
                } */}
            </div>
        )
    }
}

export default App
