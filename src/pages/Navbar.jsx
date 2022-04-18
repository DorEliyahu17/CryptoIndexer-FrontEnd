import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function Navbar() {
// export default class Nav extends React.Component {

  return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">CryptoIndexer</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#">Explore Indexes</a>
                </li>
                <li class="nav-item">
                  {/* <a  class="nav-link"  href="/CreateNewIndex/CreateNewIndex">Create Index</a> */}
                  {/* <Link class="nav-link" to="/CreateNewIndex/CreateNewIndex">Create Index</Link> */}
                  <Link className="Nav-link" to="/CreateNewIndex">CreateNewIndex</Link>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Sign In</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

    // <nav className="Nav">
    //   <div className="Nav__container">

    //     <div className="Nav__right">
    //       <ul className="Nav__item-wrapper">
    //         <li className="Nav__item">
    //           <Link className="Nav__link" to=/CreateNewIndex/CreateNewIndex">CreateNewIndex</Link>
    //         </li>
    //         <li className="Nav__item">
    //           <Link className="Nav__link" to="/path2">Link 2</Link>
    //         </li>
    //         <li className="Nav__item">
    //           <Link className="Nav__link" to="/path3">Link 3</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   </nav>
  );
}

export default Navbar; 