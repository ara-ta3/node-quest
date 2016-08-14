export default class FeedbackResult {
    constructor(damaged, cured, mindDamaged, mindCured) {
        this.damaged = damaged || 0;
        this.cured = cured || 0;
        this.mindDamaged = mindDamaged || 0;
        this.mindCured = mindCured || 0;
    }
}
