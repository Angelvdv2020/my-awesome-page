

## План одобрен — приступаю к реализации

Делаю ровно то, что согласовано. Никакого редизайна, только quality gate.

### Этапы

1. **`scripts/check-build.py`** — `urllib.parse.unquote` перед `os.path.exists`, срез query/hash, разделение `[MISSING ASSET]` vs `[BAD URL]`.
2. **Реальные битые ассеты** — после п.1 добиваю до нуля правкой имён в соответствующих JSON в `src/content/pages/`.
3. **Lint (3 ошибки)**:
   - `src/components/ui/textarea.tsx` — пустой interface → `type`.
   - `src/components/ui/command.tsx` — пустой interface → `type`.
   - `tailwind.config.ts` — `require()` → ESM `import`.
4. **`src/pages/PageRenderer.tsx`** — контролируемый список head-тегов, удаление тех, для которых у новой страницы нет значения. JSON-LD уже чистится.
5. **Тесты**:
   - Удаляю `src/test/example.test.ts`.
   - Создаю `src/lib/url-rewrite.ts` (TS-логика нормализации URL).
   - `src/test/url-rewrite.test.ts` — юнит-тесты на rewrite.
   - `src/test/page-renderer.test.tsx` — рендер с моком `useLocation`, проверка что старые meta удаляются между страницами.
   - `src/test/manifest.test.ts` — каждый slug в `_manifest.json` имеет JSON с обязательными полями.
6. **`npm audit fix`** без `--force`. Остаточные dev-only — короткая запись в `README.md`.

### Definition of Done

- `npm run build` → ok
- `python3 scripts/prerender.py` → 51 page
- `python3 scripts/check-build.py` → `Errors: 0`
- `npm run lint` → 0 errors
- `npm test` → все зелёные, без заглушки
- `npm audit` → high = 0

### Отчёт после выполнения

Пришлю: список изменённых файлов, вывод каждой из 5 команд, явное подтверждение по каждому пункту DoD.

