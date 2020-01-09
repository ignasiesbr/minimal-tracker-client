import {useEffect, useState} from 'react';
import axios from 'axios';

export const usePost = url => {
    const [state, setState] = useState({data: null, loading: true});
    useEffect(() => {
        console.log('use post called');
        setState(state => ({data:state.data, loading:true}));
        axios.post(url)
            .then(res => res.data)
            .then(data => {
                setState({data:data, loading: false})
            });
    }, [url, setState])

    return state;
}