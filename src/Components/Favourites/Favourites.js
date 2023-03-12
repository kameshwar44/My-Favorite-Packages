import React from 'react'
import styles from "./Favourites.module.css"
import { useNavigate } from 'react-router-dom';

function Favourites() {
    let navigate = useNavigate();
    function HandleNavigate() {
      navigate("/");
    }
  
    return (
      <div className={styles.MainContainer}>
        <h3>Welcome to Favorite NPM Packages</h3>
        <div className={styles.BoxContainer} >
          <p>You don't have any favorites yet. Please add.</p>
          <button className={styles.ButtonContainer} onClick={HandleNavigate} >Add Fav</button>
        </div>
      </div>
    );
  }

export default Favourites
