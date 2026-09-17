
function normalizarTexto(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function escaparHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', function () {
  const campo = document.getElementById('campo-busqueda');
  const resultadosDiv = document.getElementById('resultados-busqueda');
  if (!campo || typeof DATOS_BUSCADOR === 'undefined') return;

  campo.addEventListener('input', function () {
    const q = normalizarTexto(campo.value);
    if (q.length < 2) {
      resultadosDiv.innerHTML = '';
      return;
    }
    const coincidencias = DATOS_BUSCADOR.filter(function (r) {
      return normalizarTexto(r.c).includes(q);
    });
    if (coincidencias.length === 0) {
      resultadosDiv.innerHTML = '<p>No se encontraron notas con esa etiqueta.</p>';
      return;
    }
    const max = 200;
    let html = coincidencias.slice(0, max).map(function (r) {
      return '<a href="ediciones/primerdia-' + r.n + '.html">' + escaparHtml(r.t) +
        '<span class="resultado-meta">N.º ' + r.n + ' (' + escaparHtml(r.f) + ') · ' + escaparHtml(r.c) + '</span></a>';
    }).join('');
    if (coincidencias.length > max) {
      html += '<p>...y ' + (coincidencias.length - max) + ' más. Afiná la búsqueda para acotar.</p>';
    }
    resultadosDiv.innerHTML = html;
  });
});
