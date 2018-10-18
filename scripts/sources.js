'use strict';

const customStyle = {
    cssFileName : "style/website.css",
    cssCode : `
/* 
Created by <kc-cli> https://www.npmjs.com/package/kc-cli .
从这个版本开始，不再自动添加CSS代码，请自行添加。可以参考 https://github.com/YYago/kc-cli/tree/themes 获取适合自己的 CSS 代码。
*/
 `
}

const bookConf = {
    confFileName : "book.json",
    confJSON : `
{
    "plugins":["navigation","highlight"],
    "pluginsConfig":{
        "navigation":{
            "logo":{
                "image":"https://",
                "url":"https://www.kancloud.cn/@pwedu"
            },
            "nav":[
                {
                    "title":"导航1 请自行修改",
                    "url":"https://www.npmjs.com/package/kc-cli"
                },
                {
                    "title":"导航2 请自行修改",
                    "url":"https://github.com/YYago/kc-cli"
                },
                {
                    "title":"导航3 请自行修改",
                    "url":"https://github.com/YYago/kc-cli/issues"
                }                
                ]
            }
        }
    }
}        
      
`
}
const kcOutDir = {
    html : './KCout/HTML/',
    docx : './KCout/Docx/',
    pdf : './KCout/PDF/',
    epub : './KCout/EPUB/'
}
const kcReadme = {
    name:'README.md',
    content:`
# 文档概要

`
}
module.exports = {
    customStyle,
    bookConf,
    kcOutDir,
}