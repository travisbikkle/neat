document.addEventListener('DOMContentLoaded', ()=>{
    'use strict';
    let checkbox = document.getElementById('bl_learn_mode')

    chrome.storage.local.get(['bl_learn_mode']).then(
        result => {
            console.log("bl_learn_mode now is", result.bl_learn_mode)
            checkbox.checked = result.bl_learn_mode
        }
    )

    function blClick() {
        chrome.storage.local.set({'bl_learn_mode': this.checked}).then(
            () => {
                console.log("bl_learn_mode is set to", this.checked)
            }
        )
    }

    checkbox.addEventListener('change', blClick)
}, false);
