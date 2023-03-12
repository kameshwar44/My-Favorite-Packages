import React from "react";
import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Favourites from './Components/Favourites/Favourites';
import ViewFavourites from './Components/Favourites/ViewFavourites';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/addFav" element={<Favourites/>}></Route>
        <Route path="/ViewFav" element={<ViewFavourites/>}></Route>
  

      </Routes>
      
    </div>
  );
}

export default App;
