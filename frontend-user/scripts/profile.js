const firstName = document.querySelector('[first_name]')
const lastName = document.querySelector('[last_name]')
const email = document.querySelector('[email]')
const phone = document.querySelector('[phone]')
const city = document.querySelector('[city]')
const userImg = document.querySelector('#userImgDsiplay')
const spanList = document.querySelectorAll('span')

const inpName = document.querySelector('#name')
const inpLast = document.querySelector('#last')
const inpEmail = document.querySelector('#email')
const inpPhone = document.querySelector('#phone')
const inpCity = document.querySelector('#city')
const inpList = [inpName, inpLast, inpEmail, inpPhone, inpCity]

const editBtn = document.querySelector('[one]')
const saveBtn = document.querySelector('[two]')

const sad = async () => {
    await loggedInUser()
    firstName.innerHTML = `${ user.first_name }`
    lastName.innerHTML = `${ user.last_name }`
    email.innerHTML = `${ user.email }`
    phone.innerHTML = `${ user.phone }`
    city.innerHTML = `${ user.city.city_name }`
    userImg.src = user.profile_pic ? user.profile_pic : "../assets/blank-profile.webp"
    await getCities()
    await getFavourites()
}
const addCities = async () => {
    await sad()
    for (let i of cities)
        inpCity.insertAdjacentHTML('beforeend', `<option value="${ i.city_name }">${ i.city_name }</option>`)
}
addCities()

const edit = () => {
    editBtn.addEventListener('click', () => {
        saveBtn.classList.toggle('d-none')
        editBtn.classList.toggle('d-none')
        for (let i of inpList)
            i.classList.toggle('d-none')
        inpName.value = `${ user.first_name }`
        inpLast.value = `${ user.last_name }`
        inpEmail.value = `${ user.email }`
        inpPhone.value = `${ user.phone }`
        inpCity.value = `${ user.city.city_name }`
        for (let i of spanList)
            i.classList.toggle('d-none')
    })
    saveBtn.addEventListener('click', async () => {
        console.log(inpCity.value)
        await axios.patch('http://127.0.0.1:8000/api/v1/user/users/update', {
            first_name: inpName.value,
            last_name: inpLast.value,
            email: inpEmail.value,
            phone: inpPhone.value,
            city: inpCity.value,
        }, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        saveBtn.classList.toggle('d-none')
        editBtn.classList.toggle('d-none')
        for (let i of inpList)
            i.classList.toggle('d-none')
        inpName.value = `${ user.first_name }`
        inpLast.value = `${ user.last_name }`
        inpEmail.value = `${ user.email }`
        inpPhone.value = `${ user.phone }`
        inpCity.value = `${ user.city.city_name }`
        for (let i of spanList)
            i.classList.toggle('d-none')
        sad()
    })
}
edit()