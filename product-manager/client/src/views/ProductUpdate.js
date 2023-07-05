import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProductUpdate = () => {
    // Obtener el id de la URL
    const { id } = useParams();

    // Estado local para los valores del formulario
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    // Hook de navegación para redireccionar
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los detalles del producto específico para actualizarlo
        axios.get('http://localhost:8000/api/product/' + id)
            .then(res => {
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
            });
    }, []);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Actualizar el producto
        axios.put('http://localhost:8000/api/product/' + id, { title, price, description })
            .then(res => console.log("Product updated succesfully", res));
        // Redireccionar a la página de detalles después de actualizar
        navigate('/' + id);
    }

    return (
        <div>
            <h1>Update Product</h1>
            <form className='text-center mt-5 mb-3 mx-auto' onSubmit={onSubmitHandler} style={{ width: '350px' }}>
                <div className='mt-4'>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Title</span>
                        <input id='title' type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Price</span>
                        <input type="number" className="form-control" min={0} value={price} onChange={e => setPrice(e.target.value)} required />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Description</span>
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                    </div>
                    <Link to={'/' + id} className='btn btn-outline-danger me-4'>Cancel</Link>
                    <button type="submit" className="btn btn-success px-4 text-center">Update</button>
                </div>
            </form>
        </div>
    );
}

export default ProductUpdate;
