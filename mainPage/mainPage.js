const slides = document.getElementById('slider').children
const prev = document.getElementById('left')
const next = document.getElementById('right')
const dots = document.getElementById('stage').children

let i = 0;
let interval;
const activeSlide = (n) => {
    for (let index = 0; index < slides.length - 2; index++) {
        slides[index].classList.add('active')
    }
    for (let index = 0; index < dots.length; index++) {
        dots[index].className = "point"

    }
    dots[n].className = "active_stage"
    slides[n].classList.remove('active')
    console.log('s')
    interval = setInterval(() => {
        console.log('s')
        if (n == slides.length - 3) {
            n = 0;
        }
        else {
            n++;
        }

        for (let index = 0; index < slides.length - 2; index++) {
            slides[index].classList.add('active')
        }
        for (let index = 0; index < dots.length; index++) {
            dots[index].className = "point"

        }
        dots[n].className = "active_stage"
        slides[n].classList.remove('active')

    }, 3000);
}
activeSlide(0)
const nextSlide = () => {
    clearInterval(interval)
    if (i == slides.length - 3) {
        i = 0;
        activeSlide(i)
    }
    else {
        i++;
        activeSlide(i)
    }
}
const prevSlide = () => {
    clearInterval(interval)
    if (i == 0) {
        i = slides.length - 3
        activeSlide(i)
    }
    else {
        i--
        activeSlide(i)
    }

}

next.addEventListener('click', nextSlide)
prev.addEventListener('click', prevSlide)

let xmlRequest;
let curencyRequest;
var byn;
var usd;

async function sendRequest() {
    let req = await fetch('Book.xml')
    const parser = new DOMParser();
    xmlRequest = parser.parseFromString(await req.text(), "application/xml");

    req = await fetch('https://www.cbr-xml-daily.ru/daily.xml')

    curencyRequest = (parser.parseFromString(await req.text(), "text/xml"))
    for await (let item of curencyRequest.getElementsByTagName('CharCode')) {
        if (item.innerHTML == 'USD') {
            usd = (Number(item.parentElement.childNodes[4].innerHTML.split(',').join('.'))).toFixed(1)
        }
        else if (item.innerHTML == 'BYN') {
            byn = (Number(item.parentElement.childNodes[4].innerHTML.split(',').join('.'))).toFixed(1)
        }
    }
    defaultFunctions()
}
sendRequest()

let inFrom = document.getElementById('input-currency-from');
let inTo = document.getElementById('input-currency-to');
var h = true;
var val1;
var val2;
let t = true;
let arrConvert = [];
let bynValues = []

Array.from(document.getElementById('currencyMenu').children).forEach((item) => {
    item.addEventListener('click', () => {

        let copyCollection = Array.from(Collection)

        if (t = true) {
            for (const item of xmlRequest.getElementsByTagName('price')) {
                arrConvert.push(item.innerHTML.split('.').join(''))
            }
            t = false
        }
        if (document.getElementById('currency').innerText != item.innerText) {
            document.getElementById('currency').innerText = item.innerText
            let requestCollection = curencyRequest.getElementsByTagName('CharCode')
            let lbFrom = document.getElementById('label-currency-from')
            let lbTo = document.getElementById('label-currency-to')
            if (lbFrom.innerText != 'Цена от') {
                if (document.getElementById('currency').innerText == 'BYN') {
                    lbFrom.innerHTML = (Number(inFrom.value) * (usd / byn)).toFixed(0) + 'p'
                    inFrom.value = (Number(inFrom.value) * (usd / byn))
                    val1 = Number(inFrom.value)
                }
                else if (document.getElementById('currency').innerText == 'USD') {
                    lbFrom.innerHTML = (Number(inFrom.value) * (byn / usd)).toFixed(0) + '$'
                    inFrom.value = (Number(inFrom.value) * (byn / usd))
                    val1 = Number(inFrom.value)
                }
            }
            if (lbTo.innerText != 'до') {
                if (document.getElementById('currency').innerText == 'BYN') {
                    lbTo.innerHTML = (Number(inTo.value) * (usd / byn)).toFixed(0) + 'p'
                    inTo.value = (Number(inTo.value) * (usd / byn))
                    val2 = Number(inTo.value)

                }
                else if (document.getElementById('currency').innerText == 'USD') {
                    lbTo.innerHTML = (Number(inTo.value) * (byn / usd)).toFixed(0) + '$'
                    inTo.value = (Number(inTo.value) * (byn / usd))
                    val2 = Number(inTo.value)
                }
            }

            for (let elem of requestCollection) {

                if (elem.innerHTML == item.innerText) {
                    let priceArr = document.querySelectorAll('.price')
                    for (let i = 0; i < priceArr.length; i++) {
                        let value = priceArr[i].children[0].innerText.split('')

                        for (let j = 0; j < value.length; j++) {
                            if (value[j] == ' ' || value[j] == '.' || value[j] == 'р' || value[j] == '$') {
                                value.splice(j, 1)
                                j--
                            }
                        }
                        if (value[value.length - 1] == 'p' || value[value.length - 1] == '$') {
                            value.pop()
                        }

                        value = value.join('')

                        if (item.innerText == 'BYN') {
                            let blocks = document.querySelector('.blocks').children
                            for (let j = 0; j < blocks.length; j++) {
                                for (let k = 0; k < copyCollection.length; k++) {
                                    if (blocks[j].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML == `${copyCollection[k].parentNode.parentNode.attributes.brand.nodeValue} ${copyCollection[k].attributes.model.nodeValue}`) {
                                        blocks[j].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerHTML = `${copyCollection[k].children[0].innerHTML} р`
                                        copyCollection.splice(k, 1)
                                        break;
                                    }
                                }
                            }
                        }
                        else if (item.innerText == 'USD') {
                            let blocks = document.querySelector('.blocks').children
                            for (let j = 0; j < blocks.length; j++) {
                                for (let k = 0; k < copyCollection.length; k++) {
                                    if (blocks[j].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML == `${copyCollection[k].parentNode.parentNode.attributes.brand.nodeValue} ${copyCollection[k].attributes.model.nodeValue}`) {

                                        let value = copyCollection[k].children[0].innerHTML.split('')
                                        const rem = value.indexOf('.');
                                        if (rem > -1) {
                                            value.splice(rem, 1)
                                        }


                                        value = String(((Number(value.join('')) * byn) / usd).toFixed(0))

                                        let length = value.length

                                        value = value.split('')
                                        if (length > 3) {
                                            value.splice(-3, 0, '.')
                                        }
                                        blocks[j].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerHTML = `${value.join('')} $`
                                        copyCollection.splice(k, 1)
                                        break;
                                    }
                                }
                            }

                        }
                    }
                    break;
                }

            }
        }
        h = false;
    })
})

document.querySelectorAll('.dropdown_menu').forEach((elem) => {
    elem.addEventListener('mouseover', () => {
        if (elem.classList.contains('model')) {
            if (elem.children[1].children.length != 0) {
                elem.children[1].classList.add('opened')
            }
        }
        else {
            elem.children[1].classList.add('opened')
        }
    })
    elem.addEventListener('mouseleave', () => {
        if (elem.children[1].classList.contains('opened')) {
            elem.children[1].classList.remove('opened')
        }
    })
})

var Collection;
var oneTime
const defaultFunctions = () => {
    document.querySelector('.model').children[0].setAttribute('style', `
    color: grey;
    `)
    Collection = xmlRequest.getElementsByTagName('item')
    let list = document.querySelector('.blocks')
    let count = 1;
    if (Math.ceil(Collection.length / 12) != 1) {
        let pages = document.createElement('div')
        pages.classList.add('pages')
        pages.id = 'pages'

        let pagesWrapper = document.createElement('div')
        pagesWrapper.classList.add('pages-wrapper')
        let left = document.createElement('div')
        left.classList.add('left')
        left.id = 'left'
        let img = document.createElement('img')
        img.src = '../img/left_arrow_icon.svg'
        img.id = 'prevPage'
        img.classList.add('none')

        left.append(img)
        pagesWrapper.append(left)

        if (Math.ceil(Collection.length / 12) > 10) {
            for (let i = 1; i < 11; i++, count++) {
                let page = document.createElement('div')
                page.classList.add('page')
                let p = document.createElement('p')
                p.innerText = i
                if (i == 1) {
                    page.classList.add('selected')
                    page.id = 'first'
                }
                page.append(p)
                pagesWrapper.append(page)
            }
            let empty = document.createElement('div')
            empty.classList.add('page')
            empty.classList.add('page-none')
            empty.id = 'empty'
            p = document.createElement('p')
            p.innerText = '...'
            empty.append(p)
            pagesWrapper.append(empty)

            let page = document.createElement('div')
            page.classList.add('page')
            page.classList.add('max')
            page.id = 'max'
            p = document.createElement('p')
            p.innerText = Math.ceil(Collection.length / 12)
            page.append(p)
            pagesWrapper.append(page)
        }
        else {
            for (let i = 1; i < 11; i++, count++) {
                let page = document.createElement('div')
                let p = document.createElement('p')
                if (i == 1) {
                    page.classList.add('selected')
                    page.id = 'first'
                }
                if (i >= Math.ceil(Collection.length / 12) + 1) {
                    page.classList.add('page-none')
                }
                else {
                    page.classList.add('page')
                    p.innerText = i
                }
                page.append(p)
                pagesWrapper.append(page)
            }
        }
        pagesWrapper.classList.add('size')

        let right = document.createElement('div')
        right.classList.add('right')
        right.id = 'right'
        img = document.createElement('img')
        img.src = '../img/right_arrow_icon.svg'
        img.id = 'nextPage'

        right.append(img)

        pagesWrapper.append(right)
        pagesWrapper.classList.add('view')

        pages.append(pagesWrapper)
        document.getElementById('root').append(pages)
    }
    Cotalog(list)

    MenuMarkFnc(xmlRequest)
    createListOfMarkCollection(list, Collection)
    createListOfModelCollection(list, Collection)
}

let arrInputPrice = [document.getElementById('input-currency-from'), document.getElementById('input-currency-to')]
const inputWrapperPrice = document.querySelectorAll('.input-price_')
inputWrapperPrice.forEach((el) => {
    arrInputPrice.forEach((item) => {
        item.addEventListener('input', () => {
            if (item.id == 'input-currency-from') {
                val1 = Number(inFrom.value)
            }
            else {
                val2 = Number(inTo.value)
            }
        })
    })

    el.children[1].addEventListener('change', () => {
        returnToFirstPage()
        let blocks = document.querySelector('.blocks')
        blocks.innerHTML = ''
        Cotalog(blocks)
    })

    el.addEventListener('mouseenter', (event) => {
        const p = document.getElementById(`p-currency-${event.currentTarget.id}`)
        const label = document.getElementById(`label-currency-${event.currentTarget.id}`)
        const input = document.getElementById(`input-currency-${event.currentTarget.id}`)

        if (h == false) {
            if (val1 != undefined || val2 != undefined) {
                if (input.id == 'input-currency-from') {
                    if (val1 != undefined) {
                        input.value = val1.toFixed(0)
                    }
                }
                else {
                    if (val2 != undefined) {
                        input.value = val2.toFixed(0)
                    }
                }
            }
        }

        input.style.display = 'block'
        label.style.display = 'none'
        p.style.opacity = '1'
    })
    el.addEventListener('mouseleave', () => {
        const p = document.getElementById(`p-currency-${event.currentTarget.id}`)
        const label = document.getElementById(`label-currency-${event.currentTarget.id}`)
        const input = document.getElementById(`input-currency-${event.currentTarget.id}`)

        if (h == false) {
            if (input.id == 'input-currency-from') {
                if (val1 != undefined) {
                    input.value = val1
                }
            }
            else {
                if (val2 != undefined) {
                    input.value = val2
                }
            }
        }
        if (input.value == '0') {
            input.value = ''
        }
        if (input.value != '') {
            if (document.getElementById('currency').innerText == 'BYN') {
                label.innerText = Number(input.value).toFixed(0) + 'p'
            }
            else if (document.getElementById('currency').innerText == 'USD') {
                label.innerText = Number(input.value).toFixed(0) + '$'
            }
        }
        else {
            if (label.id == 'label-currency-to') {
                label.innerText = 'до'
            }
            else {
                label.innerText = 'Цена от'
            }
        }
        p.style.opacity = '0'
        label.style.display = 'block'
        input.style.display = 'none'
    })
})

let arrInputVolume = [document.getElementById('input-volume-from-volume'), document.getElementById('input-volume-to-volume')]
const inputWrapperVolume = document.querySelectorAll('.input-volume_')
inputWrapperVolume.forEach((el) => {
    el.addEventListener('mouseenter', (event) => {
        const p = document.getElementById(`p-volume-${event.currentTarget.id}`)
        const label = document.getElementById(`label-volume-${event.currentTarget.id}`)
        const input = document.getElementById(`input-volume-${event.currentTarget.id}`)
        input.style.display = 'block'
        label.style.display = 'none'
        p.style.opacity = '1'
    })

    el.addEventListener('change', () => {
        returnToFirstPage()
        let blocks = document.querySelector('.blocks')
        blocks.innerHTML =''
        Cotalog(blocks)
    })
    el.addEventListener('mouseleave', (event) => {
        const p = document.getElementById(`p-volume-${event.currentTarget.id}`)
        const label = document.getElementById(`label-volume-${event.currentTarget.id}`)
        const input = document.getElementById(`input-volume-${event.currentTarget.id}`)

        if (input.value == '0') {
            input.value = ''
        }
        if (input.value != '') {
            if (document.getElementById('currency').innerText == 'BYN') {
                label.innerText = input.value + ' л'
            }
            else if (document.getElementById('currency').innerText == 'USD') {
                label.innerText = input.value + ' л'
            }
        }
        else {
            if (label.id == 'label-volume-to-volume') {
                label.innerText = 'до'
            }
            else {
                label.innerText = 'Объем от'
            }
        }

        p.style.opacity = '0'
        label.style.display = 'block'
        input.style.display = 'none'
    })
})

function createListOfModelCollection(blocks, modelMenu) {
    Array.from(document.getElementById('model').children).forEach((item) => {
        item.addEventListener('click', function () {
            let textValue = document.querySelector('.model')
            if (this.innerHTML == '-') {
                textValue.children[0].innerHTML = 'Модель'
            }
            else {
                textValue.children[0].innerHTML = this.innerHTML
            }
            returnToFirstPage()
            // console.log(blocks)
            blocks.innerHTML = ''
            Cotalog(blocks)
        })
    })
}

function createListOfMarkCollection(blocks) {
    let markMenu = document.querySelector('#mark').children

    let collection = Array.from(markMenu)
    collection.forEach((item) => {
        item.addEventListener('click', function () {
            let textValue = document.querySelector('.mark')
            MenuModelFnc(this.innerHTML)
            if (this.innerHTML == '-') {
                textValue.children[0].innerHTML = 'Марка'
                let textValueModel = document.querySelector('.model')
                textValueModel.children[0].innerHTML = 'Модель'
            }
            else {
                textValue.children[0].innerHTML = this.innerHTML
            }
            returnToFirstPage()
            blocks.innerHTML = ''
            Cotalog(blocks)
        })
    })

}

function animation() {

    let ItemCollection = document.querySelector('.blocks').children
    ItemCollection = Array.from(ItemCollection)
    ItemCollection.forEach((item) => {
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

function returnToFirstPage() {
    prevCount = 0
    countPage = 1
    let pagesWrapper = document.querySelector('.pages-wrapper').children

    for (let i = 0; i < pagesWrapper.length; i++) {
        if (pagesWrapper[i].className == 'page selected') {
            pagesWrapper[i].classList.remove('selected')
        }
    }
    pagesWrapper[1].classList.add('selected')

    for (let i = 1; i < 11; i++) {
        pagesWrapper[i].children[0].innerText = i
    }


    sorting()
    setTimeout(() => {
        let pagesWrapper = document.querySelector('.pages-wrapper').children
        let length = Math.ceil(Collection.length / 12)
        if (document.getElementById('empty') != null) {
            for (let k = 1; k < 13; k++) {
                pagesWrapper[k].classList.remove('page-none')
                pagesWrapper[k].children[0].classList.remove('none')
            }

            for (let k = 0, i = countPage; k < 14; k++) {
                if (pagesWrapper[k].id == 'left') {
                    pagesWrapper[k].children[0].classList.add('none')
                }
                else if (i <= length) {
                    if (pagesWrapper[k].id == 'empty') {
                        length++;
                    }
                    else if (pagesWrapper[k].id == 'max') {

                    }
                    else {
                        pagesWrapper[k].children[0].innerText = i
                    }
                    i++;
                }
                else if (Math.ceil(Collection.length / 12) == 1 && pagesWrapper[k].id == 'right') {
                    pagesWrapper[k].children[0].classList.add('none')
                }
                else if (Math.ceil(Collection.length / 12) != 1 && pagesWrapper[k].id == 'right') {
                    pagesWrapper[k].children[0].classList.remove('none')
                }
                else {
                    pagesWrapper[k].classList.add('page-none')
                    pagesWrapper[k].children[0].classList.add('none')
                }
            }
        }
        else {
            for (let k = 1; k < 11; k++) {
                pagesWrapper[k].classList.remove('page-none')
                pagesWrapper[k].children[0].classList.remove('none')
            }

            for (let k = 0, i = countPage; k < 12; k++) {
                if (pagesWrapper[k].id == 'left') {
                    pagesWrapper[k].children[0].classList.add('none')
                }
                else if (i <= length) {
                    if (pagesWrapper[k].id == 'empty') {
                        length++;
                    }
                    else if (pagesWrapper[k].id == 'max') {

                    }
                    else {
                        pagesWrapper[k].children[0].innerText = i
                    }
                    i++;
                }
                else if (Math.ceil(Collection.length / 12) == 1 && pagesWrapper[k].id == 'right') {
                    pagesWrapper[k].children[0].classList.add('none')
                }
                else if (Math.ceil(Collection.length / 12) != 1 && pagesWrapper[k].id == 'right') {
                    pagesWrapper[k].children[0].classList.remove('none')
                }
                else {
                    pagesWrapper[k].classList.add('page-none')
                    pagesWrapper[k].children[0].classList.add('none')
                    pagesWrapper[k].classList.add('page')
                }
            }
        }
    }, 100);
}


let itemArr = []
function pageContent(countPage) {
    const blocks = document.querySelector('.blocks')
    blocks.innerHTML =''
    countPage *= 12
    Cotalog(blocks, countPage)
}
let countPage = 1
let maxValue = 9

function moveForward(count) {
    if (count == undefined) {
        countPage++
    }
    else {
        countPage = count
    }
    let pagesWrapper = document.querySelector('.pages-wrapper').children

    document.getElementById('prevPage').classList.remove('none')
    if (countPage >= Math.ceil(Collection.length / 12)) {
        document.getElementById('nextPage').classList.add('none')
    }
    for (let i = 0; i < pagesWrapper.length; i++) {
        if (pagesWrapper[i].classList.contains('selected')) {
            pagesWrapper[i].classList.remove('selected')
        }

    }
    for (const item of pagesWrapper) {
        if (item.className == 'page' && countPage == Number(item.children[0].innerText)) {
            item.classList.add('selected')
        }
    }


    let str = String(countPage).split('')
    for (let i = 0; i < str.length; i++) {
        if (i + 1 == str.length) {
            if (str[i] == '1') {
                if (countPage + 9 <= Math.ceil(Collection.length / 12)) {
                    for (let i = 1, num = countPage; i < 11, i < Math.ceil(Collection.length / 12); i++, num++) {
                        pagesWrapper[i].children[0].innerText = num
                    }
                }
                else {
                    for (let k = 1, i = countPage; k < 11; k++) {
                        if (i <= Math.ceil(Collection.length / 12)) {
                            pagesWrapper[k].children[0].innerText = i
                            i++;
                        }
                        else {
                            pagesWrapper[k].classList.add('page-none')
                            pagesWrapper[k].children[0].classList.add('none')
                        }
                    }
                }
                pagesWrapper[1].classList.add('selected')
                pagesWrapper[1].id = 'first'
            }
        }
        else {
            if (Number(document.getElementById('first').children[0].innerHTML) + 9 >= Math.ceil(Collection.length / 12) && document.getElementById('empty') != null) {
                document.getElementById('empty').children[0].classList.add('none')
                document.getElementById('max').children[0].classList.add('page-none')
            }
        }
    }
    pageContent(countPage)
}

function moveBackward() {
    countPage--
    document.getElementById('nextPage').classList.remove('none')
    if (countPage == 1) {
        document.getElementById('prevPage').classList.add('none')
    }
    let pagesWrapper = document.querySelector('.pages-wrapper').children

    for (let i = 0; i < pagesWrapper.length; i++) {
        if (pagesWrapper[i].className == 'page selected') {
            pagesWrapper[i].classList.remove('selected')
        }
    }
    for (const item of pagesWrapper) {

        if (item.className == 'page' && countPage == Number(item.children[0].innerText)) {
            item.classList.add('selected')
        }
    }
    let str = String(countPage).split('')
    for (let i = 0; i < str.length; i++) {
        if (i + 1 == str.length) {
            if (str[i] == '0' && str.length != 1) {
                for (let i = 10, num = countPage; i != 0; i--, num--) {
                    if (pagesWrapper[i].classList.value == 'page page-none') {
                        pagesWrapper[i].classList.remove('page-none')
                        pagesWrapper[i].children[0].classList.remove('none')
                    }
                    pagesWrapper[i].children[0].innerText = num
                }
                pagesWrapper[10].classList.add('selected')
            }
        }
    }
    pageContent(countPage, false)

}

function MenuMarkFnc(cars) {
    let MenuMark = document.getElementById('mark')
    let mark = cars.getElementsByTagName('mark')
    let rows = 0
    for (let i = -1; i < mark.length; i++) {
        let li = document.createElement('li')
        if (i == -1) {
            li.innerHTML = '-'
        }
        else {
            li.innerHTML = mark[i].attributes.brand.nodeValue
        }
        if (i < 3) {
            rows += 66
            MenuMark.style.height = `${rows}px`
        }
        MenuMark.append(li)
    }
}

function MenuModelFnc(name) {
    let MenuModel = document.getElementById('model')

    if (MenuModel.children.length != 0 || name == '-') {
        MenuModel.innerHTML = ''
        MenuModel.style.height = `0px`
        MenuModel.parentElement.children[0].setAttribute('style', 'color:grey;')
    }
    for (const item of xmlRequest.getElementsByTagName('mark')) {
        if (item.attributes.brand.nodeValue == name) {
            let rows = 0
            for (let i = -1; i < item.children.length; i++) {
                let li = document.createElement('li')
                if (i == -1) {
                    li.innerHTML = '-'
                }
                else {
                    li.innerHTML = item.children[i].attributes.model.nodeValue
                }
                if (i < 3) {
                    rows += 66
                    MenuModel.style.height = `${rows}px`

                }
                MenuModel.append(li)
            }
            MenuModel.parentElement.children[0].setAttribute('style', 'color:black;')
            break;
        }
    }
    createListOfModelCollection(document.getElementById('blocks'), MenuModel)
}

function sorting(blocks) {

    Collection = xmlRequest.getElementsByTagName('item')
    let markValue = document.querySelector('.mark').children[0].innerHTML
    let volumeFromValue = document.getElementById('label-volume-from-volume').innerText
    let volumeToValue = document.getElementById('label-volume-to-volume').innerText
    let modelValue = document.querySelector('.model').children[0].innerHTML
    let priceFromValue = document.getElementById('label-currency-from').innerText
    let priceToValue = document.getElementById('label-currency-to').innerText
    if (markValue != 'Марка') {
        let tempararyCollection = []
        for (const item of Collection) {
            if (item.parentElement.parentElement.attributes.brand.nodeValue == markValue) {
                tempararyCollection.push(item)
            }
        }
        Collection = tempararyCollection
    }

    if (volumeFromValue != 'Объем от') {
        let tempararyCollection = []
        for (const item of Collection) {
            let strItem = item.children[3].innerHTML.split('')
            strItem.pop()
            let strValue = volumeFromValue.split('')
            strValue.pop()
            if (Number(strItem.join('')) >= Number(strValue.join(''))) {
                tempararyCollection.push(item)
            }
        }
        Collection = tempararyCollection
    }

    if (volumeToValue != 'до') {
        let tempararyCollection = []
        for (const item of Collection) {
            let strItem = item.children[3].innerHTML.split('')
            strItem.pop()
            let strValue = volumeToValue.split('')
            strValue.pop()
            if (Number(strItem.join('')) <= Number(strValue.join(''))) {
                tempararyCollection.push(item)
            }

        }
        Collection = tempararyCollection
    }

    if (modelValue != 'Модель') {
        let tempararyCollection = []
        for (const item of Collection) {
            if (modelValue == item.parentElement.attributes.model.nodeValue) {
                tempararyCollection.push(item)
            }
        }
        Collection = tempararyCollection
    }

    if (priceFromValue != 'Цена от') {
        let tempararyCollection = []
        let strValue = priceFromValue.split('')
        strValue.pop()
        for (const item of Collection) {
            let strValue = priceFromValue.split('')
            strValue.pop()
            let strItem = item.children[0].innerHTML.split('')
            if (strItem.length > 3) {
                strItem.splice(-4, 1)
            }
            let val;
            if (document.getElementById('currency').innerText == 'BYN') {
                val = Number(strItem.join(''))
            }
            else {
                val = Number((Number(strItem.join('')) * Number(byn) / Number(usd)).toFixed(0))
            }
            if (val >= Number(strValue.join(''))) {
                tempararyCollection.push(item)
            }
        }
        Collection = tempararyCollection
    }

    if (priceToValue != 'до') {
        let tempararyCollection = []
        let strValue = priceToValue.split('')
        strValue.pop()
        for (const item of Collection) {
            let strValue = priceToValue.split('')
            strValue.pop()
            let strItem = item.children[0].innerHTML.split('')
            if (strItem.length > 3) {
                strItem.splice(-4, 1)
            }
            let val;
            if (document.getElementById('currency').innerText == 'BYN') {
                val = Number(strItem.join(''))
            }
            else {
                val = Number((Number(strItem.join('')) * Number(byn) / Number(usd)).toFixed(0))
            }
            if (val <= Number(strValue.join(''))) {
                tempararyCollection.push(item)
            }
        }
        Collection = tempararyCollection
    }
}
function Cotalog(blocks, pageCount = 12) {
    sorting(blocks)
    if (pageCount == 0) {
        pageCount = 12
    }
    var count = 1;
    let notFounded = 0;
    let prevCount = pageCount - 12;
    for (let j = 1; prevCount < pageCount; prevCount++, j++) {
        if (prevCount < Collection.length) {
            if (j % 3 == 0) {
                count++;
            }
            let priceCollection = Collection[prevCount].children[0]
            let yearCollection = Collection[prevCount].children[1]
            let typeCollection = Collection[prevCount].children[2]
            let volumeCollection = Collection[prevCount].children[3]
            let fuelCollection = Collection[prevCount].children[4]


            let block = document.createElement('div')
            block.classList.add('block')
            blocks.append(block)

            let item = document.createElement('div')
            item.classList.add('item')
            block.append(item)

            let imgDiv = document.createElement('div')
            imgDiv.classList.add('img')
            imgDiv.style.backgroundImage = `url(${Collection[prevCount].attributes.image.nodeValue})`
            let img = document.createElement('img')
            img.src = Collection[prevCount].attributes.image.nodeValue
            img.style.display = 'none'
            imgDiv.append(img)
            item.append(imgDiv)



            let description = document.createElement('div')
            description.classList.add('description')
            item.append(description)

            let infoHeader = document.createElement('div')
            infoHeader.classList.add('info_header')
            description.append(infoHeader)

            let model = document.createElement('h2')
            model.classList.add('model')
            model.innerText = `${Collection[prevCount].parentNode.parentNode.attributes.brand.nodeValue} ${Collection[prevCount].attributes.model.nodeValue}`
            infoHeader.append(model)

            let price = document.createElement('div')
            price.classList.add('price')
            let p = document.createElement('p')
            if (document.getElementById('currency').innerText == 'BYN') {
                p.innerText = `${priceCollection.innerHTML} p`
            }
            else {
                let val = (Number(priceCollection.innerHTML.split('.').join('')) * Number(byn) / Number(usd)).toFixed(0)
                if (val.length > 3) {
                    let tmp = val.split('')
                    tmp.splice(-3, 0, '.')
                    val = tmp.join('')
                }
                p.innerText = `${val} $`
            }

            price.append(p)
            infoHeader.append(price)
            
            let infoDescription = document.createElement('div')
            infoDescription.classList.add('info_description')
            description.append(infoDescription)

            let information = document.createElement('p')
            information.innerText = `${yearCollection.innerHTML}, ${typeCollection.innerHTML}, ${volumeCollection.innerHTML}, ${fuelCollection.innerHTML} `
            infoDescription.append(information)

            let shadow = document.createElement('div')
            shadow.classList.add('shadow')
            block.append(shadow)
            notFounded++;
        }
    }
    let stylesForBlock = document.getElementById('blocks')
    if (notFounded == 0) {
        let notFoundedText = `<div style="text-align:center;"><img src="../img/main/sad.svg" alt=""><h1 class="not-found">Ничего не найдено</h1></div>`
        blocks.innerHTML = notFoundedText
        document.getElementById('pages').style.display = 'none'
        stylesForBlock.classList.add('hide')
        stylesForBlock.classList.remove('show')
    }
    else {
        animation()
        if (document.getElementById('empty') != null) {
            if (Number(document.getElementById('first').children[0].innerHTML) + 9 >= Math.ceil(Collection.length / 12)) {
                document.getElementById('empty').classList.add('page-none')
                document.getElementById('empty').children[0].classList.add('none')
                document.getElementById('max').classList.add('page-none')
                document.getElementById('max').children[0].classList.add('none')
            }
            else {
                document.getElementById('empty').children[0].classList.remove('none')
                document.getElementById('max').classList.remove('page-none')
                document.getElementById('max').children[0].classList.remove('none')
            }
        }
        stylesForBlock.classList.add('show')
        stylesForBlock.classList.remove('hide')
        document.getElementById('pages').style.display = 'block'

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
                stylesForBlock.style.gridTemplateRows = `repeat(${Math.ceil(blocks.children.length / delitel)}, 350px)`
            }
            else {
                stylesForBlock.style.gridTemplateRows = `repeat(${Math.ceil(blocks.children.length / delitel)}, 550px)`
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
    }

    Array.from(document.querySelectorAll('.block')).forEach((item) => {
        item.addEventListener('click', function () {

            localStorage.setItem('image', event.currentTarget.querySelector('img').src)
            let items = xmlRequest.getElementsByTagName('item')

            for (let i = 0; i < items.length; i++) {
                if (items[i].attributes.image.nodeValue == event.currentTarget.querySelector('img').src) {
                    localStorage.setItem('model', items[i].parentElement.outerHTML);
                    localStorage.setItem('brand', items[i].parentElement.parentElement.attributes.brand.nodeValue);
                }
            }
            localStorage.setItem('byn', byn);
            localStorage.setItem('usd', usd);
            window.document.location = '../itemPage/page.html'
        })
    })
    if (document.querySelector('.mark').children[0].innerText != 'Марка') {
        document.querySelector('.model').addEventListener('mouseover', () => {
            let arr = document.querySelector('.model').children
            for (let el of arr) {
                if (el.className == 'menu') {
                    el.classList.add('opened')
                }
            }
        })
        document.querySelector('.model').addEventListener('mouseleave', () => {
            let arr = document.querySelector('.model').children
            for (let el of arr) {
                el.classList.remove('opened')
            }
        })
    }
    return blocks
}

setTimeout(() => {
    document.getElementById('nextPage').addEventListener('click', () => {
        if (countPage < Math.ceil(Collection.length / 12)) {
            moveForward()
        }
    })

    document.getElementById('prevPage').addEventListener('click', () => {
        if (countPage != 1) {
            moveBackward()
        }
    })
    Array.from(document.querySelectorAll('.page')).forEach((item) => {
        if (item.id != 'empty') {

            item.addEventListener('click', function () {


                if (!item.classList.contains("page-none")) {
                    moveForward(this.children[0].innerHTML)
                    if (Number(this.children[0].innerHTML) == Math.ceil(Collection.length / 12)) {
                        document.getElementById('nextPage').classList.add('none')
                    }
                    else {
                        document.getElementById('nextPage').classList.remove('none')
                    }

                    if (countPage == 1) {
                        document.getElementById('prevPage').classList.add('none')
                    }
                }
            })
        }
    })
}, 1000)


window.alert = function () {
    document.getElementById('background').style.display = 'block'
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('background').style.display = 'none'
    })
}

document.getElementById('contact-us').addEventListener('click', function () {
    alert()
})
