1. [多进程问题](https://www.cnblogs.com/ailiailan/p/11850710.html)
   1. apply_async(函数 , (参数 , )) ，这里参数的后面必须要有一个逗号，才能调用子进程
   2. 如果要调用的参数有两个参数，那就apply_async(函数 , (参数1 , 参数2 , )) ，有一点要注意，每个参数在被调函数中必须要有使用到，不然也不会正常运行子线程。
2. 爬虫默认是不翻墙的，可以通过设置requests的配置或者代理开全局模式来翻墙，三个文章
   1. [一](http://www.caotama.com/102570.html)
   2. [二](https://hideu.crisp.help/zh/article/hideu-1aoxdcy/)
   3. [三](https://cnodejs.org/topic/593d631a325c502917ef0881)