;
(function () {
    var counter = new function () {
        var _count = 0;
        var _hwdn = 0;

        function delay(handler, delay) {
            if (_hwdn) clearTimeout(_hwdn);
            _hwdn = setTimeout(handler, delay);
        };

        this.add = function (count) {
            _count = _count + count;
            delay(function () {
                _count = 0;
            }, 1000);
            return _count;
        };

        $(function () {
            $('[type="submit"]').click(function () {
                _count = 0;
            });
        });
    }

    function clearBaiduAd() {
        return $("#content_left div[data-click] span:contains('广告')")
            .parents("#content_left div[data-click]")
            .remove()
            .length;
    }

    $(document).bind("DOMNodeInserted", function (e) {
        var length = clearBaiduAd();
        var count = counter.add(length);
        chrome.runtime.sendMessage(count);
    });
})();