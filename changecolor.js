
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    /*This onMessage listener listens for tabs.sendMessage. This is a content script specified
    in manifest.json */
  if(message.msg=="getcolor"){
      /*Get the background color of the window in this script. This will return the 
      backgroundcolor of the tab. Getting the background color from popup.js will 
      return the color of popup.html*/
      var bgColorFromPage = window.getComputedStyle(document.body, null).backgroundColor;
      var bgColorRGBValues = (bgColorFromPage.substring(bgColorFromPage.indexOf('(')+1,bgColorFromPage.indexOf(')'))).split(', ');
      var fontColorFromPage = window.getComputedStyle(document.body, null).color;
      var fontColorRGBValues = (fontColorFromPage.substring(fontColorFromPage.indexOf('(')+1,fontColorFromPage.indexOf(')'))).split(', ');

      bgColorHSL = rgbToHsl(parseInt(bgColorRGBValues[0]),parseInt(bgColorRGBValues[1]),parseInt(bgColorRGBValues[2]));
      fontColorHSL = rgbToHsl(parseInt(fontColorRGBValues[0]),parseInt(fontColorRGBValues[1]),parseInt(fontColorRGBValues[2]));
      
      var colors = {backgroundcolor: bgColorHSL, fontcolor: fontColorHSL};
      sendResponse(colors);

  }
  if(message.msg=="setcolor"){
    var newColor = 'hsl('+message.colors.h+', '+message.colors.s +'%, '+message.colors.l+'%)';
    if(message.element === 'backgroundcolor'){
      document.body.style.backgroundColor = newColor;
    }else{
      document.body.style.color = newColor;
    }
     sendResponse('x');
  }
  return true;
});

function rgbToHsl(r, g, b) {
  
   var min, max, i, l, s, maxcolor, h, rgb = [];

   rgb[0] = r / 255;
   rgb[1] = g / 255;
   rgb[2] = b / 255;
   min = rgb[0];
   max = rgb[0];
   maxcolor = 0;

   for (i = 0; i < rgb.length - 1; i++) {
     if (rgb[i + 1] <= min) {min = rgb[i + 1];}
     if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
    }

    if (maxcolor == 0) {
      h = (rgb[1] - rgb[2]) / (max - min);
    }

    if (maxcolor == 1) {
      h = 2 + (rgb[2] - rgb[0]) / (max - min);
    }

    if (maxcolor == 2) {
      h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }

    if (isNaN(h)) {
      h = 0;
    }

    h = h * 60;

    if (h < 0) {
      h = h + 360; 
    }

    l = (min + max) / 2;

    if (min == max) {
      s = 0;
    } else {
      if (l < 0.5) {
        s = (max - min) / (max + min);
      } else {
        s = (max - min) / (2 - max - min);
      }
    }
    s = s;
    return {h : h, s : s*100, l : l*100};
}