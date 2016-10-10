define([
	'fontoxml-selectors/selectors/operators/compares/Compare',
	'fontoxml-selectors/selectors/Specificity'
], function (
	Compare,
	Specificity
) {
	'use strict';

	var equalSelector =	{
			specificity: new Specificity({}),
			equals: sinon.stub().returns(true)
		},
		unequalSelector = {
			specificity: new Specificity({}),
			equals: sinon.stub().returns(false)
		};

	describe('Compare.equals()', function () {
		it('returns true if compared with itself', function () {
			var compare1 = new Compare(['generalCompare', 'eq'], equalSelector, equalSelector),
				compare2 = compare1;
			chai.expect(compare1.equals(compare2)).to.equal(true);
			chai.expect(compare2.equals(compare1)).to.equal(true);
		});

		it('it returns true if compared with an equal other Compare', function () {
			var compare1 = new Compare(['generalCompare', 'eq'], equalSelector, equalSelector),
				compare2 = new Compare(['generalCompare', 'eq'], equalSelector, equalSelector);
			chai.expect(compare1.equals(compare2)).to.equal(true);
			chai.expect(compare2.equals(compare1)).to.equal(true);
		});

		it('it returns false if compared with a Compare unequal on the first part', function () {
			var compare1 = new Compare(['generalCompare', 'eq'], unequalSelector, equalSelector),
				compare2 = new Compare(['generalCompare', 'eq'], unequalSelector, equalSelector);
			chai.expect(compare1.equals(compare2)).to.equal(false);
			chai.expect(compare2.equals(compare1)).to.equal(false);
		});

		it('it returns false if compared with a Compare unequal on the second part', function () {
			var compare1 = new Compare(['generalCompare', 'eq'], equalSelector, unequalSelector),
				compare2 = new Compare(['generalCompare', 'eq'], equalSelector, unequalSelector);
			chai.expect(compare1.equals(compare2)).to.equal(false);
			chai.expect(compare2.equals(compare1)).to.equal(false);
		});

		it('it returns false if compared with an unequal other Compare', function () {
			var compare1 = new Compare(['generalCompare', 'eq'], unequalSelector, unequalSelector),
				compare2 = new Compare(['generalCompare', 'eq'], unequalSelector, unequalSelector);
			chai.expect(compare1.equals(compare2)).to.equal(false);
			chai.expect(compare2.equals(compare1)).to.equal(false);
		});
	});
});
