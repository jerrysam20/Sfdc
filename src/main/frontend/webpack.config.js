const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TARGET = process.env.npm_lifecycle_event;
console.log("printing target");
console.log(TARGET);
const PATHS = {
    source: path.join(__dirname, 'app'),
    output: path.join(__dirname, '../../../target/classes/static'),
    assetsource: path.join(__dirname, 'app/assets'),
    assetdest: path.join(__dirname, '../../../target/classes/static/assets')
};

const common  = {
    entry: [
        PATHS.source
    ],
    output: {
        path: PATHS.output,
        publicPath: '',
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.svg$/, /\.png$/],
            use: {
                loader:
                    'url-loader?limit=5120&name=[name].[ext]&outputPath=../../assets/&publicPath=../assets/'
            }
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
       {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: PATHS.output,
        inline: true,
        port: 9000,
        historyApiFallback: true
    },
    devtool: 'source-map',
    plugins: [new MiniCssExtractPlugin()],
};


if (TARGET === 'start' || !TARGET) {
    console.log("inside dev");

    module.exports = merge(common, {
 //watch: true, watchOptions: {
    //ignored: ['node_modules'],
    //poll: 1000
   //}
});
}

if (TARGET === 'build') {
    console.log("inside normal");
    module.exports = merge(common, {});
}



