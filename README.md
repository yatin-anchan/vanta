# Vanta.io

Developer-first payment sandbox & webhook simulation infrastructure platform.

## Overview

Vanta.io helps developers build, test, simulate, and debug payment integrations without relying on unreliable sandbox environments.

The platform provides:
- Payment behavior simulation
- Webhook replay systems
- Provider intelligence
- Sandbox infrastructure
- Failure injection
- Integration observability

---

## Core Features

### Sandbox Simulation Engine
Simulate:
- successful payments
- failed payments
- delayed settlements
- duplicate webhooks
- refund failures
- retry storms
- UPI pending states

### Provider Intelligence
Compare payment providers based on:
- regional support
- subscription capabilities
- API quality
- documentation quality
- reliability

### Webhook Infrastructure
- event replay
- retry simulation
- delivery monitoring
- payload inspection
- signature validation testing

---

## Tech Stack

### Frontend
- Astro
- Tailwind CSS
- shadcn/ui
- TypeScript

### Backend
- Cloudflare Workers
- Supabase
- PostgreSQL

### Infrastructure
- Cloudflare Pages
- GitHub Actions

---

## Project Status

Currently in active development.

Building publicly from day zero.

---

## Architecture Vision

```txt
Frontend (Astro)
      ↓
Cloudflare Workers API Layer
      ↓
Simulation Engine
      ↓
Webhook Infrastructure
      ↓
Supabase PostgreSQL
```

---

## Local Development

```bash
npm install
npm run dev
```

---

## Goals

- Reduce payment integration complexity
- Improve developer testing confidence
- Simulate realistic provider behavior
- Build developer-first payment infrastructure

---

## License

MIT