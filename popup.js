
document.addEventListener('DOMContentLoaded', function(){
   var h = '';
   var s = '';
   var l = '' ;
   var hslColor={h:'',s:'',l:''};
    document.getElementById('btn').addEventListener('click',function(e){
      chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        /*tabs.sendMessage sends message to content script that are part of the present tab */
     
      chrome.tabs.sendMessage(tabs[0].id,{msg:"getcolor"},function(response){
        h = (response.h);
        s = (response.s);
        l = (response.l);
        hslColor.h = h;
        hslColor.s = s;
        hslColor.l = l;
         for(var i in response){
            var controls = document.getElementsByClassName(i);
            controls[0].value = response[i];
            controls[1].value = response[i];
        }
      });
    });
  });
 
  document.querySelectorAll('input[type="range"]').forEach(function(element) {
    element.addEventListener('input',function(e){
      e.currentTarget.previousSibling.previousSibling.value = e.target.value; 
      //h = parsefloat(e.target.value);  
      hslColor[e.target.className]=parseFloat(document.querySelector('input[type="text"][class='+e.target.className+']').value);  
      console.log(hslColor.h + ' ' + hslColor.s + ' ' + hslColor.l);
      chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        /*tabs.sendMessage sends message to content script that are part of the present tab */     
        chrome.tabs.sendMessage(tabs[0].id,{msg:"setcolor", hslc: hslColor},function(response){

        });
      });
    });
  }, this);

  document.querySelectorAll('input[type="radio"]').forEach(function(element) {
    element.addEventListener('change',function(e){
      document.getElementById(e.currentTarget.value).disabled = true;
      ((e.currentTarget.parentNode).parentNode).disabled = false;
    });
  }, this);
});


