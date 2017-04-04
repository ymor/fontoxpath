import Selector from '../Selector';
import Sequence from '../dataTypes/Sequence';
import NodeValue from '../dataTypes/NodeValue';

/**
 * @extends {Selector}
 */
class FollowingSiblingAxis extends Selector {
	/**
	 * @param  {Selector}  siblingSelector
	 */
	constructor (siblingSelector) {
		super(siblingSelector.specificity, Selector.RESULT_ORDERINGS.SORTED);

		this._siblingSelector = siblingSelector;
	}

	evaluate (dynamicContext) {
		var contextItem = dynamicContext.contextItem,
        domFacade = dynamicContext.domFacade;

		var sibling = contextItem.value[0].value;
		var siblings = [];
		while ((sibling = domFacade.getNextSibling(sibling))) {
			siblings.push(new NodeValue(sibling));
		}
		var matchingSiblings = siblings
			.filter((siblingNode) => {
				var contextItem = Sequence.singleton(siblingNode);
				var scopedContext = dynamicContext.createScopedContext({
					contextItem: contextItem,
					contextSequence: contextItem
				});
				return this._siblingSelector.evaluate(scopedContext).getEffectiveBooleanValue();
			});

		return new Sequence(matchingSiblings);
	}
}

export default FollowingSiblingAxis;
