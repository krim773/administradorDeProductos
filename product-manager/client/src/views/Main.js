import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCreateForm from '../components/ProductCreateForm';
import ProductList from '../components/ProductList';

const Main = () => {
    // Estado local para almacenar los productos y si se han cargado o no
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Se ejecuta una vez cuando el componente se monta
        console.log('use effect');
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                setProducts(res.data); // Guardar los productos en el estado local
                setLoaded(true); // Marcar que los productos se han cargado
            });
    }, []);

    // Función para eliminar un producto del DOM
    const removeFromDOM = (id) => {
        setProducts(products.filter(product => product._id !== id)); // Filtrar y actualizar la lista de productos sin el producto eliminado
    }

    return (
        <div className='mb-5'>
            <ProductCreateForm /> {/* Componente para crear un nuevo producto */}
            <hr />
            {loaded && <ProductList products={products} removeFromDOM={removeFromDOM} />} {/* Mostrar la lista de productos solo cuando se hayan cargado */}
        </div>
    );
}

export default Main;
