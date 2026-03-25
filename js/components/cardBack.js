// CarkedIt Online — Card Back Component
'use strict';

const DECK_WORDS = ['LIVE', 'DIE', 'BYE!'];

const HIGHLIGHT_MAP = {
  die:  'DIE',
  live: 'LIVE',
  bye:  'BYE!',
};

/**
 * @param {{ deckType: string }} options
 * @returns {string} HTML string
 */
export function render({ deckType = 'die' } = {}) {
  const highlighted = HIGHLIGHT_MAP[deckType] ?? 'DIE';

  const words = DECK_WORDS.map(word => {
    const isHighlighted = word === highlighted;
    const cssClass = isHighlighted ? 'card-back__word' : 'card-back__word card-back__word--faded';
    return `<span class="${cssClass}">${word}</span>`;
  }).join('\n      ');

  return `
    <div class="card-back card-back--${deckType}">
      ${words}
    </div>
  `;
}
