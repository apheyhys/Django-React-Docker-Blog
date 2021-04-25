import React, { Fragment } from 'react';
import { withRouter } from "react-router";

import CategoryMenu from "./CategoryMenu";
import PopularArticle from "./PopularArticle";
import Subscribe from "./Subscribe";

function Sidebar(props) {
  return (
    <Fragment>
      
      <CategoryMenu
        {...props}
      />
      <PopularArticle />
      <Subscribe />
      
    </Fragment>
  );
}

export default withRouter(Sidebar);
