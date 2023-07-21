import React from 'react'

const ReadTable = ({ item, handleEditPostForm, items }) => {

  
  return (
    <>
      {items.map((item) => (
        <tr key={item.id}>
          
        
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>
            <button
              type="button"
              className=" btn btn-primary ml-auto d-block mb-2"
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              // onClick={(e) => handleEditPostForm(e, post)}
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