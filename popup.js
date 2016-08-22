
document.addEventListener('DOMContentLoaded', function(){
  var colors = '';
    document.getElementById('btn').addEventListener('click',function(e){
      chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        /*tabs.sendMessage sends message to content script that are part of the present tab 
        Sends a message to the content script to obtain color of the active tab
        response object contains two more objects, backgroundcolor and fontcolor in HSL format*/
     
      chrome.tabs.sendMessage(tabs[0].id,{msg:"getcolor"},function(response){
        colors = response.backgroundcolor;
        console.log('Original: '+colors);
        for(i in response){
          for(j in response[i]){
            //console.log(document.getElementsByClassName(j));
            [].forEach.call(document.getElementById(i).getElementsByClassName(j),function(element){
              element.value = response[i][j];
            });
          }
        }
      });
    });
  });
 
  [].forEach.call(document.getElementsByTagName('input'),function(inputElement) {
    (inputElement.type === 'range')?inputElement.addEventListener('input',function(e){
      e.currentTarget.previousSibling.previousSibling.value = e.currentTarget.value;
      //e.currentTarget.previousSibling.text = 'x';
    }):inputElement.addEventListener('change',function(e){
      //console.log(e.currentTarget.nextSibling.nextSibling.value);
      e.currentTarget.nextSibling.nextSibling.value = e.currentTarget.value;
    });
  }, this);

  document.querySelectorAll('input[type="radio"]').forEach(function(element) {
    element.addEventListener('change',function(e){/*
      document.getElementById(e.currentTarget.value).disabled = true;
      ((e.currentTarget.parentNode).parentNode).disabled = false;
    */});
  }, this);
});


/**['input','change'].forEach(function(eventName){
      element.addEventListener(eventName,function(e){
        console.log(e.target.className + ' ' +e.target.value + ' ' + e.target.getAttribute('type'));
        (e.target.getAttribute('type') === 'range')
        // console.log(e.target.value);
        //[].forEach.call(document.getElementsByClassName(e.currentTarget.parentNode.id));
        //console.log((e.currentTarget.parentNode.id) + eventName);
        //e.currentTarget.previousSibling.previousSibling.value = e.target.value; 
        // console.log(e.currentTarget.parentNode.getElementsByTagName('input').getElementsByClassName());
        chrome.tabs.query({active: true, currentWindow: true},function(tabs){
          /*tabs.sendMessage sends message to content script that are part of the present tab */     
          //chrome.tabs.sendMessage(tabs[0].id,{msg:"setcolor", colors: colors},function(response){
          //console.log(response);
        //});
      //});
    //});
  //}); */

