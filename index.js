const [galleryDisplayEl] = document.getElementsByClassName("gallery-display");
const [galleryThumbnailsEl] = document.getElementsByClassName(
  "gallery-img-thumbnails-container"
);
const [orderOptionListEl] =
  document.getElementsByClassName("order-option-list");

const selectedProductNameEl = document.getElementById("selected-product-name");
const selectedProductPriceEl = document.getElementById(
  "selected-product-price"
);
const selectedHasWarrantyEl = document.getElementById("has_warranty");
const selectedShippingPriceEl = document.getElementById("shipping-price");
const totalAmountEl = document.getElementById("ordered-total-price");
const ccOption = document.getElementById("cc-btn");
const paypalOption = document.getElementById("paypal-btn");
const sameAddressOption = document.getElementById("same-address");
const diffAddressOption = document.getElementById("different-address");
const otherAddressEl = document.getElementById("other-address");
const [submitCCBtn] = document.getElementsByClassName("submit-cc");
const [submitPaypalBtn] = document.getElementsByClassName("paypal-submit");
const step3El = document.getElementById("step-3");
const step4El = document.getElementById("step-4");
const step5El = document.getElementById("step-5");
const step6El = document.getElementById("step-6");
const stepErrorEls = document.getElementsByClassName("input-error");
const [submitErrorEl] = document.getElementsByClassName("submit-error");

const orderOptions = [
  {
    label: "50% OFF: 1 Sutera™ Pillow (Normally $100)",
    price: 49.97,
    shipping: 9.99,
    best: false,
  },
  {
    label: "53% OFF: 2 Sutera™ Pillows (Normally $200)",
    price: 46.97,
    shipping: 0,
    best: false,
  },
  {
    label: "55% OFF: 3 Sutera™ Pillows (Normally $300)",
    price: 44.97,
    shipping: 0,
    best: true,
  },
  {
    label: "57% OFF: 3 Sutera™ Pillows (Normally $400)",
    price: 42.97,
    shipping: 0,
    best: false,
  },
  {
    label: "60% OFF: 3 Sutera™ Pillows (Normally $500)",
    price: 39.97,
    shipping: 0,
    best: false,
  },
];

const galleryImgs = [
  "https://d3hlrrbqydii6y.cloudfront.net/img/b8389f397102c63af7d868c2356f5ca1.jpeg",
  "https://d3hlrrbqydii6y.cloudfront.net/img/0b44e16c0b8ef031c3caebc8192b1021.jpeg",
  "https://d3hlrrbqydii6y.cloudfront.net/img/099c11c56e0caeefe74478538af79063.jpeg",
  "https://d3hlrrbqydii6y.cloudfront.net/img/dc1f0f96644384b0ddeac69195499ca1.jpeg",
];

let currentInd = 0;
let selectedOrder = orderOptions[0];

const createThumbnail = (src) => {
  const pictureEl = document.createElement("picture");
  const imageEl = document.createElement("img");
  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("class", "gallery-img-thumbnail");
  buttonEl.setAttribute("type", "button");
  imageEl.setAttribute("src", src);
  pictureEl.appendChild(imageEl);
  buttonEl.appendChild(pictureEl);
  buttonEl.onclick = () => (galleryDisplayEl.src = src);
  return buttonEl;
};

const createOrderOptions = (options) =>
  options.map((e, i) => {
    let newDiv = document.createElement("div");
    let htmlString = `<div class="${
      e.best ? "order-option best-option" : "order-option"
    }">
    <div>
    <input id="radio-${i}" class="radio-custom" name="order-options" type="radio" ${
      i === 0 ? "checked" : ""
    }/>
    <label for="radio-${i}" class="radio-custom-label option-label">
      ${e.label}
    </label>
  </div>
  <div class="option-description">
    <div>$${e.price} Each Including</div>
    <div>${e.shipping ? "$" + e.shipping : "FREE"} Shipping</div>
  </div>
</div>`;
    newDiv.innerHTML = htmlString;
    newDiv.onclick = () => {
      selectedOrder = orderOptions[i];
      updateOrderSummary(selectedOrder);
    };
    orderOptionListEl.appendChild(newDiv);
  });

const generateThumbnails = (parent, imgs) =>
  imgs.forEach((e) => parent.appendChild(createThumbnail(e)));

const swiper = (direction) => {
  const limit = galleryImgs.length - 1;
  switch (direction) {
    case "left":
      currentInd = currentInd - 1 < 0 ? limit : currentInd - 1;
      break;
    case "right":
      currentInd = currentInd + 1 > limit ? 0 : currentInd + 1;
      break;
  }

  galleryDisplayEl.src = galleryImgs[currentInd];
};

const updateOrderSummary = (updateObj) => {
  const { label, price, shipping } = updateObj;
  selectedProductNameEl.textContent = label;
  selectedProductPriceEl.textContent = "$" + price;
  selectedShippingPriceEl.textContent = shipping ? "$" + shipping : "FREE";
  totalAmountEl.textContent = "$" + (price + shipping + 19).toFixed(2);
};

const toggleSteps = () => {
  step3El.hidden = !paypalOption.checked && !ccOption.checked;
  step4El.hidden = !paypalOption.checked && !ccOption.checked;
  step5El.hidden = !paypalOption.checked && !ccOption.checked;
  step6El.hidden = !paypalOption.checked && !ccOption.checked;
  submitCCBtn.style.display = ccOption.checked ? "" : "none";
  submitPaypalBtn.style.display = paypalOption.checked ? "" : "none";
};

const toggleDifferentAddress = () => {
  otherAddressEl.hidden = !diffAddressOption.checked;
};

const toggleErrors = () => {
  [...stepErrorEls].forEach((e) => (e.hidden = true));
  submitErrorEl.hidden = true;
};

paypalOption.onclick = toggleSteps;
ccOption.onclick = toggleSteps;
sameAddressOption.onclick = toggleDifferentAddress;
diffAddressOption.onclick = toggleDifferentAddress;

galleryDisplayEl.src = galleryImgs[0];
generateThumbnails(galleryThumbnailsEl, galleryImgs);
createOrderOptions(orderOptions);
toggleSteps();
toggleDifferentAddress();
toggleErrors();
