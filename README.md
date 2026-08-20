# Full Stack Open

Repositorio de ejercicios y proyectos del curso [Full Stack Open](https://fullstackopen.com/es/), de la Universidad de Helsinki.

El curso cubre el desarrollo web moderno con JavaScript, React, Node.js, Express, MongoDB, pruebas y aplicaciones de una sola página.

## Contenido del repositorio

| Parte   | Temas y proyectos                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------------- |
| `part0` | Diagramas de comunicación entre navegador y servidor. SPA y peticiones HTTP.                                     |
| `part1` | Fundamentos de React: componentes, estado, eventos y renderizado. Incluye `courseinfo`, `unicafe` y `anecdotes`. |
| `part2` | Comunicación con servidor, formularios y efectos. Incluye `courseinfo`, `phonebook` y `countries`.               |
| `part3` | Backend con Node.js y Express. API de la agenda telefónica y conexión con MongoDB.                               |
| `part4` | Backend de una aplicación de blogs: autenticación, usuarios, tokens JWT, MongoDB y pruebas de API.               |
| `part5` | Frontend de la aplicación de blogs con React, Vitest, Testing Library y pruebas E2E con Playwright.              |

## Tecnologías

- JavaScript y JSX
- React y Vite
- Node.js y Express
- MongoDB y Mongoose
- REST APIs y Axios
- JSON Web Tokens (JWT)
- Vitest y Testing Library
- Playwright
- ESLint
- pnpm

## Cómo ejecutar los proyectos

Cada proyecto tiene su propio `package.json`. Entra en la carpeta correspondiente, instala las dependencias y ejecuta el script que necesites:

```bash
cd part1/courseinfo
pnpm install
pnpm dev
```

Para un proyecto de frontend, los comandos más habituales son:

```bash
pnpm dev       # servidor de desarrollo
pnpm build     # compilación de producción
pnpm lint      # revisión con ESLint
```

Para el backend de la parte 4:

```bash
cd part4
pnpm install
pnpm dev
```

La parte 4 necesita las variables de entorno usadas por la aplicación, como la conexión a MongoDB y el secreto del token. Consulta `utils/config.js` antes de iniciar el servidor.

Para el frontend de la parte 5:

```bash
cd part5
pnpm install
pnpm dev
```

Sus pruebas disponibles son:

```bash
pnpm test          # pruebas E2E con Playwright
pnpm test:viteest  # pruebas unitarias con Vitest
pnpm lint
```

## Estructura principal

```text
fullstackOpenCurso/
├── part0/       # diagramas y fundamentos web
├── part1/       # primeros proyectos con React
├── part2/       # React y comunicación con APIs
├── part3/       # backend de la agenda telefónica
├── part4/       # API de la aplicación de blogs
└── part5/       # frontend y pruebas de la aplicación de blogs
```

Este README se actualizará conforme avance el curso y se incorporen nuevas partes o proyectos.
