import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1'
  );
}

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isActive: boolean,
  options?: {
    initialFocusRef?: React.RefObject<HTMLElement | null>;
    returnFocusRef?: React.RefObject<HTMLElement | null>;
  }
) {
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    previousActiveElement.current = document.activeElement;

    const focusable = getFocusableElements(container);
    if (focusable.length === 0) return;

    const initialEl = options?.initialFocusRef?.current ?? focusable[0];
    initialEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableEls = getFocusableElements(container);
      if (focusableEls.length === 0) return;

      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      const returnEl = options?.returnFocusRef?.current ?? previousActiveElement.current;
      if (returnEl instanceof HTMLElement) {
        returnEl.focus();
      }
    };
  }, [isActive, containerRef, options?.initialFocusRef, options?.returnFocusRef]);
}
