import React, { Component } from "react";
import CategoryItem from './CategoryItem';
class CategoryContainer extends Component {

  render(){
    const categories = [...new Set(this.props.products.map(cat => cat.category))];

    return (
      <div>
        <ul className="filterList">{
          categories.map((cat, index) =>
            <CategoryItem
              key={index}
              index={index}
              category={cat}
              active={index === this.props.activeIndex}
              handleClick={() => this.props.filterHandler(cat, index)}
            />
          )
        }</ul>
      </div>
    );
  };
};

export default CategoryContainer;