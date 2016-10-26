import slimdom from 'slimdom';

import blueprint from 'fontoxml-blueprints/readOnlyBlueprint';
import jsonMLMapper from 'fontoxml-dom-utils/jsonMLMapper';
import parseSelector from 'fontoxml-selectors/parsing/createSelectorFromXPath';

let documentNode;
beforeEach(() => {
	documentNode = slimdom.createDocument();
});

describe('processing-instruction()', () => {
	it('allows processing instruction targets as literals', () => {
		const selector = parseSelector('self::processing-instruction("someTarget")');
		jsonMLMapper.parse([
			'someOtherParentElement',
			['?someTarget', 'someData']
		], documentNode);
		chai.expect(selector.matches(documentNode.documentElement.firstChild, blueprint)).to.equal(true);
	});

	it('allows processing instruction tests without a target', () => {
		const selector = parseSelector('self::processing-instruction()');
		jsonMLMapper.parse([
			'someOtherParentElement',
			['?someTarget', 'someData']
		], documentNode);
		chai.expect(selector.matches(documentNode.documentElement.firstChild, blueprint)).to.equal(true);
	});

	it('allows processing instruction targets as NCNames', () => {
		const selector = parseSelector('self::processing-instruction(someTarget)');
		jsonMLMapper.parse([
			'someOtherParentElement',
			['?someTarget', 'someData']
		], documentNode);
		chai.expect(selector.matches(documentNode.documentElement.firstChild, blueprint)).to.equal(true);
	});

	it('allows processing instruction tests without an axis, without a target', () => {
		const selector = parseSelector('processing-instruction()');
		jsonMLMapper.parse([
			'someOtherParentElement',
			['?someTarget', 'someData']
		], documentNode);
		chai.expect(selector.matches(documentNode.documentElement, blueprint)).to.equal(true);
	});

	it('allows processing instruction tests without an axis, with a target NCName', () => {
		const selector = parseSelector('processing-instruction(someTarget)');
		jsonMLMapper.parse([
			'someOtherParentElement',
			['?someTarget', 'someData']
		], documentNode);
		chai.expect(selector.matches(documentNode.documentElement, blueprint)).to.equal(true);
	});

	it('allows processing instruction tests without an axis, with a target literal string', () => {
		const selector = parseSelector('processing-instruction("someTarget")');
		jsonMLMapper.parse([
			'someOtherParentElement',
			['?someTarget', 'someData']
		], documentNode);
		chai.expect(selector.matches(documentNode.documentElement, blueprint)).to.equal(true);
	});
});
