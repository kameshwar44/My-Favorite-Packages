import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { nanoid } from "nanoid";

function Home() {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const navigate = useNavigate();

  const handlePackageSelection = (event) => {
    setSelectedPackage(event.target.value);
  };

  const handleFavoriteMessage = (event) => {
    setFavoriteMessage(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.npms.io/v2/search?q=reactjs");
      const data = await response.json();
      setPackages(data.results);
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.package.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmission = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const newFavorite = {
      id: nanoid(4),
      package: selectedPackage,
      message: favoriteMessage,
    };
    if (!selectedPackage || !favoriteMessage) {
      toast.error("Select package + Write message!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    localStorage.setItem(
      "favorites",
      JSON.stringify([...storedFavorites, newFavorite])
    );
    setSelectedPackage("");
    setFavoriteMessage("");
    setSearchQuery("");
    swal({
      title: "Submitted!",
      icon: "success",
      buttons: {
        confirm: {
          text: "Okay",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
      dangerMode: false,
    });
  };

  function handleViewFav() {
    navigate("/ViewFav");
  }

  return (
    <div className={styles.MainContainer}>
      <button className={styles.ViewFav} onClick={handleViewFav}>
        View Fav
      </button>
      <input
        type="text"
        value={searchQuery}
        placeholder="Search your package"
        onChange={handleSearch}
        className={styles.SearchContainer}
      />
      <div className={styles.ResultContainer}>
        {searchQuery === "" ? (
          <p className={styles.ResultMessage}>
            Enter a search term to see results.
          </p>
        ) : (
          filteredPackages.map((pkg) => (
            <div key={pkg.package.name} className={styles.MapContainer}>
              <input
                type="radio"
                name="package"
                className={styles.RadioButton}
                value={pkg.package.name}
                onChange={handlePackageSelection}
                checked={selectedPackage === pkg.package.name}
              />
              <label>{pkg.package.name}</label>
            </div>
          ))
        )}
      </div>
      <div className={styles.TextAreaContainer}>
        <p className={styles.WhyFavoriteMessage}>Why is this your fav?</p>
        <textarea
          className={styles.TextArea}
          value={favoriteMessage}
          onChange={handleFavoriteMessage}
        />
        <div className={styles.SubmitButtonContainer}>
          <button className={styles.SubmitButton} onClick={handleSubmission}>
            Submit
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
