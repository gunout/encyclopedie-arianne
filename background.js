'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'esa-analyze',
    title: '🇪🇺 Analyser avec ESA Encyclopedia',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'esa-analyze' && info.selectionText) {
    chrome.storage.local.set({ mot: info.selectionText.trim() });
    chrome.action.openPopup();
  }
});