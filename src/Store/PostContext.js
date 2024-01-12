// import { useState } from "react";
// import { createContext } from "react";

//  export const PostContext =createContext(null)

//  const [postDetails,setPostDetails]=useState()
// function Post ({children}){
  
//     return(
//         <PostContext.Provider value={{postDetails,setPostDetails}}>
//             {children}
//         </PostContext.Provider>
//     )
// }
// export default Post
import React, { useState, createContext } from "react";

export const PostContext = createContext(null);

function Post({ children }) {
  // Move useState inside the functional component
  const [postDetails, setPostDetails] = useState();

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}

export default Post;