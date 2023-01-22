const path = require('path');

module.exports = {
    entry: {
        merchant: './src/Merchant/merchant.js',
        login: './src/Login/login.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
}