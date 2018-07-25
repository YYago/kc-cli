# kc-cli 看云文档CLI工具

Maybe this package is only suitable for Chinese users.

你需要了解：这个包不是看云官方开发，为避免不必要的麻烦，请先试用。具体的使用示例前往kc-cli主页（[>>>点击前往>>>](https://www.kancloud.cn/pwedu/kccli)）

## 命令说明

* `kc -h` ——获取帮助信息。
* `kc -v` ——获取当前版本。
* `kc init`或者`kc -i` ——初始化看云文档。会尽可能配置文档，可能不能满足需要，细节部分需要大家自己调整。大部分配置在`book.json`文件中
* `kc theme [cssFilePath] | none`——更改文档CSS样式(原有样式会被覆盖)，请提供CSS文件路径。例：
    - `kc theme d:/mycss/kanyun.css`。
    - 如果是 `kc theme none` 则会删除样式配置文件（文档会使用看云默认样式）。不想要当前样式的时候可以通过`kc theme none`命令清除样式。
    - 如果只是微调样式，可以打开`website.css`文件进行编辑、保存并提交。
* `kc summary [dir...]` ——把项目文件夹下的Markdown文件添加到目录文件 `SUMMARY.md` ,输出的文件为:`_summary.md` 。
    - `[dir...]` 是通配符格式路径,如果省略则是当前目录下全部的.md文件。
    - `kc summary ./doc1/*.md` 只会把‘./doc1/’文件夹下的`.md`文件添加到目录文件:`'_summary.md'`中。
* `kc md` ——批量创建 `SUMMARY.md` 中列出的 Markdown 文件。意在批量创建`.md`文件。
* `kc watch|[-w] [ignore...]` ——监视任务，当文件发生改变的时候自动执行相应的操作。结果：'kc summary' 和 'kc md'。[ignore...] 排除不监视的文件或文件夹。
    - `kc -w` 监视当前文件夹，当相应文件发生变化时自动进行创建文件、生成目录条目的动作。**默认作用于所有` '.md'` 文件。**
    - `kc -w default.md` ： `‘default.md’` 文件会被排除，当它发生变化时不会触发事件。

**以下的命令需要配合pandoc进行（没有安装pandoc则不会有效果）：**

* `kc docx [name]`——根据 `SUMMARY.md` 中列出的文件创建 `.docx` 文件，All in one !, 所有文档都在一个`.docx`文件里。[name] 可以指定输出的文件名，省略则为：`out.docx`

* `kc docx -s` ——根据 `SUMMARY.md` 中列出的文件创建 `.docx` 文件，一一转换，每个`.md` 有对应的.docx 文件。

* `kc html` ——根据 `SUMMARY.md` 中列出的文件创建 `.html` 文件，是完整的 HTML 文件 。每个`.md` 和HTML文件一一对应。

* `kc html code` ——根据 `SUMMARY.md` 中列出的文件创建 `.html` 文件，只是 HTML 片段。每个`.md` 和HTML文件一一对应。

**注意：** 在构建 Docx、HTML 文件之前，你需要安装 Pandoc 并添加到 PATH，也许你需要配置 pandoc，具体见 pandoc 的文档。

## 版本

#### v1.0.2（当前版本）

* 修改部分命令参数:
    - `kc watch` 等同于 `kc -w` 。
    - `kc init` 等同于 `kc -i` 。
* **支持更改文档主题(文档样式自定义):** `kc theme [cssfilepath] | none`.
* 升级summarybuilder 到 1.4.4 (严格模式问题)。
* 规避严格模式问题。

#### v1.0.1

* 升级summarybuilder 到1.4.3：**已经存在于 `SUMMARY.md` 中的markdown文件将不会显示在 `_summary.md` 中**。

## LICENSE

[MIT](./LICENSE)
