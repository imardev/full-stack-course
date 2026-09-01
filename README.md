# Full Stack Open - Universidad de Helsinki

Este repositorio contiene los ejercicios, proyectos y prácticas realizadas siguiendo el curso [Full Stack Open](https://fullstackopen.com/es/) de la Universidad de Helsinki.

El curso está orientado al desarrollo web moderno con JavaScript, React, Node.js, Express, MongoDB, pruebas automatizadas y arquitecturas de aplicaciones de una sola página.

## ¿Qué incluye este proyecto?

Aquí se desarrollan los ejercicios de cada parte del curso, desde los fundamentos de la web y React hasta backend, autenticación, despliegue básico y pruebas de frontend.

## Estructura del curso en este repositorio

| Parte   | Temas y proyectos principales                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `part0` | Diagramas de flujo, comunicación entre navegador y servidor, SPA y peticiones HTTP.                                     |
| `part1` | Fundamentos de React: componentes, estado, eventos, renderizado y proyectos como `courseinfo`, `unicafe` y `anecdotes`. |
| `part2` | Comunicación con APIs, formularios, efectos y proyectos como `courseinfo`, `phonebook` y `countries`.                   |
| `part3` | Backend con Node.js y Express, API de agenda telefónica y conexión con MongoDB.                                         |
| `part4` | API de blogs con Node.js, Express, usuarios, autenticación JWT, pruebas de backend y MongoDB.                           |
| `part5` | Frontend de la aplicación de blogs con React, testing de componentes y pruebas E2E con Playwright.                      |
| `part6` | Gestión de estado global con Zustand, incluyendo ejemplos y proyectos de feedback y anécdotas.                          |

## Tecnologías trabajadas

- JavaScript y JSX
- React y Vite
- Node.js y Express
- MongoDB y Mongoose
- APIs REST y Axios
- JWT y autenticación
- Zustand
- Vitest y Testing Library
- Playwright
- ESLint
- pnpm

## Cómo ejecutar los proyectos

Cada carpeta tiene su propio `package.json`, así que se instalan dependencias y se ejecutan por separado.

### Ejemplo de un proyecto frontend

```bash
cd part1/courseinfo
pnpm install
pnpm dev
```

Comandos comunes en proyectos frontend:

```bash
pnpm dev
pnpm build
pnpm lint
```

### Ejemplo para backend

```bash
cd part4
pnpm install
pnpm dev
```

En la parte 4 y en otros proyectos que usan variables de entorno, es importante revisar archivos como `utils/config.js` antes de iniciar la aplicación, especialmente si se conecta a MongoDB o usa tokens JWT.

### Ejemplo para la parte 5

```bash
cd part5
pnpm install
pnpm dev
```

Pruebas disponibles en esa parte:

```bash
pnpm test
pnpm test:vitest
pnpm lint
```

## Estructura principal del repositorio

```text
fullstackOpenCurso/
├── part0/              # fundamentos web y diagramas
├── part1/              # React básico y proyectos iniciales
├── part2/              # APIs, formularios y datos remotos
├── part3/              # backend de agenda telefónica
├── part4/              # API de blogs y autenticación
├── part5/              # frontend de blogs y pruebas
├── part6/              # gestión de estado con Zustand
├── README.md           # documentación general del repositorio
└── ...
```

## Objetivo del repositorio

Este proyecto sirve como registro práctico del aprendizaje del curso de Full Stack Open de la Universidad de Helsinki, aplicando conceptos reales de desarrollo web moderno con JavaScript y React en el lado frontend y Node.js/Express con bases de datos en el backend.

Se irá actualizando conforme avance el curso y se agreguen nuevas partes o ejercicios.
