
import {expect} from 'chai';
import reducer from 'redux/modules/deleteRecipe';

describe('redux/modules/viewRecipe', () => {

  describe('reducer', () => {

    describe('REQUEST_DELETE_RECIPE action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);
        action= {
          type: 'vegan-recipes/recipes/REQUEST_DELETE_RECIPE'
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

    describe('REQUEST_DELETE_RECIPE_SUCCESS action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);

        action= {
          type: 'vegan-recipes/recipes/REQUEST_DELETE_RECIPE_SUCCESS',
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

       it('should set isSuccess to true', () => {
      
        expect(state).to.have.property('isSuccess')
          .to.equal(true);
      });
    });

     describe('REQUEST_DELETE_RECIPE_FAIL action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);

        action= {
          type: 'vegan-recipes/recipes/REQUEST_DELETE_RECIPE_FAIL',
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

       it('should assign error result to error', () => {
      
        expect(state).to.have.property('error')
          .to.equal(action.error);
      });
    });

    describe('RESET_DELETE_RECIPE action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          error: 'val'
        };
        Object.freeze(originalState);
        action= {
          type: 'vegan-recipes/recipes/RESET_DELETE_RECIPE'
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

      it('should not have property error', () => {
      
        expect(state).to.have.property('error').to.equal(false);

      });

      it('should assign isSuccess to false', () => {
      
        expect(state).to.have.property('isSuccess')
          .to.equal(false);
      });
    });
  
  
  });

});