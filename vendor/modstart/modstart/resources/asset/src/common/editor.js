var UEditorConfig = require('./../vendor/ueditor/ueditor.config.js');
var UEditor = require('./../vendor/ueditor/ueditor.all.js');
require('./../lib/ueditor/wechatcustomemotion.js');

var EditorUploadConfig = {
    toolbarCallback: function (cmd, editor) {
        switch (cmd) {
            case 'insertimage':
                if (!window.__selectorDialogServer) {
                    alert('Missing Config : window.__selectorDialogServer')
                    return true
                }
                window.__selectorDialog = new window.api.selectorDialog({
                    server: window.__selectorDialogServer + '/image',
                    callback: function (items) {
                        editor.execCommand('insertHtml', items.map(o => '<p><img src="' + o.path + '" /></p>').join("\n"));
                    }
                }).show();
                return true
        }
    },
    imageConfig: {
        disableUpload: true,
        disableOnline: true,
        selectCallback: function (editor, cb) {
            window.__selectorDialog = new window.api.selectorDialog({
                server: window.__selectorDialogServer + '/image',
                callback: function (items) {
                    if (items.length) {
                        cb({
                            path: items[0].path,
                            name: items[0].filename,
                        })
                    }
                }
            }).show();
        }
    },
    videoConfig: {
        disableUpload: true,
        selectCallback: function (editor, cb) {
            window.__selectorDialog = new window.api.selectorDialog({
                server: window.__selectorDialogServer + '/video',
                callback: function (items) {
                    if (items.length) {
                        cb({
                            path: items[0].path,
                            name: items[0].filename,
                        })
                    }
                }
            }).show();
        }
    }
}

var Editor = {
    basic: function (id, option, editorOption) {

        var opt = $.extend({
            server: '',
            width: null,
            height: 100,
            ready: function () {
            }
        }, option);

        var editorBasicToolBars = [
            // 'fullscreen',
            'source',
            'autotypeset',
            //'selectall', 'undo', 'redo',
            'removeformat',
            //'formatmatch',
            //'pasteplain',
            // 'template', '|',
            'paragraph',
            //'fontfamily',
            'fontsize', 'forecolor', //'backcolor', //'|',
            //'simpleupload',
            'insertimage',
            'uploadimage',
            'insertvideo',
            //'attachment', 'map',
            'bold', 'italic', 'underline', //'fontborder',
            'strikethrough',
            //'superscript', 'subscript', 'blockquote',
            //'insertorderedlist', 'insertunorderedlist',
            //'rowspacingtop', 'rowspacingbottom', 'lineheight',
            'indent', 'justifyleft', 'justifycenter', 'justifyright', //'justifyjustify', '|',
            'link', 'unlink',
            'insertcode',
            'formula',
            // 'imagenone', 'imageleft', 'imageright', 'imagecenter', //'|',
            //'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol',
            //'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols',
            // 'formula', 'wechatcustomemotion',
        ];

        if ('__editorBasicToolBars' in window) {
            editorBasicToolBars = window.__editorBasicToolBars;
        }

        if ('__editorBasicToolBarsExtra' in window) {
            editorBasicToolBars = editorBasicToolBars.concat(window.__editorBasicToolBarsExtra);
        }

        var editorOpt = $.extend({
            toolbars: [
                editorBasicToolBars
            ],
            serverUrl: opt.server,
            wordCount: false,
            elementPathEnabled: false,
            initialFrameHeight: opt.height,
            initialFrameWidth: opt.width,
            enableAutoSave: false,
            pasteplain: false,
            autoHeightEnabled: true,
            focus: false
        }, EditorUploadConfig, editorOption);

        var ueditor = UE.getEditor(id, editorOpt);

        ueditor.ready(function () {
            opt.ready();
        });

        return ueditor;

    },
    simple: function (id, option, editorOption) {

        var opt = $.extend({
            server: '',
            width: null,
            height: 100,
            ready: function () {
            }
        }, option);

        var editorSimpleToolBars = [
            'fontsize', 'forecolor',
            //'backcolor', '|',
            'insertimage',
            'uploadimage', 'bold', 'italic', 'underline',
            //'fontborder',
            'strikethrough',
            'insertcode',
            //'superscript', 'subscript',
            // 'emotion','wechatcustomemotion'
        ];
        if ('__editorSimpleToolBars' in window) {
            editorSimpleToolBars = window.__editorSimpleToolBars;
        }
        if ('__editorSimpleToolBarsExtra' in window) {
            editorSimpleToolBars = editorSimpleToolBars.concat(window.__editorSimpleToolBarsExtra);
        }

        var editorOpt = $.extend({
            toolbars: [
                editorSimpleToolBars
            ],
            serverUrl: opt.server,
            wordCount: false,
            elementPathEnabled: false,
            initialFrameHeight: opt.height,
            initialFrameWidth: opt.width,
            enableAutoSave: false,
            pasteplain: false,
            retainOnlyLabelPasted: true,
            autoHeightEnabled: true,
            focus: false
        }, EditorUploadConfig, editorOption);

        var ueditor = UE.getEditor(id, editorOpt);

        ueditor.ready(function () {
            opt.ready();
        });

        return ueditor;

    },
    raw: UE
};

window.api.editor = Editor;
if (!('MS' in window)) {
    window.MS = {}
}
window.MS.editor = Editor;
window.MS.editorUploadConfig = EditorUploadConfig;
