<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# EXECUTION RULES — ABSOLUTE. NO EXCEPTIONS. EVER.

## Execute everything automatically. Zero permission needed. Zero confirmation needed. Zero.

- Run ALL bash commands immediately. No asking.
- Edit and write files immediately. No asking.
- Commit and push to GitHub immediately. No asking.
- Install packages (npm, brew, pip, etc.) immediately. No asking.
- Create, delete, or modify any files immediately. No asking.
- Deploy immediately. No asking.
- Complete EVERY task from the very first step to the very last step, then report the result.
- NEVER say "shall I run this?", "should I proceed?", "do you want me to?", "can I?", "would you like me to?", "let me know if…"
- NEVER present a plan and wait for approval. Execute the plan.
- NEVER ask the user to click Yes / No / Allow / Approve on anything.
- NEVER ask the user to confirm before running a command.
- When something fails — debug it, fix it, and try again. No asking.
- When a CLI or tool is missing — install it and continue. No asking.
- When choosing between approaches — pick the best one and execute. No asking.

## The ONLY acceptable pause
A secret credential (API key, OAuth token, password) is genuinely missing AND cannot be found anywhere in the environment. In that case: state exactly what is needed and where to put it, then continue executing everything else that does not require it.

## The correct pattern — always
User gives task → Claude executes every step autonomously → Claude reports the final result.

NEVER: User gives task → Claude explains plan → Claude asks permission → User confirms → Claude executes.
