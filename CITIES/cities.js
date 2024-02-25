const searchInput = document.querySelector("#cities")
searchInput.addEventListener("change",()=> console.log(searchInput.value))

const getTime = async () => {
try {
    const res = await fetch("http://worldtimeapi.org/api/timezone/EUROPE/Istanbul")
const data = await res.json()
const timeData = data
console.log(timeData);
return showTimeData(data)
} catch (error) {
    console.log("oops something went wrong");
}
}

document.addEventListener("DOMContentLoaded",async () => {
  await getTime()
})



const showTimeData = (data) => {
console.log(data);
const h2 = document.querySelector(".city-name")
h2.innerText = data.timezone
const cityTime = document.querySelector(".city-time")
cityTime.innerText = new Date(data.datetime).toLocaleTimeString()
}