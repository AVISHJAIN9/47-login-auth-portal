import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: "Sachidanand Auth Portal Docs",
    description: "Interview-Ready Documentation for Sachidanand Hospital Member Access & Authentication Portal",
    appearance: 'dark',
    base: '/',
    themeConfig: {
      nav: [
        { text: 'Guide', link: '/00a-project-analysis' },
        { text: 'Features', link: '/01-features' },
        { text: 'API Reference', link: '/03-api-reference' },
        { text: 'Comparisons', link: '/04-tech-comparisons' },
        { text: 'Architecture', link: '/05-architecture' },
        { text: 'System Design', link: '/system-design/index' },
        { text: 'Checklist', link: '/13-master-checklist' },
        { text: 'Interview Q&A', link: '/09-interview-qa' }
      ],
      sidebar: [
        {
          text: 'Project Overview',
          collapsed: false,
          items: [
            { text: 'Project Type Pre-Check', link: '/00-project-type' },
            { text: 'Project Code Map', link: '/00-project-map' },
            { text: 'Deep Project Analysis', link: '/00a-project-analysis' },
            { text: 'Interview Pitches (30s & 2m)', link: '/00b-project-pitch' }
          ]
        },
        {
          text: 'Features Deep Dive',
          collapsed: false,
          items: [
            { text: 'Feature Master Catalog', link: '/01-features' },
            { text: 'F1: User Registration', link: '/features/01-user-registration' },
            { text: 'F2: Session Login', link: '/features/02-session-authentication' },
            { text: 'F3: Session Hydration Middleware', link: '/features/03-session-middleware-rbac' },
            { text: 'F4: Protected Dashboard', link: '/features/04-protected-dashboard' },
            { text: 'F5: Logout & Session Invalidation', link: '/features/05-session-termination-logout' },
            { text: 'F6: 3D Tilt Card & Glass UI', link: '/features/06-interactive-ui-tilt-card' }
          ]
        },
        {
          text: 'Architecture & Technical Guide',
          collapsed: false,
          items: [
            { text: 'Rebuild From Scratch (Build Order)', link: '/02-build-order' },
            { text: 'HTTP API Reference', link: '/03-api-reference' },
            { text: 'Technology Choice Comparisons', link: '/04-tech-comparisons' },
            { text: 'System Architecture & Data Flows', link: '/05-architecture' },
            { text: 'OWASP Security Audit', link: '/06-security' },
            { text: 'AI Integration Analysis', link: '/07-ai-integration' },
            { text: 'Engineering Quality & DevOps', link: '/08-quality-and-ops' }
          ]
        },
        {
          text: 'Interview Mastery',
          collapsed: false,
          items: [
            { text: 'Say It Out Loud (Spoken Scripts)', link: '/14-say-it-out-loud' },
            { text: '150+ Interview Q&A', link: '/09-interview-qa' },
            { text: 'Gaps & Improvements', link: '/10-gaps-and-improvements' },
            { text: 'Glossary of Terms', link: '/11-glossary' },
            { text: 'Developer Confirmation List', link: '/12-confirm-list' },
            { text: '275-Item Master Checklist', link: '/13-master-checklist' }
          ]
        },
        {
          text: 'System Design Deep Dive',
          collapsed: true,
          items: [
            { text: 'System Design Index', link: '/system-design/index' },
            { text: '14.1 Requirements & Estimation', link: '/system-design/14.1-requirements-estimation' },
            { text: '14.2 Architecture Styles', link: '/system-design/14.2-architecture-styles' },
            { text: '14.3 Networking & Protocols', link: '/system-design/14.3-networking-communication' },
            { text: '14.4 Load Balancing & Scaling', link: '/system-design/14.4-load-balancing-scaling' },
            { text: '14.5 Databases & Storage', link: '/system-design/14.5-databases-storage' },
            { text: '14.6 Multi-Tier Caching', link: '/system-design/14.6-caching' },
            { text: '14.7 Messaging & Queues', link: '/system-design/14.7-messaging-queues' },
            { text: '14.8 Concurrency & Consistency', link: '/system-design/14.8-consistency-concurrency' },
            { text: '14.9 Reliability & Resilience', link: '/system-design/14.9-reliability-resilience' },
            { text: '14.10 API Design & Rate Limiting', link: '/system-design/14.10-api-design-rate-limiting' },
            { text: '14.11 Security Architecture', link: '/system-design/14.11-security-architecture' },
            { text: '14.12 Search & AI Pipelines', link: '/system-design/14.12-search-ai-architecture' },
            { text: '14.13 Real-Time Systems', link: '/system-design/14.13-real-time-systems' },
            { text: '14.14 Observability & Telemetry', link: '/system-design/14.14-observability-operations' },
            { text: '14.15 Performance Engineering', link: '/system-design/14.15-performance-engineering' },
            { text: '14.16 Cost & Cloud Trade-offs', link: '/system-design/14.16-cost-tradeoffs' },
            { text: '14.17 Classic System Design Problems', link: '/system-design/14.17-classic-system-design-problems' },
            { text: 'Decisions Log', link: '/system-design/decisions' }
          ]
        }
      ],
      search: {
        provider: 'local'
      },
      outline: [2, 3],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/AVISHJAIN9/54-login-auth-portal' }
      ]
    },
    mermaid: {}
  })
)
