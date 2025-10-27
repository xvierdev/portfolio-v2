const portfolioData = {
    profile: {
        nome: 'Wesley Xavier',
        cargo: 'Backend Developer | Estudante de Análise e Desenvolvimento de Sistemas',
        resumo: 'EJS | Express | Node.js | Python | Javascript | Java | C# | Git | MySQL',
        imagemUrl: '/img/minha-foto.jpg',
        email: 'wesley.xavier01@fatec.sp.gov.br',
        linkedin: 'https://linkedin.com/in/xvierbr',
        github: 'https://github.com/xvierdev',
        biografia: 'Estudante de Análise e Desenvolvimento de Sistemas (3º Semestre - FATEC) com forte inclinação para o Desenvolvimento Backend.' +
                    'Possuo conhecimento em Python (foco principal de estudo), além de familiaridade com JavaScript, TypeScript e Java.' +
                    'Atualmente, atuo como Estagiário na Vivo, onde aplico habilidades analíticas na análise de dados e na criação de dashboards estratégicos ' +
                    'para suporte à tomada de decisões da liderança. Meu objetivo de carreira é migrar integralmente para o Desenvolvimento Backend. ' +
                    'Sou um entusiasta da área científica e matemática, com planos futuros de cursar a graduação em Matemática e atuar no desenvolvimento e pesquisa ' +
                    'científica. Como paixões intelectuais, dedico-me ao estudo da Filosofia, da busca pelo autoconhecimento, e à exploração de temas como a conscienciologia, o sentido da vida e a espiritualidade.',
    },
    contato: {
        telefone: '(12) 99725-7997',
    },
    formacao: [
        {
            instituicao: 'Fatec Prof. Jessen Vidal',
            curso: 'Técnólogo em Análise e Desenvolvimento de Sistemas',
            periodo: '2024 - 2027',
            descricao: 'O Tecnólogo em Análise e Desenvolvimento de Sistemas cria, projeta, desenvolve e configura programas, ' +
            'softwares e sistemas para inúmeras empresas. Faz auditoria de sistemas para avaliar possíveis erros e falhas. ' +
            'Além disso, o tecnólogo em Análise e Desenvolvimento de Sistemas está apto a prestar consultoria e desenvolver pesquisas.'
        },
        {
            instituicao: 'ETEC Profª Ilza Nascimento Pintus',
            curso: 'Técnico em Desenvolvimento de Sistemas',
            periodo: '2019 - 2021',
            descricao: 'O Técnico em Desenvolvimento de Sistemas é o profissional que desenvolve sistemas computacionais utilizando '+
            'ambientes de desenvolvimento e linguagens de programação específica. Auxilia no dimensionamento de requisitos e funcionalidades ' + 
            'em projetos de sistemas. Realiza testes funcionais de programas de computador e aplicativos. Executa manutenção de programas de computador. ' + 
            'Modela, implementa e mantém bancos de dados.'
        }
    ],
    certificacoes: [
        { nome: 'NDG Linux Unhatched', emissor: 'Cisco Networking Academy' },
        { nome: 'Curso Completo de React.js e Next.js', emissor: 'Udemy' },
    ],
    projetos: [
        {
            titulo: 'Scrum 360 - Plataforma de ensino da metodologia Scrum',
            tecnologias: 'Python, Flask, HTML5, CSS3, JavaScript, Amazon EC2, Git, GitHub',
            descricao: 'O projeto Scrum 360 da equipe UnderDevs é um sistema de aprendizado com o objetivo de ensinar e avaliar o conhecimento sobre ' +
            'a metodologia Scrum e metodologias ágeis.',
            linkGithub: 'https://github.com/davihelisson/FATEC-API-Under_Devs',
            linkDemo: null
        },
        {
            titulo: 'UnderDevs IDE - Ambiente de Desenvolvimento integrado à I.A.',
            tecnologias: 'Java, Ollama, MySQL, Git, Github, Jira Software, Figma, Python.',
            descricao: 'O projeto UnderDevs IDE in Java for Python with AI é um Ambiente Integrado de Desenvolvimento (IDE) construído em Java, ' +
            'cujo objetivo principal é otimizar o tempo e custo de desenvolvimento de código Python através da integração com Inteligência Artificial. ' +
            'A IA (utilizando a API Ollama) auxilia o desenvolvedor com funcionalidades como: Geração de testes unitários, ' +
            'Recomendações personalizadas para melhoria do código (eficiência, segurança, legibilidade), ' +
            'Geração automática de documentação (docstrings e explicações).',
            linkGithub: 'https://github.com/davihelisson/FATEC-API2ADS-UnderDevs',
            linkDemo: null
        }
    ],
    competencias: {
        tecnicas: ['Python', 'SQL (MySQL)', 'Java', 'Git', 'Node.js', 'EJS'],
        interpessoais: ['Resolução de Problemas', 'Comunicação Clara', 'Trabalho em Equipe', 'Proatividade', 'Aprendizagem Contínua', 'Adaptabilidade']
    },
    experiencias: [
        {
            cargo: 'Estagiário de Análise de Dados',
            empresa: 'Vivo (Telefônica Brasil S.A.)',
            periodo: 'Setembro 2025 - Presente',
            descricao: 'Atuo na análise de dados e criação de dashboards estratégicos para suporte à tomada de decisões da liderança. ' +
            'Utilizo ferramentas como Excel Avançado, Power BI e SQL para manipulação e visualização de dados, ' +
            'além de colaborar com equipes multifuncionais para otimizar processos e melhorar a eficiência operacional.'
        },
        {
            cargo: 'Instrutor de Informática, Hardware e Robótica',
            empresa: 'Microcamp São José dos Campos',
            periodo: 'Fevereiro 2021 - Setembro 2025',
            descricao: 'Ministrei aulas de informática com foco em Pacote Office (Word, Excel e PowerPoint), Adobe (Illustrator e Photoshop) e ' + 
            'Programação (Lógica de Programação, Scratch, Projetos Web), hardware e robótica (Introdução â eletricidade, manutenção de computadores desktop' + 
            ' e notebooks, manutenção de celulares, configuração de redes de computadores e projetos de robótica e automação com Arduino) para alunos de diversas faixas etárias. ' +
            'Desenvolvi planos de aula personalizados para atender às necessidades individuais dos alunos, ' +
            'promovendo um ambiente de aprendizado interativo e prático.'
        }
    ]
};

module.exports = portfolioData;