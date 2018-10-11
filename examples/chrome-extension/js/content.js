(function(){
  var listeners = []
  var iframe = document.getElementById('contentIFrame0')
  var intervalCode = 0
  iframe.addEventListener('load', function(){
    for(var i= 0;i<listeners.length;i++){
      listeners.shift()()
    }
  })
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if(request.type == 'start') {
      var _document = iframe.contentWindow.document;
      var codeList = request.payload.code.split(',')
      var numberList = request.payload.number.split(',')
      var interval = parseInt(request.payload.interval) || 10
      var i = 0
      clearInterval(intervalCode)
      var cb = function(){
        var _document = document.getElementById('contentIFrame0').contentWindow.document;
        var code = codeList[i]
        var number = 0
        if(i>=numberList.length){
          number = numberList[numberList.length-1]
        }else{
          number = numberList[i]
        }
        listeners.push(function(){
          var list = _document.querySelectorAll('#tableList tr.odd-row td')
          var name = list[1].innerText
          var stock = list[list.length-1].innerText
          var info = {name: name, stock: stock, code: code, number: number, time: getNowTime() }
          sendMessageToPopup({type:'refresh', payload:info});
        })
        _document.getElementById('txtProduct').value=codeList[i]
        _document.getElementById('btnSearch').click()
        if(i>=codeList.length-1){
          i=0
        }else{
          i++
        }
      }
      cb()
      intervalCode = setInterval(cb, interval*1000)
    }
  });
  
  function sendMessageToPopup(message){
    chrome.runtime.sendMessage('gcjefpdikjlgpndiafaiffmbnjdphkph', message)
  }
  function getNowTime(){
    var d = new Date()
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
  }
})()