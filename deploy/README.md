# Vortex — деплой на VPS

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
2. Подмените `server_name`.
3. `ln -s /etc/nginx/sites-available/vortex /etc/nginx/sites-enabled/`.
4. `nginx -t && systemctl reload nginx`.

## HTTPS
```bash
certbot --nginx -d example.com -d www.example.com
```

## Что внутри
- Чистые URL: `/`, `/services/waf`, `/webinars/...` — всё через React Router.
- Один `PageRenderer` (`src/pages/PageRenderer.tsx`) — общий обработчик всех маршрутов.
- 51 страница пре-рендерена в `src/content/pages/*.json` (контент + title + description).
- Общий Layout (`SiteLayout.tsx`): header Vortex + nav + VK/Telegram + кнопка «Войти» + footer.
- Все клики по внутренним ссылкам внутри legacy-контента перехватываются и идут через `navigate()` без перезагрузки.
- Статика (`/site/upload/...`, `/site/_next/...`) кэшируется на год.

## Обновление контента
Перегенерировать JSON из исходных HTML (`public/site/`):
```bash
python3 scripts/extract-pages.py
```
