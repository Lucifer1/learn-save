1. 所有项目sourceMap失效问题
   1. 问题描述：所有项目在删除pack-lock.json文件，重新install之后，所有的sourcemap会看不见源码
   2. 问题排查
      1. 首先确定的是由于某个依赖升级导致的sourmap问题
      2. 然后根据vue文件的打包顺讯一次查看，vue文件在webpack当中会通过vue-loader -> ts-loader -> babel-loader依次解析。
      3. 进入node_modules中，找到对应loader的源码，通过打log的方式，查看在进入loader时，sourcemap是否存在问题
      4. 经过对比lock变化前后在不同loader中sourcemap的变化，vue-loader、ts-loader中更新前后sourcemap不变，但是在babel-loader中发生改变，初步定位到babel-loader问题
      5. 然后观察babel-loder中index文件的源码，发现使用了@babel/core库，对比后发现，该库由7.14升到了7.18
      6. 将版本写死后sourcemap恢复