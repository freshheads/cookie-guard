const path = require('path');

const config = {
    entry: __dirname + '/src/js/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: 'FHCookieGuard.js',
        library: 'FHCookieGuard',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                    'targets': {
                                        'browsers': ['last 2 versions', 'ie >= 11']
                                    }
                                }
                            ]
                        ]
                    }
                }]
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js']
    }
};

module.exports = config;
