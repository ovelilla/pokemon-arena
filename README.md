# Poke Arena

Aplicación de gestión de equipos Pokémon desarrollada con React 19 y Zustand, basada en arquitectura por features (screaming architecture). Permite buscar, filtrar y organizar Pokémon en equipos personalizados de hasta 6 miembros.

## 🧩 Tecnologías y versiones utilizadas

- Node.js: 20.x
- React: 19.1.0
- React DOM: 19.1.0
- Vite: 7.0.0
- Zustand: 5.0.6
- Tailwind CSS: 4.1.11
- React Router: 7.6.3
- TanStack React Query: 5.81.5
- Lucide React: 0.525.0
- Testing:
  - Jest: 30.0.4
  - @testing-library/react: 16.3.0
  - @testing-library/jest-dom: 6.6.3

## 🚀 Instalación y ejecución

1. Clonar el repositorio o descomprimir el archivo:

```
git clone <URL-del-repo>
cd poke-arena
```

2. Instalar las dependencias:

```
npm install
```

3. Iniciar en modo desarrollo:

```
npm run dev
```

4. Ejecutar tests:

```
npm run test
```

5. Generar build de producción:

```
npm run build
```

6. Previsualizar build:

```
npm run preview
```

## 📁 Estructura de carpetas y arquitectura

El proyecto sigue el patrón screaming architecture, en el que las carpetas principales representan funcionalidades clave del dominio. La estructura está pensada para escalabilidad y separación de responsabilidades.

```
src/
├── assets/
├── components/
│   ├── button/
│   ├── icon-button/
│   └── type/
├── constants/
├── layouts/
├── modules/
│   ├── simulator/
│   └── team-builder/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       └── teams/
│           ├── components/
│           ├── handlers/
│           └── hooks/
├── stores/
│   ├── teams/
│   └── theme/
├── utils/
├── index.css
├── main.jsx
```

## 🧪 Tests

Los tests están ubicados en `src/stores/teams/__test__/teams.store.test.js` y `src/components/button/__test__/button.component.test.jsx`.

- Un test unitario de lógica funcional que valida el comportamiento del store de Zustand.
- Un test unitario de interfaz de usuario que valida el comportamiento del componente Button.

Los tests están escritos con Jest y Testing Library y están preparados para React 19 sin necesidad de `act()` manual.

## 📄 Licencia

Proyecto de carácter educativo / demostrativo. No cuenta con licencia comercial asociada.
