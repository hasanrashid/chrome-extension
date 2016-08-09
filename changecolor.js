chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    /*This onMessage listener listens for tabs.sendMessage. This is a content script specified
    in manifest.json */
  
  if(message.msg=="getcolor"){
      /*Get the background color of the window in this script. This will return the 
      backgroundcolor of the tab. Getting the background color from popup.js will 
      return the color of popup.html*/
       var bgc = window.getComputedStyle(document.body, null).backgroundColor;
       var subs = bgc.substring(bgc.indexOf('(')+1,bgc.indexOf(')'));
       var colors = subs.split(', ');
       console.log(colors);
       var fc = window.getComputedStyle(document.body, null).color;
    sendResponse({red: colors[0], green: colors[1], blue: colors[2]});
  }
  return true;
});