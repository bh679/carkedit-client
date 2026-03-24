// CarkedIt Online — Screen Router
'use strict';

import { getState, setState } from './state.js';
import { render as renderMenu } from './screens/menu.js';
import { render as renderLobby } from './screens/lobby.js';
import { render as renderPhase1 } from './screens/phase1.js';
import { render as renderPhase23 } from './screens/phase2-3.js';
import { render as renderPhase4 } from './screens/phase4.js';

const SCREENS = {
  menu:   (state) => renderMenu(state),
  lobby:  (state) => renderLobby(state),
  phase1: (state) => renderPhase1(state),
  phase2: (state) => renderPhase23('live', state),
  phase3: (state) => renderPhase23('bye', state),
  phase4: (state) => renderPhase4(state),
};

export function showScreen(name, updates = {}) {
  setState({ screen: name, ...updates });
  const state = getState();
  const app = document.getElementById('app');
  const renderFn = SCREENS[name];
  if (!renderFn) throw new Error(`Unknown screen: ${name}`);
  app.innerHTML = renderFn(state);
}

function addPlayer() {
  const input = document.getElementById('player-name-input');
  const name = input?.value?.trim();
  if (!name) return;
  const state = getState();
  if (state.players.some((p) => p.name === name)) return;
  setState({ players: [...state.players, { name }] });
  showScreen('lobby');
}

function drawCard(deck) {
  setState({ currentCard: { title: `${deck} card`, description: '', prompt: '', image: '' } });
  const state = getState();
  showScreen(state.screen);
}

function selectCard(cardId) {
  const app = document.getElementById('app');
  const cards = app.querySelectorAll('.hand__card');
  cards.forEach((el) => {
    el.classList.toggle('hand__card--selected', el.dataset.cardId === cardId);
  });
}

function revealWinner() {
  const state = getState();
  const winner = state.players[Math.floor(Math.random() * state.players.length)]?.name ?? '';
  setState({ winner });
  showScreen('phase4');
}

// Expose game API for inline onclick handlers
window.game = { showScreen, addPlayer, drawCard, selectCard, revealWinner };

// Demo data for development — jump straight to Phase 2
const DEMO_PLAYERS = [
  { name: 'You', score: 0 },
  { name: 'Alice', score: 0 },
  { name: 'Bob', score: 0 },
  { name: 'Charlie', score: 0 },
];

const DEMO_HAND = [
  { id: '1', text: 'Being a motherfucking sorcerer' },
  { id: '2', text: 'Being a motherfucking sorcerer' },
  { id: '3', text: 'Being a motherfucking sorcerer' },
  { id: '4', text: 'Being a motherfucking sorcerer' },
  { id: '5', text: 'Tell everyone you hate to fuck off' },
];

document.addEventListener('DOMContentLoaded', () => {
  // Seed demo state and show Phase 2 for development
  setState({
    players: DEMO_PLAYERS,
    currentPlayerIndex: 3,
    hand: DEMO_HAND,
    funeralDirector: 'You',
  });
  showScreen('phase2');
});
