import {expect} from 'chai';
import valueStringHelper from 'components/Form/OptionGroup/valueStringHelper';

describe('Value String Helper', function () {
  const delimiterA = "/";
  const delimiterB = ":";
  let myValueStringHelper;

  before(() => {

    myValueStringHelper = Object.create(valueStringHelper,
      {
        delimiterA: {value:delimiterA},
        delimiterB:{value: delimiterB}
    });
  });

  describe('getMultiValueString', function () {
    it('should add new item to string', function () {
      expect(myValueStringHelper.getMultiValueString('test:val', 'test2', 'val')).to.equal('test:val/test2:val');
    });

    it('should remove exisitng item string', function () {
      expect(myValueStringHelper.getMultiValueString('test:val/test2:val', 'test2', false)).to.equal('test:val');
    });

    it('should update exisitng item string', function () {
          expect(myValueStringHelper.getMultiValueString('test:val/test2:val', 'test2', 'val2')).to.equal('test:val/test2:val2');
    });

  });
  describe('getItemValueString', function () {

    it('should generate string value from id and value', function () {
      expect(myValueStringHelper.getItemValueString('id', 'test')).to.equal('id:test');
    });

    it('should set empty string for true value', function () {
      expect(myValueStringHelper.getItemValueString('id', true)).to.equal('id');
    });

    it('should retuen empty for value false', function () {
      expect(myValueStringHelper.getItemValueString('id', false)).to.equal('');
    });


  });
  describe('getValueFromValueString', function () {
    
    it('should retrive the value of the specified id from the value string', function () {
      expect(myValueStringHelper.getValueFromValueString('id:test', 'id')).to.equal('test');
    });

    it('should return true if value empty', function () {
      expect(myValueStringHelper.getValueFromValueString('id', 'id')).to.equal(true);
    });

    it('should return false if not specified', function () {
      expect(myValueStringHelper.getValueFromValueString('id2:val', 'id')).to.equal(false);
    });
  });


});

