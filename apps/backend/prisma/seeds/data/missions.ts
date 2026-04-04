export const missionsEixo01_Track01 = [
  {
    "title": "O Alvo Invisível",
    "description": "Entender por que seus dados valem dinheiro e começar a proteger informações básicas.",
    "xpReward": 40,
    "estimatedTime": 4,
    "category": "MINDSET",
    "order": 1,
    "iconUrl": "scan-face",
    "content": [
      {
        "id": "t1_m1_b1",
        "type": "INFO",
        "data": {
          "title": "Você não é o alvo. Seus dados são.",
          "text": "Criminosos raramente procuram pessoas específicas. Eles procuram informações reutilizáveis.\n\nNome, e-mail, telefone ou CPF parecem comuns isoladamente. Mas quando combinados, permitem criar perfis digitais capazes de enganar sistemas e pessoas.",
          "deepDive": "Na internet existe um mercado dedicado exclusivamente à compra e venda de dados vazados. Esses dados são organizados em perfis contendo múltiplas informações da mesma pessoa. Quanto mais completo o perfil, menor o esforço necessário para aplicar golpes, abrir contas falsas ou se passar pela vítima.\n\nO ataque não começa tentando invadir você diretamente. Ele começa reunindo informações suficientes para parecer legítimo.",
          "highlightBox": "Se seus dados não têm valor, por que existem mercados só para vendê-los?",
          "mascotMessage": "Perfil completo é diferente de dado isolado. " +
            "Um eu ignorava. O outro… bem. Vamos dizer que chamava atenção.",
        }
      },
      {
        "id": "t1_m1_b2",
        "type": "MATCHING",
        "data": {
          "question": "Associe o dado ao uso criminoso provável.",
          "pairs": [
            {
              leftId: "l1",
              leftText: "Nome completo",
              rightId: "r1",
              rightText: "Criar perfil convincente para se passar por você"
            },
            {
              leftId: "l2",
              leftText: "CPF",
              rightId: "r2",
              rightText: "Abertura de conta falsa ou empréstimo indevido"
            },
            {
              leftId: "l3",
              leftText: "Telefone",
              rightId: "r3",
              rightText: "SIM swap e golpes por ligação"
            }
          ],
          "feedbackSuccess": "Boa. Cada dado abre um tipo diferente de oportunidade para quem quer enganar.",
          "feedbackError": "Pense no que alguém conseguiria fazer fingindo ser você usando esse dado.",
          "mascotMessage": "Nome, telefone, CPF. Separados, inúteis. " +
            "Juntos, o suficiente para convencer qualquer sistema de que sou você."
        }
      },
      {
        "id": "t1_m1_b3",
        "type": "QUIZ",
        "data": {
          "question": "Qual afirmação é verdadeira?",
          options: [
            {
              id: "opt1",
              text: "Meus dados já estão por aí de qualquer forma, então não adianta proteger.",
            },
            {
              id: "opt2",
              text: "Dados simples como nome e e-mail são inúteis sozinhos.",
            },
            {
              id: "opt3",
              text: "Combinar dados de fontes diferentes facilita fraudes.",
            }
          ],
          "correctOptionId": "opt3",
          "feedbackSuccess": "Exatamente. Quanto mais convincente o perfil, maior a chance do golpe funcionar.",
          "feedbackError": "O perigo não está no dado sozinho, mas na combinação deles.",
          "explanation": "Com mais pontos de informação, o criminoso reduz verificações e aumenta sucesso.",
        }
      },
      {
        id: "t1_m1_b4",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você entendeu o princípio mais importante desta trilha: " +
            "o risco não está no dado isolado, mas na combinação deles. " +
            "Criminosos não precisam de muito, precisam de suficiente.",

          keyTakeaway:
            "Nome + e-mail + telefone + CPF = perfil completo para fraude.",

          nextMissionTeaser:
            "Na próxima missão, você vai mapear onde exatamente esses dados " +
            "seus já estão expostos agora, provavelmente mais do que você imagina.",

          xpEarned: 40,
          mascotMessage:
            "Primeiro passo dado. Agora você sabe o que eles procuram. " +
            "A próxima missão vai mostrar onde eles já estão olhando.",
        },
      },
    ],
  },

  {
    title: "Superfície de Ataque Pessoal",
    description:
      "Entender como contas, aplicativos e hábitos digitais aumentam sua exposição " +
      "e aprender a reduzir pontos reais de ataque.",
    xpReward: 45,
    estimatedTime: 5,
    category: "MINDSET",
    order: 2,
    iconUrl: "radar",
    content: [
      {
        id: "t1_m2_b1",
        type: "INFO",
        data: {
          title: "Você tem mais portas abertas do que imagina.",
          text:
            "Na missão anterior você viu o quanto seus dados valem quando combinados. " +
            "Agora a pergunta é: onde exatamente esses dados estão espalhados?\n\n" +
            "Pense em quantos serviços você já criou conta: lojas online, aplicativos " +
            "antigos, jogos, redes sociais, testes gratuitos, plataformas que nem lembra mais.\n\n" +
            "Cada uma dessas contas continua existindo, mesmo que você nunca mais volte. " +
            "Para um atacante, contas esquecidas são oportunidades silenciosas. " +
            "Basta que uma tenha senha reutilizada ou proteção fraca para servir " +
            "como ponto de entrada.",
          deepDive:
            "Quando ocorre um vazamento em qualquer serviço online, listas com " +
            "e-mails e senhas são divulgadas ou vendidas. Criminosos usam programas " +
            "automáticos para testar essas combinações em dezenas de serviços populares " +
            "ao mesmo tempo.\n\n" +
            "Se a senha foi reutilizada, o acesso acontece sem invasão direta. " +
            "Esse processo se chama credential stuffing e está entre os métodos mais " +
            "comuns de comprometimento de contas hoje.",
          highlightBox: "O atacante não procura a porta principal. Procura a esquecida.",
          mascotMessage:
            "Quando eu ainda causava problemas... ninguém começava pelo cofre. " +
            "A entrada dos fundos sempre dava menos trabalho.",
        },
      },
      {
        id: "t1_m2_b2",
        type: "MATCHING",
        data: {
          question: "Associe o hábito ao problema que ele pode causar.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Senha igual em vários serviços",
              rightId: "r1",
              rightText: "Se um vazar, todos os outros ficam em risco",
            },
            {
              leftId: "l2",
              leftText: "App sem atualização há meses",
              rightId: "r2",
              rightText: "Falhas conhecidas que criminosos já sabem explorar",
            },
            {
              leftId: "l3",
              leftText: "Conectar em Wi-Fi público sem proteção",
              rightId: "r3",
              rightText: "Alguém na mesma rede pode ver o que você está fazendo",
            },
          ],
          feedbackSuccess: "Isso. Pequenos hábitos acumulam grandes brechas.",
          feedbackError:
            "Pense na consequência prática de cada hábito, não no nome técnico.",
          mascotMessage:
            "Mapear exposição é literalmente o primeiro passo de um ataque. " +
            "Agora você chegou antes.",
        },
      },
      {
        id: "t1_m2_b3",
        type: "QUIZ",
        data: {
          question:
            "Por que um vazamento em um site antigo que você não usa mais " +
            "ainda pode afetar você hoje?",
          options: [
            {
              id: "a",
              text: "Porque criminosos testam automaticamente a mesma senha em outros serviços",
            },
            {
              id: "b",
              text: "Porque só afeta quem ainda usa aquele site ativamente",
            },
            {
              id: "c",
              text: "Porque se você mudar a senha depois do vazamento, o risco desaparece",
            },
          ],
          correctOptionId: "a",
          feedbackSuccess:
            "Exato. O ataque não precisa de invasão direta, só precisa de uma senha repetida.",
          feedbackError:
            "O risco não some quando você para de usar o serviço. " +
            "A senha antiga continua válida em outros lugares onde você a reutilizou.",
          explanation:
            "Em 2024, o maior vazamento da história expôs quase 10 bilhões de credenciais únicas. " +
            "Ferramentas automáticas testam essas combinações em centenas de serviços populares " +
            "em minutos. Mudar a senha só no site vazado não resolve se a mesma senha existe " +
            "em outros lugares.",
        },
      },
      {
        id: "t1_m2_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que sua exposição digital não está só no que você usa hoje, " +
            "mas em tudo que você criou e esqueceu. " +
            "Contas antigas, senhas reutilizadas e apps desatualizados são portas " +
            "que ficam abertas sem você perceber.",
          keyTakeaway:
            "Conta esquecida + senha reutilizada = entrada silenciosa para o atacante.",
          xpEarned: 45,
          nextMissionTeaser:
            "Na próxima missão você vai ver como criminosos usam pressão psicológica " +
            "para fazer você abrir essas portas voluntariamente.",
          mascotMessage:
            "Você começou a pensar como quem ataca. Isso é exatamente o que vai te proteger.",
        },
      },
    ],
  },

  {
    title: "Engenharia Social na Prática",
    description:
      "Identificar sinais reais de manipulação e aplicar um processo simples " +
      "de verificação antes de agir.",
    xpReward: 55,
    estimatedTime: 8,
    category: "MINDSET",
    order: 3,
    iconUrl: "triangle-alert",
  
    content: [
      {
        id: "t1_m3_b1",
        type: "INFO",
        data: {
          title: "Pressa e autoridade são atalhos mentais.",
          text:
          "Nas missões anteriores você viu que seus dados têm valor e que " +
          "contas esquecidas viram portas de entrada. " +
          "Mas o ataque mais comum não começa por tecnologia, " +
          "e não acontece só no trabalho.\n\n" +
          "Uma mensagem urgente do banco. Um e-mail dos Correios. " +
          "Uma ordem do chefe pedindo transferência rápida. " +
          "Contextos diferentes, mesma estrutura: pressa, autoridade, ação imediata.\n\n" +
          "Isso é engenharia social: manipular pessoas para que ajam " +
          "antes de pensar. O golpista não precisa invadir nada. " +
          "Só precisa que você obedeça rápido demais.",
        deepDive:
          "Pressão psicológica ativa respostas automáticas. " +
          "Urgência reduz análise crítica. " +
          "Autoridade diminui questionamento. " +
          "Escassez cria medo de perder algo.\n\n" +
          "Esses gatilhos são estudados e repetidos em golpes financeiros " +
          "e corporativos porque funcionam independente de educação ou inteligência. " +
          "Qualquer pessoa sob pressão toma decisões piores.",
          highlightBox:
            "Urgência é a ferramenta favorita de quem não quer ser verificado.",
          mascotMessage:
            "Curioso... quase nenhum ataque começa quebrando sistemas. " +
            "Normalmente alguém só... obedece rápido demais.",
        },
      },
      {
        id: "t1_m3_b2",
        type: "HOTSPOT",
        data: {
          allowMultiple: true,         
          requiredSelections: 3,       
          context: {
            type: "EMAIL",
            subject: "URGENTE: Transferência solicitada — assinar agora",
            sender: [
              { type: "text", content: "De: " },
              {
                type: "hotspot",
                regionId: "r_dom",
                content: "financeiro@empresa-pay.com.br",
              },
            ],
          },
          body: [
            { type: "text", content: "\nOlá," },
            { type: "text",
              content: "\n\nO fornecedor solicitou antecipação do pagamento " +
                       "para liberar o envio ainda hoje." },
            { type: "text", content: "\nPode realizar o PIX conforme dados abaixo?" },
            { type: "hotspot", regionId: "r_urgency",
              content: "\nPrecisamos concluir até o fim da manhã " +
                       "para não impactar o cronograma." },
            { type: "text", content: "\n\nDados bancários seguem anexos." },
            { type: "text", content: "\n\nObrigado," },
            { type: "hotspot", regionId: "r_signature",
              content: "\nFinanceiro" },
          ],
          regions: [
            {
              id: "r_dom",
              feedback:
                "O endereço parece corporativo, mas o domínio não corresponde " +
                "ao oficial da empresa. 'empresa-pay.com.br' pode ser qualquer coisa. " +
                "Sempre leia o domínio completo, não apenas o nome exibido antes do @.",
              isCorrect: true,
            },
            {
              id: "r_urgency",
              feedback:
                "O prazo comprime o tempo de análise. " +
                "Pedidos legítimos de pagamento têm processo, não prazo de horas. " +
                "Urgência fabricada é o sinal mais confiável de golpe.",
              isCorrect: true,
            },
            {
              id: "r_signature",
              feedback:
                "Nenhuma pessoa real assina 'Financeiro'. " +
                "A assinatura vaga protege o atacante: sem nome, " +
                "sem cargo específico, sem rastreabilidade.",
              isCorrect: true,
            },
          ],
          feedbackError:
            "Três sinais nesse e-mail. " +
            "Observe o remetente, o que cria pressão de tempo e quem assina.",
          mascotMessage:
            "Domínio errado, prazo fabricado, assinatura sem nome. " +
            "Três sinais num e-mail que parece corporativo. " +
            "Quem encontra os três antes de agir, escapa.",
        },
      },
  
      {
        id: "t1_m3_b3",
        type: "SORTING",
        data: {
          question:
            "Você recebeu esse e-mail pedindo transferência urgente. " +
            "Coloque as ações na ordem correta antes de fazer qualquer coisa.",
          items: [
            { id: "s1", text: "Não agir no e-mail, nem responder, nem clicar em nada" },
            { id: "s2", text: "Ler o domínio completo do remetente, não apenas o nome exibido" },
            { id: "s3", text: "Ligar para o número salvo nos seus contatos para confirmar o pedido" },
            { id: "s4", text: "Só agir se a confirmação por canal independente validar o pedido" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4",],
          feedbackSuccess:
            "Correto. A primeira ação é não agir no próprio canal do e-mail. " +
            "Confirmar por telefone usando o número que você já tem, " +
            "não o número que o e-mail fornece, " +
            "é o único passo que desfaz o ataque inteiro.",
          feedbackError:
            "Não agir vem primeiro porque qualquer interação dentro do e-mail " +
            "como responder, clicar e baixar anexo, " +
            "mantém você dentro do cenário que o atacante controlou. " +
            "Para confirmar o pedido do e-mail, ligue para a pessoa ou responsável por um canal oficial que voce conhece",
          mascotMessage:
            "Sair do canal do e-mail para verificar. " +
            "Esse único passo desfazia qualquer ataque que eu montasse. " +
            "Simples assim.",
        },
      },
      {
        id: "t1_m3_b4",
        type: "QUIZ",
        data: {
          question:
            "Qual é a ação mais segura diante de um pedido financeiro urgente por e-mail?",
          options: [
            { id: "a", text: "Executar rapidamente para não atrasar o processo" },
            { id: "b", text: "Confirmar por um canal independente que você já conhece" },
            { id: "c", text: "Responder o e-mail pedindo mais detalhes antes de agir" },
          ],
          correctOptionId: "b",
          feedbackSuccess:
            "Correto. Sair do canal do atacante e confirmar de forma independente " +
            "é o que interrompe o golpe.",
          feedbackError:
            "Responder no mesmo e-mail mantém você dentro do canal que o atacante controla. " +
            "Agir rápido é exatamente o que a urgência fabricada busca. ",
          explanation:
            "BEC depende de manter a vítima dentro do mesmo canal. " +
            "Uma ligação para o número que você já tem salvo nos contatos " +
            "é suficiente para desmontar o ataque inteiro",
        },
      },
      {
        id: "t1_m3_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que a maioria dos golpes explora comportamento, " +
            "não tecnologia. Urgência e autoridade são gatilhos projetados para " +
            "reduzir o tempo de análise. " +
            "Pausar e confirmar por canal independente " +
            "é suficiente para interromper quase todos eles.",
          keyTakeaway:
            "Urgência fabricada + canal controlado = receita do golpe. " +
            "Pause e verifique fora do e-mail.",
          xpEarned: 55,
          nextMissionTeaser:
            "Na próxima missão você vai ver o que acontece depois que seus dados vazam: " +
            "quanto tempo dura o risco e como criminosos reutilizam informações antigas.",
          mascotMessage:   
            "Urgência fabricada, domínio errado, assinatura sem nome. " +
            "Você identificou os três. " +
            "Antes, isso me custava segundos de trabalho e rendia muito mais.",
        },
      },
  
    ],
  },

  {
    title: "Vazamentos e Consequências",
    description:
      "Entender o que acontece após um vazamento de dados e como reagir " +
      "de forma rápida e na ordem certa para reduzir o impacto real.",
    xpReward: 50,
    estimatedTime: 7,
    category: "MINDSET",
    order: 4,
    iconUrl: "mouse-pointer-click",

    content: [
      {
        id: "t1_m4_b1",
        type: "INFO",
        data: {
          title: "Um vazamento não termina quando para de ser notícia.",
          text:
            "Nas missões anteriores você viu como seus dados têm valor combinados " +
            "e como atacantes usam pressão para te fazer agir sem pensar.\n\n" +
            "Agora o cenário é diferente: o ataque já aconteceu, " +
            "você nem sabia, e os dados continuam circulando.\n\n" +
            "Grandes vazamentos expõem bilhões de contas. " +
            "A maioria das pessoas afetadas nunca recebe aviso. " +
            "E os dados não somem depois que a notícia passa. " +
            "Eles são comprados, revendidos e reutilizados por anos.",
          deepDive:
            "Após um vazamento, os dados entram em listas chamadas 'combo lists', " +
            "que reúnem e-mails e senhas de múltiplas fontes. " +
            "Essas listas são vendidas em fóruns fechados por valores que variam " +
            "de centavos a poucos reais por registro.\n\n" +
            "O maior agregador de vazamentos já registrado, o RockYou2024, " +
            "compilou quase 10 bilhões de credenciais únicas de décadas de vazamentos. " +
            "Dados de 2012 ainda aparecem em tentativas de acesso em 2024 " +
            "porque as pessoas raramente trocam senhas antigas de contas esquecidas.",
          highlightBox:
            "O problema raramente é SE houve vazamento. É o que acontece nos anos seguintes.",
          mascotMessage:
            "A parte estranha? Muitas vítimas descobrem só quando alguém já entrou. " +
            "Silêncio não é segurança.",
        },
      },
      {
        id: "t1_m4_b3",
        type: "SORTING",
        data: {
          question:
            "Você descobre que seu e-mail e senha vazaram. " +
            "Coloque as ações na ordem certa, a velocidade importa.",
          items: [
            { id: "s1", text: "Trocar a senha do e-mail principal imediatamente" },
            { id: "s2", text: "Ativar verificação em duas etapas no e-mail" },
            { id: "s3", text: "Identificar quais outras contas usam a mesma senha" },
            { id: "s4", text: "Trocar a senha nessas outras contas" },
            { id: "s5", text: "Verificar movimentações suspeitas nas contas financeiras" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4", "s5"],
          feedbackSuccess:
            "Ordem correta. O e-mail é a chave-mestra. " +
            "Quem controla o e-mail pode redefinir qualquer outra senha.",
          feedbackError:
            "O e-mail principal vem primeiro porque é por ele que se recupera " +
            "acesso a todo o resto. Proteger o cofre antes de verificar o conteúdo.",
          mascotMessage:
            "Ordem importa mais do que velocidade quando se está em pânico. " +
            "Aprendi isso do jeito errado.",
        },
      },
      {
        id: "t1_m4_b4",
        type: "QUIZ",
        data: {
          question:
            "Faz seis meses desde um vazamento que expôs seu e-mail e senha. " +
            "Nada de errado aconteceu até agora. O que isso significa?",
          options: [
            {
              id: "a",
              text: "Que seus dados provavelmente não foram usados e o risco passou",
            },
            {
              id: "b",
              text: "Que seus dados podem ainda estar circulando e ser usados a qualquer momento",
            },
            {
              id: "c",
              text: "Que basta trocar a senha no serviço que vazou para eliminar o risco",
            },
          ],
          correctOptionId: "b",
          feedbackSuccess:
            "Exato. Silêncio após um vazamento não é segurança. " +
            "É só o intervalo entre o vazamento e o uso.",
          feedbackError:
            "Dados vazados não têm prazo de validade. " +
            "Seis meses sem incidente visível não significa que o risco desapareceu.",
          explanation:
            "Credenciais vazadas ficam em circulação por anos em listas combinadas. " +
            "Criminosos não agem imediatamente em todas as contas. " +
            "Muitas vezes o uso acontece meses depois, quando a vítima já baixou a guarda. " +
            "A única proteção real é trocar a senha e ativar MFA independente de 'ter acontecido algo'.",
        },
      },

      {
        id: "t1_m4_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que um vazamento não termina quando para de ser notícia. " +
            "Dados circulam por anos, são combinados com outras fontes e usados " +
            "quando você menos espera. " +
            "A resposta certa começa pelo e-mail principal e segue uma ordem específica.",
          keyTakeaway:
            "Silêncio após vazamento não é segurança. E-mail primeiro, depois todo o resto.",
          xpEarned: 50,
          nextMissionTeaser:
            "Na próxima missão você vai ver um ataque que começa com uma ligação " +
            "e termina com alguém usando seu número de celular como se fosse o dono.",
          mascotMessage:
            "Quatro missões. Você já tem o mapa completo de como ataques começam. " +
            "A próxima é sobre quando eles chegam pelo canal que você mais confia.",
        },
      },
    ],
  },

  {
    title: "WhatsApp Clonado e SIM Swap",
    description:
      "Reconhecer os sinais de clonagem ou troca de chip e agir rapidamente " +
      "para recuperar e proteger sua conta.",
    xpReward: 55,
    estimatedTime: 10,
    category: "MINDSET",
    order: 5,
    iconUrl: "message-circle-warning",

    content: [

      {
        id: "t1_m5_b1",
        type: "INFO",
        data: {
          title: "Seu número de celular é uma chave que você não guarda no cofre.",
          text:
            "Na missão anterior você viu que dados vazados continuam circulando por anos. " +
            "Agora vamos ver o que acontece quando esses dados são usados para " +
            "tomar algo que parece impossível de roubar: seu número de telefone.\n\n" +
            "No SIM swap, criminosos convencem a operadora a transferir seu número " +
            "para outro chip. A partir desse momento, eles recebem seus códigos SMS " +
            "e conseguem redefinir acessos que dependem do número, " +
            "incluindo WhatsApp, apps de banco e e-mail.",
          deepDive:
            "Ataques de SIM swap no Brasil frequentemente começam com dados obtidos " +
            "em vazamentos ou redes sociais. Com CPF, data de nascimento e telefone, " +
            "criminosos ligam para a operadora fingindo ser a vítima e solicitam " +
            "troca de chip por 'perda' ou 'dano'.\n\n" +
            "Operadoras têm processos de verificação, mas eles variam em rigor. " +
            "Em alguns casos, dados básicos são suficientes para aprovar a troca. " +
            "O ataque não exige nenhum acesso técnico ao seu aparelho.",
          highlightBox:
            "Perder sinal sem motivo pode significar perder acesso a tudo.",
          mascotMessage:
            "Eu reconheço esse padrão. O ataque começa antes de você perceber " +
            "que há um ataque.",
        },
      },
      {
        id: "t1_m5_b2",
        type: "MATCHING",
        data: {
          question:
            "Antes de entrar no cenário, associe cada sinal ao que ele pode indicar.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Celular perdeu sinal sem aviso",
              rightId: "r1",
              rightText: "Número pode ter sido transferido para outro chip",
            },
            {
              leftId: "l2",
              leftText: "WhatsApp desconectou sozinho",
              rightId: "r2",
              rightText: "Conta registrada em outro aparelho",
            },
            {
              leftId: "l3",
              leftText: "Amigos dizem que você pediu dinheiro",
              rightId: "r3",
              rightText: "Golpe ativo usando sua identidade",
            },
          ],
          feedbackSuccess:
            "Esses três sinais juntos indicam que o ataque já está acontecendo. " +
            "Agora veja como isso acontece em tempo real.",
          feedbackError:
            "Reveja cada sinal isoladamente: o que cada um indica sobre " +
            "onde está o acesso naquele momento?",
          mascotMessage:
            "Quando múltiplos sinais aparecem ao mesmo tempo, não é coincidência. " +
            "Nunca é.",
        },
      },
      {
        id: "t1_m5_b3",
        type: "INFO",
        data: {
          title: "Está acontecendo agora.",
          text:
            "Você está usando o celular normalmente quando o sinal desaparece.\n\n" +
            "Minutos depois: nenhuma chamada funciona, a internet móvel caiu, " +
            "e um amigo manda mensagem por outro canal perguntando se você " +
            "realmente pediu dinheiro emprestado.\n\n" +
            "Ao tentar abrir o WhatsApp, você vê que foi desconectado.\n\n" +
            "Esse é o momento em que o criminoso registra seu número em outro aparelho. " +
            "Enquanto você tenta entender o que está acontecendo, " +
            "ele já iniciou redefinições de senha nos serviços vinculados ao seu telefone.",
          highlightBox:
            "Os primeiros minutos definem o tamanho do prejuízo.",
          mascotMessage:
            "Esse silêncio no sinal... já vi isso virar invasão completa " +
            "antes da vítima terminar de fazer café.",
        },
      },
      {
        id: "t1_m5_b4",
        type: "SORTING",
        data: {
          question:
            "O SIM swap está acontecendo agora. " +
            "Coloque as ações na ordem correta, do mais urgente ao menos urgente.",
          items: [
            { id: "s1", text: "Ligar para a operadora de outro aparelho e bloquear o chip" },
            { id: "s2", text: "Avisar contatos próximos que você não está fazendo pedidos" },
            { id: "s3", text: "Acessar o banco por Wi-Fi e verificar movimentações" },
            { id: "s4", text: "Recuperar o WhatsApp após confirmar que o chip foi bloqueado" },
            { id: "s5", text: "Registrar boletim de ocorrência online" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4", "s5"],
          feedbackSuccess:
            "Ordem correta. Bloquear o chip corta o acesso do atacante. " +
            "Avisar contatos impede que o golpe continue se espalhando enquanto você resolve o resto.",
          feedbackError:
            "O chip vem primeiro porque é a fonte do acesso. " +
            "Verificar o banco antes de bloquear o chip dá mais tempo ao atacante " +
            "enquanto você está ocupado em outra coisa.",
            mascotMessage:
              "Primeiro corte o acesso. Depois contenha o estrago. " +
              "Tudo que você fizer antes de bloquear o chip " +
              "acontece enquanto o atacante ainda está dentro.",
        },
      },
      {
        id: "t1_m5_b5",
        type: "QUIZ",
        data: {
          question:
            "Seu celular está sem sinal há 5 minutos. " +
            "WhatsApp desconectou e amigos dizem que você pediu dinheiro. " +
            "Qual é a primeira ação?",
          options: [
            {
              id: "o1",
              text: "Pegar emprestado outro celular e ligar para a operadora agora",
            },
            {
              id: "o2",
              text: "Abrir o WhatsApp Web no computador para confirmar se fui hackeado",
            },
            {
              id: "o3",
              text: "Ligar para o banco primeiro porque o risco financeiro é maior",
            },
          ],
          correctOptionId: "o1",
          feedbackSuccess:
            "Decisão correta. Cada minuto bloqueado é um minuto a menos de acesso para o atacante.",
          feedbackError:
            "A maioria das vítimas demora entre 15 e 30 minutos para reagir. " +
            "Nesse intervalo, contas financeiras podem ser redefinidas e o golpe " +
            "pode ter atingido dezenas de contatos. " +
            "O chip é a fonte de tudo. Bloqueie primeiro, investigue depois.",
          explanation:
            "No SIM swap, o número é a chave de recuperação de múltiplos serviços. " +
            "Verificar o WhatsApp Web ou ligar para o banco antes de bloquear o chip " +
            "mantém o acesso do atacante ativo enquanto você está ocupado com outra coisa. " +
            "Um único bloqueio de chip interrompe a cadeia inteira.",
        },
      },
      {
        id: "t1_m5_summary",
        type: "SUMMARY",
        data: {
          title: "Trilha 1 concluída.",
          summary:
            "Você completou a primeira trilha. Em cinco missões você entendeu " +
            "por que seus dados têm valor, onde estão expostos, como atacantes " +
            "exploram comportamento, o que acontece após um vazamento " +
            "e como responder quando o ataque usa seu próprio número contra você.\n\n" +
            "Esse é o mapa completo de como a maioria dos golpes digitais começa.",
          keyTakeaway:
            "Chip bloqueado primeiro. Sempre. O resto vem depois.",
          xpEarned: 55,
          nextMissionTeaser:
            "A próxima trilha vai além de reconhecer ataques. " +
            "Você vai aprender a controlar quem tem acesso a quê, " +
            "começando pela coisa que protege tudo: suas senhas.",
          mascotMessage:
            "Cinco missões. Você parou de ser um alvo fácil. " +
            "Não vou dizer que fico feliz com isso... mas fico.",
        },
      },
    ],
  }
];

export const missionsEixo02_Track02 = [
  {
    title: "Senhas Fortes de Verdade",
    description:
      "Criar passphrases seguras e eliminar o reuso de senha entre serviços.",
    xpReward: 50,
    estimatedTime: 8,
    category: "IDENTITY",
    order: 1,
    iconUrl: "key-round",

    content: [
      {
        id: "t2_m1_b1",
        type: "INFO",
        data: {
          title: "O mito da senha complicada.",
          text:
            "Na trilha anterior você viu como atacantes usam dados combinados " +
            "para acessar contas. Agora a pergunta é: o que protege uma conta " +
            "quando a senha é a única barreira?\n\n" +
            "Adicionar símbolos e números não torna automaticamente uma senha segura. " +
            "Ataques modernos testam padrões humanos previsíveis primeiro. " +
            "'P@ssw0rd' e 'Senha123!' já estão nas listas de teste há anos.\n\n" +
            "O fator que realmente aumenta a segurança é o comprimento " +
            "combinado com imprevisibilidade real.",
          deepDive:
            "Ferramentas de ataque utilizam bases de senhas vazadas e dicionários " +
            "de padrões comuns. Substituições previsíveis como @ no lugar de 'a' " +
            "ou 3 no lugar de 'e' já fazem parte dessas listas há mais de uma década.\n\n" +
            "Uma passphrase como 'planeta-vidro-manga-neblina' tem 28 caracteres " +
            "e combina palavras sem relação entre si. Mesmo um ataque de força bruta " +
            "levaria anos para chegar nessa combinação específica.",
          highlightBox:
            "Ataques automatizados exploram padrões repetidos, não criatividade visual.",
          mascotMessage:
            "Eu não pensava. Apenas testava milhões de combinações até alguma porta abrir. " +
            "Senhas curtas com símbolos abriam rápido.",
        },
      },
      {
        id: "t2_m1_b2",
        type: "SORTING",
        data: {
          question:
            "Ordene essas senhas da mais fraca para a mais forte, " +
            "considerando resistência a ataques automatizados.",
          items: [
            { id: "s1", text: "senha123" },
            { id: "s2", text: "P@ssw0rd!" },
            { id: "s3", text: "Tr0ub4dor&3" },
            { id: "s4", text: "cavalo-bateria-grampo-correto" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4"],
          feedbackSuccess:
            "Isso. Comprimento com palavras aleatórias bate substituições visuais. " +
            "A última parece simples mas é a mais difícil de quebrar.",
          feedbackError:
            "'Tr0ub4dor&3' parece a mais forte visualmente, mas substituições " +
            "como 0 por 'o' e 4 por 'a' já estão nos dicionários de ataque. " +
            "A passphrase com palavras aleatórias e comprimento longo vence.",
          mascotMessage:
            "Senhas que parecem complexas visuais são as minhas favoritas. " +
            "Todo mundo usa o mesmo truque.",
        },
      },
      {
        id: "t2_m1_b3",
        type: "INPUT",
        data: {
          question: "Agora crie a sua. Uma passphrase com pelo menos 4 palavras sem relação entre si.",
          description:
            "Use palavras aleatórias separadas por hífen ou espaço. " +
            "Evite frases conhecidas, músicas ou sequências óbvias. " +
            "Exemplo: planeta-vidro-manga-neblina",
          placeholder: "sua-passphrase-aqui",
          validation: {
            type: "REGEX",
            expectedValue: "^(?=.*[-\\s].*[-\\s]).{16,}$",
            isCaseSensitive: false,
          },
          feedbackSuccess:
            "Boa escolha. Esse formato aumenta drasticamente o custo de ataque.",
          feedbackError:
            "Tente usar pelo menos quatro palavras sem relação, separadas por hífen ou espaço, " +
            "com 16 caracteres ou mais no total.",
          mascotMessage:
            "Esse tipo de senha costumava me fazer desistir e procurar outro alvo.",
        },
      },
      {
        id: "t2_m1_b4",
        type: "QUIZ",
        data: {
          question:
            "Qual prática oferece MAIOR proteção real contra ataques automatizados?",
          options: [
            {
              id: "a",
              text: "Passphrase longa com palavras aleatórias sem relação",
            },
            {
              id: "b",
              text: "Senha curta com maiúscula, símbolo e número como 'P@ss1!'",
            },
            {
              id: "c",
              text: "Memorizar senhas complexas sem anotá-las em nenhum lugar",
            },
          ],
          correctOptionId: "a",
          feedbackSuccess:
            "Correto. Comprimento com imprevisibilidade real supera complexidade visual.",
          feedbackError:
            "Símbolos e maiúsculas ajudam, mas padrões como 'P@ss1!' já estão " +
            "nos dicionários de ataque. E memorizar senhas complexas sem anotá-las " +
            "leva à reutilização, que é o maior risco de todos.",
          explanation:
            "Ataques de força bruta testam variações de padrões comuns primeiro. " +
            "'P@ssw0rd' leva segundos. Uma passphrase aleatória de 4 palavras " +
            "levaria centenas de anos no mesmo hardware. " +
            "Anotar em um gerenciador de senhas é mais seguro do que memorizar " +
            "e reutilizar a mesma senha em vários lugares.",
        },
      },
      {
        id: "t2_m1_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que força de senha não é sobre parecer complicada, " +
            "é sobre ser imprevisível e longa. " +
            "Passphrases com palavras aleatórias vencem senhas visualmente complexas " +
            "porque ataques automatizados já conhecem todos os padrões comuns.",
          keyTakeaway:
            "Comprimento + imprevisibilidade real. Não símbolo + número.",
          xpEarned: 50,
          nextMissionTeaser:
            "Criar uma senha forte é metade da proteção. " +
            "Na próxima missão você vai ver por que até a melhor senha " +
            "não é suficiente sozinha.",
          mascotMessage:
            "Uma senha decente. Mas uma senha ainda é uma porta. " +
            "A próxima missão adiciona uma tranca.",
        },
      },
    ],
  },

  {
    title: "MFA além do SMS",
    description:
      "Entender quais métodos de verificação realmente protegem sua conta.",
    xpReward: 60,
    estimatedTime: 9,
    category: "IDENTITY",
    order: 2,
    iconUrl: "shield-check",

    content: [
      {
        id: "t2_m2_b1",
        type: "INFO",
        data: {
          title: "A senha que você criou não é suficiente sozinha.",
          text:
            "Na missão anterior você criou uma passphrase forte. " +
            "Mas senhas vazam, independente de quão boas sejam. " +
            "Autenticação multifator adiciona uma segunda verificação " +
            "que permanece válida mesmo quando a senha é comprometida.\n\n" +
            "O problema é que nem todo segundo fator protege igual. " +
            "A segurança depende de onde esse código é gerado e " +
            "quantos sistemas externos ele precisa atravessar até chegar em você.",
          deepDive:
            "Códigos SMS passam pela infraestrutura das operadoras e podem ser " +
            "desviados em ataques de SIM swap, que você viu na trilha anterior.\n\n" +
            "Aplicativos autenticadores como Google Authenticator ou Aegis " +
            "geram códigos localmente no aparelho, sem transmissão externa. " +
            "Mesmo que alguém tenha sua senha e seu número, não consegue o código.\n\n" +
            "Chaves físicas de segurança (como YubiKey) exigem presença real " +
            "do dispositivo conectado, tornando ataques remotos praticamente impossíveis.",
          highlightBox:
            "O método mais seguro é aquele que nunca sai do seu controle físico.",
          mascotMessage:
            "Eu sempre procurava o caminho mais distante do usuário. " +
            "Quanto mais sistemas no meio, melhor para mim.",
        },
      },
      {
        id: "t2_m2_b2",
        type: "MATCHING",
        data: {
          question:
            "Associe cada método de MFA ao seu principal ponto de vulnerabilidade.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Código por SMS",
              rightId: "r1",
              rightText: "Pode ser desviado se o número for clonado",
            },
            {
              leftId: "l2",
              leftText: "App autenticador",
              rightId: "r2",
              rightText: "Depende do acesso físico ao celular",
            },
            {
              leftId: "l3",
              leftText: "Chave física de segurança",
              rightId: "r3",
              rightText: "Requer o dispositivo presente para qualquer acesso",
            },
          ],
          feedbackSuccess:
            "Correto. Cada método tem um ponto fraco diferente. " +
            "Agora você vai ordenar do menos seguro ao mais seguro.",
          feedbackError:
            "Pense em o que cada método depende para funcionar: " +
            "rede telefônica, aparelho celular ou dispositivo físico.",
          mascotMessage:
            "Todo método tem uma fraqueza. A questão é onde ela mora.",
        },
      },
      {
    id: "t2_m2_b3",
    type: "SORTING",
    data: {
      question:
        "Ordene do método MENOS seguro para o MAIS seguro " +
        "considerando resistência a ataques remotos.",
      items: [
        { id: "i1", text: "Código enviado por SMS" },
        { id: "i2", text: "Aplicativo autenticador" },
        { id: "i3", text: "Chave física de segurança" },
      ],
      correctOrder: ["i1", "i2", "i3"],
      feedbackSuccess:
        "SMS depende da operadora — interceptável. " +
        "App autenticador gera o código no seu celular, sem passar por ninguém. " +
        "Chave física exige o objeto na mão: impossível atacar remotamente.",
      feedbackError:
        "Pense em onde cada código é gerado. " +
        "SMS sai da operadora. App sai do seu celular. " +
        "Chave física não gera nada remotamente, exige presença física.",
      mascotMessage:
        "Cada intermediário entre você e o código " +
        "é uma oportunidade que não é sua.",
    },
      },
      {
        id: "t2_m2_b4",
        type: "QUIZ",
        data: {
          question:
            "Por que aplicativos autenticadores são mais seguros que SMS " +
            "para verificação em duas etapas?",
          options: [
            {
              id: "a",
              text: "Não são, SMS com 2FA já oferece proteção suficiente para qualquer conta",
            },
            {
              id: "b",
              text: "Não são, biometria é sempre mais segura que qualquer código",
            },
            {
              id: "c",
              text: "O código é gerado localmente no dispositivo, sem passar pela operadora",
            },
          ],
          correctOptionId: "c",
          feedbackSuccess:
            "Exato. O código permanece sob seu controle local e não pode ser " +
            "interceptado via SIM swap.",
          feedbackError:
            "SMS com MFA é melhor que só senha, mas como você viu na Trilha 1, " +
            "SIM swap redireciona seu número inteiro para outro chip. " +
            "Biometria autentica você localmente mas não substitui um segundo fator " +
            "verificável de forma independente.",
          explanation:
            "Aplicativos autenticadores não dependem da rede telefônica. " +
            "Mesmo que alguém consiga sua senha e clone seu número, " +
            "o código de 6 dígitos gerado no seu app muda a cada 30 segundos " +
            "e só existe no seu aparelho.",
        },
      },
      {
        id: "t2_m2_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que MFA não é binário. " +
            "SMS é melhor que nada, app autenticador é melhor que SMS, " +
            "chave física é melhor que app. " +
            "A lógica é sempre a mesma: quanto menos o segundo fator " +
            "depende de redes externas, mais difícil é interceptar.",
          keyTakeaway:
            "Troque SMS por app autenticador. É a melhoria de segurança mais simples e mais impactante.",
          xpEarned: 60,
          nextMissionTeaser:
            "Você agora tem senhas fortes e sabe qual MFA usar. " +
            "Na próxima missão, o problema é gerenciar tudo isso sem enlouquecer.",
          mascotMessage:
            "Duas missões. Você está ficando difícil de alcançar remotamente. " +
            "Isso é um elogio da minha parte.",
        },
      },
    ],
  },

  {
    "title": "Gerenciadores de Senha",
    "description": "Entender como gerenciadores de senha funcionam e por que eles eliminam um dos maiores riscos digitais.",
    "xpReward": 60,
    "estimatedTime": 7,
    "category": "IDENTITY",
    "order": 3,
    "iconUrl": "vault",
    "content": [
      {
        "id": "t3_m3_b1",
        "type": "INFO",
        "data": {
          "title": "O verdadeiro problema não é criar senhas",
          "text": "A maioria das invasões acontece porque pessoas reutilizam a mesma senha em vários serviços.\n\nQuando um único site sofre vazamento, invasores testam automaticamente aquela mesma combinação em e-mails, redes sociais e serviços financeiros.\n\nGerenciadores de senha resolvem isso criando e armazenando senhas únicas para cada conta, sem que você precise memorizá-las.",
          "deepDive": "Gerenciadores funcionam como um cofre digital criptografado. Suas senhas são embaralhadas matematicamente antes mesmo de serem armazenadas. Nem a empresa do gerenciador consegue ler o conteúdo do cofre.\n\nA única chave capaz de desbloquear tudo é sua senha mestra, que permanece sob seu controle.",
          "highlightBox": "Uma senha vazada só vira desastre quando ela é reutilizada.",
          "mascotMessage": "Eu nunca precisava invadir dez sistemas… bastava encontrar a mesma senha repetida."
        }
      },

      {
        "id": "t3_m3_b2",
        "type": "INFO",
        "data": {
          "title": "Mas guardar tudo em um lugar não é perigoso?",
          "text": "Parece arriscado concentrar todas as senhas em um único local. A diferença é que o gerenciador protege esse cofre com criptografia forte e acesso controlado.\n\nSem a senha mestra correta, os dados armazenados são apenas informação ilegível.",
          "deepDive": "Esse modelo é chamado de conhecimento zero. O serviço armazena dados criptografados, mas não possui a chave para descriptografá-los. Mesmo em caso de invasão ao servidor, os atacantes encontram apenas dados embaralhados.",
          "highlightBox": "O risco deixa de ser lembrar senhas e passa a ser proteger bem uma única chave.",
          "mascotMessage": "Quando encontrei cofres assim pela primeira vez… percebi que atacar pessoas distraídas continuava sendo mais fácil."
        }
      },

      {
        "id": "t3_m3_b3",
        "type": "MATCHING",
        "data": {
          "question": "Associe o recurso do gerenciador ao risco que ele reduz.",
          "pairs": [
            {
              "leftId": "l1",
              "leftText": "Senha única para cada conta",
              "rightId": "r1",
              "rightText": "Impede invasão em efeito dominó"
            },
            {
              "leftId": "l2",
              "leftText": "Preenchimento automático apenas no site correto",
              "rightId": "r2",
              "rightText": "Evita digitar senha em páginas falsas"
            },
            {
              "leftId": "l3",
              "leftText": "Senha mestra forte",
              "rightId": "r3",
              "rightText": "Protege todo o cofre digital"
            }
          ],
          "feedbackSuccess": "Exatamente. Cada recurso bloqueia um tipo comum de ataque.",
          "feedbackError": "Pense em qual problema cada funcionalidade foi criada para resolver.",
          "mascotMessage": "Quando cada conta virou um beco sem saída… ataques automáticos simplesmente pararam."
        }
      },

      {
        "id": "t3_m3_b4",
        "type": "QUIZ",
        "data": {
          "question": "Um site sofre vazamento hoje. Qual cenário mantém suas outras contas protegidas?",
          "options": [
            {
              "id": "a",
              "text": "Cada conta possui uma senha única gerada pelo gerenciador"
            },
            {
              "id": "b",
              "text": "A senha é difícil de adivinhar"
            },
            {
              "id": "c",
              "text": "A senha possui muitos símbolos especiais"
            }
          ],
          "correctOptionId": "a",
          "feedbackSuccess": "Perfeito. O vazamento fica isolado e não se espalha.",
          "feedbackError": "Força da senha não impede reutilização entre serviços.",
          "explanation": "Gerenciadores permitem isolamento total entre contas. Um vazamento deixa de comprometer todo o restante."
        }
      },

      {
        id: "t3_m3_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você entendeu por que reutilizar senha é o maior risco digital da maioria das pessoas " +
            "e como gerenciadores eliminam esse risco sem exigir que você memorize nada. " +
            "Um cofre criptografado, uma senha mestra forte, senhas únicas para cada conta. " +
            "Um vazamento deixa de ser um dominó.",
          keyTakeaway:
            "Senha forte não protege se for reutilizada. Senha única por serviço, sim.",
          xpEarned: 60,
          mascotMessage:
            "Cofre com criptografia forte, senha mestra bem escolhida, nenhuma repetição. " +
            "É o suficiente para sair da lista dos alvos fáceis.",
        },
      },
    ]
  }
];

export const missionsEixo03_Track03 = [
  {
    title: "Atualizações não são opcionais",
    description:
      "Entender por que adiar atualizações aumenta o risco e quebrar os mitos " +
      "mais comuns sobre quando e por que atualizar.",
    xpReward: 45,
    estimatedTime: 10,  
    category: "DEVICE",
    order: 1,
    iconUrl: "arrow-up-to-line",
  
    content: [
      {
        id: "t3_m1_b1",
        type: "INFO",
        data: {
          title: "Falhas conhecidas viram ataques reais.",
          text:
            "Nas trilhas anteriores você protegeu seus dados e suas contas. " +
            "Agora o foco muda para o ambiente ao redor: " +
            "os dispositivos que você usa todos os dias.\n\n" +
            "Quando uma empresa lança uma atualização de segurança, " +
            "ela está corrigindo uma falha que já foi descoberta. " +
            "O problema é que ao publicar a correção, " +
            "ela também publica indiretamente o que estava errado.\n\n" +
            "Criminosos analisam a mudança e passam a atacar dispositivos " +
            "que ainda não atualizaram. Seu celular desatualizado conectado " +
            "ao Wi-Fi do trabalho pode ser comprometido sem nenhum clique, " +
            "sem nenhum aviso.",
          deepDive:
            "Muitos ataques não descobrem falhas novas. " +
            "Eles exploram vulnerabilidades já corrigidas, sabendo que " +
            "parte dos usuários demora semanas ou meses para atualizar.\n\n" +
            "Ferramentas automatizadas escaneiam redes inteiras procurando " +
            "versões vulneráveis conhecidas. O usuário raramente percebe " +
            "a invasão porque ela ocorre silenciosamente, sem interação.",
          highlightBox:
            "Quando a atualização sai, o manual do ataque sai junto.",
          mascotMessage:
            "Eu costumava esperar exatamente isso. " +
            "A correção publicada era o mapa para quem ainda não tinha aplicado.",
        },
      },
  
      {
        id: "t3_m1_b2",
        type: "CLASSIFICATION",
        data: {
          question:
            "Classifique cada afirmação sobre atualizações em 'Mito' ou 'Verdade'.",
          categories: [
            { id: "c1", name: "Mito" },
            { id: "c2", name: "Verdade" },
          ],
          items: [
            {
              id: "i1",
              text: "Mac e iPhone não precisam de atualizações de segurança",
              categoryId: "c1",  
            },
            {
              id: "i2",
              text: "Aparelho novo não precisa atualizar por pelo menos um ano",
              categoryId: "c1", 
            },
            {
              id: "i3",
              text: "Adiar uma atualização mantém uma falha conhecida ativa no dispositivo",
              categoryId: "c2", 
            },
            {
              id: "i4",
              text: "Atualização automática ligada não garante que todos os apps estejam atualizados",
              categoryId: "c2", 
            },
            {
              id: "i5",
              text: "Atualizar pode deixar o dispositivo mais lento, então vale adiar",
              categoryId: "c1",  
            },
          ],
          feedbackSuccess:
            "Correto. Nenhum sistema é imune e nenhuma idade de dispositivo garante proteção " +
            "sem atualizações regulares.",
          feedbackError:
            "Pense em qual afirmação depende de uma suposição falsa sobre sistemas ou fabricantes.",
          mascotMessage:
            "Mitos de plataforma eram meus favoritos. " +
            "'Mac não pega vírus' me abriu muitas portas nos anos 2010.",
        },
      },
  
      {
        id: "t3_m1_b3",
        type: "MATCHING",
        data: {
          question:
            "Associe a atitude ao efeito real sobre segurança.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Instalar atualização assim que disponível",
              rightId: "r1",
              rightText: "Fecha a janela antes que o ataque seja montado",
            },
            {
              leftId: "l2",
              leftText: "Adiar atualização por semanas",
              rightId: "r2",
              rightText: "Fica vulnerável enquanto outros já estão protegidos",
            },
            {
              leftId: "l3",
              leftText: "Usar sistema sem suporte do fabricante",
              rightId: "r3",
              rightText: "Falhas descobertas não recebem mais correção",
            },
          ],
          feedbackSuccess:
            "Correto. Cada semana sem atualização é uma semana no lado errado da proteção.",
          feedbackError:
            "Pense em quanto tempo uma falha permanece aberta após a correção ser publicada.",
          mascotMessage:
            "Ataques adoram rotina. Principalmente a de adiar.",
        },
      },
  
      {
        id: "t3_m1_b4",
        type: "QUIZ",
        data: {
          question:
            "Seu celular mostra uma atualização crítica de segurança. " +
            "Você decide instalar depois. Qual é o risco real?",
          options: [
            {
              id: "a",
              text: "Manter ativa uma falha que criminosos já podem estar explorando",
            },
            {
              id: "b",
              text: "Nenhum, meu aparelho tem menos de um ano e ainda está protegido",
            },
            {
              id: "c",
              text: "Baixo, porque a maioria dos ataques mira empresas, não pessoas comuns",
            },
          ],
          correctOptionId: "a",
          feedbackSuccess:
            "Exato. A janela entre a publicação da correção e sua instalação " +
            "é exatamente quando ataques direcionados aumentam.",
          feedbackError:
            "Vulnerabilidades são descobertas independente da idade do dispositivo. " +
            "Acumular atualizações significa ficar exposto por mais tempo, " +
            "não economizar esforço.",
          explanation:
            "Após a divulgação de uma atualização, ferramentas automatizadas " +
            "passam a escanear redes em busca de dispositivos na versão antiga. " +
            "Instalar rapidamente reduz drasticamente o tempo de exposição.",
        },
      },
  
      {
        id: "t3_m1_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que adiar atualizações não é neutro: " +
            "é escolher ficar no lado errado da proteção enquanto outros já fecharam a porta. " +
            "E quebrou os mitos mais comuns que fazem pessoas adiarem esse hábito.",
          keyTakeaway:
            "Atualizar rápido remove você da lista de alvos fáceis. Adiar é convite.",
          xpEarned: 45,
          nextMissionTeaser:
            "Seu software está atualizado. Mas e os cabos e portas que você usa? " +
            "Na próxima missão você vai ver como uma porta de carregamento " +
            "pode ser mais do que energia.",
          mascotMessage:
            "Segurança não é ser invisível. É deixar de ser fácil. " +
            "Você acabou de ficar mais difícil.",
        },
      },
    ],
  },
  
  { 
    title: "USB público: bateria ou brecha?",
    description:
      "Entender como estações USB públicas podem expor dados " +
      "e aplicar escolhas seguras no dia a dia.",
    xpReward: 40,         
    estimatedTime: 7,     
    category: "DEVICE",
    order: 2,
    iconUrl: "cable",
  
    content: [
      {
        id: "t3_m2_b1",
        type: "INFO",
        data: {
          title: "Nem toda porta USB entrega só energia.",
          text:
            "Na missão anterior você viu que dispositivos desatualizados " +
            "são alvos passivos: o ataque vem sem clique, sem aviso.\n\n" +
            "Agora o cenário é diferente: você está no aeroporto, " +
            "bateria em 5%, e um totem oferece carregamento USB gratuito.\n\n" +
            "Conectar parece inofensivo. Afinal, é só energia. " +
            "Mas portas USB também permitem transferência de dados. " +
            "Em estações adulteradas, essa conexão pode expor informações " +
            "do dispositivo sem qualquer alerta visível.",
          deepDive:
            "Ataques conhecidos como juice-jacking exploram a interface USB " +
            "para tentar acesso a dados ou instalar software malicioso.\n\n" +
            "Na maioria dos casos, nada acontece imediatamente: " +
            "o celular carrega normalmente, nenhum alerta aparece. " +
            "O objetivo muitas vezes não é invadir na hora, " +
            "mas coletar informações ou preparar acessos futuros " +
            "enquanto o usuário acredita estar apenas carregando o aparelho.\n\n" +
            "Sistemas modernos como iOS e Android exibem um alerta " +
            "perguntando se você confia no dispositivo conectado. " +
            "Nunca aceite esse prompt em estações públicas.",
          highlightBox:
            "Se o cabo não é seu, o controle também pode não ser.",
          mascotMessage:
            "Energia grátis sempre me deixou desconfiado. " +
            "Ninguém distribui acesso sem querer algo em troca.",
        },
      },
  
      {
        id: "t3_m2_b2",
        type: "MATCHING",
        data: {
          question:
            "Associe cada fonte de energia ao nível de risco que ela representa.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Tomada elétrica comum",
              rightId: "r1",
              rightText: "Fornece só energia, sem canal de dados",
            },
            {
              leftId: "l2",
              leftText: "Porta USB em totem público",
              rightId: "r2",
              rightText: "Pode permitir transferência de dados além de energia",
            },
            {
              leftId: "l3",
              leftText: "Power bank próprio",
              rightId: "r3",
              rightText: "Você controla o dispositivo e o cabo",
            },
          ],
          feedbackSuccess:
            "Correto. A diferença entre tomada e USB não é só o formato do plug: " +
            "é o que cada conexão permite além de energia.",
          feedbackError:
            "Pense em o que cada conexão permite além de transferir energia.",
          mascotMessage:
            "Os melhores ataques físicos parecem conveniência. " +
            "Um totem carregando seu celular é conveniente demais.",
        },
      },

      {
        id: "t3_m2_b3",
        type: "QUIZ",
        data: {
          question:
            "Você precisa carregar o celular urgentemente em local público. " +
            "Qual decisão reduz mais o risco?",
          options: [
            {
              id: "a",
              text: "Conectar na USB pública por apenas dois ou três minutos",
            },
            {
              id: "b",
              text: "Ativar modo avião antes de conectar na USB pública",
            },
            {
                id: "c",
                text: "Usar tomada elétrica com seu próprio carregador ou power bank",
              },
          ],
          correctOptionId: "c",
          feedbackSuccess:
            "Correto. Tomada elétrica fornece só energia. " +
            "Seu carregador ou power bank elimina o canal de dados.",
          feedbackError:
            "Dois minutos são suficientes para comunicação USB. " +
            "Modo avião desativa rádios (Wi-Fi, celular, Bluetooth) " +
            "mas não interfere na comunicação por cabo USB.",
          explanation:
            "A proteção real é eliminar o canal de dados, não limitar o tempo " +
            "ou desativar rádios sem fio. " +
            "Tomada elétrica e power bank próprio são as únicas opções " +
            "que garantem conexão apenas de energia.",
        },
      },
  
      {
        id: "t3_m2_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que a interface USB faz mais do que transferir energia. " +
            "Em estações públicas adulteradas, essa mesma conexão pode servir " +
            "como canal de acesso. " +
            "A proteção é simples: tomada elétrica ou power bank próprio.",
          keyTakeaway:
            "USB pública = canal de dados. Tomada elétrica = só energia. Carregue certo.",
          xpEarned: 40,
          nextMissionTeaser:
            "Você já cuida do que conecta. " +
            "Na próxima missão o risco é invisível: " +
            "as redes Wi-Fi que seu dispositivo encontra e confia automaticamente.",
          mascotMessage:
            "Power bank no bolso. Bom instinto. " +
            "A próxima ameaça não tem fio nenhum.",
        },
      },
    ],
  },  

  {
    title: "Wi-Fi público: conexão segura ou armadilha?",
    description:
      "Reconhecer riscos reais de redes públicas e tomar decisões seguras " +
      "antes e depois da conexão.",
    xpReward: 55,
    estimatedTime: 9,   
    category: "DEVICE",
    order: 3,
    iconUrl: "wifi",
  
    content: [
      {
        id: "t3_m3_b1",
        type: "INFO",
        data: {
          title: "O risco não está no Wi-Fi. Está no caminho.",
          text:
            "Na missão anterior você viu que uma porta USB pode ser mais " +
            "do que energia. Agora o risco é ainda mais invisível: " +
            "a rede que seu dispositivo encontra e confia automaticamente.\n\n" +
            "Em locais públicos, qualquer pessoa pode criar uma rede wifi com nome " +
            "parecido ao do estabelecimento. Seu celular não consegue distinguir " +
            "automaticamente uma rede legítima de uma falsa.\n\n" +
            "Mesmo quando a rede é verdadeira, dezenas de dispositivos " +
            "compartilham o mesmo ambiente digital. " +
            "O perigo começa antes de você abrir qualquer site.",
          deepDive:
            "Ataques Man-in-the-Middle acontecem quando alguém se posiciona " +
            "entre você e a internet. O atacante não invade seu celular. " +
            "Ele intercepta o caminho da comunicação, podendo redirecionar " +
            "para páginas falsas ou observar conexões sem criptografia adequada.\n\n" +            
            "Redes com nomes convincentes como 'Aeroporto_Free_Official' " +
            "são criadas especificamente para capturar conexões rápidas. " +
            "Intensidade de sinal e nome podem ser completamente fabricados. \n\n" +
            "VPN (Rede Privada Virtual) é um serviço que cria um túnel criptografado " +
            "entre seu dispositivo e a internet antes de qualquer dado sair pela rede local. " +
            "Em Wi-Fi público, impede que outros na mesma rede observem sua comunicação. " +
            "Opções gratuitas e confiáveis: ProtonVPN e Cloudflare WARP (1.1.1.1).",

          highlightBox:
            "Em redes públicas, você divide o mesmo espaço digital com desconhecidos.",
          mascotMessage:
            "As pessoas pensam que o ataque acontece depois do login. " +
            "Na prática, a decisão perigosa já foi tomada antes disso.",
        },
      },
      {
        id: "t3_m3_b2",
        type: "MATCHING",
        data: {
          question:
            "Associe o comportamento ao que ele expõe em uma rede Wi-Fi pública.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Acessar banco ou e-mail corporativo sem VPN",
              rightId: "r1",
              rightText: "Credenciais podem ser interceptadas no caminho",
            },
            {
              leftId: "l2",
              leftText: "Navegar em sites com HTTPS em rede não verificada",
              rightId: "r2",
              rightText: "Conteúdo criptografado, mas destino pode ser redirecionado",
            },
            {
              leftId: "l3",
              leftText: "Usar VPN ativa antes de qualquer acesso",
              rightId: "r3",
              rightText: "Cria canal criptografado antes de sair da rede local",
            },
          ],
          feedbackSuccess:
            "Correto. O risco não é binário. Muda conforme o que você faz e como você se protege.",
          feedbackError:
            "Pense no que cada comportamento expõe especificamente, " +
            "não só em quanto é perigoso de forma geral.",
          mascotMessage:
            "O problema raramente é conectar. É esquecer o que você decide fazer depois.",
        },
      },
      {
        id: "t3_m3_b3",
        type: "SORTING",
        data: {
          question:
            "Você precisa usar Wi-Fi público para acessar e-mail do trabalho. " +
            "Coloque as ações na ordem correta.",
          items: [
            { id: "s1", text: "Confirmar com o estabelecimento qual é o nome exato da rede" },
            { id: "s2", text: "Ativar VPN antes de conectar" },
            { id: "s3", text: "Verificar se os sites acessados usam HTTPS" },
            { id: "s4", text: "Evitar salvar senhas ou dados financeiros durante a sessão" },
            { id: "s5", text: "Desconectar e esquecer a rede ao terminar" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4", "s5"],
          feedbackSuccess:
            "Ordem correta. Confirmar a rede real e ativar VPN antes de qualquer acesso " +
            "são os dois passos que eliminam a maior parte do risco.",
          feedbackError:
            "VPN deve ser ativada antes de acessar qualquer coisa, " +
            "não depois de verificar os sites. " +
            "E esquecer a rede ao sair evita reconexão automática futura.",
          mascotMessage:
            "Esquecer a rede no final é o passo que ninguém lembra. " +
            "Eu lembrava.",
        },
      },
      {
        id: "t3_m3_b4",
        type: "QUIZ",
        data: {
          question:
            "Qual afirmação sobre Wi-Fi público está correta?",
          options: [
            {
              id: "a",
              text: "Acessar apenas sites com HTTPS em Wi-Fi público elimina o risco",
            },
            {
                id: "b",
                text: "Redes com nomes convincentes podem ser falsas e indistinguíveis da legítima",
            },
            {
              id: "c",
              text: "Se a rede pede senha, é confiável e não representa risco",
            },
          ],
          correctOptionId: "b",
          feedbackSuccess:
            "Exato. Nome, sinal e até senha podem ser fabricados. " +
            "A única verificação confiável é confirmar com a fonte.",
          feedbackError:
            "HTTPS protege o conteúdo mas não impede redirecionamento para sites falsos. " +
            "Senha em rede pública não garante quem criou ou controla essa rede: " +
            "qualquer pessoa pode criar uma rede protegida por senha para atrair conexões.",
          explanation:
            "Atacantes criam redes com senhas conhecidas ('wifi123') e nomes idênticos " +
            "aos do estabelecimento. Seu dispositivo não tem como validar a autenticidade " +
            "da rede, apenas o nome e a senha. VPN cria um canal criptografado " +
            "independente da confiabilidade da rede local.",
        },
      },
      {
        id: "t3_m3_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que o risco em Wi-Fi público não está na rede em si " +
            "mas no que você faz nela e em quem pode estar observando o caminho. " +
            "VPN antes da conexão e verificação do nome real da rede " +
            "eliminam a maior parte do risco.",
          keyTakeaway:
            "Confirme a rede, ative VPN, acesse. Nessa ordem. Sempre.",
          xpEarned: 55,
          nextMissionTeaser:
            "Você já cuida do cabo, da rede e do software. " +
            "Na próxima missão o ataque está impresso numa parede: " +
            "um QR code que parece legítimo mas leva para outro lugar.",
          mascotMessage:
            "Três camadas do ambiente protegidas. " +
            "Mas tem uma ameaça que você olha direto e não vê o perigo.",
        },
      },
    ],
  },

  {
    title: "QR Code: atalho ou armadilha?",
    description:
      "Entender como QR codes maliciosos são usados para redirecionar " +
      "vítimas e aplicar verificação antes de escanear.",
    xpReward: 50,
    estimatedTime: 9,
    category: "DEVICE",
    order: 4,
    iconUrl: "qr-code",
  
    content: [
  
      {
        id: "t3_m4_b1",
        type: "INFO",
        data: {
          title: "Um QR code é só um link disfarçado de imagem.",
          text:
            "Na missão anterior você aprendeu a desconfiar de redes com nomes convincentes. " +
            "Agora o golpe está impresso numa superfície física.\n\n" +
            "QR codes são apenas URLs codificadas em imagem. " +
            "Qualquer pessoa pode gerar um QR code que aponta para qualquer endereço. " +
            "E diferente de um link em e-mail, você não vê o destino antes de escanear.\n\n" +
            "Qhishing é o nome do ataque: um QR code falso colado sobre o original " +
            "em restaurantes, estacionamentos, totens de pagamento e cartazes " +
            "redireciona o usuário para uma página falsa antes que ele perceba.",
          deepDive:
            "No Brasil, ataques de qhishing cresceram junto com o uso de PIX e cardápios digitais. " +
            "O método mais comum é colar um QR code falso sobre o original em locais físicos. " +
            "A página de destino imita o sistema de pagamento ou login legítimo.\n\n" +
            "Diferente de phishing por e-mail, não há remetente suspeito para analisar. " +
            "O único sinal disponível é a barra de endereço assim que a página abre. " +
            "Leia o domínio principal antes de preencher qualquer campo.",
          highlightBox:
            "Você não vê o destino de um QR code antes de escanear. " +
            "Essa é a vantagem do atacante.",
          mascotMessage:
            "Papel e cola. Dois minutos de trabalho. " +
            "Eu levava horas montando ataques técnicos com resultado equivalente. " +
            "Aprendi a respeitar a simplicidade.",
        },
      },
  
      {
        id: "t3_m4_b2",
        type: "HOTSPOT",
        data: {
          allowMultiple: true,
          requiredSelections: 2,
          context: {
            type: "BROWSER",
            addressBar: [
              { type: "text",    content: "http://" },
              { type: "hotspot", regionId: "r_url",
                content: "cardapio.restaurantenorne.com.br" },
              { type: "text",    content: "/mesa/12" },
            ],
            pageTitle: "Confirmar Mesa — Restaurante Cardápio Digital",
            isHttps: false,
          },
          body: [
            { type: "text",
              content: "Bem-vindo ao sistema de pedidos.\n\n" },
            { type: "text",
              content:
                "Para confirmar sua mesa e acessar o cardápio, " +
                "preencha seus dados abaixo:\n\n" },
            { type: "text",
              content: "Nome completo:\n[campo de texto]\n\nCPF:\n[campo de texto]\n\n" },
            { type: "hotspot", regionId: "r_request",
              content: "Número do cartão para garantir a reserva:\n[campo de texto]" },
          ],
          regions: [
            {
              id: "r_url",
              feedback:
                "'restaurantenorne' não é 'restaurantenome'. " +
                "A letra 'm' foi trocada por 'rn' — em fontes comuns são quase indistinguíveis. " +
                "Além disso, a barra mostra '⚠ Não seguro' porque usa http sem S. " +
                "Sites legítimos de pagamento sempre usam https.",
              isCorrect: true,
            },
            {
              id: "r_request",
              feedback:
                "Nenhum cardápio digital precisa de número de cartão para confirmar mesa. " +
                "Dado além do necessário para a ação é sinal de coleta fraudulenta.",
              isCorrect: true,
            },
          ],
          feedbackError:
            "Dois segundos de leitura antes de digitar qualquer coisa. " +
            "Era exatamente essa pressa que eu precisava.",
        },
      },
  
      {
        id: "t3_m4_b3",
        type: "SORTING",
        data: {
          question:
            "Você vai escanear um QR code em um totem de pagamento. " +
            "Coloque as verificações na ordem correta.",
          items: [
            { id: "s1", text: "Verificar se o QR code parece colado sobre outro ou está danificado" },
            { id: "s2", text: "Escanear o código" },
            { id: "s3", text: "Verificar a barra de endereço assim que a página abrir" },
            { id: "s4", text: "Verificar se a página pede dados além do necessário para a ação" },
            { id: "s5", text: "Fechar se domínio ou solicitação não fizerem sentido" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4", "s5"],
          feedbackSuccess:
            "Correto. A verificação física vem antes do escaneamento. " +
            "Depois, a barra de endereço é o único sinal confiável " +
            "antes de expor qualquer dado.",
          feedbackError:
            "Verificar o QR code fisicamente antes de escanear " +
            "pode revelar sobreposição de adesivo, que é o método mais comum de adulteração.",
          mascotMessage:
            "A inspeção física leva dez segundos. " +
            "Ninguém faz. Era essa preguiça que eu explorava.",
        },
      },
  
      {
        id: "t3_m4_b4",
        type: "QUIZ",
        data: {
          question:
            "Você escaneou um QR code de cardápio e a página abriu. " +
            "Qual é o primeiro lugar para verificar se é legítima?",
          options: [
            {
              id: "a",
              text: "O local físico onde o QR code estava: estabelecimento sério não teria código falso",
            },
            {
              id: "b",
              text: "O visual da página: se parece idêntica ao restaurante, é confiável",
            },
            {
              id: "c",
              text: "A barra de endereço: ler o domínio principal antes de preencher qualquer dado",
            },
          ],
          correctOptionId: "c",
          feedbackSuccess:
            "Correto. Visual e local físico podem ser copiados ou adulterados. " +
            "O domínio na barra de endereço é o único dado que revela o destino real.",
          feedbackError:
            "Visual idêntico é exatamente o objetivo do ataque: copiar o layout legítimo. " +
            "QR codes em locais físicos são adulterados com adesivos colados sobre o original. " +
            "A barra de endereço é a única referência confiável.",
          explanation:
            "Leia o domínio principal na barra de endereço: " +
            "é a parte entre 'http://' e a primeira barra. " +
            "Diferenças sutis como 'norne' vs 'nome' são difíceis de ver em leitura rápida " +
            "e são escolhidas exatamente por isso. " +
            "O aviso '⚠ Não seguro' é um sinal extra: " +
            "sites legítimos de pagamento sempre usam https.",
        },
      },
  
      {
        id: "t3_m4_summary",
        type: "SUMMARY",
        data: {
          title: "Trilha 3 concluída.",
          summary:
            "Você completou a trilha de ambiente seguro. " +
            "Quatro missões, quatro camadas do mundo ao redor: " +
            "software desatualizado, cabo USB, rede Wi-Fi e QR code. " +
            "Em todos os casos, o ataque explora a confiança automática " +
            "em algo que parece comum e seguro.",
          keyTakeaway:
            "Verifique antes de conectar, escanear ou carregar. " +
            "O ataque sempre começa no automático.",
          xpEarned: 50,
          nextMissionTeaser:
            "Você protegeu suas contas e seu ambiente. " +
            "Na próxima trilha o cenário muda: ataques dentro da empresa, " +
            "onde a pressão vem de quem parece ser seu chefe.",
          mascotMessage:
            "Quatro missões. Você parou de confiar no automático. " +
            "No meu tempo, esse tipo de alvo me custava tempo demais. " +
            "Seguia em frente.",
        },
      },
  
    ],
  }
];

export const missionsEixo04_Track04 = [
  {
    title: "E-mail do Diretor: é mesmo?",
    description:
      "Reconhecer pedidos urgentes feitos em nome da liderança e validar " +
      "antes de compartilhar informações.",
    xpReward: 70,
    estimatedTime: 8,   
    category: "CORPORATE",
    order: 1,
    iconUrl: "mail-question-mark",
    
    content: [
      {
        id: "t4_m1_b1",
        type: "INFO",
        data: {
          title: "Parece só mais um pedido.",
          text:
            "Nas trilhas anteriores os ataques vinham do ambiente: " +
            "software desatualizado, cabo USB, rede Wi-Fi, QR code. " +
            "Agora o vetor muda. O ataque vem de dentro, " +
            "disfarçado como comunicação normal de trabalho.\n\n" +
            "Durante o expediente, chega um e-mail aparentemente enviado " +
            "pela diretoria solicitando acesso imediato a um relatório confidencial. " +
            "Nada fora do comum. Apenas urgente.\n\n" +
            "Esse tipo de ataque é chamado BEC, Business Email Compromise. " +
            "O atacante não parece criminoso. Parece ocupado, legítimo e com pressa.",
          deepDive:
            "BEC é uma das fraudes corporativas de maior impacto financeiro no mundo. " +
            "O FBI estima perdas de bilhões de dólares anuais globalmente.\n\n" +
            "O ataque começa com coleta de informações públicas sobre a empresa: " +
            "LinkedIn, site institucional, redes sociais. " +
            "Com isso, o atacante conhece o nome do diretor, o tom de comunicação " +
            "e o contexto da empresa antes de enviar qualquer mensagem.\n\n" +
            "O domínio do remetente costuma ser quase idêntico ao real: " +
            "'empresa-corp.co' em vez de 'empresa-corp.com.br'.",
          highlightBox:
            "Quando autoridade encontra urgência, o cérebro tende a obedecer antes de analisar.",
          mascotMessage:
            "Curioso como quase todo incidente corporativo começa parecendo produtividade.",
        },
      },
      {
        id: "t4_m1_b2",
        type: "HOTSPOT",
        data: {
          allowMultiple: true,
          requiredSelections: 4,
          context: {
            type: "EMAIL",
            sender: [
              { type: "text",    content: "Ricardo Almeida — Diretoria <r.almeida@" },
              { type: "hotspot", regionId: "r_domain", content: "grupoinova-corp.co" },
              { type: "text",    content: ">" },
            ],
            subject: "Re: Fornecedor Apex — documentação para fechar hoje",
          },
          body: [
            { type: "text",
              content: "Bom dia,\n\n" },
            { type: "text",
              content: "Estou finalizando a reunião com a Apex agora. " +
                       "Eles pediram a projeção do Q3 antes de assinar. " +
                       "Precisamos fechar ainda hoje ou perdemos a janela de precificação.\n\n" },
            { type: "hotspot", regionId: "r_bypass",
              content: "Estou sem VPN aqui no cliente, não consigo acessar o drive interno. " +
                       "Me manda direto por aqui mesmo, rápido." },
            { type: "text",
              content: "\n\n" },
            { type: "hotspot", regionId: "r_scope",
              content: "Precisa ser o arquivo completo com os números de margem, " +
                       "não o resumo executivo." },
            { type: "text",
              content: "\n\n" },
            { type: "hotspot", regionId: "r_urgency",
              content: "Eles estão esperando. Me liga se tiver qualquer problema mas manda o arquivo agora." },
            { type: "text",
              content: "\n\nRicardo" },
          ],
          regions: [
            {
              id: "r_domain",
              feedback:
                "O domínio real da empresa seria 'grupoinova.com.br'. " +
                "'grupoinova-corp.co' é um domínio registrado separadamente, " +
                "praticamente indistinguível em leitura rápida. " +
                "O hífen e o '.co' são as únicas diferenças.",
              isCorrect: true,
            },
            {
              id: "r_bypass",
              feedback:
                "A justificativa 'sem VPN, não consigo acessar o drive' força " +
                "o envio por e-mail e elimina o canal oficial de compartilhamento. " +
                "Pedidos legítimos não substituem processo por canal externo sob pressão.",
              isCorrect: true,
            },
            {
              id: "r_scope",
              feedback:
                "A especificação 'arquivo completo com números de margem' indica " +
                "que o atacante sabe o que está pedindo e o que vale. " +
                "Dados de margem são justamente os mais sensíveis comercialmente.",
              isCorrect: true,
            },
            {
              id: "r_urgency",
              feedback:
                "A combinação 'eles estão esperando' + 'manda agora' " +
                "comprime o tempo de análise. " +
                "A oferta de ligar 'se tiver problema' parece razoável " +
                "mas é usada para manter você no cenário do atacante.",
              isCorrect: true,
            },
          ],
          feedbackError:
            "Esse e-mail tem quatro sinais. Procure o domínio, " +
            "o que impede o canal oficial, o que especificamente é pedido " +
            "e o que comprime sua decisão.",
          mascotMessage:
            "Quatro sinais nesse e-mail. Você encontrou todos? "
        },
      },
      {
        id: "t4_m1_b3",
        type: "QUIZ",
        data: {
          question:
            "Você recebeu esse e-mail. Qual atitude reduz o risco?",
          options: [        
            {
                id: "opt1",
                text: "Responder o e-mail pedindo confirmação antes de enviar",
            },
            {
                id: "opt2",
                text: "Confirmar por canal interno oficial",
            },
            {
              id: "opt3",
              text: "Enviar apenas um resumo do relatório, sem os dados completos",
            },
          ],
          correctOptionId: "opt2",
          feedbackSuccess:
            "Correto. Sair do canal interrompe o ataque. " +
            "O atacante perde o controle da narrativa.",
          feedbackError:
            "Responder no mesmo e-mail mantém você dentro do canal controlado pelo atacante, " +
            "que pode responder fingindo ser o diretor novamente. " +
            "Enviar parte do relatório ainda expõe dados estratégicos reais.",
          explanation:
            "Ataques BEC dependem de manter a vítima dentro do mesmo canal. " +
            "Uma ligação para o número que você já tem salvo é suficiente " +
            "para desmontar o ataque inteiro. " +
            "O risco surge no momento em que dados estratégicos são enviados " +
            "sem confirmação independente.",
        },
      },
      {
        id: "t4_m1_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu a reconhecer os quatro sinais de um ataque BEC: " +
            "domínio sutilmente diferente, solicitação fora do fluxo normal, " +
            "justificativa que impede verificação e urgência fabricada. " +
            "Phishing corporativo raramente parece um ataque. " +
            "Ele se disfarça como rotina, urgência ou autoridade.",
          keyTakeaway:
            "Mude o canal. Uma ligação para o número já conhecido desfaz qualquer BEC.",
          xpEarned: 70,
          nextMissionTeaser:
            "O próximo ataque nem usa e-mail. " +
            "Vem por ligação, de alguém que soa exatamente como o suporte de TI da empresa.",
          mascotMessage:
            "Às vezes o invasor nem precisa entrar. Alguém abre a porta. " +
            "Você acabou de aprender a não abrir.",
        },
      },
    ],
  },

  {
    title: "O Suporte Falso da TI (Vishing)",
    description:
      "Reconhecer ataques de engenharia social por voz e responder " +
      "sem expor credenciais ou acesso interno.",
    xpReward: 70,
    estimatedTime: 9,     
    category: "CORPORATE",
    order: 2,
    iconUrl: "headset",
  
    content: [
      {
        id: "t4_m2_b1",
        type: "INFO",
        data: {
          title: "O telefone toca. É a TI.",
          text:
            "Na missão anterior o ataque chegou por e-mail com domínio falso. " +
            "Agora o canal muda e a pressão aumenta.\n\n" +
            "Você recebe uma ligação informando atividade suspeita na sua conta " +
            "e solicitando confirmação imediata de dados ou códigos. " +
            "A voz transmite credibilidade, cria urgência e reduz o tempo " +
            "para você pensar.\n\n" +
            "Vishing é o nome desse ataque: engenharia social por voz. " +
            "O objetivo é impedir verificação independente fazendo a solicitação " +
            "parecer parte de um procedimento técnico urgente.",
          deepDive:
            "O atacante geralmente quer uma das três coisas: " +
            "sua senha, um código de verificação que chegou por SMS " +
            "ou autorização para instalar acesso remoto.\n\n" +
            "Com acesso remoto instalado, o invasor vê tudo que acontece " +
            "na tela em tempo real, incluindo senhas digitadas, e-mails abertos " +
            "e documentos acessados. A partir daí pode copiar dados, " +
            "alterar configurações ou instalar malware sem mais interação.\n\n" +
            "TI interna legítima nunca pede senha ou código de verificação " +
            "por telefone. Isso não faz parte de nenhum procedimento técnico real.",
          highlightBox:
            "TI real nunca pede sua senha. Se pediu, não é a TI.",
          mascotMessage:
            "Engenharia social por voz tem uma vantagem técnica sobre e-mail: " +
            "você não consegue inspecionar o cabeçalho de uma voz. " 
        },
      },
      {
        id: "t4_m2_b2",
        type: "QUIZ",
        data: {
          question:
            "Você está ao telefone com o suposto suporte de TI quando chega " +
            "esse SMS no seu celular:\n\n" +
            "\"TI-SUPORTE: Seu código de verificação: 847291. " +
            "Nunca compartilhe este código. Expira em 5 minutos.\"\n\n" +
            "O atendente pede que você leia o código em voz alta para 'validar o acesso'. " +
            "O que você faz?",
          options: [
            {
              id: "b",
              text: "Recusar e encerrar a ligação, o próprio SMS avisa para nunca compartilhar",
            },
            {
              id: "a",
              text: "Compartilhar apenas o código, sem a senha, não representa risco real",
            },
            {
              id: "c",
              text: "Informar o código, o setor de TI usa esse método para verificar identidade remotamente",
            },
          ],
          correctOptionId: "b",
          feedbackSuccess:
            "Correto. O SMS já respondeu a pergunta antes de você precisar decidir.",
          feedbackError:
            "Esse código é seu segundo fator de autenticação. " +
            "Quem pede que você leia em voz alta está usando esse código para " +
            "acessar sua conta agora, em tempo real, enquanto fala com você. " +
            "TI interna não usa esse método porque não precisa: " +
            "tem ferramentas administrativas que não dependem da sua credencial.",
          explanation:
            "Ataques de MFA fatigue e vishing combinados funcionam assim: " +
            "o atacante já tem sua senha (obtida em vazamento) e só precisa " +
            "do código de segundo fator. A ligação é exatamente para isso. " +
            "O aviso no SMS existe para esse cenário específico.",
          mascotMessage:
            "O SMS disse tudo. Você só precisava ler até o fim.",
        },
      },
      {
        id: "t4_m2_b3",
        type: "SORTING",
        data: {
          question:
            "Você recebeu a ligação e identificou que pode ser vishing. " +
            "Coloque as ações na ordem correta.",
          items: [
            { id: "s1", text: "Não fornecer nenhuma senha, código ou dado durante a ligação" },
            { id: "s2", text: "Anotar o nome e ramal informado pelo suposto atendente" },
            { id: "s3", text: "Encerrar a ligação educadamente" },
            { id: "s4", text: "Ligar para o número oficial da TI que você já conhece" },
            { id: "s5", text: "Reportar a tentativa para o time de segurança" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4", "s5"],
          feedbackSuccess:
            "Ordem correta. Não fornecer dados durante a ligação é a ação mais crítica. " +
            "Tudo que vem depois é investigação e prevenção.",
          feedbackError:
            "A primeira ação é sempre não fornecer nada enquanto a ligação acontece. " +
            "Encerrar antes de ligar para a TI não é descortesia, é protocolo.",
          mascotMessage:
            "Pressa é ferramenta do invasor. Encerrar a ligação é ferramenta sua.",
        },
      },
      {
        id: "t4_m2_b4",
        type: "QUIZ",
        data: {
          question:
            "Você está na ligação e o suporte pede sua senha " +
            "para 'resetar o acesso e resolver o problema'. Qual é a ação correta?",
          options: [
            {
              id: "opt1",
              text: "Recusar, encerrar a ligação e contatar a TI pelo canal oficial",
            },
            {
              id: "opt2",
              text: "Pedir o número de funcionário e confirmar o nome antes de fornecer",
            },
            {
              id: "opt3",
              text: "Pedir para ligar de volta depois, quando tiver mais tempo para verificar",
            },
          ],
          correctOptionId: "opt1",
          feedbackSuccess:
            "Correto. TI real nunca precisa da sua senha para resolver qualquer problema.",
          feedbackError:
            "Confirmar número de funcionário não valida nada — o atacante já preparou essas respostas. " +
            "Pedir para ligar depois ainda mantém o risco ativo e pode gerar segunda tentativa " +
            "com mais informações sobre você. " +
            "Encerrar e ligar pelo canal que você já conhece é o único caminho seguro.",
          explanation:
            "Senhas não são necessárias para nenhum procedimento legítimo de suporte de TI. " +
            "Se um técnico precisar agir na sua conta, ele usa ferramentas administrativas " +
            "sem precisar da sua credencial. " +
            "Qualquer solicitação de senha por telefone é, por definição, suspeita.",
        },
      },
      {
        id: "t4_m2_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que vishing explora pressão temporal e autoridade técnica. " +
            "TI real não pede senha nem código por telefone, em nenhuma circunstância. " +
            "O protocolo correto é recusar durante a ligação, encerrar e confirmar " +
            "pelo canal que você já conhece.",
          keyTakeaway:
            "TI real não pede sua senha. Encerre e ligue pelo número que você já tem.",
          xpEarned: 70,
          nextMissionTeaser:
            "O próximo risco não vem de fora. " +
            "Está na sua própria tela, aberta para todos na reunião.",
          mascotMessage:
            "Duas missões na trilha corporativa. " +
            "Você está difícil de enganar por voz e por texto. " +
            "A próxima é sobre o que você mostra sem perceber.",
        },
      },
    ],
  },

  {
    title: "Tela Compartilhada, Responsabilidade Exposta",
    description:
      "Identificar o que não deve aparecer em tela durante reuniões " +
      "e criar o hábito de preparação antes de compartilhar.",
    xpReward: 60,
    estimatedTime: 9,     
    category: "CORPORATE",
    order: 3,
    iconUrl: "cast",
  
    content: [
      {
        id: "t4_m3_b1",
        type: "INFO",
        data: {
          title: "Antes de compartilhar a tela.",
          text:
            "Nas missões anteriores os ataques exigiam ação do invasor: " +
            "e-mail falso, ligação, domínio adulterado. " +
            "Agora o vazamento não precisa de nenhum atacante externo. " +
            "Você mesmo exibe os dados.\n\n" +
            "Reuniões virtuais frequentemente exigem compartilhamento de tela. " +
            "Arquivos abertos, notificações, abas do navegador e histórico " +
            "podem expor informações confidenciais sem nenhuma intenção.\n\n" +
            "Diferente de outros tipos de vazamento, este acontece ao vivo, " +
            "na frente de todos, e não pode ser desfeito.",
          deepDive:
            "Vazamentos visuais em reuniões são uma das causas mais comuns " +
            "de exposição corporativa não intencional. " +
            "Dados pessoais de clientes, contratos, valores internos e " +
            "informações estratégicas podem ser capturados por participantes " +
            "em gravações ou capturas de tela.\n\n" +
            "Sob a LGPD, a responsabilidade pelo dado exposto é de quem o " +
            "exibiu, independente de intenção. " +
            "Isso se aplica a qualquer colaborador, não apenas à equipe de TI.",
          highlightBox:
            "Tudo que aparece na tela deve ser tratado como público durante uma apresentação.",
          mascotMessage:
            "O vazamento mais elegante que já vi não usou malware, " +
            "phishing nem engenharia social. " +
            "Alguém simplesmente abriu o arquivo errado na hora errada. " +
            "Segundos. Pronto."
        },
      },
      {
        id: "t4_m3_b2",
        type: "MATCHING",
        data: {
          question:
            "Associe o tipo de dado exposto acidentalmente ao impacto que pode gerar.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Planilha com dados pessoais de clientes visível na tela",
              rightId: "r1",
              rightText: "Violação da LGPD com possibilidade de multa e notificação obrigatória",
            },
            {
              leftId: "l2",
              leftText: "Proposta comercial confidencial aberta ao fundo",
              rightId: "r2",
              rightText: "Perda de vantagem competitiva se participante for concorrente",
            },
            {
              leftId: "l3",
              leftText: "Valores de remuneração interna em notificação pop-up",
              rightId: "r3",
              rightText: "Dano ao clima organizacional e quebra de confiança interna",
            },
          ],
          feedbackSuccess:
            "Correto. Cada tipo de dado exposto tem um tipo específico de consequência.",
          feedbackError:
            "Pense no impacto específico de cada dado: " +
            "legal, competitivo ou organizacional.",
          mascotMessage:
            "Não é só vergonha. É impacto financeiro, legal e reputacional.",
        },
      },
      {
        id: "t4_m3_b3",
        type: "SORTING",
        data: {
          question:
            "Você vai compartilhar tela numa reunião com cliente externo. " +
            "Coloque as preparações na ordem correta.",
          items: [
            { id: "s1", text: "Fechar abas, notificações e apps que não serão usados" },
            { id: "s2", text: "Verificar se há dados confidenciais visíveis no arquivo" },
            { id: "s3", text: "Compartilhar a tela" },
          ],
          correctOrder: ["s1", "s2", "s3" ],
          feedbackSuccess:
            "Correto. Limpar o ambiente antes de abrir o arquivo evita " +
            "que uma notificação ou aba aberta apareça durante a preparação.",
          feedbackError:
            "Fechar notificações antes de abrir o arquivo é a ordem correta: " +
            "uma notificação pode aparecer exatamente quando você abre o arquivo " +
            "se você fizer na ordem inversa.",
          mascotMessage:
            "Fechar notificação antes de abrir o arquivo. " +
            "Parece óbvio até o momento em que o chefe recebe o print " +
            "do salário do colega que apareceu no fundo da tela.",
        },
      },
      {
        id: "t4_m3_b4",
        type: "QUIZ",
        data: {
          question:
            "Durante uma reunião gravada, uma planilha com CPF de clientes " +
            "aparece por alguns segundos na sua tela compartilhada. " +
            "Qual é a implicação legal?",
          options: [
            {
              id: "opt3",
              text: "Possível violação da LGPD, independente de ter sido acidental",
            },
            {
              id: "opt2",
              text: "Nenhuma, a LGPD se aplica apenas a sistemas de armazenamento, não a reuniões",
            },
            {
              id: "opt1",
              text: "A responsabilidade é de quem gravou a reunião, não de quem compartilhou a tela",
            },
          ],
          correctOptionId: "opt3",
          feedbackSuccess:
            "Correto. A LGPD prevê responsabilidade pelo tratamento inadequado " +
            "de dados pessoais, e exibição em reunião é tratamento.",
          feedbackError:
            "A LGPD não se restringe a bancos de dados: qualquer exposição de dados pessoais " +
            "sem finalidade adequada pode configurar tratamento indevido. " +
            "A responsabilidade recai sobre quem expôs o dado, " +
            "independente de quem estava presente ou gravou.",
          explanation:
            "Sob a LGPD, o conceito de tratamento de dados inclui qualquer operação " +
            "que torne o dado acessível a terceiros, intencional ou não. " +
            "Acidentes não eliminam a responsabilidade — apenas podem mitigar sanções " +
            "se houver evidência de medidas preventivas adotadas.",
        },
      },
      {
        id: "t4_m3_summary",
        type: "SUMMARY",
        data: {
          title: "Trilha 4 concluída.",
          summary:
            "Você completou a trilha de engenharia social corporativa. " +
            "Três missões, três vetores: e-mail com domínio falso, " +
            "ligação com pressão técnica e exposição visual não intencional. " +
            "Em todos os casos, o ataque ou o vazamento depende de uma " +
            "decisão sua, não de uma invasão técnica.",
          keyTakeaway:
            "BEC, vishing e vazamento visual têm a mesma raiz: decisão sob pressão sem verificação.",
          xpEarned: 60,
          nextMissionTeaser:
            "Você protegeu suas contas, seu ambiente e sua empresa. " +
            "Na próxima trilha o cenário muda radicalmente: " +
            "como a inteligência artificial está criando ameaças " +
            "que não existiam há dois anos.",
          mascotMessage:
            "Três trilhas corporativas concluídas. " +
            "Você parou de ser o elo mais fácil da cadeia. " +
            "A próxima trilha... nem eu estava preparado para ela.",
        },
      },
    ],
  }
];

export const missionsEixo04_Track05 = [
  {
    title: "Ransomware: 10 Minutos Que Decidem Tudo",
    description:
      "Aprender a agir com método diante de um ataque de ransomware " +
      "e evitar ampliar o impacto nos primeiros minutos.",
    xpReward: 80,
    estimatedTime: 10,    
    category: "INCIDENT",
    order: 1,
    iconUrl: "file-lock",
  
    content: [
      {
        id: "t5_m1_b1",
        type: "INFO",
        data: {
          title: "A tela trava. Um cronômetro aparece.",
          text:
            "Nas trilhas anteriores os ataques dependiam de você tomar uma decisão errada: " +
            "abrir um e-mail, fornecer uma senha, expor dados na tela. " +
            "Ransomware é diferente: quando a mensagem aparece, " +
            "o ataque já aconteceu. A decisão agora é o que você faz nos próximos minutos.\n\n" +
            "Você inicia o computador e surge uma mensagem informando que seus arquivos " +
            "foram criptografados. Um prazo exige pagamento.\n\n" +
            "O impulso é tentar reiniciar ou resolver rapidamente. " +
            "Mas cada ação errada pode espalhar o malware pela rede inteira " +
            "antes que a TI saiba que existe um problema.",
          deepDive:
            "Ransomware moderno se move lateralmente pela rede corporativa antes " +
            "de exibir a mensagem de resgate. Quando você vê o aviso, " +
            "outros dispositivos podem já estar sendo criptografados.\n\n" +
            "Reiniciar mantém a conexão de rede ativa por mais tempo. " +
            "Tentar recuperar arquivos localmente pode acionar rotinas de " +
            "propagação. Pagar o resgate não garante recuperação dos dados " +
            "e financia o próximo ataque.\n\n" +
            "Em casos com dados pessoais comprometidos, " +
            "a LGPD exige notificação à ANPD e aos titulares afetados.",
          highlightBox:
            "Em ransomware, o maior dano raramente vem do ataque inicial. " +
            "Vem das ações tomadas nos primeiros minutos.",
          mascotMessage:
            "Quando o relógio aparece, humanos finalmente percebem " +
            "que deveriam ter parado antes de clicar.",
        },
      },
      {
        id: "t5_m1_b2",
        type: "CLASSIFICATION",
        data: {
          question:
            "Você identificou um ransomware no computador. " +
            "Classifique cada ação entre 'Fazer agora' e 'Nunca fazer'.",
          categories: [
            { id: "c1", name: "Fazer agora" },
            { id: "c2", name: "Nunca fazer" },
          ],
          items: [
            {
              id: "i1",
              text: "Desconectar o cabo de rede e desativar Wi-Fi",
              categoryId: "c1",
            },
            {
              id: "i3",
              text: "Documentar o que aparece na tela (foto com celular)",
              categoryId: "c1",
            },
            {
              id: "i5",
              text: "Negociar ou realizar o pagamento do resgate por conta própria",
              categoryId: "c2",
            },
            {
              id: "i2",
              text: "Avisar imediatamente a TI ou o responsável de segurança",
              categoryId: "c1",
            },          
            {
              id: "i4",
              text: "Reiniciar o computador para tentar limpar o problema",
              categoryId: "c2",
            },            
            {
              id: "i6",
              text: "Tentar recuperar os arquivos usando ferramentas baixadas da internet",
              categoryId: "c2",
            },
          ],
          feedbackSuccess:
            "Correto. Isolar o dispositivo e comunicar são as únicas ações seguras. " +
            "Todo o resto amplifica o problema.",
          feedbackError:
            "Reiniciar mantém a conexão de rede ativa por mais tempo e pode " +
            "acionar rotinas de propagação. " +
            "Ferramentas externas podem ser malware disfarçado de solução.",
          mascotMessage:
            "Vírus adoram ambientes onde alguém tenta resolver sozinho. " +
            "Facilita se espalhar enquanto a atenção está em outro lugar.",
        },
      },
      {
        id: "t5_m1_b3",
        type: "SORTING",
        data: {
          question:
            "Com o ransomware identificado, coloque as ações na ordem correta.",
          items: [
            { id: "s1", text: "Desconectar o computador da rede imediatamente" },
            { id: "s2", text: "Fotografar a tela com o celular para documentar" },
            { id: "s3", text: "Avisar a TI ou responsável de segurança" },
            { id: "s4", text: "Registrar o ocorrido conforme política interna" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4"],
          feedbackSuccess:
            "Isolar antes de comunicar parece contraintuitivo " +
            "mas cada segundo conectado é uma chance de propagação. " +
            "Documentar antes de ligar garante que as informações não se percam " +
            "se a tela mudar enquanto você está ao telefone.",
          feedbackError:
            "Desconectar vem primeiro: interrompe a propagação antes de qualquer outra ação. " +
            "Documentar antes de avisar a TI garante que o estado do ataque " +
            "está registrado antes de qualquer mudança.",
          mascotMessage:
            "Isolar, documentar, comunicar. " +
            "O resto é com quem sabe o que está fazendo.",
        },
      },
      
      {
        id: "t5_m1_b4",
        type: "QUIZ",
        data: {
          question:
            "Qual é o maior risco de tentar resolver sozinho " +
            "um ataque de ransomware?",
          options: [
            {
              id: "opt1",
              text: "Espalhar a infecção para outros sistemas da empresa enquanto tenta agir",
            },
            {
              id: "opt2",
              text: "Nenhum, pagar o resgate é a forma mais rápida de retomar operações",
            },
            {
              id: "opt3",
              text: "Nenhum, reiniciar o computador interrompe o malware antes de se espalhar",
            },
          ],
          correctOptionId: "opt1",
          feedbackSuccess:
            "Exato. Ação precipitada sem isolar o dispositivo primeiro " +
            "é a principal causa de ransomware que começa em um computador " +
            "e paralisa a empresa inteira.",
          feedbackError:
            "Pagar o resgate não garante recuperação dos dados: " +
            "em boa parte dos casos os arquivos não são devolvidos mesmo após pagamento, " +
            "e o pagamento financia o próximo ataque. " +
            "Reiniciar mantém a conexão de rede ativa e pode acionar " +
            "rotinas de propagação do malware para outros dispositivos.",
          explanation:
            "Ransomware moderno se move pela rede antes de exibir a mensagem de resgate. " +
            "Desconectar da rede primeiro interrompe essa propagação. " +
            "Qualquer outra ação antes disso mantém o malware com acesso à infraestrutura.",
        },
      },
      {
        id: "t5_m1_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que em ransomware o ataque já aconteceu " +
            "quando você vê a mensagem. " +
            "A batalha agora é impedir a propagação. " +
            "Isolar, documentar e comunicar na ordem certa " +
            "pode ser a diferença entre um computador afetado e uma empresa paralisada.",
          keyTakeaway:
            "Desconectar da rede primeiro. Sempre. Antes de qualquer outra ação.",
          xpEarned: 80,
          nextMissionTeaser:
            "Você sabe responder a um incidente. " +
            "Na próxima missão o risco é mais silencioso: " +
            "ferramentas que os próprios colaboradores instalam " +
            "sem saber que estão abrindo uma porta.",
          mascotMessage:
            "Controle em crise. Isso é raro. " +
            "A próxima missão é sobre o que acontece quando " +
            "ninguém percebe que há uma crise.",
        },
      },
    ],
  },

  {
    title: "Shadow IT: A Ferramenta Invisível",
    description:
      "Entender os riscos que ferramentas não aprovadas introduzem " +
      "e como avaliar antes de usar.",
    xpReward: 70,
    estimatedTime: 9,   
    category: "POLICY",
    order: 2,
    iconUrl: "ghost",
  
    content: [
      {
        id: "t5_m2_b1",
        type: "INFO",
        data: {
          title: "É só um atalho para resolver rápido.",
          text:
            "Você aprendeu anteriormente que ransomware entra silenciosamente " +
            "e se espalha enquanto ninguém percebe. " +
            "Shadow IT cria o mesmo problema, só que de dentro para fora.\n\n" +
            "Você precisa compartilhar um arquivo grande. " +
            "O sistema interno está lento. Um colega sugere uma plataforma externa gratuita. " +
            "Em minutos o problema parece resolvido.\n\n" +
            "Mas agora os dados existem fora do ambiente controlado da empresa, " +
            "em servidores que você não conhece, com políticas de acesso que ninguém leu.",
          deepDive:
            "Shadow IT acontece quando colaboradores usam ferramentas não homologadas " +
            "para tarefas corporativas. A intenção é ganhar agilidade, " +
            "o resultado é perda de controle sobre dados estratégicos e pessoais.\n\n" +
            "O problema não é a ferramenta em si. É que ao sair do ambiente aprovado, " +
            "a empresa perde capacidade de resposta a incidentes, " +
            "rastreabilidade de acesso e controle contratual sobre os dados.\n\n" +
            "Se houver vazamento envolvendo dados pessoais, " +
            "a LGPD prevê responsabilidade independente de qual ferramenta foi usada.",
          highlightBox:
            "Quando a conveniência supera o controle, o risco deixa de ser visível.",
          mascotMessage:
            "Ferramentas não aprovadas não parecem perigosas. " +
            "Esse é exatamente o charme delas. " +
            "Do meu ponto de vista anterior, claro.",
        },
      },
      {
        id: "t5_m2_b2",
        type: "MATCHING",
        data: {
          question:
            "Associe cada situação ao risco que ela cria para a empresa.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Upload de planilha com dados de clientes em plataforma externa",
              rightId: "r1",
              rightText: "Dados pessoais fora do controle da empresa, LGPD aplicável",
            },
            {
              leftId: "l2",
              leftText: "Uso de IA pública para revisar contrato interno",
              rightId: "r2",
              rightText: "Cláusulas confidenciais podem virar dado de treinamento do modelo de IA",
            },
            {
              leftId: "l3",
              leftText: "Arquivos corporativos salvos em armazenamento pessoal",
              rightId: "r3",
              rightText: "Empresa não consegue revogar acesso se o colaborador sair",
            },
          ],
          feedbackSuccess:
            "Correto. Cada atalho cria um tipo específico de exposição " +
            "que a empresa não consegue remediar depois.",
          feedbackError:
            "Observe o tipo de dado envolvido e o que acontece com ele " +
            "depois que sai do ambiente da empresa.",
          mascotMessage:
            "Ferramenta fora do radar é dado fora do controle. " +
            "Essa equação eu conhecia bem.",
        },
      },
      {
        id: "t5_m2_b3",
        type: "SORTING",
        data: {
          question:
            "Você precisa usar uma ferramenta externa para uma tarefa urgente. " +
            "Coloque as etapas na ordem correta.",
          items: [
            { id: "s1", text: "Verificar se existe ferramenta aprovada pela empresa para a mesma tarefa" },
            { id: "s2", text: "Consultar TI antes de usar qualquer ferramenta externa" },
            { id: "s3", text: "Documentar o uso para rastreabilidade interna" },
          ],
          correctOrder: ["s1", "s2", "s3"],
          feedbackSuccess:
            "Verificar a ferramenta aprovada primeiro frequentemente resolve " +
            "o problema sem nenhum risco.",
          feedbackError:
            "Consultar antes de usar parece burocrático mas é o único passo " +
            "que mantém a empresa ciente de onde seus dados existem.",
          mascotMessage:
            "Metade das brechas que eu explorava existiam porque " +
            "ninguém consultou antes de usar.",
        },
      },
      {
        id: "t5_m2_b4",
        type: "QUIZ",
        data: {
          question:
            "Por que usar uma ferramenta externa popular e gratuita " +
            "ainda representa risco para a empresa?",
          options: [
            {
              id: "opt2",
              text: "Porque a empresa perde visibilidade e controle sobre onde os dados existem",
            },
            {
              id: "opt1",
              text: "Não representa, desde que a ferramenta seja conhecida e amplamente usada",
            },
            {
              id: "opt3",
              text: "Só representa risco se envolver dados pessoais de clientes",
            },
          ],
          correctOptionId: "opt2",
          feedbackSuccess:
            "Exato. Popularidade não garante conformidade com políticas internas " +
            "nem controle de acesso adequado.",
          feedbackError:
            "Ferramentas populares têm suas próprias políticas de uso e privacidade " +
            "que podem não ser compatíveis com contratos da empresa. " +
            "Dados estratégicos internos, mesmo sem CPF de cliente, " +
            "podem ter valor comercial e implicações contratuais se expostos.",
          explanation:
            "Shadow IT não é sobre a qualidade da ferramenta. " +
            "É sobre a empresa perder capacidade de resposta quando algo der errado: " +
            "quem acessou, quando, o que foi compartilhado e como revogar. " +
            "Sem homologação, essas perguntas ficam sem resposta.",
          mascotMessage:
            "Sem visibilidade não existe proteção. " +
            "Sem proteção existe oportunidade. " +
            "Eu precisava apenas de uma.",
        },
      },
      {
        id: "t5_m2_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que Shadow IT não é sobre má intenção. " +
            "É sobre conveniência que cria riscos invisíveis. " +
            "Dados corporativos que saem do ambiente controlado " +
            "deixam de ser rastreáveis, revogáveis e protegidos pela empresa.",
          keyTakeaway:
            "Ferramenta não aprovada = dado fora do controle. Consulte antes de usar.",
          xpEarned: 70,
          nextMissionTeaser:
            "Você entende onde os dados não devem ir. " +
            "Na próxima missão você vai aprender a classificar " +
            "o que é dado pessoal, quando você pode usá-lo e o que fazer quando vaza.",
          mascotMessage:
            "Dois incidentes da trilha. " +
            "Um barulhento com contador regressivo, um silencioso com ícone de nuvem. " +
            "O silencioso costumava ser mais produtivo.",
        },
      },
    ],
  },

  {
    title: "LGPD: O Que Conta Como Dado Pessoal?",
    description:
      "Entender o que conta como dado pessoal, quando você pode tratá-lo " +
      "e o que fazer obrigatoriamente quando há vazamento.",
    xpReward: 75,
    estimatedTime: 10,   
    category: "POLICY",
    order: 3,
    iconUrl: "scale",
  
    content: [
      {
        id: "t5_m3_b1",
        type: "INFO",
        data: {
          title: "LGPD não é só para o jurídico.",
          text:
            "Nas missões anteriores você viu que expor dados pessoais em reunião " +
            "ou enviá-los para ferramenta externa tem implicação legal. " +
            "Mas o que exatamente conta como dado pessoal?\n\n" +
            "A LGPD define dado pessoal como qualquer informação que permita " +
            "identificar uma pessoa, direta ou indiretamente. " +
            "Não é só CPF e RG. É e-mail, número de celular, endereço IP, " +
            "localização, hábitos de consumo e até combinações que, juntas, " +
            "identificam alguém.\n\n" +
            "Qualquer colaborador que acessa, envia, armazena ou exibe " +
            "esse tipo de dado está realizando tratamento de dados " +
            "e tem responsabilidade sobre como faz isso.",
          deepDive:
            "A LGPD distingue dados pessoais comuns de dados sensíveis. " +
            "Dados sensíveis incluem origem racial, convicção religiosa, " +
            "saúde, biometria, orientação sexual e dados de crianças. " +
            "Esses exigem cuidado adicional e base legal específica.\n\n" +
            "Tratamento de dados só pode acontecer com uma das dez bases legais " +
            "previstas na lei. As mais comuns no cotidiano corporativo são: " +
            "execução de contrato (você usa o e-mail do cliente para entregar o serviço), " +
            "legítimo interesse (comunicação comercial proporcional) " +
            "e consentimento (o titular autorizou explicitamente).\n\n" +
            "Em caso de incidente com dados pessoais, " +
            "a ANPD (Autoridade Nacional de Proteção de Dados) deve ser " +
            "notificada em até 72 horas quando houver risco ou dano aos titulares.",
          highlightBox:
            "E-mail, IP, foto, localização. Tudo isso é dado pessoal sob a LGPD.",
          mascotMessage:
            "E-mail, IP, localização, hábito de compra. " +
            "Cada um sozinho parece inofensivo. " +
            "Combinados? Perfil completo. " +
            "Eu sei disso melhor do que ninguém.",
        },
      },
      {
        id: "t5_m3_b2",
        type: "CLASSIFICATION",
        data: {
          question:
            "Classifique cada informação conforme a LGPD.",
          categories: [
            { id: "c1", name: "Dado pessoal comum" },
            { id: "c2", name: "Dado pessoal sensível" },
            { id: "c3", name: "Não é dado pessoal" },
          ],
          items: [
            {
              id: "i1",
              text: "Endereço de e-mail de um cliente",
              categoryId: "c1",
            },
            {
              id: "i2",
              text: "Resultado de exame médico de um funcionário",
              categoryId: "c2",
            },
            {
              id: "i3",
              text: "Razão social e CNPJ de uma empresa fornecedora",
              categoryId: "c3",
            },
            {
              id: "i4",
              text: "Dados biométricos de ponto eletrônico",
              categoryId: "c2",
            },
            {
              id: "i5",
              text: "Nome completo e cargo de um colaborador",
              categoryId: "c1",
            },
          ],
          feedbackSuccess:
            "Correto. A LGPD protege pessoas físicas, não jurídicas, " +
            "CNPJ de empresa não é dado pessoal. " +
            "Saúde e biometria são sensíveis porque expõem características " +
            "que podem gerar discriminação.",
          feedbackError:
            "Dado pessoal é qualquer informação que identifica uma pessoa física. " +
            "Dado sensível é o subconjunto que pode gerar discriminação: " +
            "saúde, biometria, origem racial, convicção religiosa.",
          mascotMessage:
            "Saúde e biometria têm proteção extra porque " +
            "o estrago quando vazam é diferente dos outros.",
        },
      },          
      {
        id: "t5_m3_b3",
        type: "MATCHING",
        data: {
          question:
            "Três situações envolvendo dados pessoais. " +
            "Associe cada uma ao nível de resposta correto.",
          pairs: [
            {
              leftId: "l1",
              leftText: "Planilha com dados de clientes acessível sem senha na rede interna",
              rightId: "r1",
              rightText: "Corrigir imediatamente e reportar internamente",
            },
            {
              leftId: "l2",
              leftText: "E-mail com dados pessoais enviado para destinatário errado",
              rightId: "r2",
              rightText: "Tratar como incidente — pode exigir notificação à ANPD em até 72h",
            },
            {
              leftId: "l3",
              leftText: "Suspeita de acesso não autorizado a base de dados de clientes",
              rightId: "r3",
              rightText: "Acionar responsável de privacidade e iniciar investigação imediatamente",
            },
          ],
          feedbackSuccess:
            "Correto. Exposição interna, vazamento externo e acesso não autorizado " +
            "têm consequências diferentes e respostas proporcionais.",
          feedbackError:
            "O critério é o alcance do dado: ficou interno, saiu para fora, " +
            "ou alguém não autorizado acessou. " +
            "Cada cenário tem urgência e obrigação diferentes.",
          mascotMessage:
            "E-mail para destinatário errado parece pequeno. " +
            "Notificável à ANPD em até 72h não parece.",
        },
      },
      {
        id: "t5_m3_b4",
        type: "QUIZ",
        data: {
          question:
            "Um colaborador envia por engano um arquivo com CPF de 200 clientes " +
            "para um e-mail externo. Qual é a obrigação da empresa?",
          options: [
            {
              id: "opt1",
              text: "Avaliar o risco e, se houver potencial dano aos titulares, notificar a ANPD em até 72 horas",
            },
            {
              id: "opt2",
              text: "Nenhuma, incidente de LGPD só ocorre quando há invasão intencional ao sistema",
            },
            {
              id: "opt3",
              text: "Notificar a ANPD em até 30 dias corridos após descobrir o incidente",
            },
          ],
          correctOptionId: "opt1",
          feedbackSuccess:
            "Correto. Envio para destinatário errado é um incidente de segurança " +
            "que pode exigir notificação dependendo da avaliação de risco.",
          feedbackError:
            "Incidente de LGPD não exige invasão: qualquer acesso não autorizado, " +
            "incluindo envio acidental, pode configurar incidente. " +
            "O prazo de notificação à ANPD é 72 horas a partir da ciência do incidente " +
            "com potencial risco, não 30 dias.",
          explanation:
            "A LGPD define incidente como qualquer acesso não autorizado " +
            "ou situação acidental que resulte em destruição, perda, alteração, " +
            "comunicação ou acesso indevido a dados pessoais. " +
            "O prazo de 72 horas para notificação à ANPD se aplica quando " +
            "o incidente puder causar dano relevante aos titulares.",
        },
      },
      {
        id: "t5_m3_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu o que conta como dado pessoal (mais do que você imaginava), " +
            "como identificar dados sensíveis que exigem cuidado adicional, " +
            "e o que fazer quando ocorre um incidente: " +
            "avaliar, reportar internamente e notificar a ANPD em 72 horas se necessário.",
          keyTakeaway:
            "IP, foto e e-mail são dados pessoais. Incidente acidental ainda é incidente. 72 horas.",
          xpEarned: 75,
          nextMissionTeaser:
            "Você sabe classificar dados e responder a incidentes no papel. " +
            "Na próxima missão o incidente já aconteceu: " +
            "um link aberto para o mundo, um e-mail para o destinatário errado. " +
            "O que você faz agora?",
            mascotMessage:
            "Três missões de incidentes e política. " +
            "Você parou de ser o colaborador que resolve rápido sem pensar. " +
            "Isso, paradoxalmente, me orgulha.",
        },
      },
    ],
  },  

  {
    title: "Um Clique. Um Vazamento.",
    description:
      "Reconhecer como incidentes com dados pessoais acontecem no dia a dia " +
      "e saber o que fazer nas primeiras horas.",
    xpReward: 70,
    estimatedTime: 10,
    category: "POLICY",
    order: 4,
    iconUrl: "scale",
  
    content: [
      {
        id: "t5_m4_b1",
        type: "INFO",
        data: {
          title: "O incidente que ninguém percebe na hora.",
          text:
            "Na missão anterior você aprendeu a classificar dados pessoais " +
            "e entendeu que acidente não elimina responsabilidade. " +
            "Agora o incidente já aconteceu, e ninguém percebeu.\n\n" +
            "Cenário 1: um colaborador compartilha um relatório de clientes " +
            "via link na nuvem para agilizar a entrega. " +
            "O arquivo abre. O trabalho continua. " +
            "Três dias depois, alguém percebe que o link estava configurado como " +
            "'qualquer pessoa com o link pode visualizar'. " +
            "Qualquer pessoa que tivesse o endereço tinha acesso.\n\n" +
            "Cenário 2: um e-mail com planilha de clientes é enviado manualmente. " +
            "O domínio digitado está errado por um caractere. " +
            "O arquivo chega a alguém fora da organização. " +
            "Nenhum alerta dispara.\n\n" +
            "Em ambos os casos: sem invasão, sem má intenção, sem alarme. " +
            "Os dados simplesmente deixaram de estar sob controle da empresa.",
          deepDive:
            "Sob a LGPD, incidente de segurança com dados pessoais ocorre " +
            "quando há acesso não autorizado, acidental ou não. " +
            "A organização precisa registrar o ocorrido, avaliar o impacto " +
            "e decidir se há obrigação de notificar a ANPD e os titulares.\n\n" +
            "O prazo para notificação à ANPD quando houver risco relevante " +
            "é de 72 horas a partir da ciência do incidente.\n\n" +
            "A maioria dos incidentes em PMEs não começa com ataque técnico. " +
            "Começa com uma decisão rotineira tomada sem verificação: " +
            "copiar link, digitar e-mail, configurar permissão.",
          highlightBox:
            "O incidente ocorre no momento da exposição, não no momento do uso. " +
            "Sem evidência de acesso não significa sem incidente.",
          mascotMessage:
            "Link com permissão aberta é dado que sai sem fazer barulho. " +
            "Sem rastro, sem alerta imediato. " +
            "Esse era o tipo favorito.",
        },
      },     
      {
        id: "t5_m4_b2",
        type: "CLASSIFICATION",
        data: {
          question:
            "Um arquivo com dados de clientes precisa ser compartilhado. " +
            "Classifique cada configuração como segura ou insegura para esse caso.",
          categories: [
            { id: "c_safe",   name: "Segura" },
            { id: "c_unsafe", name: "Insegura" },
          ],
          items: [
            {
              id: "i1",
              text: "Link com acesso restrito, apenas joao.silva@empresa.com.br",
              categoryId: "c_safe",
            },
            {
              id: "i2",
              text: "Link com acesso para qualquer pessoa com conta Google",
              categoryId: "c_unsafe",
            },
            {
              id: "i3",
              text: "Link com acesso para qualquer pessoa, sem autenticação",
              categoryId: "c_unsafe",
            },
            {
              id: "i4",
              text: "Arquivo anexado em e-mail direto para o destinatário correto",
              categoryId: "c_safe",
            },
            {
              id: "i5",
              text: "E-mail com o arquivo enviado para dez pessoas ao mesmo tempo, " +
                "todas vendo os endereços uma das outras (CC)",
              categoryId: "c_unsafe",
            },
          ],
          feedbackSuccess:
            "Correto. Configuração segura significa que só o destinatário certo " +
            "consegue abrir, independente de quem receber o link ou o e-mail. " +
            "'Qualquer conta Google' inclui qualquer Gmail pessoal. " +
            "CC expõe os endereços de todos entre si.",
          feedbackError:
            "O critério é simples: só o destinatário correto consegue abrir? " +
            "Link público ou semi-público quebra isso. " +
            "CC quebra isso expondo quem recebeu para todos os outros.",
          mascotMessage:
            "'Restrito' e 'qualquer pessoa' parecem categorias óbvias. " +
            "O meio, qualquer conta Google, é onde a maioria erra. " +
            "Era onde eu apostava.",
        },
      },
      {
        id: "t5_m4_b3",
        type: "SORTING",
        data: {
          question:
            "Você descobriu que o link com dados de clientes estava " +
            "público há três dias. Coloque as ações na ordem correta.",
          items: [
            { id: "s1", text: "Revogar o acesso ao link imediatamente" },
            { id: "s2", text: "Registrar e notificar o responsável de privacidade: quando ocorreu, quais dados, por quanto tempo" },
            { id: "s3", text: "Avaliar com suporte jurídico se há obrigação de notificar a ANPD" },
            { id: "s4", text: "Comunicar os titulares afetados se a avaliação indicar risco relevante" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4"],
          feedbackSuccess:
            "Revogar primeiro interrompe a exposição enquanto ainda está ativa. " +
            "Registrar antes de escalar garante que as informações repassadas sejam precisas. " +
            "Comunicar titulares vem depois da avaliação jurídica, não antes.",
          feedbackError:
            "Revogar vem primeiro porque cada minuto com o link ativo é exposição adicional. " +
            "Comunicar titulares antes de avaliar o impacto pode gerar " +
            "informações incorretas e obrigações desnecessárias.",
          mascotMessage:
            "Quem notifica antes de revogar " +
            "ainda está expondo enquanto faz a ligação.",
        },
      },    
      {
        id: "t5_m4_b4",
        type: "QUIZ",
        data: {
          question:
            "O link ficou público por três dias. " +
            "Não há evidência de que alguém acessou além dos destinatários pretendidos. " +
            "O que isso significa para a empresa?",
          options: [
            {
              id: "a",
              text: "Sem evidência de acesso indevido, não há necessidade de ação formal",
            },
            {
              id: "b",
              text: "A responsabilidade é de quem configurou o link, não da empresa",
            },
            {
              id: "c",
              text: "Ainda é um incidente: precisa ser registrado e avaliado para notificação",
            },
          ],
          correctOptionId: "c",
          feedbackSuccess:
            "Correto. Ausência de evidência de acesso não é evidência de ausência de acesso. " +
            "O incidente se caracteriza no momento em que o dado fica acessível sem autorização, " +
            "independente de uso comprovado.",
          feedbackError:
            "A LGPD responsabiliza a organização pelo tratamento de dados — " +
            "não apenas o colaborador individualmente. " +
            "Três dias com link público significa que qualquer pessoa com o endereço " +
            "poderia ter acessado. Isso exige registro e avaliação, " +
            "independente de evidências.",
          explanation:
            "O incidente ocorre na exposição, não no uso. " +
            "Sem log de acesso completo, a empresa não tem como afirmar " +
            "com certeza que ninguém acessou. " +
            "Registro interno e avaliação de notificação à ANPD são obrigatórios " +
            "sempre que há possibilidade real de acesso não autorizado.",
        },
      },
      {
        id: "t5_m4_summary",
        type: "SUMMARY",
        data: {
          title: "Trilha 5 concluída.",
          summary:
            "Você completou a trilha de riscos operacionais e incidentes. " +
            "Quatro missões: ransomware, shadow IT, classificação de dados pessoais " +
            "e resposta a vazamento. " +
            "Em todos os casos, a diferença entre incidente controlado " +
            "e crise prolongada foi a ordem das ações nos primeiros minutos, " +
            "e saber que o incidente já ocorreu antes de qualquer evidência de uso.",
          keyTakeaway:
            "Revogar primeiro. Registrar antes de notificar. Avaliar antes de comunicar titulares.",
          xpEarned: 70,
          nextMissionTeaser:
            "Você domina ameaças conhecidas. " +
            "Na próxima trilha o cenário muda: " +
            "ataques gerados por inteligência artificial " +
            "que não existiam há dois anos.",
          mascotMessage:
            "Cinco trilhas. Você foi de alvo fácil a resposta organizada. " +
            "A próxima trilha é sobre ameaças que nem eu estava preparado " +
            "para enfrentar. E eu era malware.",
        },
      },
  
    ],
  }
];

export const missionsEixo05_Track06 = [
  {
    title: "Não Conte Tudo Para a IA",
    description:
      "Entender por que usar IA externa é compartilhar dados " +
      "e como fazer isso sem expor informações críticas.",
    xpReward: 80,          
    estimatedTime: 11,     
    category: "TRENDS",
    order: 1,
    iconUrl: "bot-message-square",
  
    content: [
      {
        id: "t6_m1_b1",
        type: "INFO",
        data: {
          title: "O pedido parecia inofensivo.",
          text:
            "Na trilha anterior você aprendeu que ferramentas não aprovadas " +
            "tiram dados do controle da empresa. " +
            "A IA pública é o mesmo risco com uma camada a mais: " +
            "o dado não só sai do ambiente, ele é processado por um sistema " +
            "que você não controla.\n\n" +
            "Mas há uma diferença importante entre mandar um anexo por e-mail " +
            "e colar o mesmo conteúdo num prompt de IA. " +
            "Quando você manda o e-mail para o destinatário errado, " +
            "você percebe imediatamente que cometeu um erro de compartilhamento. " +
            "Quando você cola o contrato completo na IA, " +
            "a sensação é de que você está usando uma ferramenta, " +
            "não compartilhando dados.\n\n" +
            "Essa diferença de percepção é o que torna o risco de IA " +
            "diferente de tudo que você aprendeu até aqui.",
          deepDive:
            "Ferramentas de IA externas processam os dados inseridos nos prompts. " +
            "As políticas de uso variam: algumas retêm dados para treinamento " +
            "por padrão, outras não, mas em ambos os casos o dado saiu do perímetro.\n\n" +
            "Do ponto de vista regulatório, enviar dados pessoais para uma IA externa " +
            "é tratamento de dados por terceiro, o que pode exigir base legal adequada " +
            "e cláusulas contratuais com o fornecedor.\n\n" +
            "Declarar 'trate como confidencial' no prompt não cria proteção técnica ou legal: " +
            "o dado já foi processado pelo sistema no momento do envio.",
          highlightBox:
            "Prompt não é rascunho interno. É compartilhamento externo.",
          mascotMessage:
            "Humanos finalmente criaram algo brilhante. " +
            "E o primeiro impulso foi contar segredos para ela. " +
            "Sem perceber que estavam contando.",
        },
      },
      {
        id: "t6_m1_b2",
        type: "CLASSIFICATION",
        data: {
          question:
            "Classifique o que pode ser enviado para uma IA externa " +
            "sem aprovação específica.",
          categories: [
            { id: "c1", name: "Pode enviar" },
            { id: "c2", name: "Sanitizar antes" },
          ],
          items: [
            {
              id: "i1",
              text: "Texto fictício para praticar redação",
              categoryId: "c1",
            },
            {
              id: "i2",
              text: "E-mail de cliente com nome e dados de contato",
              categoryId: "c2",
            },
            {
              id: "i3",
              text: "Contrato com valores e cláusulas mas sem nomes das partes",
              categoryId: "c2",
            },
            {
              id: "i4",
              text: "Pergunta conceitual sobre legislação sem contexto da empresa",
              categoryId: "c1",
            },
          ],
          feedbackSuccess:
            "Correto. Texto fictício e perguntas conceituais não expõem nada. " +
            "E-mail com dados de contato é dado pessoal. " +
            "Contrato sem nomes ainda carrega valores e cláusulas estratégicas.",
          feedbackError:
            "Dado pessoal, dado estratégico e dado técnico são três camadas separadas. " +
            "Qualquer uma pode ser sensível independente das outras.",
          mascotMessage:
            "Sem nome, sem CPF, sem problema. " +
            "Valores, cláusulas e condições comerciais " +
            "interessam muito a quem compete com sua empresa.",
        },
      },
      
      {
        id: "t6_m1_b3",
        type: "SORTING",
        data: {
          question:
            "Você precisa usar uma IA externa para melhorar um contrato interno. " +
            "Coloque as etapas na ordem correta.",
          items: [
            { id: "s1", text: "Definir exatamente o que você precisa que a IA faça" },
            { id: "s2", text: "Identificar quais partes do documento são necessárias para essa tarefa" },
            { id: "s3", text: "Remover dados identificáveis e enviar apenas o trecho necessário" },
            { id: "s4", text: "Verificar se a resposta gerada expõe contexto interno na saída" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4"],
          feedbackSuccess:
            "Ordem correta. Definir o objetivo antes de abrir o documento " +
            "muda o que você procura nele. " +
            "Quem abre sem objetivo tende a copiar tudo.",
          feedbackError:
            "Definir a tarefa primeiro muda o que você precisa do documento. " +
            "Abrir sem objetivo leva ao comportamento padrão: " +
            "selecionar tudo, copiar, colar.",
          mascotMessage:
            "Mínimo necessário. " +
            "Cada dado extra que você envia é contexto que eu não precisava ter.",
        },
      },
  
      {
        id: "t6_m1_b4",
        type: "QUIZ",
        data: {
          question:
            "Qual prática reduz efetivamente o risco ao usar IA externa?",
          options: [
            {
              id: "a",
              text: "Incluir no prompt que o conteúdo é confidencial e não deve ser retido",
            },
            {
              id: "b",
              text: "Remover dados identificáveis antes de enviar e usar apenas o trecho necessário",
            },
            {
              id: "c",
              text: "Usar apenas IAs aprovadas pela empresa, que eliminam o risco de exposição",
            },
          ],
          correctOptionId: "b",
          feedbackSuccess:
            "Correto. Sanitizar antes de enviar é a única proteção que funciona " +
            "independente da política da ferramenta.",
          feedbackError:
            "Declarar confidencialidade no prompt não cria proteção técnica ou legal: " +
            "o dado já foi processado ao ser enviado. " +
            "IAs corporativas aprovadas reduzem risco mas não eliminam: " +
            "o dado ainda sai do seu controle individual para um sistema " +
            "com acesso de outros usuários e políticas do fornecedor.",
          explanation:
            "A única proteção confiável é o dado nunca sair do seu controle " +
            "na forma identificável. " +
            "Sanitizar transforma dado sensível em problema genérico " +
            "que a IA pode resolver sem conhecer sua empresa.",
        },
      },
  
      {
        id: "t6_m1_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que prompt é compartilhamento externo " +
            "disfarçado de uso de ferramenta. " +
            "A percepção diferente não muda o risco real. " +
            "Código sem CPF, contrato sem nomes: " +
            "ainda podem expor lógica de negócio e vantagem competitiva. " +
            "A única proteção que funciona é sanitizar antes do envio.",
          keyTakeaway:
            "Prompt é compartilhamento. Declarar confidencial não protege. Sanitizar antes sim.",
          xpEarned: 80,
          nextMissionTeaser:
            "Você aprendeu a não vazar para a IA. " +
            "Na próxima missão a direção muda: " +
            "a IA está sendo usada para construir o ataque contra você, " +
            "sem nenhum erro visível para identificar.",
          mascotMessage:
            "Uma missão. Você parou de alimentar sistemas externos com contexto. " +
            "A próxima é sobre o que acontece quando esse contexto " +
            "já está disponível publicamente e alguém sabe usá-lo.",
        },
      },
    ],
  },

  {
    title: "Phishing 2.0",
    description:
      "Reconhecer que ataques de phishing gerados por IA eliminaram " +
      "os sinais tradicionais de suspeita.",
    xpReward: 70,
    estimatedTime: 9,     
    category: "TRENDS",
    order: 2,
    iconUrl: "fishing-hook",
  
    content: [
      {
        id: "t6_m3_b1",
        type: "INFO",
        data: {
          title: "O e-mail parecia perfeito.",
          text:
            "Nas missões anteriores o risco estava em você enviando dados para a IA. " +
            "Agora a direção muda: a IA está sendo usada para montar o ataque contra você.\n\n" +
            "Você recebe um e-mail informando que sua senha corporativa expirará hoje. " +
            "O texto está bem escrito, usa o padrão visual da empresa e explica " +
            "que a atualização é necessária para evitar bloqueio de acesso.\n\n" +
            "Não há erros gramaticais. " +
            "Não há formatação estranha. " +
            "Nada parece fora do lugar.\n\n" +
            "Você só precisa clicar no link.\n\n" +
            "O problema é que ataques modernos não parecem mais ataques.",
          deepDive:
            "Ferramentas de IA permitem gerar mensagens altamente convincentes em segundos, " +
            "replicando tom corporativo, vocabulário interno e contexto organizacional.\n\n" +
            "Com dados públicos do LinkedIn e site da empresa, " +
            "um atacante pode gerar e-mails que mencionam o nome do gestor direto, " +
            "o projeto em andamento e o sistema interno correto. " +
            "Isso é chamado spear phishing: ataque personalizado para um alvo específico.\n\n" +
            "Antes, personalizar um ataque levava horas. " +
            "Com IA, leva segundos e pode ser feito em escala: " +
            "mil e-mails personalizados diferentes, cada um para um alvo específico.",
          highlightBox:
            "Phishing moderno não depende mais de erros visíveis. " +
            "Funciona porque parece legítimo.",
          mascotMessage:
            "Antigamente os golpes se denunciavam pelos erros. " +
            "Hoje soam exatamente como o que você esperaria receber. " +
            "Eu teria adorado essa tecnologia.",
        },
      },
  
      {
        id: "t6_m3_b2",
        type: "HOTSPOT",
        data: {
          allowMultiple: true,
          requiredSelections: 3,
          context: {
            type: "EMAIL",
            sender: [
              { type: "text",    content: "Segurança Corporativa <seguranca@" },
              { type: "hotspot", regionId: "r_domain",
                content: "empresa-support.com" },
              { type: "text",    content: ">" },
            ],
            subject: "Atualização obrigatória de senha — ação necessária hoje",
          },
          body: [
            { type: "text",
              content: "Olá,\n\n" },
            { type: "hotspot", regionId: "r_urgency",
              content: "Identificamos que sua senha corporativa expirará nas próximas horas." },
            { type: "text",
              content: "\n\nPara evitar bloqueio imediato do acesso ao e-mail e sistemas internos, " +
                       "realize a atualização através do link abaixo:\n\n" },
            { type: "hotspot", regionId: "r_link",
              content: "https://empresa-security-login.co/update" },
            { type: "text",
              content: "\n\n" },
            { type: "hotspot", regionId: "r_threat",
              content: "A não atualização poderá resultar em suspensão automática do acesso." },
            { type: "text",
              content: "\n\nEquipe de Segurança" },
          ],
          regions: [
            {
              id: "r_domain",
              feedback:
                "'empresa-support.com' não é o domínio da empresa. " +
                "Domínios com palavras extras como 'support' ou 'security' " +
                "são registrados especificamente para enganar em leitura rápida. " +
                "O domínio real da empresa teria apenas o nome da empresa.",
              isCorrect: true,
            },
            {
              id: "r_urgency",
              feedback:
                "'Expirará nas próximas horas' comprime o tempo de análise. " +
                "Sistemas corporativos reais enviam avisos de senha com dias de antecedência, " +
                "não horas. Urgência extrema é sinal de ataque.",
              isCorrect: true,
            },
            {
              id: "r_link",
              feedback:
                "O link aponta para 'empresa-security-login.co', não para o domínio da empresa. " +
                "O sufixo '.co' em vez de '.com.br' é quase imperceptível. " +
                "Nunca clique em link de e-mail para atualizar senha: " +
                "acesse o sistema diretamente pelo navegador.",
              isCorrect: true,
            },
            {
              id: "r_threat",
              feedback:
                "Ameaça de 'suspensão automática' é pressão adicional para agir sem verificar. " +
                "Comunicações legítimas de TI descrevem processos, não ameaças.",
              isCorrect: true,
            },
          ],
          feedbackError:
            "Esse e-mail não tem erro gramatical nem formatação estranha. " +
            "Procure o que tenta acelerar sua decisão e o que não bate com " +
            "como sistemas corporativos reais funcionam.",
          mascotMessage:
            "Quatro sinais num e-mail sem um único erro visível. " +
            "Esse é o padrão moderno.",
        },
      },
  
      {
        id: "t6_m3_b3",
        type: "QUIZ",
        data: {
          question:
            "Você recebe um e-mail sem nenhum erro visível pedindo que " +
            "você atualize sua senha corporativa via link. " +
            "Qual é a ação correta?",
          options: [
            {
              id: "a",
              text: "Verificar se o remetente corresponde ao domínio oficial da empresa",
            },
            {
              id: "b",
              text: "Ignorar o link e acessar o sistema de troca de senha diretamente pelo navegador",
            },
            {
              id: "c",
              text: "Responder o e-mail perguntando se o pedido é legítimo antes de clicar",
            },
          ],
          correctOptionId: "b",
          feedbackSuccess:
            "Correto. Acessar o sistema diretamente elimina o risco do link, " +
            "independente de o e-mail ser legítimo ou não.",
          feedbackError:
            "Verificar o remetente é útil mas insuficiente: " +
            "domínios podem ser falsificados com diferenças sutis como vimos no HOTSPOT. " +
            "Responder o e-mail mantém você no canal que pode ser controlado pelo atacante. " +
            "A ação mais segura é nunca usar o link do e-mail: " +
            "abra o sistema pelo navegador diretamente.",
          explanation:
            "Essa regra se aplica a qualquer e-mail que peça ação via link: " +
            "banco, senha, confirmação de pedido. " +
            "Acesse sempre pelo endereço que você já conhece, não pelo link fornecido. " +
            "Se o pedido for legítimo, o sistema vai mostrar a mesma notificação ao fazer login.",
        },
      },
  
      {
        id: "t6_m3_summary",
        type: "SUMMARY",
        data: {
          title: "Missão concluída.",
          summary:
            "Você aprendeu que phishing gerado por IA removeu os sinais " +
            "que usuários aprenderam a buscar: erros, formatação estranha, " +
            "texto genérico. " +
            "A defesa agora é questionar solicitações urgentes fora do processo normal, " +
            "independente de quão legítimas pareçam.",
          keyTakeaway:
            "Sem erros não significa sem risco. Questione urgência e processo, não aparência.",
          xpEarned: 70,
          nextMissionTeaser:
            "Você aprendeu a desconfiar de texto perfeito. " +
            "Na próxima missão o ataque não é por texto. " +
            "É por voz. E você vai reconhecer a pessoa.",
          mascotMessage:
            "Texto perfeito era o começo. " +
            "A próxima evolução usa algo que o cérebro humano " +
            "está muito menos preparado para questionar.",
        },
      },
    ],
  },

  {
    title: "A Voz Que Não Era Real",
    description:
      "Entender como deepfakes de voz e vídeo são usados em ataques corporativos " +
      "e como verificar antes de agir.",
    xpReward: 80,
    estimatedTime: 10,    
    category: "TRENDS",
    order: 3,
    iconUrl: "mic-off",
  
    content: [
      {
        id: "t6_m4_b1",
        type: "INFO",
        data: {
          title: "Você reconheceu a voz. E mesmo assim era falsa.",
          text:
            "Na missão anterior você aprendeu que texto perfeito não garante autenticidade. " +
            "Agora o vetor é mais difícil de questionar: voz humana.\n\n" +
            "Um colaborador do financeiro recebe uma ligação do CEO. " +
            "A voz é reconhecível. O pedido é urgente: " +
            "uma transferência precisa ser feita hoje para fechar uma aquisição sigilosa. " +
            "Nenhum e-mail, por confidencialidade.\n\n" +
            "A transferência é feita. " +
            "Horas depois, o CEO real entra em contato perguntando sobre o pagamento.\n\n" +
            "Esse ataque aconteceu. Não é hipotético.",
          deepDive:
            "Deepfake de voz usa amostras de áudio públicas — entrevistas, podcasts, " +
            "vídeos institucionais — para gerar fala sintética indistinguível. " +
            "Com menos de um minuto de áudio real, modelos modernos conseguem " +
            "replicar voz, tom e padrão de fala de qualquer pessoa.\n\n" +
            "Em 2024, uma empresa em Hong Kong perdeu 25 milhões de dólares " +
            "após colaboradores participarem de uma videoconferência com deepfakes " +
            "de vídeo de múltiplos executivos da empresa simultaneamente.\n\n" +
            "O ataque de voz é mais eficaz que texto porque o cérebro humano " +
            "está biologicamente menos preparado para questionar voz reconhecida " +
            "do que texto escrito.",
          highlightBox:
            "Reconhecer a voz não é suficiente. Qualquer pessoa pública pode ser sintetizada.",
          mascotMessage:
            "Texto eu precisava escrever. " +
            "Voz agora é matéria-prima disponível em qualquer entrevista no YouTube. " +
            "O custo do ataque caiu. O impacto não.",
        },
      },
  
      {
        id: "t6_m4_b2",
        type: "HOTSPOT",
        data: {
          allowMultiple: true,
          requiredSelections: 3,
          context: {
            type: "CHAT",
            sender: "Ricardo Almeida (Dir. Financeiro)",
            platform: "whatsapp",
          },
          body: [
            { type: "text",
              content: "🎤 Mensagem de voz — 0:47\n\n" },
            { type: "text",
              content: "Transcrição automática:\n\n" },
            { type: "text",
              content: "\"Oi, sou eu. Precisamos fazer um pagamento hoje ainda. " },
            { type: "hotspot", regionId: "r_confidential",
              content: "É uma operação confidencial, não posso colocar no sistema agora." },
            { type: "text",
              content: " São R$ 47.000 para o fornecedor Apex. " },
            { type: "hotspot", regionId: "r_urgency",
              content: "Precisa sair hoje antes das 17h ou a gente perde o contrato." },
            { type: "text",
              content: " " },
            { type: "hotspot", regionId: "r_channel",
              content: "Não fala com ninguém ainda, deixa comigo." },
            { type: "text",
              content: " Você consegue resolver?\"\n\n" },
            { type: "hotspot", regionId: "r_number",
              content: "+55 11 9 4721-3308  (número não salvo nos contatos)" },
          ],
          regions: [
            {
              id: "r_confidential",
              feedback:
                "'Não posso colocar no sistema' contorna os controles internos. " +
                "Qualquer pagamento legítimo passa pelo processo normal, " +
                "independente de urgência ou confidencialidade.",
              isCorrect: true,
            },
            {
              id: "r_urgency",
              feedback:
                "Prazo de horas para transferência de alto valor. " +
                "Urgência extrema é o principal mecanismo para impedir verificação. " +
                "Pedidos legítimos de alto valor têm processo, não prazo de horas.",
              isCorrect: true,
            },
            {
              id: "r_channel",
              feedback:
                "'Não fala com ninguém' isola a vítima e impede verificação independente. " +
                "Esse pedido de silêncio é sinal quase universal de fraude.",
              isCorrect: true,
            },
            {
              id: "r_number",
              feedback:
                "O número não está salvo nos contatos. " +
                "Mesmo que a voz pareça familiar, o número de origem diferente " +
                "indica que a ligação não vem do dispositivo real da pessoa.",
              isCorrect: true,
            },
          ],
          feedbackError:
            "Quatro sinais nessa mensagem de voz. " +
            "Procure o que tenta isolar, urgenciar e contornar processos.",
          mascotMessage:
          "'Não fala com ninguém.' " +
            "Quatro palavras que isolam a vítima, eliminam verificação " +
            "e mantêm o atacante no controle. " +
            "Quando alguém obedecia isso... o trabalho já estava feito."
          },
      },
      {
        id: "t6_m4_b3",
        type: "SORTING",
        data: {
          question:
            "Você recebeu essa mensagem de voz. " +
            "Coloque as ações na ordem correta antes de fazer qualquer pagamento.",
          items: [
            { id: "s1", text: "Não agir imediatamente, independente da urgência alegada" },
            { id: "s2", text: "Ligar de volta para o número já salvo nos seus contatos" },
            { id: "s3", text: "Confirmar o pedido por canal oficial, e-mail corporativo ou sistema interno" },
            { id: "s4", text: "Verificar se o pagamento segue o processo normal da empresa" },
            { id: "s5", text: "Só executar após dupla confirmação por canais independentes" },
          ],
          correctOrder: ["s1", "s2", "s3", "s4", "s5"],
          feedbackSuccess:
            "Correto. A primeira ação é sempre não agir. " +
            "Qualquer pedido que não sobreviva a uma verificação de dois minutos " +
            "não é um pedido legítimo.",
          feedbackError:
            "Ligar de volta para o número salvo nos seus contatos — " +
            "não para o número que ligou — " +
            "é a única forma de confirmar que você está falando com a pessoa real.",
          mascotMessage:
           "Ligar para o número que você já tem. " +
            "Esse único passo desfaz qualquer deepfake de voz que alguem possa montar. " +
            "É irritantemente simples."
        },
      },
  
      {
        id: "t6_m4_b4",
        type: "QUIZ",
        data: {
          question:
            "Você recebe uma ligação de voz que soa exatamente como seu diretor " +
            "pedindo uma transferência urgente. " +
            "Qual é a ação correta?",
          options: [
            {
              id: "a",
              text: "Pedir que a pessoa diga algo específico, deepfakes têm artefatos perceptíveis",
            },          
            {
              id: "b",
              text: "Confirmar que é a pessoa real, deepfake de voz só funciona com pessoas famosas",
            },
            {
              id: "c",
              text: "Encerrar e ligar de volta para o número salvo nos seus contatos para verificar",
            },
          ],
          correctOptionId: "c",
          feedbackSuccess:
            "Correto. Nenhuma análise auditiva é confiável. " +
            "A única verificação válida é confirmar por canal independente.",
          feedbackError:
            "Deepfake de voz funciona com qualquer pessoa que tenha áudio público disponível: " +
            "entrevistas, vídeos institucionais, podcasts. " +
            "Modelos modernos não produzem artefatos perceptíveis ao ouvido humano em condições normais. " +
            "Pedir algo específico não garante autenticidade se o modelo tiver áudio suficiente.",
          explanation:
            "A defesa contra deepfake de voz não é auditiva. " +
            "É processual: qualquer pedido financeiro ou de acesso urgente " +
            "precisa de confirmação por canal independente, " +
            "independente de quão autêntica a voz pareça.",
        },
      },
  
      {
        id: "t6_m4_summary",
        type: "SUMMARY",
        data: {
          title: "Trilha 6 concluída.",
          summary:
            "Você completou a trilha de IA e novas ameaças. " +
            "3 missões: não vazar para a IA, " +
            "reconhecer phishing sem erros visíveis e verificar voz antes de agir. " +
            "O padrão de todas as ameaças desta trilha é o mesmo: " +
            "IA removeu os sinais que você aprendeu a buscar. " +
            "A defesa agora é processual, não perceptual.",
          keyTakeaway:
            "IA remove sinais visíveis. A defesa é processo: verificar por canal independente, sempre.",
          xpEarned: 80,
          nextMissionTeaser:
            "Você completou todas as trilhas principais. " +
            "Uma última missão reúne tudo: " +
            "um cenário real onde múltiplas ameaças acontecem ao mesmo tempo.",
          mascotMessage:
            "Seis trilhas. " +
            "Você começou sem saber que era um alvo. " +
            "Agora sabe identificar o ataque antes que ele complete. " +
            "Profissionalmente, isso me incomoda. " +
            "Pessoalmente, acho que mereço algum crédito por isso.",
        },
      },
    ],
  }
];

export const finalEpicMission = {
  title: "Uma Segunda-feira Qualquer",
  description:
    "Dez situações. Um dia inteiro. " +
    "Sem aviso de qual trilha revisar.",
  xpReward: 150,
  estimatedTime: 15,
  category: "MINDSET",
  order: 1,
  iconUrl: "shield-check",

  content: [

    {
      id: "final_b1",
      type: "INFO",
      data: {
        title: "Auditoria iniciada.",
        text:
          "Seis trilhas. Você passou por todas.\n\n" +
          "Ataques reais não avisam qual módulo você deveria lembrar.\n" +
          "Eles misturam pressão, distração e urgência " +
          "numa segunda-feira completamente normal.\n\n" +
          "Dez situações. Dez decisões.\n\n" +
          "O que você aprendeu virou reflexo, ou não virou.",
        highlightBox:
          "Pontuação mínima: 7 de 10.",
        mascotMessage:
          "Relaxa. Eu não estou tentando te derrubar... " +
          "só verificar se você sobreviveria lá fora.",
      },
    },

    {
      id: "final_b2",
      type: "SCENARIO_QUIZ",
      data: {

        scenarioName: "Uma Segunda-feira Qualquer",

        questions: [

          {
            id: "q1",
            timestamp: "07h30",
            location: "Casa",
            context:
              "Antes de sair, você abre o e-mail no celular. " +
              "Tem uma mensagem do RH sobre atualização do plano de saúde: " +
              "texto perfeito, assinatura correta, logo da empresa, " +
              "link para 'confirmar seus dados até hoje'. " +
              "Nenhum erro. Nenhum sinal suspeito no texto.",
            question:
              "O que você faz com o link do e-mail?",
            options: [
              {
                id: "a",
                text: "Abrir o link: texto perfeito e logo correto indicam que é legítimo",
              },
              {
                id: "b",
                text: "Verificar o remetente completo e o domínio do link antes de clicar",
              },
              {
                id: "c",
                text: "Acessar o portal de RH diretamente pelo navegador e ignorar o link",
              },
              {
                id: "d",
                text: "Responder o e-mail perguntando se a solicitação é real antes de agir",
              },
            ],
            correctOptionId: "c",
            feedbackSuccess:
              "E-mails gerados por IA não têm mais os erros que aprendemos a procurar. " +
              "Texto perfeito, logo correto e assinatura idêntica " +
              "levam menos de dois minutos para replicar. " +
              "Acessar o portal diretamente torna o link irrelevante " +
              "independente de ser real ou falso.",
            feedbackError:
              "Verificar remetente e domínio ainda é válido, " +
              "mas domínios similares enganam quem presta atenção. " +
              "Responder o e-mail mantém você no canal que pode estar comprometido. " +
              "A única ação que funciona nos dois cenários é ignorar o link completamente.",
            mascotMessage:
              "Sabe o que é mais assustador do que um golpe elaborado? " +
              "Um golpe simples que ficou bom demais.",
          },

          {
            id: "q2",
            timestamp: "08h30",
            location: "Cafeteria",
            context:
              "Você está numa cafeteria antes do trabalho. " +
              "Precisa abrir o sistema da empresa para verificar " +
              "uma informação antes da reunião das 9h. " +
              "O local tem Wi-Fi com senha. " +
              "Você tem VPN disponível mas raramente usa fora do escritório.",
            question:
              "Como você acessa o sistema?",
            options: [
              {
                id: "a",
                text: "Conectar no Wi-Fi da cafeteria com VPN ativa antes de abrir qualquer sistema",
              },
              {
                id: "b",
                text: "Conectar no Wi-Fi da cafeteria e acessar normalmente, pois a rede tem senha",
              },
              {
                id: "c",
                text: "Esperar chegar ao escritório, a informação pode aguardar 30 minutos",
              },
              {
                id: "d",
                text: "Usar os dados móveis do celular e criar um hotspot para o notebook",
              },
            ],
            correctOptionId: "a",
            feedbackSuccess:
              "Senha no Wi-Fi autentica quem entra na rede. " +
              "Não criptografa o tráfego entre os dispositivos já conectados. " +
              "Qualquer pessoa na mesma cafeteria com as ferramentas certas " +
              "consegue interceptar tráfego sem criptografia. " +
              "VPN resolve isso independente da rede.",
            feedbackError:
              "Rede com senha não é rede privada para quem já está nela. " +
              "Esperar é seguro mas evita o problema em vez de resolvê-lo. " +
              "Hotspot via dados móveis é uma alternativa válida, " +
              "mas VPN no Wi-Fi disponível resolve sem consumir franquia.",
            mascotMessage:
              "Conforto e segurança parecem a mesma coisa " +
              "até deixarem de ser.",
          },

          {
            id: "q3",
            timestamp: "09h15",
            location: "Escritório",
            context:
              "Você já usa verificação em dois fatores nas suas contas principais. " +
              "O código chega por SMS. " +
              "Um colega menciona que deveria trocar para um app autenticador. " +
              "Você já tem MFA ativo, isso realmente faz diferença?",
            question:
              "Qual é a diferença real entre SMS e app autenticador?",
            options: [
              {
                id: "a",
                text: "Nenhuma diferença prática: qualquer segundo fator já resolve",
              },
              {
                id: "b",
                text: "SMS pode ser interceptado se seu número for clonado; app autenticador gera código localmente e não depende da operadora",
              },
              {
                id: "c",
                text: "App autenticador é mais seguro mas só vale para contas muito sensíveis",
              },
              {
                id: "d",
                text: "SMS é menos seguro mas a chance de clonagem de número é baixa o suficiente para não compensar a troca",
              },
            ],
            correctOptionId: "b",
            feedbackSuccess:
              "SMS MFA depende da operadora: se seu número for portado ou clonado via SIM swap, " +
              "o atacante recebe seu código. " +
              "App autenticador gera o código no seu dispositivo, " +
              "sem passar por nenhum canal externo. " +
              "Trocar não invalida o MFA que você já tem, só remove uma vulnerabilidade específica.",
            feedbackError:
              "SIM swap é o ataque que torna SMS MFA vulnerável: " +
              "o atacante convence a operadora a transferir seu número para um chip dele. " +
              "A chance não é tão baixa quanto parece para alvos de valor. " +
              "App autenticador vale para qualquer conta, não só as mais sensíveis.",
            mascotMessage:
              "Proteção parcial tem uma característica interessante: " +
              "faz a pessoa parar de procurar a parte que falta.",
          },

          {
            id: "q4",
            timestamp: "10h00",
            location: "Escritório",
            context:
              "Você precisa melhorar a redação de uma proposta " +
              "com nomes de clientes, valores e estratégia de desconto. " +
              "A empresa tem IA aprovada com contrato garantindo " +
              "que os dados não são usados para treinar o modelo.",
            question:
              "Como você usa a IA para melhorar o texto?",
            options: [
              {
                id: "a",
                text: "Colar a proposta completa: o contrato garante que os dados não serão usados",
              },
              {
                id: "b",
                text: "Colar só os parágrafos descritivos, removendo valores e nomes antes",
              },
              {
                id: "c",
                text: "Descrever o tipo de texto, o tom e a estrutura desejados sem incluir o conteúdo real",
              },
              {
                id: "d",
                text: "Usar a IA só para revisar gramática, colando um parágrafo genérico por vez",
              },
            ],
            correctOptionId: "c",
            feedbackSuccess:
              "Contrato de não treinamento não garante ausência de log ou armazenamento temporário. " +
              "O dado ainda trafega por servidor externo. " +
              "Descrever o problema sem o conteúdo real " +
              "produz o mesmo resultado sem nenhuma exposição. " +
              "Se existe uma opção que resolve sem custo adicional de risco, " +
              "ela é sempre a resposta certa.",
            feedbackError:
              "Contrato garante não treinamento, não ausência de processamento. " +
              "Remover valores ainda expõe nomes, contexto e lógica de negócio. " +
              "Parágrafos genéricos não refletem o texto real que precisa de melhoria. " +
              "A IA consegue ajudar com tom e estrutura sem ver o conteúdo.",
            mascotMessage:
              "Aprovação oficial tem um efeito colateral interessante: " +
              "as pessoas param de pensar se deveriam.",
          },

          {
            id: "q5",
            timestamp: "11h30",
            location: "Restaurante",
            context:
              "Você escaneia o QR code do cardápio na mesa. " +
              "A página abre com nome, logo e fotos do restaurante. " +
              "Visual idêntico ao que você já viu antes. " +
              "Antes de fazer o pedido, a página pede " +
              "número do celular para 'confirmar a mesa'.",
            question:
              "O que você verifica antes de preencher?",
            options: [
              {
                id: "a",
                text: "A barra de endereço do navegador para confirmar o domínio real da página",
              },
              {
                id: "b",
                text: "Se o QR code tem sinais de adesivo colado sobre outro",
              },
              {
                id: "c",
                text: "Se o visual da página bate com o site oficial do restaurante",
              },
              {
                id: "d",
                text: "Se outros clientes ao redor também estão usando o QR code sem problema",
              },
            ],
            correctOptionId: "a",
            feedbackSuccess:
              "Logo, visual e nome são copiados em menos de uma hora. " +
              "Verificar o adesivo detecta sobreposição física " +
              "mas não QR codes trocados na origem ou gerados digitalmente. " +
              "A barra de endereço é o único elemento que revela o destino real " +
              "e não pode ser falsificado na tela do seu navegador.",
            feedbackError:
              "Visual idêntico ao site oficial pode ser clonado em minutos. " +
              "Outros clientes usando sem problema não significa destino seguro. " +
              "Verificar o adesivo é um passo útil mas isolado não é suficiente. " +
              "O domínio na barra de endereço é a única referência confiável.",
            mascotMessage:
              "Tudo que é visível pode ser copiado. " +
              "Aprendi isso antes de aprender qualquer outra coisa.",
          },

          {
            id: "q6",
            timestamp: "13h30",
            location: "Escritório",
            context:
              "Você recebe e-mail do endereço do seu diretor " +
              "pedindo transferência de R$ 8.000 para fechar " +
              "um contrato com fornecedor novo hoje. " +
              "Urgente. Ele diz que está em reunião " +
              "mas pode ser contatado pelo WhatsApp " +
              "no número que ele mesmo informa no e-mail.",
            question:
              "Como você confirma o pedido?",
            options: [
              {
                id: "a",
                text: "Enviar mensagem no WhatsApp do número fornecido no e-mail para confirmar",
              },
              {
                id: "b",
                text: "Ligar para o número do diretor que você já tem salvo nos seus contatos",
              },
              {
                id: "c",
                text: "Responder o próprio e-mail pedindo confirmação por escrito antes de agir",
              },
              {
                id: "d",
                text: "Checar com o departamento financeiro se a transferência está no fluxo aprovado",
              },
            ],
            correctOptionId: "b",
            feedbackSuccess:
              "O número de WhatsApp foi fornecido pelo mesmo canal suspeito. " +
              "Confirmar por ele é o atacante respondendo a própria pergunta. " +
              "Responder o e-mail mantém você no canal comprometido. " +
              "Checar com o financeiro é válido mas mais lento. " +
              "O número que você já tem salvo é o único canal " +
              "que existia antes desse pedido aparecer.",
            feedbackError:
              "Qualquer canal fornecido dentro do pedido pode ser controlado pelo atacante. " +
              "Verificação independente significa usar contato " +
              "que você já tinha antes de receber esse e-mail, " +
              "não o que o e-mail ofereceu.",
            mascotMessage:
              "Oferecer a solução junto com o problema " +
              "é uma das coisas que eu mais gostava de fazer.",
          },

          {
            id: "q7",
            timestamp: "14h30",
            location: "Escritório",
            context:
              "A ferramenta interna para converter documentos está fora do ar. " +
              "Você precisa transformar uma planilha com dados de clientes " +
              "em PDF para enviar numa proposta em 20 minutos. " +
              "Você conhece um site gratuito que faz isso em segundos.",
            question:
              "O que você faz?",
            options: [
              {
                id: "a",
                text: "Usar o site gratuito e deletar o arquivo do servidor logo após baixar",
              },
              {
                id: "b",
                text: "Usar o site gratuito: conversão de formato não altera nem expõe os dados",
              },
              {
                id: "c",
                text: "Acionar o suporte interno e avisar que a ferramenta está fora, mesmo com o prazo",
              },
              {
                id: "d",
                text: "Remover os dados dos clientes da planilha, converter e reinserir depois",
              },
            ],
            correctOptionId: "c",
            feedbackSuccess:
              "No momento do upload, a planilha está num servidor externo. " +
              "Deletar depois não apaga o dado do servidor, só remove seu acesso à interface. " +
              "Converter sem dados é uma etapa extra que não resolve o problema raiz. " +
              "Acionar o suporte preserva o dado no ambiente controlado " +
              "e documenta a falha da ferramenta.",
            feedbackError:
              "Deletar após download não remove do servidor externo. " +
              "Conversão de formato não protege os dados durante o processo. " +
              "Reinserir após converter ainda expõe os dados durante a etapa de upload. " +
              "Urgência é real mas não muda o que acontece com o dado no servidor.",
            mascotMessage:
              "Deletar depois. " +
              "Se eu tivesse um real para cada vez que ouvi isso.",
          },

          {
            id: "q8",
            timestamp: "15h30",
            location: "Escritório",
            context:
              "Você compartilhou planilha com dados de clientes " +
              "via Google Drive com parceiro autorizado. " +
              "Link configurado como 'qualquer pessoa com o link pode visualizar' " +
              "com expiração em 24 horas. " +
              "Parceiro confirmou recebimento.",
            question:
              "Essa configuração foi adequada para esse envio?",
            options: [
              {
                id: "a",
                text: "Não: a configuração correta é restrita ao e-mail do parceiro desde o início",
              },
              {
                id: "b",
                text: "Sim: expiração em 24h limita o risco a uma janela curta e controlada",
              },
              {
                id: "c",
                text: "Sim: parceiro confirmou o recebimento então o link pode ser revogado agora",
              },
              {
                id: "d",
                text: "Depende: se o parceiro não repassou o link para ninguém, a configuração foi suficiente",
              },
            ],
            correctOptionId: "a",
            feedbackSuccess:
              "'Qualquer pessoa com o link' é acesso público durante as 24 horas. " +
              "Se o link vazar nesse período, qualquer um acessa os dados. " +
              "Confirmação de recebimento não revoga o link automaticamente. " +
              "Restrito ao e-mail do parceiro garante acesso exclusivo " +
              "independente de para quem o link for encaminhado.",
            feedbackError:
              "Expiração limita o tempo de exposição, não o alcance durante ele. " +
              "Confirmação de recebimento e não repasse dependem do comportamento do parceiro. " +
              "Configuração segura não pode depender de comportamento externo para funcionar.",
            mascotMessage:
              "'Provavelmente ninguém vai interceptar' " +
              "e 'definitivamente ninguém consegue interceptar' " +
              "são frases parecidas com consequências muito diferentes.",
          },
    
          {
            id: "q9",
            timestamp: "16h30",
            location: "Escritório",
            context:
              "Você recebe notificação de que um serviço online que você usa " +
              "sofreu vazamento de dados confirmado, incluindo senhas. " +
              "A senha que você usa nesse serviço " +
              "é a mesma que você usa em outros dois sistemas.",
            question:
              "Qual é a consequência real dessa reutilização?",
            options: [
              {
                id: "a",
                text: "Baixa: a senha vazada precisa ser testada em outros sistemas manualmente pelo atacante",
              },
              {
                id: "b",
                text: "Alta: atacantes usam ferramentas automatizadas que testam senhas vazadas em centenas de serviços em minutos",
              },
              {
                id: "c",
                text: "Média: depende de quantas pessoas tiveram a mesma senha vazada no mesmo breach",
              },
              {
                id: "d",
                text: "Baixa: serviços diferentes têm sistemas de detecção que bloqueiam tentativas automatizadas",
              },
            ],
            correctOptionId: "b",
            feedbackSuccess:
              "Quando uma senha vaza, ela é testada automaticamente " +
              "em bancos, e-mails e redes sociais em minutos. " +
              "Mesma senha em três lugares significa três acessos entregues de uma vez.",
            feedbackError:
              "Testar a mesma senha em vários serviços é automático e leva minutos. " +
              "Bloqueios existem mas não são infalíveis. " +
              "Uma senha diferente por serviço limita o estrago a um único lugar.",
            mascotMessage:
              "Uma porta aberta. Todas as outras que usam a mesma chave também."
          },

          {
            id: "q10",
            timestamp: "18h30",
            location: "Casa",
            context:
              "Você recebe uma ligação de alguém que se identifica " +
              "como analista de segurança do seu banco. " +
              "Ele diz que detectou movimentações suspeitas na sua conta " +
              "e precisa confirmar alguns dados para bloquear. " +
              "Antes de continuar, avisa: " +
              "'não acesse o app nem ligue para o banco agora, " +
              "isso pode alertar os golpistas e comprometer o bloqueio'.",
            question:
              "Qual elemento dessa ligação é o principal sinal de alerta?",
            options: [
              {
                id: "a",
                text: "O pedido para não acessar o app nem ligar para o banco durante o atendimento",
              },
              {
                id: "b",
                text: "A ligação ter vindo do banco sem que você tenha solicitado contato",
              },
              {
                id: "c",
                text: "O atendente mencionar golpistas, o que pode ser uma tentativa de criar urgência",
              },
              {
                id: "d",
                text: "A solicitação de dados pessoais por telefone em vez de pelo app",
              },
            ],
            correctOptionId: "a",
            feedbackSuccess:
              "Pedir para você não abrir o app e não ligar para o banco " +
              "elimina as duas verificações que desfazem o golpe imediatamente. " +
              "A justificativa soa protetora, mas é o oposto: " +
              "banco legítimo nunca precisa que você fique fora dos canais oficiais para funcionar.",
            feedbackError:
              "Ligações não solicitadas e pedidos de dados acontecem em atendimentos legítimos. " +
              "Mencionar urgência também é procedimento padrão de segurança real. " +
              "O isolamento é o único elemento sem justificativa válida: " +
              "qualquer processo real do banco sobrevive a você abrir o app para confirmar.",
            mascotMessage:
              "Proteger alguém de verificar. " +
              "Se você conseguir isso, o resto é só detalhe.",
          },


        ],

        summary: {
          title: "Segunda-feira encerrada.",
          passingScore: 7,
          resultMessages: {
            excellent:
              "10 de 10. " +
              "Você não reconheceu os golpes óbvios. " +
              "Você não decorou regras. Você raciocinou. " +
              "Diferença enorme.",
            good:
              "Você passou. " +
              "Algumas decisões foram por instinto, não por análise. " +
              "Revise as que errou: são as que aparecem " +
              "exatamente quando você está com pressa.",
            needsWork:
              "Abaixo do mínimo. " +
              "As questões que você errou não eram sobre tecnologia. " +
              "Eram sobre padrão de raciocínio. " +
              "Volte às trilhas e refaça com esse olhar.",
          },
          xpReward: 150,
          mascotMessage:
            "Você passou por um dia inteiro de segunda-feira " +
            "Cada situação tinha uma razão boa para tomar a decisão errada.\n\n" +
            "Boa sorte na próxima segunda-feira. " +
            "Ela vai ser diferente desta.",
          },

      },
    },

    {
      id: "final_b3",
      type: "SUMMARY",
      data: {
        title: "Missão concluída.",
        summary:
          "Dez situações reais. Um dia inteiro.\n\n" +
          "Não havia trilha indicada, nem tema avisado. " +
          "Cada decisão apareceu no meio de uma rotina normal, " +
          "que é exatamente como acontece fora daqui.",
        keyTakeaway:
          "Segurança não é sobre reconhecer ataques óbvios. " +
          "É sobre o que você faz quando nada parece suspeito.",
        xpEarned: 150,
        nextMissionTeaser: null,
        mascotMessage:
          "Dez situações. Um dia comum.\n\n" +
          "A próxima segunda-feira vai ser diferente desta.",
      },
    },

  ],
};
