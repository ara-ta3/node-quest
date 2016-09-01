// @flow 
import FeedbackResult from "./FeedbackResult"

export default class Feedback {
    apply(effectResult: SpellEffectResult): (u: User) => FeedbackResult {
        return (actor: User) => {
            throw new Error("not implemented error");
        };
    }
}
