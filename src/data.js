// Conteúdo do portfólio — extraído da página "Professional Portfolio" no Notion.
// Para atualizar o site, basta editar este arquivo.

export const profile = {
  name: 'Giovanni Bolsoni Fernandes',
  shortName: 'Giovanni Bolsoni',
  roles: ['Desenvolvedor Full Stack em Progresso', 'Suporte Técnico', 'Analista de Sistemas'],
  location: 'São Paulo, SP',
  email: 'giovannibolsoni502@gmail.com',
  photo: '/profile.jpg',
  objective: 'Analista de Sistemas, Suporte Técnico ou Desenvolvedor Web Front-end',
  summary: [
    'Comecei minha carreira em suporte técnico e atendimento, onde passei mais de 2 anos resolvendo incidentes sob SLA, documentando soluções via metodologia KCS e sendo o elo entre times técnicos e clientes. Foi ali que desenvolvi raciocínio analítico e visão de negócio.',
    'Hoje aplico essa mesma lógica de resolução de problemas para me tornar um futuro desenvolvedor Full-Stack, construindo interfaces com React, JavaScript, HTML5, CSS3 e Python, unindo base técnica sólida a uma postura organizada e orientada a resultado.',
  ],
}

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/giovanni-bolsoni/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/GiovanniBolsoni', icon: 'github' },
  { label: 'Instagram', href: 'https://www.instagram.com/_bolsoni_/', icon: 'instagram' },
]

export const skills = [
  { group: 'Linguagens', items: ['HTML', 'CSS', 'JavaScript', 'Python'] },
  { group: 'Frameworks', items: ['React', 'Bootstrap', 'Flask'] },
  { group: 'Build & Hosting', items: ['Vite', 'Vercel', 'GitHub'] },
  { group: 'Dados & Cloud', items: ['Supabase', 'AWS Cloud Practitioner'] },
  { group: 'Versionamento', items: ['Git', 'GitHub'] },
  { group: 'Produtividade', items: ['Microsoft Office', 'Notion', 'Jupyter'] },
  { group: 'Ambiente', items: ['VS Code', 'Windows', 'Claude Code', 'Antigravity'] },
]

export const experiences = [
  {
    company: 'Linx Stone Co Tecnologia e Varejo',
    role: 'Operador de Suporte de Hardware/Software e Redes',
    period: 'Nov/2023 — Fev/2025',
    tags: ['Salesforce', 'TeamViewer', 'SLA', 'PDV', 'Redes'],
    bullets: [
      'Atendimento e gestão de chamados técnicos no Salesforce, com priorização por SLA e resolução eficiente de incidentes.',
      'Suporte remoto via TeamViewer, com diagnóstico e correção de falhas em sistemas, redes e equipamentos.',
      'Análise e resolução de problemas em sistemas de varejo (PDV): erros de autenticação, instabilidade e falhas de integração.',
      'Uso do console do navegador (F12) para identificar erros técnicos de HTTP, scripts e requisições.',
      'Registro e documentação de incidentes, contribuindo para a melhoria contínua e prevenção de recorrências.',
      'Interface com equipes internas para escalonamento e resolução de problemas mais complexos.',
    ],
  },
  {
    company: 'Via Local Multimarcas Ltda.',
    role: 'Analista de Estoque e E-commerce Automotivo',
    period: 'Set/2022 — Nov/2023',
    tags: ['CRM BNDV', 'Marketplaces', 'Kanban', 'Leads'],
    bullets: [
      'Gestão de estoque via CRM BNDV, responsável por todo o fluxo de entrada e saída de veículos.',
      'Catalogação técnica de veículos (itens de série, opcionais e estado de conservação) para alimentar as plataformas.',
      'Publicação multicanal de anúncios em Webmotors, iCarros, OLX, Mobiauto e site próprio através do integrador BNDV.',
      'Qualificação de leads comerciais no CRM, com pipeline em Kanban e acompanhamento de oportunidades até a conversão.',
      'Atendimento ao cliente por telefone, WhatsApp, e-mail e presencialmente, incluindo agendamento de visitas.',
      'Fotografia de veículos para anúncios e redes sociais, e relatórios de condição para apoiar decisões gerenciais.',
    ],
  },
]

export const education = {
  course: 'Análise e Desenvolvimento de Sistemas (ADS)',
  institution: 'Universidade São Judas Tadeu',
  status: 'Concluída',
  description:
    'Formação focada em Engenharia de Software e Desenvolvimento Full-Stack. Sólidos conhecimentos em Lógica de Programação, Orientação a Objetos (Java), Modelagem de Dados SQL e Metodologias Ágeis, com capacidade técnica para análise de requisitos e entrega de soluções escaláveis.',
  subjects: [
    'Modelos, Métodos e Técnicas da Engenharia de Software',
    'Gestão e Qualidade de Software',
    'Modelagem de Software',
    'Programação de Soluções Computacionais',
    'Usabilidade, Desenvolvimento Web, Mobile e Jogos',
    'Sistemas Distribuídos e Mobile',
  ],
}

export const currentStudies = [
  { title: 'Python com Framework', org: 'SENAI' },
  { title: 'Desenvolvimento de Aplicações com IA Generativa utilizando Google Antigravity', org: 'SENAI' },
]

export const certifications = [
  {
    title: 'AWS Cloud Quest: Praticante de IA Generativa',
    org: 'AWS',
    year: 2026,
    hours: '12h',
    category: 'Cloud',
    description: 'Soluções de IA generativa com Amazon Bedrock e Amazon Q: engenharia de prompt, foundation models, IA responsável e fine-tuning.',
  },
  {
    title: 'AWS Cloud Quest: Cloud Practitioner',
    org: 'AWS',
    year: 2026,
    hours: '12h',
    category: 'Cloud',
    description: 'Curso prático e gamificado sobre infraestrutura, segurança, armazenamento, bancos de dados, redes e serviços essenciais da AWS.',
  },
  {
    title: 'AWS Academy Graduate — Cloud Foundations',
    org: 'AWS Academy',
    year: 2026,
    hours: '20h',
    category: 'Cloud',
    description: 'Fundamentos de computação em nuvem: arquitetura, segurança, redes, bancos de dados, escalabilidade e gerenciamento de recursos.',
  },
  {
    title: 'Implantação de Serviços em Nuvem — AWS Cloud Practitioner Foundational',
    org: 'SENAI',
    year: 2026,
    hours: '40h',
    category: 'Cloud',
    description: 'IaaS, PaaS e SaaS na AWS: redes, máquinas virtuais, web servers, armazenamento, segurança e monitoramento de ambientes cloud.',
  },
  {
    title: 'Desenvolvimento em JavaScript',
    org: 'SENAI',
    year: 2026,
    hours: '60h',
    category: 'Desenvolvimento',
    description: 'Programação JavaScript no lado do cliente: páginas web interativas, animações, jogos e aplicações web.',
  },
  {
    title: 'Claude Code 101 — Desenvolvimento Assistido por IA',
    org: 'Anthropic',
    year: 2026,
    hours: '1h',
    category: 'IA',
    description: 'IA como assistente no desenvolvimento de software: interação com código, automação de tarefas e uso de agentes.',
  },
  {
    title: 'Claude 101 — Fundamentos do Claude',
    org: 'Anthropic',
    year: 2026,
    hours: '1h',
    category: 'IA',
    description: 'Uso eficiente do Claude: fundamentos, elaboração de instruções e principais recursos de produtividade.',
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    org: 'Anthropic',
    year: 2026,
    hours: '4h',
    category: 'IA',
    description: 'Colaboração humano-IA, IA generativa, prompting e o framework 4D: Delegation, Description, Discernment e Diligence.',
  },
  {
    title: 'AI Fluency for Students',
    org: 'Anthropic',
    year: 2026,
    hours: '3h',
    category: 'IA',
    description: 'Uso responsável e estratégico de IA em contextos acadêmicos e profissionais, com pensamento crítico e o humano no controle.',
  },
  {
    title: 'Fundamentos de TI: Hardware e Software',
    org: 'Fundação Bradesco',
    year: 2026,
    hours: '7h',
    category: 'Fundamentos',
    description: 'Conceitos essenciais de hardware, software, sistemas operacionais e componentes de um computador.',
  },
  {
    title: 'Desenvolvedor Web Front-End 1: HTML e CSS',
    org: 'Senac Tatuapé',
    year: 2023,
    hours: '60h',
    category: 'Desenvolvimento',
    description: 'HTML5 e CSS3: estruturação semântica, estilização visual, responsividade e boas práticas de marcação.',
  },
  {
    title: 'Lógica de Programação',
    org: 'Senac Tatuapé',
    year: 2023,
    hours: '40h',
    category: 'Fundamentos',
    description: 'Algoritmos, variáveis, tipos de dados, estruturas condicionais e de repetição.',
  },
  {
    title: 'Básico em Computação — Windows e Office 2019',
    org: 'Senac Vila Prudente',
    year: 2022,
    hours: '75h',
    category: 'Fundamentos',
    description: 'Windows e Pacote Office (Word, Excel e PowerPoint) para produtividade no ambiente profissional.',
  },
]

export const languages = [
  { name: 'Português', level: 'Nativo / Fluente', value: 100 },
  { name: 'Inglês', level: 'Intermediário', value: 60 },
  { name: 'Italiano', level: 'Básico', value: 25 },
]
