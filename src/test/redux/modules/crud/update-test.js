
import {expect} from 'chai';
import moduleCreator from 'redux/modules/crud/update';
const recipeModule=  moduleCreator('recipes','recipes');
const reducer = recipeModule.reducer;

describe('redux/modules/crud/update', () => {

  describe('reducer', () => {

    describe('REQUEST_UPDATE action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);
        action= {
          type: 'vegan-recipes/recipes/REQUEST_UPDATE'
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

       it('should assign isSuccess to false', () => {
      
        expect(state).to.have.property('isSuccess')
          .to.equal(false);
      });
    });

    describe('REQUEST_UPDATE_SUCCESS action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);

        action= {
          type: 'vegan-recipes/recipes/REQUEST_UPDATE_SUCCESS',
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

       it('should assign action result to entity', () => {
      
        expect(state).to.have.property('entity')
          .to.equal(action.result);
      });
       
       it('should assign isSuccess to true', () => {
      
        expect(state).to.have.property('isSuccess')
          .to.equal(true);
      });
    });

     describe('REQUEST_UPDATE_FAIL action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          prop: 'val'
        };
        Object.freeze(originalState);

        action= {
          type: 'vegan-recipes/recipes/REQUEST_UPDATE_FAIL',
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

        it('should assign isSuccess to false', () => {
      
        expect(state).to.have.property('isSuccess')
          .to.equal(false);
      });

    });


    describe('RESET_UPDATE action', () => {

      let originalState, action, state;
      
      before(() => {
        originalState={
          error: 'val'
        };
        Object.freeze(originalState);
        action= {
          type: 'vegan-recipes/recipes/RESET_UPDATE'
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