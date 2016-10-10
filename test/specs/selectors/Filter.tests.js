define([
	'fontoxml-selectors/selectors/Filter',
	'fontoxml-selectors/selectors/Specificity'
], function (
	Filter,
	Specificity
) {
	'use strict';

	var equalSelector = {
			specificity: new Specificity({}),
			equals: sinon.stub().returns(true)
		},
		unequalSelector = {
			specificity: new Specificity({}),
			equals: sinon.stub().returns(false)
		};

	describe('Filter.equals()', function () {
		it('returns true if compared with itself', function () {
			var filter1 = new Filter(equalSelector, [equalSelector]),
				filter2 = filter1;
			chai.expect(filter1.equals(filter2)).to.equal(true);
			chai.expect(filter2.equals(filter1)).to.equal(true);
		});

		it('it returns true if compared with an equal other Filter', function () {
			var filter1 = new Filter(equalSelector, [equalSelector]),
				filter2 = new Filter(equalSelector, [equalSelector]);
			chai.expect(filter1.equals(filter2)).to.equal(true);
			chai.expect(filter2.equals(filter1)).to.equal(true);
		});

		it('it returns false if compared with a Filter unequal for the first subSelector', function () {
			var filter1 = new Filter(unequalSelector, [equalSelector]),
				filter2 = new Filter(unequalSelector, [equalSelector]);
			chai.expect(filter1.equals(filter2)).to.equal(false);
			chai.expect(filter2.equals(filter1)).to.equal(false);
		});

		it('it returns false if compared with a Filter unequal for the one of the filter subselectors', function () {
			var filter1 = new Filter(equalSelector, [unequalSelector]),
				filter2 = new Filter(equalSelector, [unequalSelector]);
			chai.expect(filter1.equals(filter2)).to.equal(false);
			chai.expect(filter2.equals(filter1)).to.equal(false);
		});

		it('it returns false if compared with a Filter unequal for the second of the filter subselectors', function () {
			var filter1 = new Filter(equalSelector, [equalSelector, unequalSelector]),
				filter2 = new Filter(equalSelector, [equalSelector, unequalSelector]);
			chai.expect(filter1.equals(filter2)).to.equal(false);
			chai.expect(filter2.equals(filter1)).to.equal(false);
		});

		it('it returns false if compared with an unequal other Filter', function () {
			var filter1 = new Filter(unequalSelector, [unequalSelector]),
				filter2 = new Filter(unequalSelector, [unequalSelector]);
			chai.expect(filter1.equals(filter2)).to.equal(false);
			chai.expect(filter2.equals(filter1)).to.equal(false);
		});
	});
});
