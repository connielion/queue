import React, { Component } from 'react';
import axios from 'axios';

export default class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            favs: [
                { 'name': 'Codesmith', 'address': '1600 Main St., Venice, CA' },
                { 'name': 'Codesmith2', 'address': '1601 Main St., Venice, CA' }
            ]
        }

        this.fetchFavorites = this.fetchFavorites.bind(this)
    }
    fetchFavorites() {
        // axios.get('/dbRouter/favorites')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         return this.setState({
        //             favs: [...data]
        //         })
        //     })
    }
    componentDidMount() {
        console.log(`this`, this)
        this.fetchFavorites()
    }
    render() {
        // const { favs } = this.state;
        console.log(`favs in favorites`, this.state.favs)
        const favs = this.state.favs.map((obj, i) => {
            return <div key={i}>{obj.name}, {obj.address}</div>
        })
        return <div className="favorites-container flex j-center fd-col">
            <h2 style={{ margin: '0 auto', marginTop: '20px' }}>Your Favorites</h2>
            <div className="flex center fd-col">{favs}</div>
        </div>
    }
}
