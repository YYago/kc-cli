/**
 *  @file gulpfile.js
 *  @author YYago <877675862@qq.com>
 *  Date: 2018/10/18
 *  LICENSE:
 *      MIT License
 *
 *      Copyright (c) 2018 YYago
 *
 *      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 *      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 *      IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

'use strict';

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

const cssfilename = confs.Author + '_' + confs.forWhat + '.css';
const cssHeaders = `
/*
    File: ${cssfilename}
    Version: ${confs.Version}
    Example: ${confs.ExampleURL}
    Author: ${confs.Author}
    HomePage: ${confs.HomoPage}
    Description: ${confs.Description}
    Compatibility: ${confs.Compatibility}
    LICENSE: ${confs.LICENSE}
*/

`;
//.......Conf End ......................

const fs = require('fs');
const gulp = require('gulp');
const gpLess = require('gulp-less');
const gRename = require('gulp-rename');
const nmc = require('node-modules-custom');
const LessAutoprefix = require('less-plugin-autoprefix');
const Autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });


// 初始化 less 文件
gulp.task('init', () => {
    if (fs.existsSync('build/'+confs.less) == false) {
        console.log(`   创建文件：theme.less`);
        nmc.writeFileSyncLong('build/' + confs.less, cssHeaders, { encoding: 'utf8', flag: 'w' });
    }
});

if (cssfilename == "_.css" && confs.Description == "" && confs.Version == "") {
    console.log("warn： 清先配置下相关信息!")
    return;
}

// 编译成CSS文件
gulp.task('css', () => {
    gulp.src('build/' + confs.less)
        .pipe(gpLess({
            plugins: [Autoprefix]
        }))
        .pipe(gRename(cssfilename))
        .pipe(gulp.dest('build'));
});

function checks(cssFile) {
    let reg_Author = /(Author:).+$\n/g;
    let cssCode = fs.readFileSync(cssfilename, { encoding: 'utf8' });
    let reg_Author_resu = cssCode.match(reg_Author);
    if (reg_Author_resu !== null) {
        let author = reg_Author_resu[0].replace(/(Author: )/g, "");
        if (author == confs.Author) {
            return true
        } else {
            return false
        }
    }
}

gulp.task('pub', () => {
    let pubcssFileName = './' + cssfilename;
    if (fs.existsSync(pubcssFileName)) {
        console.log('warn : 名称冲突！无法 publish ! 请先重命名！')
        return
    } else {
        if (checks('build/' + cssfilename)) {
            console.log(`success : pub 成功，把 ${cssfilename} add 并 commit 然后到GitHub发起合并。`)
            gulp.src('build/' + cssfilename)
                .pipe(gulp.dest('./'));
        } else {
            console.log('err : 貌似头部注释已经被干掉了，不符合规范，请补齐CSS头部注释信息！');
            return
        }
    }
});

gulp.task('w', () => {
    gulp.watch('build/' + confs.less, ['css']);
});

gulp.task('default', ['init', 'css', 'w']);