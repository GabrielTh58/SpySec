import { IdUnico } from '../../src'

test('Deve gerar um id único', () => {
    const id = IdUnico.gerar()
    expect(id.length).toBe(36)
})
