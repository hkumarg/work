import React, { Component } from "react";

class CategoryItem extends Component {
  render(){
    return (
      <div>
        <li
          className={this.props.active ? 'active' : 'category'}
          id="colorChangeOnClick" class="redColor" onclick={this.onClickFunction()}
        >
            {this.props.category}

        </li>
       
      </div>
    );
  };
};