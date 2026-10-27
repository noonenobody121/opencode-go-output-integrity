# OpenCode Go & Quantized Models — Evidence-Led Subscriber Case Study

Live site: https://noonenobody121.github.io/opencode-go-output-integrity/

An independent investigation into whether reduced-precision / quantized model serving could have contributed to severe output failures experienced by one paying OpenCode Go subscriber using DeepSeek V4.1 Flash.

## Central distinction

**Observed:** Large repeated final response, reported upstream reasoning-tag anomalies, visible native-client and bridged-client formatting problems, and separate documented MCC adapter defects.

**Hypothesis:** Aggressive quantization *might* contribute to the output degradation, as suggested by published low-bit research. **Not verified:** OpenCode Go's deployed weight precision, exact backend configuration, or causal attribution to quantization.

The site makes the paid-subscriber chronology, technical evidence, screenshots/exhibit descriptions, research and competing causes easy to understand without overstating certainty.

## Evidence and reproducibility

- `site/data/evidence.json`: redacted counts and evidence classifications.
- `site/data/methodology.md`: evidence inventory, original source context, published studies, fair-comparison protocol, and what would weaken or falsify the hypothesis.
- `site/index.html`: visual evidence catalog and readable case narrative.

Original screenshots, full JSON/Markdown sessions and private legal files are **not** included in the public repository because they contain identifying local paths and unrelated project materials. The published catalog describes the exhibit provenance and limitations.

## Static deployment

A plain HTML/CSS/JavaScript site, without a build framework, database or external analytics. GitHub Pages deploys automatically from `main` through `.github/workflows/pages.yml`; the configured source is **GitHub Actions**.

## Corrections

Use [GitHub Issues](https://github.com/noonenobody121/opencode-go-output-integrity/issues) to submit redacted reproductions, contrary evidence or corrections. This site is not affiliated with OpenCode or DeepSeek.
