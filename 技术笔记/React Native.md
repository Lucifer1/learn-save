1. 查看 RN 的日志：在需要调试的位置调用 console.log() 打印日志。那么在哪里查看日志呢？在 RN 工程下，命令行输入 react-native log-android，可以查看 RN 的打印日志。如果华为手机无法正常打印日志，参考 博客 ，我的华为手机有时候打印日志，有时候不打印，建议调试过程使用 piexl 手机。
2. 安装react-devtools失败
   1. 别用npm 用 yarn
   2. yarn global add react-devtools
   3. 如果已经用了npm,先npm uninstall -g react-devtools和npm uninstall -g electron，然后再用yarn
