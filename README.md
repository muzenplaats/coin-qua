# coin-qua
A coin qua (hung) with sky and earth numbers

## Usage

## Development
codename: `probability`

```js
class BaQua {
  constructor(bq) {
    if (typeof bq === 'string') {

    } else if (tyoeof bq === 'number') {
      this.number = bq
    } else {
      throw new TypeError()
    }
  }

  get code() {
    // Todo
  }

  get name() {
    // Todo
  }

  toString() {
    // Todo
  }

  toJSON() {
    let {} = this
    return {}
  }

  static getYao() {
    return Math.radom() >= 0.5 ? 1 : 0
  }

  static getQua() {

  }
}

class CoinGua {
  constructor() {
    this.LowerQua = BaGua.getQua()
    this.UpperQua = BaGua.getQua()
  }

  toString() {
    // Todo
  }

  toJSON() {
    let { lowerQua, upperQua } = this
    return { lowerQua, upperQua }
  }
}
```
