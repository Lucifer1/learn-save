## shell常用指令(不定时更新)

1. ctrl + r: 输入关键字，搜索曾经用过的指令。iterm会保存所有用过的指令(上限多少条不清楚，覆盖方式不清楚)
2. cat用法

    * **cat xxx.txt：** 查看文件内容
    * **cat file1.txt file2.txt > newfile.txt：**把多个文件合并成一个
    * **cat > newfile.txt：**创建并编辑新文件
    * **cat /dev/null > file.txt：**清空文件

3. ls -a：查看所有文件，包括隐藏文件，快捷键是command + shift + .
4. | : 例如 cat cmd1 | cmd2 表示两个命令同时在前台执行，但是cmd1的结果不会被显示出来

    * cat file.txt | clipcopy  查看file.txt的内容并将内容复制到剪切板

5. touch：修改文件或者目录的时间属性，包括存取时间和更改时间。若文件不存在，系统会建立一个新的文件。
6. echo用法

      * 用于字符串的输出

            ```
            echo "It is a test"
            这里的双引号完全可以省略，以下命令与上面实例效果一致：

            echo It is a test
            ```
      * 将结果写入文件：echo "It is a test" > myfile
        * \> :在结尾追加
        * \>>:覆盖整个文件

7. rm：删除文件，如果想删除文件夹得话，用rm -r, rm-rf是强制删除，慎用
8. grep：检索，比如ls之后，通过grep检索对应的文件夹，用一句话就是ls | grep xixixixi
9. vim:查看文件
10. 将指令显示的内容保存到文件夹当中，只需要使用>或者>>就行，例如

    ```
    git help >> text.txt
    将git help显示的内容保存到text.txt当中
    ```
11. rm -rf file #当file为文件时，加-f表示强制删除不提示；当file为目录时，另加-r表示递归，未添加时会报错
12. ll：罗列出当前文件或目录的详细信息，含有读写权限、大小、时间等信息 ，像Windows显示的详细信息。ll是ls -l的别名。相当于Windows里的快捷方式。可以理解为 ll 和 ls -l 的功能是相同的， ll 是 ls -l 的别名。
13. 查看进程lsof -i:xxxx端口号
    1.  杀死端口进程 kill -9 PID