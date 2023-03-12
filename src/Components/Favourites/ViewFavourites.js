import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ViewFavourites.module.css";
import Favourites from "./Favourites";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';

function ViewFavourites() {
  const [favorites, setfavorites] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editedMessage, setEditedMessage] = useState(null);
  const [viewPackage, setViewPackage] = useState(null);
  let navigate = useNavigate()

  function handleViewPackage(id) {
    const selectedPackage = favorites.find((favorite) => favorite.id === id);
    setViewPackage(selectedPackage);
  }

  const handleDelete = (id) => {
    console.log(id);
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const deleteItem = storedFavorites.filter((del) => del.id !== id);
    localStorage.setItem("favorites", JSON.stringify(deleteItem));
    setfavorites(deleteItem);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setfavorites(storedFavorites);
  }, []);

  function handleViewMessage(id) {
    const selectedFavorite = favorites.find((favorite) => favorite.id === id);
    setSelectedPackage(selectedFavorite);
  }

  function handleSave() {
    const updatedFavorites = favorites.map((favorite) => {
      if (favorite.id === selectedPackage.id) {
        return { ...favorite, message: editedMessage };
      } else {
        return favorite;
      }
    });
    setfavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSelectedPackage(null);
  }
  function handleBack(){
    navigate("/")
  }


  return (
    <div>
      {favorites.length === 0 ? (
        <Favourites />
      ) : (
        <div className={styles.conatiner}>
          <button
                    className="btn btn-primary "
                    style={{ margin: "20px" }}
                    onClick={handleBack}
                  >Back</button>
          <h2>My Favorite Packages</h2>

          <tbody>
            <table className="table border shadow">
              <thead className="table-white">
                <tr>
                  <th scope="col">PACKAGES NAMES</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
            </table>

            {favorites.map((favorite, index) => (
              <tr key={favorite.id}>
                <th scope="row">{index + 1}</th>
                &nbsp; &nbsp; &nbsp;
                <td>{favorite.package}</td>
                <td>
                  <button
                    className="btn btn-primary "
                    style={{ margin: "3px" }}
                    onClick={() => handleViewPackage(favorite.id)}
                  >
                    View
                  </button>
                  <button className="btn btn-warning" style={{ margin: "3px" }}  onClick={() => handleViewMessage(favorite.id)} >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    style={{ margin: "3px" }}
                    onClick={() => handleDelete(favorite.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      )}
       <Modal show={viewPackage !== null} onHide={() => setViewPackage(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{viewPackage?.package}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{viewPackage?.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewPackage(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={selectedPackage !== null}
        onHide={() => setSelectedPackage(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedPackage?.package}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                className="form-control"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedPackage(null)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewFavourites;
