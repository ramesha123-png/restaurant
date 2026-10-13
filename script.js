// 1. Highlight the link of the page you are on
const currentPage = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// 2. Give the navbar a dark background once you scroll down
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// ---------- 3. Menu page ----------
const menuGrid = document.getElementById("menuGrid");
const filtersEl = document.getElementById("filters");

if (menuGrid) {
  const currency = "Rs";   // change to your currency symbol

  // Edit this list to change your menu
  const dishes = [
    { name: "Espresso", category: "Coffee", price: 300, desc: "Rich, bold single shot." },
    { name: "Caramel Latte", category: "Coffee", price: 500, desc: "Smooth espresso, steamed milk, caramel." },
    { name: "Cappuccino", category: "Coffee", price: 450, desc: "Espresso topped with thick milk foam." },
    { name: "Iced Mocha", category: "Cold Drinks", price: 550, desc: "Chocolate, espresso, milk and ice." },
    { name: "Strawberry Frappe", category: "Cold Drinks", price: 600, desc: "Fresh strawberries blended with ice." },
    { name: "Butter Croissant", category: "Bakery", price: 350, desc: "Flaky and baked fresh each morning." },
    { name: "Chocolate Muffin", category: "Bakery", price: 300, desc: "Soft inside, dark chocolate chips." },
    { name: "Cheesecake Slice", category: "Desserts", price: 600, desc: "Creamy cheesecake, berry sauce." },
    { name: "Chocolate Brownie", category: "Desserts", price: 450, desc: "Warm, fudgy, with a scoop of ice cream." }
  ];

  const categories = ["All", "Coffee", "Cold Drinks", "Bakery", "Desserts"];

  // Show the dishes on the page
  function showMenu(category) {
    menuGrid.innerHTML = "";
    dishes
      .filter(d => category === "All" || d.category === category)
      .forEach(d => {
        menuGrid.innerHTML += `
          <div class="dish">
            <div class="dish-top">
              <h3>${d.name}</h3>
              <span class="price">${currency}${d.price}</span>
            </div>
            <p>${d.desc}</p>
          </div>`;
      });
  }

  // Create the filter buttons
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    if (cat === "All") btn.classList.add("active");

    btn.addEventListener("click", () => {
      document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showMenu(cat);
    });

    filtersEl.appendChild(btn);
  });

  showMenu("All");
}
// ---------- 4. Reservation form ----------
const form = document.getElementById("reserveForm");

if (form) {
  const msg = document.getElementById("formMsg");

  // Stop people choosing a date in the past
  document.getElementById("date").min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", e => {
    e.preventDefault();   // stops the page from reloading

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;

    // Check that nothing is empty
    if (!name || !phone || !date || !time) {
      msg.className = "error";
      msg.textContent = "Please fill in your name, phone, date and time.";
      return;
    }

    // Success message
    msg.className = "ok";
    msg.textContent = `Thank you, ${name}. We have your request for ${guests} guest(s) on ${date} at ${time}. We will call you to confirm.`;
    form.reset();
  });
}

// ---------- 5. Contact form ----------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const contactMsg = document.getElementById("contactMsg");

  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const message = document.getElementById("cMessage").value.trim();

    if (!name || !email || !message) {
      contactMsg.className = "error";
      contactMsg.textContent = "Please fill in your name, email and message.";
      return;
    }

    if (!email.includes("@")) {
      contactMsg.className = "error";
      contactMsg.textContent = "Please enter a valid email address.";
      return;
    }

    contactMsg.className = "ok";
    contactMsg.textContent = `Thank you, ${name}. Your message has been received.`;
    contactForm.reset();
  });
}