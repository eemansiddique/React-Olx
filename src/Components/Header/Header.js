// import React, { useContext } from 'react';

// import './Header.css';
// import OlxLogo from '../../assets/OlxLogo';
// import Search from '../../assets/Search';
// import Arrow from '../../assets/Arrow';
// import SellButton from '../../assets/SellButton';
// import SellButtonPlus from '../../assets/SellButtonPlus';
// import { AuthContext, FirebaseContext } from '../../Store/Context';
// import { Navigate, useNavigate,Link } from 'react-router-dom';
// function Header() {
//   const navigate=useNavigate();
//   const {user}=useContext(AuthContext)
//   const {firebase}=useContext(FirebaseContext)
//   return (
//     <div className="headerParentDiv">
//       <div className="headerChildDiv">
//         <div className="brandName">
//           <OlxLogo></OlxLogo>
//         </div>
//         <div className="placeSearch">
//           <Search></Search>
//           <input type="text" />
//           <Arrow></Arrow>
//         </div>
//         <div className="productSearch">
//           <div className="input">
//             <input
//               type="text"
//               placeholder="Find car,mobile phone and more..."
//             />
//           </div>
//           <div className="searchAction">
//             <Search color="#ffffff"></Search>
//           </div>
//         </div>
//         <div className="language">
//           <span> ENGLISH </span>
//           <Arrow></Arrow>
//         </div>
//         <div className="loginPage">
//           <span>{user ? `Welcome ${user.displayName}` :"Login" }</span>
//           <hr />
//         </div>
//         {user && <span onClick={()=>{
//           firebase.auth().signOut()
//           navigate('/login')
//         }}>Logout</span>}

//         <div className="sellMenu">
//           <SellButton></SellButton>
//           <div className="sellMenuContent">
//             <SellButtonPlus></SellButtonPlus>
//             <span>
//             <Link to="/create">SELL</Link>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;

import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Store/Context';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulating a search using local data (replace with actual search logic)
      const localData = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
      ];

      // Simulating a simple search by filtering products based on the search input
      const filteredResults = localData.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      setSearchResults(filteredResults);
    };

    fetchData();
  }, [searchValue]);

  const handleSearch = () => {
    // Replace with your actual search logic, e.g., navigate to a search results page
    console.log('Performing search for:', searchValue);
    console.log('Search results:', searchResults);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for products..."
          />
          <Arrow onClick={handleSearch}></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find cars, mobile phones, and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              firebase.auth().signOut();
              navigate('/login');
            }}
          >
            Logout
          </span>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>
              <Link to="/create">SELL</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;