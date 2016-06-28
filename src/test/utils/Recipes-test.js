
import {expect} from 'chai';
import {mapRecipesToItems, getURL, getURLWithSlug} from 'utils/recipes';

const mockRecipes=[
	{
		title: 'title 1',
		description: 'description',
		slug: 'slug-1'
	},
	{
		title: 'title 2',
		description: 'description',
		slug: 'slug-2'
	}
];

describe('Recipe utils', () => {
  describe('mapRecipesToItems', () => {

  	it('should not change original objects', () => {
  		const frozenRecipes=[
			{
				title: 'title 1',
				description: 'description',
				slug: 'slug-1'
			}
		];
		Object.freeze(frozenRecipes);

		expect( () => {
			mapRecipesToItems(frozenRecipes)
			}).to.not.throw();

	});

	it('should return array', () => {
		expect(mapRecipesToItems(mockRecipes)).to.be.instanceof(Array);
	});

	it('should return correct number of items', () => {
		expect(mapRecipesToItems(mockRecipes)).to.have.lengthOf(mockRecipes.length);

	});

	it('should map title', () => {
		expect(mapRecipesToItems(mockRecipes)[0])
		.to.have.property('title')
		.to.equal(mockRecipes[0].title);
	});

	it('should map id', () => {
		expect(mapRecipesToItems(mockRecipes)[0])
		.to.have.property('id')
		.to.equal(mockRecipes[0].slug);
	});

	it('should map description', () => {
		expect(mapRecipesToItems(mockRecipes)[0])
		.to.have.property('description')
		.to.equal(mockRecipes[0].description);
	});

	it('should construct URL', () => {
		expect(mapRecipesToItems(mockRecipes)[0])
		.to.have.property('url')
		.to.equal('/recipe/' + mockRecipes[0].slug);
	});
 });

describe('getURL', () => {

	it('should return URL', () => {
		expect(getURL(mockRecipes[0]))
		.to.equal('/recipe/' + mockRecipes[0].slug);
	});

	it('should return URL with action', () => {
		expect(getURL(mockRecipes[0], 'update'))
		.to.equal('/recipe/' + mockRecipes[0].slug + '/update');
	});
});

describe('getURLWithSlug', () => {

	it('should return URL', () => {
		expect(getURLWithSlug('test'))
		.to.equal('/recipe/test');
	});

	it('should return URL with action', () => {
		expect(getURLWithSlug('test', 'update'))
		.to.equal('/recipe/test/update');
	});
});


});