import React, { Component } from "react";
import axios from 'axios';

class App extends Component {

  getInitialState()  {
    return {
      category: [],
      items: []
    }
  }

  // WHAT IS CURRENTLY SELECTED
    handleChange(e){
        this.setState({data: e.target.firstChild.data});
    }

  componentDidMount() {
    // FETCHES DATA FROM APIS
    var th = this;
    this.serverRequest = 
      axios.all([
        axios.get('https://api.gousto.co.uk/products/v2.0/categories'),
        axios.get('https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&image_sizes[]=400&period_id=120')
      ])
      .then(axios.spread(function (categoriesResponse, itemsResponse) {
        //... but this callback will be executed only when both requests are complete.
        console.log('Categories', categoriesResponse.data.data);
        console.log('Item', itemsResponse.data.data);
        th.setState({
            category: categoriesResponse.data.data,
            items : itemsResponse.data.data,
          });
      }));


  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (

        <div className="navigation">
            <h1>Store Cupboard</h1>
            <NavigationCategoryList data={this.state.category} handleChange={this.handleChange}/>
            <NavigationSubCategoryList data={this.state.category} subData={this.state.items} selected_category={this.state.data} />
        </div>
    )
  }
};
class NavigationCategoryList extends Component {
    render() {
            var handleChange = this.props.handleChange;

        // LOOPS THE CATEGORIES AND OUTPUTS IT
        var links = this.props.data.map(function(category) {
            return (
                <NavigationCategory title={category.title} link={category.id} handleChange={handleChange}/>
            );
        });
        return (
            <div>
                <div className="navigationCategory">
                    {links}
                </div>
            </div>
        );
    }   
};

class NavigationSubCategoryList extends Component{
    render() {
            var selected = this.props.selected_category;
        var sub = this.props.subData.map(function(subcategory) {
            if(subcategory.categories.title === selected)
            return (
                <NavigationSubCategoryLinks name={subcategory.title} link={subcategory.link}   />
            );
        });                     
        return (
            <div className="subCategoryContainer">
                {sub}
            </div>
        );
    }
};

class NavigationSubCategoryLinks extends Component{
    render() {
        return (
            <div className="navigationSubCategory" id={this.props.name}>
            {this.props.name}
            </div>
        );
    }
};   


class NavigationCategory extends Component{
    render() {
            var handleChange = this.props.handleChange;
        return (
            <div className="navigationLink">
                <a href={this.props.link} onClick={handleChange}>{this.props.title}</a>
            </div>
        );
    }
};

export default App;

// ReactDOM.render(<NavContainer />, document.getElementById("app"));