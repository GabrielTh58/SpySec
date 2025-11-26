import { fn } from '../../src'

test('Deve formatar ano corretamente', () => {
    const d1 = new Date('2025/01/01')
    expect(fn.dtfmt.data(d1).yy.valor).toBe('25')
    expect(fn.dtfmt.data(d1).yyyy.valor).toBe('2025')
})

test('Deve formatar mês corretamente', () => {
    const d1 = new Date('2025/01/01')
    expect(fn.dtfmt.data(d1).m.valor).toBe('1')
    expect(fn.dtfmt.data(d1).mm.valor).toBe('01')
    expect(fn.dtfmt.data(d1).mmm.valor).toBe('Jan')
    expect(fn.dtfmt.data(d1).mmmm.valor).toBe('Janeiro')
})

test('Deve formatar dia corretamente', () => {
    const d1 = new Date('2025/01/01')
    expect(fn.dtfmt.data(d1).d.valor).toBe('1')
    expect(fn.dtfmt.data(d1).dd.valor).toBe('01')
    expect(fn.dtfmt.data(d1).wd.valor).toBe('Qua')
    expect(fn.dtfmt.data(d1).wdd.valor).toBe('Quarta-feira')
})

test('Deve formatar hora corretamente', () => {
    const d1 = new Date('2025/01/01 8:23:45')
    expect(fn.dtfmt.data(d1).h.valor).toBe('8')
    expect(fn.dtfmt.data(d1).hh.valor).toBe('08')
})

test('Deve formatar minutos corretamente', () => {
    const d1 = new Date('2025/01/01 8:07:45')
    expect(fn.dtfmt.data(d1).i.valor).toBe('7')
    expect(fn.dtfmt.data(d1).ii.valor).toBe('07')
})

test('Deve formatar segundos corretamente', () => {
    const d1 = new Date('2025/01/01 8:07:05')
    expect(fn.dtfmt.data(d1).s.valor).toBe('5')
    expect(fn.dtfmt.data(d1).ss.valor).toBe('05')
})

test('Deve formatar com separadores', () => {
    const d1 = new Date('2025/01/01')
    expect(fn.dtfmt.data(d1).dd.slash.mm.hyphen.yyyy.space.valor).toBe('01/01-2025 ')
})

test('Deve formatar com separadores', () => {
    const d1 = new Date('2025/01/01')
    expect(fn.dtfmt.data(d1).wdd.formatar('en-US')).toBe('Wednesday')
})

test('Deve formatar data curta', () => {
    const d1 = new Date('2025/01/01')
    expect(fn.dtfmt.data(d1).curta.valor).toBe('01/01/2025')
})

test('Deve formatar data média', () => {
    const d1 = new Date('2025/01/01')
    expect(fn.dtfmt.data(d1).media.valor).toBe('01 de jan. de 2025')
})

test('Deve formatar data longa', () => {
    const d1 = new Date('2025/01/01')
    expect(fn.dtfmt.data(d1).longa.valor).toBe('01 de janeiro de 2025')
})

test('Deve gerar os meses do ano com locale', () => {
    const meses = fn.dtfmt.mesesDoAno('en-US')
    expect(meses.length).toBe(12)
    expect(meses[0]).toBe('Jan')
    expect(meses[11]).toBe('Dec')
})

test('Deve gerar os dias da semana', () => {
    const dias = fn.dtfmt.diasDaSemana()
    expect(dias.length).toBe(7)
    expect(dias[0]).toBe('Dom')
    expect(dias[6]).toBe('Sáb')
})

test('Deve formatar data de hoje', () => {
    const anoAtual = fn.dtfmt.hoje().yyyy.valor
    expect(anoAtual).toBe(new Date().getFullYear().toString())
})

test('Deve formatar com formatador personalizado', () => {
    const h = new Date()
    const valorEsperado = `${h.getFullYear()}#${h.getMonth() + 1}#${h.getDate()}`
    const valor = fn.dtfmt.hoje().separador('#').yyyy.m.d.valor
    expect(valor).toBe(valorEsperado)
})
