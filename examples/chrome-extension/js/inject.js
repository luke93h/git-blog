
window.___startPoll___ = function(){
window.___clearCode___ = setInterval(
    function(){
    document.getElementById("txtProduct").value="1";
    },
    1000
)
};
window.clearInterval(window.___clearCode___ || 0);
window.___startPoll___()

window.addEventListener("message", function(event) {
// 我们只接受来自我们自己的消息
if (event.source != window)
    return;

if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("内容脚本接收到：" + event.data.text);
    port.postMessage(event.data.text);
}
}, false);