(function () {
    'use strict';
    const hideRightContainer = () => {
        let rightContainer = document.querySelector('.right-container')
        if (rightContainer && rightContainer.style.display !== 'none') {
            rightContainer.style.display = 'none'
        }
    }
    /**
     * <div id='multi_page'>
     * <div clsss='base-video-sections-v1'>
     */
    const keepMultiCurList = () => {
        let curList = document.getElementById('new-episode-list')
        if (curList) {
            return;
        }
        // 克隆列表
        curList = document.querySelector('#multi_page')
        if (!curList) {
            curList = document.querySelector('.base-video-sections-v1')
        }
        curList = curList.cloneNode(true)
        curList.id = 'new-episode-list'
        curList.style.opacity = '99'
        curList.style.display = 'inline-block'
        curList.style.opacity = '0'

        let referenceNode = document.querySelector('#bilibili-player')
        let parentNode = referenceNode.parentNode // #playerWrap

        curList.remove()
        parentNode.insertBefore(curList, referenceNode.nextSibling)

        parentNode.style.position = 'relative'
        referenceNode.style.position = 'absolute'

        // 鼠标事件
        curList.addEventListener('mouseover', () => {
            curList.style.opacity = '1'
            document.querySelector('.watched.on').scrollIntoView({ block: 'nearest', inline: 'start' })
        })
        curList.addEventListener('mouseleave', () => {
            curList.style.opacity = '0'
        })
    }


    const addListButton = () => {
        // 右下角添加控件
        let listButton = document.getElementById('new-list-button')
        if (listButton) {
            return;
        }
        listButton = document.createElement('div')
        listButton.id = 'new-list-button'
        listButton.innerHTML = '选集&nbsp;&nbsp;'
        listButton.classList.add('bpx-player-ctrl-btn')
        listButton.classList.add('bpx-player-ctrl-quality-result')
        listButton.setAttribute('role', 'button')
        listButton.addEventListener('click', () => {
            let curList = document.querySelector('#new-episode-list')
            if (curList.style.opacity === '1') {
                curList.style.opacity = '0'
            } else if (curList.style.opacity === '0') {
                curList.style.opacity = '1'
            }
        })
        listButton.style.userSelect = 'none'
        let controlContainer = document.querySelector('.bpx-player-control-bottom-right')
        if (controlContainer) {
            listButton.remove()
            controlContainer.insertBefore(listButton, controlContainer.firstChild)
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
        // keepMultiCurList()
        // addListButton()
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
