/**
 * In-App Notification Service
 * Floating notification popup positioned directly above the bottom navbar.
 * Provides clear, non-intrusive feedback for exports, imports, and system updates.
 */

export interface NotificationOptions {
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

let activeNotificationTimer: any = null;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function showInAppNotification(options: NotificationOptions): void {
  const {
    title,
    message,
    type = 'success',
    duration = 3200,
  } = options;

  let container = document.getElementById('inAppNotification') as HTMLDivElement | null;
  if (!container) {
    container = document.createElement('div');
    container.id = 'inAppNotification';
    container.className = 'in-app-notification-container';
    document.body.appendChild(container);
  }

  // Clear existing timer if one was showing
  if (activeNotificationTimer) {
    clearTimeout(activeNotificationTimer);
    activeNotificationTimer = null;
  }

  const iconMap: Record<string, string> = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✕',
  };
  const icon = iconMap[type] || '✓';

  container.innerHTML = `
    <div class="in-app-toast toast-${type}">
      <div class="toast-icon-wrap">${icon}</div>
      <div class="toast-text-wrap">
        <div class="toast-title">${escapeHtml(title)}</div>
        ${message ? `<div class="toast-message">${escapeHtml(message)}</div>` : ''}
      </div>
      <button type="button" class="toast-close-btn" aria-label="Dismiss">&times;</button>
    </div>
  `;

  // Force reflow and show
  container.classList.add('visible');

  const closeBtn = container.querySelector('.toast-close-btn');
  closeBtn?.addEventListener('click', () => {
    hideInAppNotification();
  });

  activeNotificationTimer = setTimeout(() => {
    hideInAppNotification();
  }, duration);
}

export function hideInAppNotification(): void {
  const container = document.getElementById('inAppNotification');
  if (container) {
    container.classList.remove('visible');
  }
  if (activeNotificationTimer) {
    clearTimeout(activeNotificationTimer);
    activeNotificationTimer = null;
  }
}
