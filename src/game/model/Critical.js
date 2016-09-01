// @flow
class Critical {
  rate: number
  constructor(rate: number) {
    this.rate = rate;
  }

    hit() : bool {
        const rand = Math.random() * 100;
        return rand < this.rate;
    }
}

module.exports = Critical;
