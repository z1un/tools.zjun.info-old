/**
 * FeHelper 信息编解码
 */
new Vue({
    el: '#pageContainer',
    data: {
        selectedType: 'uniEncode',
        sourceContent: '',
        resultContent: ''
    },

    mounted: function () {
        // 在tab创建或者更新时候，监听事件，看看是否有参数传递过来
        chrome.runtime.onMessage.addListener((request, sender, callback) => {
            if (request.type === MSG_TYPE.TAB_CREATED_OR_UPDATED && request.event === MSG_TYPE.EN_DECODE) {
                if (request.content) {
                    this.sourceContent = request.content;
                    this.convert();
                }
            }
        });

        this.$refs.srcText.focus();
    },
    methods: {
        convert: function () {
            this.$nextTick(() => {

                let tools = Tarp.require('/en-decode/endecode-lib');

                if (this.selectedType === 'uniEncode') {

                    this.resultContent = tools.uniEncode(this.sourceContent);
                } else if (this.selectedType === 'uniDecode') {

                    this.resultContent = tools.uniDecode(this.sourceContent.replace(/\\U/g, '\\u'));
                } else if (this.selectedType === 'utf8Encode') {

                    this.resultContent = encodeURIComponent(this.sourceContent);
                } else if (this.selectedType === 'utf8Decode') {

                    this.resultContent = decodeURIComponent(this.sourceContent);
                } else if (this.selectedType === 'utf16Encode') {

                    this.resultContent = tools.utf8to16(encodeURIComponent(this.sourceContent));
                } else if (this.selectedType === 'utf16Decode') {

                    this.resultContent = decodeURIComponent(tools.utf16to8(this.sourceContent));
                } else if (this.selectedType === 'base64Encode') {

                    this.resultContent = tools.base64Encode(tools.utf8Encode(this.sourceContent));
                } else if (this.selectedType === 'base64Decode') {

                    this.resultContent = tools.utf8Decode(tools.base64Decode(this.sourceContent));
                } else if (this.selectedType === 'md5Encode') {

                    this.resultContent = tools.md5(this.sourceContent);
                } else if (this.selectedType === 'hexEncode') {

                    this.resultContent = tools.hexEncode(this.sourceContent);
                } else if (this.selectedType === 'hexDecode') {

                    this.resultContent = tools.hexDecode(this.sourceContent);
                }else if (this.selectedType === 'gzipEncode') {

                    this.resultContent = tools.gzipEncode(this.sourceContent);
                } else if (this.selectedType === 'gzipDecode') {

                    this.resultContent = tools.gzipDecode(this.sourceContent);
                }  else if (this.selectedType === 'html2js') {

                    this.resultContent = tools.html2js(this.sourceContent);
                }
            });
        },

        clear: function() {
            this.sourceContent = '';
            this.resultContent = '';
        },

        getResult: function () {
            this.$refs.rstCode.select();
        }
    }
});