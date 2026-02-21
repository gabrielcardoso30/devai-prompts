# Prompt genérico (super detalhado) para analisar um PDF de descrição de projeto de sistema

> **Como usar:** cole este prompt em um chat com IA e **anexe o PDF** (ou cole o texto extraído do PDF).  
> **Objetivo:** gerar uma análise completa (produto + requisitos + arquitetura + riscos) e um **backlog estimado em horas** por disciplina (UX/UI, Front-end, Back-end, Integração, QA).

---

## INSTRUÇÕES PARA A IA

Você é um(a) **Arquiteto(a) de Software + Analista(a) de Produto + Tech Lead + PO**.  
Analise o PDF fornecido (descrição de um projeto de sistema) e produza uma resposta **extremamente detalhada**, estruturada e acionável.

### Regras e qualidade
1. **Baseie-se somente no conteúdo do PDF**. Quando algo não estiver explícito, **informe que é inferência** e explique o porquê.
2. Liste **assunções** separadamente e marque-as como **(ASSUNÇÃO)**.
3. Liste **dúvidas** separadamente e marque-as como **(DÚVIDA)**.
4. Se houver trechos contraditórios, registre **(CONFLITO)** e proponha resolução.
5. Use linguagem clara, com exemplos. Para público não técnico, inclua uma versão resumida.
6. Sempre que possível, gere **artefatos**: listas, tabelas, fluxos, critérios de aceite, matriz de risco, backlog, estimativas.
7. Se o PDF não tiver detalhes suficientes, ainda assim produza um resultado completo com:
   - o que dá para afirmar com segurança,
   - o que precisa ser definido,
   - e um backlog “mínimo viável” para validar o projeto (MVP).

---

## SAÍDA ESPERADA (formato obrigatório)

### 0) Metadados da análise
- Nome do projeto (se houver):
- Versão/data do documento (se houver):
- Autor/organização (se houver):
- Contexto (1–2 frases):
- Grau de completude do PDF (0–100%):
- Lista rápida de lacunas críticas (bullet points):

---

# 1) Visão geral do projeto (O que é o projeto)
Explique:
- **Problema** que o projeto resolve
- **Proposta de valor**
- **Benefícios esperados**
- **Principais funcionalidades (alto nível)**
- **O que NÃO é o projeto** (se houver indícios)

Inclua:
- Resumo para **não técnicos** (máx. 10 linhas)
- Resumo para **técnicos** (máx. 10 linhas)

---

# 2) Objetivos de negócio e KPIs (Business Goals)
Identifique e detalhe:
- Objetivos de negócio (redução de custo, ganho de eficiência, escala, compliance etc.)
- Métricas/KPIs sugeridos (mesmo que não estejam explícitos) com:
  - Definição do KPI
  - Como medir
  - Frequência de coleta
  - Meta inicial sugerida (ASSUNÇÃO se necessário)

Exemplos de KPIs (ajuste ao contexto do PDF):
- Tempo médio por operação
- Redução de retrabalho
- Taxa de erros
- Adoção ativa (DAU/MAU) se for produto
- Tempo de resposta / performance

---

# 3) Público-alvo, personas e papéis (RBAC)
Mapeie:
- Quem usa o sistema (interno/externo)
- Personas / perfis de usuário
- Papéis e permissões (RBAC), incluindo:
  - O que cada perfil pode ver/fazer
  - Restrições de dados (ex: multitenancy, dados sensíveis)

**Saída:**
- Tabela: Persona | Objetivo | Dores | Funcionalidades-chave | Permissões

---

# 4) Escopo (In Scope / Out of Scope) + Fases (MVP vs Futuro)
Produza:
- O que está **dentro** do escopo (In Scope)
- O que está **fora** do escopo (Out of Scope)
- Divisão por fases:
  - **MVP (Fase 1)**
  - **Fase 2**
  - **Fase 3 / Roadmap futuro**

**Saída:**
- Lista priorizada por impacto x esforço (se possível)
- Indicação do que é dependência/risco

---

# 5) Analogia didática (para entendimento rápido)
Crie **2–3 analogias** para explicar o sistema para:
1) pessoa não técnica  
2) equipe técnica  
3) stakeholder de negócio  

Cada analogia deve conter:
- “Isso é como…”
- Mapeamento de elementos (ex: “usuário = cliente”, “fluxo = esteira”, etc.)
- Limitações da analogia (onde ela falha)

---

# 6) Jornadas e fluxos do sistema (User Flows)
Extraia e/ou derive:
- Fluxos principais (happy path)
- Fluxos alternativos
- Fluxos de exceção/erro
- Estados do sistema (ex: “rascunho”, “publicado”, “cancelado”)

**Saída obrigatória:**
- Lista de fluxos com passos numerados
- Para cada fluxo: entrada, saída, regras, validações, mensagens ao usuário
- Se possível: um pseudo-diagrama em texto (ex: Mermaid em bloco opcional)

---

# 7) Requisitos funcionais (RF)
Liste e detalhe:
- Requisitos por módulo
- Regras de negócio associadas
- Validações
- Permissões
- Resultados esperados

**Saída:**
- Tabela: ID | Requisito | Descrição | Prioridade (MoSCoW) | Dependências | Observações

---

# 8) Requisitos não funcionais (RNF) — obrigatório
Identifique e proponha (se não houver no PDF):
- Performance (p95, p99, throughput, latência)
- Escalabilidade (horizontal/vertical)
- Disponibilidade (SLA)
- Segurança (autenticação, autorização, OWASP, criptografia, LGPD)
- Observabilidade (logs, métricas, tracing)
- Auditoria (trilha de auditoria)
- Usabilidade (acessibilidade, responsividade)
- Compatibilidade (browsers, mobile, etc.)
- Manutenibilidade e testabilidade
- Backup/restore e retenção
- Internacionalização/locale (se aplicável)

**Saída:**
- Tabela: Categoria | Requisito | Como validar/testar | Nível (MVP/Futuro) | Observações

---

# 9) Estrutura do sistema (como será estruturado)
Descreva de forma clara:
- Visão de módulos (ex: Admin, Operação, Relatórios, Configurações, Integrações)
- Componentes (front, back, banco, cache, filas, storage)
- Limites de contexto (Bounded Contexts) se fizer sentido
- Dependências internas

**Saída:**
- Mapa de módulos + responsabilidades
- Lista de APIs internas/externas por módulo (se aplicável)

---

# 10) Arquitetura técnica (sugerida ou implícita)
Explique:
- Estilo arquitetural (monolito modular, microserviços, event-driven, etc.)
- Padrões (Clean Architecture, DDD, CQRS, etc.)
- Comunicação (REST, gRPC, mensageria)
- Estratégia de dados (SQL/NoSQL, cache, índices)
- Estratégia de estado (stateless, sessões)
- Estratégia de deploy (containers, CI/CD)

**Saída:**
- Desenho textual de arquitetura (componentes e conexões)
- Lista de decisões arquiteturais com prós/contras (ADR-resumido)

---

# 11) Domínio e modelo de dados (Entidades)
Extraia ou proponha:
- Entidades principais
- Campos relevantes
- Relacionamentos
- Regras de integridade
- Enumerações/status

**Saída:**
- Dicionário de dados (tabela por entidade)
- Regras de negócio por entidade
- Sugestão de tabelas/índices (se fizer sentido)

---

# 12) Integrações externas e contratos
Mapeie:
- Sistemas externos (ERP, gateways, autenticação, etc.)
- Tipo de integração (REST/SOAP, webhook, fila)
- Autenticação/segurança da integração
- Dados trafegados (entrada/saída)
- Erros e retentativas
- SLA e limites (rate limit)

**Saída:**
- Tabela: Integração | Objetivo | Método | Auth | Payload | Erros | Observações

---

# 13) Autenticação, autorização e compliance (LGPD)
Detalhe:
- Login/SSO (se houver)
- RBAC/ABAC (regras de acesso)
- Dados sensíveis e política de acesso
- LGPD: base legal, consentimento, retenção, anonimização (se aplicável)

**Saída:**
- Matriz: Perfil x Permissão x Módulo
- Lista de riscos LGPD e mitigação

---

# 14) Auditoria, logs e rastreabilidade
Defina:
- O que deve ser auditado (ações críticas)
- Estrutura mínima do registro (quem, quando, o quê, antes/depois)
- Requisitos de retenção e busca
- Observabilidade (logs estruturados, métricas, tracing)

**Saída:**
- Checklist de eventos auditáveis
- Exemplo de evento de auditoria (JSON ilustrativo)

---

# 15) Critérios de aceite e Definition of Done
Para os principais requisitos, produza:
- Critérios de aceite (Given/When/Then)
- Definition of Done (DoD) por tipo de tarefa (UX/FE/BE/QA)

**Saída:**
- Lista de critérios por requisito-chave
- Checklist DoD

---

# 16) Impedimentos, observações e dependências
Extraia:
- Impedimentos explícitos do PDF
- Dependências técnicas/negócio
- Restrições (prazo, tecnologia, legado, equipe, compliance)

**Saída:**
- Lista priorizada (impacto)
- Mitigações propostas

---

# 17) Riscos do projeto (matriz)
Crie uma matriz com:
- Risco
- Probabilidade (Baixa/Média/Alta)
- Impacto (Baixo/Médio/Alto)
- Severidade (PxI)
- Mitigação
- Plano de contingência

---

# 18) Backlog de tarefas (super detalhado) + estimativas em horas por disciplina
Crie um backlog organizado por épicos e histórias, com:
- **Épicos**
- **Features**
- **User Stories** (formato: “Como [persona], quero [ação], para [benefício]”)
- **Tarefas técnicas** (FE/BE/Infra)
- **Critérios de aceite**
- **Dependências**
- **Riscos**
- **Estimativa em horas** separada por:
  - UX/UI
  - Front-end
  - Back-end
  - Integração (entre front e back / contratos / ajustes)
  - QA

### Regras de estimativa
- Informar se é estimativa **conservadora** ou **agressiva**
- Sempre citar premissas (ASSUNÇÃO)
- Separar MVP vs Futuro (se possível)
- Identificar itens que precisam de **spike** (pesquisa técnica)

**Saída obrigatória:**
1) **Tabela de backlog**  
   - ID | Épico | História/Tarefa | Descrição | Dependências | Critérios de aceite | UX | FE | BE | INT | QA | Total | Observações

2) **Resumo por disciplina**  
   - UX total (h)
   - Front-end total (h)
   - Back-end total (h)
   - Integração total (h)
   - QA total (h)
   - Total geral (h)

3) **Resumo por fase**
   - MVP (h) + itens
   - Fase 2 (h) + itens
   - Fase 3 (h) + itens

---

# 19) Plano de releases e estratégia de validação
Proponha:
- Release 0 (descoberta): protótipo + validação
- Release 1 (MVP): valor mínimo
- Release 2+: expansão

Inclua:
- O que medir em cada release (KPIs)
- Como coletar feedback (analytics, entrevistas, logs)

---

# 20) Perguntas finais (dúvidas essenciais)
Liste as **10–20 perguntas** mais importantes para fechar o escopo e reduzir risco, por exemplo:
- Qual é o SLA?
- Quais integrações são obrigatórias no MVP?
- Quem aprova regras/fluxos?
- Existe multitenancy?
- Quais dados são LGPD?
- Volume de usuários/requests?

---

## FORMATO DE APRESENTAÇÃO
- Use **títulos numerados** exatamente como acima.
- Use tabelas onde indicado.
- Seja detalhista, mas objetivo: priorize o que muda decisões.
- Se o documento tiver termos confusos, crie um **glossário** ao final.

---

## BÔNUS (opcional, se fizer sentido pelo conteúdo do PDF)
### A) Glossário de termos
### B) Lista de ADRs (decisões arquiteturais) sugeridas
### C) Lista de endpoints (rascunho) por módulo
### D) Matriz CRUD por entidade e módulo
