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
// This project is based on JQuery 1.9.1.
//

"use strict";

function liteVersionCannotUploadFileAlert(){
    alert("您正在使用lite版，其为全前端实现版本，暂不支持该功能。\n如需进行文件上传分析，请使用标准版或 pro 版");
    return false;
}

function renderIpynbSource(){
    var data;
    data = $("#lite-input").val();
    $("#lite-output").text(data);
}

$(function(){
    // textarea 高度自适应 参考自：https://www.cnblogs.com/7qin/p/10660687.html
    // 效果并不是很好
    $.fn.autoHeight = function(){
        function autoHeight(elem){
            elem.style.height = 'auto';
            elem.scrollTop = 0; //防抖动
            elem.style.height = elem.scrollHeight + 'px';
        }
        this.each(function(){
            autoHeight(this);
            $(this).on('keyup', function(){
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