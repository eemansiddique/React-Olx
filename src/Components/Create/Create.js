

import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../Store/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null); // State to manage error messages
  const date = new Date();
  const navigate = useNavigate();

  const isValidPrice = (price) => !isNaN(price) && price >= 0; // Check if price is a non-negative number

  const handleSubmit = () => {
    // Basic form validation
    if (!name || !category || !price || !image) {
      setError('All fields are required');
      return;
    }

    // Price validation
    if (!isValidPrice(price)) {
      setError('Price should be a non-negative number');
      return;
    }

    // Clear previous errors
    setError(null);

    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase
            .firestore()
            .collection('products')
            .add({
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString(),
            })
            .then(() => {
              navigate('/');
            });
        });
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="fname"
            name="Name"
            placeholder="Enter product name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            id="fname"
            name="category"
            placeholder="Enter product category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            id="fname"
            name="Price"
            placeholder="Enter product price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ''}
          ></img>

          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
          />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
