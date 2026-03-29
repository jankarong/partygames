// Game words - 1000+ Portuguese words
const WORDS = [
    // Animais (80)
    "Leão", "Tigre", "Elefante", "Girafa", "Zebra", "Macaco", "Pinguim", "Águia", "Golfinho", "Tubarão",
    "Cachorro", "Gato", "Urso", "Coelho", "Raposa", "Coruja", "Papagaio", "Cobra", "Baleia", "Borboleta",
    "Formiga", "Abelha", "Aranha", "Sapo", "Peixe", "Tartaruga", "Crocodilo", "Porco", "Vaca", "Cavalo",
    "Galinha", "Pato", "Cisne", "Pavão", "Flamingo", "Gaivota", "Falcão", "Pomba", "Corvo", "Coruja",
    "Pardal", "Melro", "Pássaro", "Beija-flor", "Pica-pau", "Corvo", "Coruja", "Jacaré", "Lagarto", "Iguana",
    "Píton", "Cobra", "Tartaruga", "Salamandra", "Sapo", "Salmão", "Truta", "Atum", "Peixe-dourado", "Cavalo-marinho",
    "Polvo", "Lula", "Água-viva", "Estrela-do-mar", "Caranguejo", "Lagosta", "Camarão", "Leopardo", "Jaguar", "Puma",
    "Puma", "Hiena", "Lobo", "Coiote", "Chacal", "Texugo", "Lontra", "Castor", "Esquilo", "Esquilo-listrado",
    "Hamster", "Rato", "Rato", "Ouriço", "Porco-espinho", "Gambá", "Guaxinim", "Canguru", "Coala", "Panda",

    // Pessoas famosas (50)
    "Pelé", "Ronaldo Fenômeno", "Ronaldinho", "Ronaldinho Gaúcho", "Neymar", "Vinicius Jr", "Casemiro", "Richarlison",
    "Nair", "Kaká", "Bebeto", "Cafu", "Roberto Carlos", "Gilberto Silva", "Edu", "Fernando Luís", "Geovanni", "Julio Baptista",
    "Dirce do Brasil", "Ayrton Senna", "Emerson Fittipaldi", "Niki Lauda", "Michael Schumacher", "Felipe Massa", "Pedro Rodríguez",
    "Maradona", "Pelé", "Gisele Bündchen", "Marta Silva", "Marta Vieira da Silva", "Heloísa Helena", "Maria Gadú", "Arnaldo Antunes",
    "Legião Urbana", "Os Paralamas do Sucesso", "CPM 22", "Gilberto Gil", "Tom Jobim", "João Gilberto", "Stan Lee", "Bob Marley",
    "The Beatles", "Pink Floyd", "Led Zeppelin", "Queen", "David Bowie", "Rolling Stones", "Janis Joplin",

    // Objetos (100)
    "Bicicleta", "Telefone", "Televisão", "Computador", "Xícara de café", "Cama", "Porta", "Janela", "Cadeira", "Mesa",
    "Lâmpada", "Relógio", "Livro", "Caneta", "Chapéu", "Sapato", "Colher", "Faca", "Prato", "Relógio",
    "Carro", "Ônibus", "Trem", "Avião", "Barco", "Casa", "Edifício", "Castelo", "Torre", "Ponte",
    "Sofá", "Sofá", "Escrivaninha", "Armário", "Prateleira", "Geladeira", "Forno", "Micro-ondas", "Máquina de lavar", "Telefone",
    "Tablet", "Laptop", "Monitor", "Teclado", "Mouse", "Fones de ouvido", "Alto-falante", "Câmera", "Espelho", "Quadro",
    "Pintura", "Vaso", "Panela", "Frigideira", "Chaleira", "Liquidificador", "Torradeira", "Banheiro", "Banheira", "Chuveiro",
    "Bolsa", "Mochila", "Carteira", "Bolsa", "Cinto", "Lenço", "Luva", "Meia", "Camisa", "Calça",
    "Vestido", "Jaqueta", "Casaco", "Suéter", "Camiseta", "Jeans", "Shorts", "Botas", "Sandálias", "Chinelos",
    "Colar", "Anel", "Pulseira", "Brincos", "Óculos", "Óculos de sol", "Bicicleta", "Moto", "Skate", "Patinete",
    "Bola", "Bola de futebol", "Bola de basquete", "Bola de futebol", "Bola de tênis", "Bola de golfe", "Bola de boliche", "Frisbee", "Bumerangue", "Pipa",

    // Profissões (60)
    "Médico", "Professor", "Chef", "Policial", "Bombeiro", "Piloto", "Enfermeiro", "Astronauta", "Artista", "Músico",
    "Advogado", "Juiz", "Contador", "Engenheiro", "Arquiteto", "Eletricista", "Encanador", "Carpinteiro", "Mecânico", "Fazendeiro",
    "Cientista", "Matemático", "Cirurgião", "Dentista", "Veterinário", "Fotógrafo", "Cinegrafista", "Ator", "Cantor", "Dançarino",
    "Comediante", "Diretor", "Produtor", "Jornalista", "Repórter", "Editor", "Escritor", "Novelista", "Poeta", "Pintor",
    "Escultor", "Músico", "Compositor", "Maestro", "DJ", "Treinador", "Instrutor", "Atleta", "Árbitro", "Árbitro",
    "Chef", "Cozinheiro", "Padeiro", "Barman", "Garçom", "Garçonete", "Anfitrião", "Segurança", "Zelador", "Jardineiro",
    "Florista", "Cabeleireiro", "Maquiador", "Estilista", "Decorador", "Arquiteto", "Prefeito", "Governador", "Presidente", "Empresário",

    // Atividades (80)
    "Nadar", "Correr", "Dançar", "Cantar", "Cozinhar", "Ler", "Desenhar", "Escrever", "Dormir", "Esquiar",
    "Caminhada", "Escalada", "Pular", "Andar", "Jogging", "Alongar", "Exercitar", "Levantamento de peso", "Boxe", "Yoga",
    "Meditação", "Respiração", "Pensar", "Sonhar", "Rir", "Chorar", "Sorrir", "Fazer careta", "Falar", "Ouvir",
    "Sussurrar", "Gritar", "Gritar", "Assobiar", "Cantarolar", "Tocar guitarra", "Tocar piano", "Tocar bateria", "Pintura", "Escultura",
    "Esboço", "Cozinha", "Cozimento", "Churrascaria", "Frituras", "Fervura", "Limpeza", "Lavar", "Secar", "Passar",
    "Dobra", "Trabalho", "Estudo", "Aprendizagem", "Ensino", "Compras", "Compra", "Venda", "Viagem", "Exploração",
    "Comer", "Beber", "Lançar", "Pegar", "Pontapé", "Empurrar", "Puxar", "Dirigir", "Voar", "Surfe",
    "Construção", "Criação", "Fabricação", "Reparo", "Conserto", "Abertura", "Fechamento", "Sentado", "De pé", "Deitado",

    // Esportes (70)
    "Futebol", "Basquete", "Tênis", "Futebol", "Beisebol", "Hóquei", "Golfe", "Boliche", "Boxe", "Surfe",
    "Natação", "Mergulho", "Pólo aquático", "Remo", "Caiaque", "Ciclismo", "Mountain bike", "Esqui", "Snowboard", "Patinação no gelo",
    "Badminton", "Ping-pong", "Squash", "Handebol", "Lacrosse", "Críquete", "Softball", "Futebol americano", "Rúgbi", "Voleibol",
    "Voleibol de praia", "Netball", "Dodgeball", "Atletismo", "Corrida de velocidade", "Corrida de longa distância", "Salto em altura", "Salto em comprimento", "Salto com vara", "Arremesso de peso",
    "Ginástica", "Escalada", "Luta livre", "Karatê", "Taekwondo", "Judô", "Jiu-jitsu", "Artes marciais", "Corrida de cavalos", "Hipismo",
    "Patinação em linha", "Skate", "Parkour", "Tiro com arco", "Esgrima", "Kendo", "Sumô", "Levantamento de peso", "Kickboxing", "Artes marciais mistas",
    "Triatlo", "Biatlo", "CrossFit", "Pilates", "Zumba", "Aeróbica", "Dança", "Líder de torcida", "Patinação artística", "Patinação de velocidade",

    // Filmes (70)
    "Homem-Aranha", "Super-homem", "Batman", "Harry Potter", "Frozen", "Titanic", "O Rei Leão", "Os Vingadores", "Shrek", "Toy Story",
    "Procurando Nemo", "Divertida Mente", "Coco", "Moana", "Enrolados", "Valente", "Cinderela", "A Bela Adormecida", "Branca de Neve", "Pinóquio",
    "Dumbo", "Bambi", "O Livro da Selva", "Aladim", "Mulan", "Pocahontas", "Hércules", "O Corcunda de Notre-Dame", "Tarzan", "A Pequena Sereia",
    "A Bela e a Fera", "Encantada", "Homem de Ferro", "Capitão América", "Thor", "Hulk", "Viúva Negra", "Homem-Formiga", "Doutor Estranho", "Pantera Negra",
    "Mulher-Maravilha", "Aquaman", "Flash", "O Poderoso Chefão", "Scarface", "Pulp Fiction", "Inception", "Interestelar", "Avatar", "Avatar 2",
    "Parque Jurássico", "Mundo Jurássico", "O Sexto Sentido", "Split", "Saia do Meu Quarto", "Pânico", "Halloween", "Tubarão", "The Ring", "Insidioso",
    "The Dark Knight", "The Dark Knight Rises", "The Matrix", "The Matrix Reloaded", "Guerra nas Estrelas", "Rogue One", "The Mandalorian", "O Senhor dos Anéis", "O Hobbit", "Conjuração",

    // Programas de TV (40)
    "Game of Thrones", "Breaking Bad", "The Office", "Friends", "The Crown", "Stranger Things", "The Mandalorian", "House of the Dragon",
    "Dexter", "Os Sopranos", "Mad Men", "Downtown Abbey", "Peaky Blinders", "Ozark", "Bodyguard", "Line of Duty",
    "Schitt's Creek", "Community", "Parks and Recreation", "Brooklyn Nine-Nine", "The Good Place", "Veep", "Russian Doll", "Fleabag",
    "Squid Game", "Money Heist", "Dark", "The Last of Us", "Chernobyl", "Mindhunter", "Tiger King", "Bridgerton",
    "Succession", "The Rings of Power", "House of Dragons", "The Witcher", "Castlevania", "Arcane", "Cyberpunk", "The Boys",

    // Alimentos (100)
    "Pizza", "Hambúrguer", "Sushi", "Sorvete", "Chocolate", "Maçã", "Banana", "Bolo", "Café", "Macarrão",
    "Bife", "Frango", "Peixe", "Salmão", "Pão", "Bagel", "Rosquinha", "Muffin", "Biscoito", "Brownie",
    "Torta", "Torta", "Pastel", "Croissant", "Sanduíche", "Cachorro-quente", "Taco", "Burrito", "Enchilada", "Quesadilla",
    "Nachos", "Salsa", "Guacamole", "Sopa", "Ensopado", "Curry", "Pimenta", "Ramen", "Macarrão", "Bolinhas",
    "Salada", "Espinafre", "Alface", "Tomate", "Pepino", "Cenoura", "Brócolis", "Batata", "Milho", "Queijo",
    "Leite", "Iogurte", "Manteiga", "Ovo", "Presunto", "Bacon", "Linguiça", "Camarão", "Lagosta", "Caranguejo",
    "Ostra", "Mexilhão", "Arroz", "Feijão", "Ervilha", "Lentilha", "Homus", "Amendoim", "Amêndoa", "Noz",
    "Laranja", "Morango", "Mirtilo", "Framboesa", "Melancia", "Abacaxi", "Manga", "Pêssego", "Coco", "Abacate",
    "Picles", "Azeitona", "Alho", "Cebola", "Pimenta", "Sal", "Açúcar", "Mel", "Geléia", "Manteiga de amendoim",
    "Mayo", "Ketchup", "Mostarda", "Molho picante", "Molho de soja", "Vinagre", "Óleo", "Limão", "Limão verde", "Gengibre",

    // Países (60)
    "França", "Japão", "Egito", "Brasil", "Canadá", "Austrália", "Índia", "Alemanha", "México", "Itália",
    "Espanha", "Portugal", "Grécia", "Turquia", "Rússia", "China", "Coreia do Sul", "Vietnã", "Tailândia", "Filipinas",
    "Indonésia", "Malásia", "Singapura", "Hong Kong", "Taiwan", "Paquistão", "Bangladesh", "Sri Lanka", "Nepal", "Butão",
    "Irã", "Iraque", "Arábia Saudita", "Emirados Árabes Unidos", "Israel", "Líbano", "Síria", "Jordânia", "Sudão", "Líbia",
    "Tunísia", "Marrocos", "Argélia", "Quênia", "Tanzânia", "Uganda", "África do Sul", "Zimbábue", "Nigéria", "Gana",
    "Estados Unidos", "Reino Unido", "Irlanda", "Escócia", "País de Gales", "Suécia", "Noruega", "Finlândia", "Dinamarca", "Polônia",
    "República Tcheca", "Hungria", "Romênia", "Bulgária", "Croácia", "Sérvia", "Áustria", "Suíça", "Bélgica", "Holanda",

    // Emoções (60)
    "Feliz", "Triste", "Zangado", "Surpreso", "Assustado", "Animado", "Confuso", "Orgulhoso", "Nervoso", "Relaxado",
    "Ansioso", "Estressado", "Deprimido", "Otimista", "Pessimista", "Ciumento", "Invejoso", "Grato", "Envergonhado", "Envergonhado",
    "Confiante", "Inseguro", "Corajoso", "Covarde", "Determinado", "Motivado", "Desanimado", "Frustrado", "Irritado", "Irritado",
    "Divertido", "Entretenimento", "Entediado", "Interessado", "Curioso", "Nojado", "Apaixonado", "Afeto", "Indiferente", "Apaixonado",
    "Apático", "Energético", "Letárgico", "Calmo", "Agitado", "Pacífico", "Turbulento", "Alegre", "Encantado", "Satisfeito",
    "Contente", "Satisfeito", "Descontente", "Insatisfeito", "Inquieto", "Sereno", "Amoroso", "Odioso", "Afetuoso", "Frio",

    // Partes do corpo (50)
    "Cabeça", "Cérebro", "Olhos", "Nariz", "Boca", "Dentes", "Língua", "Orelhas", "Cabelo", "Rosto",
    "Pescoço", "Ombros", "Braços", "Cotovelos", "Mãos", "Dedos", "Polegares", "Peito", "Estômago", "Costas",
    "Cintura", "Quadris", "Pernas", "Joelhos", "Tornozelos", "Pés", "Dedos dos pés", "Calcanhares", "Canelas", "Coxas",
    "Coração", "Pulmões", "Fígado", "Rins", "Pele", "Ossos", "Músculos", "Veias", "Artérias", "Nervos",
    "Unhas", "Sobrancelhas", "Cílios", "Lábios", "Queixo", "Bochechas", "Testa", "Palmas", "Pulsos", "Costela",

    // Bebidas (40)
    "Água", "Café", "Chá", "Suco", "Leite", "Limonada", "Cerveja", "Vinho", "Uísque", "Vodka",
    "Rum", "Tequila", "Gim", "Conhaque", "Champanhe", "Prosecco", "Limonada", "Chá gelado", "Smoothie", "Milkshake",
    "Café com leite", "Cappuccino", "Espresso", "Americano", "Mocha", "Macchiato", "Café com leite", "Chá verde", "Chá preto", "Chá oolong",
    "Chá de ervas", "Chá de camomila", "Chá de menta", "Chá de gengibre", "Água de coco", "Bebida energética", "Bebida esportiva", "Ponche", "Sidra", "Kombucha",

    // Roupas (50)
    "Camisa", "Camiseta", "Calça", "Jeans", "Short", "Saia", "Vestido", "Jaqueta", "Casaco", "Suéter",
    "Moletom", "Colete", "Terno", "Gravata", "Cinto", "Chapéu", "Boné", "Gorro", "Lenço", "Luva",
    "Meia", "Roupa de baixo", "Sutiã", "Cueca", "Pijama", "Roupa de banho", "Biquíni", "Bermuda", "Botas", "Sapatos",
    "Tênis", "Sandálias", "Chinelos", "Saltos", "Sapatilhas", "Mocassins", "Chinelos", "Tamancos", "Oxford", "Saltos altos",
    "Colar", "Anel", "Pulseira", "Brincos", "Pingente", "Broche", "Relógio", "Óculos", "Óculos de sol", "Máscara",

    // Tempo (40)
    "Ensolarado", "Chuvoso", "Nublado", "Nevado", "Ventoso", "Tempestuoso", "Nebuloso", "Granizo", "Chuva de neve", "Trovão",
    "Raio", "Arco-íris", "Tornado", "Furacão", "Nevasca", "Seca", "Onda de calor", "Frio", "Geada", "Orvalho",
    "Umidade", "Brisa", "Tempestade", "Tufão", "Ciclone", "Monção", "Avalanche", "Tsunami", "Terremoto", "Vulcão",
    "Chuva", "Neve", "Gelo", "Vento", "Nuvem", "Sol", "Lua", "Estrela", "Meteoro", "Cometa",

    // Música (50)
    "Rock", "Pop", "Hip Hop", "Rap", "Country", "Blues", "Jazz", "Clássico", "Eletrônico", "Dança",
    "Reggae", "Metal", "Punk", "Folk", "Gospel", "Ópera", "R&B", "Soul", "Indie", "Alternativo",
    "Grunge", "Techno", "House", "Trance", "Disco", "Funk", "Swing", "Salsa", "Tango", "Valsa",
    "Balé", "Sapateado", "Jazz Dance", "Contemporâneo", "Breakdancing", "Teatro Musical", "Karaokê", "Concertos", "Festival", "Banda",
    "Orquestra", "Coro", "Guitarra", "Piano", "Bateria", "Violino", "Trompete", "Saxofone", "Flauta", "Gaita",

    // Escola/Aprendizado (40)
    "Escola", "Universidade", "Faculdade", "Estudante", "Professor", "Sala de aula", "Escrivaninha", "Quadro-negro", "Quadro branco", "Lápis",
    "Borracha", "Livro", "Caderno", "Mochila", "Armário", "Corredor", "Cafeteria", "Pátio", "Ginásio", "Biblioteca",
    "Laboratório de informática", "Laboratório de ciências", "Aula de arte", "Aula de música", "Matemática", "Inglês", "História", "Geografia", "Ciência", "Física",
    "Química", "Biologia", "Literatura", "Filosofia", "Psicologia", "Sociologia", "Economia", "Negócios", "Direito", "Medicina",

    // Animais (simples, continuado)
    "Coelhinho", "Filhote de cachorro", "Gatinho", "Cordeiro", "Pintainho", "Patinho", "Leitãozinho", "Bezerro", "Potro", "Pônei",
    "Cabra", "Ovelha", "Vaca", "Touro", "Boi", "Burro", "Mula", "Camelo", "Lhama", "Alpaca",
    "Veado", "Alce", "Alce", "Rena", "Antílope", "Búfalo", "Bisão", "Iaque", "Zebra", "Girafa",

    // Objetos simples (continuado)
    "Brinquedo", "Boneca", "Figura de ação", "Quebra-cabeça", "Jogo", "Carta", "Dado", "Bolinha de gude", "Ioiô", "Pipa",
    "Bicicleta", "Triciclo", "Patinete", "Skate", "Patins", "Patins", "Trenó", "Tobogã", "Prancha de surfe", "Skate",
    "Balde", "Pá", "Ancinho", "Vassoura", "Esfregão", "Toalha", "Cobertor", "Almofada", "Almofada", "Colchão",
    "Corda", "Barbante", "Arame", "Corrente", "Gancho", "Prego", "Parafuso", "Parafuso", "Porca", "Chave",

    // Ações (simples, continuado)
    "Pular", "Pular corda", "Pular", "Rastejar", "Escalar", "Deslizar", "Balançar", "Rolar", "Girar", "Torcer",
    "Dobrar", "Esticar", "Alcançar", "Agarrar", "Segurar", "Soltar", "Lançar", "Pegar", "Chutar", "Empurrar",
    "Puxar", "Arrastar", "Levantar", "Abaixar", "Levantar", "Deixar cair", "Quicar", "Rolar", "Deslizar", "Deslizar",
    "Acenar", "Apontar", "Bater palmas", "Bater os dedos", "Pisar", "Bater", "Bater", "Esfregar", "Fazer cócegas", "Coçar",

    // Feriados (30)
    "Natal", "Dia das Bruxas", "Páscoa", "Dia dos Namorados", "Ação de Graças", "Dia da Independência", "Ano Novo", "Hanuká", "Diwali", "Eid",
    "Dia das Mães", "Dia dos Pais", "Aniversário", "Aniversário", "Casamento", "Bolo de casamento", "Graduação", "Baile de formatura", "Carnaval", "Desfile",
    "Festival", "Concerto", "Dia do esporte", "Dia da escola", "Dia de trabalho", "Férias", "Feriado", "Fim de semana", "Dia da semana", "Hoje à noite",

    // Brinquedos & Jogos (40)
    "Lego", "Blocos de construção", "Boneca", "Figura de ação", "Ursinho de pelúcia", "Bicho de pelúcia", "Quebra-cabeça", "Jogo de tabuleiro", "Jogo de cartas", "Videogame",
    "Console de videogame", "PlayStation", "Xbox", "Nintendo Switch", "Jogo de computador", "Jogo para celular", "Jogo de arcade", "Jogo de cassino", "Dado", "Carta",
    "Marcador", "Lápis de cor", "Lápis de cor", "Tinta", "Pincel", "Paleta", "Tela", "Livro de esboços", "Quadro branco", "Adesivo",
    "Balão", "Confete", "Fita", "Bandeira", "Decoração", "Chapéu de festa", "Apito de festa", "Máscara", "Fantasia", "Maquiagem",

    // Transporte (30)
    "Carro", "Caminhão", "Ônibus", "Van", "Trem", "Metrô", "Bonde", "Táxi", "Bicicleta", "Motocicleta",
    "Avião", "Helicóptero", "Balão de ar quente", "Veleiro", "Lancha", "Iate", "Submarino", "Foguete", "Nave espacial", "Hovercraft",
    "Skate", "Patins", "Patinete", "Segway", "Cavalo", "Camelo", "Elefante", "Barco", "Canoa", "Caiaque",

    // Cozinha (30)
    "Geladeira", "Freezer", "Fogão", "Forno", "Micro-ondas", "Lava-louças", "Pia", "Bancada", "Mesa", "Cadeira",
    "Faca", "Garfo", "Colher", "Prato", "Tigela", "Xícara", "Copo", "Caneca", "Panela", "Frigideira",
    "Espátula", "Colher de madeira", "Batedor", "Liquidificador", "Torradeira", "Chaleira", "Cafeteira", "Abridor de latas", "Descascador", "Ralador",

    // Quarto (25)
    "Cama", "Almofada", "Cobertor", "Lençol", "Colcha", "Colchão", "Cabeceira", "Criado-mudo", "Cômoda", "Closet",
    "Guarda-roupa", "Armário", "Prateleira", "Espelho", "Lâmpada", "Despertador", "Janela", "Cortina", "Persianas", "Porta",
    "Tapete", "Tapete", "Cadeira", "Escrivaninha", "Gaveta", "Cabideiro",

    // Banheiro (20)
    "Vaso sanitário", "Banheira", "Chuveiro", "Pia", "Torneira", "Espelho", "Armário de medicamentos", "Toalheiro", "Dispenser de sabonete", "Suporte de escova de dentes",
    "Lixeira", "Papel higiênico", "Tapete de banho", "Cortina de chuveiro", "Escova de dentes", "Pasta de dentes", "Pente", "Escova", "Balança", "Sabonete",

    // Verbos simples (40)
    "Comer", "Beber", "Dormir", "Acordar", "Correr", "Andar", "Sentar", "Ficar de pé", "Pular", "Dançar",
    "Cantar", "Gritar", "Sussurrar", "Rir", "Chorar", "Sorrir", "Fazer careta", "Piscar", "Acenar com a cabeça", "Abanar",
    "Acenar", "Apontar", "Bater palmas", "Estalar os dedos", "Chutar", "Bater", "Lançar", "Pegar", "Segurar", "Deixar cair",
    "Pegar", "Pegar", "Dar", "Obter", "Fazer", "Fazer", "Ir", "Vir", "Ficar", "Partir",

    // Adjetivos simples (40)
    "Grande", "Pequeno", "Alto", "Baixo", "Longo", "Largo", "Estreito", "Espesso", "Fino", "Rápido",
    "Lento", "Quente", "Frio", "Morno", "Legal", "Macio", "Duro", "Áspero", "Liso", "Molhado",
    "Seco", "Limpo", "Sujo", "Brilhante", "Escuro", "Leve", "Pesado", "Leve", "Forte", "Fraco",
    "Bom", "Ruim", "Certo", "Errado", "Verdadeiro", "Falso", "Novo", "Velho", "Jovem", "Antigo",

    // Cores (20)
    "Vermelho", "Azul", "Amarelo", "Verde", "Laranja", "Roxo", "Rosa", "Marrom", "Preto", "Branco",
    "Cinzento", "Cinzento", "Prata", "Ouro", "Bege", "Turquesa", "Ciano", "Magenta", "Verde-limão", "Azul-marinho",

    // Números (20)
    "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez",
    "Onze", "Doze", "Treze", "Quatorze", "Quinze", "Vinte", "Trinta", "Cem", "Mil", "Milhão",

    // Formas (15)
    "Círculo", "Quadrado", "Triângulo", "Retângulo", "Pentágono", "Hexágono", "Octógono", "Oval", "Diamante", "Estrela",
    "Coração", "Cubo", "Esfera", "Cone", "Cilindro", "Pirâmide", "Prisma",

    // Meses (12)
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",

    // Dias (7)
    "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo",

    // Estações (4)
    "Primavera", "Verão", "Outono", "Inverno",
];

// Game state
let state = {
    players: 2,
    duration: 60,
    currentPlayer: 1,
    scores: {},
    currentWord: null,
    usedWords: [],
    currentScore: 0,
    timeLeft: 60,
    timerInterval: null,
    isPlaying: false
};

// DOM
const setupScreen = document.getElementById('setupScreen');
const readyScreen = document.getElementById('readyScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const readyBtn = document.getElementById('readyBtn');
const correctBtn = document.getElementById('correctBtn');
const skipBtn = document.getElementById('skipBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Initialize scores
function initGame() {
    state.players = parseInt(document.getElementById('playerCount').value);
    state.duration = parseInt(document.getElementById('gameDuration').value);
    state.currentPlayer = 1;
    state.scores = {};
    state.usedWords = [];

    for (let i = 1; i <= state.players; i++) {
        state.scores[i] = 0;
    }

    showReadyScreen();
}

// Show ready screen for next player
function showReadyScreen() {
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    readyScreen.style.display = 'block';

    document.getElementById('nextPlayerNum').textContent = state.currentPlayer;
}

// Start a player's turn
function startTurn() {
    state.currentScore = 0;
    state.timeLeft = state.duration;
    state.isPlaying = true;

    readyScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    document.getElementById('currentPlayer').textContent = state.currentPlayer;
    document.getElementById('playerScore').textContent = state.currentScore;

    drawWord();
    startTimer();
}

// Draw a random word
function drawWord() {
    if (state.usedWords.length === WORDS.length) {
        state.usedWords = [];
    }

    let word;
    do {
        word = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (state.usedWords.includes(word));

    state.usedWords.push(word);
    state.currentWord = word;
    document.getElementById('wordDisplay').textContent = word;
}

// Start countdown timer
function startTimer() {
    clearInterval(state.timerInterval);

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        document.getElementById('timer').textContent = state.timeLeft;

        if (state.timeLeft <= 0) {
            endTurn();
        }
    }, 1000);
}

// Handle correct answer
function handleCorrect() {
    state.currentScore++;
    state.scores[state.currentPlayer]++;
    document.getElementById('playerScore').textContent = state.currentScore;
    drawWord();
}

// Handle skip
function handleSkip() {
    drawWord();
}

// End current player's turn
function endTurn() {
    state.isPlaying = false;
    clearInterval(state.timerInterval);

    if (state.currentPlayer < state.players) {
        state.currentPlayer++;
        showReadyScreen();
    } else {
        showResults();
    }
}


// Show final results
function showResults() {
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    let html = '';
    const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);

    sorted.forEach(([player, score], index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        html += `<div class="score-row">${medal} Player ${player}: <strong>${score}</strong> points</div>`;
    });

    document.getElementById('finalScores').innerHTML = html;
}

// Event listeners
startBtn.addEventListener('click', initGame);
readyBtn.addEventListener('click', startTurn);
correctBtn.addEventListener('click', () => {
    if (state.isPlaying) handleCorrect();
});
skipBtn.addEventListener('click', () => {
    if (state.isPlaying) handleSkip();
});
playAgainBtn.addEventListener('click', () => {
    setupScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    readyScreen.style.display = 'none';
});

// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all other accordions
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button && otherButton.classList.contains('active')) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion
            this.classList.toggle('active');
            accordionContent.classList.toggle('active');
        });
    });
});
