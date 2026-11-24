# 🌌 Star Wars Planets
## Projeto online: [https://star-wars-plts.vercel.app](https://star-wars-plts.vercel.app/)

Aplicação desenvolvida com **Next.js**, **React** e **TypeScript**, que consome a API de Star Wars para exibir informações sobre os planetas da franquia.

O projeto permite pesquisar, filtrar e ordenar planetas, com interfaces adaptadas para diferentes tamanhos de tela.

---

## 💡 Observações

- Aplicação desenvolvida utilizando o **Next.js App Router**.
- Consumo de dados da **Star Wars API (SWAPI)** através da Fetch API.
- Gerenciamento de estado global utilizando **Context API**.
- Utilização de React Hooks para controle de estado e efeitos colaterais.
- Interface responsiva: tabela para telas maiores e cards para dispositivos menores.
- Estilização com Tailwind CSS e CSS personalizado.
- Testes automatizados configurados com Vitest e Testing Library.

---

## 🚀 Tecnologias Utilizadas

### Front-end

- ▲ **Next.js 15** – Framework React para construção da aplicação.
- ⚛️ **React 19** – Biblioteca para construção de interfaces.
- 🟦 **TypeScript 5** – Tipagem estática para maior segurança e organização do código.
- 🎨 **Tailwind CSS 4** – Framework CSS baseado em classes utilitárias.
- 🎨 **CSS** – Estilização personalizada e variáveis CSS.
- 🖼️ **Next Image** – Otimização e carregamento de imagens.
- 🔤 **Next Font** – Carregamento e otimização de fontes.

### Gerenciamento de estado e dados

- 🔄 **Context API** – Compartilhamento de estado entre componentes.
- 🪝 **React Hooks** – Gerenciamento de estado e efeitos colaterais.
- 📡 **Fetch API** – Requisições HTTP para obtenção dos dados.
- 🌌 **SWAPI** – API utilizada para obter informações dos planetas.

### Testes e qualidade de código

- 🧪 **Vitest** – Execução de testes automatizados.
- 🧩 **Testing Library** – Testes de componentes e interações.
- 🌐 **JSDOM** – Simulação de ambiente DOM para testes.
- 📊 **V8 Coverage** – Coleta de cobertura de testes.

## 🛠️ Funcionalidades

- Listagem dos planetas do universo Star Wars.
- Busca de planetas pelo nome.
- Filtros numéricos combinados.
- Filtro por diferentes propriedades:
  - Population
  - Orbital Period
  - Diameter
  - Rotation Period
  - Surface Water
- Comparações numéricas:
  - Maior que (`>`)
  - Menor que (`<`)
  - Igual a (`=`)
- Remoção individual de filtros.
- Remoção de todos os filtros aplicados.
- Ordenação por propriedades numéricas.
- Ordenação ascendente (ASC) e descendente (DESC).
- Apresentação dos resultados em tabela para telas maiores.
- Apresentação dos resultados em cards para dispositivos menores.

---

## 📱 Responsividade

A interface adapta a apresentação dos planetas de acordo com o tamanho da tela:

- **Desktop e telas maiores:** exibição dos dados em tabela.
- **Dispositivos menores:** exibição dos planetas em cards, com informações resumidas.

---

## 🔍 Filtros e Ordenação

A aplicação permite combinar diferentes critérios de filtragem para refinar os resultados.

**Filtros numéricos:**

| Comparação | Operador |
|---|---|
| Maior que | `>` |
| Menor que | `<` |
| Igual a | `=` |

**Ordenação:**

- Ascendente (ASC).
- Descendente (DESC).

---

## 🧪 Testes

O projeto utiliza Vitest e Testing Library para a execução de testes automatizados.

Para executar os testes:

```bash
npm test
```

Para gerar o relatório de cobertura:

```bash
npm run test:coverage
```

## 📡 API

Os dados dos planetas são obtidos através da:

[SWAPI – Star Wars API](https://swapi.dev/)

**Endpoint utilizado:**

```text
https://swapi.dev/api/planets
```

---

## 👨‍💻 Autor

Desenvolvido por [Kleber Rodrigues](https://github.com/kleber-ar).

[Repositório no GitHub](https://github.com/kleber-ar/star-wars)
