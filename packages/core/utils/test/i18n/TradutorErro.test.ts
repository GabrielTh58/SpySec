import TradutorErro from '../../src/i18n/TradutorErro'

const tradutorGeral = new TradutorErro([
    { tipo: 'nulo', msg: () => 'Valor nulo' },
    { tipo: 'nulo', atr: 'nome', msg: () => 'Nome nulo' },
])

const tradutorCliente = new TradutorErro([
    { tipo: 'nulo', atr: 'nome', cls: 'cliente', msg: () => 'Nome do cliente nulo' },
])

test('Deve traduzir mensagem apenas pelo tipo', () => {
    const msg = tradutorGeral.traduzir({ tipo: 'nulo' })
    expect(msg).toBe('Valor nulo')
})

test('Deve traduzir mensagem apenas pelo tipo e atributo', () => {
    const msg = tradutorGeral.traduzir({ tipo: 'nulo', atr: 'nome' })
    expect(msg).toBe('Nome nulo')
})

test('Deve traduzir mensagem apenas pelo tipo, atributo e classe', () => {
    const msg = tradutorGeral
        .agrupar(tradutorCliente)
        .traduzir({ tipo: 'nulo', atr: 'nome', cls: 'cliente' })
    expect(msg).toBe('Nome do cliente nulo')
})

test('Deve traduzir todas as mensagens', () => {
    const msgs = tradutorGeral
        .agrupar(tradutorCliente)
        .traduzirTudo([
            { tipo: 'nulo' },
            { tipo: 'nulo', atr: 'nome' },
            { tipo: 'nulo', atr: 'nome', cls: 'cliente' },
        ])
    expect(msgs).toStrictEqual(['Valor nulo', 'Nome nulo', 'Nome do cliente nulo'])
})

test('Deve retornar o tipo do erro', () => {
    const msg = tradutorGeral.traduzir({ tipo: 'vazio' })
    expect(msg).toBe('vazio')
})

test('Deve retornar o tipo do erro', () => {
    const msg = tradutorGeral.traduzir({ tipo: 'vazio' })
    expect(msg).toBe('vazio')
})

test('Deve retornar erro como string', () => {
    const msg = tradutorGeral.traduzir('vazio' as any)
    expect(msg).toBe('vazio')
})

test('Deve retornar erro desconhecido', () => {
    const msg = tradutorGeral.traduzir(3 as any)
    expect(msg).toBe('unknown error')
})

test('Deve traduzir tudo com parâmetro string', () => {
    const msgs = tradutorGeral.traduzirTudo('vazio' as any)
    expect(msgs).toStrictEqual(['vazio'])
})

test('Deve traduzir tudo removendo duplicados', () => {
    const msgs = tradutorGeral.traduzirTudo(['vazio', 'vazio'] as any)
    expect(msgs).toStrictEqual(['vazio'])
})

test('Deve traduzir tudo removendo duplicados', () => {
    const msg = tradutorGeral.traduzir({
        tipo: 'texto_pequeno',
        cls: 'cliente',
        atr: 'nome',
        valor: 'Lu',
        detalhes: { min: 3, max: 10 },
    })
    expect(msg).toBe('cliente.nome - texto_pequeno [Lu]')
})
