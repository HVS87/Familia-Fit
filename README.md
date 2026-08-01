# 🍽️ Família Fit

Ferramenta web para gerir a **alimentação e a atividade física de toda a família**, num único ficheiro HTML sem dependências, servidores ou instalação.

**[▶ Abrir a aplicação](https://SEU-UTILIZADOR.github.io/familia-fit/)** — substituir pelo endereço real depois de ativar o GitHub Pages.

---

## Começar

A página de abertura tem uma **visita guiada** de 47 passos que percorre os oito separadores e todas as funcionalidades — perfis, data de nascimento e alergias, a evolução do peso, avatares, o mês em palavras, o plano de treinos e o registo do que se fez, treinar em conjunto, macros, suplementos, o registo das refeições, a biblioteca de receitas e o editor, a despensa, os objetivos, as sugestões por mesa, comer em conjunto, os acompanhamentos, as compras e os temas — com uma família de exemplo, já com duas semanas de histórico, para se ver tudo a funcionar. Os passos que falam de cartões que ainda não têm dados são saltados, em vez de apontarem para o vazio. Pode sair-se a qualquer momento, e o exemplo apaga-se no separador Dados. Quem preferir começar do zero cria o primeiro perfil ali ao lado; a visita fica sempre disponível em **Dados → Rever a visita guiada**.

## Aspeto

A interface segue a ideia de um **caderno de família português**, não de um dashboard genérico: serifa editorial (Iowan/Palatino/Georgia, sem fontes externas) reservada a títulos e números de destaque sobre uma UI de sistema disciplinada, **ícones de linha desenhados no mesmo traço dos gráficos** da app, e a cor de acento a significar sempre «agora» — o separador ativo, o dia de hoje, o membro selecionado.

A orientação nasce da hierarquia: cada separador abre com um **cartão-capa** (sombra e um gradiente suave do acento) e o detalhe fica em cartões quietos. O separador Família abre com o cartão **«Hoje»** — o que está planeado para hoje, para quem, alertas de alergia do próprio dia e quantos itens faltam comprar, com um toque a levar ao sítio certo.

**No telemóvel ao alto, a navegação desce para junto do polegar**: os quatro separadores do dia a dia (Família, Nutrição, Plano, Compras) numa barra fixa em baixo e o resto numa folha «Mais». No plano, uma **régua de dias** cola ao cabeçalho — um botão por dia com o estado do planeamento em ponto e o dia de hoje vestido de acento; o seletor de membro acompanha o scroll em Atividade e Nutrição; e a lista de compras ganha corredores-carimbo colados ao topo com contador por secção, quantidades em letra de talão e alvos de toque de supermercado. Os selects do plano dizem o estado de relance: por escolher é um convite tracejado, escolhido é sólido e com peso.

### Temas

Sete paletas — **Azulejo** (azul de louça e terracota), **Alecrim** (verdes de horta), **Figo** (roxos e magentas), **Maré** (azuis-esverdeados), **Brasa** (laranjas quentes), **Tinta** (monocromático) e **Contraste** (todos os textos a 7:1, traço mais grosso e gráficos que se distinguem por padrão, não só por cor) — cada uma com modo claro e escuro. A paleta muda os acentos e o tom dos neutros; o modo é independente e pode seguir o sistema, mudando sozinho ao anoitecer. Escolhe-se em **Dados → Aspeto**.

O contraste é medido, não estimado: cada cor que serve de texto foi passada pelo cálculo da WCAG contra o fundo onde assenta, nas catorze combinações de paleta e modo, e todas chegam aos 4,5:1 — botões, chips, pills, etiquetas e números. Os textos e os gráficos também são verificados contra sobreposições: uma varredura compara linha a linha as caixas de todos os elementos com texto, incluindo os rótulos dentro dos SVG, em vários pesos, alturas e objetivos, e a três larguras de ecrã.

Cada membro tem **emoji e cor próprios**, que aparecem no avatar, nos pontos do plano semanal e numa **aura** esbatida no topo do cabeçalho — a app fica com a cara de quem a usa. As secções mais pesadas são **colapsáveis com memória**: o que se fecha fica fechado, cartão a cartão, e há um botão para reabrir tudo.

O separador Família tem ainda **o mês em palavras**: um retrato dos últimos 30 dias escrito em prosa a partir do que está registado — refeições planeadas, dias completos, dias livres, atividade da família, evolução de quem tem objetivo a decorrer e conquistas do período. Só afirma o que os dados sustentam: sem desporto registado, di-lo; sem objetivo, não fala de variação de peso, porque não há histórico de pesagens.

## O que faz

**👤 Perfis** — um perfil por membro da família, com sexo, data de nascimento, altura e peso. Calcula o índice de massa corporal (com classificação), o metabolismo basal pela fórmula de Mifflin-St Jeor e o gasto energético diário total.

A **idade vem da data de nascimento** e envelhece sozinha — não é um número que se corrige uma vez por ano e depois fica errado. Com data de nascimento, a fase da vida deixa de ser uma escolha e passa a ser uma consequência. A altura escreve-se uma vez, num campo, porque não é coisa que se ande a arrastar. O único slider que sobra no perfil é o do **peso**, e é o certo: é o que muda.

**⚖️ O peso tem história.** Cada pesagem fica com a sua data — as de hoje e as antigas que estejam anotadas. O peso do perfil é sempre a medição mais recente que já aconteceu, para a balança e os cálculos nunca contarem histórias diferentes. A app **pergunta ao abrir** se há medições novas para registar, quando alguém já não se pesa há uma semana, e há botões para o fazer no perfil e nos Objetivos — que é onde a pergunta mais interessa, porque o anel de progresso sai da balança. O gráfico de evolução tem janela ajustável (14 dias, 8 semanas, 6 meses, 2 anos) e dois interruptores que sobrepõem a **atividade registada** e as **calorias ingeridas**, cada um com a sua escala: servem para ver a forma de uma curva ao lado da outra, não para comparar quilos com calorias. Entre duas pesagens a linha liga o que foi medido; onde não há medição não há linha.

**🏃 Atividade Física** — nível de atividade do dia-a-dia (de sedentário a trabalho físico pesado), forma de deslocação para o trabalho ou escola (a pé, bicicleta, transportes) e registo de desportos praticados. São 43 modalidades agrupadas por família: o ciclismo distingue estrada, montanha, BTT, passeio e estática; a corrida distingue ritmo, trilho e séries; e há pilates, calistenia, ioga, musculação, treino funcional e por aí adiante.

Cada modalidade tem a forma de registo que lhe assenta melhor. Nos dez desportos em que **a velocidade é que manda no esforço** — corrida, trilho, caminhada, os quatro tipos de ciclismo ao ar livre, natação, remo e patinagem — indicam-se a **distância e a velocidade em sliders**, e as horas saem daí. O MET é lido de uma curva contínua velocidade → MET, e não de três degraus, pelo que o valor acompanha o slider enquanto se arrasta: o ritmo aparece em min/km, min/100 m ou min/500 m conforme o desporto, e o nível (leve, moderado, intenso) passa a ser uma consequência mostrada, não uma escolha. Nos restantes mantém-se o nível de intensidade pelo teste da conversa.

As calorias são estimadas por METs (esforço metabólico × peso × horas) e somadas ao gasto basal, com o detalhe de cada parcela visível e atualizado ao vivo enquanto se mexe nos sliders.

**O plano é o que se tenciona fazer; o registo é o que se fez.** O separador deixou de misturar as duas coisas. Cada desporto do plano diz **em que dias da semana** acontece, e o tempo de cada sessão é o volume semanal dividido por eles — o total não muda (e por isso nenhum gasto já calculado se mexe), mas passa a haver treinos com data. Daí saem duas coisas: a semana que vem aí, com o que está marcado dia a dia, e — ao entrar no perfil — **o que ficou por confirmar**. Enquanto não há plano é ele que ocupa o lugar de destaque; a partir do momento em que existe, o destaque passa para **registar atividade**, que é o gesto de todos os dias.

Um treino do plano que já passou e nunca foi confirmado pergunta o que aconteceu: **fiz**, ou **não fiz** — e aí **remarcar** para outro dia (fica agendado e reaparece nesse dia), **ignorar**, ou **rever o plano**, que é a resposta honesta quando um treino nunca se cumpre. Confirma-se um a um ou em bloco. O que se regista entra logo no gasto do dia, no alvo de calorias e no ritmo dos objetivos.

O cartão de **atividade passada** põe lado a lado, em 30 dias, o que ficou registado (barras) e o que o plano marcava (tracejado) — a distância entre os dois é a única coisa que interessa ver, e abaixo de 60 % de cumprimento a app di-lo. O **histórico completo** tem 90 dias, onde foi o esforço por modalidade, e uma fita do tempo com tudo o que se pode consultar, **acrescentar, editar ou apagar**; cada alteração acerta o gasto, o alvo e os objetivos a seguir.

**🤝 Treinar em conjunto.** Quando duas pessoas cá de casa já têm a mesma modalidade no plano e o objetivo a apontar para o mesmo lado, a app junta-as, dando preferência aos dias que já são comuns aos dois planos. Saem à mesma hora e **cada uma faz o seu tempo e o seu ritmo** — correr juntos não é correr ao mesmo ritmo, e quem acabar primeiro espera. Uma atividade partilhada guarda-se uma vez por pessoa, ligadas entre si: confirmar uma confirma o grupo, e editar ou apagar pergunta primeiro se vale para os outros.

**Fases da vida** — cada perfil declara a sua fase, e os cálculos mudam com ela. Bebés (de 3 em 3 meses até aos 24), crianças (2–12), adolescentes (13–18) e adultos usam a equação de metabolismo basal apropriada — Schofield abaixo dos 19 anos, Mifflin-St Jeor a partir daí — com a energia de crescimento somada à parte. A gravidez identifica-se com trimestre e número de fetos, usa o peso pré-gestacional como referência e acrescenta a energia do trimestre.

Os macronutrientes deixam de ser os mesmos para todos: cada fase tem a sua faixa aceitável (AMDR), e uma dieta que saia dela — uma cetogénica para uma criança, por exemplo — é encostada aos limites com aviso visível, em vez de ser aplicada como se nada fosse. Num adulto não grávido a faixa é mostrada como referência e a escolha continua a ser dele. Também há proteína recomendada em gramas por quilo e mínimo absoluto de hidratos por fase.

O esforço tem limites próprios: recomendações de volume por idade, teto de horas semanais de desporto organizado em idade pediátrica, limite de intensidade e lista de modalidades desaconselhadas na gravidez, com aviso quando o que está registado as contraria. Défice calórico e projeção de peso ficam indisponíveis em crianças, adolescentes e na gravidez, com a razão explicada. Numa gestação de trigémeos a app não apresenta estimativa nenhuma, porque não existe valor de referência publicado — e di-lo.

Estes números são referências populacionais (Institute of Medicine, Schofield, Organização Mundial de Saúde, ACOG) para planeamento familiar. Não substituem consulta, e a app repete-o em cada ecrã onde isso importa. Abaixo dos 6 meses não gera plano de receitas.

**Idade dos membros** — dois anos é o valor mínimo medido em anos; abaixo disso a idade mede-se sempre em meses (0 a 24), num slider contínuo que troca sozinho de representação exatamente na fronteira, em qualquer direção. Isto interliga diretamente com o módulo do bebé: um perfil deixa de ser "bebé" e ganha o separador de Nutrição normal assim que a idade chega aos 2 anos, sem passos manuais.

**Nutrição do bebé por percentil** — nos perfis de bebé, o separador Nutrição dá lugar a um módulo próprio. As curvas de peso para a idade seguem as tabelas oficiais da Organização Mundial de Saúde (percentis 3 a 97, *WHO Child Growth Standards*, 2006), transcritas diretamente dos PDFs publicados pela OMS, e o bebé aparece assinalado sobre elas — arrastar o slider do peso move o ponto e recalcula tudo. As doses diárias de referência (energia, proteína, hidratos, gordura, água, ferro, cálcio, vitamina D) seguem os relatórios *Dietary Reference Intakes* do Institute of Medicine / National Academies (2001, 2002/2005, 2011); a vitamina D sobe de 400 para 600 UI exatamente na transição de lactente para 1–3 anos, como a própria referência determina — não é um valor único para toda a primeira infância.

O leite tem a sua ferramenta: modo (materno, fórmula, misto, leite + sólidos), sliders de tomadas por dia e volume por tomada — que parte das necessidades de energia (67 kcal/100 ml, o valor clássico de 20 kcal/onça, dentro do intervalo do Codex Alimentarius) e é comparado com uma referência de ml/kg que desce com a idade, em vez de um patamar fixo para todo o primeiro ano. Na fórmula, a app dá o volume de água necessário mas **não inventa um número de medidas de pó** — o peso de cada medida varia por marca, e apresentar uma conversão calculada seria uma falsa precisão arriscada; a instrução é sempre seguir a tabela da própria embalagem. O horário das tomadas gera-se com dois sliders (intervalo de 2 a 6 horas e hora da primeira toma) e desenha-se numa linha do dia com a noite sombreada. A partir dos 6 meses, um slider reparte a energia entre leite e sólidos e o dia é sugerido em refeições, com as regras do primeiro ano à vista: sem sal, sem açúcar, sem mel, seguindo o manual *Alimentação Saudável dos 0 aos 6 anos* da Direção-Geral da Saúde.

Todos os números deste módulo passaram por uma auditoria de fontes: cada valor foi confirmado (ou corrigido) contra o documento oficial de origem — OMS, Institute of Medicine, Codex Alimentarius/ESPGHAN e, para as recomendações portuguesas, normas da Direção-Geral da Saúde — em vez de se assumir que uma primeira estimativa estava certa.

**🍽️ Nutrição** — objetivo de peso (perder, manter, ganhar) que ajusta o alvo calórico, e sete tipos de dieta: equilibrada, mediterrânica, keto, low carb, low fat, paleo e vegetariana. O simulador converte o alvo calórico em gramas de hidratos, proteína e gordura, e reparte-o pelas quatro refeições do dia.

**O mesmo princípio da Atividade Física: plano e registo são coisas diferentes.** Definido o plano, o cartão dele recolhe e o destaque passa para **registar refeição**. As refeições planeadas que ficaram por confirmar aparecem em cima ao entrar no perfil: **comi**, **comi outra coisa** — e aí regista-se logo o que foi, marcado como substituição — ou **rever o plano**, que é o que se deve fazer quando um prato nunca se cumpre. Uma refeição partilhada confirma-se de uma vez para todos os que estavam à mesa.

O cartão de **alimentação passada** mostra 30 dias de calorias registadas, verdes dentro do alvo do dia e amarelas fora dele, com o alvo em tracejado. E o alvo do dia não é o do plano em bruto: é o do plano **mais o que se gastou a mais do que estava previsto** naquele dia. Quem corre 10 km que não estavam marcados precisa de comer esse gasto para manter o mesmo défice, e mandá-lo comer o mesmo transformaria um treino extra num défice a dobrar. O **histórico completo** tem 90 dias, os macros de tudo o que se registou, os pratos que mais se repetem e a fita do tempo, com consulta, edição e remoção — e cada alteração acerta o balanço do dia, o alvo e o ritmo dos objetivos.

**🤝 Comer em conjunto.** Cozinhar duas coisas diferentes para a mesma mesa é o trabalho a dobrar que as casas com dietas diferentes fazem todos os dias. Quando duas pessoas gostam do mesmo — e o gosto lê-se do que já comeram e planearam, não de uma preferência declarada que ninguém preenche — e querem o peso a ir para o mesmo lado, o prato pode ser um só. O que se ajusta é a **dose de cada um** (sai do teto de calorias que já é calculado para cada pessoa) e o **que vai ao lado**: para quem está em défice, o acompanhamento aligeira-se ou sai, porque é aí que estão as calorias fáceis de tirar. Regista-se de uma vez, com a dose certa para cada um, ou põe-se no plano da semana com os comensais já escolhidos.

**Suplementos** — dentro da Nutrição, um registo do que cada membro toma e em quantas doses por dia: proteicos (whey, caseína, vegetal, hipercalórico), vitaminas, minerais e compostos (ómega 3, creatina, fibra). Um batido de proteína é comida, por isso as calorias e os macros entram no plano do dia: a app mostra quanto de cada macronutriente já vem dos suplementos e **quanto sobra para a comida** — o número que interessa a quem vai cozinhar.

Os micronutrientes são comparados com a dose diária de referência e com o **limite superior tolerável** do Institute of Medicine, com aviso quando as doses o ultrapassam. Há avisos específicos por fase: ácido fólico na gravidez (e o cuidado com o retinol em dose alta), e a nota de que em crianças a suplementação segue indicação médica, com limites muito mais baixos — o ferro em excesso é das intoxicações mais frequentes nessa idade. Os suplementos entram também na despensa e na lista de compras, com as doses de sete dias.

**🍳 Receitas** — separador próprio com **347 receitas** de dez cozinhas: portuguesa, mediterrânica, espanhola, italiana, francesa, mexicana, norte-americana, asiática, **brasileira** e **africana**, com pratos principais, pequenos-almoços e lanches em todas elas, e um conjunto grande desenhado para keto.

A cozinha lusófona tem casa própria: **cachupa** e **moamba de galinha** de África; **moqueca**, **feijoada brasileira**, **maminha grelhada**, **pastéis de vento**, **pastel de queijo e catupiry** e **pão de queijo** do Brasil. E a picanha e a fraldinha, que entraram pela churrasqueira portuguesa, passam a estar também onde nasceram — aparecem nas listas das duas cozinhas.

**Toca-se numa receita e ela abre.** A ficha traz os **passos de preparação** — escritos um a um, para as 338, não gerados por template —, as quantidades já escaladas às doses que escolheres, os macros, o estado da despensa, os alergénios de quem cá vive e como se guarda o que sobrar. Os passos que têm tempo trazem um botão que **põe um temporizador a contar**, e os temporizadores desta app sobrevivem a fechar a página. De lá parte-se para o Modo Cozinha com um toque.

Os passos dizem o que interessa e porquê: que o arroz da carbonara se liga *fora do lume* porque no lume faz ovos mexidos; que a paella não se mexe depois do caldo porque é isso que forma o *socarrat*; que o polvo se «assusta» três vezes na água a ferver para a pele não se soltar; que a beringela se salga meia hora para perder o amargo. Onde uma receita da casa ainda não tiver passos escritos, a app **deriva-os dos ingredientes e do género do prato — e diz que os derivou**, em vez de os fazer passar por receita de livro.

**Cinco categorias** atravessam a biblioteca, porque o lugar de uma receita na mesa é uma pergunta diferente de «em que refeição encaixa»: **Entrada**, **Prato principal**, **Brunch**, **Snack** e **Sobremesa**. Quem não declara a sua, herda-a do que já se sabe — pequeno-almoço é brunch, lanche é snack, almoço ou jantar é prato principal. E há pratos de duas casas: o melão com presunto é português *e* espanhol, e aparece nas listas das duas.

A cozinha portuguesa tem o peso que merece: **peixe grelhado e no forno** com os que mais se comem cá (dourada, robalo, sardinha, carapau, cavala, pescada, salmão, peixe-espada, linguado, corvina, goraz, salmonete); **marisco à nossa maneira** (amêijoas à Bulhão Pato, gambas grelhadas, berbigão ao vapor, choco grelhado, sapateira recheada, lulas salteadas, camarão ao alhinho, polvo à galega); e **carne na brasa** com os cortes que se pedem pelo nome — bife do lombo, costeletas de novilho, posta mirandesa, picanha, fraldinha, secretos e plumas de porco preto, bifanas no pão e espetada em pau de louro.

**Vegetariana e vegan são dietas diferentes** e a app trata-as como tal: a vegetariana come ovos, lacticínios e mel, a vegan não come nada de origem animal. Nenhuma das duas etiquetas é escrita à mão — ambas se leem dos ingredientes de cada receita, tal como o paleo, que passou a excluir cereais (um arroz de coentros não é paleo só por não levar trigo).

**🍚 Acompanhamentos** — vinte receitas que existem para ir ao lado do prato: batatas (cozidas com salsa, assadas com alecrim, fritas, na airfryer, a murro), arroz (branco, basmati, carolino malandrinho, de tomate, de coentros, de açafrão), legumes (grelhados, brócolos e grelos salteados, espargos, feijão-verde, cogumelos) e saladas (mista, de tomate com orégãos, de couve-roxa e cenoura). No plano, ao almoço e ao jantar, aparece uma linha tracejada por baixo do prato para escolher o que vai ao lado: as calorias somam-se ao total do dia, os ingredientes somam-se à lista de compras, mas não conta como refeição — um arroz de coentros não é um jantar. O preenchimento automático escolhe um para cada almoço e jantar, respeitando as mesmas dietas, alergias e exclusões do prato.

**Trocar, ou juntar mais um a dividir a dose.** O 🔀 ao lado de cada acompanhamento troca-o pelo seguinte da lista dos que servem aquela mesa — os que já se podem fazer com o que há em casa vêm primeiro, e carregar outra vez anda para o seguinte em vez de sortear, para não repetir a mesma sugestão. O «juntar acompanhamento» põe mais um ao lado, até três. E aqui está o ponto: ao lado do bife não cabe uma dose de batatas **e** uma dose de arroz — cabe uma dose de acompanhamento. Quem puser dois divide-a: meia dose de cada, um terço com três. As calorias, os macros, o total do dia, as quantidades da receita e o que vai para a lista de compras seguem todos essa divisão — juntar uma salada às batatas não inventa comida que ninguém pôs na mesa. Os alertas de alergénio olham para os acompanhamentos como olham para o prato, no plano e no cartão «Hoje», e os que já estão escolhidos desaparecem da lista dos outros seletores, para o mesmo arroz não aparecer duas vezes a dividir-se consigo próprio. No editor, uma receita da casa pode ser marcada como **acompanhamento** — é exclusivo de ser prato — e entra em tudo isto como as da biblioteca. Filtram-se por refeição, **por cozinha e por dieta** (os dois filtros combinam-se), ou por compatibilidade com quem está selecionado; há ainda a secção das receitas que servem as dietas de **todos ao mesmo tempo**. Cada receita mostra os ingredientes com as quantidades **já multiplicadas pelo número de pessoas** e com o estado da despensa — ✓ verde para o que já tens em casa, ✗ vermelho para o que falta — e uma etiqueta-resumo que diz «Pronta a cozinhar» quando não falta nada.

**Os macros saem dos ingredientes — e os ingredientes saem da tabela oficial portuguesa.** O catálogo tem **646 ingredientes** com composição por 100 g de parte edível (energia, hidratos, proteína, gordura e fibra). A fonte principal é a **Tabela da Composição de Alimentos do INSA** (Instituto Nacional de Saúde Doutor Ricardo Jorge, PortFIR, versão 7.1, 2026), descarregada da própria base e transcrita campo a campo — cobre o peixe da nossa costa (sarda, besugo, cherne, faneca, tamboril…), os cortes de carne, os queijos com nome de terra (São Jorge, Azeitão, Serra da Estrela…), leguminosas, fruta, farinhas, ervas e especiarias. Os ingredientes que a tabela portuguesa não cobre (quinoa, couscous, tortilhas, granola, pesto, tahini, edamame…) usam o FoodData Central do USDA, convertidos para a convenção europeia de hidratos **disponíveis** (sem a fibra, como num rótulo). O peso de uma unidade — um ovo, um dente de alho, um tomate — permite escrever «2 ovos» e ter a conta certa, e a **parte edível** separa o peso que se paga na peixaria do que entra no prato. As etiquetas de dieta seguem o mesmo princípio — keto e low carb saem dos hidratos, low fat da percentagem de gordura, vegetariana e paleo do que a receita leva dentro — e a secção do supermercado na lista de compras vem da classificação do próprio INSA. Nada disto é escrito à mão, por isso nada pode desalinhar-se do prato.

**Pesquisa por nome** — uma caixa de pesquisa nas Receitas procura no nome e nos ingredientes, ignorando acentos e maiúsculas: «acorda» encontra a açorda, «couve» encontra tudo o que leva couve. Filtra a grelha sem redesenhar a página, para o cursor nunca saltar da caixa.

**As tuas receitas** — «+ Nova receita» abre um editor onde se escolhem ingredientes do catálogo, quantidades da receita inteira e quantas doses rende. Os macros por dose e as etiquetas de dieta aparecem **enquanto se escreve**, e a receita passa a viver na biblioteca como qualquer outra: entra nas sugestões, no plano, na despensa e na lista de compras. Em «Encaixa em» há também **Acompanhamento**, exclusivo das refeições — marcá-lo faz da receita um acompanhamento a sério, que vai ao lado do prato e divide a dose com os outros como os da biblioteca. Qualquer receita da biblioteca se pode **copiar para editar**, e as da casa editam-se e apagam-se no próprio cartão — apagar uma receita liberta as refeições onde estava planeada, em vez de deixar um lugar vazio sem explicação. Só entram ingredientes do catálogo: é isso que garante que o nome bate certo com a despensa e que há composição para calcular.

**🥫 A minha despensa** — inventário de ingredientes com pesquisa, agrupado por secção do supermercado. O catálogo deriva sempre das próprias receitas (nunca texto livre), pelo que um nome na despensa bate sempre certo com o das receitas. Marcar um item como comprado na lista de compras acrescenta-o automaticamente à despensa; desmarcar não o remove, porque um clique a mais no supermercado não significa que a prateleira ficou vazia.

**Compras por confirmar.** Uma lista que ficou por marcar significa uma de duas coisas: ou as compras não se fizeram, ou fizeram-se e ninguém as foi apontar — e a segunda é de longe a mais frequente. Por isso, ao entrar na despensa pela primeira vez em cada sessão, a app pergunta se as compras pendentes já foram feitas e deixa **validar item a item** em vez de tudo ou nada. O que se confirmar passa de uma vez para a despensa e fica marcado na lista da semana. Olha para a semana atual e para as duas anteriores; mais para trás é história, não uma compra por fazer.

Nas Compras, além da lista completa da semana, há o cartão **«O que falta comprar»**: a lista da semana menos o que já está na despensa. É essa que se exporta — pelo menu de partilha do telemóvel (que permite escolher Google Keep, Apple Reminders/Lembretes ou qualquer outra app) ou por cópia para a área de transferência, com cada linha a começar por ☐ para servir de checklist. A app não escreve diretamente no Keep nem nos Lembretes — nenhuma página web o pode fazer sem contas e autorizações — mas o menu de partilha nativo leva lá a lista em dois toques.

Todas as dietas têm pelo menos três opções em cada refeição.

**🎯 Objetivos** — cria uma estratégia de peso para um ou vários membros: escolhe quem, quantos quilos e em quantas semanas (ou, para manter, durante quanto tempo e com que margem), e a app calcula o défice ou o excedente diário necessário e reparte-o entre a dieta e o exercício. Ao criar, isso é logo aplicado — o objetivo calórico da Nutrição muda e o desporto escolhido ganha as horas extra necessárias, num registo já existente ou num novo.

O equilíbrio entre dieta e exercício é um slider contínuo (mais dieta pede menos esforço físico extra; mais exercício permite comer com menos restrição), com atalhos para "mais dieta", "equilibrado" e "mais exercício", e pode ser reajustado mais tarde a partir do próprio objetivo, sem o recriar. Perfis em crescimento ou grávidas nunca recebem um objetivo de défice — só de manutenção ou ganho, com a razão explicada.

Cada objetivo mostra um anel de progresso, calculado a partir do peso atual do membro desde que o objetivo foi criado — sem precisar de um histórico à parte. A cor do anel reflete o ritmo real, não só o progresso: fica amarelo ou vermelho quando o peso perdido está a ficar para trás do tempo já passado. Ao atingir um objetivo, a app celebra com um cartão festivo, e o objetivo passa para uma secção de **Conquistas**, que fica como registo do que já foi alcançado.

## Cozinhar como a casa cozinha

**Cinco escolhas que mudam as contas, não a decoração.** No Plano de Refeições, «Como esta casa cozinha» tem interruptores para **repetir receitas durante a semana**, **cozinhar em dobro**, **só ingredientes de época**, **preparar de véspera** e o cartão de receita da época.

**Cozinhar em dobro** dobra o *prato*: as quantidades sobem já na lista de compras, e o dia que só aquece deixa de o comprar — senão a mesma comida entrava duas vezes no talão. Os acompanhamentos ficam de fora dessa conta porque se fazem frescos em cada dia: ninguém reaquece uma salada. Cada refeição repetida mostra-se como **♻ Aquecer**, com o dia em que foi cozinhada.

**Quanto tempo aguenta e como se reaquece**, por família de prato: o arroz é o que tem menos folga (um dia), as sopas e os cozidos os que têm mais (quatro). São prazos genéricos e conservadores para sobras refrigeradas a 4 °C ou menos, e a app di-lo — não substituem o cheiro, o aspeto e o bom senso. As sobras no frigorífico passam a viver o prazo do seu prato, e a que estiver mais perto do fim aparece primeiro.

**Pratos quentes e pratos frios.** Um gaspacho e uma feijoada não apetecem no mesmo dia. O género lê-se do nome e dos ingredientes e pesa nas sugestões: no verão português (junho a setembro) os pratos frios ganham vantagem, **sobretudo ao almoço**; fora dele, os quentes.

**🔪 Food prep familiar** — preparação de *ingredientes*, não pratos feitos: demolhar, cozer e porcionar leguminosas, picar cebola e alho, lavar e secar folhas, assar um tabuleiro de legumes, marinar carne, porcionar peixe, cozer ovos. Cada tarefa diz que dias serve, quanto tempo leva e as quantidades já somadas da semana inteira, com convidados e porções em dobro contados. E enquanto estiver ligado, **as receitas que aproveitam uma preparação já planeada ganham vantagem nas sugestões** — é assim que uma tarde de domingo poupa cinco jantares à pressa.

**🌱 Da época, a sério.** Nas sugestões por mesa há um **«Só ingredientes de época»**; nas Receitas, um filtro «da época agora»; e no Plano, um cartão **«Receita da época»** que escolhe uma receita por dia entre as que servem as dietas e alergias da casa, pontuando os ingredientes sazonais, o género do prato para a estação, o que já está na despensa e o que encaixa no food prep. Muda todos os dias e desliga-se nas preferências.

**📅 Plano de Refeições** — pequeno-almoço, almoço, lanche e jantar para cada dia, escolhendo quem come cada refeição, com navegação entre semanas e preenchimento automático. Os **cheat days** marcam-se por pessoa e por dia: quem estiver de folga sai das contas e da lista de compras nesse dia.

**Sugestões para a mesa** — no topo do plano, um painel com um interruptor por membro do agregado: liga-se e desliga-se quem se senta à mesa, e a lista mostra as receitas que servem **toda a gente ligada ao mesmo tempo**. Ficam de fora as que chocam com a dieta de alguém, as que levam um ingrediente que alguém não come e as que passam a fatia de calorias daquela refeição — e o painel diz **quantas caíram por cada motivo**, com os nomes de quem e porquê, porque uma família de quatro que só vê três jantares possíveis merece saber a razão. As quantidades vêm já multiplicadas pelo número de pessoas, e quem tem um teto mais baixo — uma criança à mesa de adultos — aparece com a dose sugerida em vez de a receita desaparecer. Planeia-se num toque, para o dia escolhido, já com os comensais certos.

## Alergias alimentares

Isto não é uma preferência: é uma questão de saúde, e a lista não foi inventada nem arredondada. No perfil de cada membro, no separador Família, há um campo para **alergias e intolerâncias** com as **catorze categorias de declaração obrigatória do anexo II do Regulamento (UE) n.º 1169/2011** — glúten, crustáceos, ovos, peixe, amendoins, soja, leite, frutos de casca rija, aipo, mostarda, sésamo, sulfitos, tremoço e moluscos.

Uma nota sobre a origem, porque a pergunta é natural: **o INSA e o PortFIR publicam a composição dos alimentos, não a lista de alergénios**. Em Portugal não existe lista nacional própria — aplica-se diretamente o anexo II do regulamento europeu, com a **DGAV** como autoridade competente e a **ASAE** como fiscalizadora; o **Decreto-Lei n.º 26/2016** trata da informação nos alimentos não pré-embalados. Foi essa a fonte usada, confirmada no texto consolidado do EUR-Lex e nas páginas das duas autoridades.

Dois pormenores da lei que se erram com facilidade e que a app respeita: os **frutos de casca rija são uma lista fechada de oito** (amêndoa, avelã, noz, caju, noz-pecã, castanha do Brasil, pistácio e macadâmia) — a castanha portuguesa e o pinhão não pertencem à categoria — e o **amendoim é categoria à parte**, por ser leguminosa.

Marcada uma alergia, a receita que a contenha deixa de ser sugerida a essa pessoa e fica assinalada **a vermelho**, dizendo o alergénio e o ingrediente concreto que o traz — «Ana: crustáceos (Camarão)» é mais útil, e mais verificável, do que «não compatível». Filtram-se receitas por «sem X», e na despensa filtram-se **ingredientes** por alergénio, com um símbolo ao lado de cada um que traga algum dos alergénios marcados na casa. O preenchimento automático cede na cozinha e no teto de calorias, mas nunca numa alergia.

A app di-lo onde é preciso: isto ajuda a planear e **não substitui ler o rótulo de cada embalagem nem perguntar num restaurante**.

**Outras exclusões** — ao lado do tipo de dieta, em Nutrição, ficam as que não são alergias: carne, porco, álcool e picante. Filtram as mesmas receitas, sem o mesmo peso. Uma dieta vegetariana, vegan ou paleo acrescenta as suas exclusões sozinha.

**🛒 Compras** — agrega os ingredientes de todas as receitas da semana, multiplicando a quantidade por pessoa pelo número de comensais, e agrupa-os por secção do supermercado. Tem caixas para ir marcando e um botão para copiar a lista.

**⚙️ Dados** — gravação automática a cada alteração, com indicador no cabeçalho a dizer a que horas gravou e se já existe cópia exportada. Exportação para ficheiro `.json` (ou para a folha de partilha do telemóvel, ou para a área de transferência), e restauro em dois modos: **substituir** tudo, ou **juntar** uma cópia à que já existe — útil para combinar o que dois membros preencheram em dispositivos diferentes. Ao fechar o separador com alterações ainda sem cópia, o browser pede confirmação; o aviso pode ser desligado.

---

## Telemóvel, tablet e instalação

A app adapta-se ao ecrã e à forma como se está a segurar o aparelho. Um detetor de orientação marca o documento com o tipo de dispositivo e a orientação, o que permite distinguir um telemóvel deitado (onde a altura é escassa, e por isso o cabeçalho deixa de ser fixo e encolhe) de um tablet deitado (onde há largura a aproveitar, e o plano da semana passa a mostrar mais dias por linha). Ao rodar, a posição de leitura é reposta proporcionalmente, para não se aterrar noutro ponto da página.

Em ecrãs de toque os botões passam a ter 44 px de altura e os campos 16 px de letra, que é o mínimo para o iOS não fazer *zoom* ao tocar num campo. As margens respeitam o *notch* e a barra inferior do iPhone.

É instalável no ecrã principal, no Android e no iOS (partilha → «Adicionar ao ecrã principal»), e funciona **sem rede** — útil para consultar a lista de compras no supermercado. Compatível com Safari, incluindo alternativas para versões anteriores ao Safari 16.4.

---

## Publicar no GitHub Pages

O repositório já está pronto: o `index.html` está na raiz e não precisa de build.

1. Criar um repositório novo no GitHub (por exemplo `familia-fit`) e enviar o código:

```bash
git remote add origin https://github.com/SEU-UTILIZADOR/familia-fit.git
git push -u origin main
```

2. No repositório, ir a **Settings → Pages**, em *Source* escolher **Deploy from a branch**, selecionar a branch `main` e a pasta `/ (root)`, e gravar.

3. Ao fim de um ou dois minutos a aplicação fica disponível em `https://SEU-UTILIZADOR.github.io/familia-fit/`.

Para usar sem GitHub, basta abrir o `index.html` diretamente no browser — funciona igual.

---

## Onde ficam os dados

Tudo o que é introduzido fica guardado apenas no `localStorage` do browser de cada pessoa. Nada é enviado para nenhum servidor, não há contas nem sincronização: cada dispositivo mantém os seus próprios perfis e planos. Limpar os dados do site apaga tudo — e o mesmo endereço aberto no telemóvel e no computador terá conteúdos independentes.

No iPhone e no iPad, o Safari apaga o armazenamento de sites que não são abertos há algumas semanas. Instalar no ecrã principal atenua o problema, mas a única garantia real é exportar uma cópia de vez em quando, no separador **Dados**.

## Notas técnicas

Sem bibliotecas externas, sem build, sem dependências: a aplicação é o `index.html`, acompanhado do ícone, do manifesto e de um service worker de 30 linhas. Isso torna-a compatível com a política de conteúdos do GitHub Pages e utilizável offline. Acompanha o tema claro ou escuro do sistema.

O service worker usa a estratégia *rede primeiro, cache como reserva*: com ligação mostra sempre a versão mais recente, sem ligação serve a última que guardou. Não há por isso versões antigas presas em cache à espera de serem despejadas.

| Ficheiro | Para que serve |
| --- | --- |
| `index.html` | A aplicação inteira |
| `manifest.webmanifest` | Permite instalar no ecrã principal |
| `sw.js` | Funcionamento sem rede |
| `icon.svg`, `icon-180.png`, `icon-512.png` | Ícones (o de 180 px é o do iOS) |

Os valores calóricos, os METs por modalidade e os macros das receitas são **estimativas** para orientar o planeamento. Os METs seguem o *Compendium of Physical Activities*, e o gasto calcula-se por MET × peso × horas — a fórmula habitual, que ignora diferenças de eficiência, altitude ou temperatura. Nada disto substitui o acompanhamento de um nutricionista ou médico, sobretudo em caso de condições de saúde, gravidez ou planos alimentares para crianças.

## Licença

[MIT](LICENSE)
