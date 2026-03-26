//Hamburgermenu Script

//Aktiverer menuen, når der trykkes på hamburgeren
document.querySelector("#menuBtn").addEventListener("click", function () {
  document.querySelector(".offcanvas").classList.add("open");
});
//Lukker menuen, når der trykkes på x´et
document.querySelector("#closeBtn").addEventListener("click", function () {
  document.querySelector(".offcanvas").classList.remove("open");
});

//Aktiverer overlay, når der trykkes på hamburgeren
document.querySelector("#menuBtn").addEventListener("click", function () {
  document.querySelector(".overlay").classList.add("show");
});

//Deaktiverer overlay, når der trykkes på x´et
document.querySelector("#closeBtn").addEventListener("click", function () {
  document.querySelector(".overlay").classList.remove("show");
});

//ALT SCRIPT DER OMHANDLER SHOP

const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

//"Printer"/render produkter til min side
function renderProducts() {
  //For hvert produkt
  products.forEach((product) => {
    //Udfyldes html i .products/productsEl med den indsatte div
    productsEl.innerHTML += `
      <div class="item">
        <div class="item-container">
          <div class="item-img">
          // $ henter informationer fra min products.js side,
          // og "printer" specifike data der spørges efter
            <img src="${product.imgSrc}" alt="${product.name}" />
          </div>
          <div class="desc">
            <h2>${product.name}</h2>
            <h2>
              <small>$</small>${product.price}
            </h2>
            <p>${product.description}</p>
          </div>
          <div class="add-to-cart" onclick= "addToCart(${product.id})">
            <img src="./icons/bag-plus.png" alt="add to cart" />
          </div>
        </div>
      </div>`;
  });
}
//Kalder funktionen, der "printer" produkter i .products
renderProducts();

// SHOPPING CART
//Laver et nyt array, der er tomt
let cart = [];

//Funktion der tilføjer produkter til cart
//Specifikt id = korrekt produkt
function addToCart(id) {
  //tjekker om der i forvejen er et produkt med dette i det i kurven
  if (cart.some((item) => item.id === id)) {
    //Hæver antalet med 1, hvis dette sker
    changeNumberOfUnits("plus", id);
  } else {
    //Hvis produkt ikke er der i forvejen,
    const item = products.find((product) => product.id === id);
    //Pusher den produktet til kurven
    cart.push({
      ...item,
      //og fastlægger antallet af enheder til 1
      numberOfUnits: 1,
    });
  }
  //Kalder en funktion, så det bliver synligt for bruger
  updateCart();
}
//Funktion der opdaterer kurven, ved at kalde 2 andre funktioner
function updateCart() {
  //Opdaterer produkterne i kurven
  renderCartItems();
  //Opdaterer den samlede pris
  renderSubtotal();
}

//Funktion der beregner total pris
function renderSubtotal() {
  //Nulstiller kurven fra start
  let totalPrice = 0,
    totalItems = 0;
  //For hvert produkt (item)
  cart.forEach((item) => {
    //Pris: ganger den prisen med antalet af enheder
    totalPrice += item.price * item.numberOfUnits;
    // Antal enheder tæles
    totalItems += item.numberOfUnits;
  });
  //Indsætter i .subtotal antal enheder + samlet pris
  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice}`;
  //Indsætter antallet af produkter i .total-items-in.cart
  totalItemsInCartEl.innerHTML = totalItems;
}

//Funktion der putter produkter i kurven
function renderCartItems() {
  //Starter med en nulstillet kurv
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    //Indsætter i .cart-item tag, ved at kalde på specifikke data
    cartItemsEl.innerHTML += `
      <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
              <img src="${item.imgSrc}" alt="${item.name}" />
              <h4>${item.name}</h4>
            </div>
            <div class="unit-price"><small>$</small>${item.price}</div>
            <div class="units">
              <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
              <div class="number">${item.numberOfUnits}</div>
              <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
            </div>
          </div>
    `;
  });
}

//funktion der fjerner produkt fra kurv
function removeItemFromCart(id) {
  //Filtrerer alle items i cart, og identificerer de items der
  //ikke har det id der skal fjernes.
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

//Funktion der gør det muligt at ændre antallet af produkter i kurv
//Action = handlinger, altså klik på + eller -
// id = Det specifikke produkt der trykkes på
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    //Finder id på det produkt der klikkes ved
    if (item.id === id) {
      //Hvis der trykkes "minus" og der er mere end 1, bliver der trukket 1 fra
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
        //Hvis der trykkes "plus" bliver der lagt 1 til
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }
    //Den returnere det nye antal enheder
    return {
      ...item,
      numberOfUnits,
    };
  });
  //Opdaterer kurven, så forandringen gennemføres
  updateCart();
}

// ─────────────── Faktura: Tilføj dato og tid ───────────────
document.addEventListener("DOMContentLoaded", function () {
  // Tjekker at der findes en checkout knap
  const checkoutBtn = document.querySelector(".checkout");
  if (!checkoutBtn) return;
  // Tjekker at der er indtastet en adresse i input feltet
  checkoutBtn.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    //Giver en alert, hvis der ikke er en adresse
    if (!email) {
      alert("Indtast din email!");
      return;
    }

    // Henter dato og klokkeslæt
    const now = new Date();
    const dateTime = now.toLocaleString(); // fx "26/3/2026, 14:55:32"

    // Sætter dato og klokkeslæt ind i faktura
    let message = `Din ordre - Tidspunkt: ${dateTime}\n\n`;
    let total = 0;
    //Tjekker kurven for produkter, antal og subtotal.
    cart.forEach((item) => {
      const itemTotal = item.price * item.numberOfUnits;
      total += itemTotal;
      //Indsætter produkter og pris i mailen
      message += `${item.name} x ${item.numberOfUnits} = $${itemTotal}\n`;
    });
    //Indsætter subtotal i bunden af mailen
    message += `\nSubtotal: $${total}`;

    // Funktion fra Emailjs med mine unikke id´er
    emailjs
      .send("service_0kovp2n", "template_0oxxy5e", {
        email: email, // SKAL matche {{email}} i template
        message: message, // SKAL matche {{message}} i template
      })
      .then(
        function (response) {
          alert("Email sendt! 🎉");
        },
        function (error) {
          alert("Fejl: " + error.text);
        },
      );
  });
});
