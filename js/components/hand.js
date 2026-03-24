// CarkedIt Online — Hand Component
'use strict';

/**
 * @param {Array<{ id: string, text: string }>} cards
 * @returns {string} HTML string
 */
export function render(cards = []) {
  if (!cards.length) {
    return '<div class="hand hand--empty"></div>';
  }

  const cardEls = cards.map((c) => `
    <div class="hand__card" data-card-id="${c.id}" onclick="window.game.selectCard('${c.id}')">
      <p class="hand__card-text">${c.text}</p>
    </div>
  `).join('');

  return `
    <div class="hand">
      <div class="hand__cards">${cardEls}</div>
    </div>
  `;
}
