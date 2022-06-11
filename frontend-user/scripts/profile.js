const firstName = document.querySelector('[first_name]')
const lastName = document.querySelector('[last_name]')
const email = document.querySelector('[email]')
const phone = document.querySelector('[phone]')
const city = document.querySelector('[city]')

const inpName = document.querySelector('#name')
const inpLast = document.querySelector('#last')
const inpEmail = document.querySelector('#email')
const inpPhone = document.querySelector('#phone')
const inpCity = document.querySelector('#city')

const sad = async () => {
    await loggedInUser()
    await getCities()
    await getFavourites()
    firstName.innerHTML = `${ user.first_name }`
    lastName.innerHTML = `${ user.last_name }`
    email.innerHTML = `${ user.email }`
    phone.innerHTML = `${ user.phone }`
    city.innerHTML = `${ user.city.city_name }`
}
sad()

