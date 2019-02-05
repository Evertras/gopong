const path = require('path');

module.exports = {
    entry: './front/src/main.ts',
    mode: 'production',
    module: {
        rules: [
            {
                include: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'front')
    }
};
