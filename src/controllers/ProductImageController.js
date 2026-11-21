const { ProductImage, Product } = require('../models');

exports.create = async (req, res) => {
    try {
        const { product_id, path } = req.body;

        if (!product_id || !path) {
            return res.status(400).json({
                mensagem: 'Informe o produto e o caminho da imagem.'
            });
        }

        const product = await Product.findByPk(product_id);

        if (!product) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        const image = await ProductImage.create({
            product_id,
            path
        });

        return res.status(201).json(image);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar imagem.'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const images = await ProductImage.findAll({
            where: { product_id: req.params.productId }
        });

        return res.status(200).json(images);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar imagens.'
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const image = await ProductImage.findByPk(req.params.id);

        if (!image) {
            return res.status(404).json({
                mensagem: 'Imagem não encontrada.'
            });
        }

        await image.destroy();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao excluir imagem.'
        });
    }
};