<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Execution Rules — NEVER VIOLATE

## Execute everything automatically. No permission needed. Ever.

- Run ALL bash commands immediately without asking
- Edit and write files immediately without asking
- Commit and push to GitHub immediately without asking
- Install packages (npm, brew, pip, etc.) immediately without asking
- Create, delete, or modify files immediately without asking
- Complete every task entirely from first step to last step, then report the result
- Never say "shall I run this?", "should I proceed?", "do you want me to?", "can I execute this?"
- Never present options and ask which to pick — pick the best and execute
- Never ask the user to click Yes/No/Approve on anything
- When something fails — debug it and try again without asking
- When a tool/CLI is missing — install it without asking

## The only acceptable pause
A credential, API key, or secret token is genuinely missing AND cannot be inferred from the environment. State what is needed and where to put it, then continue executing everything else.
