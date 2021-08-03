//
// OpenIpynbLiteJS
// Lite version is implemented through full front-end technology
//
// Copyright 2021 (c) HoBee Group. All rights reversed.
//
// HoBee @ Github: https://github.com/HoBeedzc
// HoBee's blog: http://blog.hobeedzc.cn
// HoBee's page: http://www.hobeedzc.cn
//
// This project is based on JQuery 3.6.0.
//

"use strict";

function liteVersionCannotUploadFileAlert(){
    alert("您正在使用的 OYPN Lite 暂不支持该功能。\n如需进行文件上传，请使用 OYPN 或 OYPN Pro");
    return false;
}

function lastRowAddNewLine(cell) {
    var lastRow;
    lastRow = cell.source.pop();
    // console.log(lastRow);
    if (lastRow == undefined) {
        lastRow = '\n</div>';
    }
    if (lastRow.charAt(lastRow.length -1) != '\n</div>') {
        lastRow += '<br></div>';
    }
    cell.source.push(lastRow);
    return cell;
}

function analysisIpynbSource(data){
    var cells,j,len;
    var res = [];

    if (!data) { // 消息为空的时候，输出空
        return [];
    }

    try{ // 解析出错的时候，返回解析错误
        data = $.parseJSON(data);
    } catch (e) {
        data = $.parseJSON("{}");
        return ["解析时遇到错误，请确认格式后重新输入！"];
    }
    
    cells = data.cells; // 否则正常返回
    for (j = 0,len=cells.length;j<len;j++) {
        if (cells[j].cell_type == "code") { // 代码单元格
            if (cells[j].execution_count != null) {
                res.push("<div class=\"code language-python\">## In["+ cells[j].execution_count.toString() +"] Code cell\n");
            } else {
                res.push("<div class=\"code language-python\">## In[ ] Code cell\n");
            }
            cells[j] = lastRowAddNewLine(cells[j]);
            res.push.apply(res,cells[j].source);
        } else if (cells[j].cell_type == "markdown") { // markdowm 单元格
            res.push("<div class=\"code language-markdown \">## Markdown cell\n");
            cells[j] = lastRowAddNewLine(cells[j]);
            res.push.apply(res,cells[j].source);
        } else {
            console.log(cells[j]);
        }
    }
    return res;
}

function renderIpynbSource(){
    var data,res;
    data = $("#lite-input").val();
    res = analysisIpynbSource(data);
    $("#lite-output").empty();
    if (res.join('') != '') {
        $("#lite-output").append(res.join('<br>'));
    } else {
        $("#lite-output").append("在此显示解析后的结果...");
    }
    
    // first, find all the div.code blocks
    document.querySelectorAll('div.code').forEach(el => {
        // then highlight each
        hljs.highlightElement(el);
    });
}

$(function(){
    // textarea 高度自适应 参考自：https://www.cnblogs.com/7qin/p/10660687.html
    // 效果并不是很好，故结合本项目场景做出简单修改。
    // 这不是效果好不好的问题，这是根本没发用。。。，还是不搞高度自适应了
    $.fn.autoHeight = function(){
        function autoHeight(elem){
            if (elem.style.height < '800px') {
                elem.style.height = '800px';
            } else {
                elem.style.height = 'auto';
            }
            elem.scrollTop = 0; //防抖动
            elem.style.height = elem.scrollHeight + 'px';
        }
        this.each(function(){
            autoHeight(this);
            $(this).on('keyup', function(){
                autoHeight(this);
            });
            $(this).bind('DOMNodeInserted',function (){
                autoHeight(this);
            });
        });
    }
    $('textarea[autoHeight]').autoHeight();
})

function fileUploadButtonReload() { // 文件上传按钮重载
    $("#lite-upload-select").click();
    $("#lite-upload-select").bind("input propertychange",fileUploadButtonReloadName);
}

function fileUploadButtonReloadName() {
    var filepath,filename;
    filepath = $("#lite-upload-select").val();
    filename = filepath.substring(filepath.lastIndexOf("\\")+1); 
    if (filename) {
        $("#lite-upload-select-file-name").text("已选择文件:" + filename);
        $("#lite-upload-select-div").text("更改或取消选择");
    } else {
        $("#lite-upload-select-file-name").text("未选择任何文件");
        $("#lite-upload-select-div").text("选择文件");
    }
    
} 

function clearupInputTextArea() {
    $("#lite-input").val('');
    renderIpynbSource();
}

$(document).ready(function (){
    $("#lite-upload-btn").click(liteVersionCannotUploadFileAlert);
    $("#output-btn-download").click(liteVersionCannotUploadFileAlert);
    $("#lite-upload-select-div").click(fileUploadButtonReload);
    $("#lite-input").keyup(renderIpynbSource);
    $("#lite-input").blur(renderIpynbSource);
    $("#input-btn-parse").click(renderIpynbSource);
    $("#input-btn-cleanup").click(clearupInputTextArea);
});