const rspack = require('@rspack/core')

const refreshPlugin = require('@rspack/plugin-react-refresh')
const isDev = process.env.NODE_ENV === 'development'
const lessRule = [/\.less$/, /\.css$/];
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  devServer: {
    
  },
  context: __dirname,
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14',
                ],
              },
            },
          },
        ],
      },
      {
        test: lessRule,
        use: [
            {
                loader: 'less-loader'
            },
            {
              loader: 'style-resources-loader',
              options: {
                  patterns: [
                      './src/dlsToken.less',
                    // paths.defaultVar || ''
                  ]
              }
          }
        ],
        type: 'css'
    },
    ],
  },
  plugins: [
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    isDev ? new refreshPlugin() : null,
    new rspack.container.ModuleFederationPlugin({
      // 模块联邦的名称
      // 该名称将成为一个全部变量，通过该变量将可获取当前联邦的所有暴露模块
      name: 'home',
      // 模块联邦生成的文件名，全部变量将置入到该文件中
      filename: 'home-entry.js',
      // 模块联邦暴露的所有模块
      exposes: {
        // key：相对于模块联邦的路径
        // 这里的 ./now 将决定该模块的访问路径为 home/now
        // value: 模块的具体路径
        './now': './src/now.js',
      },
      remotes: {
        // key: 自定义远程暴露的联邦名
        // 比如为 abc， 则之后引用该联邦的模块则使用 import "abc/模块名"
        // value: 模块联邦名@模块联邦访问地址
        // 远程访问时，将从下面的地址加载
        active: 'active@http://localhost:3000/active-entry.js',
      },
      shared: {
        // jquery为共享模块
        jquery: {
          singleton: true, // 全局唯一
        },
      },
    }),
  ].filter(Boolean),
}
