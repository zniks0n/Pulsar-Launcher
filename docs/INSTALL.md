# Installation and external links / Установка и внешние ссылки

The website intentionally shows “not published yet” for installer and portable-download metadata until real binaries exist. To wire real downloadable files, put the direct public URLs and verified metadata in the `RELEASES` object near the top of `app.js`; the page must not advertise a release before it has been published.

Сайт намеренно показывает, что установщик и портативная версия ещё не опубликованы, пока не существуют настоящие файлы. Чтобы подключить загрузки, укажите прямые публичные URL и проверенные метаданные в объекте `RELEASES` в начале `app.js`; не объявляйте релиз до публикации файлов.

The Discord invite is configured in `LINKS.discord` in `app.js`. The GitHub URL is configured in `LINKS.github`. Replace their bracketed placeholders only with real links. The site does not display a made-up invite or member count.

Ссылка Discord задаётся в `LINKS.discord` в `app.js`. Адрес GitHub задаётся в `LINKS.github`. Заменяйте заглушки в квадратных скобках только на реальные ссылки. Сайт не показывает выдуманные приглашение или число участников.

Development support is already wired to the requested DonationAlerts destination via the single `DONATE_URL` constant at the top of `app.js`.

Поддержка разработки уже ведёт на DonationAlerts через единственную константу `DONATE_URL` в начале `app.js`.
