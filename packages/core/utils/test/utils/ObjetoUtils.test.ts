import { fn } from '../../src'

test('Deve verificar se são objetos iguais corretamente', () => {
    const o1 = { a: 1, b: 2 }
    const o2 = { a: 1, b: 2 }
    const o3 = { a: 1, b: 2, c: 3 }
    expect(fn.obj.iguais(o1, o2)).toBe(true)
    expect(fn.obj.iguais(o1, o3)).toBe(false)
    expect(fn.obj.iguais(o1, null)).toBe(false)
    expect(fn.obj.iguais(null, o2)).toBe(false)
    expect(fn.obj.iguais(null, null)).toBe(true)
    expect(fn.obj.iguais('', '')).toBe(true)
    expect(fn.obj.iguais(new Date(), new Date())).toBe(true)
    expect(fn.obj.iguais(3, '')).toBe(false)
})

test('Deve trocar atributos undefined por null corretamente', () => {
    const objUm = { a: 1, b: undefined, c: 3, d: undefined, e: { f: undefined } }
    const trocar = fn.obj.undefinedParaNull(objUm)
    expect(trocar).toStrictEqual({ a: 1, b: null, c: 3, d: null, e: { f: null } })
})

test('Deve se é objeto corretamente', () => {
    const obj = { a: 1, b: 2 }
    const ehObjeto = fn.obj.ehObjeto(obj)

    expect(ehObjeto).toBe(true)
})

test('Deve manter os atributos do objeto corretamente', () => {
    const obj = { a: 1, b: 2 }
    expect(fn.obj.manterAtribs(obj, ['a'])).toStrictEqual({ a: 1 })
    expect(fn.obj.manterAtribs(obj, [])).toStrictEqual({})
})

test('Deve remover os atributos do objeto corretamente', () => {
    const obj = { a: 1, b: 2 }
    expect(fn.obj.removerAtribs(obj, ['a'])).toStrictEqual({ b: 2 })
    expect(fn.obj.removerAtribs(obj, [])).toStrictEqual({ a: 1, b: 2 })
})

test('Deve obter valor pelo caminho', () => {
    const obj = { a: 1, b: 2, c: { d: 3 } }
    const valor = fn.obj.obterValor(obj, 'c.d')
    expect(valor).toBe(3)
})

test('Deve alterar valor pelo caminho', () => {
    const obj = { a: 1, b: 2, c: { d: 3 } }
    const novoObj = fn.obj.alterarValor(obj, 'c.d', 7)
    expect(novoObj.c.d).toBe(7)
})

test('Deve alterar valor pelo caminho com undefined', () => {
    const obj = {}
    const novoObj = fn.obj.alterarValor(obj, 'c.d', 7)
    expect(novoObj.c.d).toBe(7)
})
