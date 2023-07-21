import React, { useRef } from "react";
import { useState, useEffect } from "react";
import ReadTable from './ReadTable';
const isEmpty = value => value.trim() === '';

const Table = () => {

  const [formInputsValidity, setFormInputsValidity] = useState({
    title: true,
    description: true,
    price: true
  });

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();

  const handleEditPostForm = (e, item) => {
    e.preventDefault()
    
  }

  const handleAddPost = (e) => {
    e.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const entereDescription = descriptionInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;

    const enteredTitleIsValid = !isEmpty(enteredTitle);
    const enteredDescIsValid = !isEmpty(entereDescription);
    const enteredPriceIsValid = !isEmpty(enteredPrice);

    setFormInputsValidity({
      title: enteredTitleIsValid,
      description: enteredDescIsValid,
      price: enteredPriceIsValid
    });
    const isFormValid = enteredTitleIsValid && enteredDescIsValid && enteredPriceIsValid;
    if (!isFormValid) {
      return;
    }

    //Submit the data
    const itemData = {
      title: enteredTitle,
      description: entereDescription,
      price: enteredPrice
    }
    submitOrderHandler(itemData);
   
  };

  const submitOrderHandler = async (itemData) => {
    await fetch('https://online-grocery-c68cf-default-rtdb.firebaseio.com/items.json', {
      method: 'POST',
      body: JSON.stringify({
        item: {
          title: itemData.title,
          description: itemData.description,
          price: itemData.price
        }
      })
    });
  //  setIsSubmitting(false);
  };

  const handleChange = () => {};
  async function fetchItemsHandler() {
    setIsLoading(true);
    const response = await fetch(
      "https://online-grocery-c68cf-default-rtdb.firebaseio.com/items.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    const loadedItems = [];
    for (const key in data) {
      console.log('Key ', key, 'Data ', data);
      loadedItems.push({
        id: key,
        title: data[key].item.title,
        description: data[key].item.description,
        price: data[key].item.price,
      });
      console.log('Loaded items ',loadedItems);
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

  return (
    <div>
      <div className="d-flex flex-row">
        <button
          type="button"
          className="me-3 btn btn-primary ml-auto d-block mb-2"
          data-bs-toggle="modal"
          data-bs-target="#addModalForm"
        >
          Add Data +
        </button>
      </div>
      <table className="table table-bordered border-primary table-responsible">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">description</th>
            <th scope="col">price</th>
          </tr>
        </thead>
        <tbody>
        
          <ReadTable
            items={items}
            handleEditPostForm={handleEditPostForm} />
        </tbody>
      </table>

      {/*Add Modal form */}
      <div
        className="modal fade"
        id="addModalForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPost}>
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userId"
                    placeholder="userId"
                    required
                    onChange={handleChange("userId")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="title"
                    required
                    ref={titleInputRef}
                    onChange={handleChange("title")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descrription</label>
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="description"
                    placeholder="description"
                    ref={descriptionInputRef}
                    required
                    onChange={handleChange("description")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    placeholder="price"
                    ref={priceInputRef}
                    required
                    onChange={handleChange("price")}
                  />
                </div>
                <div className="modal-footer d-block">
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-warning float-end">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div> 
      </div>
   

    
      {/*Edit Row Modal */}
      <div className="modal fade" id="editModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Row</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userId"
                    value="userId"
                    required
                    
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value="title"
                    required
                  
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Body</label>
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="body"
                    value="{editFormData.body}"
                    required
               
                  ></textarea>
                </div>
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success float-end"
                  >Save Row</button>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-danger float-start"
                  >Delete Row</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
