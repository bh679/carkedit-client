// CarkedIt Online — Gameboard Component
'use strict';

/**
 * @param {string} promptCard - HTML for the prompt card
 * @param {string} hint - hint text shown below the card
 * @returns {string} HTML string
 */
export function render(promptCard = '', hint = '') {
  return `
    <div class="gameboard">
      <div class="gameboard__card-area">
        ${promptCard}
      </div>
      ${hint ? `<p class="gameboard__hint">${hint}</p>` : ''}
    </div>
  `;
}
