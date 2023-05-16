(function() {
    'use strict';

    // prevent escape event, see also [#2](https://github.com/yzx9/Tampermonkey/issues/2)
    window.addEventListener('keydown', e => e.keyCode === 27 && e.stopImmediatePropagation(), true)

    // watch modal
    let disabled = false

    const body = document.body
    const html = document.documentElement

    const getModal = () => document.querySelector('.signFlowModal')

    const modalObserver = new MutationObserver(() => {
        const modal = getModal()
        if (!disabled && modal) {
            let parent = modal.parentNode
            while (parent.parentNode !== body) parent = parent.parentNode
            body.removeChild(parent)
            html.style.overflow = 'auto'
            html.style.marginRight = 'auto'
        }
    })

    modalObserver.observe(body, {
        childList: true,
        subtree: false
    })

    // watch login button
    const listener = () => {
        disabled = true
        setTimeout(() => {
            const close = document.querySelector('.Modal-closeButton')
            close.addEventListener('click', () => (disabled = false))
        }, 100)
    }

    const headerClass = ['.AppHeader', '.ColumnPageHeader']
    const loginButtonObserverCallback = () => {
        const buttons = headerClass.map(clazz => Array.from(document.querySelectorAll(`${clazz} button`))).filter(a => a.length).flat()
        buttons.forEach(button => button.removeEventListener('click', listener))
        buttons.forEach(button => button.addEventListener('click', listener))
    }
    const loginButtonObserver = new MutationObserver(loginButtonObserverCallback)
    const header = headerClass.map(clazz => document.querySelector(clazz)).find(el => el)
    loginButtonObserver.observe(header, { childList: true, subtree: true })
    loginButtonObserverCallback()

    // 右下角
    setInterval(() => {
        const rightCorner = document.querySelector('.css-1ynzxqw')
        if (rightCorner) {
            rightCorner.style.display='none'
        }
    }, 100)
})();
