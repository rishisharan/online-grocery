import React from 'react'
import classes from './Table.module.css';

const ReadTable = ({ item, handleEditPostForm, items }) => {

  
  return (
    <>
      {items.map((item) => (
        <tr key={item.itemId}>
          
        
          <td>{item.itemId}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>
            <button
              type="button"
              className={`btn btn-primary ${classes['action-button']}`}
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={(e) => handleEditPostForm(e, item)}
            >
              Edit
            </button> 
           </td> 
        </tr>

      ))}

    </>
  )
}

export default ReadTable;