# 🍽️ Família Fit

Ferramenta web para gerir a **alimentação e a atividade física de toda a família**, num único ficheiro HTML sem dependências, servidores ou instalação.

**[▶ Abrir a aplicação](https://SEU-UTILIZADOR.github.io/familia-fit/)** — substituir pelo endereço real depois de ativar o GitHub Pages.

---

## O que faz

**👤 Perfis** — um perfil por membro da família, com sexo, idade, altura e peso. Calcula o índice de massa corporal (com classificação), o metabolismo basal pela fórmula de Mifflin-St Jeor e o gasto energético diário total.

**🏃 Atividade** — nível de atividade do dia-a-dia (de sedentário a trabalho físico pesado), forma de deslocação para o trabalho ou escola (a pé, bicicleta, transportes) e registo de desportos praticados. São 43 modalidades agrupadas por família, cada uma com **três níveis de intensidade** e o MET correspondente: o ciclismo distingue estrada, montanha, BTT, passeio e estática; a corrida distingue ritmo, trilho e séries; e há pilates, calistenia, ioga, musculação, treino funcional e por aí adiante. As horas indicam-se por dia, semana ou mês, e as calorias são estimadas por METs (esforço metabólico × peso × horas) e somadas ao gasto basal, com o detalhe de cada parcela visível. Entre o nível leve e o intenso o mesmo desporto pode gastar quase o dobro.

**🍽️ Nutrição** — objetivo de peso (perder, manter, ganhar) que ajusta o alvo calórico, e sete tipos de dieta: equilibrada, mediterrânica, keto, low carb, low fat, paleo e vegetariana. O simulador converte o alvo calórico em gramas de hidratos, proteína e gordura, e reparte-o pelas quatro refeições do dia. Inclui 84 receitas filtráveis por refeição, por cozinha (portuguesa, italiana, francesa, mediterrânica, asiática) e por compatibilidade com a dieta, mais uma secção dedicada às receitas que servem as dietas de **todos os membros ao mesmo tempo**. Todas as dietas têm pelo menos três opções em cada refeição.

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
