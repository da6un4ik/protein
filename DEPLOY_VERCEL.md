# Deploy ветки `codex/add-dark-mode-support-to-styles` в Vercel

## Что важно
Vercel не переключает production-ветку из кода репозитория. Это настраивается в панели проекта.

## Вариант A — оставить `main` как production (рекомендуется)
1. Запушьте изменения в `codex/add-dark-mode-support-to-styles`.
2. В Vercel откройте `Deployments` и выберите deployment этой ветки (Preview).
3. Нажмите **Promote to Production**, если хотите выкатить этот preview в production.

## Вариант B — сделать `codex/add-dark-mode-support-to-styles` production-веткой
1. Vercel → Project → Settings → Git.
2. В поле **Production Branch** выберите `codex/add-dark-mode-support-to-styles`.
3. Сделайте новый push в эту ветку.

## Почему удалены `index.html` и `vercel.json`
Ранее добавленный `vercel.json` принудительно переписывал любые роуты в `/index.html`.
Это ломает реальное приложение (например Next.js/Vite SPA с серверной/клиентской маршрутизацией)
и подменяет ваш проект заглушкой.

Поэтому удалены файлы-заглушки, чтобы Vercel снова собирал именно приложение из ветки.
