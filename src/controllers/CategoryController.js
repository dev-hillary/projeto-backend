const { Category } = require('../models');

exports.create = async (req, res) => {
    try {
        const { name, slug } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
        }

        const existingCategory = await Category.findOne({
            where: { slug }
        });

        if (existingCategory) {
            return res.status(409).json({
                mensagem: 'Esta categoria já está cadastrada.'
            });
        }

        const category = await Category.create({
            name,
            slug
        });

        return res.status(201).json(category);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar categoria.'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const categories = await Category.findAll();

        return res.status(200).json(categories);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar categorias.'
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada.'
            });
        }

        return res.status(200).json(category);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar categoria.'
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, slug } = req.body;

        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada.'
            });
        }

        if (name !== undefined) category.name = name;
        if (slug !== undefined) category.slug = slug;

        await category.save();

        return res.status(200).json(category);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao atualizar categoria.'
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada.'
            });
        }

        await category.destroy();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao excluir categoria.'
        });
    }
};