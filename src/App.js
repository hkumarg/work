import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";

const API_URL =
  "https://api.inquickerstaging.com/v3/winter.inquickerstaging.com";

const Service_ENDPOINT = "/services";
const Provider_ENDPOINT =
  "/providers?include=locations%2Cschedules.location&page%5Bnumber%5D=1&page%5Bsize%5D=10";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      prov: [],
      selected: null,
      filteredProv: []
    };
  }
  onClickItem(item) {
    this.setState({
      selected: item
    });
  }

  componentDidMount() {
    Promise.all([
      fetch(API_URL + Service_ENDPOINT),
      fetch(API_URL + Provider_ENDPOINT)
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          datas: data1.data,
          prov: data2.data,
          filteredProv: data2.data
        })
      )
      .catch(console.log);
  }

  filterPs = pFilter => {
    let filteredProv = this.state.prov;
    filteredProv = filteredProv.filter(po => {
      let pName = po.attributes.name.toLowerCase();
      return pName.indexOf(pFilter.toLowerCase()) !== -1;
    });
    this.setState({
      filteredProv
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.datas.map(book => (
            // <li key={book.id}>{book.attributes.name}</li>
            <li
              style={{
                ["background-color"]:
                  this.state.selected === book.attributes.name ? "yellow" : "",
                fontWeight:
                  this.state.selected === book.attributes.name
                    ? "bold"
                    : "normal"
              }}
              onClick={this.onClickItem.bind(this, book.attributes.name)}
              key={book.attributes.name}
            >
              {book.attributes.name}
            </li>
          ))}
        </ul>
        <hr />

        {this.state.filteredProv.map(providr => (
          <div>
            <Card>
              <CardContent>
                <Avatar
                  alt="{{providr.attributes.['card-image']}}"
                  src={providr.attributes["card-image"]}
                />
                <Typography gutterBottom variant="headline" component="h4">
                  {providr.attributes.name}
                </Typography>
                <Typography component="p">
                  {providr.attributes.subspecialties.toString()}
                </Typography>
              </CardContent>
            </Card>
            {/* 
            <Prov
              prov={this.state.filteredProv}
              match={this.props.match}
              onChange={this.filterPs}
            /> */}
          </div>
        ))}
      </div>
    );
  }
}
export default App;
