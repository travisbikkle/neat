(function () {
    'use strict';
    const hideRightContainer = () => {
        let rightContainer = document.querySelector('.right-container')
        if (rightContainer && rightContainer.style.display !== 'none') {
            rightContainer.style.display = 'none'
        }
    }

    const hideElementBySelector = (selector) => {
        let ele = document.querySelector(selector)
        if (ele) ele.style.display = 'none'
    }

    const adjustVideo = () => {
        let video = document.querySelector('.video-container-v1')
        if (video) {
            video.style.justifyContent = 'normal'
        }
    }

    const fix = () => {
        hideRightContainer()
        hideElementBySelector('#comment')
        hideElementBySelector('#bannerAd')
        hideElementBySelector('#reco_list')
        adjustVideo()
    }

    chrome.storage.local.get(['bl_learn_mode']).then(r => {
        let count = 0
        if (r.bl_learn_mode) {
            let i = setInterval(() => {
                count ++;
                if (count === 10) {
                    clearInterval(i)
                    return
                }
                fix()
            }, 1000)
        }
    })
})();
