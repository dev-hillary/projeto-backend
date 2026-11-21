
const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                mensagem: 'Este e-mail já está cadastrado.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const userData = user.toJSON();
        delete userData.password;

        return res.status(201).json(userData);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar usuário.'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar usuários.'
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar usuário.'
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        const userData = user.toJSON();
        delete userData.password;

        return res.status(200).json(userData);

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao atualizar usuário.'
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        await user.destroy();

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao excluir usuário.'
        });
    }
};
