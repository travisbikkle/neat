(function() {
    'use strict';
    chrome.storage.local.get(['design_mode']).then(r => {
        if (r.design_mode) {
            document.designMode = 'on'
        }
    })
}());
