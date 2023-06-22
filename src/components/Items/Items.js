import { Fragment } from "react";
import AvailableItems from "./AvailableItems";
import ItemsSummary from "./ItemsSummary";

const Item = () => {
  return (
    <Fragment>
        <ItemsSummary></ItemsSummary>
        <AvailableItems></AvailableItems>
    
      </Fragment>
    );
  };
  
  export default Item;