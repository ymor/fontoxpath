define([
	'./AnyAtomicValue'
], function (
	AnyAtomicValue
) {
	function BooleanValue (initialValue) {
		AnyAtomicValue.call(this, initialValue);
	}

	BooleanValue.prototype = Object.create(AnyAtomicValue.prototype);
	BooleanValue.prototype.constructor = BooleanValue;

	BooleanValue.TRUE = BooleanValue.prototype.TRUE = new BooleanValue(true);
	BooleanValue.FALSE = BooleanValue.prototype.FALSE = new BooleanValue(false);

	BooleanValue.cast = function (value) {
		if (value instanceof BooleanValue) {
			return new BooleanValue(value.value);
		}

		var anyAtomicValue = AnyAtomicValue.cast(value);

		switch (anyAtomicValue.value) {
			case 'true':
				return BooleanValue.TRUE;
			case 'false':
				return BooleanValue.FALSE;
			case '0':
				return BooleanValue.FALSE;
			case '1':
				return BooleanValue.TRUE;
			default:
				throw new Error('XPTY0004: can not cast ' + value + ' to xs:boolean');
		}
	};

	BooleanValue.prototype.getEffectiveBooleanValue = function () {
		return this.value;
	};

	BooleanValue.primitiveTypeName = BooleanValue.prototype.primitiveTypeName = 'xs:boolean';

	BooleanValue.prototype.instanceOfType = function (simpleTypeName) {
		return simpleTypeName === this.primitiveTypeName ||
			AnyAtomicValue.prototype.instanceOfType(simpleTypeName);
	};


	return BooleanValue;
});
