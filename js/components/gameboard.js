// CarkedIt Online — Gameboard Component
'use strict';

/**
 * Seed-based pseudo-random for consistent card positions per player name.
 */
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

/**
 * @param {string} promptCard - HTML for the prompt card
 * @param {string} hint - hint text shown below the card
 * @param {object} options
 * @param {object} options.playedCards - { [playerName]: card } submitted cards
 * @param {boolean} options.revealed - Whether cards are face-up
 * @param {string} options.deckType - 'live' or 'bye' for card back color
 * @param {string|null} options.pitchingPlayer - Player currently pitching (show their card big)
 * @returns {string} HTML string
 */
export function render(promptCard = '', hint = '', {
  playedCards = {},
  revealed = false,
  deckType = 'live',
  pitchingPlayer = null,
} = {}) {
  const playerNames = Object.keys(playedCards);
  const hasPlayedCards = playerNames.length > 0;

  let playedCardsHtml = '';
  if (hasPlayedCards) {
    const cardEls = playerNames.map((name, index) => {
      const card = playedCards[name];
      const rng = seededRandom(name + index);
      const rotation = (rng() - 0.5) * 90; // -45 to 45 degrees
      const offsetX = rng() * 60 - 30;
      const offsetY = rng() * 60 - 30;
      const isPitching = name === pitchingPlayer;

      if (isPitching) {
        // Show pitching player's card full-size in center
        return '';
      }

      if (revealed) {
        return `
          <div class="gameboard__played-card gameboard__played-card--revealed"
               style="transform: rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)"
               data-player="${name}">
            <span class="gameboard__played-card-title">${card.title}</span>
            <span class="gameboard__played-card-player">${name}</span>
          </div>
        `;
      }

      return `
        <div class="gameboard__played-card gameboard__played-card--facedown gameboard__played-card--${deckType}"
             style="transform: rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)"
             data-player="${name}">
          <span class="gameboard__played-card-label">${name}</span>
        </div>
      `;
    }).join('');

    playedCardsHtml = `<div class="gameboard__played-cards">${cardEls}</div>`;
  }

  // During pitching, show the pitching player's card in the main card area
  let mainCardHtml = promptCard;
  if (pitchingPlayer && playedCards[pitchingPlayer]) {
    const card = playedCards[pitchingPlayer];
    mainCardHtml = `
      <div class="gameboard__pitch-card">
        <span class="gameboard__pitch-card-title">${card.title}</span>
        ${card.description ? `<p class="gameboard__pitch-card-desc">${card.description}</p>` : ''}
        <span class="gameboard__pitch-card-player">${pitchingPlayer}'s card</span>
      </div>
    `;
  }

  return `
    <div class="gameboard">
      <div class="gameboard__card-area">
        ${mainCardHtml}
        ${playedCardsHtml}
      </div>
      ${hint ? `<p class="gameboard__hint">${hint}</p>` : ''}
    </div>
  `;
}
