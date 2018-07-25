'use strict';

const chalk = require('chalk');

function log_err(message) {
    return `${chalk.bgBlack(chalk.yellow(' kc-cli '))} ${chalk.red('Err!')} ${message}`
}
function log_done(message) {
    return `${chalk.bgBlack(chalk.yellow(' kc-cli '))} ${chalk.green('Done!')} ${message}`
}
function log_warn(message) {
    return `${chalk.bgBlack(chalk.yellow(' kc-cli '))} ${chalk.cyan('warn!')} ${message}`
}
function logRed(message){
    return `${chalk.red(message)}`
}
function logYellow(message){
    return `${chalk.yellow(message)}`
}
function logCyan(message){
    return `${chalk.cyan(message)}`
}
const helper = `
;-------------------------;
|       kc-cli helper     |
;-------------------------;
命令            说明
---------------------------
${logRed('kc -h')}           获取帮助信息。
${logRed('kc -v')}           获取当前版本。
${logRed('kc init|-i')}         初始化看云文档(会尽可能进行配置，细节部分可能需要手调)。
${logRed(`kc theme [cssFilePath]`)}     更改文档CSS样式(原有样式会被覆盖)，请提供CSS文件路径。例：kc theme d:/mycss/kanyun.css。
                                        如果是 kc theme none 则会删除样式配置文件（文档会使用看云默认样式）。
${logRed('kc summary')} ${logYellow('[dir...]')} 把项目文件夹下的Markdown文件添加到目录文件 “SUMMARY.md” ,输出的文件为:'_summary.md' 。
                [dir...] 是通配符格式路径,如果省略则是当前目录下全部的.md文件。
${logRed('kc md')}           批量创建 SUMMARY.md 中列出的 Markdown 文件。
${logRed('kc watch|-w')} ${logYellow('[ignore...]')} 监视任务，当文件发生改变的时候自动执行相应的操作。结果：'kc summary' 和 'kc md'。
                [ignore...] (可省略)排除不监视的文件或文件夹。

----note: 以下的指令必须先安装Pandoc--------
${logRed('kc docx')} ${logYellow('[name]')}  根据 SUMMARY.md 中列出的文件创建 .docx 文件，All in one !, 所有文档都在一个.docx文件里。
                [name] 可以指定输出的文件名，省略则为：out.docx
${logRed('kc docx -s')}      根据 SUMMARY.md 中列出的文件创建 .docx 文件，一一转换，每个.md 有对应的.docx 文件。
${logRed('kc html')}         根据 SUMMARY.md 中列出的文件创建 .html 文件，是完整的 HTML 文件 。每个.md 和HTML文件一一对应。
${logRed('kc html code')}    根据 SUMMARY.md 中列出的文件创建 .html 文件，只是 HTML 片段。每个.md 和HTML文件一一对应。

---------------------------
${logCyan('注意：在构建 Docx、HTML 文件之前，你需要安装 Pandoc 并添加到 PATH，也许你需要配置 pandoc，具体见 pandoc 的文档。(可能存在诸多的问题,并不推荐)')}
`
module.exports = {
    err: log_err,
    warn: log_warn,
    done: log_done,
    helper,
}