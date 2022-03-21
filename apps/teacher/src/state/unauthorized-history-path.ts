import { atom } from 'recoil';

/**
 * When an unauthorized page is accessed, use this state to record the page
 * address and jump to the login page. After successful login, it automatically
 * jumps back to the page that needs to be accessed before
 */
export const unauthorizedHistoryPathState = atom<string>({
  key: 'unauthorizedHistoryPath',
  default: '/send-message',
});
