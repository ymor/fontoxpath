define([
	'../Selector',
	'../dataTypes/Sequence',
	'../dataTypes/BooleanValue',
	'../Specificity'
], function (
	Selector,
	Sequence,
	BooleanValue,
	Specificity
	) {
	'use strict';

	/**
	 * @param  {string}  type
	 */
	function TypeTest (type) {
		Selector.call(this, new Specificity({}), Selector.RESULT_ORDER_SORTED);

		this._type = type;
	}

	TypeTest.prototype = Object.create(Selector.prototype);
	TypeTest.prototype.constructor = TypeTest;

	TypeTest.prototype.evaluate = function (dynamicContext) {
		return Sequence.singleton(new BooleanValue(dynamicContext.contextItem.instanceOfType(this._type)));
	};

	TypeTest.prototype.equals = function (otherSelector) {
		if (this === otherSelector) {
			return true;
		}

		return otherSelector instanceof TypeTest &&
			this._type === otherSelector._type;
	};

	return TypeTest;
});