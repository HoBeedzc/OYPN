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
    alert("您正在使用lite版，其为全前端实现版本，暂不支持该功能。\n如需进行文件上传分析，请使用标准版或 pro 版");
    return false;
}

function analysisIpynbSource(data){
    var cells,j,len,lastRow;
    var res = [];

    try{
        data = $.parseJSON(data);
    } catch (e) {
        console.log(e);
        data = $.parseJSON("{}");
        return ["解析时遇到错误，请确认格式后重新输入！"];
    }
    
    cells = data.cells;
    console.log(cells[0]);
    for (j = 0,len=cells.length;j<len;j++) {
        if (cells[j].cell_type == "code" & cells[j].execution_count != null) {
            res.push("\n##In["+ cells[j].execution_count.toString() +"]\n");
            lastRow = cells[j].source.pop();
            if (lastRow.charAt(lastRow.length -1) != '\n') {
                lastRow += '\n';
            }
            cells[j].source.push(lastRow);
            res.push.apply(res,cells[j].source);
        }
    }
    return res;
}

function renderIpynbSource(){
    var data,res;
    data = $("#lite-input").val();
    res = analysisIpynbSource(data);
    $("#lite-output").text(res.join(''));
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

$(document).ready(function (){
    $("#lite-upload-select").click(liteVersionCannotUploadFileAlert);
    $("#lite-upload-btn").click(liteVersionCannotUploadFileAlert);
    $("#lite-input").blur(renderIpynbSource);
    $("#lite-btn").click(renderIpynbSource);
});