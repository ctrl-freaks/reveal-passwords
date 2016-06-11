var iconPaths = {
  active: {
    19: 'icons/active-19.png',
    38: 'icons/active-38.png',
  },
  inactive: {
    19: 'icons/inactive-19.png',
    38: 'icons/inactive-38.png',
  },
};

var createRules = function() {
  // With a new rule ...
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher()
      ],
      // And shows the extension's page action.
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }
  ]);
};

var handlePageActionClick = function(tab) {
  // get the state for this URL and see if it should be hidden or not
  chrome.storage.sync.get(tab.url, function(data){
    var hidden = !(data[tab.url] && data[tab.url].hidden);
    console.log(hidden);
    var update = {};
    update[tab.url] = {hidden: hidden};
    chrome.pageAction.setIcon({
      tabId: tab.id,
      path: hidden ? iconPaths.active : iconPaths.inactive,
    });
    chrome.storage.sync.set(update, function(){
      chrome.tabs.executeScript(null, {file: 'content.js'});
    });
  });
};

// Add listener
chrome.pageAction.onClicked.addListener(handlePageActionClick);

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, createRules);
});
