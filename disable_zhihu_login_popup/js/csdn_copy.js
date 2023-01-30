(function() {
    'use strict';
    chrome.storage.local.get(['design_mode']).then(r => {
        let mode = 'off'
        if (r) {
            mode = 'on'
        }
        document.designMode = mode
    })
}());
