import { Tradutor, LocaleHub } from '../../src'

test('Deve traduzir corretamente as mensagens', () => {
    LocaleHub.addErros('pt-BR', [
        { tipo: 'nulo', msg: () => 'Valor nulo' },
        { tipo: 'nulo', atr: 'nome', msg: () => 'Nome nulo' },
    ])
    const msgs = Tradutor.traduzirErros([{ tipo: 'nulo' }, { tipo: 'nulo', atr: 'nome' }])
    expect(msgs).toStrictEqual(['Valor nulo', 'Nome nulo'])
})
