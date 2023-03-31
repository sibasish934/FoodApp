import React from "react";
import { Country, State } from "country-state-city";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const {shippingInfo} = useSelector(state => state.cart)
  const [details, setDetails] = useState({
    hno: shippingInfo.hno,
    city: shippingInfo.city,
    Country: shippingInfo.Country,
    state: shippingInfo.state,
    phoneNo: shippingInfo.phoneNo,
    pinCode: shippingInfo.pinCode,
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { hno, city, Country, state, phoneNo, pinCode } = details;

    dispatch({
      type: "addShippingInfo",
      payload: {
        hno,
        city,
        Country,
        state,
        phoneNo,
        pinCode,
      },
    });
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify({
        hno,
        city,
        Country,
        state,
        phoneNo,
        pinCode,
      })
    );
    navigate("/confirmorder");
  };

  return (
    <section className="shipping">
      <main>
        <h1>Shipping Details</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>H.NO</label>
            <input
              type="text"
              placeholder="Enter House No."
              required
              name="hno"
              value={details.hno}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter City"
              required
              name="city"
              value={details.city}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>Country</label>

            <select
              name="Country"
              required
              value={details.Country}
              onChange={handleInput}
            >
              <option value="">Country</option>
              {Country.getAllCountries().map((i) => (
                <option value={i.isoCode} key={i.isoCode}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          {details.Country && (
            <div>
              <label>State</label>
              <select
                name="state"
                required
                value={details.state}
                onChange={handleInput}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(details.Country).map((i) => (
                    <option value={i.isoCode} key={i.isoCode}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div>
            <label>Pin Code</label>
            <input
              type="number"
              placeholder="Enter Pincode"
              name="pinCode"
              required
              value={details.pinCode}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>Phone No.</label>
            <input
              type="number"
              placeholder="Enter Phone No."
              name="phoneNo"
              required
              value={details.phoneNo}
              onChange={handleInput}
            />
          </div>
          <button type="submit">Confirm Order</button>
        </form>
      </main>
    </section>
  );
};

export default Shipping;
