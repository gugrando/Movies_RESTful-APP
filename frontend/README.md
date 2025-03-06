# 🚀 Projeto Frontend - React + TypeScript

Este projeto é o frontend de uma aplicação full-stack, desenvolvido com **React**, **TypeScript** e diversas bibliotecas modernas para otimizar a experiência do usuário e a performance.

---

## 📌 **Stacks Utilizadas**

- **React** + **Vite** (Setup rápido e otimizado)
- **TypeScript** (Tipagem estática para maior segurança)
- **Tailwind CSS** (Estilização rápida e produtiva)
- **React Router Dom** (Gerenciamento de rotas)
- **Axios** (Requisições HTTP)
- **Zod** (Validação de dados)
- **React Hook Form** (Gerenciamento de formulários)
- **React Icons** (Biblioteca de ícones)
- **React Toastify** (Notificações/toasts)
- **React Query** (Gerenciamento eficiente de requisições HTTP)

---

## 🏗 **Plano de Ação**

### **1️⃣ Estruturar o projeto e instalar dependências**

```sh
npx create-vite frontend --template react-ts
cd frontend
npm install
```

Criar a estrutura de pastas seguindo o padrão **MVC**:
```
frontend/
│── src/
│   │── assets/         (Imagens, estilos globais, etc.)
│   │── components/     (Componentes reutilizáveis)
│   │── layouts/        (Layouts da aplicação)
│   │── pages/          (Páginas principais)
│   │── router/         (Configuração de rotas)
│   │── services/       (Requisições HTTP)
│   │── stores/         (Gerenciamento de estado, caso necessário)
│   │── types/          (Tipos TypeScript)
│   │── utils/          (Funções utilitárias)
│   └── main.tsx        (Ponto de entrada da aplicação)
```

Instalar as dependências principais:
```sh
npm install react-router-dom axios zod react-hook-form react-icons react-toastify @tanstack/react-query
```

Configurar **Tailwind CSS**:
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### **2️⃣ Configurar o React Router Dom (Navegação)**

- Criar um arquivo `router/index.tsx` para organizar as rotas.
- Definir as páginas principais dentro da pasta `pages/`.
- Criar um layout base (`layouts/MainLayout.tsx`) para reaproveitar estrutura comum.

---

### **3️⃣ Criar os serviços de requisições com Axios**

- Criar um arquivo `services/api.ts` para configurar a base do Axios.
- Criar funções para consumir o backend (`services/userService.ts`, etc.).

---

### **4️⃣ Criar páginas e componentes principais**

- Criar a página de **Login** (`pages/Login.tsx`).
- Criar a página de **Cadastro** (`pages/Register.tsx`).
- Criar um formulário reutilizável usando **React Hook Form** e **Zod** para validação.
- Criar componentes reutilizáveis (`components/Button.tsx`, `components/Input.tsx`, etc.).

---

### **5️⃣ Gerenciar estados e requisições com React Query**

- Configurar o **React Query** no projeto.
- Utilizar `useQuery` para buscar dados da API.
- Utilizar `useMutation` para requisições como cadastro e login.

---

### **6️⃣ Implementar feedbacks visuais**

- Usar **React Toastify** para exibir notificações.
- Criar componentes de **loading** e **mensagens de erro**.

---

### **7️⃣ Conectar o frontend com o backend**

- Definir a URL base da API no `.env`.
- Testar a comunicação do frontend com o backend localmente.
- Criar chamadas para login, cadastro, listagem de usuários, etc.

---

### **8️⃣ Preparar para deploy**

- Configurar variáveis de ambiente corretamente.
- Testar toda a aplicação localmente.
- Escolher uma plataforma de hospedagem (Vercel, Netlify, etc.).

---

## 💡 **Como Rodar o Projeto**

1. Clone o repositório:
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Entre na pasta do frontend:
```sh
cd frontend
```

3. Instale as dependências:
```sh
npm install
```

4. Inicie o projeto:
```sh
npm run dev
```

O frontend estará rodando em `http://localhost:5173/` 🚀

---

## 📜 **Licença**

Este projeto é de código aberto e pode ser modificado conforme necessário. 🚀


