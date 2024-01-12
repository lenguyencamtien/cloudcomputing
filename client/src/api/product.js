import axios from 'axios';
const URL = 'http://localhost:9000';

const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${URL}/api/product/create`, productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (_id, productData) => {
    try {
        const response = await axios.put(`${URL}/api/product/update/${_id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const fetchProducts = async () => {
    try {
        const response = await axios.get(`${URL}/api/product`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const getProductById = async (_id) => {
    try {
        const response = await axios.get(`${URL}/api/product/find/${_id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const deleteProduct = async (_id) => {
    try {
        const response = await axios.delete(`${URL}/api/product/delete/${_id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const productApi = {
    createProduct,
    updateProduct,
    fetchProducts,
    getProductById,
    deleteProduct,
};

export default productApi;
