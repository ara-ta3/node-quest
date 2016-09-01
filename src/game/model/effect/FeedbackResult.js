export default class FeedbackResult {
    damaged: number
    cured: number
    mindDamaged: number
    mindCured: number
    constructor(
        damaged: number,
        cured: number,
        mindDamaged:number,
        mindCured:number) {
        this.damaged = damaged || 0;
        this.cured = cured || 0;
        this.mindDamaged = mindDamaged || 0;
        this.mindCured = mindCured || 0;
    }
}
