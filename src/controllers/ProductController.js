const { Product, Category, ProductImage, ProductOption } = require('../models');

exports.create = async (req, res) => {
    try {
        const { name, slug, description, price, price_with_discount, enabled, stock } = req.body;

        if (!name || !slug || price === undefined) {
            return res.status(400).json({
                mensagem: 'Preencha os campos obrigatórios.'
            });
        }

        const existingProduct = await Product.findOne({ where: { slug } });

        if (existingProduct) {
            return res.status(409).json({
                mensagem: 'Este produto já está cadastrado.'
            });
        }

        const product = await Product.create({
            name,
            slug,
            description,
            price,
            price_with_discount,
            enabled,
            stock
        });

        return res.status(201).json(product);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar produto.'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [Category, ProductImage, ProductOption]
        });

        return res.status(200).json(products);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar produtos.'
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [Category, ProductImage, ProductOption]
        });

        if (!product) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        return res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar produto.'
        });
    }
};

exports.update = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        const fields = ['name', 'slug', 'description', 'price', 'price_with_discount', 'enabled', 'stock'];

        fields.forEach((field) => {
            if (req.body[field] !== undefined) {
                product[field] = req.body[field];
            }
        });

        await product.save();

        return res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao atualizar produto.'
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        await product.destroy();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao excluir produto.'
        });
    }
};