define([
	'fontoxml-blueprints',

	'../Selector',
	'../dataTypes/Sequence',
	'../dataTypes/NodeValue'
], function (
	blueprints,

	Selector,
	Sequence,
	NodeValue
) {
	'use strict';

	var blueprintQuery = blueprints.blueprintQuery;

	/**
	 * @param  {Selector}  descendantSelector
	 */
	function DescendantAxis (descendantSelector, options) {
		options = options || {};
		Selector.call(this, descendantSelector.specificity, Selector.RESULT_ORDER_SORTED);

		this._descendantSelector = descendantSelector;
		this._isInclusive = !!options.inclusive;
	}

	DescendantAxis.prototype = Object.create(Selector.prototype);
	DescendantAxis.prototype.constructor = DescendantAxis;

	/**
	 * @param  {Node}       node
	 * @param  {Blueprint}  blueprint
	 */
	DescendantAxis.prototype.matches = function (node, blueprint) {
		if (this._isInclusive && this._descendantSelector.matches(node, blueprint)) {
			return true;
		}
		return blueprintQuery.findDescendants(blueprint, node, function (descendantNode) {
			return this._descendantSelector.matches(descendantNode, blueprint);
		}.bind(this)).length > 0;
	};

	DescendantAxis.prototype.equals = function (otherSelector) {
		return otherSelector instanceof DescendantAxis &&
			this._isInclusive === otherSelector._isInclusive &&
			this._descendantSelector.equals(otherSelector._descendantSelector);
	};

	DescendantAxis.prototype.evaluate = function (dynamicContext) {
		var contextItem = dynamicContext.contextItem,
			domFacade = dynamicContext.domFacade;

		// Assume singleton, since axes are only valid in paths
		var isMatchingDescendant = function (descendantNode) {
				var scopedContext = dynamicContext.createScopedContext({
						contextItem: Sequence.singleton(new NodeValue(domFacade, descendantNode)),
						contextSequence: null
					});
				return this._descendantSelector.evaluate(scopedContext).getEffectiveBooleanValue();
			}.bind(this);
		var nodeValues = blueprintQuery.findDescendants(
				domFacade,
				contextItem.value[0].value,
				isMatchingDescendant,
				true)
			.map(function (node) {
				return new NodeValue(domFacade, node);
			});

		if (this._isInclusive && this._descendantSelector.evaluate(dynamicContext).getEffectiveBooleanValue()) {
			nodeValues.unshift(contextItem.value[0]);
		}
		return new Sequence(nodeValues);
	};

	return DescendantAxis;
});
