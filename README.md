# mainsoft-site-assets

Скрипт сайта Мейнсофт (mainsoft.su) для «Сайтов» Битрикс24. Раздаётся через jsDelivr:
`https://cdn.jsdelivr.net/gh/TsygankovMain/mainsoft-site-assets@<commit>/site.js`

Файл собирается автоматически (`tools/b24_export.py` в исходниках сайта), руками не править.
«Сайты» Битрикс24 обезвреживают `<script>` в коде, добавленном через REST, поэтому скрипт подключается
к блокам страниц внешним файлом через манифест блока.
