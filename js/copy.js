(function () {
    'use strict';

    function createHtmlBlob(target) {
        return new Blob([target], {type: "text/html"});
    }

    async function writeDataToClipboard(blob) {
        if (navigator.clipboard && navigator.clipboard.write) {
            try {
                const item = new ClipboardItem({
                    [blob.type]: blob,
                });
                await navigator.clipboard.write([item]);
            } catch (error) {
                console.error("failed to copy", error);
            }
        }
    }

    function copy() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        let range = selection.getRangeAt(0);
        let selected = range.cloneContents().childNodes
        let result = ""
        for (let selectedElement of selected) {
            if (selectedElement.nodeType === Node.TEXT_NODE) {
                result += selectedElement.textContent
                continue
            }
            result += selectedElement.outerHTML
        }
        console.debug("copied: " + result)

        writeDataToClipboard(createHtmlBlob(result)).then(
            () => console.log("success")
        ).catch(
            () => console.log("failed")
        )
    }

    (function () {
        document.querySelectorAll('*').forEach(e => e.style.userSelect='auto')
    })()

    document.addEventListener('mouseup', copy);

})();