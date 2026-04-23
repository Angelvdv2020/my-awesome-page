# VORTEX — деплой на VPS

## Сборка локально
```bash
npm ci
npm run build
# результат в ./dist
```

## Заливка на сервер
```bash
rsync -avz --delete dist/ user@server:/var/www/vortex/dist/
```

## Nginx
1. Скопируйте `deploy/nginx.conf` в `/etc/nginx/sites-available/vortex`.
2. Подмените `server_name` на `www.vortex1.ru`.
3. `ln -s /etc/nginx/sites-available/vortex /etc/nginx/sites-enabled/`.
4. `nginx -t && systemctl reload nginx`.

## HTTPS
```bash
certbot --nginx -d vortex1.ru -d www.vortex1.ru
```

## Что внутри
- Чистые URL: `/`, `/services`, `/solutions`, `/events`, `/komplaens-i-delovaya-etika` — всё через React Router.
- Один `PageRenderer` (`src/pages/PageRenderer.tsx`) — общий обработчик всех маршрутов.
- Контент страниц — структурированные блоки в `src/content/pages/*.json` (`version: 2`).
- Общий Layout (`SiteLayout.tsx`): header VORTEX + навигация + Telegram + кнопка «Подключить» + footer.
- Pre-render статических HTML-снапшотов через `scripts/prerender.py`.

## Добавление страницы
1. Создайте `src/content/pages/<slug>.json` со структурой `StructuredPage` (см. `src/content/types.ts`).
2. Добавьте запись в `src/content/pages/_manifest.json`.
3. Пересоберите проект.
