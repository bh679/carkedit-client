// CarkedIt Online — Gameboard Component
'use strict';

/**
 * @param {{ promptText: string, instruction: string }} options
 * @returns {string} HTML string
 */
export function render({ promptText = '', instruction = '' } = {}) {
  return `
    <div class="gameboard">
      <div class="gameboard__content">
        <div class="gameboard__prompt-card">
          <p class="gameboard__prompt-text">${promptText}</p>
          <p class="gameboard__prompt-label">PROMPT</p>
        </div>
        ${instruction ? `<p class="gameboard__instruction">${instruction}</p>` : ''}
      </div>
    </div>
  `;
}
