// Game data
const gameData = {
    currentType: null,
    currentDifficulty: null,
    questions: {
        soft: {
            truth: [
                // Light and Fun
                "Se você pudesse se transformar em um animal, qual seria?",
                "Qual foi sua fantasia mais estranha na infância?",
                "Qual é o seu emoji favorito?",
                "Se você fosse invisível por um dia, o que faria?",
                "Qual é a sua frase favorita de filme?",
                "Qual é a coisa mais entediante que você já fez?",
                "Qual é a sua lembrança favorita da infância?",
                "De que você tem mais orgulho?",
                "Qual é o seu maior medo?",
                "Qual é o seu personagem de desenho favorito?",
                "Que habilidade você gostaria de aprender?",
                "Qual é a sua estação do ano favorita?",
                "Qual é a sua hora do dia favorita?",
                "Que animal de estimação você gostaria de ter?",
                "Qual é o seu clima favorito?",
                "Que parque temático você mais gostaria de visitar?",
                "Qual é o seu lanche favorito?",
                "Que trabalho você gostaria de experimentar por um dia?",
                "Qual é o seu cheiro favorito?",
                "Em que tipo de casa você gostaria de morar?",

                // Creative Imagination
                "Se você pudesse ter qualquer superpoder, qual seria?",
                "Se você pudesse viajar no tempo, o que mudaria?",
                "Se você pudesse ser uma celebridade por um dia, quem escolheria?",
                "Quem é o seu personagem fictício favorito?",
                "Se você pudesse inventar uma nova comida, qual seria?",
                "Qual é o seu feriado favorito e por quê?",
                "Se você pudesse viver em qualquer filme ou série de TV, qual seria?",
                "Qual é o seu destino de viagem dos sonhos?",
                "Se você pudesse mudar uma coisa no mundo, o que seria?",
                "Qual é o seu jogo favorito da infância?",
                "Se você pudesse criar um novo feriado, qual seria?",
                "Se você pudesse conversar com qualquer figura histórica, quem escolheria?",
                "Se você pudesse ter qualquer item mágico, qual seria?",
                "Se você pudesse ser o personagem principal de qualquer livro, qual escolheria?",
                "Se você pudesse construir uma casa dos sonhos, como ela seria?",
                "Se você pudesse fazer um filme, qual seria o gênero?",
                "Se você pudesse abrir qualquer tipo de loja, qual seria?",
                "Se você pudesse criar um jogo, que tipo seria?",
                "Se você pudesse ter um assistente robô, o que gostaria que ele fizesse?",
                "Se você pudesse criar um novo esporte, qual seria?",

                // Daily Preferences
                "Qual é a sua comida favorita?",
                "Qual é a sua bebida favorita?",
                "Qual é a sua cor favorita?",
                "Qual é o seu gênero musical favorito?",
                "Qual é o seu esporte favorito?",
                "Qual é o seu livro favorito?",
                "Qual é o seu filme favorito?",
                "Qual é a sua série de TV favorita?",
                "Qual é o seu jogo favorito?",
                "Qual é a sua plataforma de rede social favorita?",
                "Qual é a sua fruta favorita?",
                "Qual é o seu vegetal favorito?",
                "Qual é a sua bebida preferida?",
                "Qual é a sua sobremesa favorita?",
                "Qual é o seu café da manhã favorito?",
                "Qual é o seu jantar favorito?",
                "Qual é a sua comida rápida favorita?",
                "Qual é o seu sabor de sorvete favorito?",
                "Que tipo de café você gosta?",
                "Qual é o seu chá favorito?",

                // Friendly Personal Questions
                "O que você mais gosta em você mesmo?",
                "Que desejo você quer que se realize?",
                "A quem você é mais grato?",
                "Qual foi a coisa mais feliz que aconteceu com você?",
                "Qual foi a coisa mais surpreendente que aconteceu com você?",
                "Que instrumento você gostaria de aprender?",
                "Que idioma você gostaria de dominar?",
                "Que país você gostaria de visitar?",
                "Quem você mais gostaria de conhecer?",
                "Qual é a sua posse mais preciosa?",
                "Qual foi o seu aniversário mais memorável?",
                "Quem foi o seu professor favorito?",
                "O que torna o seu melhor amigo especial?",
                "Que memória você gostaria de reviver?",
                "Que hábito você gostaria de melhorar?",

                // Hobbies and Interests
                "Qual é a sua atividade ao ar livre favorita?",
                "Qual é a sua atividade interna favorita?",
                "O que você gosta de colecionar?",
                "Que novo hobby você gostaria de experimentar?",
                "Qual é a sua forma de arte favorita?",
                "Que dança você gostaria de aprender?",
                "Qual é o seu projeto de artesanato favorito?",
                "Que evento você gostaria de participar?",
                "Que tipo de leitura você gosta?",
                "Que tecnologia você gostaria de dominar?",

                // Dreams and Goals
                "Que tipo de pessoa você quer ser daqui a 10 anos?",
                "Que desafio você gostaria de completar?",
                "Que grupo de pessoas você gostaria de ajudar?",
                "Que questão social você gostaria de resolver?",
                "Que legado você gostaria de deixar?",
                "Como você quer ser lembrado?",
                "Que impacto você gostaria de causar?",
                "O que você gostaria de criar?",
                "Que problema mundial você gostaria de mudar?",
                "Que valor social você gostaria de promover?",

                // Life Philosophy
                "Qual você acha que é a qualidade mais importante?",
                "Em que lema de vida você acredita?",
                "O que você acha que é o verdadeiro sucesso?",
                "Qual você acha que é a maior felicidade?",
                "O que é mais importante na amizade?",
                "Qual você acha que é o melhor presente?",
                "Quando você se sente mais realizado?",
                "Qual você acha que é a melhor maneira de aprender?",
                "Qual é a habilidade de vida mais importante?",
                "O que torna a vida significativa?",

                // Fun Hypotheticals
                "Se você tivesse dinheiro ilimitado, o que faria?",
                "Se você pudesse ler mentes, para que usaria isso?",
                "Se você pudesse voar, para onde iria primeiro?",
                "Se você pudesse parar o tempo, o que faria?",
                "Se você pudesse ser invisível, onde iria?",
                "Se você pudesse falar com animais, qual animal escolheria?",
                "Se você pudesse se teletransportar, para onde iria?",
                "Se você pudesse ver o futuro, o que gostaria de saber?",
                "Se você pudesse trazer de volta uma figura histórica, quem escolheria?",
                "Se você pudesse eliminar uma coisa do mundo, o que seria?"
            ],
            dare: [
                // Light Comedy
                "Ande como um pinguim",
                "Fale com uma voz estranha até a próxima rodada",
                "Imite uma celebridade até a próxima rodada",
                "Use meias como luvas por 5 minutos",
                "Tente lamber seu nariz (ou cotovelo)",
                "Diga 'Eu sou tão bonito(a)' para o espelho 10 vezes",
                "Fale com sotaque estrangeiro falso por 5 minutos",
                "Aja como um gato - movimentos e sons",
                "Aja como um cachorro - movimentos e sons",
                "Finja ser um robô ao falar",
                "Escreva letras com o bumbum",
                "Desenhe um autorretrato de olhos fechados",
                "Escreva seu nome com os dedos dos pés segurando uma caneta",
                "Imite um bebê chorando por 30 segundos",
                "Finja estar nadando",
                "Ande como um idoso",
                "Pule como um sapo 10 vezes",
                "Faça uma pose de super-herói",
                "Finja dirigir um carro",
                "Imite um som de espirro",

                // Skill Demonstrations
                "Faça 10 flexões",
                "Fique em um pé só por 1 minuto",
                "Faça uma dança",
                "Cante uma música completa",
                "Diga um trava-língua",
                "Conte uma piada",
                "Faça uma pequena peça",
                "Desenhe um autorretrato",
                "Faça 5 abdominais",
                "Diga uma frase completa de trás para frente",
                "Cante 'Parabéns a Você' em inglês",
                "Imite um comercial",
                "Faça um truque de mágica",
                "Faça uma pose de yoga",
                "Bata palmas com uma mão 10 vezes",
                "Ande em linha reta de olhos fechados por 10 passos",
                "Ande equilibrando um livro na cabeça",
                "Gire no lugar 10 vezes",
                "Pule corda (finja que tem uma corda) 50 vezes",
                "Faça uma cara engraçada",

                // Friendly Interactions
                "Dê um abraço em alguém",
                "Dê um pequeno presente a alguém",
                "Dê uma surpresa a alguém",
                "Faça um elogio sincero a alguém",
                "Elogie todos os presentes",
                "Dê uma massagem nos ombros de alguém",
                "Dê um toque aqui para alguém 10 vezes",
                "Dê um toque aqui para alguém",
                "Dance com alguém",
                "Deixe alguém pentear seu cabelo",
                "Cante com alguém",
                "Mande um beijo para alguém",
                "Jogue pedra-papel-tesoura com alguém",
                "Conte uma história para alguém",
                "Faça exercícios com alguém",
                "Cumprimente alguém",
                "Tire uma foto com alguém",
                "Dê uma bênção a alguém",
                "Compartilhe lanches com alguém",
                "Dê um sorriso a alguém",

                // Mild Social Media
                "Poste uma mensagem de agradecimento aos amigos",
                "Poste uma selfie engraçada",
                "Poste uma citação inspiradora",
                "Poste 'Que dia lindo!'",
                "Curta as últimas 10 postagens de um amigo",
                "Poste uma foto de comida",
                "Compartilhe sua música favorita",
                "Poste bom dia/boa noite",
                "Poste uma foto de paisagem",
                "Compartilhe uma citação positiva",
                "Poste sobre animais de estimação",
                "Compartilhe um vídeo interessante",
                "Poste sobre exercício",
                "Recomende um bom livro",
                "Poste sobre experiências com comida",
                "Compartilhe uma lembrança de viagem",
                "Poste sobre experiências de aprendizado",
                "Compartilhe uma história comovente",
                "Poste sobre família",
                "Compartilhe uma imagem inspiradora",

                // Creative Expression
                "Use seu corpo para soletrar uma palavra para os outros adivinharem",
                "Jogue mímica por 1 minuto sem falar",
                "Faça sons de animais",
                "Faça uma mímica",
                "Leia uma passagem com vozes diferentes",
                "Invente uma história na hora",
                "Imite um personagem animado",
                "Imite fala de bebê",
                "Expresse emoções como emojis",
                "Imite pessoas de diferentes profissões falando",
                "Encene um conto de fadas",
                "Use sombras de mão para mostrar um animal",
                "Imite pessoas de diferentes idades",
                "Encene uma cena de filme",
                "Use sua voz para imitar instrumentos",
                "Encene mudanças climáticas",
                "Imite diferentes veículos",
                "Use seu corpo para mostrar o tempo",
                "Expresse diferentes emoções",
                "Imite citações famosas de celebridades",

                // Art Creation
                "Desenhe uma imagem simples",
                "Dobre um avião de papel",
                "Faça um pequeno animal com massinha",
                "Escreva um pequeno poema",
                "Desenhe um distintivo",
                "Crie um movimento de dança simples",
                "Desenhe uma história em quadrinhos simples",
                "Faça um artesanato simples",
                "Desenhe um novo emoji",
                "Crie uma nova palavra",
                "Escreva letras simples de música",
                "Desenhe uma regra de jogo",
                "Desenhe um cartão de felicitações",
                "Faça um chapéu de papel",
                "Crie uma dança de mãos",
                "Desenhe um slogan",
                "Desenhe um mapa mental",
                "Faça uma colagem simples",
                "Crie um cântico",
                "Desenhe um logotipo simples"
            ]
        },
        spicy: {
            truth: [
                // Personal Deep Privacy
                "Quando foi a última vez que você mentiu? Para quem?",
                "Você já gostou secretamente de alguém aqui?",
                "Qual é o seu momento mais embaraçoso?",
                "O que te fez chorar mais forte?",
                "Quem você teve uma paixão? Vocês ainda conversam?",
                "Qual é a sua experiência romântica mais memorável?",
                "Como seria o seu encontro ideal?",
                "Qual é a coisa mais louca que você já fez por amor?",
                "O que você menos gosta em você mesmo?",
                "Quando você se sentiu mais culpado?",
                "Qual é um hábito que você tem que os outros não sabem?",
                "Qual é o seu maior arrependimento?",
                "Qual é a coisa mais impulsiva que você já fez?",
                "O que você mais gostaria de dizer a alguém?",
                "O que você não quer que os outros saibam?",
                "Qual é a coisa mais infantil que você já fez?",
                "Que memória você mais quer esquecer?",
                "Qual é a sua maior preocupação sobre o futuro?",
                "O que você fez secretamente que não quer que seja descoberto?",
                "Qual é a coisa mais embaraçosa que você já fez?",

                // Romance and Relationships (Edgy but Safe)
                "Como foi o seu primeiro beijo?",
                "Você já esteve em um relacionamento complicado?",
                "Você já traiu ou pensou em trair?",
                "Qual foi o pior término que você experimentou?",
                "Qual é a coisa mais dura que você disse durante um término?",
                "Quantos namorados/namoradas você já teve?",
                "Quem você mais gostaria de namorar?",
                "Qual é a maior mentira que você contou em um relacionamento?",
                "Você já teve um relacionamento ambíguo?",
                "Você namoraria alguém que não gosta por dinheiro?",
                "Você já olhou o celular de alguém?",
                "Você já teve um relacionamento online?",
                "Você namoraria o ex de um amigo?",
                "Com qual ex você mais gostaria de voltar?",
                "Qual foi o sonho mais selvagem que você teve sobre alguém?",
                "Você já foi atraído por alguém do mesmo sexo?",
                "Qual celebridade você mais gostaria de ficar?",
                "Você aceitaria um relacionamento aberto?",
                "Você já teve sentimentos por um professor ou figura de autoridade?",
                "Qual é a sua maior fantasia romântica?",

                // Sharp Interpersonal Relations
                "Por que você já ficou bravo com um amigo?",
                "Por que você já ficou bravo com a família?",
                "Que traço você mais odeia em alguém aqui?",
                "O que você disse pelas costas de alguém aqui?",
                "O que você inveja em alguém aqui?",
                "Quem aqui você acha mais falso?",
                "Quem aqui você acha mais narcisista?",
                "Quem você mais gostaria de dar um tapa?",
                "Quem você acha que menos merece a vida atual?",
                "Que tipo de pessoa você mais despreza?",
                "Quem é a pessoa mais inocente que você já machucou?",
                "De quem você mais quer se vingar?",
                "Qual é a coisa mais cruel que você já disse?",
                "Qual é a pior coisa que você já fez?",
                "De quem você mais quer revelar o segredo?",
                "Quem você acha que vive a vida mais fracassada?",
                "O que você mais quer conseguir de alguém?",
                "Quem você mais quer ver falhar?",
                "Quem aqui você acha mais desonesto?",
                "Com quem você mais quer cortar laços?",

                // Moral Boundaries (Safe Version)
                "Qual é a maior mentira que você já contou?",
                "Que fato importante você escondeu?",
                "Você enganou alguém que mais te ama?",
                "Você traiu alguém que mais confiava em você?",
                "Você já se aproveitou da fraqueza de alguém?",
                "Você já machucou um amigo para ganho pessoal?",
                "Você já espalhou informações falsas?",
                "Você já ignorou deliberadamente alguém que precisava de ajuda?",
                "Você já sacrificou outros em seu benefício?",
                "Você já continuou fazendo algo que sabia estar errado?",
                "Você já violou seus próprios princípios?",
                "Você já fez algo contra sua consciência por aparências?",
                "Você já teve ciúmes do sucesso de alguém?",
                "Você já teve prazer na desgraça de alguém?",
                "Você já chutou alguém quando estava por baixo?",
                "Você já caluniou alguém maliciosamente?",
                "Você já deu gelo em alguém deliberadamente?",
                "O que você fez por vingança?",
                "Quando você foi mais egoísta?",
                "Quando você foi mais hipócrita?",

                // Inner Challenge
                "Qual é o seu pensamento mais sombrio?",
                "O que você mais quer fazer mas não se atreve?",
                "Qual é o seu segredo mais vergonhoso?",
                "Que passado você mais quer encobrir?",
                "Que fraqueza você menos quer que as pessoas saibam?",
                "Que responsabilidade você mais quer evitar?",
                "Que mentira você tem mais medo de ser exposta?",
                "O que você mais quer mas não pode ter?",
                "O que você mais quer se tornar mas acha impossível?",
                "O que você mais quer esquecer mas não consegue?",
                "O que você mais quer perdoar mas não consegue?",
                "O que você mais quer recuperar mas não consegue?",
                "O que você mais quer mudar mas não consegue?",
                "Do que você mais quer escapar mas não consegue?",
                "Qual você acha que é o seu maior fracasso?",
                "Do que você mais se arrepende de não fazer?",
                "Do que você tem mais medo de perder?",
                "Que realidade você mais teme enfrentar?",
                "O que você mais quer provar aos outros?",
                "Qual é a sua maior motivação para viver?",

                // Money and Values
                "Do que você mais se arrepende de ter feito por dinheiro?",
                "Quando você foi mais ganancioso?",
                "Que princípios você abandonaria por dinheiro?",
                "O que você mais quer mas não pode pagar?",
                "Qual foi a maior oportunidade que você perdeu por falta de dinheiro?",
                "Quanto dinheiro faria você trair um amigo?",
                "Qual foi a coisa mais mesquinha que você fez para economizar dinheiro?",
                "Quando você teve mais inveja da riqueza de alguém?",
                "Você já brigou com a família por dinheiro?",
                "De quem você mais quer pedir dinheiro emprestado mas não se atreve?",

                // Value Challenge
                "Que comportamento você acha mais intolerável?",
                "Que opinião dos outros é mais difícil para você aceitar?",
                "Que fenômeno social você mais quer mudar?",
                "Que tipo de pessoa você acha mais hipócrita?",
                "Que comportamento de dois pesos e duas medidas você acha mais nojento?",
                "Que conceito tradicional você acha que deveria ser quebrado?",
                "Que opinião predominante você mais quer refutar?",
                "Que regra você acha mais irracional?",
                "Que autoridade você mais quer questionar?",
                "Que preconceito social você mais quer mudar?"
            ],
            dare: [
                // Extremely Awkward Performance
                "Escreva seu nome com o bumbum",
                "Desenhe um padrão no seu rosto com batom",
                "Aja como se estivesse bêbado",
                "Aja com raiva",
                "Lamba seu nariz com a língua",
                "Tire suas meias e deixe os outros cheirarem",
                "Encene a dor do parto",
                "Vista roupas do sexo oposto e tire uma foto",
                "Deixe os outros escreverem no seu corpo",
                "Deixe os outros te alimentarem de olhos fechados",
                "Deixe os outros fazerem sua maquiagem",
                "Encene sua experiência mais embaraçosa",
                "Imite a pessoa que você mais odeia",
                "Tire uma selfie exagerada",
                "Encene o que você mais teme",
                "Imite um bebê chorando",
                "Sente em um balão até estourar com o bumbum",
                "Encene o nervosismo do seu primeiro encontro",
                "Imite como você fica quando está bêbado",
                "Encene sua reação quando fica assustado",

                // Extreme Social Challenges
                "Mande mensagem para seu ex dizendo 'Estou com saudades'",
                "Cante alto em público",
                "Abrace um estranho",
                "Poste uma foto feia sua nas redes sociais",
                "Ligue para uma pessoa aleatória nos seus contatos fingindo ser vendedor",
                "Dance em público",
                "Poste 'Estou apaixonado(a)' nas redes sociais",
                "Ligue para uma pessoa aleatória fingindo ser um robô",
                "Grite 'Eu amo todos vocês!' em público",
                "Ligue para uma pessoa aleatória fingindo ser um alienígena",
                "Declare-se para um estranho na rua",
                "Admita publicamente sua experiência mais constrangedora",
                "Diga em voz alta qual celebridade você mais quer conhecer",
                "Ligue para a pessoa que você mais odeia e peça desculpas",
                "Conte em voz alta seu segredo mais vergonhoso",
                "Mostre aos outros a foto mais engraçada do seu celular",
                "Imite publicamente a pessoa que você mais odeia",
                "Admita em voz alta um dos seus defeitos",
                "Expresse publicamente sua opinião real sobre alguém",
                "Peça desculpas publicamente por algo que fez de errado",
                "Diga em voz alta seu maior arrependimento",

                // Intimate Interaction (Moderate Version)
                "Beije alguém na bochecha",
                "Dê uma massagem nos ombros de alguém",
                "Abrace alguém por 30 segundos",
                "Sente no colo de alguém",
                "Deixe alguém pentear seu cabelo",
                "Segure as mãos de alguém e gire",
                "Dê um abraço longo em alguém",
                "Tire uma foto bochecha com bochecha com alguém",
                "Deixe alguém desenhar no seu braço",
                "Dance com alguém",
                "Mande um beijo para alguém",
                "Olhe nos olhos de alguém por 30 segundos sem rir",
                "Deixe alguém te alimentar com frutas",
                "Cante uma música de amor com alguém",
                "Dê uma massagem nas mãos de alguém",
                "Encene uma cena de filme romântico com alguém",
                "Deixe alguém fazer trança no seu cabelo",
                "Faça um formato de coração com alguém",
                "Dê um abraço suave em alguém",
                "Tire uma foto de casal amoroso com alguém",

                // Skill Challenges
                "Fique de ponta-cabeça por 10 segundos",
                "Faça um truque de mágica",
                "Desafie seu medo (de coisas seguras)",
                "Experimente combinações estranhas mas seguras de comida",
                "Aprenda um novo movimento de dança",
                "Escreva com sua mão não dominante",
                "Ande em linha reta de olhos fechados",
                "Faça uma flexão com uma mão",
                "Recite um poema completo",
                "Faça um drama improvisado",
                "Use seu corpo para soletrar letras",
                "Imite 5 animais diferentes",
                "Fale de trás para frente por 5 minutos",
                "Desenhe com os pés",
                "Aprenda um truque de mágica simples",
                "Imite 5 profissões diferentes",
                "Escreva com uma caneta na boca",
                "Faça 10 expressões faciais diferentes",
                "Aprenda um trava-língua estrangeiro",
                "Faça uma cena de filme mudo",

                // Self-Challenge
                "Envie uma mensagem para a celebridade que você admira",
                "Inicie uma corrente de emojis em um chat de grupo",
                "Admita publicamente seu maior fracasso",
                "Compartilhe sua memória mais constrangedora da infância",
                "Admita seu comportamento mais infantil",
                "Revele um hábito que os outros não conhecem",
                "Compartilhe sua história embaraçosa mais engraçada",
                "Admita sua decisão mais lamentável",
                "Diga o que você é mais inseguro",
                "Compartilhe seu mal-entendido mais bobo",
                "Admita seu momento mais ignorante",
                "Diga do que você tem mais medo",
                "Compartilhe seu sonho mais estranho",
                "Admita quando você foi mais preguiçoso",
                "Diga seu momento mais ganancioso",
                "Compartilhe sua compra mais impulsiva",
                "Admita quando você foi mais crédulo",
                "Diga seu comportamento mais supersticioso",
                "Compartilhe seu pensamento mais bizarro",
                "Admita quando você foi mais mesquinho",

                // Social Challenges
                "Mande mensagem para sua paixão",
                "Conte ao grupo um dos seus defeitos",
                "Admita um erro que você cometeu",
                "Declare em voz alta um dos seus desejos",
                "Compartilhe uma das suas histórias embaraçosas",
                "Expresse ousadamente uma opinião",
                "Diga um hábito que você mais quer mudar",
                "Peça desculpas a todos por algo que fez de errado",
                "Mande mensagem para o amigo que você não contata há mais tempo",
                "Poste uma confissão nas redes sociais (pode ser brincadeira)",
                "Elogie publicamente alguém que você normalmente não elogiaria",
                "Peça desculpas a alguém que você entendeu mal",
                "Admita publicamente um dos seus preconceitos",
                "Compartilhe um sonho que você quer realizar mas tem medo de dizer",
                "Expresse gratidão a alguém",
                "Compartilhe publicamente sua opinião real sobre algo",
                "Admita quem você mais inveja",
                "Compartilhe qual habilidade você mais quer aprender",
                "Elogie publicamente alguém que você normalmente critica",
                "Mostre respeito ao seu competidor",

                // Creative Challenges
                "Imite alguém aqui em seus movimentos e fala",
                "Admita sua primeira impressão de alguém",
                "Encene sua memória mais constrangedora",
                "Mostre aos outros a foto mais engraçada do seu celular",
                "Ligue para seus pais e conte algo que nunca contou",
                "Desafie-se a fazer algo que normalmente não se atreveria (com segurança)",
                "Experimente um novo estilo pessoal",
                "Aprenda uma habilidade que você acha difícil",
                "Expresse admiração por alguém que você admira",
                "Complete uma tarefa que você estava procrastinando",
                "Experimente comida que você não gosta",
                "Aprenda uma forma de arte em que você não é bom",
                "Desafie sua zona de conforto (dentro de limites seguros)",
                "Faça algo bom para o meio ambiente",
                "Ajude alguém que você normalmente não ajudaria",
                "Aprenda a expressar sentimentos que você normalmente não diz",
                "Experimente um estilo de vida completamente novo",
                "Complete um objetivo que você achava impossível",
                "Desenvolva um novo hábito positivo",
                "Faça algo para tornar o mundo um lugar melhor"
            ]
        }
    }
};

// DOM elements
const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const selectedType = document.getElementById('selectedType');
const selectedDifficulty = document.getElementById('selectedDifficulty');
const difficultyButtons = document.getElementById('difficultyButtons');
const choiceButtons = document.getElementById('choiceButtons');

// Select difficulty
function selectDifficulty(difficulty) {
    gameData.currentDifficulty = difficulty;

    // Show selected difficulty
    if (difficulty === 'soft') {
        selectedDifficulty.innerHTML = '<span class="badge bg-success">Modo Suave</span>';
        questionText.textContent = '👇 Escolha Sua Opção! Conteúdo adequado para toda a família 👇';
    } else {
        selectedDifficulty.innerHTML = '<span class="badge bg-warning">Modo Picante</span>';
        questionText.textContent = '👇 Escolha Sua Opção! Conteúdo mais desafiador para adultos 👇';
    }
    selectedDifficulty.style.display = 'block';

    // Hide difficulty buttons, show truth/dare buttons
    difficultyButtons.style.display = 'none';
    choiceButtons.style.display = 'flex';

    // Show back button
    backButton.style.display = 'inline-block';
}

// Select truth or dare
function selectChoice(type) {
    gameData.currentType = type;

    // Get random question
    const questions = gameData.questions[gameData.currentDifficulty][type];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    // Display question
    questionText.textContent = randomQuestion;

    // Show selected type
    if (type === 'truth') {
        selectedType.innerHTML = '<span class="badge bg-info">Verdade</span>';
    } else {
        selectedType.innerHTML = '<span class="badge bg-danger">Desafio</span>';
    }
    selectedType.style.display = 'block';

    // Show control buttons
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';

    // Hide choice buttons
    choiceButtons.style.display = 'none';
}

// Next question
function nextQuestion() {
    if (gameData.currentType && gameData.currentDifficulty) {
        const questions = gameData.questions[gameData.currentDifficulty][gameData.currentType];
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion;
    }
}

// Back to difficulty selection
function backToDifficulty() {
    gameData.currentType = null;
    questionText.textContent = '👇 Escolha o Modo de Jogo! 👇';
    selectedType.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}

// Reset game
function resetGame() {
    gameData.currentType = null;
    gameData.currentDifficulty = null;
    questionText.textContent = '👇 Escolha o Modo de Jogo! 👇';
    selectedType.style.display = 'none';
    selectedDifficulty.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    backButton.style.display = 'none';
    choiceButtons.style.display = 'none';
    difficultyButtons.style.display = 'flex';
}
