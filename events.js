/**
*
* @file events.js
* @author YYago
* Date: 2018/11/08 04:50:11
* @license MIT
* 
*
*/
'use strict';
const cp = require('child_process');
const fs = require('fs');

const bookPlugins = function(){
    if(fs.existsSync('book.json')){
        let bkJSON = JSON.parse(fs.readFileSync('book.js',{encoding:'utf8'}));
        let plugins = bkJSON.plugins
        return plugins
    }else{
        return null;
    }
}


module.exports = {
    /**
     * 是否是看云文档，基于 `git remote -v`.
     */
    isKCdocPro:/(git.kancloud.cn)/g.test(cp.spawnSync("git remote -v",{shell:true}).stdout.toString()),// BUG? ： 如果用户没有安装 Git 或者未能全局使用 Git 命令则可能发生某些问题而无法预料，待测
    /**
     * 是否有文档配置文件： `book.json`.
     */
    hasBookJSON: fs.existsSync('book.json'),
    /**
     * hasCoverIMG 是否有文档封面： `cover.jpg`.
     */
    hasCoverIMG: fs.existsSync('cover.jpg'),
    /**
     * 是否有文档样式文件：`style/website.css`.
     */
    hasStlyeFile: fs.existsSync('style/website.css'),
    /**
     * 是否有文档摘要：`readme.md`.
     */
    hasReadmeFile: fs.existsSync('readme.md'),
    /**
     * 是否有 Git 排除配置文件：`.gitignore`
     */
    hasGitignoreFile: fs.existsSync('.gitignore'),
    /**
     * Get plugins if had added, else `null`.
     */
    plugins: bookPlugins(),
    /**
     * Add gitignores contents --npm
     */
    ignore_NPM:`
# Ignore NPM package files.
        
node_modules
package.json
package-lock.json
`,
    /**
     *  Add gitignores contents --kc out
     */
    ignore_kcOuts: `
# 排除 sb 输出文件
_summary.md
.li.json
# kc end
`,
}

// test

