import Card from "../UI/Card";
import classes from "./AvailableItems.module.css";
import ItemDetails from "./ItemDetails/ItemDetails";
import { useState, useEffect } from 'react';

const AvailableItems = () => {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [httpError, setHttpError] = useState(false);

  async function fetchItemsHandler() {
    setIsLoading(true);
    const response = await fetch('https://online-grocery-c68cf-default-rtdb.firebaseio.com/meals.json');    
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();
    const loadedItems = [];
    for (const key in data) { 
      loadedItems.push({
        id: key,
        title: data[key].name,
        description: data[key].description,
        price: data[key].price 
      })
      setItems(loadedItems);
      setIsLoading(false);
    }
  }



  useEffect(() => {
  
    fetchItemsHandler().catch((error) => {
      setIsLoading(false);
      setHttpError(true);
    });
    
  }, []);

  if (isLoading) {
    return (<section className={classes.itemsLoading}><p>Loading ...</p></section>);
  }

  if (httpError) {
    return (<section className={classes.itemError}><p>Something went wrong</p></section>);
  }
  
  const itemList = items.map((item) => (
    <ItemDetails
      id={item.id}
      key={item.id}
      title={item.title}
      description={item.description}
      price={item.price}
    />
  ));

  return (
    <section className={classes.items}>
      <Card>
        <ul>{itemList}</ul>
      </Card>
    </section>
  );
};

export default AvailableItems;
