import Selector from '../Selector';
import Specificity from '../Specificity';
import MapValue from '../dataTypes/MapValue';
import Sequence from '../dataTypes/Sequence';

/**
 * @extends {Selector}
 */
class MapConstructor extends Selector {
	/**
	 * @param  {Array<{key: !Selector, value:! Selector}>}  entries  key-value tuples of selectors which will evaluate to key / value pairs
	 */
	constructor (entries) {
		super(new Specificity({
			[Specificity.EXTERNAL_KIND]: 1
		}), Selector.RESULT_ORDERINGS.UNSORTED);
		this._entries = entries;
	}

	equals (otherSelector) {
		if (this === otherSelector) {
			return true;
		}

		if (!(otherSelector instanceof MapConstructor)) {
			return false;
		}

		const otherMapConstructor = /** @type {MapConstructor} */ (otherSelector);

		return this._entries.length === otherMapConstructor._entries.length &&
			this._entries.every(function (keyValuePair, i) {
				return otherMapConstructor._entries[i].key.equals(keyValuePair.key) &&
					otherMapConstructor._entries[i].value.equals(keyValuePair.value);
			});
	}

	evaluate (dynamicContext) {
		var keyValuePairs = this._entries.map(function (keyValuePair) {
				var keySequence = keyValuePair.key.evaluate(dynamicContext).atomize();
				if (!keySequence.isSingleton()) {
					throw new Error('XPTY0004: A key of a map should be a single atomizable value.');
				}
				return {
					key: keySequence.value[0],
					value: keyValuePair.value.evaluate(dynamicContext)
				};
			});

		return Sequence.singleton(new MapValue(keyValuePairs));
	}
}

export default MapConstructor;