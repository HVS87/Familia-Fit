# 🍽️ Família Fit

Ferramenta web para gerir a **alimentação e a atividade física de toda a família**, num único ficheiro HTML sem dependências, servidores ou instalação.

**[▶ Abrir a aplicação](https://SEU-UTILIZADOR.github.io/familia-fit/)** — substituir pelo endereço real depois de ativar o GitHub Pages.

---

## O que faz

**👤 Perfis** — um perfil por membro da família, com sexo, idade, altura e peso. Calcula o índice de massa corporal (com classificação), o metabolismo basal pela fórmula de Mifflin-St Jeor e o gasto energético diário total.

**🏃 Atividade** — nível de atividade do dia-a-dia (de sedentário a trabalho físico pesado), forma de deslocação para o trabalho ou escola (a pé, bicicleta, transportes) e registo de desportos praticados. São 18 modalidades, com horas por dia, por semana ou por mês; as calorias gastas são estimadas por METs (esforço metabólico × peso × horas) e somadas ao gasto basal, com o detalhe de cada parcela visível.

**🍽️ Nutrição** — objetivo de peso (perder, manter, ganhar) que ajusta o alvo calórico, e sete tipos de dieta: equilibrada, mediterrânica, keto, low carb, low fat, paleo e vegetariana. O simulador converte o alvo calórico em gramas de hidratos, proteína e gordura. Inclui 34 receitas filtráveis por cozinha (portuguesa, italiana, francesa, mediterrânica, asiática) e por compatibilidade com a dieta, mais uma secção dedicada às receitas que servem as dietas de **todos os membros ao mesmo tempo**.

**📅 Plano semanal** — almoço e jantar para cada dia, escolhendo quem come cada refeição, com navegação entre semanas e preenchimento automático que só sugere receitas compatíveis com todos os comensais daquela refeição. Os **cheat days** marcam-se por pessoa e por dia: quem estiver de folga sai das contas e da lista de compras nesse dia.

**🛒 Compras** — agrega os ingredientes de todas as receitas da semana, multiplicando a quantidade por pessoa pelo número de comensais, e agrupa-os por secção do supermercado. Tem caixas para ir marcando e um botão para copiar a lista.

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

## Notas técnicas

Um único ficheiro `index.html` com HTML, CSS e JavaScript sem bibliotecas externas, o que o torna compatível com a política de conteúdos do GitHub Pages e utilizável offline. Acompanha o tema claro ou escuro do sistema e adapta-se a ecrãs de telemóvel.

Os valores calóricos, os METs por modalidade e os macros das receitas são **estimativas** para orientar o planeamento. Não substituem o acompanhamento de um nutricionista ou médico, sobretudo em caso de condições de saúde, gravidez ou planos alimentares para crianças.

## Licença

[MIT](LICENSE)
