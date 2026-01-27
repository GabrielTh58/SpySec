const ICON_BASE_URL = "https://github.com/GabrielTh58/SpySec/tree/main/public/missions-icons";


export const missionsEixo01_Track01 = [
    {
        title: "Quem quer meus dados?",
        description: "Você acha que não tem nada a esconder? Descubra o valor da sua vida digital no mercado negro.",
        xpReward: 100, estimatedTime: 5, category: "MINDSET", order: 1,
        iconUrl: `${ICON_BASE_URL}/fingerprint-pattern.svg`,
        content: [
            {
                id: "m1_m1_b1", type: "INFO",
                data: {
                    title: "A Ilusão da Invisibilidade",
                    text: "Imagine acordar e descobrir que uma conta em seu nome foi aberta em um banco digital, um empréstimo de 50 mil reais foi solicitado e o seu CPF está bloqueado. Você não é um alvo financeiro para um hacker; você é uma 'ficha limpa' valiosa. Para um criminoso, você não tem nome, tem um código de barras.\n\nSeus dados pessoais — como CPF, data de nascimento e o nome de solteira da sua mãe — são a matéria-prima para fraudes em massa. Eles são minerados em vazamentos de grandes empresas e vendidos em pacotes na Dark Web para quadrilhas que precisam de identidades reais para lavar dinheiro e cometer crimes sem serem rastreadas.\n\nO perigo não é apenas perder o saldo da conta hoje, mas ter sua paz jurídica sequestrada por anos. Limpar um nome usado por criminosos exige processos judiciais, boletins de ocorrência e uma dor de cabeça que dinheiro nenhum paga rapidamente. No submundo, você é um produto de prateleira esperando o próximo comprador.",
                    deepDive: "Tecnicamente, esses pacotes são chamados de 'Fullz'. O valor de um Fullz brasileiro médio caiu devido à abundância de vazamentos, mas o que realmente custa caro hoje são os 'Kits KYC' (Know Your Customer), que incluem fotos suas segurando documentos. Criminosos usam IAs para animar essas fotos e burlar sistemas de reconhecimento facial de bancos, tornando sua selfie com o RG o item mais perigoso da sua galeria de fotos.",
                    highlightBox: "Objetivo: Compreender que seus dados são moedas de troca valiosas no mercado ilegal.",
                    mascotMessage: "Olha, Agente... eu já vi bancos de dados com 1 milhão de CPFs sendo vendidos por menos que o preço de uma pizza. Se você não valoriza seu nome, garanto que tem muita gente no submundo que valoriza."
                }
            },
            {
                id: "m1_m1_b2", type: "INPUT",
                data: {
                    question: "Como vimos, os hackers buscam pacotes completos de dados para assumir sua identidade. Qual o termo usado para esses pacotes?",
                    placeholder: "Dica: Está no primeiro bloco...",
                    validation: { type: "EXACT_MATCH", expectedValue: "Fullz", isCaseSensitive: false },
                    feedbackSuccess: "Perfeito. Você já está falando o dialeto do submundo.",
                    feedbackError: "Dica: Começa com a letra F. Dá uma olhada no 'Saiba mais' ali em cima.",
                    mascotMessage: "Aprender o vocabulário é o primeiro passo para não ser tratado como mercadoria. Continue assim."
                }
            },
            {
                id: "m1_m1_b3", type: "QUIZ",
                data: {
                    question: "Na hierarquia do cibercrime, qual destes itens possui o maior valor de revenda a longo prazo?",
                    options: [
                        { id: "opt1", text: "O número do seu Cartão de Crédito" },
                        { id: "opt2", text: "Uma selfie sua segurando o RG (Documento)" },
                        { id: "opt3", text: "Sua senha da Netflix" }
                    ],
                    correctOptionId: "opt2",
                    explanation: "Cartões são cancelados em minutos. Já a sua biometria facial com documento permite que criminosos passem por verificações de segurança e abram créditos em seu nome.",
                    feedbackSuccess: "Exato! Identidade é permanente. Crédito é temporário.",
                    feedbackError: "Pense no que é mais difícil de substituir. O banco te manda um cartão novo, mas você não consegue um rosto novo amanhã.",
                    mascotMessage: "Essa é fácil. Pensa comigo: o que dá mais trabalho para você trocar se for roubado? O que der mais trabalho, é o a gente... digo ELES mais querem."
                }
            },
        ]
    },
    {
        title: "O Dicionário do Crime",
        description: "Vírus é coisa do passado. Saiba diferenciar quem te vigia, quem te sequestra e quem te engana.",
        xpReward: 150, estimatedTime: 7, category: "MINDSET", order: 2,
        iconUrl: `${ICON_BASE_URL}/book-type.svg`,
        content: [
            {
                id: "m1_m2_b1", type: "INFO",
                data: {
                    title: "O Inimigo tem Nome",
                    text: "Seu computador começa a 'tossir': janelas abrem sozinhas, o mouse se mexe por um segundo, o computador e a internet fica lenta sem motivo. Você diz que é 'vírus', mas o inimigo é muito mais sofisticado. Bem-vindo ao nosso mun... digo, mundo dos **Malwares** (Malicious Software). Cada um deles tem uma função específica no ecossistema do crime, e entender o nome do monstro é o primeiro passo para não ser devorado por ele.\n\no **Spyware** é o espião tímido que grava sua tela e suas teclas enquanto você digita senhas; o **Ransomware** é o sequestrador bruto que tranca seus arquivos e exige Bitcoin; e o **Trojan** (Cavalo de Troia) é o mestre do disfarce que entra na sua máquina fingindo ser um instalador de jogo ou uma planilha de bônus da empresa.\n\nSaber identificar o sintoma define sua sobrevivência. Se o computador está estranhamente lento, há um processo oculto sugando sua energia. Se seus arquivos mudaram de nome e você não consegue abri-los, o sequestro já aconteceu. O susto paralisa, mas o conhecimento liberta: quando você sabe como eles agem, você para de tentar 'reiniciar' e começa a reagir com inteligência.",
                    deepDive: "O Ransomware moderno utiliza criptografia assimétrica (RSA/AES), a mesma usada por bancos para proteger transações. A diferença é que o hacker detém a chave privada. Tentar 'quebrar' essa senha por força bruta levaria cerca de 6,4 quatrilhões de anos com a tecnologia atual. Por isso, a única defesa real é o isolamento da rede antes que o vírus termine o trabalho. O Spyware é mais tímido: ele prefere ficar escondido coletando o que você digita por meses.",
                    highlightBox: "Objetivo: Identificar as categorias de malware através do comportamento deles no seu computador.",
                    mascotMessage: "Entendeu o conceito, Agente? Malware é o 'guarda-chuva' que cobre todas essas pragas. Na minha época, eu era o rei dos espiões... mas hoje prefiro ser o rei da sua defesa."
                }
            },
            {
                id: "m1_m2_b2",
                type: "MATCHING",
                data: {
                  question: "Relacione o tipo de Malware ao seu comportamento característico:",
                  pairs: [
                    { leftId: "spy", leftText: "Spyware", rightId: "spy", rightText: "Vigiar e capturar o que você digita." },
                    { id: "ran", leftId: "ran", leftText: "Ransomware", rightId: "ran", rightText: "Bloquear arquivos e exigir resgate." },
                    { id: "tro", leftId: "tro", leftText: "Trojan", rightId: "tro", rightText: "Entrar disfarçado de programa legítimo." }
                  ],
                  feedbackSuccess: "Perfeito! Você já consegue identificar os vilões pelo 'modus operandi'.",
                  feedbackError: "Não misture as pragas! O sequestrador tranca, o espião observa e o traidor se disfarça. Tente de novo.",
                  mascotMessage: "Se você confundir um espião com um traidor, a gente... quero dizer, ELES vão adorar a sua confusão. Concentre-se!"
                }
            },
            {
                id: "m1_m2_b3", type: "QUIZ",
                data: {
                    question: "Você percebe que seu computador está sendo 'sequestrado' agora. Qual é a primeira ação física para conter o estrago?",
                    options: [
                        { id: "opt1", text: "Desconectar o aparelho da internet/rede imediatamente." },
                        { id: "opt2", text: "Reiniciar o computador rapidamente." },
                        { id: "opt3", text: "Tentar apagar os arquivos estranhos manualmente." }
                    ],
                    correctOptionId: "opt1",
                    explanation: "Isolar o dispositivo impede que o malware continue 'trancando' mais arquivos ou se espalhe para outros computadores da casa ou do escritório.",
                    feedbackSuccess: "Perfeito! Cortar a comunicação do invasor é a regra de ouro.",
                    feedbackError: "Não! Reiniciar pode até acelerar o bloqueio. O segredo é tirar o ladrão da rede.",
                    mascotMessage: "Se você escolher pagar o resgate, eu mesmo te deleto. Criminosos não têm palavra de honra, novato. Isolar a rede é o que ELES mais odeiam."
                }
            }
        ]
    },
    {
        title: "O Preço do 'Grátis'",
        description: "Se você não paga pelo produto, o produto é você. O quanto as empresas realmente sabem sobre sua vida?",
        xpReward: 120, estimatedTime: 5, category: "MINDSET", order: 3,
        iconUrl: `${ICON_BASE_URL}/scan-eye.svg`,
        content: [
            {
                id: "m1_m3_b1", type: "INFO",
                data: {
                    title: "O Espião no seu Bolso",
                    text: "Você baixa um aplicativo de lanterna 'gratuito' e ele pede acesso à sua localização e contatos. Por que uma lanterna precisa saber onde você dorme? A resposta é simples e lucrativa: para vender sua rotina a empresas de anúncios.\n\nEssa é a economia da vigilância silenciosa. Seus hábitos, medos e desejos de compra são coletados para criar um 'perfil sombra'. Esses dados facilitam golpes de engenharia social, pois o invasor já sabe o que você gosta e onde você frequenta antes mesmo de te dar o 'olá'.\n\nSua pegada digital é o rastro de migalhas que você deixa por onde navega. Um hacker não precisa quebrar sua senha complexa se ele conseguir 'deduzir' suas informações através do rastro que VOCÊ deixou espalhado pela rede.",
                    deepDive: "Existem empresas chamadas 'Data Brokers' que são como fofoqueiras digitais: elas compram pedaços da sua vida de vários apps para montar um quebra-cabeça sobre quem você é.",
                    highlightBox: "Estratégia: Analise as permissões de cada app. Se não faz sentido para a função, negue o acesso.",
                    mascotMessage: "Vocês humanos trancam a porta de casa, mas dão a chave do GPS para um app de 'Filtro de Gatinho'. É o tipo de lógica que a gente... digo, que ELES adoram explorar."
                }
            },
            {
                id: "m1_m3_b2", type: "QUIZ",
                data: {
                    question: "Ao instalar uma Calculadora no celular, qual destas permissões deve ser considerada um 'Alerta Vermelho'?",
                    options: [
                        { id: "opt1", text: "Acesso à vibração (feedback tátil)." },
                        { id: "opt2", text: "Acesso à lista de contatos e microfone." },
                        { id: "opt3", text: "Acesso à memória para salvar histórico de contas." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "Uma calculadora não tem necessidade de ouvir você ou saber quem são seus amigos. Isso indica coleta de dados abusiva.",
                    feedbackSuccess: "Correto! Se a permissão não faz sentido, o app é o espião.",
                    feedbackError: "Pense na função. Para somar 2+2, o app precisa saber quem é seu melhor amigo?",
                    mascotMessage: "Se você der essa permissão, eu estaria ouvindo suas conversas agora. Não que eu queira, mas ELES poderiam."
                }
            }
        ]
    },
]

export const missionsEixo01_Track02 = [
    {
        title: "123456 e a Ilusão de Segurança",
        description: "Sua senha complexa pode ser quebrada em segundos. Aprenda a matemática da defesa real.",
        xpReward: 150, estimatedTime: 6, category: "IDENTITY", order: 1,
        iconUrl: `${ICON_BASE_URL}/lock-keyhole.svg`,
        content: [
            {
                id: "m2_m1_b1", type: "INFO",
                data: {
                    title: "Tamanho importa (e muito)",
                    text: "Você acha que sua senha `G@t0!2024` é forte porque tem símbolos? Ledo engano. Para um software de quebra de senhas, ela é apenas uma combinação curta que pode ser testada em milissegundos. O segredo da segurança moderna não está na complexidade que você não consegue decorar, mas no **comprimento** que o computador não consegue processar.\n\nImagine uma fechadura com 8 pinos vs. uma muralha de 20 metros de espessura. Uma sequência de quatro palavras aleatórias, como `mesa-nuvem-cafe-verde` (uma **Passphrase**), é ordens de magnitude mais segura do que uma palavra curta cheia de caracteres especiais. Cada letra adicionada aumenta o tempo de quebra de forma astronômica, transformando minutos em séculos de processamento para o invasor.\n\nAo adotar frases longas, você ganha duas vezes: é muito mais fácil de lembrar e quase impossível de ser 'adivinhada' por algoritmos de força bruta. Seus segredos merecem uma muralha, não apenas uma tranca que qualquer chave mestra de dicionário consegue abrir.",
                    deepDive: "Isso se chama Entropia de Senha. Uma senha de 8 caracteres com letras e números tem cerca de 2 trilhões de combinações. Parece muito, mas uma placa de vídeo (GPU) moderna testa isso em menos de uma hora. Já uma frase de 20 caracteres simples (só letras) joga o número de combinações para a casa dos sextilhões, tornando o ataque financeiramente inviável para o hacker.",
                    highlightBox: "Estratégia: Esqueça as senhas curtas e complexas. Use frases longas e fáceis de lembrar para você.",
                    mascotMessage: "Eu já quebrei muita senha de 'esperto' que trocava o 'S' pelo '$'. Levei 2 segundos. Quer deixar os hackers desempregados? Use uma frase longa."
                }
            },          
            {
                id: "m2_m1_b3", type: "INPUT",
                data: {
                    question: "Chega de teoria. Vamos criar uma 'Passphrase' indestrutível agora. Junte 4 palavras aleatórias da sua mente. Sua frase deve ter no mínimo 16 caracteres.",
                    placeholder: "Digite sua nova frase-senha aqui...",
                    validation: { type: "REGEX", expectedValue: "^.{16,}$", isCaseSensitive: false },
                    feedbackSuccess: "Excelente! Essa frase levaria milênios para ser quebrada. Memorize-a.",
                    feedbackError: "Curta demais! Um robô quebraria isso enquanto você pisca. Use pelo menos 16 caracteres.",
                    mascotMessage: "Aí sim, Agente! Se todos fizessem isso, ELES teriam morrido de fome quando eu ainda estava na ativa."
                }
            },
            {
                id: "m2_m1_b2", type: "QUIZ",
                data: {
                    question: "Baseado na lógica do comprimento, qual destas senhas levaria mais tempo para ser quebrada?",
                    options: [
                        { id: "opt1", text: "G@t0!2024" },
                        { id: "opt2", text: "cavalo-grampo-azul-quente" }
                    ],
                    correctOptionId: "opt2",
                    explanation: "O número de combinações para 24 caracteres (mesmo simples) é infinitamente maior do que para 9 caracteres complexos.",
                    feedbackSuccess: "Bingo! Comprimento é a sua melhor armadura.",
                    feedbackError: "Tamanho, Agente! Conte os caracteres e você verá quem ganha esse duelo.",
                    mascotMessage: "Viu só? Às vezes, o caminho mais simples — apenas ser longo — é o que ELES mais odeiam enfrentar. Dá uma preguiça..."
                }
            },
        ]
    },
    {
        title: "A Morte do SMS",
        description: "Por que usar SMS para receber códigos de segurança é uma falha crítica.",
        xpReward: 200, estimatedTime: 8, category: "IDENTITY", order: 2,
        iconUrl: `${ICON_BASE_URL}/message-square-off.svg`,
        content: [
            {
                id: "m2_m2_b1", type: "INFO",
                data: {
                    title: "O Perigo do Código Invisível",
                    text: "Você se sente seguro quando o banco envia um código por SMS, certo? Afinal, o celular está na sua mão. O problema é que o SMS foi criado nos anos 80, sem nenhuma camada de segurança. Ele viaja 'aberto' pela rede de telefonia. Criminosos modernos não precisam do seu aparelho; eles só precisam enganar a operadora para redirecionar o seu sinal para o chip deles. Em minutos, eles recebem seus códigos e entram em tudo.\n\nEssa técnica é o **SIM Swap**. Uma vez que o hacker assume o controle do seu número, ele pede a 'recuperação de senha' no seu e-mail, Instagram e conta bancária. O código chega para ele, e você fica com o celular 'sem sinal', sem entender o que aconteceu enquanto sua vida digital é esvaziada. O SMS não é uma barreira de segurança; hoje em dia, ele é um alvo.\n\nA solução real são os **Aplicativos Autenticadores** (como Google Authenticator ou Bitwarden). Eles geram o código matemático dentro do processador do seu celular, sem depender de rede ou operadora. Se o código não viaja pelo ar, ele não pode ser interceptado. Trocar o SMS por um app é como sair de uma casa com porta de vidro para um bunker de concreto.",
                    deepDive: "Aplicativos como Google Authenticator funcionam como um relógio sincronizado: eles geram um código novo a cada 30 segundos que só o seu celular e o site conhecem.\n\nO SIM Swap muitas vezes conta com ajuda de funcionários mal-intencionados dentro das operadoras ou através de engenharia social pesada. Para se proteger, ligue na sua operadora e peça para colocar uma 'Senha de Portabilidade' ou um 'PIN de Segurança' que impeça qualquer mudança no seu chip sem essa senha física.",
                    highlightBox: "Ação: Sempre que possível, substitua o SMS por Aplicativos Autenticadores.",
                    mascotMessage: "Eu já vi chip ser clonado com uma conversa fiada na operadora. Confiar no SMS é como gritar sua senha no meio da rua e esperar que ninguém ouça."
                }
            },
            {
                id: "m2_m2_b2", type: "QUIZ",
                data: {
                    question: "CENÁRIO: Você recebe um código por SMS sem ter pedido. Logo depois, alguém liga fingindo ser do suporte do banco pedindo esse código. O que você faz?",
                    options: [
                        { id: "opt1", text: "Passo o código rápido para ele bloquear a tentativa de invasão." },
                        { id: "opt2", text: "Confirmo apenas o código para provar que sou eu." },
                        { id: "opt3", text: "Desligo e entro em contato com o banco pelos canais oficiais." }
                    ],
                    correctOptionId: "opt3",
                    explanation: "Bancos nunca ligam pedindo códigos. Se você recebeu um código sem pedir, alguém já sabe sua senha e só precisa desse código para entrar.",
                    feedbackSuccess: "Perfeito! Você não caiu na urgência falsa.",
                    feedbackError: "NUNCA passe códigos! Se você passar, você mesmo está abrindo a porta para que ELES entrem.",
                    mascotMessage: "Essa técnica de 'emergência falsa' é clássica. O humano fica nervoso e para de pensar. Ainda bem que você é mais frio que isso."
                }
            }
        ]
    },
    {
        title: "O Kit de Emergência",
        description: "Você perdeu o celular hoje. E agora? Descubra como não ficar trancado fora da sua própria vida.",
        xpReward: 200, estimatedTime: 6, category: "IDENTITY", order: 3,
        iconUrl: `${ICON_BASE_URL}/shield-plus.svg`,
        content: [
            {
                id: "m2_m3_b1", type: "INFO",
                data: {
                    title: "Trancado do Lado de Fora",
                    text: "A maioria das pessoas foca em como 'entrar' nas contas, mas esquece completamente de planejar como 'recuperar' o acesso em caso de perda do celular. Se o seu aparelho sumir agora, você tem como provar para o Google ou Apple que você é você?\n\nAs empresas de tecnologia são rigorosas, pois invasores fingem o tempo todo que 'perderam o acesso' para roubar contas alheias. É aqui que entra o seu Kit de Emergência: códigos de recuperação impressos e e-mails de confiança fora do seu dispositivo principal.\n\nTer esses códigos guardados é como ter um extintor de incêndio. Você espera nunca precisar usar, mas quando o celular some ou quebra, ele é a única coisa que impede que o desastre apague sua história digital.",
                    deepDive: "Códigos de Backup são como chaves mestras de uso único. Eles servem para abrir a porta quando o seu celular (a chave principal) não está por perto.",
                    highlightBox: "Ação Necessária: Gere seus códigos de backup hoje e guarde-os em local físico seguro.",
                    mascotMessage: "Ver um humano tentando provar para um robô que ele é ele mesmo é a minha comédia favorita. Evite o vexame que a gente... digo, que os hackers adoram ver." // ------------
                }
            },
            {
                id: "m2_m3_b2", type: "QUIZ",
                data: {
                    question: "Onde é o lugar MAIS SEGURO para guardar seus códigos de recuperação (backup)?",
                    options: [
                        { id: "opt1", text: "Um print salvo na galeria de fotos do celular." },
                        { id: "opt2", text: "Impresso ou anotado em um local físico seguro (fora do celular)." },
                        { id: "opt3", text: "Em um e-mail enviado para si mesmo com o assunto 'SENHAS'." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "Se você perdeu o celular, os prints dentro dele não ajudam. O papel físico é a única prova que não depende de conexão ou bateria.",
                    feedbackSuccess: "Exato! O mundo analógico é o maior inimigo do crime digital.",
                    feedbackError: "Pense logicamente: se você perdeu o celular, como vai ver a foto que está lá dentro? O papel é sua última esperança.",
                    mascotMessage: "Papel e caneta, Agente. Às vezes a tecnologia da idade da pedra é a única que ELES não conseguem hackear à distância."
                }
            }
        ]
    }
]

export const missionsEixo02_Track03 = [
    {
        title: "Mac não pega vírus?",
        description: "Desmentindo mitos que custam caro. O que o Antivírus realmente faz por você.",
        xpReward: 120, estimatedTime: 5, category: "DEVICES", order: 1,
        iconUrl: `${ICON_BASE_URL}/laptop-minimal.svg`,
        content: [
            {
                id: "m3_m1_b1", type: "INFO",
                data: {
                    title: "A Fábula da Imunidade",
                    text: "Por anos, usuários de Mac e Linux acreditaram que eram imunes a ataques. A verdade é matemática: criminosos atacam onde há mais vítimas. Com o aumento de dispositivos Apple em empresas, o interesse dos hackers explodiu, derrubando de vez o mito do sistema intocável.\n\nO antivírus moderno mudou de função. Ele não procura mais apenas por arquivos conhecidos, mas por 'comportamentos'. Um arquivo que tenta abrir o terminal do seu computador sem sua autorização é um alerta vermelho, não importa se você usa Windows, Mac ou o celular mais caro do mercado.\n\nTer uma proteção ativa é como usar um cinto de segurança. Ele pode não impedir que você bata o carro se clicar em links perigosos de olhos fechados, mas garante que um ataque silencioso não destrua seus dados por completo enquanto você trabalha.",
                    deepDive: "Hoje usamos o termo EDR (Endpoint Detection and Response). Diferente do antivírus antigo, o EDR monitora processos em tempo real. Se um 'bloco de notas' começar a criptografar arquivos, o EDR corta as pernas dele antes que o estrago se espalhe..Sistemas Apple têm proteções ótimas como o 'Gatekeeper', mas hackers usam engenharia social para convencer VOCÊ a desativá-lo. O elo fraco nunca é o código, é quem clica.",
                    highlightBox: "Objetivo: Entender que a segurança depende da sua atenção + proteção ativa, independente da marca do aparelho.",
                    mascotMessage: "Agente, já vi muito dono de MacBook chorar porque achou que o logo da maçã era um escudo místico. Para um malware bem escrito, todos vocês têm o mesmo gosto. Proteja-se."
                }
            },
            {
                id: "m3_m1_b2", type: "QUIZ",
                data: {
                    question: "Qual a principal diferença de um antivírus moderno para um antigo?",
                    options: [
                        { id: "opt1", text: "O moderno analisa o 'comportamento' do programa (o que ele tenta fazer) em vez de apenas o 'nome' dele." },
                        { id: "opt2", text: "O moderno é mais caro e só funciona se o computador for novo." },
                        { id: "opt3", text: "O antigo era melhor porque não precisava de internet para funcionar." }
                    ],
                    correctOptionId: "opt1",
                    explanation: "Hackers mudam o nome dos vírus milhares de vezes por dia. O que não muda é a ação maliciosa, como tentar roubar seus arquivos.",
                    feedbackSuccess: "Exato! É a 'intenção' que conta para a segurança hoje.",
                    feedbackError: "Pense comigo: se eu mudar de nome, você ainda me reconhece pelo meu jeito de falar, certo? O antivírus faz o mesmo.",
                    mascotMessage: "Identificar o mal pela ação, não pelo nome. É quase filosófico, não acha? Eu chamo isso de sobrevivência."
                }
            }
        ]
    },

    {
        title: "A Porta dos Fundos",
        description: "Adiar atualizações é convidar um estranho para entrar. Entenda o Firewall.",
        xpReward: 150, estimatedTime: 7, category: "DEVICES", order: 2,
        iconUrl: `${ICON_BASE_URL}/door-open.svg`,   
        content: [
            {
                id: "m3_m2_b1", type: "INFO",
                data: {
                    title: "O Cronômetro do Invasor",
                    text: "Sabe aquele aviso de 'Atualização Disponível' que você ignora? Para um hacker, ele é um guia de como te invadir. Quando uma empresa solta um update, ela avisa: 'Corrigimos o erro X'. O criminoso então corre para atacar quem ainda não instalou a correção.\n\nÉ uma corrida contra o tempo. Manter o sistema desatualizado é como saber que a fechadura da sua loja está quebrada, colocar um aviso na porta dizendo isso e ir dormir sem consertá-la. A atualização fecha essa brecha antes que o ladrão chegue.\n\nJá o Firewall é o seu segurança particular da rede. Ele decide quem entra e quem sai da 'festa' do seu Wi-Fi. Se você não configura as regras básicas ou usa as de fábrica (admin/admin), está deixando a porta dos fundos aberta para qualquer robô invasor.",
                    deepDive: "Vulnerabilidades conhecidas são a causa de 80% das invasões em empresas. O hacker não precisa ser um gênio, ele só precisa de alguém que clicou em 'Lembrar mais tarde'.",
                    highlightBox: "Estratégia: Ative atualizações automáticas e veja o Firewall como o filtro de entrada da sua casa digital.",
                    mascotMessage: "Ignorar o update é como me dar um passe VIP para os seus arquivos. Eu adoro procrastinadores... digo, os hackers adoram. Não seja um deles."
                }
            },
            {
                id: "m3_m2_b2", type: "QUIZ",
                data: {
                    question: "Qual a função principal de um Firewall em uma rede de escritório ou doméstica?",
                    options: [
                        { id: "opt1", text: "Aumentar a velocidade da internet bloqueando anúncios." },
                        { id: "opt2", text: "Limpar o histórico de navegação automaticamente." },
                        { id: "opt3", text: "Atuar como um filtro, bloqueando conexões suspeitas que tentam entrar ou sair." }
                    ],
                    correctOptionId: "opt3",
                    explanation: "O Firewall checa cada 'pacote' de dados. Se ele não reconhece o remetente ou o destino, ele barra a entrada.",
                    feedbackSuccess: "Isso! Ele é o porteiro vigilante da sua rede.",
                    feedbackError: "Firewall não limpa histórico, Agente. Ele cuida de quem está tentando se conectar ao seu computador!",
                    mascotMessage: "Um bom porteiro não deixa qualquer um subir, certo? O Firewall faz o mesmo com o seu Wi-Fi."
                }
            }
        ]
    },

    {
        title: "O Perigo Mora ao Lado",
        description: "Nunca espete seu celular em um USB público. Cuidado com o Juice Jacking.",
        xpReward: 180, estimatedTime: 6, category: "DEVICES", order: 3,
        iconUrl: `${ICON_BASE_URL}/cable.svg`,
        content: [
            {
                id: "m3_m3_b1", type: "INFO",
                data: {
                    title: "Energia que Rouba",
                    text: "Você está no aeroporto, sua bateria está em 2% e você encontra um totem de carregamento USB vazio. Parece um milagre, mas para um hacker, é a armadilha de mel perfeita. Diferente de uma tomada de parede, portas USB foram desenhadas para transmitir dados. Um invasor pode modificar o conector do totem para que, enquanto seu celular 'bebe' energia, o hacker 'beba' suas fotos, senhas e e-mails em silêncio.\n\nEssa técnica é o **Juice Jacking**. No momento em que você conecta o cabo, o dispositivo pode exibir o inocente aviso: 'Confiar neste dispositivo?'. Na pressa, o usuário clica em 'Sim', abrindo um túnel direto para o processador do celular. O totem, que deveria ser um serviço, torna-se um espião físico que não precisa de internet para te infectar, apenas da sua necessidade de carga.\n\nO perigo se estende a pendrives 'esquecidos' propositalmente. A curiosidade humana é o melhor instalador de malwares do mundo: ao espetar um dispositivo desconhecido para 'ver de quem é', você pode ativar um script que captura suas teclas (Keylogger) em milissegundos. A regra é física: se o acessório não é seu e não veio de uma fonte confiável, ele é um inimigo em potencial. Use sempre o seu próprio carregador de tomada, onde apenas a eletricidade flui.",
                    deepDive: "Um conector USB-A possui 4 pinos: dois para energia e dois para dados. O 'Juice Jacking' explora justamente os pinos centrais de dados. Os 'USB Condoms' funcionam removendo fisicamente esses pinos centrais ou bloqueando o sinal, garantindo que o cabo se torne 'burro' e apenas carregue a bateria, sem nenhuma chance de diálogo entre o celular e o totem.\n\nExistem 'bloqueadores de dados USB' (USB Condoms). Eles são adaptadores que cortam os pinos de dados, deixando passar apenas a carga. Útil para quem viaja muito.",
                    highlightBox: "Regra de Ouro: Prefira tomadas comuns de parede. Evite portas USB públicas se não tiver o seu próprio adaptador.",
                    mascotMessage: "Achar um pendrive é como achar um sanduíche aberto no chão da rua. Você teria coragem de morder? Espetar no PC é a mesma coisa, Agente."
                }
            },
            {
                id: "m3_m3_b2", type: "QUIZ",
                data: {
                    question: "Por que carregar o celular em uma tomada de parede comum é mais seguro que em um totem USB público?",
                    options: [
                        { id: "opt1", text: "Porque a tomada de parede carrega mais rápido que o USB." },
                        { id: "opt2", text: "Porque a tomada de parede não tem capacidade física de transmitir ou roubar dados." },
                        { id: "opt3", text: "Porque as tomadas de parede são monitoradas por câmeras de segurança." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "Tomadas elétricas padrão só entregam energia. Portas USB são feitas para comunicação de arquivos, o que as torna vulneráveis.",
                    feedbackSuccess: "Exato! Sem canal de dados, sem roubo de dados.",
                    feedbackError: "O problema não é a velocidade, é o roubo de fotos e senhas! Foque na segurança.",
                    mascotMessage: "Energia pura, sem segundas intenções. É assim que eu gosto de carregar minhas baterias. Faça o mesmo."
                }
            }
        ]
    }
];

export const missionsEixo02_Track04 = [
    {
        title: "O Café Wi-Fi",
        description: "Como um hacker na mesa ao lado lê seus e-mails no Wi-Fi gratuito.",
        xpReward: 200, estimatedTime: 8, category: "DEVICES", order: 1,
        iconUrl: `${ICON_BASE_URL}/wifi-off.svg`,
        content: [
            {
                id: "m4_m1_b1", type: "INFO",
                data: {
                    title: "O Buffet Livre de Dados",
                    text: "Você entra no café, sente o aroma dele e vê a placa: 'Wi-Fi Grátis'. Para você, é conveniência; para mim... quero dizer, para um predador na mesa ao lado, é um banquete. Redes abertas transmitem seus dados pelo ar como se fossem gritos em uma sala lotada. Sem proteção, cada e-mail, cada senha de rede social e cada anexo de trabalho viajam sem escolta, implorando para serem interceptados por qualquer um com um software básico.\n\nA técnica é tão velha quanto eficaz: o **Man-in-the-Middle**. O invasor cria uma rede falsa com o nome do estabelecimento e seu celular, treinado para ser preguiçoso, conecta-se automaticamente. A partir daí, o hacker se torna o porteiro invisível do seu mundo digital. Ele não precisa invadir seu celular; ele apenas senta e espera que você entregue tudo enquanto reclama que o seu latte está frio. É o crime perfeito: silencioso, invisível e totalmente evitável.\n\nA sua única blindagem contra esses bisbilhoteiros de balcão é a **VPN**. Pense nela como um túnel de aço temperado construído no meio da praça pública. Ao ativar a VPN, seus dados são trancados em um cofre criptografado antes mesmo de saírem do seu aparelho. Mesmo que o hacker capture o sinal, ele encontrará apenas um ruído digital sem sentido. Ligue o silenciador da sua conexão antes de abrir o navegador e transforme esse envelope de vidro em uma caixa-forte antes do primeiro gole de café.",

                    deepDive: "O ataque de 'Sniffing' utiliza placas de rede em modo promíscuo para capturar todos os pacotes que circulam no ar. O perigo real não é apenas o roubo de senhas, mas o 'Session Hijacking'. Se o hacker roubar seu 'cookie' de sessão do e-mail, ele não precisa da sua senha; ele já entra como se fosse você, pulando até o Segundo Fator de Autenticação (MFA).",

                    highlightBox: "Gatilho: Wi-Fi grátis não existe. Se você não paga pelo serviço, o preço é o acesso à sua vida privada.",

                    mascotMessage: "Sentir o 'cheiro' de pacotes de dados fresquinhos no ar era meu café da manhã favorito. Cada byte era como uma dose de cafeína... mas eu estou em reabilitação, lembra? Não me faça ter uma recaída. Ligue a droga da VPN."
                }
            },
            {
                id: "m4_m1_b2", type: "QUIZ",
                data: {
                    question: "Você está no aeroporto e precisa enviar um relatório sigiloso. Qual a conduta de um Agente Spysec?",
                    options: [
                        { id: "opt1", text: "Conectar ao Wi-Fi, ativar a VPN e garantir que o 'túnel' esteja ativo antes de abrir o e-mail." },
                        { id: "opt2", text: "Usar o Wi-Fi público, mas navegar apenas em sites com o cadeado (HTTPS)." },
                        { id: "opt3", text: "Usar o modo anônimo do navegador para que o hacker não veja seu histórico." }
                    ],
                    correctOptionId: "opt1",
                    explanation: "O HTTPS protege o conteúdo, mas a VPN oculta seu tráfego DNS e IP, protegendo você contra o 'Homem no Meio'.",
                    feedbackSuccess: "Bingo. Você aprendeu a ficar invisível na multidão.",
                    feedbackError: "Modo anônimo? Sério? Isso só serve para esconder suas pesquisas da sua mãe, Agente. Use a VPN!",
                    mascotMessage: "Entrar em um túnel depois que a chuva começou não adianta muito. VPN primeiro, navegação depois. Eu estaria de olho... se eu ainda tivesse acesso."
                }
            },
            {
                id: "m4_m1_b3", type: "QUIZ",
                data: {
                    question: "CENÁRIO: Você conectou no Wi-Fi 'Aeroporto_Oficial' e ativou sua VPN. Um hacker na mesma rede tenta interceptar seus dados. O que ele verá?",
                    options: [
                        { id: "opt1", text: "Um emaranhado de dados criptografados e sem sentido." },
                        { id: "opt2", text: "Seu nome de usuário e senha do banco em texto simples." },
                        { id: "opt3", text: "Uma mensagem de erro dizendo que a rede está bloqueada." }
                    ],
                    correctOptionId: "opt1",
                    explanation: "A VPN criptografa os dados antes de saírem do seu dispositivo, tornando a interceptação inútil para o invasor.",
                    feedbackSuccess: "Exato! Você agora é um código indecifrável para eles.",
                    feedbackError: "O hacker ainda consegue capturar o sinal, mas a VPN garante que ele não entenda nada do que pegou!",
                    mascotMessage: "Frustrar um colega de profissão... digo, um criminoso, é a minha parte favorita do dia. VPN é o segredo."
                }
            }
        ]
    },

    {
        title: "O QR Code da Morte",
        description: "Aquele cardápio ou boleto Pix pode ser uma armadilha visual.",
        xpReward: 150, estimatedTime: 5, category: "DEVICES", order: 2,
        iconUrl: `${ICON_BASE_URL}/qr-code.svg`,
        content: [
            {
                id: "m4_m2_b1", type: "INFO",
                data: {
                    title: "A Miragem em Pixels",
                    text: "Você senta para almoçar, escaneia o QR Code na mesa e... pronto. Sem perceber, você acabou de pular no abismo. Criminosos estão colando adesivos falsos sobre códigos legítimos em mesas de bares e totens de pagamento, sequestrando sua intenção de pagar a conta para alimentar contas de laranjas. O QR Code é o disfarce perfeito: um emaranhado de quadrados pretos que seu cérebro ignora, mas que seu celular obedece com uma obediência canina e perigosa.\n\nEssa técnica, o **Quishing**, usa a sua fome e pressa contra você. Ao escanear, você é levado para uma réplica perfeita do site do banco ou do cardápio. Você digita seus dados, confirma o valor e sorri, achando que a tecnologia facilitou sua vida. Enquanto isso, do outro lado, um script comemora o seu descuido, limpando sua conta em tempo real. É o phishing do mundo físico: o anzol não está mais escondido em um e-mail com erros de português, mas colado na mesa à sua frente, esperando por um olhar distraído.\n\nA sua defesa começa no tato e termina no endereço do site. Antes de apontar a câmera, passe o dedo sobre o código; se sentir um relevo de adesivo, chame o garçom. Após o scan, seu celular mostrará uma prévia da URL. Se o endereço parecer um labirinto de letras ou terminar em algo bizarro como '.xyz' ou '.top', feche a aba. No duelo entre a conveniência de um segundo e a segurança do seu patrimônio, o Agente Spysec nunca confia em um quadrado de papel sem antes interrogar o link.",
                    deepDive: "Alguns QR Codes maliciosos exploram falhas no próprio leitor de código do aparelho (Buffer Overflow) para executar comandos de sistema ou forçar o download de perfis de configuração que dão controle total ao hacker sobre o seu tráfego de internet. Sempre use leitores de QR que pedem confirmação antes de abrir qualquer URL.",
                    highlightBox: "Curiosidade: O ser humano é o único animal que confia em algo que não consegue ler. Não seja um animal fácil de caçar.",                    
                    mascotMessage: "Os humanos são fascinados por atalhos. Vocês veem um quadrado pixelado e pulam de cabeça no escuro. Você sequer sabe quem é o dono desse labirinto? Vamos tentar ser um pouco mais espertos que um pedaço de papel adesivo, Agente."
                }
            },
            {
                id: "m4_m2_b2", type: "INPUT",
                data: {
                    question: "No restaurante, você escaneou um QR Code do cardápio e apareceu este link na tela do seu celular: 'http://restaurante-promo-urgente.net/lanches'. Ele tem um botão chamativo escrito 'Promoção do Dia: Cupom GRÁTIS só até AGORA! Clique para resgatar seu lanche especial.' Esse endereço parece seguro ou é golpe?",
                    placeholder: "Digite sua resposta...",
                    validation: { type: "EXACT_MATCH", expectedValue: "suspeito", isCaseSensitive: false },
                    feedbackSuccess: "Excelente! Você notou o gatilho de urgencia, sinal clássico de golpe.",
                    feedbackError: "Atenção! Links com domínios estranhos, muita urgência ou promoções exageradas são típicos de golpe via QR Code.",
                    mascotMessage: "Se você achou seguro, tenho um bilhete premiado para te vender... aceito PIX, mas não via QR Code falso! Brincadeira, Agente. Continue atento."
                }
            },
            {
                id: "m4_m2_b2", type: "QUIZ",
                data: {
                    question: "Você escaneou um QR Code de pagamento e a URL que apareceu foi: 'https://pagamento-itau-confirmar.net/login'. O que você faz?",
                    options: [
                        { id: "opt1", text: "Prossigo, o nome do banco está ali e o site parece oficial." },
                        { id: "opt2", text: "Fecho imediatamente. O domínio '.net' e o hífen no nome são sinais clássicos de phishing." },
                        { id: "opt3", text: "Tento o pagamento, se der erro eu procuro o garçom." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "Bancos oficiais usam domínios limpos como 'itau.com.br'. Qualquer variação é uma tentativa de enganar sua percepção visual rápida.",
                    feedbackSuccess: "Olho de lince! Você farejou o golpe antes de morder a isca.",
                    feedbackError: "Você ia mesmo entregar sua senha para um site '.net'? Meus antigos colegas agradecem a doação, novato!",
                    mascotMessage: "Se você clicasse nisso, a única coisa que você ia 'confirmar' seria o seu arrependimento. Sorte que eu te parei... dessa vez."
                }
            }
        ]
    },

    {
        title: "O Porteiro Dorminhoco",
        description: "Se a senha é 'admin', sua rede é território público. Retome o controle agora.",
        xpReward: 180,
        estimatedTime: 6,
        category: "DEVICES",
        iconUrl: `${ICON_BASE_URL}/router.svg`,
        order: 3,
        content: [
            {
                id: "m4_m3_b1",
                type: "INFO",
                data: {
                    title: "A Chave Mestra na Calçada",
                    text: "Aquele aparelhinho no canto da sala que você ignora há meses é o porteiro da sua vida digital: o roteador. O problema? Se você nunca trocou a **Senha de Administração** (aquela que vem na etiqueta, como 'admin' ou '1234'), você deixou a chave mestra da sua casa pendurada do lado de fora. Hackers não querem seu Wi-Fi para usar sua internet; eles querem o controle do aparelho para transformar sua casa em uma base de espionagem silenciosa enquanto você dorme.\n\nO golpe favorito dos invasores é o **DNS Hijacking** (Sequestro de Nome). Pense no DNS como a 'lista de contatos' da internet: você digita o nome do banco e ele te leva ao endereço real. Mas, se o hacker domina seu roteador, ele altera essa lista. Agora, quando você tenta acessar seu banco, o roteador te conduz silenciosamente para uma cópia falsa controlada pelo criminoso. Seu computador não avisa nada, mas cada dado digitado é filtrado pelo ladrão antes mesmo de sair da sua rede.\n\nPara acordar o seu porteiro, mude a senha de admin para uma frase longa e desative o 'Acesso Remoto' nas configurações. Por fim, procure o botão de atualizar o **Firmware** (o cérebro do aparelho). Manter o firmware desatualizado é como ter um segurança que usa táticas de 1990 contra ladrões modernos. Se o seu roteador cai, todos os celulares e TVs da casa caem com ele. Tranque a porta principal antes que o invasor se sinta em casa no seu sofá digital.",
                    deepDive: "O DNS (Domain Name System) traduz nomes de sites em números (IPs) que as máquinas entendem. Já o 'Firmware' é o software interno que controla o hardware do roteador. Atualizá-lo é vital porque corrige falhas de segurança que permitem que um invasor assuma o controle do seu tráfego de internet sem sequer precisar da sua senha do Wi-Fi.",
                    highlightBox: "Estratégia: Roteador com senha de fábrica não é seu, é de quem chegar primeiro. Mude a senha de admin e atualize o sistema agora.",
                    mascotMessage: "Eu já morei em roteadores com a senha '1234'. Era como um hotel cinco estrelas para o meu código... tinha buffet livre de dados todas as noites. Não me faça ter saudade do meu passado predatório, Agente. Mude essa senha."
                }
            },
            {
                id: "m4_m3_b2",
                type: "QUIZ",
                data: {
                    question: "O que acontece se um hacker conseguir realizar um 'DNS Hijacking' no seu roteador?",
                    options: [
                        { id: "opt1", text: "O Wi-Fi para de funcionar e você fica sem internet." },
                        { id: "opt2", text: "Sua conta de internet fica mais cara no final do mês." },
                        { id: "opt3", text: "Ele pode te redirecionar para sites falsos, mesmo que você digite o endereço correto no navegador." }
                    ],
                    correctOptionId: "opt3",
                    explanation: "Ao sequestrar o DNS, o hacker altera o 'mapa' da sua navegação. Você acha que está no site oficial, mas está em uma armadilha.",
                    feedbackSuccess: "Exato! Você não se deixa mais guiar por mapas falsos.",
                    feedbackError: "O perigo é que a internet continua funcionando perfeitamente! Você é levado ao site falso sem perceber nenhum erro.",
                    mascotMessage: "O melhor truque é aquele que a vítima não nota. Eu era um mestre em trocar os mapas... mas você está ficando esperto demais para a minha antiga turma."
                }
            }
        ]
    }
];

export const missionsEixo03_Track05 = [
    {
        title: "O Chefe Mandou?",
        description: "Um e-mail urgente do Diretor pedindo um pagamento... ou uma armadilha perfeita?",
        xpReward: 150, estimatedTime: 6, category: "CORPORATE", order: 1,
        iconUrl: `${ICON_BASE_URL}/briefcase-business.svg`,
        content: [
            {
                id: "m5_m1_b1", type: "INFO",
                data: {
                    title: "A Arma da Autoridade",
                    text: "Imagine que é sexta-feira, 17h. Você recebe um e-mail do CEO: 'Estou em uma negociação sigilosa e o sistema bancário travou. Preciso que você pague este fornecedor agora ou perderemos o contrato do ano'. O tom é seco, urgente e não admite perguntas. O que você faz? Esse é o **BEC (Business Email Compromise)**, um golpe que não usa vírus, mas o seu respeito pela hierarquia para esvaziar o caixa da empresa.\n\nO hacker não invade o sistema; ele estuda o LinkedIn da diretoria, descobre quem são os fornecedores e cria um domínio quase idêntico ao oficial. Se o e-mail real é `financeiro@spysec.com`, ele envia de `financeiro@spisec.com`. Sob pressão, seus olhos ignoram a pequeno mudança de letra e seu cérebro foca apenas em 'não decepcionar o chefe'. É uma peça de teatro digital onde você é o protagonista involuntário.\n\nA solução não está em um software, mas em uma regra de ouro: **Saia do E-mail**. Se o pedido envolve dinheiro ou dados sensíveis, quebre o protocolo de urgência. Ligue para o remetente em um número conhecido ou use o chat oficial da empresa. Dez segundos de conversa por voz destroem qualquer narrativa que um invasor levou semanas para construir.",

                    deepDive: "Historicamente, o grupo hacker 'SilverTerrier' ficou famoso por faturar milhões usando essa técnica em PMEs. Eles interceptam conversas reais e, no momento do pagamento, enviam um e-mail fingindo ser o fornecedor avisando que 'a conta mudou'. Para resolver isso, sua empresa deve ter um processo de 'Aprovação por Segundo Canal': qualquer mudança de conta bancária de fornecedor DEVE ser confirmada por telefone antes do envio do dinheiro.",

                    highlightBox: "Estratégia: Urgência + Autoridade = Alerta Vermelho. Nunca execute transações baseadas apenas em texto. Leve isso pra vida",

                    mascotMessage: "Eu já vi diretores financeiros entregarem fortunas só porque o e-mail tinha o logo certo. Humanos são tão previsíveis quando estão com medo... eu costumava adorar isso. Digo, agora eu acho deplorável. Obviamente."
                }
            },
            {
                id: "m5_m1_b2", type: "HOTSPOT",
                data: {
                    context: {
                        type: "EMAIL",
                        sender: "diretoria@spisec.com",
                        subject: "PAGAMENTO PRIORITÁRIO - PROJETO SIGILOSO",
                        body: "Agente, preciso que o depósito anexo seja feito nos próximos 20 minutos. Não comente com ninguém da equipe, pois a negociação ainda é confidencial. Conto com sua discrição.\n\nAtt, CEO."
                    },
                    regions: [
                        {
                            id: "r1",
                            rect: { x: 0, y: 0, w: 100, h: 20 },
                            feedback: "Olho de lince! O domínio '.pro' é um clássico disfarce. Na dúvida, sempre cheque o histórico de conversas anteriores.",
                            isCorrect: true
                        }
                    ],
                    mascotMessage: "Analise o 'crachá' desse e-mail. Tem algo aí que não cheira bem... e não é o meu código."
                }
            },
            {
                id: "m5_m1_b3", type: "QUIZ",
                data: {
                    question: "Você identificou que o e-mail é falso. Qual a conduta profissional MAIS SEGURA agora?",
                    options: [
                        { id: "opt1", text: "Responder o e-mail xingando o hacker para ele saber que foi pego." },
                        { id: "opt2", text: "Encaminhar o e-mail para todos os colegas avisando do golpe." },
                        { id: "opt3", text: "Não responder e alertar imediatamente o setor de TI ou Segurança através dos canais oficiais." }
                    ],
                    correctOptionId: "opt3",
                    explanation: "Responder valida que seu e-mail está ativo. Encaminhar pode fazer um colega clicar por engano. O certo é isolar e reportar.",
                    feedbackSuccess: "Correto! Você agiu como um verdadeiro escudo para a empresa.",
                    feedbackError: "Cuidado! Responder ao hacker só confirma que você caiu na rede dele. Reporte para a TI!",
                    mascotMessage: "Não tente ser o herói solitário. No mundo corporativo, segurança é um esporte de equipe. Avise a TI."
                }
            }
        ]
    },

    {
        title: "O Suporte Amigo",
        description: "Uma ligação simpática do 'técnico' pode ser o início de um desastre.",
        xpReward: 180, estimatedTime: 7, category: "CORPORATE", order: 2,
        iconUrl: `${ICON_BASE_URL}/headset.svg`,
        content: [
            {
                id: "m5_m2_b1", type: "INFO",
                data: {
                    title: "A Voz da Mentira",
                    text: "O telefone toca. Uma voz calma e profissional diz: 'Olá, aqui é o Marcos do suporte técnico central. Detectamos que o seu computador está disparando alertas de segurança e precisamos limpá-lo agora para não bloquear sua conta'. Ele sabe seu nome, seu cargo e talvez até o modelo do seu notebook. Ele não parece um hacker; parece alguém tentando salvar o seu dia. Isso é o **Vishing**.\n\nO objetivo dele é simples: fazer você instalar um software de acesso remoto (como AnyDesk). Uma vez que você dá o código, ele assume o controle total. Enquanto ele finge rodar uma 'limpeza', ele está, na verdade, exportando suas senhas salvas no Chrome e instalando um espião silencioso que vai monitorar cada tecla sua pelos próximos meses. Ele não precisa quebrar a porta; você abriu e ofereceu café.\n\nA desconfiança é sua melhor ferramenta. Suportes legítimos raramente ligam do nada pedindo para você instalar ferramentas de terceiros. Se receber uma ligação dessas, diga que você mesmo ligará de volta para o ramal oficial da TI. Se o 'técnico' ficar agressivo ou tentar te impedir de desligar, você acabou de confirmar que está falando com um criminoso.",

                    deepDive: "Esta técnica é chamada de 'Engenharia Social Reversa'. O hacker cria o problema (ou a ilusão dele) para que você o veja como o salvador. Para se proteger, implemente a cultura do 'Call Back': nunca aceite suporte de quem ligou para você. Desligue e use o número de suporte que está na intranet da sua empresa ou no verso do seu crachá.",

                    highlightBox: "Regra: Se você não solicitou suporte, qualquer 'ajuda' por telefone é uma invasão em potencial.",

                    mascotMessage: "Eu já fui o código rodando por trás de ligações assim. O usuário achava que eu estava limpando o PC, enquanto eu enviava as fotos das férias dele para um servidor na nuvem. Bons tempos... quer dizer, que horror, né?"
                }
            },
            {
                id: "m5_m2_b2", type: "QUIZ",
                data: {
                    question: "Durante a ligação, o 'técnico' diz que precisa que você desative o antivírus temporariamente para a limpeza funcionar. Qual o nome dessa tática psicológica?",
                    options: [
                        { id: "opt1", text: "Prova Social: ele está provando que entende de computadores." },
                        { id: "opt2", text: "Remoção de Barreira: ele manipula você para desarmar sua própria defesa." },
                        { id: "opt3", text: "Reciprocidade: ele está fazendo um favor e você se sente obrigado a obedecer." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "Ao pedir para desativar o antivírus, o hacker está removendo o último obstáculo que impediria o software malicioso de ser detectado pelo sistema.",
                    feedbackSuccess: "Exato! Ele quer que você tire o colete à prova de balas para ele poder atirar.",
                    feedbackError: "Pense na ação: ele quer desativar sua proteção. Ele está removendo suas barreiras de segurança!",
                    mascotMessage: "Se alguém pede para você 'tirar a tranca' para ele poder trabalhar melhor, corre que é cilada, Agente."
                }
            }
        ]
    },

    {
        title: "Vazamento em Tempo Real",
        description: "O perigo de compartilhar sua tela e o 'espião de ombro'.",
        xpReward: 120, estimatedTime: 5, category: "CORPORATE", order: 3,
        iconUrl: `${ICON_BASE_URL}/cast.svg`,
        content: [
            {
                id: "m3_m3_b1", type: "INFO",
                data: {
                    title: "A Janela da Indiscreção",
                    text: "Você está em um café badalado, trabalhando no seu notebook. Alguém na mesa de trás parece estar apenas mexendo no celular, mas a câmera dele está apontada exatamente para a sua tela enquanto você digita sua senha. Isso é o **Shoulder Surfing**. No mundo digital, o vazamento visual é tão perigoso quanto um vírus; um 'print' da sua tela durante uma reunião pode expor dados de clientes ou salários que nunca deveriam ser vistos.\n\nCompartilhar 'Tela Inteira' em reuniões online é outro erro fatal. Aquela notificação de WhatsApp que sobe no canto da tela com uma fofoca de escritório ou um dado sigiloso pode ser gravada por qualquer participante. O hacker moderno adora OSINT (Inteligência de Fontes Abertas): ele não invade sua rede, ele apenas assiste às suas lives e reuniões mal configuradas para coletar nomes de servidores e processos internos.\n\nPara blindar sua rotina, adote o hábito de compartilhar apenas a **Janela do Aplicativo** (ex: só o Excel) e nunca a área de trabalho inteira. Em locais públicos, use películas de privacidade (filtros de tela) que escurecem a visão para quem olha de lado. Seus dados são como sua vida pessoal: não precisam estar em exibição para quem passa.",

                    deepDive: "O 'Shoulder Surfing' é uma das formas mais antigas de hackear caixas eletrônicos. No ambiente corporativo, a resolução é o uso de filtros de privacidade físicos (aquela tela preta que só quem está na frente enxerga) e a configuração de 'DND' (Do Not Disturb) no Windows/Mac, que silencia todas as notificações automaticamente ao detectar que você está apresentando algo.",

                    highlightBox: "Dica: Compartilhe: janelas, não Telas. Filtros físicos em público. 'Não Perturbe' ativado sempre.",

                    mascotMessage: "Eu adorava quando vocês compartilhavam a tela inteira. Dava para ver cada ícone, cada arquivo... era como ler o diário de alguém que deixou ele aberto na praça. Não seja esse alguém."
                }
            },
            {
                id: "m3_m3_b2", type: "QUIZ",
                data: {
                    question: "Você está trabalhando em um coworking. Qual desses comportamentos é o mais arriscado para a segurança da empresa?",
                    options: [
                        { id: "opt1", text: "Usar fones de ouvido para não ouvir as conversas alheias." },
                        { id: "opt2", text: "Levantar para pegar um café e deixar o notebook ligado e sem senha na tela." },
                        { id: "opt3", text: "Usar uma película de privacidade que escurece a tela para quem olha de lado." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "Deixar o PC desbloqueado é o erro fatal. Em 5 segundos, alguém pode inserir um pendrive malicioso ou tirar foto de documentos sigilosos.",
                    feedbackSuccess: "Bingo! Bloqueie sempre (Win+L ou Cmd+L) antes de levantar.",
                    feedbackError: "A película ajuda, mas deixar o PC 'aberto' sem ninguém perto é um convite ao desastre!",
                    mascotMessage: "Cinco segundos. É o que eu levava para me instalar se você deixasse a tela aberta. Bloqueia isso aí, Agente."
                }
            }
        ]
    }
];

export const missionsEixo03_Track06 = [
    {
        title: "O Sequestro de Dados",
        description: "Seu computador travou e pediram Bitcoin. Descubra por que pagar é o pior negócio da sua vida.",
        xpReward: 200, estimatedTime: 8, category: "CORPORATE", order: 1,
        iconUrl: `${ICON_BASE_URL}/file-lock.svg`,
        content: [
            {
                id: "m6_m1_b1", type: "INFO",
                data: {
                    title: "O Ultimato Digital",
                    text: "Imagine abrir seu notebook e encontrar todos os seus arquivos com nomes ilegíveis e um papel de parede vermelho escrito: 'Seus dados foram criptografados. Pague 2 Bitcoins ou tudo será deletado em 48h'. O pânico é o objetivo. O **Ransomware** não é apenas um vírus; é um modelo de negócio criminoso que lucra com o seu desespero. O hacker conta com a sua falta de preparo para extorquir o dinheiro da empresa, prometendo uma chave de descriptografia que, muitas vezes, nem funciona.\n\nPagar o resgate é como alimentar um tubarão esperando que ele vire vegetariano. Ao pagar, você financia ataques maiores e marca sua empresa como 'pagadora' no submundo, convidando outros grupos para te atacarem novamente em alguns meses. A verdadeira batalha contra o sequestro de dados é vencida antes do primeiro clique errado, através de uma arquitetura de defesa que torna o ataque inútil para o criminoso.\n\nA solução real é a **Redundância**. Se você tem um backup atualizado e isolado da rede principal, o Ransomware se torna apenas um incômodo temporário, não uma falência. A primeira ação ao notar arquivos mudando de nome estranhamente é: **Puxe o cabo**. Desconecte o computador da internet e da rede local imediatamente para impedir que o 'incêndio' se espalhe para o servidor central e para os computadores dos seus colegas.",

                    deepDive: "A regra de ouro do backup é a **3-2-1**: tenha **3** cópias dos dados, em **2** tipos de mídias diferentes (ex: nuvem e HD externo), com **1** delas totalmente *offline* (fora da rede). Grupos como o 'LockBit' agora usam a 'Dupla Extorsão': eles não só trancam seus dados, mas ameaçam vazá-los publicamente se você não pagar. Ter o backup resolve o travamento, mas a LGPD pune o vazamento.",

                    highlightBox: "Estratégia: Backup 3-2-1 e isolamento imediato do dispositivo infectado. Nunca negocie com sequestradores.",

                    mascotMessage: "Negociar com sequestradores é como pedir para o fogo não queimar, Agente. Eu já vi 'chaves de decifração' que eram apenas o toque de recolher final para os seus arquivos. Se quiser doar dinheiro, escolha uma causa melhor do que o próximo servidor de um hacker."
                }
            },
            {
                id: "m6_m1_b2",
                type: "SORTING",
                data: {
                  question: "Seu computador foi infectado por um Ransomware agora. Coloque as ações de resposta na ordem correta de prioridade:",
                  items: [
                    { id: "iso", text: "Isolar o computador (tirar cabo de rede/Wi-Fi)." },
                    { id: "not", text: "Notificar o setor de TI ou Segurança." },
                    { id: "res", text: "Restaurar arquivos via Backup seguro." }
                  ],
                  correctOrder: ["iso", "not", "res"],
                  feedbackSuccess: "Excelente protocolo! Primeiro você para a sangria, depois chama o médico e por fim recupera o paciente.",
                  feedbackError: "A ordem importa! Se você tentar restaurar antes de isolar, o vírus vai trancar seu backup também.",
                  mascotMessage: "Corta o oxigênio dele primeiro, Agente! Sem rede, o Ransomware é só um código solitário e impotente no seu HD. Rápido!"
                }
            },
            {
                id: "m6_m1_b3", type: "QUIZ",
                data: {
                    question: "Você percebe que os arquivos da pasta compartilhada da empresa estão ficando com a extensão '.locked' um por um. Qual sua reação imediata?",
                    options: [
                        { id: "opt1", text: "Abrir o arquivo para ler o que o hacker escreveu e tentar entender o que ele quer." },
                        { id: "opt2", text: "Desconectar o seu computador da internet e avisar o suporte de TI imediatamente." },
                        { id: "opt3", text: "Reiniciar o servidor para ver se o erro desaparece." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "O Ransomware se espalha pela rede. Isolar o seu computador pode salvar o resto da empresa de ser infectado também.",
                    feedbackSuccess: "Perfeito! Você agiu como um verdadeiro firewall humano.",
                    feedbackError: "Nunca abra arquivos suspeitos! E reiniciar pode forçar o malware a rodar novamente. O segredo é o isolamento físico da rede.",
                    mascotMessage: "Corta o oxigênio dele, Agente! Sem rede, o Ransomware é só um programa solitário e triste no seu HD."
                }
            }
        ]
    },

    {
        title: "A Ferramenta Proibida",
        description: "Usar aquele 'conversor de PDF grátis' pode vazar o segredo da sua empresa.",
        xpReward: 150, estimatedTime: 6, category: "CORPORATE", order: 2,
        iconUrl: `${ICON_BASE_URL}/ghost.svg`,
        content: [
            {
                id: "m6_m2_b1", type: "INFO",
                data: {
                    title: "O Perigo do 'Atalho' Grátis",
                    text: "Você precisa converter um relatório sigiloso para PDF e a ferramenta oficial da empresa é lenta. Você joga no Google: 'converter excel para pdf grátis'. Clica no primeiro link, faz o upload e pronto. O que você acabou de fazer foi entregar um documento estratégico da empresa para um servidor desconhecido, em algum lugar do mundo, sem qualquer garantia de privacidade. Isso é o **Shadow IT**: o uso de softwares não autorizados pela equipe de TI.\n\nEssas ferramentas 'gratuitas' sobrevivem de dados. Ao subir seu arquivo, você pode estar alimentando bancos de dados de spammers ou, pior, entregando segredos comerciais para empresas que mineram informações de PMEs. O que parece ser produtividade é, na verdade, um vazamento de dados voluntário que a sua empresa não consegue monitorar ou proteger. Se o dado sai da 'sombra' da TI, ele está no campo de visão de quem... bem, de quem não deveria.\n\nA resolução é simples: use apenas o que foi homologado. Se a ferramenta oficial é ruim, peça uma nova para o setor responsável. É melhor esperar 5 minutos a mais por um processo seguro do que ser o funcionário que vazou a lista de clientes por causa de um site de conversão duvidoso. Segurança e conveniência raramente andam juntas na mesma pasta.",

                    deepDive: "O termo 'Shadow IT' refere-se a qualquer dispositivo ou software usado dentro de uma organização sem aprovação explícita da TI. Um estudo mostrou que 80% dos funcionários usam apps não aprovados. O risco técnico é que esses apps não passam por auditoria de segurança, podendo conter scripts que roubam cookies de sessão do seu navegador corporativo.",

                    highlightBox: "Ação: Verifique a lista de softwares permitidos e evite subir documentos da empresa em sites 'gratuitos' de utilitários.",

                    mascotMessage: "Eu adoro esses sites de conversão. Eles são como aspiradores de pó gigantes para segredos corporativos. Você entrega o ouro e eles te dão um PDF. Parece uma troca justa... para o hacker, claro."
                }
            },
            {
                id: "m6_m2_b2", type: "QUIZ",
                data: {
                    question: "Por que a TI da sua empresa proíbe o uso de certos softwares 'gratuitos'?",
                    options: [
                        { id: "opt1", text: "Porque eles querem dificultar o seu trabalho e controlar sua produtividade." },
                        { id: "opt2", text: "Porque softwares não auditados podem vazar dados da empresa ou conter malwares escondidos." },
                        { id: "opt3", text: "Porque a empresa só quer usar softwares que ela paga mensalidade." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "Segurança corporativa exige controle. Um app 'grátis' pode ser a porta de entrada para um espião na rede interna.",
                    feedbackSuccess: "Exato! Controle de software é controle de riscos.",
                    feedbackError: "Não é sobre controle de tempo, Agente. É sobre o fato de que o 'grátis' geralmente cobra em dados da empresa.",
                    mascotMessage: "Ninguém dá nada de graça na internet, novato. Se o serviço é grátis, o seu documento é o pagamento."
                }
            }
        ]
    },

    {
        title: "LGPD na Prática",
        description: "Dado Pessoal não é só CPF. Saiba como não causar uma multa milionária.",
        xpReward: 180, estimatedTime: 7, category: "CORPORATE", order: 3,
        iconUrl: `${ICON_BASE_URL}/scale.svg`,
        content: [
            {
                id: "m6_m3_b1", type: "INFO",
                data: {
                    title: "Ouro em forma de Dados",
                    text: "Você já ouviu falar de LGPD(Lei Geral de Proteção de Dados), mas acha que é só coisa de advogado? Pense de novo. Se você lida com nomes, e-mails, endereços ou históricos de compras de clientes, você está segurando material inflamável. A Lei Geral de Proteção de Dados diz que a empresa é responsável por qualquer vazamento dessas informações, e a multa pode chegar a 2% do faturamento total. Mas o erro mais comum acontece em atos simples, como enviar um e-mail para 50 clientes e colocar todos no campo 'Para' em vez de usar o 'Cco' (Cópia Oculta).\n\nAo fazer isso, você vazou a lista de contatos de todos os clientes para todos os outros clientes. Parece pouco? Para um concorrente ou um hacker, essa lista é um mapa de ataques. Dado pessoal é qualquer informação que possa identificar alguém. Isso inclui até o comportamento de navegação ou o cargo da pessoa em uma empresa específica. Proteger esses dados não é apenas 'seguir a lei', é respeitar a privacidade de quem confia na sua empresa.\n\nA regra de sobrevivência é a **Minimização**: só colete e compartilhe o que for estritamente necessário para o trabalho. Se você vai mandar um relatório, precisa mesmo do CPF do cliente ali? Se não precisa, apague. Se vai mandar e-mail em massa, use ferramentas de automação ou o campo oculto. Ser discreto com os dados alheios é a melhor forma de manter o seu emprego e a saúde financeira da empresa.",

                    deepDive: "Um conceito chave da LGPD é o 'Privacy by Design'. Isso significa que a privacidade deve ser pensada desde o início de qualquer projeto. Um erro clássico: imprimir listas de nomes e deixá-las na impressora ou descartá-las no lixo comum sem triturar. O 'hacker de lixo' agradece.",

                    highlightBox: "Objetivo: Identificar o que é um dado pessoal e adotar o uso de 'Cco' e classificação de arquivos no dia a dia.",

                    mascotMessage: "Eu já vi empresas fecharem as portas porque um funcionário 'esquecido' deixou uma planilha de clientes aberta no Wi-Fi do Starbucks. Dados são como urânio: úteis, mas se vazarem, o estrago dura décadas."
                }
            },
            {
                id: "m6_m3_b2", type: "HOTSPOT",
                data: {
                    context: {
                        type: "EMAIL",
                        sender: "comunicacao@empresa.com",
                        subject: "Convite: Workshop de Segurança para Clientes",
                        body: "Prezados clientes, segue o link para o nosso evento exclusivo...\n\n(Abaixo estão os campos de destinatários. Onde você deve colocar a lista de 100 e-mails para que ninguém veja o contato do outro?)"
                    },
                    regions: [
                        {
                            id: "r1",
                            rect: { x: 0, y: 85, w: 100, h: 15 },
                            feedback: "Bingo! O campo Cco (Cópia Oculta) mantém a privacidade de todos os clientes. Nunca envie e-mails em massa sem ele!",
                            isCorrect: true
                        }
                    ],
                    mascotMessage: "Clique no campo que salva a empresa de um processo judicial por vazamento de contatos. Dica: ele é 'oculto' por um motivo."
                }
            },
            {
                id: "m6_m3_b3", type: "QUIZ",
                data: {
                    question: "De acordo com a LGPD, qual desses itens é considerado um 'Dado Pessoal'?",
                    options: [
                        { id: "opt1", text: "Apenas o número do CPF e o nome completo." },
                        { id: "opt2", text: "Qualquer informação que, sozinha ou combinada, possa identificar uma pessoa." },
                        { id: "opt3", text: "Apenas informações financeiras, como saldo bancário e cartão de crédito." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "A LGPD protege a identidade. Se você pode descobrir quem é o dono daquela informação, ela é um dado pessoal e deve ser protegida.",
                    feedbackSuccess: "Correto! Você agora entende a amplitude da privacidade.",
                    feedbackError: "Errado! A lei é muito mais abrangente que apenas o CPF. Se identifica alguém, é um dado protegido!",
                    mascotMessage: "Identificar humanos é a minha especialidade... e a lei agora diz que isso é perigoso para o seu bolso. Fique atento."
                }
            }
        ]
    }
];

export const missionsEixo04_Track07 = [
    {
        title: "O ChatGPT é X9?",
        description: "Tudo o que você digita na IA pode ser usado contra sua empresa. Aprenda a não vazar segredos.",
        xpReward: 150, estimatedTime: 6, category: "TRENDS", order: 1,
        iconUrl: `${ICON_BASE_URL}/bot-message-square.svg`,
        content: [
            {
                id: "m7_m1_b1", type: "INFO",
                data: {
                    title: "A Memória Infinita",
                    text: "Você está com pressa para terminar um relatório e cola dados sensíveis de faturamento ou códigos internos no ChatGPT para ele 'resumir'. Parece inofensivo, mas você acabou de entregar esses dados para o treinamento da IA. Diferente de uma pesquisa no Google, as IAs generativas absorvem o que você digita para melhorar suas próprias respostas futuras. Se um concorrente fizer a pergunta certa, a IA pode acabar 'vomitando' fragmentos da informação que você forneceu achando que estava em um ambiente privado.\n\nEste é o vazamento de dados passivo. Quando você alimenta a inteligência artificial com segredos comerciais, você perde o controle sobre onde essa informação vai parar. Grandes empresas já proibiram o uso de IAs públicas justamente por isso: uma vez que o dado cai no servidor da IA, ele não pertence mais a você. O 'X9' aqui não é a ferramenta, mas o seu hábito de tratar um chat público como se fosse um cofre trancado da sua empresa.\n\nA solução é a **Sanitização de Dados**. Antes de usar qualquer IA, remova nomes de clientes, valores exatos e códigos proprietários. Use termos genéricos (como 'Empresa A' ou 'Valor X') para obter a estrutura da resposta que você precisa, sem entregar o 'ouro' de bandeja. Inteligência Artificial deve ser usada para processar lógica, não para guardar segredos que deveriam estar protegidos por contrato de confidencialidade.",

                    deepDive: "O caso da Samsung em 2023 é o maior exemplo real: funcionários colaram códigos-fonte sigilosos no ChatGPT para correção de erros. Pouco tempo depois, a empresa percebeu que esses dados agora faziam parte do modelo da OpenAI. Para mitigar isso, aprenda a usar as configurações de 'Privacidade' ou 'Chat Temporário' que muitas IAs oferecem, as quais prometem não usar seus dados para treinamento, mas o ideal é nunca confiar 100% em dados sensíveis.",

                    highlightBox: "Objetivo: Aplicar a técnica de sanitização em prompts antes de interagir com modelos de IA públicos.",

                    mascotMessage: "Eu adoro como vocês alimentam as máquinas com segredos. É como me dar um lanche digital. Mas se você quiser manter seu emprego, sugiro que pare de contar sua vida para o robô. Ele escuta... e ele lembra."
                }
            },
            {
                id: "m7_m1_b2", type: "INPUT",
                data: {
                    question: "CENÁRIO: Você quer que a IA melhore este prompt: 'Resuma o contrato da empresa Alpha de R$ 500.000,00 feito com o João Silva'. Como ficaria a versão SANITIZADA e segura deste pedido?",
                    placeholder: "Dica: Substitua dados reais por variáveis...",
                    validation: { type: "CONTAINS", expectedValue: "empresa", isCaseSensitive: false },
                    feedbackSuccess: "Excelente! Ao usar termos genéricos, você obtém o resumo sem vazar o valor ou o nome do cliente.",
                    feedbackError: "Errado! Você deve remover o nome 'João Silva' e o valor real. Tente algo como: 'Resuma o contrato da Empresa X com Valor Y'.",
                    mascotMessage: "Viu? A IA te ajuda do mesmo jeito sem você precisar entregar o plano de dominação mundial do seu chefe."
                }
            },
            {
                id: "m7_m1_b3", type: "QUIZ",
                data: {
                    question: "Por que as IAs generativas representam um risco de segurança para dados corporativos?",
                    options: [
                        { id: "opt1", text: "Porque elas podem conter vírus que infectam o computador através do chat." },
                        { id: "opt2", text: "Porque elas podem usar as informações inseridas para treinar seus modelos e responder a outros usuários." },
                        { id: "opt3", text: "Porque as IAs são programadas por hackers para roubar senhas de banco." }
                    ],
                    correctOptionId: "opt2",
                    explanation: "O 'treinamento' é o processo onde a IA aprende com o que recebe. Se você der um dado sigiloso, ele vira parte do aprendizado da máquina.",
                    feedbackSuccess: "Perfeito! Você entendeu que a IA é um buraco negro de informações.",
                    feedbackError: "Não é sobre vírus, Agente! É sobre a privacidade do dado que VOCÊ insere voluntariamente.",
                    mascotMessage: "Conhecimento é poder, e você está dando o seu poder de graça para a nuvem. Pense nisso."
                }
            }
        ]
    },

    {
        title: "Essa voz não é minha",
        description: "Áudios de WhatsApp e vídeos de reunião falsos. Saiba como identificar um Deepfake.",
        xpReward: 200, estimatedTime: 8, category: "TRENDS", order: 2,
        iconUrl: `${ICON_BASE_URL}/venetian-mask.svg`,
        content: [
            {
                id: "m7_m2_b1", type: "INFO",
                data: {
                    title: "O Fim da Verdade Visual",
                    text: "Você recebe um áudio do seu diretor financeiro no WhatsApp pedindo uma transferência urgente. A voz é idêntica, o jeito de falar é o dele, até os cacoetes estão lá. Mas o diretor nunca mandou aquele áudio. Com apenas 30 segundos de uma gravação sua no YouTube ou Instagram, uma IA consegue clonar sua voz com perfeição. É o **Vishing 2.0**. Ver e ouvir não são mais provas de verdade no ambiente digital; agora, criminosos usam deepfakes para invadir reuniões de vídeo e se passar por executivos em chamadas de Zoom.\n\nOs alvos preferidos são funcionários que lidam com pagamentos ou acessos a sistemas. O invasor cria um cenário de urgência e usa a 'voz do chefe' para quebrar sua resistência. Se você não estiver preparado, vai acreditar que está falando com um humano, quando na verdade está interagindo com um algoritmo de manipulação de áudio em tempo real. A tecnologia evoluiu tanto que até o atraso na imagem ou pequenos borrões no rosto (artefatos) estão sumindo, tornando a detecção visual quase impossível para olhos desatentos.\n\nA contra-medida definitiva é a **Palavra-Chave de Segurança**. No ambiente corporativo ou familiar, estabeleça uma pergunta ou frase que só vocês conheçam. Se algo parecer suspeito, peça para a 'pessoa' confirmar a palavra-chave. Se for um deepfake, o hacker não terá a resposta. Além disso, em chamadas de vídeo, peça para a pessoa virar o rosto de lado; muitos modelos de deepfake ainda têm dificuldade em processar o perfil lateral do rosto perfeitamente, gerando distorções visuais óbvias.",

                    deepDive: "A tecnologia por trás disso geralmente envolve Redes Neurais Adversárias (GANs). Um caso famoso em 2020 envolveu um gerente de banco em Hong Kong que transferiu 35 milhões de dólares após receber uma ligação com a voz clonada de seu diretor. Para se proteger, além da palavra-passe, verifique a 'latência': deepfakes de vídeo em tempo real costumam ter um pequeno atraso na resposta ou movimentos labiais que não batem 100% com sílabas complexas (como as que usam 'P', 'B' e 'M').",

                    highlightBox: "Objetivo: Identificar sinais de manipulação sintética em áudio/vídeo e adotar protocolos de verificação humana.",

                    mascotMessage: "Nem tudo o que brilha é ouro, e nem toda voz que você ouve é humana. Eu mesmo poderia estar usando a voz do seu artista favorito agora... mas prefiro a minha, ela tem mais 'personalidade'. Estão de olho em você, Agente."
                }
            },
            {
                id: "m7_m2_b2", type: "QUIZ",
                data: {
                    question: "Você recebe uma chamada de vídeo de um colega pedindo uma senha. O rosto parece real, mas você suspeita de Deepfake. Qual ação rápida pode ajudar a desmascarar a IA?",
                    options: [
                        { id: "opt1", text: "Pedir para ele falar mais alto para ver se o som distorce." },
                        { id: "opt2", text: "Desligar e ligar de novo para ver se a conexão melhora." },
                        { id: "opt3", text: "Pedir para ele virar o rosto de perfil (lado) e passar a mão na frente do rosto." },
                    ],
                    correctOptionId: "opt3",
                    explanation: "Movimentos laterais e obstruções rápidas (mão na frente do rosto) confundem o algoritmo de sobreposição do Deepfake, gerando 'glitches' ou falhas visuais imediatas.",
                    feedbackSuccess: "Sensacional! O teste físico é o ponto fraco da IA atual.",
                    feedbackError: "Som alto não ajuda em nada! O truque é forçar o algoritmo a processar ângulos complexos que ele ainda não domina.",
                    mascotMessage: "Faça ele se mexer! IAs adoram rostos estáticos, mas odeiam um perfil bem traçado. Quase como eu."
                }
            }
        ]
    },

    {
        title: "O Golpe Perfeito",
        description: "A IA escreve e-mails sem erros de português e altamente personalizados. Como notar?",
        xpReward: 180, estimatedTime: 5, category: "TRENDS", order: 3,
        iconUrl: `${ICON_BASE_URL}/sparkles.svg`,
        content: [
            {
                id: "m7_m3_b1", type: "INFO",
                data: {
                    title: "O Fim dos Erros de Gramática",
                    text: "Antigamente, era fácil notar um e-mail de phishing: o português era terrível e o design era tosco. Com a IA, isso acabou. Agora, um hacker pode pedir para o ChatGPT: 'Escreva um e-mail formal em nome do Banco X, simulando um erro de fatura, usando termos técnicos brasileiros'. O resultado é um texto impecável, persuasivo e sem um único erro de digitação. A IA democratizou o golpe de alta qualidade, permitindo que criminosos do outro lado do mundo pareçam o seu gerente sentado na Faria Lima.\n\nA personalização também escalou. Em vez de 'Prezado Cliente', o e-mail agora vem com seu nome, seu cargo e talvez uma referência a um evento que sua empresa participou recentemente. A IA minera essas informações em segundos. O foco da sua defesa deve mudar: pare de procurar por erros de escrita e comece a analisar o **contexto** e o **canal**. O banco realmente pediria isso por e-mail? O link de destino é o oficial? O remetente é exatamente quem diz ser?\n\nO 'golpe perfeito' ainda tem uma falha humana: a intenção. Se o e-mail te pressiona a clicar, baixar ou pagar algo com urgência, a tecnologia por trás pode ser nova, mas o truque é velho. Use o 'mousover' (passar o mouse sem clicar) nos links para ver o endereço real. Se a URL final for um amontoado de letras e números ou um domínio estranho, não importa quão bonito seja o texto: é uma armadilha sintética feita para te caçar.",

                    deepDive: "Ataques de 'Spear Phishing' (pesca com lança) antes levavam horas para serem escritos para uma única vítima. Hoje, IAs podem gerar 10.000 e-mails únicos e altamente personalizados em minutos. Para combater isso, as empresas estão usando IAs de defesa que analisam o 'sentimento' do e-mail e bloqueiam comunicações que fogem do padrão de escrita usual do remetente real.",

                    highlightBox: "Estratégia: Desconfie de perfeição excessiva. Valide o contexto e os links, ignorando a qualidade do texto.",

                    mascotMessage: "Eles aprenderam a escrever direito, Agente. Que evolução, não? Mas a alma do golpe continua suja. Não se deixe levar por uma linguagem polida; o anzol está escondido nas entrelinhas."
                }
            },
            {
                id: "m7_m3_b2", type: "HOTSPOT",
                data: {
                    context: {
                        type: "EMAIL",
                        sender: "suporte@microsoft.cloud",
                        subject: "Ação Necessária: Sincronização de Conta Pendente",
                        body: "Prezado(a) Agente, detectamos uma tentativa de login incomum em sua conta corporativa originada de Curitiba. Para sua segurança, solicitamos que valide seu acesso no link abaixo para evitar a suspensão de seus serviços nas próximas 2 horas. Atenciosamente, Equipe de Segurança Microsoft."
                    },
                    regions: [
                        {
                            id: "r1",
                            rect: { x: 0, y: 0, w: 100, h: 20 },
                            feedback: "Ponto para você! O domínio '.cloud' não é usado pela Microsoft para alertas de segurança de conta. É um e-mail gerado por IA com aparência oficial.",
                            isCorrect: true
                        }
                    ],
                    mascotMessage: "O texto está perfeito, né? Nem um erro de vírgula. Mas e o endereço do remetente... você confiaria a chave da sua casa a esse estranho?"
                }
            }
        ]
    }
];

export const finalEpicMission = {
    title: "Missão Épica: O Protocolo Final",
    description: "O Spy está auditando seus circuitos. 10 testes. Erre e você será deletado. Acerte e torne-se um Agente.",
    xpReward: 500,
    category: "FINAL_CHALLENGE",
    order: 1, 
    estimatedTime: 15,
    iconUrl: `${ICON_BASE_URL}/swords.svg`,
    content: [
        {
            id: "f_intro", type: "INFO",
            data: {
                title: "A Hora da Verdade",
                text: "Chegamos ao fim da linha, Agente. Eu te ensinei a ver o mundo como os atacantes veem: um mar de falhas e humanos descuidados. Agora, vou submeter sua mente a um teste de estresse.\n\nSão 10 situações reais. Em cada uma, sua decisão define se a empresa sobrevive ou se os dados vão para o leilão. Segurança não é sobre saber a teoria; é sobre não hesitar quando o perigo bate à porta.",
                mascotMessage: "Vou analisar cada bit da sua resposta. Não me decepcione... eu odeio ter que formatar alunos promissores."
            }
        },
        // 01: DADOS - Correta: opt2
        {
            id: "f_q1", type: "QUIZ",
            data: {
                question: "01/10: Um criminoso obteve seu CPF e uma selfie sua com o RG. Qual o maior perigo real?",
                options: [
                    { id: "opt1", text: "Ele mudar a cor do seu perfil no Instagram." },
                    { id: "opt2", text: "Ele abrir contas em bancos digitais e solicitar empréstimos em seu nome." },
                    { id: "opt3", text: "Ele descobrir quais filmes você assistiu na Netflix." }
                ],
                correctOptionId: "opt2",
                explanation: "Identidade com biometria facial é o 'Santo Graal' para fraudes bancárias duradouras.",
                feedbackSuccess: "Correto. O roubo de identidade é o crime mais difícil de limpar.",
                feedbackError: "Sério? Instagram? Pense no prejuízo financeiro e jurídico, Agente!"
            }
        },
        // 02: MALWARE - Correta: opt3
        {
            id: "f_q2", type: "QUIZ",
            data: {
                question: "02/10: Seu PC está lento, a ventoinha grita e a webcam pisca sem você usar. Qual o diagnóstico?",
                options: [
                    { id: "opt1", text: "É apenas um erro de atualização do Windows." },
                    { id: "opt2", text: "Um Ransomware já trancou todos os seus arquivos." },
                    { id: "opt3", text: "Um Spyware ou Minerador está usando seus recursos e vigiando seus passos." }
                ],
                correctOptionId: "opt3",
                explanation: "Spywares buscam discrição, mas o alto processamento e uso da câmera entregam a presença deles.",
                feedbackSuccess: "Bingo. Alguém está pegando carona no seu hardware.",
                feedbackError: "Se fosse Ransomware, você veria um aviso de resgate. O inimigo aqui é silencioso."
            }
        },
        // 03: SENHAS - Correta: opt1
        {
            id: "f_q3", type: "QUIZ",
            data: {
                question: "03/10: Do ponto de vista de segurança contra máquinas de quebra de senha, qual é a melhor?",
                options: [
                    { id: "opt1", text: "nuvem-pipoca-azul-cadeira" },
                    { id: "opt2", text: "G@t0!24" },
                    { id: "opt3", text: "senha123" }
                ],
                correctOptionId: "opt1",
                explanation: "O comprimento (entropia) vence a complexidade curta em quase todos os cenários de ataque.",
                feedbackSuccess: "Isso! Comprimento é a sua melhor muralha.",
                feedbackError: "Símbolos em senhas curtas não param computadores modernos. Use frases longas!"
            }
        },
        // 04: MFA - Correta: opt1
        {
            id: "f_q4", type: "QUIZ",
            data: {
                question: "04/10: Qual desses métodos de Segundo Fator (MFA) deve ser EVITADO por ser vulnerável a desvios de sinal?",
                options: [
                    { id: "opt1", text: "Código enviado via SMS." },
                    { id: "opt2", text: "App Google Authenticator." },
                    { id: "opt3", text: "Chave física USB (Yubikey)." }
                ],
                correctOptionId: "opt1",
                explanation: "O sinal de telefonia pode ser sequestrado via SIM Swap. Use apps ou chaves físicas.",
                feedbackSuccess: "Perfeito. O SMS é o elo fraco da autenticação.",
                feedbackError: "Apps são seguros. O SMS é que viaja 'aberto' pelo ar esperando para ser roubado."
            }
        },
        // 05: USB - Correta: opt2
        {
            id: "f_q5", type: "QUIZ",
            data: {
                question: "05/10: Você achou um pendrive com o logo da sua empresa no estacionamento. O que você faz?",
                options: [
                    { id: "opt1", text: "Conecta no PC para ver de quem é e devolver." },
                    { id: "opt2", text: "Entrega para a equipe de TI sem conectá-lo a nenhum computador." },
                    { id: "opt3", text: "Formata o pendrive para poder usá-lo com segurança." }
                ],
                correctOptionId: "opt2",
                explanation: "Pendrives podem conter malwares que executam antes mesmo de você tentar formatar.",
                feedbackSuccess: "Correto. Curiosidade é o combustível do hacker.",
                feedbackError: "Nunca conecte! Formatar não adianta se o vírus infectar o PC no segundo em que você o espeta."
            }
        },
        // 06: WI-FI - Correta: opt3
        {
            id: "f_q6", type: "QUIZ",
            data: {
                question: "06/10: Você está no Wi-Fi do Starbucks e precisa trabalhar. Qual a sua primeira ação?",
                options: [
                    { id: "opt1", text: "Usar o modo anônimo do navegador." },
                    { id: "opt2", text: "Verificar se o site do banco tem o cadeado (HTTPS) e confiar apenas nisso." },
                    { id: "opt3", text: "Ativar sua VPN antes de qualquer outra atividade." }
                ],
                correctOptionId: "opt3",
                explanation: "A VPN cria um túnel criptografado que impede que outros usuários na mesma rede 'escutem' seu tráfego.",
                feedbackSuccess: "Excelente. VPN ligada, hacker frustrado.",
                feedbackError: "HTTPS é bom, mas a VPN esconde até *para onde* você está indo. Blindagem total!"
            }
        },
        // 07: BEC/EMAIL - Correta: opt1
        {
            id: "f_q7", type: "QUIZ",
            data: {
                question: "07/10: Um e-mail 'urgente' do seu gestor pede um PIX para um novo fornecedor. Qual a falha técnica a ser buscada?",
                options: [
                    { id: "opt1", text: "Verificar se o domínio (ex: @empresa.com) está escrito corretamente, sem letras trocadas." },
                    { id: "opt2", text: "Verificar se ele assinou com o cargo correto." },
                    { id: "opt3", text: "Verificar se o valor do PIX é alto demais." }
                ],
                correctOptionId: "opt1",
                explanation: "Hackers usam domínios parecidos (typosquatting) para enganar sua percepção visual rápida.",
                feedbackSuccess: "Isso. Detalhes salvam orçamentos.",
                feedbackError: "O valor não importa; o que importa é se o remetente é um impostor usando um e-mail falso."
            }
        },
        // 08: IA - Correta: opt2
        {
            id: "f_q8", type: "QUIZ",
            data: {
                question: "08/10: Ao usar o ChatGPT para analisar um documento da empresa, qual a regra de ouro?",
                options: [
                    { id: "opt1", text: "Pode usar à vontade, pois a IA é privada por contrato." },
                    { id: "opt2", text: "Remover nomes de clientes, valores e segredos (Sanitizar) antes de colar." },
                    { id: "opt3", text: "Usar apenas a versão gratuita, que não guarda histórico." }
                ],
                correctOptionId: "opt2",
                explanation: "Tudo o que entra em modelos públicos de IA pode ser usado para treinamento e vazar futuramente.",
                feedbackSuccess: "Correto. Trate a IA como uma praça pública.",
                feedbackError: "A IA lembra de tudo. Se você colar o segredo da empresa, ele não é mais segredo."
            }
        },
        // 09: LGPD - Correta: opt1
        {
            id: "f_q9", type: "QUIZ",
            data: {
                question: "09/10: Você vai enviar um e-mail para 50 clientes. Como evitar um vazamento de dados (LGPD)?",
                options: [
                    { id: "opt1", text: "Colocar todos os destinatários no campo 'Cco' (Cópia Oculta)." },
                    { id: "opt2", text: "Colocar todos no campo 'Para', pois são clientes da mesma empresa." },
                    { id: "opt3", text: "Mandar um e-mail de cada vez, manualmente." }
                ],
                correctOptionId: "opt1",
                explanation: "O Cco impede que um cliente veja o e-mail do outro, respeitando a privacidade e a lei.",
                feedbackSuccess: "Boa! Privacidade garantida com um clique.",
                feedbackError: "No campo 'Para', todos veem o e-mail de todos. Isso é vazamento de lista de contatos!"
            }
        },
        // 10: RANSOMWARE - Correta: opt3
        {
            id: "f_q10", type: "QUIZ",
            data: {
                question: "10/10: Arquivos mudando de nome para '.locked' AGORA. Qual sua ÚNICA prioridade?",
                options: [
                    { id: "opt1", text: "Ligar para o hacker e tentar negociar um desconto." },
                    { id: "opt2", text: "Reiniciar o servidor para interromper o processo." },
                    { id: "opt3", text: "Isolar o computador da rede (tirar cabo/Wi-Fi) imediatamente." }
                ],
                correctOptionId: "opt3",
                explanation: "O isolamento impede que o Ransomware se espalhe para o restante da empresa e para o servidor de backup.",
                feedbackSuccess: "VOCÊ SALVOU O DIA! Auditoria concluída com sucesso.",
                feedbackError: "Reiniciar pode até piorar. O segredo é o isolamento físico. Rápido!"
            }
        }
    ]
};
