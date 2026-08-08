/**
 * APPLE DESIGN SYSTEM — iPhone Configurator
 * Chip selection (radio-style within groups), color swatch selection,
 * price calculation, and sticky bar updates.
 */

(function () {
  'use strict';

  // ── State ──
  const state = {
    model: 'pro',
    modelPrice: 1199,
    color: 'natural',
    colorLabel: 'Natural Titanium',
    storage: '256',
    storageDelta: 0,
  };

  const colorNames = {
    natural: 'Natural Titanium',
    white: 'White Titanium',
    desert: 'Desert Titanium',
    black: 'Black Titanium',
  };

  // ── DOM Refs ──
  const summaryModel = document.getElementById('summary-model');
  const summaryConfig = document.getElementById('summary-config');
  const summaryPrice = document.getElementById('summary-price');
  const stickyPriceLabel = document.getElementById('sticky-price-label');
  const stickyPrice = document.getElementById('sticky-price');
  const colorLabel = document.getElementById('color-label');

  // ── Chip selection (radio-style) ──
  document.querySelectorAll('.config-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      const group = chip.dataset.group;

      // Deselect all chips in same group
      document.querySelectorAll('.config-chip[data-group="' + group + '"]').forEach(function (c) {
        c.classList.remove('config-chip--selected');
      });

      // Select this chip
      chip.classList.add('config-chip--selected');

      // Update state
      if (group === 'model') {
        state.model = chip.dataset.value;
        state.modelPrice = parseInt(chip.dataset.price, 10);
      }

      if (group === 'storage') {
        state.storage = chip.dataset.value;
        state.storageDelta = parseInt(chip.dataset.priceDelta, 10) || 0;
      }

      updateDisplay();
    });
  });

  // ── Swatch selection ──
  document.querySelectorAll('.config-swatch').forEach(function (swatch) {
    swatch.addEventListener('click', function () {
      // Deselect all swatches
      document.querySelectorAll('.config-swatch').forEach(function (s) {
        s.classList.remove('config-swatch--selected');
      });

      // Select this swatch
      swatch.classList.add('config-swatch--selected');

      state.color = swatch.dataset.value;
      state.colorLabel = colorNames[state.color] || state.color;

      updateDisplay();
    });
  });

  // ── Update display ──
  function updateDisplay() {
    const totalPrice = state.modelPrice + state.storageDelta;
    const formattedPrice = '$' + totalPrice.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const monthlyPrice = '$' + (totalPrice / 24).toFixed(2);

    const modelName = state.model === 'pro' ? 'iPhone 17 Pro' : 'iPhone 17 Pro Max';
    const storageLabel = state.storage.toUpperCase();

    if (summaryModel) summaryModel.textContent = modelName;
    if (summaryConfig) summaryConfig.textContent = storageLabel + ' — ' + state.colorLabel;
    if (summaryPrice) summaryPrice.textContent = formattedPrice;
    if (stickyPriceLabel) stickyPriceLabel.textContent = modelName;
    if (stickyPrice) stickyPrice.textContent = formattedPrice;
    if (colorLabel) colorLabel.textContent = 'Color — ' + state.colorLabel;
  }

  // Initial display
  updateDisplay();
})();
