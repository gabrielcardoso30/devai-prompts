const prompts = [
    {
        filename: 'revisao-codigo-seguranca.md',
        title: 'Code Review & Segurança',
        description: 'Analisa código em busca de erros lógicos, falhas de segurança (OWASP) e violações de SOLID.',
        category: 'Desenvolvimento & Engenharia de Software',
        subcategory: '🛡️ Qualidade & Segurança'
    },
    {
        filename: 'revisao-performance-dotnet.md',
        title: 'Performance .NET',
        description: 'Focado em otimização de C#: LINQ, AsNoTracking, alocação de memória e async/await.',
        category: 'Desenvolvimento & Engenharia de Software',
        subcategory: '⚡ Performance & Otimização'
    },
    {
        filename: 'gerador-documentacao-csharp.md',
        title: 'Documentação Técnica',
        description: 'Gera documentação didática e XML Docs profissionais para métodos e classes.',
        category: 'Desenvolvimento & Engenharia de Software',
        subcategory: '📚 Documentação & Mentoria'
    },
    {
        filename: 'fluxo-implementacao-feature.md',
        title: 'Execução de Demandas',
        description: 'Cria um plano detalhado de implementação para novas features, com checklist e rollback plan.',
        category: 'Desenvolvimento & Engenharia de Software',
        subcategory: '🗺️ Arquitetura & Fluxo'
    },
    {
        filename: 'gerador-especificacao-tarefas.md',
        title: 'Especificação de Tarefas',
        description: 'Transforma solicitações vagas em User Stories completas com Critérios de Aceite e Gherkin.',
        category: 'Gestão de Produto & Empreendedorismo',
        subcategory: '📋 Especificação & Requisitos'
    },
    {
        filename: 'cofundador-tecnico-virtual.md',
        title: 'Co-Fundador Técnico',
        description: 'Guia você desde a ideia até o MVP, passando por descoberta e planejamento.',
        category: 'Gestão de Produto & Empreendedorismo',
        subcategory: '💡 Estratégia & Discovery'
    },
    {
        filename: 'padrao-commits-conventional.md',
        title: 'Padrão de Commits (Conventional)',
        description: 'Gera mensagens de commit padronizadas baseadas no diff, seguindo Conventional Commits.',
        category: 'Desenvolvimento & Engenharia de Software',
        subcategory: '🏗️ Git & Versionamento'
    }
];

const projectInfo = {
    about: {
        title: '📋 Sobre o Projeto',
        content: `
            <p>Este repositório serve como uma <strong>biblioteca centralizada de comandos (prompts)</strong>
            testados e refinados para otimizar o fluxo de trabalho em desenvolvimento de software e gestão de projetos.</p>
            <p>O objetivo é reduzir o tempo gasto na criação de contextos complexos e fornecer templates que geram respostas de alta qualidade.</p>
        `
    },
    free: {
        title: '💎 Sempre Gratuito',
        content: `
            <p>Acreditamos na democratização do conhecimento técnico. Este projeto é e <strong>sempre será 100% gratuito</strong> para a comunidade.</p>
            <p>Nosso compromisso é manter esta biblioteca aberta, colaborativa e em constante evolução, sem barreiras de acesso.</p>
        `
    },
    motivation: {
        title: '❤️ Por que criamos isso?',
        content: `
            <p>Sabe aquela sensação de olhar para uma tela em branco às 18h de uma sexta-feira, precisando escrever uma documentação técnica perfeita? Ou o peso de herdar um código legado sem nenhum comentário, que parece uma bomba-relógio prestes a explodir na sua mão?</p>
            <p>Nós conhecemos essa dor.</p>
            <p>Criamos este projeto porque cansamos de ver desenvolvedores brilhantes perdendo horas em tarefas repetitivas, lutando contra o bloqueio criativo ou se sentindo sobrecarregados pela complexidade crescente do software moderno.</p>
            <p>Acreditamos que a programação é uma <strong>arte</strong>, e que você deveria gastar sua energia resolvendo problemas complexos de arquitetura, e não formatando strings ou escrevendo <em>boilerplate</em>.</p>
            <p>Estes prompts não são apenas "comandos para o ChatGPT". São <strong>ferramentas de sobrevivência</strong>. São atalhos mentais que transformam ansiedade em produtividade.</p>
            <p>Queremos que você termine seu trabalho mais cedo. Queremos que você sinta orgulho do código que entrega. Queremos que você tenha um "Senior Partner" disponível 24/7 para te ajudar a pensar.</p>
            <p>É por isso que estamos aqui.</p>
        `
    }
};

// DOM Elements
const gridContainer = document.getElementById('prompt-grid');
const tabsContainer = document.getElementById('tabs-container');
const mobileCategoryContainer = document.getElementById('mobile-category-container');
const categorySelect = document.getElementById('category-select');
const modal = document.getElementById('prompt-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

// State
let activeCategory = '';

// Initialize
function init() {
    // Sort prompts alphabetically by title
    prompts.sort((a, b) => a.title.localeCompare(b.title));

    const categories = [...new Set(prompts.map(p => p.category))];
    if (categories.length > 0) {
        activeCategory = categories[0];
        renderTabs(categories);
        renderDropdown(categories); // Mobile Dropdown
        renderPrompts(activeCategory);
    }
}

// Render Tabs (Desktop)
function renderTabs(categories) {
    tabsContainer.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.classList.add('tab-btn');
        if (category === activeCategory) btn.classList.add('active');
        btn.textContent = category;
        
        btn.addEventListener('click', () => {
            activeCategory = category;
            updateUI();
            renderPrompts(activeCategory);
        });
        
        tabsContainer.appendChild(btn);
    });
}

// Render Dropdown (Mobile)
function renderDropdown(categories) {
    categorySelect.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Sync initial value
    categorySelect.value = activeCategory;

    // Event Listener
    categorySelect.addEventListener('change', (e) => {
        activeCategory = e.target.value;
        updateUI();
        renderPrompts(activeCategory);
    });
}

// Sync Tabs and Dropdown UI states
function updateUI() {
    // Update Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.textContent === activeCategory) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Dropdown
    if (categorySelect.value !== activeCategory) {
        categorySelect.value = activeCategory;
    }
}

// Render Prompts for Selected Category
function renderPrompts(category) {
    gridContainer.innerHTML = '';
    
    // Filter prompts for this category only
    const categoryPrompts = prompts.filter(p => p.category === category);
    
    // Get Subcategories for this category
    const subcategories = [...new Set(categoryPrompts.map(p => p.subcategory))];
    
    const subcategoriesGrid = document.createElement('div');
    subcategoriesGrid.classList.add('subcategories-grid');

    subcategories.forEach(subcategory => {
        const subcategoryGroup = document.createElement('div');
        subcategoryGroup.classList.add('subcategory-group');

        // Subcategory Header
        const subcategoryHeader = document.createElement('h3');
        subcategoryHeader.classList.add('subcategory-title');
        subcategoryHeader.textContent = subcategory;
        subcategoryGroup.appendChild(subcategoryHeader);

        // Subcategory Grid
        const subGrid = document.createElement('div');
        subGrid.classList.add('sub-grid');
        
        const filteredPrompts = categoryPrompts.filter(p => p.subcategory === subcategory);
        
        filteredPrompts.forEach(prompt => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div>
                    <h3>${prompt.title}</h3>
                    <p>${prompt.description}</p>
                </div>
                <div style="font-size: 0.9rem; color: #00a9e0; margin-top: auto;">Clique para ver o prompt &rarr;</div>
            `;

            card.addEventListener('click', () => openModal(prompt.filename));
            subGrid.appendChild(card);
        });

        subcategoryGroup.appendChild(subGrid);
        subcategoriesGrid.appendChild(subcategoryGroup);
    });

    gridContainer.appendChild(subcategoriesGrid);
}

// Initialize App
init();


// Open Modal
// Open Modal for Prompts (Markdown)
// Open Modal for Prompts (Markdown)
async function openModal(filename) {
    modal.classList.add('visible');
    modalBody.innerHTML = '<p style="text-align:center;">Carregando...</p>';

    try {
        const response = await fetch('prompts/' + filename);
        if (!response.ok) throw new Error('Falha ao carregar o prompt.');

        const markdown = await response.text();
        
        // Inject Copy Button and Content
        modalBody.innerHTML = `
            <button id="copy-btn" class="copy-btn">📋 Copiar Prompt</button>
            <div class="markdown-content">${marked.parse(markdown)}</div>
        `;

        // Setup Copy Functionality
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(markdown).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✅ Copiado!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar: ', err);
                copyBtn.textContent = '❌ Erro';
            });
        });

    } catch (error) {
        console.error('Erro ao carregar prompt:', error);
        
        let errorMessage = `<p style="color: #ff4444; text-align: center;">Erro: ${error.message}</p>`;
        
        // Check for common local file fetch error (CORS/Protocol)
        if (error.message.includes('Failed to fetch') && window.location.protocol === 'file:') {
            errorMessage = `
                <div style="text-align: center; padding: 1rem;">
                    <h3 style="color: #ff4444; margin-bottom: 0.5rem;">Erro de Segurança do Navegador</h3>
                    <p>Os navegadores bloqueiam o carregamento de arquivos locais (CORS) por motivos de segurança.</p>
                    <p style="margin-top: 1rem;"><strong>Como resolver:</strong></p>
                    <ul style="text-align: left; display: inline-block; margin: 0 auto;">
                        <li>Use uma extensão como <em>Live Server</em> no VS Code.</li>
                        <li>Ou rode um servidor local: <code>python3 -m http.server</code></li>
                        <li>Ou publique no GitHub Pages.</li>
                    </ul>
                </div>
            `;
        }

        modalBody.innerHTML = errorMessage;
    }
}

// Open Modal for Static Info
function openStaticModal(key) {
    const info = projectInfo[key];
    if (!info) return;

    modal.classList.add('visible');
    modalBody.innerHTML = `
        <h2>${info.title}</h2>
        <div class="static-content">${info.content}</div>
    `;
}

// Close Modal
if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('visible');
    }
});

// Setup Navigation Buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            openStaticModal(btn.dataset.target);
        });
    });
});

