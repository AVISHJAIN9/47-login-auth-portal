# System Design Deep Dive: Overview & Architecture Index

```mermaid
flowchart TD
    subgraph Core["Core System Design Disciplines"]
        Req["14.1 Requirements & Estimation"] --> Arch["14.2 Architecture Styles"]
        Arch --> Net["14.3 Networking & Protocols"]
        Net --> Scale["14.4 Load Balancing & Autoscaling"]
        Scale --> DB["14.5 Database & Storage Hierarchy"]
        DB --> Cache["14.6 Distributed Caching (Redis)"]
        Cache --> Queue["14.7 Messaging & Async Queues"]
        Queue --> Concur["14.8 Concurrency & Consistency"]
        Concur --> Resil["14.9 Reliability & Resilience"]
        Resil --> Rate["14.10 API Gateway & Rate Limiting"]
        Rate --> Sec["14.11 Security & Zero Trust"]
        Sec --> AI["14.12 Search & AI Pipelines"]
        AI --> RT["14.13 Real-Time Systems"]
        RT --> Obs["14.14 Observability & Telemetry"]
        Obs --> Perf["14.15 Performance Engineering"]
        Perf --> Cost["14.16 Cost & Cloud Trade-offs"]
        Cost --> Classic["14.17 Classic System Design Problems"]
        Classic --> Decisions["Decisions Log"]
    end
```

## Welcome to the System Design Curriculum

Interviewers at tech companies and top startups evaluate candidates on their ability to reason about systems beyond a single localhost process. This section provides an exhaustive, 18-part system design curriculum rooted in the real codebase of the Sachidanand Member Access Portal.

### System Design Navigation

| Chapter | Topic | Real Project Grounding |
| :--- | :--- | :--- |
| **[14.1](/system-design/14.1-requirements-estimation)** | **Requirements & Capacity Estimation** | Arithmetical modeling of hospital clinician traffic, RPS, and MongoDB IOPS |
| **[14.2](/system-design/14.2-architecture-styles)** | **Architecture Styles** | Monolith vs Modular Monolith vs Microservices vs Serverless in Express |
| **[14.3](/system-design/14.3-networking-communication)** | **Networking & Protocols** | HTTP/1.1 vs HTTP/2/3, TLS handshakes, Reverse Proxies |
| **[14.4](/system-design/14.4-load-balancing-scaling)** | **Load Balancing & Scaling** | L4 vs L7 load balancing, sticky sessions, eliminating SPOFs |
| **[14.5](/system-design/14.5-databases-storage)** | **Databases & Storage Hierarchy** | MongoDB vs Postgres, B-tree indexes, TTL expiry indexes, sharding |
| **[14.6](/system-design/14.6-caching)** | **Multi-Tier Caching** | Browser cache, CDN, application cache, and Redis session offloading |
| **[14.7](/system-design/14.7-messaging-queues)** | **Messaging & Async Queues** | BullMQ/RabbitMQ background job processing for clinical alerts |
| **[14.8](/system-design/14.8-consistency-concurrency)** | **Concurrency & Consistency** | Race conditions on user creation, CAP theorem, atomic MongoDB writes |
| **[14.9](/system-design/14.9-reliability-resilience)** | **Reliability & Resilience** | Circuit breakers, graceful shutdown, SLOs/SLAs, retry backoff |
| **[14.10](/system-design/14.10-api-design-rate-limiting)** | **API Design & Rate Limiting** | Sliding window rate limiting, token buckets, API versioning |
| **[14.11](/system-design/14.11-security-architecture)** | **Security Architecture** | Zero Trust, HIPAA data isolation, defense against DDoS & injection |
| **[14.12](/system-design/14.12-search-ai-architecture)** | **Search & AI Pipelines** | Text search vs Elasticsearch; Clinical triage AI architecture |
| **[14.13](/system-design/14.13-real-time-systems)** | **Real-Time Systems** | WebSockets vs SSE vs Long Polling for live clinician notifications |
| **[14.14](/system-design/14.14-observability-operations)** | **Observability & Operations** | Structured logging, Prometheus metrics, distributed tracing |
| **[14.15](/system-design/14.15-performance-engineering)** | **Performance Engineering** | Profiling event loop lag, connection pool tuning, Web Vitals |
| **[14.16](/system-design/14.16-cost-tradeoffs)** | **Cost & Cloud Trade-offs** | Cost calculation at 1x vs 100x scale; Build vs Buy analysis |
| **[14.17](/system-design/14.17-classic-system-design-problems)**| **Classic Problems Applied** | Scaling auth, URL shortener, Chat, News feed with portal stack |
| **[Decisions Log](/system-design/decisions)** | **Architectural Decisions Log** | Comprehensive ledger of every major technical choice |
