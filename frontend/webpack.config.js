const path = require('path')

const webpackConfig = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, 'public'),
        port: 3000
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            modules: path.join(__dirname, '/node_modules')
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        }, {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(woff|woff2|svg|png|jpg|ttf|eot|svg)$/,
            use: ['file-loader']
        }]
    }
}

module.exports = {
    entry: './index.jsx',
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    }
  };

module.exports = webpackConfig