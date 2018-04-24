const nmc = require('node-modules-custom');
const cp = require('child_process');
const fs = require('fs');
const kc_log = require('./logs');
/**
 * 对.gitignore文件的控制
 */
function gitEvent(){
    let ignores = `
# 排除 node_modelus
node_modules
# 排除 sb 输出文件
_summary.md
.li.json
# 排除kc-cli输出文件
KCout
# kc end
`;
let igfpath = process.cwd()+'/.gitignore';
if(fs.existsSync(igfpath)){
    let igf = fs.readFileSync(igfpath,{encoding:'utf8'});
    if(/# kc end/g.test(igf)==false){
        nmc.fs_wfSync(igfpath,ignores,true,{encoding:'utf8',flag:'a'});
    }
}else{
    nmc.fs_wfSync(igfpath,ignores,false,{encoding:'utf8',flag:'w'});
}
}
/**
 * 使用Pandoc。
 * 
 * @param {Array} opts 
 */
function pandoc(opts){
    cp.spawnSync('pandoc',opts);
}
/**
 * 获取 SUMMARY.md 中的文件列表。
 * @returns Array
 */
function summaryFiles(){
    let sumContent = fs.readFileSync('./SUMMARY.md',{encoding:'utf-8'});
    let regRsArr = sumContent.match(/\]\(.*\)/g);
    let files = [];
    if(regRsArr!==null){
        for(let i =0;i<regRsArr.length;i++){
            let item = regRsArr[i].replace(/[\]\(\)]/g,"");
            files.push(item)
        }
    }else{
        console.log(kc_log.err('SUMMARY.md 空空如也！完善下再试吧'));
        return
    }
    return files;
}
module.exports = {
    gitEvent,
    pandoc,
    summaryFiles
}