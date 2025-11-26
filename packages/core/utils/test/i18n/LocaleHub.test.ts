import { Locale, LocaleHub } from '../../src'

test('Deve ter português como lingua padrão', () => {
    expect(LocaleHub.lingua).toBe('pt-BR')
    expect(LocaleHub.moeda).toBe('BRL')
})

test('Deve obter locale', () => {
    expect(LocaleHub.obter('pt-BR')).not.toBeNull()
    const enUS: Locale = { lingua: 'en-US', moeda: '', erros: [] }
    expect(LocaleHub.obter(enUS)?.moeda).toBe('USD')
})

test('Deve adicionar erro', () => {
    LocaleHub.addErros('pt-BR', [{ tipo: 'nulo', msg: () => 'Valor nulo' }])
    LocaleHub.addErros('en-US', [{ tipo: 'nulo', msg: () => 'Null value' }])

    expect(LocaleHub.erros[0]?.msg?.()).toBe('Valor nulo')

    LocaleHub.selecionar('en-US')
    expect(LocaleHub.erros[0]?.msg?.()).toBe('Null value')
})

test('Deve adicionar locale', () => {
    const naoExiste = LocaleHub.obter('fr-FR')
    expect(naoExiste).toBeNull()

    LocaleHub.addLocales([
        { lingua: 'fr-FR', moeda: 'EUR', erros: [{ tipo: 'nulo', msg: () => 'Valeur nulle' }] },
    ])
    LocaleHub.selecionar('fr-FR')
    expect(LocaleHub.erros[0]?.msg?.()).toBe('Valeur nulle')
})
