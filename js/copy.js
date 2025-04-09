(function () {
    'use strict';

    function createHtmlBlob(target) {
        return new Blob([target], {type: "text/html"});
    }

    async function writeDataToClipboard(selected) {
        const blob = createHtmlBlob(selected)

        if (navigator.clipboard && navigator.clipboard.write) {
            try {
                const item = new ClipboardItem({
                    [blob.type]: blob,
                    "text/plain": selected,
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
        if (result.trim() == "") {
            return
        }
        console.log("copied: " + result)

        writeDataToClipboard(result).then(
            () => console.log("neat copy success", result)
        ).catch(
            (e) => console.error("neat copy failed", e)
        )
    }

    (function () {
        document.querySelectorAll('*').forEach(e => e.style.userSelect='auto')
        $("*").off("copy")
        $("*").unbind("copy")
        $("#content_views").unbind("copy")
    })()

    document.addEventListener('mouseup', copy);

})();
