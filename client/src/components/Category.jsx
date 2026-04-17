import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import getProducts from '../apis/getProducts'



import Header from './category/Header'
import Main from './category/Main'


const Category = () => {

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const colors = [
  { name: 'Black',  hex: 'bg-black' },
  { name: 'White',  hex: 'bg-white border border-neutral-300' },
  { name: 'Navy',   hex: 'bg-blue-900' },
  { name: 'Grey',   hex: 'bg-neutral-400' },
  { name: 'Beige',  hex: 'bg-amber-100 border border-neutral-300' },
  { name: 'Brown',  hex: 'bg-amber-800' },
];
  
  // ── API state ──────────────────────────────────────────────────────────────
  const [allProducts, setAllProducts] = useState([]);
  const [status,setStatus] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const productApi = async () => {
      const products = await getProducts();
      setStatus(products.status);
      setAllProducts(products.status==="Success" && products.data?products.data: []);
    };
    productApi();
  }, []);

  // ── Filter / sort state ───────────────────────────────────────────────────
  const { category } = useParams();

  const [selectedSizes,  setSelectedSizes]  = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOption,     setSortOption]     = useState('New Arrivals');

  const toggleSize = (size) =>
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );

  const toggleColor = (colorName) =>
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );

  // ── Derived list ──────────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // 1. Filter by category
    if (category) {
      result = result.filter(p => p.category === category);
    }

    // 2. Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
    }

    // 3. Filter by color
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors?.some(c => selectedColors.includes(c)));
    }

    // 4. Sort
    result = [...result];
    if (sortOption === 'Price Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'New Arrivals') {
      result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    return result;
  }, [allProducts, category, selectedSizes, selectedColors, sortOption]);

  const displayCategory = category ? category.replace('-', ' ') : 'All Products';




// -----------------------------------------------------------------------------------------//







  return (
    <div>
      
      <Header 
        displayCategory={displayCategory} 
        filteredProducts={filteredProducts}
        />


      <Main 
        sizes={sizes}
        colors={colors}
        toggleSize={toggleSize}
        toggleColor={toggleColor}
        filteredProducts={filteredProducts}
        selectedSizes={selectedSizes}
        selectedColors={selectedColors}
        sortOption={sortOption}
        setSortOption={setSortOption}
        allProducts={allProducts}
        status={status}
        />
    </div>
  )
}

export default Category