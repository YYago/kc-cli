#!/usr/bin/env node
'use strict';

const sb = require('summarybuilder');
const path = require('path');
const nnmc = require('node-modules-custom');
const watch = require('glob-watcher');
const kc_log = require('./scripts/logs');
const kc_conf = require('./scripts/sources');
const kc_events = require('./scripts/events');
const fs = require('fs');
let arg = process.argv;
let arg0 = process.argv[0];
let arg1 = process.argv[1];
let arg2 = process.argv[2];
let arg3 = process.argv[3];
let arg4 = process.argv[4];
// --------- kc -h ---------
if (arg2 == "-h") {
    console.log(kc_log.helper);
    // --------- kc -v ---------
} else if (arg2 == "-v") {
    console.log(kc_log.done('kc-cli Version: 1.0.2'));
    // --------- kc init ---------
} else if (arg2 == "init" || arg2 == "-i") {
    // 样式文件创建
    nnmc.fs_wfSync(kc_conf.customStyle.cssFileName, kc_conf.customStyle.cssCode, false, { encoding: 'utf8' });
    console.log(kc_log.done(`${kc_conf.customStyle.cssFileName} 处理完毕！`))
    // 文档配置：插件使用
    nnmc.fs_wfSync(kc_conf.bookConf.confFileName, kc_conf.bookConf.confJSON, false);
    console.log(kc_log.done(`${kc_conf.bookConf.confFileName} 处理完毕！`))
    // 封面图片检查
    if (fs.existsSync('cover.jpg') !== true) {
        console.log(kc_log.warn('文档还没有封面图片！弄一张名为“cover.jpg”宽865px,高1155px 的图片放到文档根目录即可。'))
    }
    // .gitignore 处理
    kc_events.gitEvent();
    console.log(kc_log.done('.gitignore 处理完毕！'))
    // --------- kc summary ---------
} else if (arg2 == "summary" && arg3 == undefined) {
    sb.SBer_summaryMDs(['-t'])
    console.log(kc_log.done(`临时目录文件已经生成，位置：${process.cwd()}\\_summary.md`));
    // --------- kc summary [dir...] ---------
} else if (arg2 == "summary" && arg3 !== undefined) {
    let opts = [];
    for (let i = 3; i < arg.length; i++) {
        opts.push(arg[i]);
    }
    sb.SBer_summaryMDs(['-t', ...opts]);
    console.log(kc_log.done(`临时目录文件已经生成，位置：${process.cwd()}\\_summary.md`));
    // --------- kc md ---------
} else if (arg2 == "md") {
    let smPath = process.cwd() + '/SUMMARY.md'
    if (fs.existsSync(smPath)) {
        sb.SBer_createMD(smPath);
        console.log(kc_log.done('SUMMARY.md中的文件已经创建完成！'))
    } else {
        console.log(kc_log.err('当前目录下没有找到SUMMARY.md文件，如果是小写的文件名，请暂时重命名为SUMMARY.md再运行命令！'));
    }
    // --------- kc docx ---------
} else if (arg2 == "docx" && arg3 !== '-s') {
    let foo;
    let outFname;
    if (fs.existsSync('./SUMMARY.md')) {
        foo = kc_events.summaryFiles()
    } else {
        console.log(kc_log.err(`当前目录下没有 SUMMARY.md 文件，臣妾什么也做不了！`))
        return
    }
    if (arg3 == undefined) {
        outFname = kc_conf.kcOutDir.docx + 'out.docx';
        foo = [...foo, "-s", "-o", outFname];
    } else {
        if (/.docx/g.test(arg3)) {
            foo = [...foo, "-s", "-o", kc_conf.kcOutDir.docx + arg3]
        } else {
            console.log(kc_log.err(`输出的文件必须带类型后缀！！像这样：${arg3}.docx`))
            return
        }
    }
    if (fs.existsSync(kc_conf.kcOutDir.docx) == false) {
        nnmc.fs_mkdirSync(kc_conf.kcOutDir.docx);
    }
    console.log(kc_log.done(`DOCX 文件：${foo[foo.length - 1]} 生成完成！`))
    kc_events.pandoc([...foo]);
    // --------- kc docx -s---------
} else if (arg2 == "docx" && arg3 == '-s') {
    let foo;
    let outFname = [];
    if (fs.existsSync('./SUMMARY.md')) {
        foo = kc_events.summaryFiles()
    } else {
        console.log(kc_log.err(`当前目录下没有 SUMMARY.md 文件，臣妾什么也做不了！`))
        return
    }
    if (foo !== null) {
        for (let i = 0; i < foo.length; i++) {
            let docName = foo[i].replace('.md', '.docx');
            docName = kc_conf.kcOutDir.docx + docName;
            outFname.push(docName)
        }
    }
    if (fs.existsSync(kc_conf.kcOutDir.docx) == false) {
        nnmc.fs_mkdirSync(kc_conf.kcOutDir.docx);
    }
    for (let x = 0; x < foo.length; x++) {
        console.log(kc_log.done(`DOCX 文件：${outFname[x]} 生成完成！`))
        kc_events.pandoc([foo[x], "-s", "-o", outFname[x]]);
    }
    // --------- kc html ---------
} else if (arg2 == "html" && arg3 !== "code") {
    let foo;
    let outFname = [];
    if (fs.existsSync('./SUMMARY.md')) {
        foo = kc_events.summaryFiles()
    } else {
        console.log(kc_log.err(`当前目录下没有 SUMMARY.md 文件，臣妾什么也做不了！`))
        return
    }
    if (foo !== null) {
        for (let i = 0; i < foo.length; i++) {
            let docName = foo[i].replace('.md', '.html');
            docName = kc_conf.kcOutDir.html + docName;
            outFname.push(docName)
        }
    }
    if (fs.existsSync(kc_conf.kcOutDir.html) == false) {
        nnmc.fs_mkdirSync(kc_conf.kcOutDir.html);
    }
    for (let x = 0; x < foo.length; x++) {
        console.log(kc_log.done(`HTML 文件：${outFname[x]} 生成完成！`))
        kc_events.pandoc([foo[x], "-s", "-o", outFname[x]]);
    }
    // --------- kc html code ---------
} else if (arg2 == "html" && arg3 == "code") {
    let foo;
    let outFname = [];
    if (fs.existsSync('./SUMMARY.md')) {
        foo = kc_events.summaryFiles()
    } else {
        console.log(kc_log.err(`当前目录下没有 SUMMARY.md 文件，臣妾什么也做不了！`))
        return
    }
    if (foo !== null) {
        for (let i = 0; i < foo.length; i++) {
            let docName = foo[i].replace('.md', '.html');
            docName = kc_conf.kcOutDir.html + 'code/' + docName;
            outFname.push(docName)
        }
    }
    if (fs.existsSync(kc_conf.kcOutDir.html) == false) {
        nnmc.fs_mkdirSync(kc_conf.kcOutDir.html + 'code');
    }
    for (let x = 0; x < foo.length; x++) {
        console.log(kc_log.done(`HTML 文件：${outFname[x]} 生成完成！`))
        kc_events.pandoc([foo[x], "-o", outFname[x]]);
    }
    // --------- kc watch ---------
} else if (arg2 == "watch" || arg2 == "-w") {
    let opts = [];
    for (let i = 3; i < arg.length; i++) {
        opts.push(arg[i]);
    }
    let wSource;
    let sSource;
    if (opts !== null) {
        wSource = ['./**/*.md', '!node_modules/**', '!./SUMMARY.md', '!./_summary.md', '!./README.md', ...opts];
        sSource = ['-t', ...opts];
    } else {
        wSource = ['./**/*.md', '!node_modules/**', '!./SUMMARY.md', '!./_summary.md', '!./README.md'];
        sSource = ['-t'];
    }
    let watcher = watch([...wSource]);
    // 新增
    watcher.on('add', () => {
        sb.SBer_summaryMDs([...sSource]);
        console.log(kc_log.done(`临时目录文件已经生成，位置：${process.cwd()}\\_summary.md`));
    });
    watcher.on('unlink', () => {
        sb.SBer_summaryMDs([...sSource]);
        console.log(kc_log.done(`临时目录文件已经生成，位置：${process.cwd()}\\_summary.md`));
    });
    watcher.on('change', () => {
        sb.SBer_summaryMDs([...sSource]);
        console.log(kc_log.done(`临时目录文件已经生成，位置：${process.cwd()}\\_summary.md`));
    });
    let sumWather = watch('./SUMMARY.md');
    sumWather.on('change', () => {
        let smPath = process.cwd() + '/SUMMARY.md'
        if (fs.existsSync(smPath)) {
            sb.SBer_createMD(smPath);
            console.log(kc_log.done('SUMMARY.md中的文件已经创建完成！'))
        } else {
            console.log(kc_log.err('当前目录下没有找到SUMMARY.md文件，如果是小写的文件名，请暂时重命名为SUMMARY.md再运行命令！'));
        }
    });
    // --------- kc theme ---------
} else if (arg2 == "theme" && arg3 !== "none") {
    let fileExt = fs.existsSync(arg3);
    if (fileExt == true && path.extname(arg3) == ".css") {
        let newStyle = fs.readFileSync(arg3, { encoding: 'utf8' });
        nnmc.fs_wfSync(kc_conf.customStyle.cssFileName, newStyle, true, { encoding: 'utf8', flag: 'w' });
        console.log(kc_log.done(`${kc_conf.customStyle.cssFileName} 已经被更新成功！新的样式将在同步后生效。`))
    } else {
        console.log(kc_log.err(`CSS文件: ${arg3}  找不到或者不是.css结尾的文件！请提供准确的CSS文件路径。`))
    }
} else if (arg2 == "theme" && arg3 == "none") {
    let cssfileExi = fs.existsSync('style/website.css');
    if (cssfileExi == true) {
        fs.unlinkSync('style/website.css');
        console.log(kc_log.done(` 现有的文档样式已被移除，请完成git提交并发布以更新远程文档。`))
    } else {
        console.log(kc_log.warn(`当前文档并没有使用自定义样式，无需删除。`))
    }
} else {
    console.log(kc_log.helper);
}