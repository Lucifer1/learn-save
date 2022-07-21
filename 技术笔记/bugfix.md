1. 所有项目sourceMap失效问题
   1. 问题描述：所有项目在删除pack-lock.json文件，重新install之后，所有的sourcemap会看不见源码
   2. 问题排查
      1. 首先确定的是由于某个依赖升级导致的sourmap问题
      2. 然后根据vue文件的打包顺讯一次查看，vue文件在webpack当中会通过vue-loader -> ts-loader -> babel-loader依次解析。
      3. 进入node_modules中，找到对应loader的源码，通过打log的方式，查看在进入loader时，sourcemap是否存在问题
      4. 经过对比lock变化前后在不同loader中sourcemap的变化，vue-loader、ts-loader中更新前后sourcemap不变，但是在babel-loader中发生改变，初步定位到babel-loader问题
      5. 然后观察babel-loder中index文件的源码，发现使用了@babel/core库，对比后发现，该库由7.14升到了7.18
      6. 将版本写死后sourcemap恢复
2. leo-web-page 项目迁移到vue-cli 5，打包速度从3分43优化到45秒
3. 脚手架升级遇到的问题
   1. [脚手架升级到webpack5，报错buffer is undefined](https://viglucci.io/how-to-polyfill-buffer-with-webpack-5)
   2. 升级之后，**安卓7**上new Regex()失效导致页面变大
      1. 解决办法：手动添加polyfill
4. vue-cli5 自动开启modern模式，[关闭方法](https://juejin.cn/post/7038475908339990542)
   1. 区别：modern会打包一个modern包支持现代浏览器，legacy包支持老浏览器，会有双倍打包时间，modern包size小一点
   2. 关闭之后，只会打包老的
5. 微信跳转app，跳转失败
   1. 没有安装app
   2. 只能在公众号里边打开对应的url才能跳转，文件传输助手不行！
6. 校验git commit

      ```bash
      message_file=$1
      message=$(cat $message_file)
      echo $message

      if [[ ! $message =~ ^(feat|fix|docs|style|refactor|test|chore|perf|revert)(\(\w+\))?: ]]
      then
      echo "不合法的 commit 消息提交格式，请使用正确的格式，详情请查看 git commit 提交规范：https://confluence.zhenguanyu.com/pages/viewpage.action?pageId=328510300"
      fi
      ```
   拿到commit msg，然后校验，实现方法
   1. 拿到老的commit-msg钩子，然后[cat > .git/hooks/commit-msg << EOF](https://blog.csdn.net/robin90814/article/details/86705155) 覆盖一哈
   2. [cat写入时，$符号的处理](https://blog.csdn.net/ocean_1991/article/details/103895174)
7. [js 浮点数](https://juejin.cn/post/6844903903071322119)加减乘除操作，加个函数处理
8. RN运行
   1. [RN运行多个项目时，会导致项目运行失败](https://stackoverflow.com/questions/38340360/react-native-application-has-not-been-registered-error)
   2. RN android 0.64与0.69环境变量配置不同，并且修改之后需要执行source
   3. 最好全局配置一个adb
   4. 小米手机安装时，需要把开发者选项 -> USB调试（安全设置）打开，否则安装失败