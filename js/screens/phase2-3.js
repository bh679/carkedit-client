// CarkedIt Online — Phase 2/3 Screen (Live / Bye Decks — shared layout)
'use strict';

import { render as renderPhaseHeader } from '../components/phase-header.js';
import { render as renderPlayerList } from '../components/player-list.js';
import { render as renderGameboard } from '../components/gameboard.js';
import { render as renderHand } from '../components/hand.js';

const PHASE_CONFIG = {
  live: { number: '2', label: 'Phase 2 - LIVE', deckType: 'live' },
  bye:  { number: '3', label: 'Phase 3 - BYE',  deckType: 'bye' },
};

/**
 * @param {'live'|'bye'} phase
 * @param {object} state
 * @returns {string} HTML string
 */
export function render(phase, state) {
  const config = PHASE_CONFIG[phase];

  const players = state.players.map((p) => ({
    name: p.name,
    score: p.score ?? 0,
  }));

  const promptText = state.currentCard?.text
    ?? 'Next from J.K. Rowling: Harry Potter and the Chamber of _____.';

  return `
    <div class="screen screen--phase" data-phase="${config.number}">
      ${renderPhaseHeader({ phase: config.number, label: config.label })}
      ${renderPlayerList(players, { activePlayerId: state.currentPlayerIndex })}
      ${renderGameboard({ promptText, instruction: 'Select your best card to play' })}
      ${renderHand(state.hand ?? [])}
    </div>
  `;
}
