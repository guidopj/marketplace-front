const jsonData = require('./products.json');
var moment = require('moment'); // require

//1. User is coming from an Off-White promotion offer link, display only the Off-White's products with a reduced price of 10%.
function filterByWithPriceReduced(brand, percentage){
	const filteredProducts = jsonData.products.reduce(function (filtered, product) {
		if(product.brand === brand){
			const discount = product.price.price_in_cents * percentage
			const newPriceInCents = Math.round(product.price.price_in_cents -= discount)
			const newPrice = (newPriceInCents / 100).toFixed(2).concat(product.price.currency)
			product.price.price = newPrice
			product.price.price_in_cents = newPriceInCents
			filtered.push(product)
		}
		return filtered
	}, [])

	return filteredProducts
}

const result1 = filterByWithPriceReduced("Off-White", 0.1)

//2. Louis Vuitton doesn't want us to display the name of their brand on our website,
//could you reverse the name of the brand for each LV product to obfuscate their name ?

function obfuscateName(brand){
	const newProductList = jsonData.products.map(product => {
		if(product.brand === brand){
			product.brand = product.brand.split("").reverse().join("");
		}
		return product
	})
	return newProductList
}

const result2 = obfuscateName("Louis Vuitton")

//3. I'm a user from UK and I want to see product between 1500€ and 500€, ordered from the cheaper to the most expensive
//that are shippable to my country.

function productsShippableTo(country){
	const products = jsonData.products.filter(product => {
		const price = product.price.price_in_cents / 100
		if(price > 500 && price < 1500 && product.shippable_countries.includes(country)){
			return product
		}
	})
	return products.sort(function(p1, p2){
		return p1.price.price_in_cents - p2.price.price_in_cents
	})
}

const result3 = productsShippableTo("UK")

//4. We want to display how many days/month/year since each products has been deposited on the website (ie: Deposited 1month and 3days ago)

function getTimeDeposited(){
	const timeDeposited = jsonData.products.map(product => {
		let timeDescription = ""
		let depositedOn = moment(product.deposited_on)
		const years = moment().diff(depositedOn, 'years')
		if(years > 0){
			timeDescription = timeDescription.concat(`${years} years ago, `)
		}
		const months = moment().diff(depositedOn, 'months') - (12 * years)
		if(months > 0){
			timeDescription = timeDescription.concat(`${months} months ago`)
		}
		return timeDescription
	})
	return timeDeposited
}

const result4 = getTimeDeposited()
console.log(result4)