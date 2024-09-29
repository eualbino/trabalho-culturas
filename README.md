<h1>Getting Started</h1>
<h3>Installing</h3>
<h4>Clone this repository</h4>

```shell
$ git clone https://github.com/eualbino/trabalho-culturas.git
```

#

### Installing backend:

```shell
$ cd backend
$ npm install
```

<strong>Create arquive .env</strong>

```
DATABASE_URL="file:./dev.db"
```

<strong>Generate migrations</strong>

```shell
$ npx prisma migrate dev
```

<strong>Run project</strong>

```shell
$ npm run dev
```

#

### Installing frontend:

```shell
$ cd frontend
$ npm install
```

<strong>Create arquive .env.local</strong>

```
NEXT_PUBLIC_BASE_URL="http://localhost:3333/"
```

<strong>Run project</strong>

```shell
$ npm run dev
```

#

# Built with

### Backend

<li><a href="https://www.prisma.io/">Prisma ORM</a> - Generate databases.</li>
<li><a href="https://fastify.dev/">Fastify</a> - Web framework for Node.js.</li>
<hr>
<h3>Frontend</h3>
<li><a href="https://nextjs.org/">Next.js</a> - 
The React Framework for the Web</li>
<li><a href="https://ui.shadcn.com/">Shadcn.ui</a> - Component library.</li>
<li><a href="https://tailwindcss.com/">Tailwind.css</a> - CSS framework.</li>
<li><a href="https://axios-http.com/">Axios</a> - HTTP Client.</li>
<li><a href="https://tanstack.com/">TanStack Query</a> - Asynchronous state management.</li>