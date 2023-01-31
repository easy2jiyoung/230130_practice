/*
const price = 10000 // 소비자가격
const priceKrw = new Intl.NumberFormat('kr-KO', { style: 'currency', currency: 'KRW' }).format(price) + "원"
let tax = price / 11 * 10
tax = Math.round(tax)
tax = new Intl.NumberFormat('kr-KO', { style: 'currency', currency: 'KRW' }).format(tax)
tax = tax + "원"
let originalPrice = price / 11
originalPrice =  Math.round(originalPrice)
originalPrice = new Intl.NumberFormat('kr-KO', { style: 'currency', currency: 'KRW' }).format(originalPrice)
originalPrice = originalPrice + "원"
*/
/*
const curByCountry = {
    en: {
        format: "en-Us",
        currency: "USD"
    },
    kr: {
        format: "kr-KO",
        currency: "KRW"
    }
}
// const en = "kr"
// console.log(en)
// console.log(curByCountry[en])


function allPrice (price, country) {
    const countryCode = country || "kr"
    // console.log(countryCode)
    const cur = curByCountry[countryCode]
    // console.log(cur)

    const total = new Intl.NumberFormat(cur.format, { style: 'currency', currency: cur.currency }).format(price)
    let supplied = price / 11 * 10
    supplied = Math.round(supplied)
    supplied = new Intl.NumberFormat(cur.format, { style: 'currency', currency: cur.currency }).format(supplied)
    let tax = price / 11
    tax = Math.round(tax)
    tax = new Intl.NumberFormat(cur.format, { style: 'currency', currency: cur.currency }).format(tax)

    return {
        total,
        supplied,
        tax
    }
}

console.log(allPrice(10000, "en"))
*/
const curByCountry = {
    en: {
        format: "en-Us",
        currency: "USD"
    },
    kr: {
        format: "kr-KO",
        currency: "KRW"
    }
}
const curSymbol = ((number, code) => {
    const cur = curByCountry[code]
    return new Intl.NumberFormat(cur.format, { style: 'currency', currency: cur.currency }).format(number)
})

const allPrice = ((price, country) => {
    const countryCode = country || "kr"
    return {
        total: curSymbol(price, countryCode),
        supplied: curSymbol(Math.round(price / 11 * 10), countryCode),
        tax: curSymbol(Math.round(price / 11), countryCode)
    }
})

console.log(allPrice(10000))