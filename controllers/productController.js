const axios = require('axios');

const getProducts = async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

module.exports = { getProducts };
