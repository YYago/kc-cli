# 看云文档内容自定义样CSS

> CSS仅支持文档内容区域。

## 使用方法

1. 常规，在看云点击“`编辑`”进入文档，在编辑页面打开“`样式设置`”，然后把你想要的CSS代码复制之后粘贴进去保存即可。
2. （本地仓库）使用工具 [kc-cli](https://www.npmjs.com/package/kc-cli) 命令下载到本地的文档仓库中的`style/website.css`文件中。
    > **注意**：这会重写这个文件，如果不打算全面重写`style/website.css`文件请不要执行这一步。
    * 在`themes`下打开想要的CSS代码文件，然后点击“`Raw`”按钮，跳转之后复制下浏览器地址；
    * 进入本地clone下来的文档仓库文件夹中，使用终端输入命令：`kc theme url  ` 然后粘贴上刚复制的网址，最好按回车执行。 它会自动下载代码并重写`style/website.css`文件。

## 贡献你的自定义方案

### 文件格式要求

1. 仅 `CSS`类型文件。
2. 命名规则：`[作者]_[作用区域].css`:
    * 针对单个区域，例如：`pwedu_TOC.css`，pwedu贡献的针对 TOC 区域做的自定义设计。
    * 针对两个区域以上用 `full`，至于具体的区域可在文件内注释说明，例如：`xiak_full.css`。
    * 如果跟已有文件重名的，先贡献的有优先权，请自行将自己的`[作者]`命名为无重复的名称。
3. CSS头部注释，光从文件名很难看清都做了什么，你需要在CSS文件的顶部做好注释，例：
    ```css
    /*
        File: pwedu_TOC.css
        Version: v1
        Example:
        Author: YYago
        HomePage: https://www.kancloud.cn/@pwedu
        Date: 2018-10-18 03:17:16
        Description: 
            1. 看云文档内容样式CSS，拷贝并存为 style/website.css使用。
                本地可以使用 KC-CLI 命令：kc theme url [本文件 GitHub Raw地址] 快速获取。
            2. 本 CSS 只是针对文档插件：TOC 进行优化：
                2.1. 在大屏设备下[TOC] 固定到浏览器左上角（半透明处理）。
                2.2. 小屏设备保持原样。 
        Compatibility: >=IE6
        LICENSE: MIT
    */
    ```
    > File（文件名）、Version（版本:整数）、Example（示例地址）、Author（作者:GitHub usename）、Description（描述）、Compatibility（兼容性）、LICENSE（协议）等项是必须的。

4. 注意设备（屏幕尺寸）兼容性。 
5. CSS代码应该尽量限制作用范围。比如仅针对代码块内的 `<code></code>`，那就不要让它影响到正常段落中的`<code></code>`。
6. 可读性，格式化为正常的CSS格式，不要压缩，保留注释。
7. 原则上版本更新只能更改自己的文件。
8. 尽量避免使用背景图片（涉及外链，加载速度、权限、图片大小等可能引发问题）。

> 如果提交的版本涉及贡献者自己的CSS文件以外的内容，可能不予合并。

### 脚架已搭好(Gulp)

> 这步是现写才需要弄(用了less)，如果你有现成的CSS文件，可以跳过。

为方便大家设计，脚架以搭好。

1. fork 并 clone到本地之后进入 themes 分支。
    ```shell
    git checkout themes
    ```
2. 安装开发依赖package
    ```shell
    npm install
    ```
3. 打开`gulpfile.js` 进行配置并保存：
    ```js
    // 开始运行之前请做基础设置
    //.......Conf Star 请在这里配置相关信息：......................

    const confs = {
        less: 'theme.less', // 默认的 less 路径。
        forWhat: 'full',    // 针对的区域，例如：'TOC',多个区域则用'full'
        Version: 'v1',      // 版本,V+整数，例如：v1
        Author: "YYago",    // GitHub 用户名，例如：YYago
        HomoPage: '',       // 个人主页
        ExampleURL: "",     // 示例文档地址
        // 描述,可换行多行。
        Description: ``,
        // 浏览器兼容性，例如：>=IE9
        Compatibility: `>=IE6`,
        // 协议，默认MIT
        LICENSE: `MIT`
    }
    //.......Conf End ......................
    ```
4. 初始化，会生成`build/theme.less`文件。
    ```shell
    gulp init
    ```
5. 在`build/theme.less`文件夹中开发，运行`'gulp css'` 进行编译`'build/theme.less'`（编译好的CSS文件在`'build/'`），如果需要实时编译使用命令：`'gulp w'`。 完成之后运行：`'gulp pub'`，CSS 文件从 'build' 转移到`'themes/'`下。

6. 需要贡献给 kc-cli themes 分支的，可以发起PR（需要fork）。**PR请求被更改只能是新增（修改）的CSS文件**。

### 更为简单的贡献方法（毕竟操作Git很麻烦）：
    
1. 先在GitHub 上 fork kc-cli。
2. 进入themes 分支。
3. 进入themes 文件夹。
4. 新增一个CSS文件，文件名和内容按照前面提到的要求编辑好并commit。
5. 发起PR即可。

收到PR之后我们会尽快处理。
> 比起clone到本地再push再发PR，这算是最简单的了。菜鸟真言：我自己都快被弄晕了......这样你方便我也方便，哈哈......
