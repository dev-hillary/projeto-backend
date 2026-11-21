
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const ProductOption = require('./ProductOption');
const ProductCategory = require('./ProductCategory');

// Produto possui várias imagens
Product.hasMany(ProductImage, {
    foreignKey: 'product_id'
});

ProductImage.belongsTo(Product, {
    foreignKey: 'product_id'
});

// Produto possui várias opções
Product.hasMany(ProductOption, {
    foreignKey: 'product_id'
});

ProductOption.belongsTo(Product, {
    foreignKey: 'product_id'
});

// Produto pode pertencer a várias categorias
Product.belongsToMany(Category, {
    through: ProductCategory,
    foreignKey: 'product_id',
    otherKey: 'category_id'
});

// Categoria pode possuir vários produtos
Category.belongsToMany(Product, {
    through: ProductCategory,
    foreignKey: 'category_id',
    otherKey: 'product_id'
});

module.exports = {
    User,
    Category,
    Product,
    ProductImage,
    ProductOption,
    ProductCategory
};
