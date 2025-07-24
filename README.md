# 🐾 PetsLike V2

A **high-performance**, backend-first project designed for modern web speed. Built on a **modular monolith** using **Fastify**, and paired with **SolidJS** for ultra-fast UI rendering. The stack is optimized for **requests per second**, **latency**, **UI hydration**, and **payload minimalism**.

---

## 🧠 Architecture: Modular Monolith

- 🧩 Feature-based modular structure (per folder)
- 🔌 Built on Fastify’s plugin system
- ⚙️ In-process shared memory — no service hops
- 🧪 Easy testing & debug access across boundaries
- 🔀 Seamless migration path to microservices
- 🧵 Ready for cluster workers (multi-core scaling)

### Why Modular Monolith?

- 🚀 Faster than microservices: no network overhead
- 🧠 Direct memory access: no serialization cost
- 🔧 Easier to reason about, test, and maintain
- 👥 Ideal for fast-moving teams and solo developers

---

## 🚀 Performance Goals

| Metric            | Target                       |
|-------------------|------------------------------|
| Req/sec           | 🔥 30,000+                    |
| Avg Latency       | 🧊 < 50ms                     |
| JSON Payload      | ⚖️ Minimized & compressed     |
| UI Hydration      | ⚡ < 100ms                    |
| Rendering Speed   | ⚡ First paint < 1s           |

---

## ⚙️ Tech Stack & Performance

| Layer        | Technology         | Why This Tech?                                                                 | Benchmarks (Approx.)                                          |
|--------------|--------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------|
| **Backend**  | [Fastify](https://fastify.dev)     | Modular monolith, fastest interpreted backend in Node.js                    | ⚡ ~70,000 req/sec (hello)<br>⚡ ~30,000 req/sec (JSON + logic) |
| **Frontend** | [SolidJS](https://www.solidjs.com) | Compiled UI, no VDOM, smallest bundle                                        | 🚀 ~10x React performance<br>🧠 ~3KB core size                  |
| **Database** | PostgreSQL         | Production-grade SQL with indexing, JSONB, and query optimization            | 📊 ~20ms query latency (pooled)                                |

---

## ⚡ Backend Raw Speed Comparison

| Framework           | Type        | JSON Response (req/sec) | Hello World (req/sec) | Dev Speed 🛠️     | Notes 🚀                                                                 |
|---------------------|-------------|--------------------------|------------------------|-------------------|---------------------------------------------------------------------------|
| **Fastify (Node.js)** | Interpreted | 🟢 ~30,000+              | 🟢 ~70,000+            | 🟢 Very Fast       | 💡 Highest throughput in Node.js with modern plugin ecosystem             |
| Express (Node.js)   | Interpreted | 🟡 ~15,000               | 🟡 ~20,000             | 🟢 Very Fast       | 📦 Familiar and simple, slower under load                                 |
| Laravel (PHP)       | Interpreted | 🔴 ~2,000–5,000           | 🔴 ~4,000–6,000        | 🟢 Easy            | 🐘 Feature-rich, heavier runtime stack                                    |
| Django (Python)     | Interpreted | 🔴 ~2,000–4,000           | 🔴 ~3,000–5,000        | 🟡 Moderate        | 🧠 Great ORM, but less optimized for raw speed                            |
| Rails (Ruby)        | Interpreted | 🔴 ~1,500–3,000           | 🔴 ~2,000–4,000        | 🟢 Easy            | 🛤️ Legacy performance limits                                              |
| ASP.NET Core        | Compiled    | 🟢 ~6,000–20,000+         | 🟢 ~80,000-120,000              | 🟡 Medium          | 🚀 Extremely fast (compiled), best-in-class raw speed for server workloads |

> **Fastify** dominates the interpreted category for speed, developer experience, and scalability.

---

## 🧩 SolidJS vs Popular Frontend Frameworks

| Framework     | Rendering Model      | Update Speed 🔁 | Bundle Size 📦 | Memory Usage 🧠 | Notes                                         |
|---------------|----------------------|------------------|----------------|------------------|----------------------------------------------|
| **SolidJS**    | Compiled, no VDOM     | 🟢 Fastest       | 🟢 ~3KB        | 🟢 Very Low       | Benchmark leader in reactivity & performance |
| React         | VDOM                 | 🟡 Medium        | 🔴 ~45KB       | 🟡 Moderate        | Popular, but slower and heavier              |
| Vue           | VDOM + compiler      | 🟡 Medium        | 🟡 ~30KB       | 🟡 Moderate        | Flexible, but slightly slower than Solid     |
| Svelte        | Compiled             | 🟢 Fast          | 🟢 ~2–4KB      | 🟢 Very Low        | Similar performance to SolidJS               |
| Angular       | Full framework       | 🔴 Slower        | 🔴 ~60KB+      | 🔴 Higher          | Heavy architecture, not ideal for speed      |

---
