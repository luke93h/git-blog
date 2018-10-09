(function(){
  var listeners = []
  var iframe = document.getElementById('contentIFrame0')
  iframe.addEventListener('load', function(){
    console.log(iframe.contentWindow.document.readyState)
    for(var i= 0;i<listeners.length;i++){
      listeners.shift()()
    }
  })
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if(request.type == 'start') {
      var _document = iframe.contentWindow.document;
      _document.getElementById('txtProduct').value=request.payload.code
      _document.getElementById('btnSearch').click()
      listeners.push(function(){
        var list = _document.querySelectorAll('#tableList td')
        console.log(list)
      })
    }
    sendResponse('我收到了你的消息！');
  });
})()