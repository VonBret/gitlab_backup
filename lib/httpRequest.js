/**
 * Created by keenfir on 2020/11/15.
 */
var { JSDOM } = require( "jsdom" );
var { window } = new JSDOM( "" );
var $ = require( "jquery" )(window);
var qs = require('qs');
var baseurl = require('../config').baseurl;

/**
 * jQuery Ajax 请求封装
 * @param {String} url 发送请求的地址
 * @param {String} type 请求方式
 * @param {Object} params 参数
 * @returns Object
 */
exports.httpRequest = (url, type = 'GET', params = {}, timeout = '5000', async = true, cache = true, dataType = 'json', contentType) => {
    var _params = type == 'GET' ? params : qs.stringify(params);
    // 内容编码类型 默认为 "application/x-www-form-urlencoded"
    var _contentType = contentType ? contentType : "application/x-www-form-urlencoded";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: formatUrl(url),
            type: type,
            data:_params,
            timeout:timeout,
            async:async,
            cache: cache,
            dataType: dataType,
            contentType: _contentType,
            success: (response, status, xhr) => {
                if(status = 'success') {
                    resolve({
                        status:xhr.status,
                        statusText:xhr.statusText,
                        data:response
                    })
                }
            },
            error: (xhr, status) => {
                if(status == 'error') {
                    reject({
                        status:xhr.status,
                        statusText:xhr.statusText
                    })
                }
            },
        })
    })
}

/**
 * 请求接口处理
 * @param {String} url 
 * @returns String
 */
function formatUrl(url) {
    return url.startsWith("/") ? baseurl + url : baseurl + "/" + url
}