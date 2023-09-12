import React, { useRef } from "react";
import classes from './Table.module.css';
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

  const [itemId, setItemId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  

  const handleEditPostForm = (e, item) => {
    e.preventDefault()
    setItemId(item.itemId);
    setTitle(item.title);
    setDescription(item.description);
    setPrice(item.price);
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
    await fetch('http://localhost:8080/api/v1/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          title: itemData.title,
          description: itemData.description,
          quantity: 1,
          price: itemData.price,
          isTaxable: true,
          isAvailable: false,
      })
    });
  //  setIsSubmitting(false);
  };

  const handleChange = () => {};
  async function fetchItemsHandler() {
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:8080/api/v1/items"
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    const loadedItems = [];
    setItems(data);
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
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
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
              <h5 className="modal-title" id="exampleModalLabel">Add New Item</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPost}>
                <div className="mb-3">
                  <label className="form-label">Item ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemId"
                    placeholder="itemId"
                    required
                    onChange={handleChange("itemId")}
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
                  <label className="form-label">Description</label>
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
                  <label className="form-label">Item ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemId"
                    value={itemId}
                    required
                    onChange={handleChange("itemId")}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    required
                    onChange={handleChange("title")}                  
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="description"
                    value={description}
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
                    value={price}
                    required
                    onChange={handleChange("price")}                  
                  />
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
