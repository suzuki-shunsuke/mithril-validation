# 仕様

## 0.1.0

* textボックスのrequiredをチェックする
  * だめだったら consoleにエラーと出力
  * OKだったら consoleにOKと出力

```javascript
m('input', {
  oninput: m.withAttr('value', value => {
    prop(value);
    validate(value);
  }),
  value: prop(),
})
```
