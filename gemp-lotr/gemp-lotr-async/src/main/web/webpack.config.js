const path = require('path');

module.exports = {
    entry: './src/Merchant/merchant.js',
    output: {
        filename: 'merchant.js',
        path: path.resolve(__dirname, 'dist')
    }
}