# P2 — OpenStart · approve before any post

**Format:** LinkedIn + X  
**Working title:** YOLO mode, safely: Docker Sandboxes and why we still won’t auto-publish  
**Sources:** Docker product [1], docs [2], microVM blog [3], HN 49239751 [4]  
**Do not post until Viswa says publish.**

---

## X (post this, not a generic “AI agents need safety” tweet)

Docker Sandboxes hit HN at 692 points / 397 comments this week.

Not a container. A microVM per agent. Host stays untouched. They call it YOLO mode *because* the wall is the VM.

That’s the OpenStart stack we already run: sandbox + MCP + a human before prod. We still will not auto-publish.

https://docs.docker.com/ai/sandboxes/

---

## LinkedIn

Docker just productized what we already treat as table stakes.

Docker Sandboxes (`sbx`) — 692 points on HN this week — give each coding agent its own microVM. Own kernel. Own Docker daemon. Host filesystem not in play. Their line is “YOLO mode, safely”: no permission prompts, because the sandbox *is* the permission.

That is not a reason to let agents ship.

OpenStart’s onboard is still Discover → Plan → you approve once → Apply. Same rule we use on Hermes ops: Dharma and Bheema are production hosts, not disposable laptops. Coding agents (Claude Code, Codex, OpenCode) go in `sbx`. Publish, Coolify, and prod still need a person.

Containment is the product. Approval is still the product.

Docs: https://docs.docker.com/ai/sandboxes/

---

## Do not use

- “The future of AI is safe autonomy”
- “We’re excited to announce”
- Anything that implies Hermes is broken or that we installed `sbx` on Dharma this week (we did not)
