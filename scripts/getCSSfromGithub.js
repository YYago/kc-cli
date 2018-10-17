/**
 *  @file getCSSfromGithub.js
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

const fs = require('fs');
const https = require('https');
/**
 * @description 从 GitHub 获取源代码 （使用了 GitHub 的代码文件 Raw 功能）
 * 
 * @param {URL} cssURL CSS文件在GitHub 上 Raw 的地址，注意： 参数值只能是类似这样的地址“https://raw.githubusercontent.com/.....”
 * @param {path} saveTo 保存路径，保存到哪。
 * 
 * @description 只能用于CSS文件，因为添加CSS注释！！！（LICENSE需要）
 */
function getCSSfromGithub(cssURL,saveTo){
    console.log(`正在对 ${saveTo} 进行初始化...`);
    fs.writeFileSync(saveTo,`/*Forked from :${cssURL}*/\n`,{encoding:'utf8',flag:'w'});
    console.log(` ${saveTo} 初始化完成，开始下载代码并写入....`)
    https.get(cssURL, (res) => {
        res.on('data', (d) => {
            fs.writeFile(saveTo,d,{encoding:'utf8',flag:'a'},(e)=>{
                if(e){
                    console.log(e)
                }
            })
        });

    }).on('error', (e) => {
        console.error(e);
    });
}

module.exports = {
    getCSSfromGithub
}