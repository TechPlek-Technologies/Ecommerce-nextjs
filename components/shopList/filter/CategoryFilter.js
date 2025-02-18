import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { useRouter } from 'next/router';
import ImageLoader from '~/components/Image';

const CategoryFilter = ({ category = [], updateCategory, updateSubCategory, updateChildCategory }) => {
  const { category: parentCategory, subCategory, childCategory } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // State to manage expanded categories and subcategories
  const [expandedCategories, setExpandedCategories] = useState({});
  const [_c, setCatClicked] = useState('');
  const [subClicked, setSubClicked] = useState('');
  const [childClicked, setChildClicked] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState(new Set());

  // Toggle category visibility
  const toggleCategoryVisibility = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Handle category change (parent)
  const handleParentCategory = (categoryId) => {
    if (_c === categoryId) {
      setCatClicked('');
      updateCategory(''); // Deselect category
      setSelectedSubCategories(new Set()); // Clear selected subcategories
      updateSubCategory(''); // Deselect subcategory
      setChildClicked(''); // Deselect child category
      updateChildCategory(''); // Deselect child category
      setExpandedCategories((prev) => ({ ...prev, [categoryId]: false }));
    } else {
      setCatClicked(categoryId);
      updateCategory(categoryId);
      toggleCategoryVisibility(categoryId);
    }
  };

  // Handle subcategory change
  const handleSubCategory = (categoryId, subCategoryId) => {
    if (selectedSubCategories.has(subCategoryId)) {
      selectedSubCategories.delete(subCategoryId);
      setSelectedSubCategories(new Set(selectedSubCategories)); // Update state with the new Set
      updateSubCategory(''); // Deselect subcategory
    } else {
      selectedSubCategories.add(subCategoryId);
      setSelectedSubCategories(new Set(selectedSubCategories)); // Update state with the new Set
      updateSubCategory(subCategoryId);
    }
  };

  // Handle child category change
  const handleChildCategory = (subCategoryId, childCategoryId) => {
    if (childClicked === childCategoryId) {
      updateChildCategory(''); // Deselect child category
      setChildClicked('');
    } else {
      setChildClicked(childCategoryId);
      updateChildCategory(childCategoryId);
    }
  };

  // Detect query change
  useEffect(() => {
    const { category, parent, child } = router.query;
    const query = category ? decodeURI(category) : '';
    const parentCategory = parent ? decodeURI(parent) : '';
    const childCategory = child ? decodeURI(child) : '';
    if (parentCategory.length > 1) {
      setCatClicked(parentCategory);
      setSubClicked(query);
      setChildClicked(childCategory);
      updateSubCategory(query);
      updateCategory(parentCategory);
      updateChildCategory(childCategory);
    } else if (query.length > 1) {
      setCatClicked(query);
      updateCategory(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.category]);

  return (
    <div className="tpshop__widget mb-30 pb-25">
      <h4 className="tpshop__widget-title">Product Categories</h4>
      {category.length > 0 ? (
        category.map((categoryItem) => (
          <div key={categoryItem._id} className="form-check">
            <button
              className={`${_c === categoryItem.slug ? 'parent_button_active' : 'parent_button'}`}
              onClick={() => handleParentCategory(categoryItem.slug)}
              style={{
                display: 'flex',
                alignItems: 'center',

                color: _c === categoryItem.slug ? '#96AE00' : 'initial' // Change text color on selection
              }}
            >
              <ImageLoader
                src={categoryItem.icon[0]?.url}
                alt={categoryItem.name}
                width={22}
                height={22}
                style={{ marginRight: '10px' }} // Add margin to the right of the image
              />
              {categoryItem.name}
            </button>

            {/* Show subcategories only if category is expanded */}
            <div className={_c === categoryItem.slug ? 'show' : 'collapse'}>
              <ul className="list-unstyled ps-0">
                {categoryItem.subCategories.map((subCategoryItem) => (
                  <li key={subCategoryItem._id} className="sublist">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedSubCategories.has(subCategoryItem.slug)}
                        onChange={() => handleSubCategory(categoryItem.slug, subCategoryItem.slug)}
                        id={subCategoryItem.slug}
                        style={{ marginRight: '10px' }}
                      />
                      <label
                        htmlFor={subCategoryItem.slug}
                        style={{
                          fontWeight: selectedSubCategories.has(subCategoryItem.slug) ? 'bold' : 'normal',
                          color: selectedSubCategories.has(subCategoryItem.slug) ? '#007bff' : '#333'
                        }}
                      >
                        {subCategoryItem.name}
                      </label>
                    </div>

                    {/* Show child categories if any */}
                    {subCategoryItem.child?.length > 0 && (
                      <div className={subClicked === subCategoryItem.slug ? 'show' : 'collapse'}>
                        <ul className="list-unstyled ps-0">
                          {subCategoryItem.child.map((child) => (
                            <li
                              key={child._id}
                              onClick={() => handleChildCategory(subCategoryItem.slug, child.slug)}
                              className={childClicked === child.slug ? 'child_active' : ''}
                              style={{ marginLeft: '20px', cursor: 'pointer', fontSize: '14px', color: '#555' }} // Style for child categories
                            >
                              {child.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default CategoryFilter;
