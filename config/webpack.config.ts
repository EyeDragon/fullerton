import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration, ProgressPlugin } from "webpack";
import nodeExternals from "webpack-node-externals";

import { root, subsite } from "./helpers";
import { mergeDeep } from "../utils/function-data";

const commonWebpack: Configuration = {
    resolve: {
        alias: {
            "@": root(""),
            "@config": root("/config"),
            "@environments": root("/environments"),
            "@utils": root("/utils"),

            "@server": root("/src/server"),
            "@controllers": root("/src/server/controllers"),
            "@middlewares": root("/src/server/middlewares"),
            "@models": root("/src/server/models"),
            "@profiles": root("/src/server/profiles"),
            "@routes": root("/src/server/routes"),
            "@services": root("/src/server/services"),
            "@shared": root("/src/server/shared"),

            "@client": root("/src/client"),
            "@adapters": root("/src/client/adapters"),
            "@assets": root("/src/client/assets"),
            "@components": root("/src/client/components"),
            "@composables": root("/src/client/composables"),
            "@entities": root("/src/client/entities"),
            "@pages": root("/src/client/pages"),
        },
        extensions: [".ts", ".js", ".tsx", ".jsx", ".scss", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                exclude: [/node_modules/]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: [/node_modules/]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "common",
                    chunks: "all",
                }
            }
        }
    },
    plugins: [
        new ProgressPlugin(),
        new CleanWebpackPlugin({
            verbose: true,
            dry: false,
            cleanStaleWebpackAssets: false
        })
    ]
};

const webpackClient: Configuration = mergeDeep(commonWebpack, {
    target: "web",
    name: "client",
    entry: {
        client: [root("src/client/index.tsx")],
        vendors: ["babel-polyfill"]
    },
    output: {
        module: true,
        path: root("./dist/client"),
        publicPath: subsite(""),
        chunkFilename: "js/[name].[fullhash].js",
        filename: "js/[name].[fullhash].js",
        assetModuleFilename: "assets/[name][ext]"
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: [/node_modules/]
            }
        ]
    }
} as Configuration);

const webpackServer: Configuration = mergeDeep(commonWebpack, {
    name: "server",
    target: "node",
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    entry: {
        server: [root("src/server/index.ts")],
        vendors: ["babel-polyfill"]
    },
    output: {
        path: root("./dist/server"),
        publicPath: subsite("./dist/server"),
        chunkFilename: "[name].js",
        filename: "[name].js",
    }
} as Configuration);

const webpack: Configuration[] = [webpackClient, webpackServer];

export default webpack;
