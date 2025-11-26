import { fn } from '../../src'

test('Deve ordenar a string corretamente', () => {
    const texto = fn.str.ordenar('réservé', 'RESERVE')
    expect(texto).toBe(0)
})

test('Deve inserir na string corretamente', () => {
    const texto = fn.str.inserirEm('123456789', 3, '0')
    expect(texto).toBe('1230456789')
})

test('Deve retornar as iniciais na string corretamente', () => {
    expect(fn.str.iniciais('Hello World')).toBe('HW')
    expect(fn.str.iniciais('Leonardo')).toBe('LE')
    expect(fn.str.iniciais()).toBe('AL')
})
