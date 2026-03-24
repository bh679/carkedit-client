// CarkedIt Online — Hand Component
'use strict';

const CARD_WIDTH = 135;
const CARD_OFFSET = 43;

/**
 * @param {Array<{ id: string, title: string }>} cards
 * @returns {string} HTML string
 */
export function render(cards = []) {
  if (!cards.length) {
    return '<div class="hand hand--empty"></div>';
  }

  const fanWidth = (cards.length - 1) * CARD_OFFSET + CARD_WIDTH;

  const cardEls = cards.map((c, index) => `
    <div class="hand__card" style="left: ${index * CARD_OFFSET}px" data-card-id="${c.id}">
      <span class="hand__card-title">${c.title}</span>
    </div>
  `).join('');

  return `
    <div class="hand">
      <div class="hand__fan" style="min-width: ${fanWidth}px">
        ${cardEls}
      </div>
    </div>
  `;
}
