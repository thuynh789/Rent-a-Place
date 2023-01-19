import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addSpotThunk } from "../../store/spots";
import "./AddSpotModal.css";

function AddSpotModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0.00);
  const [lng, setLng] = useState(0.00);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    }

    return dispatch(addSpotThunk(newSpot, url))
    .then((res) => history.push(`/spots/${res.id}`))

    .then(closeModal)
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
      );
    };

    // const newAddress = (e) => setAddress(e.target.value)
    // const newCity = (e) => setCity(e.target.value)
    // const newState = (e) => setState(e.target.value)
    // const newCountry = (e) => setCountry(e.target.value)
    const newLat = (e) => setLat(e.target.value)
    const newLng = (e) => setLng(e.target.value)
    const newName = (e) => setName(e.target.value)
    const newDescription = (e) => setDescription(e.target.value)
    const newPrice = (e) => setPrice(e.target.value)
    const newUrl = (e) => setUrl(e.target.value)

    return (
    <div className="add-spot-container">

      <div className="x-button">
        <button className="exit" onClick={closeModal}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <div className="header">
        <h2>Create a listing</h2>
      </div>

      <div>
        <ul className="errors">
            {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>


      <form className="form" onSubmit={handleSubmit}>
        <div className="form-parts">

          <label>
            Street Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>

          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>

          <label>
            Country/Region
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>

          <label>
            ???
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            ???
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            ???
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            ???
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            ???
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            ???
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

        </div>
      </form>
    </div>

  );
}

export default AddSpotModal;