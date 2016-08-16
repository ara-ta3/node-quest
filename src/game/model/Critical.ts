export default class Critical {
    private rate: number;

    constructor(rate: number) {
        this.rate = rate;
    }

    hit() {
        var rand:number = Math.random() * 100;
        return rand < this.rate;
    }
}
