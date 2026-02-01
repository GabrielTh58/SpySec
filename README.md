<div align="center">
  <img src="apps/frontend/src/app/favicon.ico" alt="SpySec Logo" width="120">
  <h1>SpySec</h1>
  <p>
    <b>Descomplicando a cibersegurança através da gamificação e inteligência artificial.</b>
  </p>
  
  <p>
    <a href="#-sobre">Sobre</a> •
    <a href="#-features">Funcionalidades</a> •
    <a href="#-tecnologias">Tecnologias</a> •
    <a href="#-arquitetura">Arquitetura</a> •
    <a href="#-como-rodar">Como Rodar</a>
  </p>

  ![Badge em Desenvolvimento](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
  ![Badge License](https://img.shields.io/badge/License-MIT-blue)
</div>

---

## 🛡️ Sobre

O **SpySec** é uma plataforma de educação em cibersegurança (SaaS) projetada para treinar o "Human Firewall" (o usuário final). Diferente de cursos tradicionais e massantes, utilizamos **Gamificação** e **IA** para ensinar funcionários e indivíduos a se protegerem de ameaças reais como Phishing, Engenharia Social e Vazamento de Dados.

O projeto conta com um guia virtual, **"Spy"**, um ex-vírus reconfigurado que atua não apenas como mascote, mas como um tutor inteligente em tempo real.

> **Contexto:** Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) em Engenharia de Software na UNINTER.

---

## 📸 Preview

<div align="center">
  <img src="public/dashboard-preview.png" alt="Dashboard SpySec" width="800">
</div>

---

## 🚀 Features

- **Tutor IA (Spy):** Chat inteligente em tempo real para tirar dúvidas de segurança e auxiliar nas missões, servindo como um mentor pessoal 24/7.
- **Gamificação Completa:** Sistema de XP, Níveis, Ranking Global e Badges (Conquistas).
- **Missões Interativas:** Cenários práticos onde o usuário deve identificar vulnerabilidades (MissionFlow).
- **Onboarding Narrativo:** Fluxo de boas-vindas guiado pelo mascote Spy para criação de codinome.
- **Feedback System:** Widget integrado via Webhook (N8N) para report de bugs e sugestões.
- **Autenticação Híbrida:** Login via Email/Senha e Social Login (Google).
- **Dashboard Analítico:** Visualização de progresso e estatísticas de defesa.

---

## 🛠 Tecnologias

O projeto adota uma abordagem moderna utilizando **Monorepo** para gerenciar a complexidade e compartilhar regras de negócio.

### Front-end (Client)
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)

### Back-end (Server)
- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Documentação:** [Swagger](https://swagger.io/)

### Infraestrutura & Ferramentas
- **Gerenciamento de Repositório:** [Turborepo](https://turbo.build/) (Monorepo)
- **Banco de Dados:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Autenticação:** [Firebase Auth](https://firebase.google.com/)
- **Automação/Webhooks:** [N8N](https://n8n.io/)
- **Linguagem:** TypeScript

---

## 🏛️ Arquitetura

O projeto segue princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**, estruturado para garantir que as regras de negócio sejam o coração da aplicação, independentes de frameworks externos.

A estrutura é dividida em três camadas principais:

1.  **Domain (Core):**
    * É o núcleo do sistema. Contém as **Entidades**, **Casos de Uso** (Regras de Negócio), **Providers** (interfaces) e **Portas** (interfaces de repositórios).
    * Esta camada é pura e não depende de frameworks (nem NestJS, nem Next.js).

2.  **Adapter (Orchestration):**
    * Atua como uma camada de **Facade**.
    * Responsável por instanciar os Casos de Uso do Domain e orquestrar a lógica necessária, expondo métodos simples e diretos para serem consumidos pelas camadas externas.

3.  **Consumers (Backend & Frontend):**
    * **Backend (NestJS):** Importa o Adapter e expõe os dados via API REST, conectando com o Prisma e Supabase.
    * **Frontend (Next.js):** Consome a lógica de apresentação e interage com o usuário.

---

## ⚡ Como Rodar

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM ou Yarn
- Conta no Firebase e Supabase configuradas.

### Instalação

1. Clone o repositório:
   ```bash
     git clone [https://github.com/](https://github.com/)[SEU-USUARIO]/spysec.git
     cd spysec
     npm install
   ```
   
2. Instale as dependências (na raiz do Monorepo):
   ```bash
    npm install
    # ou
    yarn install
   ```

3. Configure as Variáveis de Ambiente: Crie um arquivo .env na raiz (ou nas pastas específicas apps/backend e apps/web) seguindo o modelo .env.example:
   - Frontend
     ```bash
      DATABASE_URL=[URL
      FIREBASE_API_KEY=[KEY]
      NEXT_PUBLIC_FIREBASE_API_KEY=seu_api_key
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
      N8N_FEEDBACK_URL=[URL]
      CHAT_WEBHOOK=[URL]
      ```
   - Backend
     ```bash
      DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true"
      DIRECT_URL="postgresql://user:pass@host:5432/db"
      FIREBASE_CREDENTIALS={"type": "service_account", ...}
      ```

4. Execute o projeto (via Turbo):
    ```bash
      npm run dev
    ```
    
5. Acesse:
  - Web: http://localhost:3000
  - API/Swagger: http://localhost:4000/api
    
---
## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver uma ideia de melhoria ou nova missão:

1. Faça um **Fork** do projeto.
2. Crie uma **Branch** para sua Feature (`git checkout -b feature/NovaMissao`).
3. Faça o **Commit** (`git commit -m 'feat: ''`).
4. Faça o **Push** (`git push origin feature/NovaMissao`).
5. Abra um **Pull Request**.

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

