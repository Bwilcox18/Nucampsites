import React, { Component } from 'react';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
        error: null,
        isLoaded: false,
        items: [],
        test: {
            hello: 'hi',
            goodbye: 'bye'
        }
        };
    }
    
    componentDidMount() {
        fetch("https://bwilcox18.github.io/Data/CampsiteData.json")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                items: result
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="col">
                    <ul>
                        {items.campsites.map(item => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                        </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default Directory;