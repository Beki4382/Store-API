const Product = require('../models/products')
const getAllProducts = async(req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObj = {};
    if (featured) {
        queryObj.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObj.company = company;
    }
    if (name) {
        queryObj.name = name;
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(regEx,
            (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObj[field] = {
                    [operator]: Number(value)

                }
            }



        });
    }
    result = Product.find(queryObj);
    if (sort) {
        const sortList = sort.split(',').join('');
        result = result.sort(sortList);


    }
    if (fields) {
        const fieldList = fields.split(',').join('');
        result = result.select(fieldList);

    }
    const products = await result
    res.status(200)
        .json({ products })
}

const getProduct = async(req, res) => {
    const { id: prodId } = req.params;
    const product = await Product.findById({ _id: prodId });
    if (!product) {
        res.status(404).json({ msg: `
                    product with $ { prodId }
                    not found ` });
    }
    res.status(200).json({ product })
}

const createProduct = async(req, res) => {
    const product = await Product.create(req.body);
    res.status(200).json({ product })
}

const deleteProduct = async(req, res) => {
    const { id: prodId } = req.params;
    const product = await Product.findByIdAndDelete({ _id: prodId });
    if (!product) {
        res.status(404).json({ msg: `
                    product with $ { prodId }
                    not found ` });

    }
    res.status(200).json({ msg: 'product deleted' })
}

const updateProduct = async(req, res) => {
    const { id: prodId } = req.params;
    const newProd = req.body
    const product = await Product.findByIdAndUpdate({ _id: prodId }, newProd);
    if (!product) {
        res.status(404).json({ msg: 'product not updated' })
    }
    res.status(200).json({ msg: 'product updated' })
}

module.exports = { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct };