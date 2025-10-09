# GitHub User Search App

> Search GitHub users and view their repositories — lightweight React + TypeScript app.

[![Demo status](https://img.shields.io/badge/demo-online-brightgreen)](https://repo-explorer-ecru.vercel.app/)

---

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Screenshots](#screenshots)
* [Getting started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Install](#install)
  * [Environment variables](#environment-variables)
  * [Run locally](#run-locally)
* [Usage](#usage)
* [UX & Accessibility](#ux--accessibility)
* [Error handling & rate limits](#error-handling--rate-limits)
* [Tests](#tests)
* [Deployment](#deployment)
* [Folder structure](#folder-structure)
* [Contributing](#contributing)
* [License](#license)
* [Author / Contact](#author--contact)

---

## Demo

Live demo: https://repo-explorer-ecru.vercel.app/
Repository: https://github.com/imanirvansyah/repo-explorer


---

## Features

* Search GitHub users by username (fuzzy / partial match)
* Show up to 5 suggested users matching the query
* Click a user to view **all** their public repositories
* Loading and error states
* Keyboard accessible (Enter to search, arrow navigation for suggestions)
* Mobile responsive layout
* Built with TypeScript and good UX practices

---

## Tech stack

* React (Vite)
* TypeScript
* React Query (data fetching & cache)
* Tailwind CSS (styling) — optional; replace with your CSS framework
* React Hook Form (input handling) — optional
* Vitest + Testing Library (unit/integration tests)


---

## Screenshots



![web dark](/public/web-dark.png)
![search dark](/public/search-dark.png)
![mobile dark](/public/mobile-dark.png)
![mobile search dark](/public/mobile-search-dark.png)

---

## Getting started

### Prerequisites

* Node.js >= 18 (or current LTS)
* npm or yarn

### Install

```bash
# clone
git clone https://github.com/imanirvansyah/repo-explorer.git
cd repo-explorer

# install
npm install
# or
# yarn
```

### Run locally

```bash
npm run dev
# open http://localhost:5173 (or the port printed by Vite)
```

Build for production:

```bash
npm run build
npm run preview
```

---

## Usage

1. Focus the search input and type a username (partial names allowed).
2. Press `Enter` or click the search icon to fetch suggestions.
3. Use the arrow keys to highlight suggestions and `Enter` to select, or click with the mouse.
4. After selecting a user, their public repositories are displayed.
5. Click a repository to open it on GitHub.

---

## UX & Accessibility

* Keyboard navigation: Tab to focus, Arrow Up/Down to move through suggestions, Enter to select.
* Loading indicators shown while fetching data.
* Empty and error states have friendly messages and possible remediation steps.
* Responsive: Layout adapts to mobile and desktop screens.
* Semantic HTML elements and ARIA attributes were used where appropriate (confirm and adjust if you changed implementation).

---

## Error handling & rate limits

* Network errors and API errors are displayed to the user with clear messaging.
* A special message is shown when GitHub rate limits are hit (HTTP 403 + `X-RateLimit-Remaining: 0`).
* Recommendations if rate-limited:

  * Wait until the rate window resets (the response contains reset time), or
  * Set `VITE_GITHUB_TOKEN` with a personal access token for increased limits.

---

## Tests

This project includes unit and integration tests (Vitest + Testing Library). Example commands:

```bash
# run tests
npm run test

# run tests with ui
npm run test:ui

```
