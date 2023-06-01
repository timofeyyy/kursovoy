let data = localStorage.getItem('data')
let blocks = document.getElementById('blocks')
let dataArr = data ? JSON.parse(data) : []
let xmlRequest
async function sendRequest() {
    let req = await fetch('/pages/mainPage/Book.xml')
    const parser = new DOMParser();
    xmlRequest = parser.parseFromString(await req.text(), "application/xml");
    // console.log(xmlRequest)
}
sendRequest()

function show() {
    if (dataArr.length != 0) {
        for (const item of dataArr) {
            let block = document.createElement('div')
            block.classList.add('block')
            block.innerHTML = `<div class="item">
            <div class="img" style="background-image: url(${item.image});background-size: cover;
            background-position: center;
            width: 100%;
            height: 100%;">
            <img src="${item.image}" style="display: none;"></div>
            <div class="description">
                <div class="info_header">
                    <h2 class="model"> ${item.brand} ${item.model}</h2>
                    <div class="price">
                        <p>
                            ${item.price} р
                        </p>
                    </div>
                </div>
                <div class="info_description">
                    <p> ${item.year} г, ${item.type}, ${item.volume} л,  ${item.fuel}</p>
                </div>
            </div>
        </div>
    
        <div class="shadow"></div>
        <div class="close">
        <svg id="Layer_2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
        <g id="_20" data-name="20">
        <path style="stroke:black; stroke-width:3;" d="m3 29.5a.5.5 0 0 1 -.354-.854l26-26a.5.5 0 0 1 .707.707l-26 26a.5.5 0 0 1 -.353.147z" />
        <path style="stroke:black; stroke-width:3;" d="m29 29.5a.5.5 0 0 1 -.354-.146l-26-26a.5.5 0 0 1 .707-.707l26 26a.5.5 0 0 1 -.353.853z" />
        </g>
        </svg>
        </div>`
            blocks.append(block)
        }
        setTimeout(itemPage(), 1000)
    }
    else {
        blocks.style.gridTemplateColumns ='unset'
        blocks.innerHTML = `<div style="text-align:center;"><a href="/pages/mainPage/mainPage.html"><img src="/pages/img/main/cart.svg" alt=""></a><h1 class="not-found">Пусто</h1></div>`
    }
}

show()


setInterval(() => {
    let delitel;
    if (window.screen.availWidth <= 1300 && window.screen.availWidth >= 880) {
        delitel = 2
    }
    else if (window.screen.availWidth <= 880) {
        delitel = 1
    }
    else {
        delitel = 3
    }

    if (window.screen.availWidth <= 400) {
        blocks.style.gridTemplateRows = `repeat(${Math.ceil(blocks.children.length / delitel)}, 350px)`
    }
    else {
        blocks.style.gridTemplateRows = `repeat(${Math.ceil(blocks.children.length / delitel)}, 550px)`
    }

  

    if (window.screen.availWidth <= 730) {
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


function animation() {
    Array.from(blocks.children).forEach((item) => {
        item.addEventListener('mouseover', () => {
            item.classList.add('selected')
            item.children[1].classList.add('active')
        })
        item.addEventListener('mouseleave', () => {
            item.classList.remove('selected')
            item.children[1].classList.remove('active')
        })
    })
}

function itemPage() {
    Array.from(blocks.children).forEach((item) => {
        let a = true
        item.children[2].addEventListener('click', function (event) {
            event.stopPropagation()
            // console.log(this.parentElement.children[0].children[0].children[0].src)
            for (let i = 0; i < dataArr.length; i++) {
                if(dataArr[i].image == this.parentElement.children[0].children[0].children[0].src) {
                    dataArr.splice(i,1)
                    localStorage.setItem('data', JSON.stringify(dataArr))
                    break;
                }  
            }
            blocks.innerHTML =''
            show()
            a = false 
        })
        if(a == true) {
            item.addEventListener('click', function (event) {
                localStorage.setItem('image', event.currentTarget.querySelector('img').src)
                let items = xmlRequest.getElementsByTagName('item')
                for (let i = 0; i < items.length; i++) {
                    if (items[i].attributes.image.nodeValue == event.currentTarget.querySelector('img').src) {
                        // console.log(items[i].parentElement.outerHTML)
                        localStorage.setItem('model', items[i].parentElement.outerHTML);
                        localStorage.setItem('brand', items[i].parentElement.parentElement.attributes.brand.nodeValue);
                    }
                }
                window.document.location = '/pages/itemPage/page.html'
            })
        }
    })
}



