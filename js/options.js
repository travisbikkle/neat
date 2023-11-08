$(document).ready(() => {
    $('#design_mode_switch').change(() => {
        x=$(this)
        checked=x.is(":checked")
        if (checked) {
            // change from checked to unchecked
            console.log("current: " + checked + ", change document.designMode to 'off'")
            $.designMode = 'off'
        } else {
            console.log("current: " + checked + ", change document.designMode to 'on'")
            $.designMode = 'on'
        }
    })
});
