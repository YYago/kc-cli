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
-----------
${logRed('kc -h')}           获取帮助信息。
${logRed('kc -v')}           获取当前版本。
${logRed('kc init|-i')}      初始化看云文档(会尽可能进行配置，细节部分可能需要手调)。
${logRed(`kc theme [cssFilePath]`)}     更改文档CSS样式(原有样式会被覆盖)，请提供CSS文件路径。例：kc theme d:/mycss/kanyun.css。
${logRed(`kc theme url [URL]`)}         ${logYellow(`[URL] 只能是CSS文件对应的 GitHub 代码 Raw 地址。`)}
${logRed(`kc theme none`)}              删除样式配置文件（文档会使用看云默认样式，默认就是空的）。
${logRed('kc summary')} ${logYellow('[dir...]')} 把项目文件夹下的Markdown文件添加到目录文件 “SUMMARY.md” ,输出的文件为:'_summary.md' 。${logYellow('[dir...]')}是通配符格式路径,如果省略则是当前目录下全部的.md文件。

${logRed('kc md')}           批量创建 SUMMARY.md 中列出的 Markdown 文件。
${logRed('kc watch')} ${logYellow('[ignore...]')} 监视任务，当文件发生改变的时候自动执行相应的操作。结果相当于：'kc summary' + 'kc md'。${logYellow('[ignore...]')} (可省略)排除不监视的文件或文件夹。

${logRed('kc -w')} ${logYellow('[ignore...]')} 与 kc watch.... 相同。
-----------
note：下一版本将移除 pandoc 指令支持。
`
module.exports = {
    err: log_err,
    warn: log_warn,
    done: log_done,
    helper,
}