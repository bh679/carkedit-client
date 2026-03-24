// CarkedIt Online — Phase 2/3 Screen (Live / Bye Decks — shared layout)
'use strict';

import { render as renderPhaseHeader } from '../components/phase-header.js';
import { render as renderPlayerList } from '../components/player-list.js';
import { render as renderGameboard } from '../components/gameboard.js';
import { render as renderHand } from '../components/hand.js';

const PHASE_CONFIG = {
  live: { number: '2', label: 'Phase 2 - LIVE', deckType: 'live', nextScreen: 'phase3' },
  bye:  { number: '3', label: 'Phase 3 - BYE',  deckType: 'bye',  nextScreen: 'phase4' },
};

/**
 * @param {'live'|'bye'} phase
 * @param {object} state
 * @returns {string} HTML string
 */
export function render(phase, state) {
  const config = PHASE_CONFIG[phase];
  const deckName = config.deckType.charAt(0).toUpperCase() + config.deckType.slice(1);

  const promptCardHtml = state.currentCard
    ? `
      <div class="prompt-card">
        <p class="prompt-card__text">${state.currentCard.title}</p>
        <span class="prompt-card__watermark">PROMPT</span>
      </div>
    `
    : `
      <div class="prompt-card prompt-card--empty">
        <button class="btn btn--primary" onclick="window.game.drawCard('${config.deckType}')">
          Draw ${deckName} Card
        </button>
      </div>
    `;

  return `
    <div class="screen screen--phase" data-phase="${config.number}">
      ${renderPhaseHeader({ phase: config.number, label: config.label })}
      ${renderPlayerList(state.players, { funeralDirector: state.funeralDirector })}
      ${renderGameboard(promptCardHtml, 'Select your best card to play')}
      ${renderHand(state.hand ?? [])}
    </div>
  `;
}
