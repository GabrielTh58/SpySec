import { fn } from '../../src'

test('Deve formatar moeda', () => {
    expect(fn.moeda.num(1).valor).toBe('R$ 1,00')
    expect(fn.moeda.num(1567.9).valor).toBe('R$ 1.567,90')
    expect(fn.moeda.num(1567.9).formatar('en-US')).toBe('$1,567.90')
})

test('Deve retornar apenas o simbolo', () => {
    expect(fn.moeda.simbolo()).toBe('R$')
    expect(fn.moeda.simbolo('en-US')).toBe('$')
})

test('Deve retornar apenas o valor', () => {
    expect(fn.moeda.num(1234.56).somenteValor()).toBe('1.234,56')
    expect(fn.moeda.num(1234.56).somenteValor('en-US')).toBe('1,234.56')
})

test('Deve desformatar moeda', () => {
    expect(fn.moeda.desformatar('R$ 1,00')).toBe(1)
    expect(fn.moeda.desformatar('R$ 1.234,56')).toBe(1234.56)
    expect(fn.moeda.desformatar('$1,234.56')).toBe(1234.56)
    expect(fn.moeda.desformatar('opa')).toBe(0)
})
