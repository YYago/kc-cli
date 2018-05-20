# kc-cli 看云文档CLI工具

Maybe this package is only suitable for Chinese users.

你需要了解：这个包不是看云官方开发，为避免不必要的损失和纠纷，请先试用。具体的使用示例前往kc-cli主页（[点击前往》》](https://www.kancloud.cn/pwedu/kccli)）

## 命令说明
---------------------------
* `kc -h` ——获取帮助信息。
* `kc -v` ——获取当前版本。
* `kc init` ——初始化看云文档。
* `kc summary [dir...]` ——把项目文件夹下的Markdown文件添加到目录文件 “SUMMARY.md” ,输出的文件为:'_summary.md' 。[dir...] 是通配符格式路径,如果省略则是当前目录下全部的.md文件。
* `kc md` ——批量创建 SUMMARY.md 中列出的 Markdown 文件。

* `kc watch [ignore...]` ——监视任务，当文件发生改变的时候自动执行相应的操作。结果：'kc summary' 和 'kc md'。[ignore...] 排除不监视的文件或文件夹。

* `kc docx [name]`——根据 SUMMARY.md 中列出的文件创建 .docx 文件，All in one !, 所有文档都在一个.docx文件里。[name] 可以指定输出的文件名，省略则为：out.docx

* `kc docx -s` ——根据 SUMMARY.md 中列出的文件创建 .docx 文件，一一转换，每个.md 有对应的.docx 文件。

* `kc html` ——根据 SUMMARY.md 中列出的文件创建 .html 文件，是完整的 HTML 文件 。每个.md 和HTML文件一一对应。

* `kc html code` ——根据 SUMMARY.md 中列出的文件创建 .html 文件，只是 HTML 片段。每个.md 和HTML文件一一对应。

**注意：** 在构建 Docx、HTML 文件之前，你需要安装 Pandoc 并添加到 PATH，也许你需要配置 pandoc，具体见 pandoc 的文档。

## 版本

#### v1.0.1

* 升级summarybuilder 到1.4.3：**已经存在于 `SUMMARY.md` 中的markdown文件将不会显示在 `_summary.md` 中**

