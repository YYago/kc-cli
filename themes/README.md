# 看云文档内容自定义样CSS

> CSS仅支持文档内容区域。

## 使用方法

1. 常规，在看云点击“编辑”进入文档，在编辑页面打开“样式设置”，然后把你想要的CSS代码复制之后粘贴进去保存即可。
2. （本地仓库）使用工具 [kc-cli](https://www.npmjs.com/package/kc-cli) 命令下载到本地的文档仓库中的`style/website.css`文件中。
    > **注意**：这会重写这个文件，如果不打算全面重写`style/website.css`文件请不要执行这一步。
    * 打开想要的CSS代码文件，点击“`Raw`”按钮，跳转之后复制下浏览器地址；
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

### 脚架已搭好

为方便大家设计，打包脚架以搭好。


