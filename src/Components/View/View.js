

import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    // Use optional chaining to handle the case where postDetails is undefined
    const userId = postDetails?.userId;

    // Check if userId is truthy before proceeding with the database query
    if (userId) {
      firebase
        .firestore()
        .collection('users')
        .where('id', '==', userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    }
  }, [firebase, postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {postDetails && postDetails.url && (
          <img src={postDetails.url} alt="" />
        )}
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
