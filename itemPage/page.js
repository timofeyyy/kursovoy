window.alert = function () {
    document.getElementById('background').style.display = 'block'
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('background').style.display = 'none'
    })
}

document.querySelector('.contact-us').addEventListener('click', function () {
    alert()
})

var xmlRequest
async function sendRequest() {
    let req = await fetch('links.xml')
    const parser = new DOMParser();
    xmlRequest = parser.parseFromString(await req.text(), "application/xml");
    defaultFunction()
}
sendRequest()
const parser = new DOMParser()
let Collection = parser.parseFromString(localStorage.getItem('model'), "application/xml").getElementsByTagName('item')
var index = 0;
for (let i = 0; i < Collection.length; i++) {
    if (localStorage.getItem('image') == Collection[i].attributes.image.nodeValue) {
        index = i;
        break;
    }
}
var data = localStorage.getItem("data");
var dataArr = data ? JSON.parse(data) : []

function changeItems(index) {
    document.querySelector('.mark').innerText = `Продажа ${localStorage.getItem('brand')} ${Collection[index].attributes.model.nodeValue} ${Collection[index].children[1].innerHTML} г`
    let str = Collection[index].attributes.model.nodeValue.split('')
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ' ') {
            str[i] = '.'
            str = str.join('').split('.')
            break;
        }
    }
    let pathWrapper = document.querySelector('.path-wrapper')
    let h3 = document.createElement('h3')
    h3.innerText = localStorage.getItem('brand')
    pathWrapper.append(h3)
    let div = document.createElement('div')
    div.classList.add('arrow')
    div.innerHTML = ' <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.707,17.707a1,1,0,0,1-1.414-1.414L19.586,13H2a1,1,0,0,1,0-2H19.586L16.293,7.707a1,1,0,0,1,1.414-1.414l5,5a1,1,0,0,1,0,1.414Z" /></svg>'
    pathWrapper.append(div)
    h3 = document.createElement('h3')
    h3.innerText = Collection[index].attributes.model.nodeValue
    pathWrapper.append(h3)
    div = document.createElement('div')
    div.classList.add('arrow')
    div.innerHTML = ' <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.707,17.707a1,1,0,0,1-1.414-1.414L19.586,13H2a1,1,0,0,1,0-2H19.586L16.293,7.707a1,1,0,0,1,1.414-1.414l5,5a1,1,0,0,1,0,1.414Z" /></svg>'
    pathWrapper.append(div)
    h3 = document.createElement('h3')
    h3.classList.add('buy-item')
    h3.innerText = `Купить ${localStorage.getItem('brand')} ${Collection[index].attributes.model.nodeValue}`
    pathWrapper.append(h3)

    document.getElementById('byn').innerText = `${Collection[index].children[0].innerHTML} р`
    document.getElementById('byn').classList.add('selected')
    let val = String((Number(Collection[index].children[0].innerHTML.split('.').join('')) * Number(localStorage.getItem('byn')) / Number(localStorage.getItem('usd'))).toFixed(0)).split('')
    if (val.length > 3) {
        val.splice(-3, 0, '.')
    }
    document.getElementById('usd').innerText = `${val.join('')} $`
    document.getElementById('usd').classList.add('unselected')
    document.getElementById('image-wrapper').style.backgroundImage = `url(${Collection[index].attributes.image.nodeValue})`
    let ul = document.querySelector('.info').children[0]
    ul.children[0].innerText = Collection[index].children[1].innerHTML
    ul.children[1].innerText = Collection[index].children[2].innerHTML
    ul.children[2].innerText = Collection[index].children[3].innerHTML
    ul.children[3].innerText = Collection[index].children[4].innerHTML

    let count = 0
    for (const item of dataArr) {
        if (item.image == Collection[index].attributes.image.nodeValue) {
            count++;
        }
    }
    if (count == 0) {
        document.getElementById('bookmark').className = 'mark'
    }
    else {
        document.getElementById('bookmark').className = 'marked'
    }
}
changeItems(index)

Array.from(document.querySelectorAll('.img')).forEach((item) => {
    item.addEventListener('mouseover', function () {
        this.classList.add('extend')
    })
    item.addEventListener('mouseout', function () {
        this.classList.remove('extend')
    })
    item.addEventListener('click', function () {

        for (let i = 0; i < length; i++) {
            pathWrapper[0].removeChild(pathWrapper[0])
        }
        if (this.parentElement.classList.contains('right')) {
            if (index < Collection.length) {
                document.querySelector('.path-wrapper').innerHTML = ''
                index++
                if (index == Collection.length) {
                    index--
                }
                changeItems(index)
            }
        }
        else {
            if (index > 0) {
                document.querySelector('.path-wrapper').innerHTML = ''
                index--
                changeItems(index)
            }
        }
    })
})


function defaultFunction() {
    xmlRequest = xmlRequest.getElementsByTagName('link')
    let blocks = document.querySelectorAll('.block')
    let randomIndex1 = Math.floor(Math.random() * 12)
    blocks[0].children[0].setAttribute(`style`, `
    background-image: url(${xmlRequest[randomIndex1].attributes.image.nodeValue});
   `)
    blocks[0].children[1].children[0].innerText = xmlRequest[randomIndex1].children[0].innerHTML
    blocks[0].children[1].children[1].innerText = xmlRequest[randomIndex1].children[1].innerHTML

    let randomIndex2 = Math.floor(Math.random() * 12)
    while (randomIndex2 == randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * 12)
    }
    blocks[1].children[0].setAttribute(`style`, `
    background-image: url(${xmlRequest[randomIndex2].attributes.image.nodeValue});
   `)
    blocks[1].children[1].children[0].innerText = xmlRequest[randomIndex2].children[0].innerHTML
    blocks[1].children[1].children[1].innerText = xmlRequest[randomIndex2].children[1].innerHTML
    blocks[0].addEventListener('click', function () {
        window.document.location = xmlRequest[randomIndex1].attributes.lnk.nodeValue
    })
    blocks[1].addEventListener('click', function () {
        window.document.location = xmlRequest[randomIndex2].attributes.lnk.nodeValue
    })
}

setInterval(() => {
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






document.getElementById('bookmark').addEventListener('click', function () {

    if (this.className == 'mark') {
        this.className = 'marked'
        let str = document.getElementById('image-wrapper').style.backgroundImage
        let regexp = /[\(\)\"\s]/g
        str = str.replace(regexp, '')
        regexp = /url/
        for (const item of Collection) {
            if (str.replace(regexp, '') == item.attributes.image.nodeValue) {
                let obj = {
                    brand: localStorage.getItem('brand'),
                    image: item.attributes.image.nodeValue,
                    model: item.attributes.model.nodeValue,
                    price: item.children[0].innerHTML,
                    year: item.children[1].innerHTML,
                    type: item.children[2].innerHTML,
                    volume: item.children[3].innerHTML,
                    fuel: item.children[4].innerHTML
                }
                dataArr.push(obj);
                break;
            }
        }
    }
    else {
        this.className = 'mark'
        let str = document.getElementById('image-wrapper').style.backgroundImage
        let regexp = /[\(\)\"\s]/g
        str = str.replace(regexp, '')
        regexp = /url/
        for (let i = 0; i < dataArr.length; i++) {
            if (str.replace(regexp, '') == dataArr[i].image) {
                dataArr.splice(i, 1)
                break;
            }
        }
    }
    localStorage.setItem('data', JSON.stringify(dataArr))
})

Array.from(document.querySelector('.price').children).forEach((item) => {
    item.addEventListener('mouseover', function () {
        if (this.classList.contains('usd')) {
            document.getElementById('usd').className = 'selected'
            document.getElementById('byn').className = 'unselected'
        }
        else {
            document.getElementById('byn').className = 'selected'
            document.getElementById('usd').className = 'unselected'
            document.getElementById('usd').style.margin = '0'
        }
    })
})
Array.from(document.querySelector('.advert-links').children).forEach((item) => {
    item.addEventListener('mouseover', function () {
        this.classList.add('selected')
    })
    item.addEventListener('mouseout', function () {
        this.classList.remove('selected')
    })
})
