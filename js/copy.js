(function () {
    'use strict';

    function createTextBlob(text) {
        return new Blob([text], {type: "text/plain"});
    }

    function createHtmlBlob(text) {
        return new Blob([text], {type: "text/html"});
    }

    async function createImageBlob(url) {
        const response = await fetch(url);
        return await response.blob();
    }

    function select(element) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    async function writeDataToClipboard(blob) {
        if (navigator.clipboard && navigator.clipboard.write) {
            try {
                const item = new ClipboardItem({
                    [blob.type]: blob,
                });
                await navigator.clipboard.write([item]);
            } catch (error) {
                console.error("复制失败", error);
            }
        }
    }

    function copyPlainText() {
        console.clear()
        const selection = window.getSelection(0);
        let selected_str = selection.toString()
        let selected_blob = createTextBlob(selected_str)
        writeDataToClipboard(selected_blob).then(r => console.log("copied:" + selected_str))
    }

    function copyAll() {
        console.clear()
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        console.log('Selected elements:');
        let selected = range.cloneContents().children
        // selected.forEach(e => console.log(e));
        let result = ""
        for (let selectedElement of selected) {
            result += selectedElement.outerHTML
        }

        writeDataToClipboard(createHtmlBlob(result)).then(r => console.log("done"))
        // navigator.clipboard.write([new ClipboardItem({'text/html': new Blob()})])
        // console.log(typeof selected)
        // let writable = new ClipboardItem({'text/html': new Blob([selected], {type: 'text/html'})})
        // console.log('writable: ' + writable)
        // // if (navigator.clipboard) {
        // //     console.log('copying' + writable)
        // //     navigator.clipboard.write([writable])
        // // } else {
        // console.log('copying2 ' + selected)
        // document.execCommand('copy')
        // }
    }
    // document.addEventListener('mouseup', copyPlainText)

    document.addEventListener('mouseup', copyAll);

})();