const path = require('path');

module.exports = {
    entry: './front/src/main.ts',
    mode: 'production',
    module: {
        rules: [
            /*
            // This is sloooooow... :/
            {
                include: /^front\/src\/.*\.tsx?$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: {
                    loader: 'tslint-loader',
                    options: {
                        configFile: 'tslint.json',
                        fix: true,
                    },
                },
            },
            */
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
