import React, { useState } from 'react';
import CategoryFilter from '../filter/CategoryFilter';
import PriceFilter from '../filter/PriceFilter';
import BrandFilter from '../filter/BrandFilter';
import ResetFilter from '../filter/ResetFilter';

const ShopSidebar = ({
  shop_right,
  priceRange,
  updatePriceRange,
  category,
  updateCategory,
  updateSubCategory,
  updateChildCategory,
  brand,
  updateBrand
}) => {
  const [resetKey, setResetKey] = useState(0);

  const resetFilters = () => {
    console.log('Resetting Filters');

    // Reset category, subcategory, and child category
    updateCategory([]);
    updateSubCategory([]);
    updateChildCategory([]);

    // Reset brand filter
    updateBrand([]);

    // Reset price range
    updatePriceRange({ min: 0, max: 1000 }); // Reset to default values

    // Force re-render of PriceFilter by changing key
    setResetKey((prevKey) => prevKey + 1);

    // Check if the state has updated
    console.log('After Reset: ');
    console.log('Category:', category);
    console.log('Price Range:', priceRange);
  };

  return (
    <div>
      <div className={`tpshop__leftbar ${shop_right ? 'tpshop__leftbar-area' : ''}`}>
        {/* Category filter */}
        <CategoryFilter
          key={`category-${resetKey}`}
          category={category}
          updateCategory={updateCategory}
          updateSubCategory={updateSubCategory}
          updateChildCategory={updateChildCategory}
          resetKey={resetKey}
        />

        {/* Price filter */}
        <PriceFilter key={`price-${resetKey}`} min={priceRange?.min || 0} max={Math.round((priceRange?.max ?? 0) + 1)} onChange={updatePriceRange} />

        {/* Brand filter */}
        <BrandFilter  key={`brand-${resetKey}`} brand={brand} updateBrand={updateBrand} />

        {/* Reset filter */}
        <ResetFilter resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default ShopSidebar;
