import { flattenObject } from "./utils";

describe('utils', () => {
  describe('flattenObject', () => {
    it('flattens nested properties into flat object', () => {
      const nestedObject = {
        foo: 'foo',
        bar:  {
          baz: 'baz',
          bla: {
            more: 'more'
          }
        }
      }

      const expected = {
        foo: 'foo',
        baz: 'baz',
        more: 'more',
      }

      expect(flattenObject(nestedObject)).toMatchObject(expected)
    })
  })
})