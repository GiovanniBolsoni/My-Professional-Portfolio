export const hostname = "giovanni";

export interface Profile {
  name: string;
  shortName: string;
  roles: string[];
  location: string;
  email: string;
  photo: string;
  resumePdf: string;
  objective: string;
  summary: string[];
}

export interface Social {
  label: string;
  href: string;
  icon: string;
  monochrome?: boolean;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  tags: string[];
  bullets: string[];
}

export interface Education {
  course: string;
  institution: string;
  status: string;
  description: string;
  subjects: string[];
}

export interface Study {
  title: string;
  org: string;
}

export interface Certification {
  title: string;
  org: string;
  year: number;
  hours: string;
  category: string;
  description: string;
  image?: string;
  pdf?: string;
}

export interface Language {
  name: string;
  level: string;
  value: number;
}

export interface Project {
  title: string;
  description: string;
  tech: string;
  url: string;
  image?: string;
  architectureUrl?: string;
}

export const profile: Profile = {
  name: 'Giovanni Bolsoni Fernandes',
  shortName: 'Giovanni Bolsoni',
  roles: ['Desenvolvedor Full-Stack', 'Suporte Técnico', 'Analista de Sistemas', 'Analista de CRM'],
  location: 'São Paulo, SP',
  email: 'giovannibolsoni502@gmail.com',
  photo: '/profile.jpg',
  resumePdf: '/curriculo-giovanni-bolsoni.pdf?v=2026-10-04',
  objective: 'Desenvolvedor Full-Stack, Suporte Técnico, Analista de Sistemas ou Analista de CRM',
  summary: [
    'Comecei minha carreira em <strong>suporte técnico e CRM</strong>, onde passei mais de 2 anos resolvendo incidentes sob SLA, documentando soluções via metodologia <strong>KCS</strong> e sendo o elo entre times técnicos e clientes. Foi ali que desenvolvi raciocínio analítico, comunicação assertiva e visão de negócio para times ágeis.',
    'Hoje, formado em <strong>Análise e Desenvolvimento de Sistemas</strong>, atuo como Desenvolvedor <strong>Full-Stack</strong>, com domínio prático de <strong>HTML5, CSS3, JavaScript, React, Python e Flask</strong> aplicados em projetos reais, unindo base técnica sólida a uma postura organizada e orientada a resultado.',
  ],
};

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/GiovanniBolsoni', icon: '/icons/github.svg', monochrome: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/giovanni-bolsoni/', icon: '/icons/linkedin.svg' },
  { label: 'Instagram', href: 'https://www.instagram.com/_bolsoni_/', icon: '/icons/instagram.svg' },
  { label: 'Notion', href: 'https://giovanni-professional-portfolio.notion.site/Professional-Portfolio-28822110d735804795c7d33e038570d3', icon: '/icons/notion.svg', monochrome: true },
  { label: 'Credly', href: 'https://www.credly.com/users/giovanni-bolsoni', icon: '/icons/credly.svg' },
];

export const skills: SkillGroup[] = [
  { group: 'Linguagens', items: ['HTML', 'CSS', 'JavaScript', 'Python', 'TypeScript', 'Java'] },
  { group: 'Frameworks', items: ['React', 'Bootstrap', 'Flask'] },
  { group: 'Build & Hosting', items: ['Vite', 'Vercel', 'GitHub'] },
  { group: 'Dados & Cloud', items: ['APIs REST', 'Supabase', 'AWS Cloud Practitioner'] },
  { group: 'Ferramentas', items: ['Git', 'GitHub', 'VS Code', 'Notion', 'Antigravity', 'Anthropic', 'Claude Code'] },
  { group: 'Processos & Metodologias', items: ['Metodologias Ágeis', 'SQL', 'POO'] },
  { group: 'Produtividade', items: ['Microsoft Office', 'Jupyter'] },
];

export const experiences: Experience[] = [
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
      'Documentação de incidentes pela metodologia KCS, contribuindo para a melhoria contínua dos processos.',
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
];

export const education: Education = {
  course: 'Análise e Desenvolvimento de Sistemas (ADS)',
  institution: 'Universidade São Judas Tadeu',
  status: '2026 - Concluído ✅',
  description:
    'Formação focada em <strong>Engenharia de Software e Desenvolvimento Full-Stack</strong>. Sólidos conhecimentos em Lógica de Programação, Orientação a Objetos (Java), Modelagem de Dados SQL e Metodologias Ágeis. Capacidade técnica para análise de requisitos e entrega de soluções escaláveis voltadas às necessidades do mercado.',
  subjects: [
    'Modelos, Métodos e Técnicas da Engenharia de Software – Universidade São Judas Tadeu (160h)',
    'Gestão e Qualidade de Software – Universidade São Judas Tadeu (160h)',
    'Modelagem de Software – Universidade São Judas Tadeu (160h)',
    'Programação de Soluções Computacionais – Universidade São Judas Tadeu (160h)',
    'Usabilidade, Desenvolvimento Web, Mobile e Jogos – Universidade São Judas Tadeu (160h)',
    'Sistemas Distribuídos e Mobile – Universidade São Judas Tadeu (160h)',
  ],
};

export const currentStudies: Study[] = [
  { title: 'Python com Framework', org: 'SENAI' },
  { title: 'Desenvolvimento de Aplicações com IA Generativa utilizando Google Antigravity', org: 'SENAI' },
];

export const certifications: Certification[] = [
  {
    title: 'Básico em Computação — Windows e Office 2019',
    org: 'Senac Vila Prudente',
    year: 2022,
    hours: '75h',
    category: 'Fundamentos',
    description: 'Capacitação em informática básica, abrangendo o uso do sistema operacional Windows e as principais ferramentas do Pacote Office (Word, Excel e PowerPoint). Desenvolve competências essenciais para produtividade no ambiente profissional, incluindo edição de documentos, planilhas eletrônicas e apresentações.',
    image: '/certificados/Senac/Certificado-básico-em-Computação-Senac.jpg'
  },
  {
    title: 'Desenvolvedor Web Front-End 1: HTML e CSS',
    org: 'Senac Tatuapé',
    year: 2023,
    hours: '60h',
    category: 'Desenvolvimento',
    description: 'Curso introdutório de desenvolvimento web front-end, com foco na criação de páginas utilizando HTML5 e CSS3. Aborda estruturação semântica de conteúdo, estilização visual, responsividade básica e boas práticas de marcação, estabelecendo a base técnica para a construção de interfaces web bem estruturadas e acessíveis.',
    image: '/certificados/Senac/Certificado-Desenvolvedor-Web-Front-End-Senac.jpg'
  },
  {
    title: 'Lógica de Programação',
    org: 'Senac Tatuapé',
    year: 2023,
    hours: '40h',
    category: 'Fundamentos',
    description: 'Formação voltada ao desenvolvimento do raciocínio lógico aplicado à programação, cobrindo conceitos fundamentais como algoritmos, variáveis, tipos de dados, estruturas condicionais e estruturas de repetição. Serve como base para o aprendizado de qualquer linguagem de programação, fortalecendo a capacidade analítica na resolução de problemas computacionais.',
    image: '/certificados/Senac/Certificado-Logica-de-Programação-Senac.jpg'
  },
  {
    title: 'Desenvolvimento em JavaScript',
    org: 'SENAI Paulo Antonio Skaf',
    year: 2026,
    hours: '60h',
    category: 'Desenvolvimento',
    description: 'Curso de Aperfeiçoamento Profissional de Desenvolvimento em JavaScript tem por objetivo o desenvolvimento de competências que permitem programar em JavaScript com visão no lado do cliente, bem como criar páginas web interativas, animações, jogos e aplicativos da web.',
    pdf: '/certificados/SENAI/JS/Certificado_Desenvolvimento em JavaScript.pdf'
  },
  {
    title: 'Implantação de Serviços em Nuvem — AWS Cloud Practitioner Foundational',
    org: 'SENAI Paulo Antonio Skaf',
    year: 2026,
    hours: '40h',
    category: 'Cloud',
    description: 'Curso técnico voltado à implantação e gestão de serviços em nuvem na plataforma AWS, com foco em configuração de infraestrutura (IaaS), plataforma (PaaS) e software como serviço (SaaS). Aborda configuração de redes, máquinas virtuais, web servers e armazenamento em nuvem, além de soluções de segurança, integração de serviços, modelos de contratação e monitoramento de ambientes cloud.',
    pdf: '/certificados/SENAI/AWS/Certificado_Implantação de Serviços em Nuvem - AWS Cloud Practitioner Foundational.pdf'
  },
  {
    title: 'Fundamentos de TI: Hardware e Software',
    org: 'Fundação Bradesco',
    year: 2026,
    hours: '7h',
    category: 'Fundamentos',
    description: 'Curso da Fundação Bradesco voltado aos fundamentos da Tecnologia da Informação, abordando conceitos essenciais de hardware, software, sistemas operacionais, dispositivos computacionais e componentes de um computador. A formação proporciona uma base sólida para compreender o funcionamento dos recursos tecnológicos e sua aplicação no ambiente profissional de TI.',
    pdf: '/certificados/Fundação Bradesco/Fundamentos de TI - Hardware e Software - Fundação Bradesco.pdf'
  },
  {
    title: 'AWS Academy Graduate — Cloud Foundations - Training Badge',
    org: 'AWS Academy',
    year: 2026,
    hours: '20h',
    category: 'Cloud',
    description: 'Formação da AWS Academy voltada aos fundamentos da computação em nuvem e aos principais conceitos da AWS. Aborda infraestrutura em nuvem, modelos de serviço, arquitetura, segurança, armazenamento, redes, bancos de dados, escalabilidade e gerenciamento de recursos.',
    image: '/certificados/SENAI/AWS/aws-academy-graduate-cloud-foundations-training-bad.png',
    pdf: '/certificados/SENAI/AWS/AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260802-8-ungmeq.pdf'
  },
  {
    title: 'AWS Cloud Quest: Cloud Practitioner',
    org: 'AWS',
    year: 2026,
    hours: '12h',
    category: 'Cloud',
    description: 'Curso prático e gamificado da AWS voltado aos fundamentos de computação em nuvem, explorando conceitos de infraestrutura, segurança, armazenamento, bancos de dados, redes e serviços essenciais da AWS.',
    image: '/certificados/SENAI/AWS/aws-cloud-quest-cloud-practitioner-training-badge.png',
    pdf: '/certificados/SENAI/AWS/AWS-Cloud-Quest-Cloud.pdf'
  },
  {
    title: 'AWS Cloud Quest: Certificação de Praticante de IA Generativa - Training Badge',
    org: 'AWS',
    year: 2026,
    hours: '12h',
    category: 'IA',
    description: 'Formação prática e gamificada da AWS voltada à construção de soluções de IA generativa utilizando serviços como Amazon Bedrock e Amazon Q. Aborda conceitos essenciais de IA generativa, engenharia de prompt, modelos de fundação (foundation models) e IA responsável, com experiência prática em geração de código, desenvolvimento de chatbots, moderação de conteúdo e ajuste fino (fine-tuning) de modelos.',
    image: '/certificados/SENAI/AWS/aws-cloud-quest-generative-ai-practitioner-training.png',
    pdf: '/certificados/SENAI/AWS/0af2252e-a1b6-49b6-882d-0d7ecb228a1d.pdf'
  },
  {
    title: 'Claude 101 — Fundamentos do Claude',
    org: 'Anthropic',
    year: 2026,
    hours: '1h',
    category: 'IA',
    description: 'Curso introdutório da Anthropic voltado ao uso eficiente do Claude, abordando fundamentos da ferramenta, interação com IA, elaboração de instruções e principais recursos para aumentar produtividade e qualidade dos resultados.',
    image: '/certificados/Claude/Claude 101.png',
    pdf: '/certificados/Claude/Claude 101.pdf'
  },
  {
    title: 'Claude Code 101 — Desenvolvimento Assistido por IA',
    org: 'Anthropic',
    year: 2026,
    hours: '1h',
    category: 'IA',
    description: 'Curso introdutório sobre Claude Code, com foco no uso de IA como assistente no desenvolvimento de software. Aborda conceitos fundamentais, interação com código, automação de tarefas e utilização de agentes de IA no fluxo de desenvolvimento.',
    image: '/certificados/Claude/Claude Code 101.png',
    pdf: '/certificados/Claude/Claude Code 101.pdf'
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    org: 'Anthropic',
    year: 2026,
    hours: '4h',
    category: 'IA',
    description: 'Curso desenvolvido pela Anthropic em parceria com especialistas acadêmicos da University College Cork e Ringling College, com foco no desenvolvimento de fluência em Inteligência Artificial. Aborda colaboração humano-IA, IA generativa, prompting e o framework 4D.',
    image: '/certificados/Claude/Fluência em IA Estrutura e Fundamentos.png',
    pdf: '/certificados/Claude/Fluência em IA Estrutura e Fundamentos.pdf'
  },
  {
    title: 'AI Fluency for Students',
    org: 'Anthropic',
    year: 2026,
    hours: '3h',
    category: 'IA',
    description: 'Curso da Anthropic voltado ao uso responsável e estratégico da Inteligência Artificial em contextos acadêmicos e profissionais. Aborda o framework 4D, colaboração com IA para aprendizagem, planejamento de carreira, pensamento crítico e o conceito de manter o ser humano no controle das decisões.',
    image: '/certificados/Claude/Fluência em IA para estudantes.png',
    pdf: '/certificados/Claude/Fluência em IA para estudantes.pdf'
  }
];

export const languages: Language[] = [
  { name: 'Português', level: 'Nativo / Fluente', value: 100 },
  { name: 'Inglês', level: 'Intermediário', value: 60 },
  { name: 'Italiano', level: 'Básico', value: 25 },
];

export const projects: Project[] = [
  {
    title: 'Portfólio Profissional',
    description: 'Landing page interativa com terminal, interface gráfica, temas e personalização por visitante.',
    tech: 'React + TypeScript',
    url: 'https://github.com/GiovanniBolsoni/My-Professional-Portfolio'
  },
  {
    title: 'Femanic&Co',
    description: 'E-commerce de moda, sistema para tornar a compra de roupas mais inteligente e segura para o público-alvo.',
    tech: 'JavaScript',
    url: 'https://github.com/GiovanniBolsoni/Femanic-Co'
  },
  {
    title: 'Generate AI',
    description: 'Geração de conteúdo com IA, aplicação web que consome a API do GroqCloud (LLM) para gerar postagens, títulos, resumos e reescritas de texto a partir de uma ideia do usuário.',
    tech: 'Python, Flask, APIs REST',
    url: 'https://github.com/GiovanniBolsoni/Generate-AI'
  },
  {
    title: 'MetalZombieBlast',
    description: 'Jogo Run & Gun 2D estilo Metal Slug feito do zero em Java 21 puro (Swing + Java2D), sem uso de engines externas.',
    tech: 'Java (Swing, Java2D)',
    url: 'https://github.com/GiovanniBolsoni/MetalZombieBlast'
  },

  {
    title: 'Career-OS',
    description: 'App com IA para jovens de tech e dados no Brasil organizarem candidaturas em Kanban, simularem entrevistas, otimizarem o currículo e receberem insights semanais.',
    tech: 'TypeScript',
    url: 'https://github.com/GiovanniBolsoni/Career-Os',
    image: '/career-os-mockup.jpg',
    architectureUrl: 'https://github.com/GiovanniBolsoni/Career-Os#arquitetura'
  }
];

