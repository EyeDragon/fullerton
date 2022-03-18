import { DefinePlugin, Configuration } from "webpack";
import HtmlWebpackHarddiskPlugin from "html-webpack-harddisk-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

import webpack from "../webpack.config";
import env from "../../environments/prod.env";
import { IndexConfig, root, subsite } from "../helpers";
import { definePlugin, mergeDeep } from "../../utils/function-data";

webpack[IndexConfig.Client] = mergeDeep(webpack[IndexConfig.Client], {
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name].[ext]"
                }
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/img/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new DefinePlugin(definePlugin(env)),
        new HtmlWebpackPlugin({
            template: root("./src/client/index.html"),
            publicPath: subsite("."),
            alwaysWriteToDisk: true,
            inject: true,
            filename: "index.html",
            favicon: root("./src/client/assets/logo/react-logo.png"),
            chunks: ["common", "vendors", "client"]
        }),
        new HtmlWebpackHarddiskPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: root("./src/client/assets/logo"),
                    to: root("./dist/client/assets/logo")
                },
                {
                    from: root("./src/client/assets/img"),
                    to: root("./dist/client/assets/img")
                }
            ]
        }),
    ]
} as Configuration);

export default webpack[IndexConfig.Client];
