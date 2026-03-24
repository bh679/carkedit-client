// CarkedIt Online — Phase Header Component
'use strict';

/**
 * @param {{ phase: string, label: string }} options
 * @returns {string} HTML string
 */
export function render({ phase = '', label = '' } = {}) {
  return `
    <header class="phase-header" data-phase="${phase}">
      <div class="phase-header__brand">
        <span class="phase-header__title">CarkedIt</span>
        <span class="phase-header__subtitle">${label}</span>
      </div>
      <button class="phase-header__action" aria-label="Settings">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" fill="currentColor"/>
          <path d="M6.5 8a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" fill="currentColor"/>
          <path d="M6.5 4a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" fill="currentColor"/>
        </svg>
      </button>
    </header>
  `;
}
