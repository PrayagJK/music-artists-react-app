import React from "react";
import "./App.css";
import axios from "axios"; // uimport axios
class App extends React.Component {
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
          location: "",
          items: [],
            DataisLoaded: false,
        };
    }

    componentDidMount() {
        axios.get(
          "https://get.geojs.io/v1/ip/geo.json"
        )
        .then(res => {
          this.State({
            location: res.data.city
          })
        });
        axios.get(
                "http://musicbrainz.org/ws/2/artist/?query=begin:[2014 TO 2024] AND area:"
            )
            .then((res) => {
                this.setState({
                    items: res.data,
                    DataisLoaded: true,
                });
            });
    }
    render() {
        const { DataisLoaded, items } = this.state;
        console.log(items)
        if (!DataisLoaded)
            return (
                <div>
                    <h1> Pleses wait some time.... </h1>
                </div>
            );

        return (
            <div className="App">
                <h1 className="artists">Fetch artists from last 10 years</h1>
                <h3>Fetch data from an api in react</h3>
                <div className="container">
                    {items.artists.map((item) => (
                        <div className="item">
                            <ol key={item.id}>
                                <div>
                                    <strong>
                                        {"Artist: "}
                                    </strong>
                                    {item.name},
                                </div>
                                <div>
                                    Started in: {item['life-span'].begin}
                                </div>

                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
