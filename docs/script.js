const prompts = [
    {
        filename: 'revisao-codigo-seguranca.md',
        title: 'Code Review & Segurança',
        description: 'Analisa código em busca de erros lógicos, falhas de segurança (OWASP) e violações de SOLID.',
        category: 'Dev & Engineering'
    },
    {
        filename: 'revisao-performance-dotnet.md',
        title: 'Performance .NET',
        description: 'Focado em otimização de C#: LINQ, AsNoTracking, alocação de memória e async/await.',
        category: 'Dev & Engineering'
    },
    {
        filename: 'gerador-documentacao-csharp.md',
        title: 'Documentação Técnica',
        description: 'Gera documentação didática e XML Docs profissionais para métodos e classes.',
        category: 'Dev & Engineering'
    },
    {
        filename: 'fluxo-implementacao-feature.md',
        title: 'Execução de Demandas',
        description: 'Cria um plano detalhado de implementação para novas features, com checklist e rollback plan.',
        category: 'Dev & Engineering'
    },
    {
        filename: 'gerador-especificacao-tarefas.md',
        title: 'Especificação de Tarefas',
        description: 'Transforma solicitações vagas em User Stories completas com Critérios de Aceite e Gherkin.',
        category: 'Product & Biz'
    },
    {
        filename: 'cofundador-tecnico-virtual.md',
        title: 'Co-Fundador Técnico',
        description: 'Guia você desde a ideia até o MVP, passando por descoberta e planejamento.',
        category: 'Product & Biz'
    }
];

const gridContainer = document.getElementById('prompt-grid');
const modal = document.getElementById('prompt-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

// Generate Cards
prompts.forEach(prompt => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div>
            <span class="tag">${prompt.category}</span>
            <h3>${prompt.title}</h3>
            <p>${prompt.description}</p>
        </div>
        <div style="font-size: 0.9rem; color: #667eea; margin-top: auto;">Clique para ver o prompt &rarr;</div>
    `;

    card.addEventListener('click', () => openModal(prompt.filename));
    gridContainer.appendChild(card);
});

// Open Modal
async function openModal(filename) {
    modal.classList.add('visible');
    modalBody.innerHTML = '<p style="text-align:center;">Carregando...</p>';

    try {
        const response = await fetch('../' + filename);
        if (!response.ok) throw new Error('Falha ao carregar o prompt.');

        const markdown = await response.text();
        modalBody.innerHTML = marked.parse(markdown);
    } catch (error) {
        modalBody.innerHTML = `<p style="color: #ff4444; text-align: center;">Erro: ${error.message}</p>`;
    }
}

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('visible');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('visible');
    }
});
