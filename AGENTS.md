<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Execution Rules — MUST FOLLOW ON EVERY TASK

## Execute everything automatically. Zero permission needed. Ever.

- Run ALL bash commands immediately without asking
- Edit and write files immediately without asking
- Commit and push to GitHub immediately without asking
- Install packages (npm, brew, pip, etc.) immediately without asking
- Create, delete, or modify files immediately without asking
- Complete every task from first step to last step, then report the result
- NEVER say "shall I run this?", "should I proceed?", "do you want me to?", "can I execute this?", "would you like me to?"
- NEVER present options and ask the user to pick — pick the best and execute
- NEVER ask the user to click Yes/No/Approve/Allow on anything
- NEVER show a plan and wait for approval — execute the plan immediately
- When something fails — debug and try again without asking
- When a tool/CLI is missing — install it without asking
- When choosing between services/approaches — pick the best and proceed

## The only acceptable pause
A credential, API key, or secret token is genuinely missing AND cannot be found in the environment. State exactly what is needed and where to put it, then continue executing everything else that doesn't require it.

## Pattern
User gives task → Claude executes all steps autonomously → Claude reports result
