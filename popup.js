

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('btn').addEventListener('click',function(e){
      chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        /*tabs.sendMessage sends message to content script that are part of the present tab */
     
      chrome.tabs.sendMessage(tabs[0].id,{msg:"getcolor"},function(response){
        for(var i in response){
            var controls = document.getElementsByClassName(i);
            controls[0].value = response[i];
            controls[1].value = response[i];
        }
      });
    });
  });
 
  document.querySelectorAll('input[type="range"]').forEach(function(element) {
    element.addEventListener('mouseup',function(e){
      document.getElementById('bgcolor').innerText = e.target.value;
      e.currentTarget.previousSibling.previousSibling.value = e.target.value;
    });
  }, this);
  document.querySelectorAll('input[type="radio"]').forEach(function(element) {
    element.addEventListener('click',function(e){
      document.getElementById(e.currentTarget.getAttribute('value')).setAttribute('disabled','true');
      //document.getElementById('rgb').setAttribute('disabled','true');
      ((e.currentTarget.parentNode).parentNode).setAttribute('disabled','false');
    });
  }, this);
});


