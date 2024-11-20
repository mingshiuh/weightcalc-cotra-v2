document.addEventListener("DOMContentLoaded", () => {
  const items = [
    { description: "MG Air 3x200ML", maxCartons: 168, weightPerCarton: 7 },
    { description: "MG Air 250ML", maxCartons: 168, weightPerCarton: 7 },
    { description: "MG Air 1 LIT", maxCartons: 60, weightPerCarton: 13.4 },
    { description: "MG Susu 390GM", maxCartons: 48, weightPerCarton: 22 },
    { description: "MG Susu 500GM", maxCartons: 48, weightPerCarton: 27 },
    { description: "MG Susu 24x390GM", maxCartons: 80, weightPerCarton: 11 },
    { description: "MG Susu 24x500GM", maxCartons: 80, weightPerCarton: 13.5 },
    { description: "MG Susu 12x1KG", maxCartons: 96, weightPerCarton: 14 },
    { description: "MG Susu KTT 2.5KG(Pouch)", maxCartons: 50, weightPerCarton: 21.3 },
  ];

  const itemsContainer = document.getElementById("items-container");
  const totalPalletsEl = document.getElementById("total-pallets");
  const totalWeightEl = document.getElementById("total-weight");
  const resetButton = document.getElementById("reset-button");
  const currentDateEl = document.getElementById("current-date");
  const currentTimeEl = document.getElementById("current-time");

  // Display current date and time
  const updateDateTime = () => {
    const now = new Date();
    const days = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];
    currentDateEl.textContent = `${days[now.getDay()]}, ${now.toLocaleDateString("ms-MY")}`;
    currentTimeEl.textContent = now.toLocaleTimeString("en-US", { hour12: true });
  };
  setInterval(updateDateTime, 1000);
  updateDateTime();

  // Render items
  items.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    itemDiv.innerHTML = `
      <label for="item-${index}">${item.description}</label>
      <input
        type="text"
        id="item-${index}"
        placeholder="(sila masukkan jumlah karton di sini)"
        maxlength="60"
      />
    `;

    itemsContainer.appendChild(itemDiv);
  });

  // Update totals
  const updateTotals = () => {
    let totalPallets = 0;
    let totalWeight = 0;

    items.forEach((item, index) => {
      const input = document.getElementById(`item-${index}`);
      const value = input.value.replace(/[^0-9+]/g, "");
      const sum = value.split("+").reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

      totalPallets += sum / item.maxCartons;
      totalWeight += sum * item.weightPerCarton;
    });

    totalPalletsEl.textContent = `Jumlah Palet: ${totalPallets.toFixed(1)}`;
    totalWeightEl.textContent = `Berat: ${(totalWeight / 1000).toFixed(1)} tan`;
  };

  // Add event listeners to inputs
  items.forEach((_, index) => {
    const input = document.getElementById(`item-${index}`);
    input.addEventListener("input", updateTotals);
    input.addEventListener("blur", updateTotals);
  });

  // Reset button
  resetButton.addEventListener("click", () => {
    items.forEach((_, index) => {
      const input = document.getElementById(`item-${index}`);
      input.value = "";
    });
    updateTotals();
  });
});
