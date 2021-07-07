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

$(document).ready(function (){
    $("#lite-upload-select").click(liteVersionCannotUploadFileAlert);
    $("#lite-upload-btn").click(liteVersionCannotUploadFileAlert);
    $("#lite-input").blur(renderIpynbSource);
    $("#lite-btn").click(renderIpynbSource);
});