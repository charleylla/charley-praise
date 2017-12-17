'use strict';

module.exports = function (templateParams, cssList) {
    console.log('入口文件', templateParams.htmlWebpackPlugin.files);
    let _files = templateParams.htmlWebpackPlugin.files;
    console.log('文件', _files);
    let _regChunk = templateParams.htmlWebpackPlugin.options.chunks;
    let _regCss = cssList;
    let _scripts = "";
    // 定义一个数组，用来存放每次构建后的 JS 文件
    let _scriptsList = [];
    let _styles = "";
    for (let i = 0; i < _regChunk.length; i++) {
        _scripts += "<script type='text/javascript'  src='" + _files.chunks[_regChunk[i]]['entry'] + "'></script>";
        // 将 JS 文件 push 到列表中
        _scriptsList.push(_files.chunks[_regChunk[i]]['entry']);
    }
    for (let k = 0; k < _regCss.length; k++) {
        let _cssitem = _regCss[k],
            _cssitems = new RegExp("^" + _cssitem),
            _cssiteme = new RegExp(".css$");
        _files.css.map(function (filename) {
            let _filearr = filename.split('/'),
                filrdata = _filearr[_filearr.length - 1];
            if (_cssitems.test(filrdata) && _cssiteme.test(filrdata)) {
                _styles += '<link rel="stylesheet" type="text/css" href="' + filename + '"/>';
            }
        });
    }
    return {
        scripts: _scripts,
        styles: _styles,
        scriptsList: _scriptsList
    };
};