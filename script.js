document.addEventListener("DOMContentLoaded", () => {
  const items = [
    { description: "MG Air 3x200ML/250ML", maxCartons: 168, weightPerCarton: 7 },
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
  const infoButton = document.getElementById("info-button");
  const modal = document.getElementById("info-modal");
  const modalClose = document.getElementById("close-modal");
  const tableBody = document.getElementById("info-table-body");

  // Update date and time
  const updateDateTime = () => {
    const now = new Date();
    const days = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];
    document.getElementById("current-date").textContent = `${days[now.getDay()]}, ${now.toLocaleDateString("ms-MY")}`;
    document.getElementById("current-time").textContent = now.toLocaleTimeString("en-US", { hour12: true });
  };
  setInterval(updateDateTime, 1000);
  updateDateTime();

  // Render items
  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <label for="item-${index}">${item.description}</label>
      <input type="text" id="item-${index}" placeholder="(isi jumlah karton: 48 atau 136+136 atau 50+80+168)" maxlength="60">
    `;
    itemsContainer.appendChild(div);
  });

  // Calculate totals
  const updateTotals = () => {
    let totalPallets = 0, totalWeight = 0;
    items.forEach((item, index) => {
      const value = document.getElementById(`item-${index}`).value.replace(/[^0-9+]/g, "");
      const sum = value.split("+").reduce((acc, val) => acc + (parseInt(val) || 0), 0);
      totalPallets += sum / item.maxCartons;
      totalWeight += sum * item.weightPerCarton;
    });
    totalPalletsEl.textContent = `Jumlah Palet: ${totalPallets.toFixed(1)}`;
    totalWeightEl.textContent = `Berat: ${(totalWeight / 1000).toFixed(1)} tan`;
  };

  // Event listeners
  items.forEach((_, index) => {
    document.getElementById(`item-${index}`).addEventListener("input", updateTotals);
  });
  resetButton.addEventListener("click", () => {
    items.forEach((_, index) => (document.getElementById(`item-${index}`).value = ""));
    updateTotals();
  });

  // Info button
  infoButton.addEventListener("click", () => {
    tableBody.innerHTML = items
      .map(item => `<tr><td>${item.description}</td><td>${item.maxCartons}</td><td>${item.weightPerCarton}</td></tr>`)
      .join("");
    modal.style.display = "flex";
  });
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
