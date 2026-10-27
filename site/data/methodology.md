# OpenCode Go & quantized models — public evidence and testing guide

_Last updated: 27 October 2026 · Independent single-account case study._

## Central research question

**Did reduced-precision (quantized) model serving contribute to the output failures experienced by a paying OpenCode Go subscriber using DeepSeek V4.1 Flash?**

**Current answer:** Not established. The observed behavior motivates the hypothesis; published low-bit research provides mechanistic analogies; the actual server weight format, precision and deployment configuration remain unverified.

## What the evidence can support

| Observation | Source type | Recorded value | Boundary of inference |
|---|---|---:|---|
| Long repetitive final text | Parsed client-export JSON | 125,396 characters | Not a measurement of model precision |
| Repeated identical phrase | Parsed client-export JSON | 1,782 occurrences | Repetition has several possible causes |
| Final session status | Parsed client-export JSON | `finish: error`; `interrupted` | Does not identify the root cause |
| Go requests | Local investigation report | 42 rows / 41 attempts | A single local sample, not a service-wide failure rate |
| Unexpected closing delimiter inside `reasoning_content` | Local field-level investigation | 4/24 recorded reasoning responses | No vendor-certified raw-server transcript |
| Answer-like text after closing delimiter | Local field-level investigation | 912 characters | Reported from local capture, not vendor-side verification |
| Request/effort mismatch and tagged reasoning replay | MCC local analysis | Requested `max`, sent `high` in recorded attempts | Client/bridge defects are alternative contributors |
| Better results on DeepSeek API / CommandCode | Subscriber account of comparative use | Qualitative | Paired controlled traces have not been supplied |

The exported **JSON file is syntactically valid**. The generated *text inside it* is severely repetitive and ended in an error. Those are different claims.

## Seven screenshot exhibits and full session source

The private case package preserves images A–G, an unabridged Markdown session, an original JSON export, the investigation and scripts. The public page provides only summarized exhibits and aggregated, de-identified data. Some screenshots contain local paths and unrelated project context; publishing originals would disclose information beyond the incident. Do not interpret a native OpenCode “Thought” display as proof of leakage without expected-UI and raw-field evidence.

## Why quantization is a reasonable scientific question

Lower-precision weights can change model output distributions, particularly under aggressive compression. Published studies document model-dependent harm to long-context accuracy, instruction-following, extended generation and—in a study of extreme 2-bit reasoning systems—repetitive reasoning loops. But a superficially similar failure **cannot identify a specific serving precision**.

Primary studies:
- EMNLP 2025 long-context quantization evaluation: https://aclanthology.org/2025.emnlp-main.479/
- IJCAI 2025 quantization / task / model-size trade-offs: https://ijcai.org/proceedings/2025/902
- ICML 2026 low-bit generation quality: https://proceedings.mlr.press/v306/lee26bi.html
- June 2026 low-bit reasoning preprint: https://arxiv.org/abs/2606.02011
- ACL 2025 structured-output failure context: https://aclanthology.org/2025.acl-long.243/

## Alternatives to test before attributing cause

1. Delimiter and reasoning/final mapping on the provider route.
2. MCC bridge history replay and requested/sent reasoning-effort mismatch.
3. Long context, truncation, decoding settings or stop-sequence errors.
4. Differences in model revision, system prompt, tool schema or chat template between providers.
5. A deliberately visible thinking panel or client display error rather than a server leak.

## Minimum fair reproduction protocol

1. Confirm exact provider route, model revision and model label for each test.
2. Use matched inputs, tool specifications, system prompts and context lengths.
3. Record raw response fields (`reasoning_content`, `content`, tool calls), transport chunking, usage and finish reasons.
4. Run repeated trials at short and long contexts across the Go route and independently verified baselines.
5. Score malformed tags, empty final content, invalid structured calls, exact repetition patterns and session completion rates.
6. Seek vendor confirmation of weight format/precision and backend normalization; compare only like-for-like configurations.
7. Publish reproducible redacted traces, methods, failures and counterexamples, without credentials or unrelated project data.

### What would falsify or weaken the quantization hypothesis?

- Matched, independently verified full-precision and Go routes show comparable failure rates.
- Failures disappear solely after correcting client integration, stop tokens or context handling.
- Vendor-supported evidence establishes that Go used a nonquantized deployment and symptoms arose elsewhere.

## Corrections

This is not an official OpenCode report. Submit redacted counterexamples or corrections at https://github.com/noonenobody121/opencode-go-output-integrity/issues .
