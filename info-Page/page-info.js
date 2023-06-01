setInterval(() => {
    if (window.screen.availWidth <= 848) {
        document.querySelector('.humburger').children[0].addEventListener('click', function () {
            document.querySelector('aside').setAttribute('style', `
            display:flex;
             `)
        })
        if (document.querySelector('aside').style.display == 'flex') {
            document.querySelector('.empty').addEventListener('click', function () {
                document.querySelector('aside').style.display = 'none'
            })
        }
    }
    else {     
        document.querySelector('aside').setAttribute('style', `
        display:none;
        `)
    }
}, 100)
