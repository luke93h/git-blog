# js写动画的方式

1. setTimeout/setInterval

```jsx
let start = (new Date()).getTime()
function move(e, dis){
  let now = (new Date()).getTime()
  let elapsed = now - start 
  let fraction = elapsed/time
  if( fraction < 1) {
    let x = dis * fraction
    e.style.left = x + 'px'
    setTimeout(animate, Math.min(25, time-elapsed))
  }else{
    e.style.left = dis + 'px'
  }
}
```

2. requestAnimationFrame

```jsx
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

3. className

```jsx
dom.className = 'animate'
```

## 总结

推荐顺序： className > requestAnimationFrame > setTimeout/setInterval


| 类别 | 优点 | 缺点 |
| ------ | ------ | ------ |
| setTimeout/setInterval | - | 性能 最差 |
| requestAnimationFrame | 1.每一帧调用的时机通过浏览器来告知，动画更加流畅。2.可控性好 | 性能差 |
| className | 1.通过css来写动画，性能好。2.js操作少，较为简单 | 只能完成简单的动画，可控性没有js动画高 |