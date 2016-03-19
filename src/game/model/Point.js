class Point {

    constructor(average, sigma) {
        this.average = average;
        this.sigma = sigma;
    };

    toInt() {
        return Math.round(this.boxMullerRNorm(Math.random(), Math.random()) * this.sigma + this.average);
    }

    boxMullerRNorm(x1, x2) {
        return Math.sqrt(-2 * Math.log(1 - x1)) * Math.cos(2 * Math.PI * x2);
    };
}

module.exports = Point;