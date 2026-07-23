# llms.txt template (SaaS / marketing site)

Copy to your site root as `/llms.txt` (or generate via route). Keep it **short** —
a tour guide, not a dump. Pair with `robots.txt` (access gate). See AEO-FRAMEWORK §8.4.5.

```text
# {Brand}

> One sentence: what you do and for whom.

## Product
- [Home](https://example.com/): …
- [Product](https://example.com/product): …
- [Pricing](https://example.com/pricing): …

## Docs & trust
- [Docs](https://example.com/docs): …
- [About](https://example.com/about): …
- [FAQ](https://example.com/faq): …
- [Privacy](https://example.com/privacy): …

## Content
- [Blog](https://example.com/blog/): …   # or Glint blog URL if split
- Full content (optional): https://example.com/llms-full.txt

## Contact
- https://example.com/contact
```

Rules:
- Only public, indexable URLs.
- Link `llms-full.txt` only if it contains real page/post bodies (not a clone of this file).
- Update when IA changes; measure CDN logs — do not assume crawlers always fetch llms.txt.
