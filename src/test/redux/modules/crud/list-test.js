
import {expect} from 'chai';
import moduleCreator from 'redux/modules/crud/list';
const recipeModule=  moduleCreator('recipes','recipes');
const reducer = recipeModule.reducer;

describe('redux/modules/crud/list', () => {

  describe('reducer', () => {

    describe('REQUEST_LIST action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);
        action= {
          type: 'vegan-recipes/recipes/REQUEST_LIST'
        };
        state=reducer(originalState, action);
      })

      it('should update state with didInvalidate ', () => {
        
        expect(state).to.have.property('didInvalidate')
          .to.be.false;

      });

      it('should update state with isFetching ', () => {
      
        expect(state).to.have.property('isFetching')
          .to.be.true;

      });
    });

    describe('REQUEST_SUCCESS action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);

        action= {
          type: 'vegan-recipes/recipes/REQUEST_LIST_SUCCESS',
          result: [1]
        };
        state=reducer(originalState, action);
      })

      it('should update state with didInvalidate ', () => {
        
        expect(state).to.have.property('didInvalidate')
          .to.be.false;
      });

      it('should update state with isFetching ', () => {
      
        expect(state).to.have.property('isFetching')
          .to.be.false;
      });

       it('should assign action result to items', () => {
      
        expect(state).to.have.property('items')
          .to.equal(action.result);
      });
    });

       describe('REQUEST_LIST_FAIL action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);

        action= {
          type: 'vegan-recipes/recipes/REQUEST_LIST_FAIL',
          error: [1]
        };
        state=reducer(originalState, action);
      })

      it('should update state with didInvalidate ', () => {
        
        expect(state).to.have.property('didInvalidate')
          .to.be.true;
      });

      it('should update state with isFetching ', () => {
      
        expect(state).to.have.property('isFetching')
          .to.be.false;
      });

       it('should assign error result to list', () => {
      
        expect(state).to.have.property('error')
          .to.equal(action.error);
      });
    });
  
  });

});