
import {expect} from 'chai';
import {mapRecipesToItems} from 'utils/recipes';

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
		.to.equal('/recipes/' + mockRecipes[0].slug);
	});
  });

});