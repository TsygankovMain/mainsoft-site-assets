/* Сайт-визитка с реквизитами: копирование в буфер. Кнопки без JS скрыты (класс js на <html>). */
(function () {
  function run() {
    var d = document;
    d.documentElement.classList.add('js');
    var toast = d.querySelector('.rq-toast'), timer;

    function say(text) {
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add('is-on');
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.remove('is-on'); }, 1800);
    }

    function copy(text) {
      if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
      return new Promise(function (ok, fail) {          // запасной путь для старых браузеров
        var t = d.createElement('textarea');
        t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;left:-9999px;top:0';
        d.body.appendChild(t); t.select();
        try { d.execCommand('copy') ? ok() : fail(); } catch (e) { fail(e); }
        t.remove();
      });
    }

    function done(btn, msg) {
      btn.classList.add('is-done');
      var was = btn.getAttribute('data-text') || btn.textContent;
      btn.setAttribute('data-text', was);
      if (btn.hasAttribute('data-copy')) btn.textContent = 'Скопировано';
      say(msg);
      setTimeout(function () { btn.classList.remove('is-done'); btn.textContent = was; }, 1600);
    }

    function allText() {
      var out = [];
      d.querySelectorAll('[data-copy-group]').forEach(function (g) {
        out.push(g.getAttribute('data-copy-group').toUpperCase());
        g.querySelectorAll('[data-label]').forEach(function (v) {
          out.push(v.getAttribute('data-label') + ': ' + v.textContent.trim());
        });
        out.push('');
      });
      return out.join('\n').trim();
    }

    d.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-copy], [data-copy-all]');
      if (!btn) return;
      e.preventDefault();
      var all = btn.hasAttribute('data-copy-all');
      copy(all ? allText() : btn.getAttribute('data-copy')).then(
        function () { done(btn, all ? 'Реквизиты скопированы' : 'Скопировано: ' + btn.getAttribute('data-copy')); },
        function () { say('Не удалось скопировать — выделите текст вручную'); }
      );
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
