import { fn } from '../../src'

test('Deve criar array', () => {
    const arr = fn.arr.itens(1, 2, 3).valor
    expect(arr).toStrictEqual([1, 2, 3])
})

test('Deve adicionar itens', () => {
    const arr = fn.arr.itens([1, 2]).add(3).valor
    expect(arr).toStrictEqual([1, 2, 3])
})

test('Deve retornar o primeiro item', () => {
    const primeiro = fn.arr.itens('a', 'b', 'c').primeiro
    expect(primeiro).toBe('a')
})

test('Deve retornar o último item', () => {
    const ultimo = fn.arr.itens('a', 'b', 'c').ultimo
    expect(ultimo).toBe('c')
})

test('Deve criar array vazio', () => {
    expect(fn.arr.itens().vazio).toBe(true)
})

test('Deve criar array com itens nulos', () => {
    const arr = fn.arr.itens(null, undefined, 1, null, 2, 3)
    expect(arr.validos().primeiro).toBe(1)
    expect(arr.validos().ultimo).toBe(3)
})

test('Deve filtrar itens', () => {
    const maiorQue10 = (n: number) => n > 10
    const menorQue20 = (n: number) => n < 20
    const arr = fn.arr.itens(13, 2, 17, 30, 15, 40).filtrar(maiorQue10, menorQue20)
    expect(arr.primeiro).toBe(13)
    expect(arr.ultimo).toBe(15)
})

test('Deve encontrar itens', () => {
    const maiorQue10 = (n: number) => n > 10
    const menorQue20 = (n: number) => n < 20
    const item = fn.arr.itens(13, 2, 17, 30, 15, 40).encontrar(maiorQue10, menorQue20)
    expect(item).toBe(13)
})

test('Deve retornar nulo quando não encontrar itens', () => {
    const maiorQue10 = (n: number) => n > 10
    const menorQue20 = (n: number) => n < 20
    const item = fn.arr.itens(2, 30, 40).encontrar(maiorQue10, menorQue20)
    expect(item).toBeNull()
})
