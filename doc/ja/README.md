# mithril-validation

Mithril用のバリデーションライブラリです。
次のような特徴を持っています。

* 一通りのバリデーションパターンを標準で持っている([validator.js](https://github.com/chriso/validator.js)に依存)
* カスタムのバリデーションパターンを追加できる
* バリデーション対象としてモデルインスタンスまたはm.prop()オブジェクトを指定可能
* 各バリデーションパターンのデフォルトパラメータを設定できる(同じ記述を繰り返さなくて済む)
* 各バリデーション対象に複数のバリデーションパターンを優先順位付けて設定できる
* 各バリデーション対象に設定したバリデーションパターンのうち、一部のパターンのみ選択的に実行可能
  (これにより、バリデーションの実行タイミングをパターンごとに変更できる)
* 特定のCSSフレームワークには依存しない
* バリデーション後の処理(エラーメッセージの表示など)は自由に出来る(逆に言えば自動ではやってくれない。ユーザに任せている)
* npm及びbowerで公開されている
* MITライセンス

## インストール

```
$ npm install --save-dev mithril-validation
```

```
$ bower install --save-dev mithril-validation
```

## サンプルコード その1

バリデーション対象がm.prop()オブジェクトの場合

```javascript
let create_validator = require('mithril-validation').create_validator;

let NameValidator = create_validator({
  rules: [{
    'type': 'required',
    'message': '必須です!'
  }, {
    'type': 'minlength',
    'message': (value, params) => `${value}`,  // エラーメッセージを動的に生成出来る
    'params': 10  // バリデーション関数とメッセージ関数に渡されるパラメータ(型などは任意)
  }, {
    'type': 'custom',  // カスタム関数を設定できる
    'message': 'カスタムです',
    'validate': () => {
    }
  }],
});

class Controller {
  constructor() {
    this.name = m.prop();
    this.name_validator = new NameValidator(this.name);
  }
}

let component = {controller: Controller};

component.view = ctrl => [
  m('.form-group', [
    m('input.form-control', {
      oninput: m.withAttr('value', value => {
        ctrl.name(value);
        ctrl.name_validator.validate(['required']);  // oninputイベントではrequiredのみチェック
      }),
      value: ctrl.name()
    }),
    m('span.help-block', ctrl.name_validator.message()),
  ]),
  m('button.btn.btn-primary[type=button]', {
    onclick() {
      if (ctrl.name_validator.validate()) {
        console.log('success');
      } else {
        console.log(ctrl.name_validator.message());
      }
    }
  }, '送信'),
];
```

## サンプルコード その2

バリデーション対象がモデルインスタンスの場合

```javascript
class User {
  constructor() {
    this.name = m.prop('');
    this.age = m.prop('');
  }
}

let UserValidator = create_validator({
    // 各バリデーション項目のデフォルトパラメータを設定できる
    'required': {
      'message': 'Required!'
    },
    // カスタムのバリデーションパターンを定義
    'custom1': {
      'message': 'カスタムです',
      'validate': () => {
      }
    }
  }, {
    'name': {
      rules: ['required'],  // デフォルトパラメータを設定しておけば記述が簡潔になる
    },
    'age': {
      rules: 'required',  // ルールが1つなら配列じゃなくてもよい
    },
  }
);

class Controller {
  constructor() {
    this.user = new User();
    this.user_validator = new UserValidator(this.user);
  }
}

let component = {controller: Controller};

component.view = ctrl => [
  m('.form-group', [
    m('input.form-control', {
      oninput: m.withAttr('value', value => {
        ctrl.user.name(value);
        ctrl.user_validator.name.validate();
      }),
      value: ctrl.user.name()
    }),
    m('span.help-block', ctrl.user_validator.name.message()),
  ]),
  m('.form-group', [
    m('input.form-control', {
      oninput: m.withAttr('value', value => {
        ctrl.age(value);
        ctrl.user_validator.age.validate();
      }),
      value: ctrl.age()
    }),
    m('span.help-block', ctrl.user_validator.age.message()),
  ]),
  m('button.btn.btn-primary[type=button]', {
    onclick() {
      if (ctrl.user_validator.validate()) {
        console.log('success');
      } else {
        console.log(ctrl.user_validator.messages());
      }
    }
  }, '送信'),
];
```
