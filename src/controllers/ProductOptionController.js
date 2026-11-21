const { ProductOption, Product } = require('../models');

exports.create = async (req, res) => {
    try {
        const { product_id, title, shape, value } = req.body;

        if (!product_id || !title || !shape || !value) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
        }

        if (!['text', 'color'].includes(shape)) {
            return res.status(400).json({
                mensagem: 'O formato deve ser text ou color.'
            });
        }

        const product = await Product.findByPk(product_id);

        if (!product) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        const option = await ProductOption.create({
            product_id,
            title,
            shape,
            value
        });

        return res.status(201).json(option);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar opção.'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const options = await ProductOption.findAll({
            where: { product_id: req.params.productId }
        });

        return res.status(200).json(options);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar opções.'
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const option = await ProductOption.findByPk(req.params.id);

        if (!option) {
            return res.status(404).json({
                mensagem: 'Opção não encontrada.'
            });
        }

        await option.destroy();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao excluir opção.'
        });
    }
};