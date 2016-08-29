define([
	'fontoxml-blueprints/readOnlyBlueprint',
	'fontoxml-dom-utils/jsonMLMapper',
	'slimdom',

	'fontoxml-selectors/parsing/createSelectorFromXPath',
	'fontoxml-selectors/addXPathCustomTest',
	'fontoxml-selectors/evaluateXPath'
], function (
	blueprint,
	jsonMLMapper,
	slimdom,

	parseSelector,
	addXPathCustomTest,
	evaluateXPath
) {
	'use strict';

	var documentNode;
	beforeEach(function () {
		documentNode = slimdom.createDocument();
	});

	describe('every', function () {
		it('allows usage of global variables inside the satisfies clause', function () {
			chai.assert(evaluateXPath('every $x in true() satisfies $x = $y', documentNode, blueprint, {'y': true}));
		});

		it('overwrites global variables inside the satisfies clause', function () {
			chai.assert(evaluateXPath('every $x in true() satisfies $x', documentNode, blueprint, {'x': false}));
		});

		it('does not throw when a result has been found before errors', function () {
			chai.assert(evaluateXPath('(every $x in (1, 2, "cat") satisfies 2 * $x = 2) eq false()', documentNode, blueprint));
		});

		describe('single variable binding', function () {
			it('returns true if one of the values is true', function () {
				chai.assert(evaluateXPath('every $x in true() satisfies $x', documentNode, blueprint));
			});

			it('returns true if none of the values are true', function () {
				chai.assert(evaluateXPath('(every $x in false() satisfies $x) eq false()', documentNode, blueprint));
			});

			it('returns false if passed an empty sequence', function () {
				chai.assert(evaluateXPath('(every $x in () satisfies true()) eq true()', documentNode, blueprint));
			});

			// From the QT3_1_0 XPath 3.1 tests
			it('Simple quantified expression using "every" keyword and use of logical expression (or).', function () {
				chai.assert(evaluateXPath('every $x in (1, 2) satisfies $x = 1 or ($x +1) = 3', documentNode, blueprint));
			});
		});

		describe('multiple variable binding', function () {
			it('returns true if one the satisfies options returns true', function () {
				chai.assert(evaluateXPath('every $x in true(), $y in true() satisfies $x = $y', documentNode, blueprint));
			});

			it('returns false if none the satisfies options returns true', function () {
				chai.assert(evaluateXPath('(every $x in (false(), true()), $y in (false(), true()) satisfies $x = $y) eq false()', documentNode, blueprint));
			});
		});
	});
});