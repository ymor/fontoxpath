import Sequence from '../dataTypes/Sequence';
import createAtomicValue from '../dataTypes/createAtomicValue';

import { MATH_NAMESPACE_URI } from '../staticallyKnownNamespaces';

function mathPi (_dynamicContext, _executionParameters, _staticContext) {
	return Sequence.singleton(createAtomicValue(Math.PI, 'xs:double'));
}

function mathExp (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.pow(Math.E, onlyValue.value), 'xs:double'));
}

function mathExp10 (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.pow(10, onlyValue.value), 'xs:double'));
}

function mathLog (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.log(onlyValue.value), 'xs:double'));
}

function mathLog10 (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.log10(onlyValue.value), 'xs:double'));
}

function mathPow (_dynamicContext, _executionParameters, staticContext, base, exponent) {
	// Note: base is double?, exponent is numeric. In the base is empty case, return empty.
	return exponent.mapAll(
		([valueY]) => base.map(
			valueX => {
				// isFinite is false for +Infinity, -Infinity and NaN
				if (Math.abs(valueX.value) === 1 && !Number.isFinite(valueY.value)) {
					return createAtomicValue(1, 'xs:double');
				}
				return createAtomicValue(Math.pow(valueX.value, valueY.value), 'xs:double');
			}));
}

function mathSqrt (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.sqrt(onlyValue.value), 'xs:double'));
}

function mathSin (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.sin(onlyValue.value), 'xs:double'));
}

function mathCos (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.cos(onlyValue.value), 'xs:double'));
}

function mathTan (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.tan(onlyValue.value), 'xs:double'));
}

function mathAsin (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.asin(onlyValue.value), 'xs:double'));
}

function mathAcos (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.acos(onlyValue.value), 'xs:double'));
}

function mathAtan (_dynamicContext, _executionParameters, staticContext, sequence) {
	return sequence.map(onlyValue => createAtomicValue(Math.atan(onlyValue.value), 'xs:double'));
}

function mathAtan2 (_dynamicContext, _executionParameters, staticContext, x, y) {
	// Note that x is the double? argument, y is double.
	return y.mapAll(([onlyYValue]) => x.map(onlyXValue => createAtomicValue(Math.atan2(onlyXValue.value, onlyYValue.value), 'xs:double')));
}

export default {
	declarations: [
		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'pi',
			argumentTypes: [],
			returnType: 'xs:double',
			callFunction: mathPi
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'exp',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathExp
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'exp10',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathExp10
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'log',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathLog
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'log10',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathLog10
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'pow',
			argumentTypes: ['xs:double?', 'xs:numeric'],
			returnType: 'xs:double?',
			callFunction: mathPow
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'sqrt',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathSqrt
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'sin',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathSin
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'cos',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathCos
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'tan',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathTan
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'asin',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathAsin
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'acos',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathAcos
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'atan',
			argumentTypes: ['xs:double?'],
			returnType: 'xs:double?',
			callFunction: mathAtan
		},

		{
			namespaceURI: MATH_NAMESPACE_URI,
			localName: 'atan2',
			argumentTypes: ['xs:double?', 'xs:double'],
			returnType: 'xs:double?',
			callFunction: mathAtan2
		}
	]
};