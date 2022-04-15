# webpack 代码分离
## 背景
代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

常用的代码分离方法有三种：

* 入口起点：使用 entry 配置手动地分离代码。
* 防止重复：使用 SplitChunksPlugin 去重和分离 chunk。
* 动态导入：通过模块中的内联函数调用来分离代码。

## 分包的好处
* 抽取公共包，减小多页面应用包大小
* 利用浏览器缓存，包内容不变时文件名不变，减少请求资源的大小
* 避免加载当前页面用不到的资源

## 动态导入
```ts
const VConsoleModule = await import(/* webpackChunkName: "vconsole" */'vconsole')
const VConsole = VConsoleModule.default
// eslint-disable-next-line no-new
new VConsole()
```

## SplitChunks
### webpack4 默认分包策略，也是vue-cli默认分包策略
#### webpack.config.js
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
```
#### 表现
| File                                          | Size        | Gzipped    |
| --------------------------------------------- | ----------- | ---------- |
| dist/solve_11a0c7ae629193fd3ad9.js            | 481.73 KiB  | 156.07 KiB |
| dist/search_11a0c7ae629193fd3ad9.js           | 471.58 KiB  | 151.58 KiB |
| dist/vendors~vconsole_11a0c7ae629193fd3ad9.js | 131.89 KiB  | 33.59 KiB  |
| dist/css/search.97a4ec20.css                  | 73.95 KiB   | 19.44 KiB  |
| dist/css/solve.ab747d0a.css                   | 34.86 KiB   | 9.35 KiB   |
| 总计                                          | 1194.01 KiB | 369.99 Kib |

* 一个页面是一个chunk，如果依赖的包较多，单文件会很大
* 内容一发生改动，chunk名就会变，不能很好地利用缓存机制

### 开启splitchunks(非最优配置)
#### 输出文件名配置
* hash: 与所有文件有关，任一文件变动，打包的hash值都会变
* chunkhash: 与当前chunk内容有关
* contenthash: 与文件内容有关，主要用在css抽取css文件时
#### webpack.config.js
```js
module.exports = {
  //...
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      maxInitialRequests: 10,
      cacheGroups: {
        sentry: {
          name: 'sentry',
          test: /[\\/]node_modules[\\/]@sentry[\\/]/,
          priority: 1,
          chunks: 'all',
        },
        vue: {
          name: 'vue',
          test: /[\\/]node_modules[\\/]vue.*[\\/]/,
          priority: 1,
          chunks: 'all',
        },
        solar: {
          name: 'solar',
          test: /[\\/]node_modules[\\/]@solar[\\/]/,
          priority: 1,
          chunks: 'all',
        }
      },
    }
  }
}

```
#### vue.config.js
注释掉这一行
```js
config.optimization.delete('splitChunks')
```

#### utils.js
```js
exports.getPages = () => {
  const pages = {}
  pageDirs.forEach((dir) => {
    //...
    config.chunks = ['chunk-vendors', 'chunk-common', dir, 'sentry', 'vue', 'solar'] // HtmlWebpackPlugin
    //...
  })
  return pages
}
```

#### 表现
| File                                       | Size       | Gzipped    |
| ------------------------------------------ | ---------- | ---------- |
| dist/vconsole_cb209df205f70141028e.js      | 131.87 KiB | 33.58 KiB  |
| dist/sentry_a2c2fd9c4d6989f42c1e.js        | 114.77 KiB | 32.89 KiB  |
| dist/solar_c1f56c18e11afd17a097.js         | 111.69 KiB | 31.89 KiB  |
| dist/vue_957d38084760cd655100.js           | 110.83 KiB | 37.38 KiB  |
| dist/chunk-vendors_b1cd1cee6f4bcabf6ce1.js | 109.37 KiB | 37.02 KiB  |
| dist/search_f09b36dbeeca13652cda.js        | 54.62 KiB  | 17.82 KiB  |
| dist/solve_14a2ac8a5b469d52e047.js         | 43.53 KiB  | 15.73 KiB  |
| dist/css/search.3fec8f22.css               | 43.29 KiB  | 10.43 KiB  |
| dist/css/solve.ab747d0a.css                | 34.86 KiB  | 9.35 KiB   |
| dist/css/solar.7cd11c58.css                | 30.66 KiB  | 9.25 KiB   |
| 总计                                       | 785.49 KiB | 235.34 KiB |

* gzip前打包后所有文件总大小减少了 (1194.01 - 785.49) / 1194.01 = 34.2%
* gzip后打包后所有文件总大小减少了 (369.99 - 235.34) / 369.99 = 36.4%