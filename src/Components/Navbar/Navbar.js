import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Link className={styles.Navbar}>
     <li id={styles.dot} >●</li>
     <li id={styles.dot} >●</li>
     <li id={styles.dot} >●</li>
    </Link>
  )
}

export default Navbar
