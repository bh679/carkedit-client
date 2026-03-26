// CarkedIt Online — Gameboard Component
'use strict';

import { render as renderCard } from './card.js';

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
    const cardEls = playerNames.map((name) => {
      const card = playedCards[name];
      const isPitching = name === pitchingPlayer;

      if (isPitching) {
        return '';
      }

      if (revealed) {
        return `
          <div class="gameboard__played-card gameboard__played-card--revealed"
               data-player="${name}">
            ${renderCard({ ...card, deckType: card.deckType || deckType })}
            <span class="gameboard__played-card-player">${name}</span>
          </div>
        `;
      }

      return `
        <div class="gameboard__played-card gameboard__played-card--facedown gameboard__played-card--${deckType}"
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
        ${renderCard({ ...card, deckType: card.deckType || deckType })}
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
