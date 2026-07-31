# 🍽️ Família Fit

Ferramenta web para gerir a **alimentação e a atividade física de toda a família**, num único ficheiro HTML sem dependências, servidores ou instalação.

**[▶ Abrir a aplicação](https://SEU-UTILIZADOR.github.io/familia-fit/)** — substituir pelo endereço real depois de ativar o GitHub Pages.

---

## O que faz

**👤 Perfis** — um perfil por membro da família, com sexo, idade, altura e peso. Calcula o índice de massa corporal (com classificação), o metabolismo basal pela fórmula de Mifflin-St Jeor e o gasto energético diário total.

**🏃 Atividade** — nível de atividade do dia-a-dia (de sedentário a trabalho físico pesado), forma de deslocação para o trabalho ou escola (a pé, bicicleta, transportes) e registo de desportos praticados. São 43 modalidades agrupadas por família: o ciclismo distingue estrada, montanha, BTT, passeio e estática; a corrida distingue ritmo, trilho e séries; e há pilates, calistenia, ioga, musculação, treino funcional e por aí adiante.

Cada modalidade tem a forma de registo que lhe assenta melhor. Nos dez desportos em que **a velocidade é que manda no esforço** — corrida, trilho, caminhada, os quatro tipos de ciclismo ao ar livre, natação, remo e patinagem — indicam-se a **distância e a velocidade em sliders**, e as horas saem daí. O MET é lido de uma curva contínua velocidade → MET, e não de três degraus, pelo que o valor acompanha o slider enquanto se arrasta: o ritmo aparece em min/km, min/100 m ou min/500 m conforme o desporto, e o nível (leve, moderado, intenso) passa a ser uma consequência mostrada, não uma escolha. Nos restantes mantém-se o nível de intensidade pelo teste da conversa.

As calorias são estimadas por METs (esforço metabólico × peso × horas) e somadas ao gasto basal, com o detalhe de cada parcela visível e atualizado ao vivo enquanto se mexe nos sliders.

**Fases da vida** — cada perfil declara a sua fase, e os cálculos mudam com ela. Bebés (de 3 em 3 meses até aos 24), crianças (2–12), adolescentes (13–18) e adultos usam a equação de metabolismo basal apropriada — Schofield abaixo dos 19 anos, Mifflin-St Jeor a partir daí — com a energia de crescimento somada à parte. A gravidez identifica-se com trimestre e número de fetos, usa o peso pré-gestacional como referência e acrescenta a energia do trimestre.

Os macronutrientes deixam de ser os mesmos para todos: cada fase tem a sua faixa aceitável (AMDR), e uma dieta que saia dela — uma cetogénica para uma criança, por exemplo — é encostada aos limites com aviso visível, em vez de ser aplicada como se nada fosse. Num adulto não grávido a faixa é mostrada como referência e a escolha continua a ser dele. Também há proteína recomendada em gramas por quilo e mínimo absoluto de hidratos por fase.

O esforço tem limites próprios: recomendações de volume por idade, teto de horas semanais de desporto organizado em idade pediátrica, limite de intensidade e lista de modalidades desaconselhadas na gravidez, com aviso quando o que está registado as contraria. Défice calórico e projeção de peso ficam indisponíveis em crianças, adolescentes e na gravidez, com a razão explicada. Numa gestação de trigémeos a app não apresenta estimativa nenhuma, porque não existe valor de referência publicado — e di-lo.

Estes números são referências populacionais (Institute of Medicine, Schofield, Organização Mundial de Saúde, ACOG) para planeamento familiar. Não substituem consulta, e a app repete-o em cada ecrã onde isso importa. Abaixo dos 6 meses não gera plano de receitas.

**Idade dos membros** — dois anos é o valor mínimo medido em anos; abaixo disso a idade mede-se sempre em meses (0 a 24), num slider contínuo que troca sozinho de representação exatamente na fronteira, em qualquer direção. Isto interliga diretamente com o módulo do bebé: um perfil deixa de ser "bebé" e ganha o separador de Nutrição normal assim que a idade chega aos 2 anos, sem passos manuais.

**Nutrição do bebé por percentil** — nos perfis de bebé, o separador Nutrição dá lugar a um módulo próprio. As curvas de peso para a idade seguem as tabelas oficiais da Organização Mundial de Saúde (percentis 3 a 97, *WHO Child Growth Standards*, 2006), transcritas diretamente dos PDFs publicados pela OMS, e o bebé aparece assinalado sobre elas — arrastar o slider do peso move o ponto e recalcula tudo. As doses diárias de referência (energia, proteína, hidratos, gordura, água, ferro, cálcio, vitamina D) seguem os relatórios *Dietary Reference Intakes* do Institute of Medicine / National Academies (2001, 2002/2005, 2011); a vitamina D sobe de 400 para 600 UI exatamente na transição de lactente para 1–3 anos, como a própria referência determina — não é um valor único para toda a primeira infância.

O leite tem a sua ferramenta: modo (materno, fórmula, misto, leite + sólidos), sliders de tomadas por dia e volume por tomada — que parte das necessidades de energia (67 kcal/100 ml, o valor clássico de 20 kcal/onça, dentro do intervalo do Codex Alimentarius) e é comparado com uma referência de ml/kg que desce com a idade, em vez de um patamar fixo para todo o primeiro ano. Na fórmula, a app dá o volume de água necessário mas **não inventa um número de medidas de pó** — o peso de cada medida varia por marca, e apresentar uma conversão calculada seria uma falsa precisão arriscada; a instrução é sempre seguir a tabela da própria embalagem. O horário das tomadas gera-se com dois sliders (intervalo de 2 a 6 horas e hora da primeira toma) e desenha-se numa linha do dia com a noite sombreada. A partir dos 6 meses, um slider reparte a energia entre leite e sólidos e o dia é sugerido em refeições, com as regras do primeiro ano à vista: sem sal, sem açúcar, sem mel, seguindo o manual *Alimentação Saudável dos 0 aos 6 anos* da Direção-Geral da Saúde.

Todos os números deste módulo passaram por uma auditoria de fontes: cada valor foi confirmado (ou corrigido) contra o documento oficial de origem — OMS, Institute of Medicine, Codex Alimentarius/ESPGHAN e, para as recomendações portuguesas, normas da Direção-Geral da Saúde — em vez de se assumir que uma primeira estimativa estava certa.

**🍽️ Nutrição** — objetivo de peso (perder, manter, ganhar) que ajusta o alvo calórico, e sete tipos de dieta: equilibrada, mediterrânica, keto, low carb, low fat, paleo e vegetariana. O simulador converte o alvo calórico em gramas de hidratos, proteína e gordura, e reparte-o pelas quatro refeições do dia.

**🍳 Receitas** — separador próprio com as 84 receitas, filtráveis por refeição, por cozinha (portuguesa, italiana, francesa, mediterrânica, asiática) e por compatibilidade com a dieta de cada membro, mais a secção das receitas que servem as dietas de **todos ao mesmo tempo**. Cada receita mostra os ingredientes com o estado da despensa — ✓ verde para o que já tens em casa, ✗ vermelho para o que falta — e uma etiqueta-resumo que diz «Pronta a cozinhar» quando não falta nada.

**🥫 A minha despensa** — inventário de ingredientes com pesquisa, agrupado por secção do supermercado. O catálogo deriva sempre das próprias receitas (nunca texto livre), pelo que um nome na despensa bate sempre certo com o das receitas. Marcar um item como comprado na lista de compras acrescenta-o automaticamente à despensa; desmarcar não o remove, porque um clique a mais no supermercado não significa que a prateleira ficou vazia.

Nas Compras, além da lista completa da semana, há o cartão **«O que falta comprar»**: a lista da semana menos o que já está na despensa. É essa que se exporta — pelo menu de partilha do telemóvel (que permite escolher Google Keep, Apple Reminders/Lembretes ou qualquer outra app) ou por cópia para a área de transferência, com cada linha a começar por ☐ para servir de checklist. A app não escreve diretamente no Keep nem nos Lembretes — nenhuma página web o pode fazer sem contas e autorizações — mas o menu de partilha nativo leva lá a lista em dois toques.

Todas as dietas têm pelo menos três opções em cada refeição.

**🎯 Objetivos** — cria uma estratégia de peso para um ou vários membros: escolhe quem, quantos quilos e em quantas semanas (ou, para manter, durante quanto tempo e com que margem), e a app calcula o défice ou o excedente diário necessário e reparte-o entre a dieta e o exercício. Ao criar, isso é logo aplicado — o objetivo calórico da Nutrição muda e o desporto escolhido ganha as horas extra necessárias, num registo já existente ou num novo.

O equilíbrio entre dieta e exercício é um slider contínuo (mais dieta pede menos esforço físico extra; mais exercício permite comer com menos restrição), com atalhos para "mais dieta", "equilibrado" e "mais exercício", e pode ser reajustado mais tarde a partir do próprio objetivo, sem o recriar. Perfis em crescimento ou grávidas nunca recebem um objetivo de défice — só de manutenção ou ganho, com a razão explicada.

Cada objetivo mostra um anel de progresso, calculado a partir do peso atual do membro desde que o objetivo foi criado — sem precisar de um histórico à parte. A cor do anel reflete o ritmo real, não só o progresso: fica amarelo ou vermelho quando o peso perdido está a ficar para trás do tempo já passado. Ao atingir um objetivo, a app celebra com um cartão festivo, e o objetivo passa para uma secção de **Conquistas**, que fica como registo do que já foi alcançado.

**📅 Plano semanal** — pequeno-almoço, almoço, lanche e jantar para cada dia, escolhendo quem come cada refeição, com navegação entre semanas e preenchimento automático que só sugere receitas do tipo certo e compatíveis com todos os comensais daquela refeição. Os **cheat days** marcam-se por pessoa e por dia: quem estiver de folga sai das contas e da lista de compras nesse dia.

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
