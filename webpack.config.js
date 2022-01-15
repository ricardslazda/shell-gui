const path = require("path");

module.exports = {
    resolve: {
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/renderer'),
        },
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    }
};