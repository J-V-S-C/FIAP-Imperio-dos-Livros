const cartForm = document.getElementById("cartForm")
const product = document.getElementById("product")

function cartSubmit(event) {
  event.preventDefault()

  localStorage.setItem('boughtProducts', JSON.stringify(product.value));
  console.log(localStorage.getItem("boughtProducts"));


}

cartForm.addEventListener("submit", cartSubmit)


console.log("HELLO")
