import React from 'react';
import api from '../api/local';
import ResultCount from './ResultCount';
import DataDisplay from './DataDisplay';
import SearchBar from './SearchBar';
class Search extends React.Component {

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
        type:'',
        token: '',
    }

    componentDidMount() {
        this.updateWindowDimensions();
        this.setState({
            token: this.props.token
        })
        console.log(this.props)
      }

    onCountSearchSubmit = async (term) => {
        console.log(term)
        const res = await api.get('/api/v1/search/getcount', {
            params: { term : term },
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
                <SearchBar onSubmit={this.onCountSearchSubmit}/>
                {searchCount}
                <DataDisplay data={this.state.searchResult} type={this.state.type}/>
            </div>
        )
    }
}

export default Search
