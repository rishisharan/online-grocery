import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';


const Orders = () => {
  const columns = [
    {
      name: "ID",
      selector : row => row.id
    },
    {
      name: "Name",
      selector : row => row.name
    },
    {
      name: "Email",
      selector : row => row.email
    },
    {
      name: "City",
      selector : row => row.address.city
    }
  ]

  useEffect(() => {
    const fetchData = async() => {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setRecords(res.data))
      .catch(err => console.log(err));
    }
    fetchData();
  }, []);

  const [records, setRecords] = useState([]);

  return (
    <div>
  
      <DataTable>
        columns={columns}
        data={records}

      </DataTable>
    </div>
  );
};
export default Orders;