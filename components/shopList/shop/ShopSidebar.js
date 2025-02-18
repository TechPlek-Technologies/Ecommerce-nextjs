import React from 'react';
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

  const resetFilters = () => {
    console.log("Resetting Filters");
  
    // Reset category, subcategory, and child category
    updateCategory([]);
    updateSubCategory([]);
    updateChildCategory([]);
    
    // Reset brand filter
    updateBrand([]);
    
    // Reset price range
    updatePriceRange({ min: 0, max: 1000 }); // Reset to default values
  
    // Check if the state has updated
    console.log("After Reset: ");
    console.log("Category:", category);
    console.log("Price Range:", priceRange);
  };

  return (
    <div>
      <div className={`tpshop__leftbar ${shop_right ? 'tpshop__leftbar-area' : ''}`}>
        {/* Category filter */}
        <CategoryFilter
          category={category}
          updateCategory={updateCategory}
          updateSubCategory={updateSubCategory}
          updateChildCategory={updateChildCategory}
        />
        
        {/* Price filter */}
        <PriceFilter min={priceRange?.min || 0} max={Math.round((priceRange?.max ?? 0) + 1)} onChange={updatePriceRange} />

        {/* Brand filter */}
        <BrandFilter brand={brand} updateBrand={updateBrand} />

        {/* Reset filter */}
        {/* <ResetFilter resetFilters={resetFilters} /> */}
      </div>
    </div>
  );
};

export default ShopSidebar;
