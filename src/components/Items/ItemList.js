import React from 'react';
import { useState, useEffect } from 'react';
import ItemDetails from './ItemDetails/ItemDetails';
import DataTable from 'react-data-table-component';
const ItemList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [httpError, setHttpError] = useState(false);

  async function fetchItemsHandler() {
    
    setIsLoading(true);
    const response = await fetch('http://localhost:8080/api/v1/items');    
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();
    const loadedItems = [];
    for (const key in data) { 
      loadedItems.push({
        id: key,
        title: data[key].title,
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
    return (<section><p>Loading ...</p></section>);
  }

  if (httpError) {
    return (<section><p>Something went wrong</p></section>);
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

  const columns = [
    {
      name: 'Title',
      selector: row => row.title
    }, {
      name: 'Description',
      selector: row => row.description
    } ,{
      name: 'Price',
      selector: row => row.price
    }
  ];

  const data = [
    {
      id: 1,
      title: 'rishi',
      description: 'some',
      price: '12'
    }
  ]
  return (
        <div className='container mt-5'>
          <DataTable columns={columns} data={items}>

          </DataTable>
           
        </div>
    );
  };
  
  export default ItemList;