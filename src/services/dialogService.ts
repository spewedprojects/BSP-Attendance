/**
 * Web Dialog Service
 * Pure HTML/CSS modal dialogs to replace window.alert, window.confirm, and window.prompt.
 * Completely avoids Android OS native dialog boxes for consistent app-wide UI.
 */

export interface AlertOptions {
  title?: string;
  message: string;
  okText?: string;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

export interface PromptOptions {
  title?: string;
  message?: string;
  initialValue?: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function webAlert(options: AlertOptions): Promise<void> {
  return new Promise((resolve) => {
    const { title = 'Notice', message, okText = 'OK' } = options;

    const overlay = document.createElement('div');
    overlay.className = 'web-dialog-overlay';

    overlay.innerHTML = `
      <div class="web-dialog-card" role="dialog" aria-modal="true">
        <div class="web-dialog-header">
          <div class="web-dialog-title">${escapeHtml(title)}</div>
        </div>
        <div class="web-dialog-body">
          <p class="web-dialog-message">${escapeHtml(message)}</p>
        </div>
        <div class="web-dialog-actions">
          <button type="button" class="btn web-dialog-btn web-dialog-btn-primary" id="webDialogOkBtn">${escapeHtml(okText)}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const cleanup = () => {
      document.removeEventListener('keydown', onKeyDown);
      overlay.remove();
      resolve();
    };

    const okBtn = overlay.querySelector('#webDialogOkBtn') as HTMLButtonElement | null;
    okBtn?.focus();

    okBtn?.addEventListener('click', cleanup);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        cleanup();
      }
    };
    document.addEventListener('keydown', onKeyDown);
  });
}

export function webConfirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const {
      title = 'Confirm',
      message,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      danger = false,
    } = options;

    const overlay = document.createElement('div');
    overlay.className = 'web-dialog-overlay';

    overlay.innerHTML = `
      <div class="web-dialog-card" role="dialog" aria-modal="true">
        <div class="web-dialog-header">
          <div class="web-dialog-title">${escapeHtml(title)}</div>
        </div>
        <div class="web-dialog-body">
          <p class="web-dialog-message">${escapeHtml(message)}</p>
        </div>
        <div class="web-dialog-actions">
          <button type="button" class="btn secondary web-dialog-btn" id="webDialogCancelBtn">${escapeHtml(cancelText)}</button>
          <button type="button" class="btn web-dialog-btn ${danger ? 'web-dialog-btn-danger' : 'web-dialog-btn-primary'}" id="webDialogConfirmBtn">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const finish = (result: boolean) => {
      document.removeEventListener('keydown', onKeyDown);
      overlay.remove();
      resolve(result);
    };

    const confirmBtn = overlay.querySelector('#webDialogConfirmBtn') as HTMLButtonElement | null;
    const cancelBtn = overlay.querySelector('#webDialogCancelBtn') as HTMLButtonElement | null;

    if (danger) {
      cancelBtn?.focus();
    } else {
      confirmBtn?.focus();
    }

    confirmBtn?.addEventListener('click', () => finish(true));
    cancelBtn?.addEventListener('click', () => finish(false));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        finish(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
  });
}

export function webPrompt(options: PromptOptions): Promise<string | null> {
  return new Promise((resolve) => {
    const {
      title = 'Input',
      message = '',
      initialValue = '',
      placeholder = '',
      confirmText = 'Save',
      cancelText = 'Cancel',
    } = options;

    const overlay = document.createElement('div');
    overlay.className = 'web-dialog-overlay';

    overlay.innerHTML = `
      <div class="web-dialog-card" role="dialog" aria-modal="true">
        <div class="web-dialog-header">
          <div class="web-dialog-title">${escapeHtml(title)}</div>
        </div>
        <div class="web-dialog-body">
          ${message ? `<p class="web-dialog-message">${escapeHtml(message)}</p>` : ''}
          <div class="field" style="margin-bottom: 0;">
            <input
              type="text"
              id="webDialogPromptInput"
              class="web-dialog-input"
              value="${escapeHtml(initialValue)}"
              placeholder="${escapeHtml(placeholder)}"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="web-dialog-actions">
          <button type="button" class="btn secondary web-dialog-btn" id="webDialogPromptCancel">${escapeHtml(cancelText)}</button>
          <button type="button" class="btn web-dialog-btn web-dialog-btn-primary" id="webDialogPromptConfirm">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector('#webDialogPromptInput') as HTMLInputElement | null;
    const confirmBtn = overlay.querySelector('#webDialogPromptConfirm') as HTMLButtonElement | null;
    const cancelBtn = overlay.querySelector('#webDialogPromptCancel') as HTMLButtonElement | null;

    if (input) {
      input.focus();
      input.select();
    }

    const finish = (result: string | null) => {
      document.removeEventListener('keydown', onKeyDown);
      overlay.remove();
      resolve(result);
    };

    confirmBtn?.addEventListener('click', () => {
      const val = input ? input.value.trim() : '';
      finish(val);
    });

    cancelBtn?.addEventListener('click', () => finish(null));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = input ? input.value.trim() : '';
        finish(val);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        finish(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
  });
}
