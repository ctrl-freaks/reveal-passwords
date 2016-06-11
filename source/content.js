"use strict";

var url = location.href;

var togglePasswords = function(reveal) {

  var $passwords;
  var length;
  
  if (reveal) {
    $passwords = document.querySelectorAll('input[type="password"]');
    length = $passwords.length;

    if (length < 1) {
      return false;
    }
    for (var i = 0; i < length; i++) {
      $passwords[i].type = 'text';
      $passwords[i].classList.add('password-revealed');
    }
  } else {
    $passwords = document.querySelectorAll('.password-revealed');
    length = $passwords.length;
    for (var i = 0; i < length; i++) {
      $passwords[i].type = 'password';
      $passwords[i].classList.remove('password-revealed');
    }
  }
};

// on run
chrome.storage.sync.get(url, function(data){
  var reveal = (data[url] && data[url].hidden);
  togglePasswords(reveal);
});
