import React from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hook";

const BrandFilter = ({ brand, updateBrand }) => {
  const { brand: stateBrand } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  // Handle brand selection
  const handleBrandSelection = (brandName) => {
    const updatedBrands = stateBrand.includes(brandName)
      ? stateBrand.filter((b) => b !== brandName)
      : [...stateBrand, brandName];

    updateBrand(updatedBrands);
  };

  return (
    <div className="tpshop__widget mb-30 pb-25">
      <h4 className="tpshop__widget-title">FILTER BY BRAND</h4>
      {brand?.length > 0 ? (
        brand.map((item) => (
          <div key={item.id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`brand-check-${item.id}`}
              onChange={() => handleBrandSelection(item.name)}
              checked={stateBrand.includes(item.name)}
            />
            <label
              className="form-check-label"
              htmlFor={`brand-check-${item.id}`}
            >
              {item.name} ({item.products?.length || 0})
            </label>
          </div>
        ))
      ) : (
        <p className="text-muted">No brands available</p>
      )}
    </div>
  );
};

export default BrandFilter;
