# [vscode-eval](https://marketplace.visualstudio.com/items?itemName=kamiyaowl.eval)

選択範囲、もしくはテキストボックスで入力した内容を評価します。

評価の実装はjavascriptの以下関数がベースです。

```js
/**
 * @param {string} expr
 */
function safeEvalMultiLine(expr) {
	return Function(expr)();
}
```

## 使い方

### Eval: from Input Box
### Eval: from Selected(Single Line)

評価する文字列の先頭に`return`が自動的に付与されます。

### Eval: from Selected(Multi Line)

選択した文字列をそのまま評価します。表示する値を自分でreturnする必要があります。

#### 例

```js
let x = 0;
for (let i = 0 ; i < 10 ; i++) {
  x += i;
}
return x;
```
