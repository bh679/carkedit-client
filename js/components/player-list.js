// CarkedIt Online — Player List Component
'use strict';

const PERSON_ICON = `<svg class="player-list__icon" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="5" cy="3.3" r="1.7" fill="#6B7280"/>
  <path d="M2 8.5a3 3 0 0 1 6 0" stroke="#6B7280" stroke-width="1.2" fill="none"/>
</svg>`;

const CROWN_ICON = `<svg class="player-list__icon" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 7.5L2.5 3L5 5L7.5 3L9 7.5H1Z" fill="#D97706" stroke="#D97706" stroke-width="0.5"/>
  <rect x="1" y="7.5" width="8" height="1.5" rx="0.5" fill="#D97706"/>
</svg>`;

/**
 * @param {Array<{ name: string, score: number }>} players
 * @param {{ activePlayerId: number|null }} options
 * @returns {string} HTML string
 */
export function render(players = [], { activePlayerId = null } = {}) {
  if (!players.length) {
    return '<div class="player-list player-list--empty"><p>No players yet</p></div>';
  }

  const chips = players.map((p, i) => {
    const isActive = i === activePlayerId;
    const icon = isActive ? CROWN_ICON : PERSON_ICON;
    const activeClass = isActive ? ' player-list__chip--active' : '';
    const score = p.score ?? 0;

    return `
      <li class="player-list__chip${activeClass}">
        ${icon}
        <span class="player-list__name">${p.name}</span>
        <span class="player-list__score">${score}</span>
      </li>
    `;
  }).join('');

  return `
    <div class="player-list">
      <p class="player-list__heading">Players</p>
      <ul class="player-list__chips">${chips}</ul>
    </div>
  `;
}
