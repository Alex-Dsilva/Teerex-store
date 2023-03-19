import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import './products.css'
import { FaFilter, FaSearch } from 'react-icons/fa'

const fetchProducts = async () => {
    return axios.get('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
        .then(response => response.data)
        .catch(error => console.error(error));
}


const Products = () => {
    const [Data, setData] = useState([])
    const [products, setProducts] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [search, setSearch] = useState('')

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const onFilterChange = (selectedFilters) => {
        console.log(selectedFilters)
        console.log(Data)
        const filteredProducts = Data.filter((product) =>
            (selectedFilters.gender === null || product.gender == selectedFilters.gender) &&
            (selectedFilters.color === null || product.color === selectedFilters.color) &&
            (selectedFilters.priceRange === null || product.price >= selectedFilters.priceRange.min && product.price <= selectedFilters.priceRange.max) &&
            (selectedFilters.type === null || product.type === selectedFilters.type)
        );
        setProducts(filteredProducts)
    }

    const handleSearch = () => {
        if (!search) {
            setProducts(Data)
            return
        }
        const searchTerms = search.toLowerCase().split(' ');
        const serachData = Data.filter((product) => {
            const name = product.name.toLowerCase();
            const color = product.color.toLowerCase();
            const type = product.type.toLowerCase();

            return searchTerms.every((term) => {
                return (
                    name == term ||
                    color == term ||
                    type == term
                );
            });
        });
        setProducts(serachData)
    }



    useEffect(() => {
        fetchProducts()
            .then(data => {
                setProducts(data)
                setData(data)
            })
    }, [])

    return (
        <div>
            <div id='Search-Box-Flex'>
                <div id='Search-Box'>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search for products...' />
                    <button onClick={handleSearch}><FaSearch /></button>
                </div>
                <button id='filter-btn' onClick={handleToggleSidebar}><FaFilter /></button>
            </div>
            <div className='flex-box'>
                <Sidebar products={Data} handleToggleSidebar={handleToggleSidebar} onFilterChange={onFilterChange} showSidebar={showSidebar} />
                <div id='product-container'>
                    {products.length ? (
                        products.map((details, i) => {
                            return <Card key={i} details={details} />
                        })
                    ) : (
                        <div id="loading-spinner">
                            <div id="spinner"></div>
                        </div>
                    )

                    }
                </div>
            </div>
        </div>
    )
}

export default Products