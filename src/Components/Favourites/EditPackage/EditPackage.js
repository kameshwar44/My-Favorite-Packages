import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditPackage() {
  const [packageData, setPackageData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const packageToEdit = storedFavorites.find((pkg) => pkg.id === id);
    if (packageToEdit) {
      setPackageData(packageToEdit);
    }
  }, [id]);

  const handleEdit = (event) => {
    event.preventDefault();
    // Perform edit action here, e.g. update localStorage with new package data
    alert("Package edited successfully");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPackageData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <h2>Edit Package: {packageData.package}</h2>
      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label htmlFor="packageName" className="form-label">
            Package Name
          </label>
          <input
            type="text"
            className="form-control"
            id="packageName"
            name="package"
            value={packageData.package || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="packageDescription" className="form-label">
            Package Description
          </label>
          <textarea
            className="form-control"
            id="packageDescription"
            name="description"
            rows="3"
            value={packageData.description || ""}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Edit Package
        </button>
      </form>
    </div>
  );
}

export default EditPackage;
