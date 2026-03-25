import { updateGlobalDisplay, state } from "./state.js";
import "./ui-toggle.js"; // Just importing it runs the event listeners
import "./expense.js";
import "./income.js";

/**
 * UTILITY: Standard Currency Formatter
 * Use this instead of repeating .toFixed(2) everywhere.
 */
export const formatCurrency = (num) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num);
};

/**
 * GLOBAL ACTIONS
 * Handles the Download, Upload, and Calculator buttons
 */
document.querySelectorAll(".action-buttons").forEach((group) => {
  group.addEventListener("click", (e) => {
    const btn = e.target.closest(".icon-btn");
    if (!btn) return;

    const icon = btn.querySelector("i");

    if (icon.classList.contains("fa-download")) {
      console.log("Downloading data as JSON...");
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(state));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "expenses.json");
      downloadAnchorNode.click();
    }

    if (icon.classList.contains("fa-calculator")) {
      alert(
        "Calculator feature coming soon! For now, use the 'Income' tab to see your balance.",
      );
    }

    if (icon.classList.contains("fa-upload")) {
      alert("Upload feature triggered. (Logic can be added here!)");
    }
  });
});

// INITIALIZE APP
document.addEventListener("DOMContentLoaded", () => {
  console.log("Expense Tracker Initialized 🚀");
  updateGlobalDisplay();
});
