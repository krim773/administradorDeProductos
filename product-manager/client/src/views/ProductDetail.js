import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
    // Obtener los parámetros de la URL
    const { id } = useParams();

    // Estado local para almacenar la información del producto
    const [product, setProduct] = useState({});

    // Hook de navegación para redireccionar
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los detalles del producto desde el backend
        axios.get('http://localhost:8000/api/product/' + id)
            .then(res => {
                setProduct(res.data); // Guardar la información del producto en el estado local
            });
    }, []);

    // Función para eliminar un producto
    const deleteProduct = (id) => {
        axios.delete('http://localhost:8000/api/product/' + id)
            .then(res => {
                console.log("Product Delete succesfully", res);
                // Redireccionar a la página de inicio
                navigate('/');
            });
    }

    return (
        <div className='product-detail'>
            <h1>{product.title}</h1>
            <p><strong>Price: </strong>${product.price}</p>
            <p><strong>Description: </strong>{product.description}</p>
            <hr />

            <Link to={'/'} className='btn btn-outline-secondary me-4'>Go Home</Link>
            <button
                className="btn btn-outline-danger me-4"
                onClick={() => {
                    // Mostrar una confirmación antes de eliminar el producto
                    window.confirm("Are you sure you want to delete this item") && deleteProduct(product._id)
                }}
            >Delete</button>
            <Link to={"/" + product._id + "/edit"} className="btn btn-success">Edit</Link>
        </div>
    );
}

export default ProductDetail;
