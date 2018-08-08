## git回滚

最近看到一个问题，虽然没遇到过使用场景，但觉得以后说不定能用上，此处记录一下。问题如下：

如果线上代码出了问题，需要代码回滚到之前的某次提交，应该如何操作？

方法一，revert：
```bash
git revert HEAD
git push origin master
```

方法二，reset：
```bash
git reset --hard HEAD^
git push origin master -f
```

方法三：回滚某次提交

```bash
# 找到要回滚的commitID
git log
git revert commitID
```