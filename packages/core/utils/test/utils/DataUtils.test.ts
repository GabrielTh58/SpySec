import { fn } from '../../src'

test('Deve somar um dia e entrar no próximo ano', () => {
    const dt = new Date('2020/12/31')
    const proximoAno = fn.dt.adicionarDias(dt, 1)
    expect(proximoAno.getFullYear()).toBe(2021)
    expect(proximoAno.getMonth()).toBe(0)
    expect(proximoAno.getDate()).toBe(1)
})

test('Deve ir para o último dia do próximo mês', () => {
    const dt = new Date('2020/1/31')
    const proximoMes = fn.dt.adicionarMeses(dt, 1)
    expect(proximoMes.getFullYear()).toBe(2020)
    expect(proximoMes.getMonth()).toBe(1)
    expect(proximoMes.getDate()).toBe(29)
})

test('Deve somar dois anos a uma data', () => {
    const dt = new Date('2020/04/04')
    const dt2 = fn.dt.adicionarAnos(dt, 2)
    expect(dt2.getFullYear()).toBe(2022)
    expect(dt2.getMonth()).toBe(3)
    expect(dt2.getDate()).toBe(4)
})

test('Deve retornar a menor data', () => {
    const dates = [new Date('2000/1/10'), new Date('2000/2/1'), new Date('2000/1/1')]
    const menor = fn.dt.min(...dates)
    expect(menor).toStrictEqual(new Date('2000/1/1'))
})

test('Deve retornar a menor data como nula', () => {
    const menor = fn.dt.min()
    expect(menor).toBeNull()
})

test('Deve retornar a maior data', () => {
    const dates = [new Date('2000/1/1'), new Date('2000/2/1'), new Date('2000/1/20')]
    const maior = fn.dt.max(...dates)
    expect(maior).toStrictEqual(new Date('2000/2/1'))
})

test('Deve retornar a maior data como nula', () => {
    const maior = fn.dt.max()
    expect(maior).toBeNull()
})

test('Deve retornar meses entre duas datas', () => {
    const dif = fn.dt.mesesEntre(new Date('2000/1/1'), new Date('2000/2/1'))
    expect(dif).toStrictEqual([new Date('2000/1'), new Date('2000/2')])
})

test('Deve gerar datas (entre duas datas) com intervalos de um dia', () => {
    const datas = fn.dt.diasEntre(new Date('2000/1/1'), new Date('2000/1/31'))
    const meses = datas.map((dt) => dt.getMonth() + 1).every((m) => m === 1)
    const anos = datas.map((dt) => dt.getFullYear()).every((a) => a === 2000)
    expect(anos).toBe(true)
    expect(meses).toBe(true)
    expect(datas.length).toBe(31)
    expect(datas[0]!.getDate()).toBe(1)
    expect(datas[30]!.getDate()).toBe(31)
})

test('Deve gerar datas (entre duas datas) com intervalos de um ano', () => {
    const datas = fn.dt.anosEntre(new Date('2000/2/1'), new Date('2018/12/31'))
    const dias = datas.map((dt) => dt.getDate()).every((d) => d === 1)
    const meses = datas.map((dt) => dt.getMonth() + 1).every((m) => m === 2)
    const anos = datas.map((dt) => dt.getFullYear())
    expect(dias).toBe(true)
    expect(meses).toBe(true)
    expect(anos.length).toBe(19)
    expect(anos[0]).toBe(2000)
    expect(anos[18]).toBe(2018)
})

test('Deve ignorar geração das datas', () => {
    const datas = fn.dt.anosEntre(null as any, null as any)
    expect(datas.length).toBe(0)
})

test('Deve verificar se as datas estão em dias diferentes', () => {
    const dif = fn.dt.emDiasDiferentes(new Date('2000/1/1'), new Date('2000/1/2'))
    const otherDif = fn.dt.emDiasDiferentes(new Date('2000/1/1'), new Date('2000/1/1'))
    expect(dif).toBe(true)
    expect(otherDif).toBe(false)
})

test('Deve verificar se as datas estão em meses diferentes', () => {
    const dif = fn.dt.emMesesDiferentes(new Date('2000/1/1'), new Date('2000/2/1'))
    const otherDif = fn.dt.emMesesDiferentes(new Date('2000/1/1'), new Date('2000/1/1'))
    expect(dif).toBe(true)
    expect(otherDif).toBe(false)
})

test('Deve verificar se as datas estão em anos diferentes', () => {
    const dif = fn.dt.emAnosDiferentes(new Date('2000/1/1'), new Date('2001/1/1'))
    const otherDif = fn.dt.emAnosDiferentes(new Date('2000/1/1'), new Date('2000/1/1'))
    expect(dif).toBe(true)
    expect(otherDif).toBe(false)
})

test('Deve verificar se as datas estão no mesmo dia', () => {
    const r1 = fn.dt.mesmoDia(new Date('2000/1/1'), new Date('2000/1/1'))
    const r2 = fn.dt.mesmoDia(new Date('2000/1/1'), new Date('2001/1/2'))
    const r3 = fn.dt.mesmoDia(new Date('2000/1/1'), null as any)
    const r4 = fn.dt.mesmoDia(null as any, null as any)
    expect([r1, r2, r3, r4]).toStrictEqual([true, false, false, false])
})

test('Deve verificar se as datas estão no mesmo mes', () => {
    const r1 = fn.dt.mesmoMes(new Date('2000/1/1'), new Date('2000/1/1'))
    const r2 = fn.dt.mesmoMes(new Date('2000/1/1'), new Date('2000/2/1'))
    const r3 = fn.dt.mesmoMes(new Date('2000/1/1'), null as any)
    const r4 = fn.dt.mesmoMes(null as any, null as any)
    expect([r1, r2, r3, r4]).toStrictEqual([true, false, false, false])
})

test('Deve verificar se as datas estão no mesmo ano', () => {
    const r1 = fn.dt.mesmoAno(new Date('2000/1/1'), new Date('2000/2/1'))
    const r2 = fn.dt.mesmoAno(new Date('2000/1/1'), new Date('2001/2/1'))
    const r3 = fn.dt.mesmoAno(new Date('2000/1/1'), null as any)
    const r4 = fn.dt.mesmoAno(null as any, null as any)
    expect([r1, r2, r3, r4]).toStrictEqual([true, false, false, false])
})

test('Deve subtrair a quantidade de anos de uma data', () => {
    const dif = fn.dt.subtrairAnos(new Date('2000/1/1'), 2)
    expect(dif).toStrictEqual(new Date('1998/1/1'))
})

test('Deve subtrair a quantidade de dias de uma data', () => {
    const dif = fn.dt.subtrairDias(new Date('2000/1/1'), 2)
    expect(dif).toStrictEqual(new Date('1999/12/30'))
})

test('Deve subtrair a quantidade de meses de uma data', () => {
    const dif = fn.dt.subtrairMeses(new Date('2000/1/1'), 2)
    expect(dif).toStrictEqual(new Date('1999/11/1'))
})

test('Deve retornar o primeiro dia do mes', () => {
    const v1 = fn.dt.primeiroDiaDoMes(new Date('2000/1/1'))
    expect(v1).toStrictEqual(new Date('2000/1/1'))

    const v2 = fn.dt.primeiroDiaDoMes(new Date('2000/1/30'))
    expect(v2).toStrictEqual(new Date('2000/1/1'))
})

test('Deve retornar o último dia do mes', () => {
    const v1 = fn.dt.ultimoDiaDoMes(new Date('2000/1/1'))
    expect(v1).toStrictEqual(new Date('2000/1/31'))

    const v2 = fn.dt.ultimoDiaDoMes(new Date('2000/1/31'))
    expect(v2).toStrictEqual(new Date('2000/1/31'))
})

test('Deve calcular a diferenca em anos entre duas datas', () => {
    const dif1 = fn.dt.diferencaEmAnos(new Date('2000/1/1'), new Date('2020/1/1'))
    expect(dif1).toBe(20)

    const dif2 = fn.dt.diferencaEmAnos(new Date('2000/1/1'), new Date('2000/2/1'))
    expect(dif2).toBe(0)
})

test('Deve calcular a diferenca em dias entre duas datas', () => {
    const dif = fn.dt.diferencaEmDias(new Date('2000/1/1'), new Date('2000/1/2'))
    expect(dif).toBe(1)
})

test('Deve calcular a diferenca em meses entre duas datas', () => {
    const dif = fn.dt.diferencaEmMeses(new Date('2000/1/1'), new Date('2000/2/1'))
    expect(dif).toBe(1)
})

test('Deve subtrair meses corretamente', () => {
    const dataRef = new Date(`2023/04/01`)
    const ultimos12Meses = Array(12)
        .fill(0)
        .map((_, i) => fn.dt.subtrairMeses(dataRef, i))
        .reverse()

    expect(ultimos12Meses[0]).toEqual(new Date(`2022/05/01`))
    expect(ultimos12Meses[1]).toEqual(new Date(`2022/06/01`))
    expect(ultimos12Meses[11]).toEqual(dataRef)
})

test('Deve manter atributo do tipo date', () => {
    const obj = null
    const novoObj = fn.dt.converterDataFS(obj)
    expect(novoObj).toBeNull()
})

test('Deve manter atributo do tipo date', () => {
    const obj = {
        nome: 'teste',
        data: new Date('2020/1/1'),
    }
    const novoObj = fn.dt.converterDataFS(obj)
    expect(novoObj.nome).toBe(obj.nome)
    expect(novoObj.data).toBe(obj.data)
})

test('Deve converter se tiver função toDate', () => {
    const obj = {
        nome: 'teste',
        data: { toDate: () => new Date('2020/1/1') },
    }
    const novoObj = fn.dt.converterDataFS(obj)
    expect(novoObj.nome).toBe(obj.nome)
    expect(novoObj.data.getTime()).toBe(obj.data.toDate().getTime())
})

test('Deve converter se tiver função toDate em um objeto', () => {
    const obj = {
        nome: 'teste',
        outro: {
            data: { toDate: () => new Date('2020/1/1') },
        },
    }
    const novoObj = fn.dt.converterDataFS(obj)
    expect(novoObj.nome).toBe(obj.nome)
    expect(novoObj.outro.data.getTime()).toBe(obj.outro.data.toDate().getTime())
})

test('Deve converter se tiver função toDate em um array', () => {
    const obj = {
        nome: 'teste',
        outros: [
            { data: { toDate: () => new Date('2020/1/1') } },
            { data: { toDate: () => new Date('2020/1/2') } },
            { data: { toDate: () => new Date('2020/1/3') } },
        ],
    }
    const novoObj = fn.dt.converterDataFS(obj)
    expect(novoObj.nome).toBe(obj.nome)
    expect(novoObj.outros[0].data.getTime()).toBe(obj.outros[0]!.data.toDate().getTime())
    expect(novoObj.outros[1].data.getTime()).toBe(obj.outros[1]!.data.toDate().getTime())
    expect(novoObj.outros[2].data.getTime()).toBe(obj.outros[2]!.data.toDate().getTime())
})

test('Deve gerar os últimos 12 meses', () => {
    const meses = fn.dt.ultimos12Meses(new Date('2020/6/1'))
    expect(meses.length).toBe(12)
    expect(meses[0]!.getTime()).toBe(new Date('2019/7/1').getTime())
    expect(meses[6]!.getTime()).toBe(new Date('2020/1/1').getTime())
    expect(meses[11]!.getTime()).toBe(new Date('2020/6/1').getTime())
})

test('Deve gerar os meses do ano', () => {
    const meses = fn.dtfmt.mesesDoAno()
    expect(meses.length).toBe(12)
    expect(meses[0]).toBe('Jan')
    expect(meses[11]).toBe('Dez')
})
