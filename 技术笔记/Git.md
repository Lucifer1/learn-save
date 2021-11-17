# Git
学习[廖雪峰Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)笔记

## 1. 创建版本库
* **git init**
进入文件夹之后再输入指令，将文件创建为一个git管理的文件夹

        cd f
        cd learnGit
        git init
        显示：Initialized empty Git repository

* **git add**
添加一个文件 readme.txt

        git add readme.txt

* **git commit**

        git commit -m "wrote a readme file"
        "-m"是对本次操作的注释

## 2. 版本管理
* **git status**
查看版本库的当前状态，是否有文件进行改动

        $ git status
        # On branch master
        # Changes not staged for commit:
        #   (use "git add <file>..." to update what will be committed)
        #   (use "git checkout -- <file>..." to discard changes in working directory)
        #
        #    modified:   readme.txt
        #
        no changes added to commit (use "git add" and/or "git commit -a")

* **git diff**
显示文件修改的具体内容

        $ git diff readme.txt
        diff --git a/readme.txt b/readme.txt
        index 46d49bf..9247db6 100644
        --- a/readme.txt
        +++ b/readme.txt
        @@ -1,2 +1,2 @@
        -Git is a version control system.
        +Git is a distributed version control system.
         Git is free software.

* **git log**
显示最近的提交日志，提交的详细信息

        $ git log
        commit 3628164fb26d48395383f8f31179f24e0882e1e0
        Author: Michael Liao <askxuefeng@gmail.com>
        Date:   Tue Aug 20 15:11:49 2013 +0800

            append GPL

        commit ea34578d5496d7dd233c827ed32a8cd576c5ee85
        Author: Michael Liao <askxuefeng@gmail.com>
        Date:   Tue Aug 20 14:53:12 2013 +0800

            add distributed

        commit cb926e7ea50ad11b8f9e909c05226233bf755030
        Author: Michael Liao <askxuefeng@gmail.com>
        Date:   Mon Aug 19 17:51:55 2013 +0800

            wrote a readme file

* **git reset --hard**
可以通过git log获得版本信息，HEAD表示当前版本，HEAD^表示上一个版本，HEAD^^表示上上版本，HEAD~100表示前100个版本，也可以在hard后边直接加上版本号，返回对应版本，但是返回之后，git log中返回版本的后边的所有记录会消失，例如：返回到 add distributed版本，那么append GPL就会消失。

        当前处于 append GPL版本

        $ git reset --hard HEAD^
        HEAD is now at ea34578 add distributed

        对应的git log
        $ git log
        commit ea34578d5496d7dd233c827ed32a8cd576c5ee85
        Author: Michael Liao <askxuefeng@gmail.com>
        Date:   Tue Aug 20 14:53:12 2013 +0800

            add distributed

        commit cb926e7ea50ad11b8f9e909c05226233bf755030
        Author: Michael Liao <askxuefeng@gmail.com>
        Date:   Mon Aug 19 17:51:55 2013 +0800

            wrote a readme file

        即使后边在log中消失，也可以使用版本号复原，它只是把指针移到了distributed版本
        ，但是并没有删除，只是看不到了，所以通过版本号还是可以把指针移回去
        $ git reset --hard 3628164
        HEAD is now at 3628164 append GPL

* **git reflog**
此命令是用来记录每一次命令，即使退回到某版本，也可以找到后边的版本号，可以确定回到未来哪个版本

        $ git reflog
        ea34578 HEAD@{0}: reset: moving to HEAD^
        3628164 HEAD@{1}: commit: append GPL
        ea34578 HEAD@{2}: commit: add distributed
        cb926e7 HEAD@{3}: commit (initial): wrote a readme file

## 3. 暂缓区
git add之后是把在工作区修改和新增的文件加入到暂存区，git commit是把暂存区的文件添加到版本库当中，接下来考虑一种情况：

        第一次修改 -> git add -> 第二次修改 -> git commit

那么这次commit的内容为第一次修改的内容，因为第一次修改通过git add加入到了暂存区当中，而第二次修改没有，而commit只是把暂存区中的内容加入到版本库中，所以这次的内容为第一次修改的内容，如果修改成为下列顺序则没有问题，因为相当于合并两次添加

        第一次修改 -> git add -> 第二次修改 -> git add -> git commit

## 4. 撤回修改
* **git checkout -- file**
如果还没有加入到缓存区的时候用，可以通过git status来查看对应指令

        $ git checkout -- readme.txt
命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
总之，就是让这个文件回到最近一次git commit或git add时的状态。

* **git reset HEAD file**
加入到缓存区后想要撤销的时候用，可以通过git satus来查看对应的指令

        $ git reset HEAD readme.txt
        Unstaged changes after reset:
        M       readme.txt
**如果加入到版本库中想要撤回只需返回上一个版本即可，对应命令去上边找**
**如果已经加入到远程库当中，那就GG**

##  5. 删除文件
* **rm file**
        $ rm test.txt
删除之后有两种情况
1. 确实要删除此文件，那么就问git rm file删掉，然后commit

        $ git rm test.txt
        rm 'test.txt'
        $ git commit -m "remove test.txt"
        [master d17efd8] remove test.txt
         1 file changed, 1 deletion(-)
         delete mode 100644 test.txt
2. 删错了，那么撤回，和上节一样git checkout -- file

        $ git checkout -- test.txt

***注意：***命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。

##  6. 远程仓库
1. 注册[GitHub](https://github.com/)账号
2. 如果在主目录下没有.ssh文件夹，则用Git Bash创建，创建过程中一路回车即可，不需设密码，当然如果你想也可以，id_rsa是私钥，不能泄露，id_rsa.pub是公钥，用来添加到GitHub当中，可以放心使用，如果到其他地方办公，只需把办公地的公钥添加到GitHub中即可

        $ ssh-keygen -t rsa -C "youremail@example.com"

3. 登录后，打开setting，找到Add SSH，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容
4. 本地库和远程库建立连接，现在GitHub中建立一个新的repository
5. 根据提示将本地库的内容添加到远程库中

        $ git remote add origin git@github.com:michaelliao/learngit.git
        请千万注意，把上面的michaelliao替换成你自己的GitHub账户名
**关联后，使用如下命令第一次推送master分支的所有内容，由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样**

        git push -u origin master
此后，每次本地提交后，只要有必要，就可以使用一下命令推送最新修改

        git push origin master

6. **git clone**

        $ git clone git@github.com:michaelliao/gitskills.git
        Cloning into 'gitskills'...
        remote: Counting objects: 3, done.
        remote: Total 3 (delta 0), reused 0 (delta 0)
        Receiving objects: 100% (3/3), done.
你也许还注意到，GitHub给出的地址不止一个，还可以用https://github.com/michaelliao/gitskills.git这样的地址。实际上，Git支持多种协议，默认的git://使用ssh，但也可以使用https等其他协议。使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。
&nbsp;
1. 要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。
2. Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。

## 7. 创建分支
* **git checkout -b dev**
这个指令为创建一个名为dev的分支，并切换到dev分支，相当于
git branch dev,git checkout dev两个合二为一

* **git branch**
查看当前所有分支，*为当前使用的分支

* **git merge**
合并指定分支到当前分支，默认使用Fast forword模式例：

        切换到master分支，输入：
        $ git merge dev
        就是把dev合并到master分支上

* **git branch -d dev**
删除指定分支

* **解决冲突**
要去本地库中手动解决冲突，然后再进行合并，用git log --graph命令可以看到分支合并图。

* **其他合并模式**
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。
如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

        $ git merge --no-ff -m "merge with no-ff" dev
        Merge made by the 'recursive' strategy.
        readme.txt |    1 +
        1 file changed, 1 insertion(+)
因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。
合并后，我们用git log看看分支历史：
$ git log --graph --pretty=oneline --abbrev-commit

        +   7825a50 merge with no-ff
        |\
        | * 6224937 add merge
        |/
        +   59bc1cb conflict fixed
        ...

* **BUG分支**
软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。
当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但是当前正在dev上进行的工作还没有提交，利用

        $ git stash
        Saved working directory and index state WIP on dev: 6224937 add merge
        HEAD is now at 6224937 add merge
现在，用git status查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。
工作区是干净的，刚才的工作现场存到哪去了？用git stash list命令看看：

        $ git stash list
        stash@{0}: WIP on dev: 6224937 add merge
一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；
另一种方式是用git stash pop，恢复的同时把stash内容也删了

* **多人协作**
当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。
要查看远程库的信息，用git remote：

        $ git remote
        origin
或者，用git remote -v显示更详细的信息：

        $ git remote -v
        origin  git@github.com:michaelliao/learngit.git (fetch)
        origin  git@github.com:michaelliao/learngit.git (push)
上面显示了可以抓取和推送的origin的地址。如果没有推送权限，就看不到push的地址。

## 8. 日常问题

### Git

1. git restore --staged 将文件从暂存区撤出，但不会撤销文件的更改
2. git resore 将不在暂存区的文件撤销更改
3. git pull 命令用于从远程获取代码并合并本地的版本。git pull 其实就是 git fetch 和 git merge FETCH_HEAD 的简写。
4. git reset：书签里有个图片，听清楚的，可以结合看，在git文件夹里

   * --hard：重置stage区和工作目录:reset --hard 会在重置 HEAD 和branch的同时，重置stage区和工作目录里的内容。当你在 reset 后面加了 --hard 参数时，你的stage区和工作目录里的内容会被完全重置为和HEAD的新位置相同的内容。换句话说，就是你的没有commit的修改会被全部擦掉。hard就是连工作区的代码都不保存，直接删掉
   * --soft：保留工作目录，并把重置 HEAD 所带来的新的差异放进暂存区。简单来说就是将更新到版本库中的东西回退到暂存区
   * --mixed：默认参数，将暂存区的文件放回到工作区

5. stash与stage的区别：stash是缓存区，用于临时存放修改的文件，而stage是暂存区，也就是git add之后添加到的位置
   * git stash list:查看stash里边有什么东西
   * git stash save "save message"  : 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。
   * git stash list  ：查看stash了哪些存储
   * git stash show ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}
   * git stash show -p : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show  stash@{$num}  -p ，比如第二个：git stash show  stash@{1}  -p
   * git stash apply :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1}
   * git stash pop ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}
   * git stash drop stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储
   * git stash clear ：删除所有缓存的stash


6. git branch
   1. git branch查看本地所有分支
   2. git branch -r查看远程所有分支
   3. git branch -a查看本地和远程所有分支
  一般当前本地分支前带有“*”号且为绿色，远程分支为红色

7. 切换分支：git checkout 分支名
8. 创建并且切换到分支里：git checkout -b 分支名
9. 你回退到了某个版本，关掉了电脑，第二天早上就后悔了，想恢复到新版本怎么办？找不到新版本的`commit id`怎么办？Git提供了一个命令git reflog用来记录你的每一次命令。可以尝试查找commit的commit id
10. git push用法
    1.  git push <远程主机名> <本地分支名>:<远程分支名>
    2.  git push <远程主机名> <本地分支名>
    3.  git push origin：如果当前分支与远程分支存在追踪关系，那么本地分支和远程分支都可以省略，直接将当前分支推送到origin主机对应的分支。
    4.  git push：如果当前分支只有一个远程分支，那么主机名都可以省略，形如 git push，可以使用git branch -r ，查看远程的分支名
    5.  origin基本上就是远程仓库的默认名称
11. git配置文件
    1.  system
      * 系统级别，一般存放系统设置，作用范围最大
      * 一般存放于\[Git安装目录\]\\mingw64\\etc\\gitconfig,但是Git不会自动生成这个文件只有通过命令编辑文件后，该文件才会生成,编辑命令git config --system --edit
    2. global
      * 全局文件，整个系统用户范围内生效，作用范围比system小
      * 配置文件不会自动生成，通过命令git config --global --edit编辑之后生成，位置默认在C:\Users\Administrator\.gitconfig
    3. local
      * 每个仓库的配置文件，作用范围最小，只在本仓库生效
      * clone或者init时自动生成，位置在.git\config
    4. 编辑配置文件
      * 加上--global可以编辑全局配置，其他配置文件以此类推，放在-e或者--edit的左右两侧都可以
      * --edit可简写成-e
      * 如果不加--global等参数，默认编辑的是仓库配置文件
        ```
        git config [--global|--local|--system] --edit
        git config [--global|--local|--system] -e
        ```
      * 配置单个指令的语句
        ```
        //xxx为要修改的属性，sss为需要配置的内容
        git config [--global|--system|--local] xxx 'sss'

        //配置全局配置文件中的user.name
        git config --global user.name 'leilei'
        ```

12. 一定要在干活之前git pull，否则就会有点麻烦，如果真的忘记了，那么久手动处理冲突，可能会涉及到的指令：

    * git stash：
      * `git stash`：保存当前工作进度，将工作区和暂存区恢复到修改之前。
      * `git stash save message`：作用同上，message为此次进度保存的说明。
      * `git stash list`：显示保存的工作进度列表，编号越小代表保存进度的时间越近。
      * `git stash pop [stash@{num}]`：恢复工作进度到工作区，此命令的stash@{num}是可选项，在多个工作进度中可以选择恢复，不带此项则默认恢复最近的一次进度相当于git stash pop stash@{0}
      * `git stash apply [stash@{num}]`：恢复工作进度到工作区且该工作进度可重复恢复，此命令的stash@{num}是可选项，在多个工作进度中可以选择恢复，不带此项则默认恢复最近的一次进度相当于git stash apply stash@{0}
      * `git stash drop stash@{num}`:删除一条保存的工作进度，此命令的stash@{num}是可选项，在多个工作进度中可以选择删除，不带此项则默认删除最近的一次进度相当于git stash drop stash@{0}
      * git stash clear：删除所有保存的工作进度。
    * git reset

13. 解决冲突：git pull --rebase，这是大佬推荐的方法，也可以使用merge，但是大佬觉得merge与rebase相比，没有任何优点
14. git commit --amend 基于当前的暂存区与上一个commit产生一个新的commit
15. 互动式git学习网站：learngitbranching.js.org
16. 大佬建议：https://www.leshenko.net/p/ugit/# 推荐一个用 Python 实现一个简化版 Git 的库，跟着写完之后，Git 再无秘密
17. git commit --amend 用于修改上一次的commit，如果第一个commit提交之后，你又对文件进行了修改，使用这个命令可以把两次修改合并
18. git add .添加所有更改， git reset .撤销所有add
19. git revert
20. git merge有冲突的情况，查一下，下午那个问题
    1.  在merge的时候会自动commit一下，上次的情况是，merge之后有冲突，那么commit就失败了，所以当我们reset是reset到上一次的commit，而不是我们自己的commit，所以我们reset之后拿到的不是我们修改之后的代码
21. git stash clear  :注意这是清空你所有的内容
22. git stash drop stash@{0}
23. checkout 与 branch
    1.  创建分支： $ git branch mybranch
    2.  切换分支： $ git checkout mybranch
    3.  创建并切换分支： $ git checkout -b mybranch
24. 创建新的分支并提交到远程
    1.  git branch -a：查看所有分支
    2.  git checkout -b test01：创建本地test01分支
    3.  git push --set-upstream origin test01：把本地test01分支推送到远程，看下边的博客
25. [--set-upstream](http://blog.sina.com.cn/s/blog_694270050102zbrq.html)
26. [git rebase](http://gitbook.liuhui998.com/4_2.html)，[第二篇](https://www.cnblogs.com/xueweihan/p/5743327.html)
27. [git cherry-pick 提交号](https://backlog.com/git-tutorial/cn/stepup/stepup7_4.html)
    1.  把修改移动到master分支后，用cherry-pick 取出「添加commit的讲解」提交，然后将其添加到master。（文档里的提交"99daed2"和下载到数据库里的提交有可能不相同。在下载的数据库里执行git log，确认是正确的提交之后再使用。）

        ```
        $ git checkout master
        Switched to branch 'master'
        $ git cherry-pick 99daed2
        ```







