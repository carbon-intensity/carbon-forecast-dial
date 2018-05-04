import replaceSpacesWithDashes from './index.js';

test('type to be string', () => {
  expect(typeof replaceSpacesWithDashes('this is a test')).toBe('string');
});

test('postitive test', () => {
  expect(replaceSpacesWithDashes('this is a test')).toBe('this-is-a-test');
  expect(replaceSpacesWithDashes('%20 thing ')).toBe('%20-thing-');
  expect(replaceSpacesWithDashes(' ')).toBe('-');
});

test('negative test', () => {
  expect(replaceSpacesWithDashes('this is a test')).not.toBe('this is a test');
  expect(replaceSpacesWithDashes('%20 thing ')).not.toBe('%20 thing ');
  expect(replaceSpacesWithDashes(' ')).not.toBe(' ');
});