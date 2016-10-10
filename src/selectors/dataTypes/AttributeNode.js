define([
	'fontoxml-dom-identification/getNodeId',
	'./UntypedAtomicValue',
	'./StringValue'
], function (
	getNodeId,
	UntypedAtomicValue,
	StringValue
) {
	'use strict';

	function AttributeNode (element, attributeName, attributeValue) {
		this.value = attributeValue;
		this.nodeName = attributeName;
		this.nodeId = getNodeId(element) + '@' + this.nodeName;
		this._element = element;
	}

	AttributeNode.prototype.IS_ATTRIBUTE_NODE = true;

	AttributeNode.prototype.getParentNode = function () {
		return this._element;
	};

	AttributeNode.prototype.atomize = function () {
		// TODO: Mix in types
		return new UntypedAtomicValue(this.value);
	};

	AttributeNode.prototype.getStringValue = function () {
		return new StringValue(this.value);
	};

	return AttributeNode;
});
