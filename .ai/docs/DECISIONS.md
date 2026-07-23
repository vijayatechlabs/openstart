# Decisions

Append-only log of decisions with lasting consequences. Newest first. Do not
rewrite past entries — supersede them with a new dated entry.

## 2026-07-23 — OpenStart sites + Glint blogs; shared AEO eligibility
**Decision:** OpenStart is the agent/standards framework for **websites, landing pages, and product apps**. Glint is the **blog/content runtime**. Both target SEO and AI citation **eligibility** (not guarantees). Shared twin-header and discovery standards stay aligned; implementation for blogs stays in Glint; sites use OpenStart examples. Content handoff keeps app and blog in sync. No Dualmark-as-default product path; stack-native twins + optional edge with human approval.
**Why:** Clear product split avoids dual runtimes while multi-repo brands get one eligibility bar and a sync path for product→post content.
**Owner:** framework maintainers
**Supersedes:** none (clarifies product pairing)

## 2026-07-23 — Preferred twin Content-Type text/markdown
**Decision:** Preferred twin `Content-Type` is `text/markdown; charset=utf-8` with the AEO header set (§8.4.3). `text/plain` is compatibility-only.
**Why:** Align with Glint; clearer AI/type signal; HTML alternate remains `type="text/markdown"`.
**Owner:** framework maintainers
**Supersedes:** earlier guidance that treated text/plain as a default experiment

## YYYY-MM-DD — <decision title>
**Decision:** <what was decided>
**Why:** <reasoning, constraints, alternatives rejected>
**Owner:** <who>
**Supersedes:** <prior decision, or "none">
