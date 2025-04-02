import React from 'react';

const ResetFilter = ({ resetFilters }) => {
  return (
    <div className="tpshop__widget pt-15">
      <h4 className="tpshop__widget-title mb-20">Reset Filter</h4>
      <div className="productsidebar__btn mt-15 mb-15">
        <a className="pointer" onClick={resetFilters}>Reset</a>
      </div>
    </div>
  );
};

export default ResetFilter;
