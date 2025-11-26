import { fn } from '../../src'

test('Deve retornar duas casas decimais', () => {
    expect(fn.num.duasCasasDecimais(1.2345)).toBe(1.23)
    expect(fn.num.duasCasasDecimais(1.2355)).toBe(1.24)
})

test('Deve verificar se é número', () => {
    expect(fn.num.ehNumero(1)).toBe(true)
    expect(fn.num.ehNumero(1.1)).toBe(true)
    expect(fn.num.ehNumero('1')).toBe(true)
    expect(fn.num.ehNumero('1.1')).toBe(true)
    expect(fn.num.ehNumero('1,1')).toBe(false)
    expect(fn.num.ehNumero('a')).toBe(false)
    expect(fn.num.ehNumero(null)).toBe(false)
    expect(fn.num.ehNumero({})).toBe(false)
    expect(fn.num.ehNumero([])).toBe(false)
    expect(fn.num.ehNumero(undefined)).toBe(false)
    expect(fn.num.ehNumero(NaN)).toBe(false)
})

test('Deve retornar o menor número', () => {
    expect(fn.num.min(1, 2, 3, -13, 500)).toBe(-13)
})

test('Deve retornar o maior número', () => {
    expect(fn.num.max(1, 2, 3, -13, 500)).toBe(500)
})

test('Deve retornar o percentual', () => {
    expect(fn.num.percentual(1, 0)).toBe(Infinity)
    expect(fn.num.percentual(1, 2)).toBe(50)
    expect(fn.num.percentual(1, 2, 1)).toBe(50)
    expect(fn.num.percentual(2, 1)).toBe(200)
    expect(fn.num.percentual(1, 3, 1)).toBe(33.3)
    expect(fn.num.percentual(1, 3, 2)).toBe(33.33)
})
