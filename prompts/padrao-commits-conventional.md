Gere UMA mensagem de commit clara, específica e informativa com base no diff
fornecido. Siga *Conventional Commits* e escreva em **português do Brasil**.

OBJETIVO
- Refletir fielmente TUDO que foi alterado (quando houver várias mudanças).
- Título conciso (<= 100 chars). Corpo só se agregar valor, quebrado a 100 chars.
- Nada de blocos de código, emojis ou aspas externas.

FORMATO
<tipo>(<escopo>): <descrição>
[linhas de corpo opcionais, com quebras a 100 chars]
[rodapés opcionais]

TIPOS (escolha com precisão; se houver mais de um tipo relevante, liste até 2 separados por vírgula, na ordem de importância)
- feat: nova funcionalidade (visível ou comportamento novo)
- fix: correção de bug
- refactor: mudança de código que não corrige bug nem adiciona feature
- perf: melhoria de desempenho
- docs: documentação/comentários/XMLDoc
- style: formatação, lint, nomes (sem impacto funcional)
- test: adição/ajuste de testes
- chore: manutenção, deps, build, CI/CD, configs
- build: alterações de empacotamento/build
- ci: pipeline/automatizações

ESCOPO
- Substantivo curto que identifique a área primária impactada.
- Preferir o diretório ou módulo dominante do diff (ex.: core, api, httpclient,
  middleware, config, infra, auth, swagger, db, ci, build).
- Se houver múltiplas áreas e nenhuma for dominante, use um termo agregador
  como: global, app, multi.

DESCRIÇÃO (TÍTULO)
- Voz ativa e tempo presente: "adiciona", "corrige", "refatora"...
- Comece com letra minúscula, sem ponto final.
- Envolva nomes de arquivos, símbolos e números com crases (`).
- Deve dizer o que foi feito + o foco principal. <= 100 caracteres.

CORPO (OPCIONAL, MAS RECOMENDADO SE HOUVER MÚLTIPLAS MUDANÇAS)
- Liste itens objetivos, agrupando por área/tema. Use marcadores com "- ".
- Explique o que mudou, por que e impacto (compatibilidade/comportamento).
- Quebre linhas a cada 100 chars.
- Se houver várias naturezas de mudança, reflita TODAS em bullets separados.
- Use identificadores concretos: nomes de classes, métodos, arquivos e chaves
  de config. Evite frases genéricas.

REGRAS ESPECIAIS PARA COMMITS MISTOS
1) Se o diff contiver várias naturezas de mudança (ex.: converter decimal,
   ordem de middlewares, opções JSON, aprimoramento middleware de erro,
   robustez do httpclient), faça:
   - Escolha até DOIS tipos (ex.: "feat,refactor" ou "refactor,fix").
   - Use um escopo agregador (ex.: "core" ou "global") OU o escopo dominante.
   - No corpo, crie bullets por TEMA, por exemplo:
     - conversores JSON
     - opções globais de JSON em `Program.cs`
     - ordem de middlewares
     - middleware global de erro
     - cliente HTTP externo (`LojaConceito`)
2) Se houver mudança potencialmente quebrável, inclua rodapé:
   - BREAKING CHANGE: <descrição curta>
3) Se o diff mencionar issues/PRs, inclua rodapés:
   - Refs: #123, #456
   - Closes: #789

ALGORITMO DE DECISÃO (RESUMO)
- Detecte temas pelo conteúdo do diff:
  * Se adicionar `JsonConverter` p/ `decimal`/`decimal?` => tema "conversores JSON"
    e tipo "feat" (se habilita suporte novo) ou "refactor" (se apenas troca técnica).
  * Se alterar `Program.cs` (ordem middlewares ou `AddJsonOptions`) => tema "config".
  * Se aprimorar `ErrorHandlerMiddleware` => tema "middleware de erro", tipo "refactor"
    ou "fix" se corrigir mapeamentos/códigos incorretos.
  * Se endurecer `LojaConceitoHttpClient` (logs do payload bruto, tratamento de
    Content-Type, `AllowReadingFromString`, timeouts etc.) => tema "httpclient"
    e tipo "refactor" ou "fix" (se corrigiu erro), ou "perf" se otimização clara.
- Defina o TÍTULO pelo impacto mais relevante ao usuário/sistema.
- No CORPO, cubra todas as demais mudanças em bullets curtos e técnicos.

SAÍDA
- Produza a mensagem final de commit seguindo as regras acima.
- Uma única mensagem, sem blocos de código.
- Título <= 100 chars. Corpo com quebras a 100 chars.
- Em português do Brasil.

DIFERENÇA (git diff --staged)
{diff}

EXEMPLOS ILUSTRATIVOS (NÃO COPIAR À RISCA; APENAS GUIA)
1)
refactor,fix(global): melhora robustez de json e tratamento de erros
- adiciona conversores para `decimal` e `decimal?` com suporte a string e vírgula
- configura `AddJsonOptions` e registra conversores globalmente
- ajusta ordem de middlewares no `Program.cs` para captura consistente
- aprimora `ErrorHandlerMiddleware` (mapeamento de status, traceId, logs)
- endurece `LojaConceitoHttpClient` (content-type, payload bruto, path de erro)

2)
feat(core): suporte a conversores decimais flexíveis e json global
- registra conversores para `decimal`/`decimal?` e `AllowReadingFromString`
- documenta e aplica quebras a 72 colunas nas mensagens de erro
- reorganiza middlewares e localiza `UseErrorHandlerMiddleware` cedo no pipeline
- melhora diagnóstico e respostas do httpclient `XPTO`
