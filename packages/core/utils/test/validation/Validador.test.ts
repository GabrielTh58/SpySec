import { Validador } from '../../src'

test('Deve validar como nulo', () => {
    const err = Validador.nulo('erro', null)
    expect(err).toBeNull()
})

test('Deve retornar erro quando não nulo', () => {
    const err = Validador.nulo('erro', 'valor')
    expect(err).toBe('erro')
})

test('Deve validar como nulo ou vazio', () => {
    const e1 = Validador.nuloOuVazio('erro', null)
    const e2 = Validador.nuloOuVazio('erro', '')
    expect([e1, e2]).toEqual([null, null])
})

test('Deve retornar erro quando não nulo e não vazio', () => {
    const err = Validador.nuloOuVazio('erro', 'valor')
    expect(err).toBe('erro')
})

test('Deve validar como não nulo', () => {
    const err = Validador.naoNulo('erro', 'valor')
    expect(err).toBeNull()
})

test('Deve retornar erro quando nulo', () => {
    const e1 = Validador.naoNulo('erro', null)
    const e2 = Validador.naoNulo('erro', undefined)
    expect([e1, e2]).toEqual(['erro', 'erro'])
})

test('Deve validar como não nulo ou vazio', () => {
    const err = Validador.naoNuloOuVazio('erro', 'valor')
    expect(err).toBeNull()
})

test('Deve retornar erro quando nulo ou vazio', () => {
    const e1 = Validador.naoNuloOuVazio('erro', null)
    const e2 = Validador.naoNuloOuVazio('erro', undefined)
    const e3 = Validador.naoNuloOuVazio('erro', '')
    expect([e1, e2, e3]).toEqual(['erro', 'erro', 'erro'])
})

test('Deve validar como maior que', () => {
    const err = Validador.maiorQue('erro', 2, 1)
    expect(err).toBeNull()
})

test('Deve retornar erro quando não maior que', () => {
    const e1 = Validador.maiorQue('erro', 1, 2)
    const e2 = Validador.maiorQue('erro', 1, 1)
    expect([e1, e2]).toEqual(['erro', 'erro'])
})

test('Deve validar como maior ou igual que', () => {
    const e1 = Validador.maiorOuIgualQue('erro', 2, 1)
    const e2 = Validador.maiorOuIgualQue('erro', 1, 1)
    expect([e1, e2]).toEqual([null, null])
})

test('Deve retornar erro quando não maior ou igual que', () => {
    const err = Validador.maiorOuIgualQue('erro', 1, 2)
    expect(err).toBe('erro')
})

test('Deve validar como menor que', () => {
    const err = Validador.menorQue('erro', 1, 2)
    expect(err).toBeNull()
})

test('Deve retornar erro quando não menor que', () => {
    const e1 = Validador.menorQue('erro', 2, 1)
    const e2 = Validador.menorQue('erro', 1, 1)
    expect([e1, e2]).toEqual(['erro', 'erro'])
})

test('Deve validar como menor ou igual que', () => {
    const e1 = Validador.menorOuIgualQue('erro', 1, 2)
    const e2 = Validador.menorOuIgualQue('erro', 1, 1)
    expect([e1, e2]).toEqual([null, null])
})

test('Deve retornar erro quando não menor ou igual que', () => {
    const err = Validador.menorOuIgualQue('erro', 2, 1)
    expect(err).toBe('erro')
})

test('Deve validar como entre', () => {
    const e1 = Validador.entre('erro', 1, 0, 2)
    const e2 = Validador.entre('erro', 1, 1, 2)
    const e3 = Validador.entre('erro', 1, 0, 1)
    expect([e1, e2, e3]).toEqual([null, null, null])
})

test('Deve retornar erro quando não entre', () => {
    const e1 = Validador.entre('erro', 0, 1, 2)
    const e2 = Validador.entre('erro', 3, 1, 2)
    expect([e1, e2]).toEqual(['erro', 'erro'])
})

test('Deve validar como email', () => {
    const e1 = Validador.email('erro', 'usuario@zmail.com')
    const e2 = Validador.email('erro', 'usu.ario@empresa.com.br')
    expect([e1, e2]).toEqual([null, null])
})

test('Deve retornar erro quando não email', () => {
    const e1 = Validador.email('erro', 'usuario@zmail')
    const e2 = Validador.email('erro', 'usu.ario@empresa')
    expect([e1, e2]).toEqual(['erro', 'erro'])
})

test('Deve validar como senha', () => {
    const e1 = Validador.senha('erro', 'Senha@123')
    const e2 = Validador.senha('erro', 'Senha@123456')
    expect([e1, e2]).toEqual([null, null])
})

test('Deve retornar erro quando não senha', () => {
    const e1 = Validador.senha('erro', 'senha@123')
    const e2 = Validador.senha('erro', 'Senha123')
    expect([e1, e2]).toEqual(['erro', 'erro'])
})

test('Deve validar como cor em hexa', () => {
    const e1 = Validador.corEmHexa('erro', '#000000')
    const e2 = Validador.corEmHexa('erro', '#FFFFFF')
    const e3 = Validador.corEmHexa('erro', '#000')
    const e4 = Validador.corEmHexa('erro', '#FFF')
    expect([e1, e2, e3, e4]).toEqual([null, null, null, null])
})

test('Deve retornar erro quando não cor em hexa', () => {
    const e1 = Validador.corEmHexa('erro', '#00000')
    const e2 = Validador.corEmHexa('erro', '#FFFFFFF')
    const e3 = Validador.corEmHexa('erro', '#0000')
    const e4 = Validador.corEmHexa('erro', '#FFFFF')
    expect([e1, e2, e3, e4]).toEqual(['erro', 'erro', 'erro', 'erro'])
})

test('Deve validar como url', () => {
    const e1 = Validador.url('erro', 'http://www.google.com')
    const e2 = Validador.url('erro', 'https://www.google.com')
    const e3 = Validador.url('erro', 'http://google.com')
    const e4 = Validador.url('erro', 'https://google.com')
    const e5 = Validador.url('erro', 'http://www.google.com.br')
    const e6 = Validador.url('erro', 'https://www.google.com.br')
    const e7 = Validador.url('erro', 'http://google.com.br')
    const e8 = Validador.url('erro', 'https://google.com.br')
    expect([e1, e2, e3, e4, e5, e6, e7, e8]).toEqual([null, null, null, null, null, null, null, null])
})

test('Deve retornar erro quando não url', () => {
    const e1 = Validador.url('erro', 'www.google.com')
    const e2 = Validador.url('erro', 'google.com')
    const e3 = Validador.url('erro', 'google')
    expect([e1, e2, e3]).toEqual(['erro', 'erro', 'erro'])
})