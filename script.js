let cart = [];

function addItem() {
  const name = document.getElementById("itemName").value;
  const price = parseFloat(document.getElementById("itemPrice").value);
  const qty = parseInt(document.getElementById("itemQty").value);

  if (!name || !price || !qty) {
    alert("Please fill all item fields");
    return;
  }

  const total = price * qty;

  cart.push({ id: Date.now(), name, price, qty, total });

  renderCart();
  clearItemFields();
}

function renderCart() {
  const table = document.getElementById("cartTable");
  table.innerHTML = "";

  cart.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>${item.qty}</td>
        <td>₹${item.total}</td>
        <td><button onclick="removeItem(${item.id})">X</button></td>
      </tr>
    `;
  });
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function clearItemFields() {
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemQty").value = "";
}

function generateBill() {
  const customer = document.getElementById("customerName").value;
  const days = parseInt(document.getElementById("days").value);
  const roomPrice = parseInt(document.getElementById("roomType").value);
  const discount = parseFloat(document.getElementById("discount").value) || 0;

  if (!customer || !days) {
    alert("Please fill customer details");
    return;
  }

  const roomTotal = roomPrice * days;
  const foodTotal = cart.reduce((acc, item) => acc + item.total, 0);
  const subtotal = roomTotal + foodTotal;

  const discountAmount = subtotal * (discount / 100);
  const afterDiscount = subtotal - discountAmount;

  const gst = afterDiscount * 0.18;
  const finalAmount = afterDiscount + gst;

  const bill = {
    invoice: "INV" + Date.now(),
    customer,
    date: new Date().toLocaleString(),
    roomTotal,
    foodTotal,
    discount,
    gst,
    finalAmount
  };

  saveBill(bill);

  displayBill(bill);
}

function displayBill(bill) {
  document.getElementById("billOutput").innerHTML = `
    <h3>Invoice: ${bill.invoice}</h3>
    Date: ${bill.date}<br>
    Customer: ${bill.customer}<br><br>
    Room Total: ₹${bill.roomTotal}<br>
    Food Total: ₹${bill.foodTotal}<br>
    Discount: ${bill.discount}%<br>
    GST (18%): ₹${bill.gst.toFixed(2)}<br>
    <h3>Final Amount: ₹${bill.finalAmount.toFixed(2)}</h3>
  `;
}

function saveBill(bill) {
  let bills = JSON.parse(localStorage.getItem("hotelBills")) || [];
  bills.push(bill);
  localStorage.setItem("hotelBills", JSON.stringify(bills));
}

function showBills() {
  let bills = JSON.parse(localStorage.getItem("hotelBills")) || [];

  console.log("Previous Bills:", bills);
  alert("Check console to see saved bills");
}

function printBill() {
  window.print();
}
