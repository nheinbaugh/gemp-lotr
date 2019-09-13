package com.gempukku.lotro.cards.build.field.effect.appender;

import com.gempukku.lotro.cards.build.*;
import com.gempukku.lotro.cards.build.field.FieldUtils;
import com.gempukku.lotro.cards.build.field.effect.EffectAppender;
import com.gempukku.lotro.cards.build.field.effect.EffectAppenderProducer;
import com.gempukku.lotro.cards.build.field.effect.appender.resolver.PlayerResolver;
import com.gempukku.lotro.logic.actions.CostToEffectAction;
import com.gempukku.lotro.logic.actions.SubAction;
import com.gempukku.lotro.logic.decisions.YesNoDecision;
import com.gempukku.lotro.logic.effects.PlayoutDecisionEffect;
import com.gempukku.lotro.logic.effects.StackActionEffect;
import com.gempukku.lotro.logic.timing.Effect;
import org.json.simple.JSONObject;

public class Optional implements EffectAppenderProducer {
    @Override
    public EffectAppender createEffectAppender(JSONObject effectObject, CardGenerationEnvironment environment) throws InvalidCardDefinitionException {
        FieldUtils.validateAllowedFields(effectObject, "player", "text", "effect");

        final String player = FieldUtils.getString(effectObject.get("player"), "player", "you");
        final String text = FieldUtils.getString(effectObject.get("text"), "text");
        final JSONObject effect = (JSONObject) effectObject.get("effect");

        if (text == null)
            throw new InvalidCardDefinitionException("There is a text required for optional effects");

        final PlayerSource playerSource = PlayerResolver.resolvePlayer(player, environment);
        final EffectAppender effectAppender = environment.getEffectAppenderFactory().getEffectAppender(effect, environment);

        return new DelayedAppender() {
            @Override
            protected Effect createEffect(boolean cost, CostToEffectAction action, ActionContext actionContext) {
                final String choosingPlayer = playerSource.getPlayer(actionContext);
                SubAction subAction = new SubAction(action);
                subAction.appendCost(
                        new PlayoutDecisionEffect(choosingPlayer,
                        new YesNoDecision(text) {
                            @Override
                            protected void yes() {
                                ActionContext delegate = new DelegateActionContext(actionContext,
                                        choosingPlayer, actionContext.getGame(), actionContext.getSource(),
                                        actionContext.getEffectResult(), actionContext.getEffect());
                                effectAppender.appendEffect(cost, subAction, delegate);
                            }
                        }));
                return new StackActionEffect(subAction);
            }

            @Override
            public boolean isPlayableInFull(ActionContext actionContext) {
                return effectAppender.isPlayableInFull(actionContext);
            }
        };
    }
}
