import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';

import Search from './Search';
import SearchSapling from './SearchSapling';
import SearchBar from './SearchBar';
import api from '../../api/local'

const useStyles = makeStyles({
    searchbar: {
        display: 'inline-flex',
        marginTop: '2%',
    },
    paper: {
        minHeight: 60,
        minWidth: '30vw',
        margin: 'auto',
        marginRight: '5vw',
        marginLeft: '5vw',
    },
});

export default function SelectSearch() {
    const classes = useStyles();
    const [type, setType] = useState('');
    const [term, setTerm] = useState('')
    const [sapling, setSapling] = useState('')
    const [searchData, setSearchData] = useState(null)
    const [saplingData, setSaplingData] = useState(null)

    const onCountSearchSubmit = async (term) => {
        const res = await api.get('/api/v1/search/getcount', {
            params: { term : term },
        });
        setTerm(term);
        setSearchData(res.data.data);
        setType('string');
    }

    const onSaplingSearchSubmit = async (id) => {
        const res = await api.get('/api/v1/search/sapling', {
            params: { id: id },
        });
        setSapling(id);
        setSaplingData(res.data);
        setType('sapling')
    }

    return (
        <div>
            <div className={classes.searchbar}>
                <SearchBar onSubmit={onCountSearchSubmit} text={'Search for a Tree/Person'}/>
                <Divider orientation="vertical" flexItem />
                <SearchBar onSubmit={onSaplingSearchSubmit} text={'Search with given SaplingID'}/>
            </div>
            {type==='string' && <Search term={term} data={searchData}/>}
            {type==='sapling' && <SearchSapling data={saplingData} />}
        </div>
    )
}