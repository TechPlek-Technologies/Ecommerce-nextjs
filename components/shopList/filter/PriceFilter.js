import React, { useState, useEffect } from 'react';
import c from './priceFilter.module.css';

const PriceFilter = ({ min, max, onChange }) => {
  const [maxValue, setMaxValue] = useState(max); // Initially set to max value

  // Update the maxValue when the max prop changes
  useEffect(() => {
    setMaxValue(max);
  }, [max]);

  const handleSliderChange = (event) => {
    const newValue = Number(event.target.value);

    setMaxValue(newValue); // Update max value when the slider moves
    onChange({ min, max: newValue }); // Pass the updated range to parent
  };

  // Check if the slider is at max and pass the full range to onChange if true
  const handleInitialLoad = () => {
    if (maxValue === max) {
      onChange({ min, max }); // Initially, if it's at max, pass full range (show all data)
    }
  };

  useEffect(() => {
    // Only call onChange initially if it's at the max value (show all data)
    handleInitialLoad();
  }, [maxValue]);

  return (
    // <div className={c.container}>
      <div className="tpshop__widget mb-30 pb-25">
        <h4 className="tpshop__widget-title">FILTER BY PRICE</h4>
        <div className={c.slider}>
          <input
            type="range"
            min={min}
            max={max}
            value={maxValue} // Slider reflects the current max value
            onChange={handleSliderChange} // Handle slider change
            className={c.slider__input}
          />
        </div>

        <div className="price-filter mt-10">
          <span>
            ₹{min} - ₹{maxValue}
          </span>{' '}
          {/* Show the dynamic range */}
        </div>

        {/* <div className="productsidebar__btn mt-15 mb-15">
        <a href="#">FILTER</a>
      </div> */}
      </div>
    // </div>
  );
};

export default PriceFilter;
