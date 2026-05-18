// 1. Chaves de Acesso (Não altere a lógica de concatenação)
var _p1 = '1uEKOtUY2xyHGDGnHXt9w';
var _p2 = 'Dkyhj04lKJnx8eKtx9o2dEs';
window.SHEET_ID = _p1 + _p2;

// 2. Builder de URL — evita repetição do endpoint base
var _base = "https://docs.google.com/spreadsheets/d/".concat(window.SHEET_ID, "/gviz/tq");
var _url = function _url(sheet, range) {
    return "".concat(_base, "?sheet=").concat(sheet, "&range=").concat(range);
};

// 3. Configurações das Abas (lidas pelo main.js)
window.DASH_CONFIG = {
    registro: {
        RANGE: 'A2:N',
        URL: _url('registro', 'A2:N')
    },
    nuvem: {
        RANGE: 'A2:C',
        URL: _url('nuvem', 'A2:C')
    },
    novidades: {
        RANGE: 'A2:C',
        URL: _url('novidades', 'A2:C')
    },
    social: {
        RANGE: 'A2:D',
        URL: _url('social', 'A2:D')
    }
};

// 4. Configurações Globais de Interface
var ajustarConfiguracoesPorTela = function ajustarConfiguracoesPorTela() {
    window.ITENS_POR_PAGINA = window.innerWidth <= 850 ? 4 : 3;
};
ajustarConfiguracoesPorTela();
window.addEventListener('resize', ajustarConfiguracoesPorTela);

// 5. Elementos Visuais Globais
window.LOADER_HTML = '<div class="boxLoading"><div class="imgLoading"></div></div>';
"use strict";

var Utils = function () {
    var LOADER = function LOADER() {
        var _window$LOADER_HTML;
        return (_window$LOADER_HTML = window.LOADER_HTML) !== null && _window$LOADER_HTML !== void 0 ? _window$LOADER_HTML : '';
    };
    var categoriaClass = function categoriaClass(cat) {
        var str = Array.isArray(cat) ? cat[0] : cat;
        if (!str) return '';
        return str.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
    };
    var removerLoader = function removerLoader(elemento) {
        var _elemento$closest;
        if (!elemento) return;
        var container = (_elemento$closest = elemento.closest('.keen-slider__slide')) !== null && _elemento$closest !== void 0 ? _elemento$closest : elemento.parentElement;
        var loader = container === null || container === void 0 ? void 0 : container.querySelector('.boxLoading');
        if (!loader) return;
        loader.classList.add('zoomOut');
        setTimeout(function () {
            return loader.parentNode && loader.remove();
        }, 500);
    };
    var formatarData = function formatarData(celula) {
        var _celula$f;
        if (!celula) return 'Sem data';
        if ((_celula$f = celula.f) !== null && _celula$f !== void 0 && _celula$f.includes('/')) return celula.f;
        if (celula.v) {
            var d = new Date(celula.v);
            if (!isNaN(d.getTime())) {
                var dia = String(d.getUTCDate()).padStart(2, '0');
                var mes = String(d.getUTCMonth() + 1).padStart(2, '0');
                return "".concat(dia, "/").concat(mes, "/").concat(d.getUTCFullYear());
            }
        }
        return 'Sem data';
    };
    var debounce = function debounce(fn) {
        var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var timer;
        return function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            clearTimeout(timer);
            timer = setTimeout(function () {
                return fn.apply(void 0, args);
            }, ms);
        };
    };
    return {
        LOADER: LOADER,
        categoriaClass: categoriaClass,
        removerLoader: removerLoader,
        formatarData: formatarData,
        debounce: debounce
    };
}();
window.Utils = Utils;
window.removerLoader = Utils.removerLoader;
window.formatarDataPlanilha = Utils.formatarData;
"use strict";

var Store = function () {
    var _dadosOriginais = [];
    var _dadosFiltrados = [];
    var _paginaAtual = 1;
    return {
        get dadosOriginais() {
            return _dadosOriginais;
        },
        set dadosOriginais(v) {
            _dadosOriginais = v;
            _dadosFiltrados = v;
        },
        get dadosFiltrados() {
            return _dadosFiltrados;
        },
        set dadosFiltrados(v) {
            _dadosFiltrados = v;
        },
        get paginaAtual() {
            return _paginaAtual;
        },
        resetPagina: function resetPagina() {
            _paginaAtual = 1;
        },
        avancarPagina: function avancarPagina() {
            _paginaAtual++;
        }
    };
}();
window.Store = Store;
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() { } function GeneratorFunction() { } function GeneratorFunctionPrototype() { } t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var API = function () {
    var parseGoogleDate = function parseGoogleDate(v) {
        if (!v) return 0;
        if (typeof v === 'number') return v;
        var m = String(v).match(/Date\((\d+),(\d+),(\d+)\)/);
        if (m) return new Date(+m[1], +m[2], +m[3]).getTime();
        return new Date(v).getTime() || 0;
    };
    var limparJSON = function limparJSON(text) {
        var start = text.indexOf('{');
        var end = text.lastIndexOf('}');
        if (start === -1 || end === -1) return null;
        return JSON.parse(text.substring(start, end + 1));
    };
    var fetchSheet = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
            var URL, res, text;
            return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                    case 0:
                        URL = _ref.URL;
                        _context.n = 1;
                        return fetch(URL);
                    case 1:
                        res = _context.v;
                        _context.n = 2;
                        return res.text();
                    case 2:
                        text = _context.v;
                        return _context.a(2, limparJSON(text));
                }
            }, _callee);
        }));
        return function fetchSheet(_x) {
            return _ref2.apply(this, arguments);
        };
    }();

    // Parsers por aba — cada um sabe exatamente quais colunas esperar

    var parseRegistro = function parseRegistro(_ref3) {
        var table = _ref3.table;
        return table.rows.map(function (_ref4) {
            var _colActive$v$toString, _colActive$v, _colImagemFull$v, _colImagemMobile$v, _colImagemThumb$v, _colImagemDestaque$v, _colLink$v, _colTitle$v, _colDescription$v, _colDestaque$v$toStri, _colDestaque$v, _colSlide$v$toString$, _colSlide$v, _colData$f, _colCapa$v;
            var c = _ref4.c;
            var _c = _slicedToArray(c, 14),
                colActive = _c[0],
                colImagemFull = _c[1],
                colImagemMobile = _c[2],
                colImagemThumb = _c[3],
                colImagemDestaque = _c[4],
                colLink = _c[5],
                colTitle = _c[6],
                colDescription = _c[7],
                colCategoria = _c[8],
                colDestaque = _c[9],
                colSlide = _c[10],
                colVisualizacoes = _c[11],
                colData = _c[12],
                colCapa = _c[13];
            return {
                active: (_colActive$v$toString = colActive === null || colActive === void 0 || (_colActive$v = colActive.v) === null || _colActive$v === void 0 ? void 0 : _colActive$v.toString().toUpperCase()) !== null && _colActive$v$toString !== void 0 ? _colActive$v$toString : '',
                imagemFull: (_colImagemFull$v = colImagemFull === null || colImagemFull === void 0 ? void 0 : colImagemFull.v) !== null && _colImagemFull$v !== void 0 ? _colImagemFull$v : '',
                imagemMobile: (_colImagemMobile$v = colImagemMobile === null || colImagemMobile === void 0 ? void 0 : colImagemMobile.v) !== null && _colImagemMobile$v !== void 0 ? _colImagemMobile$v : '',
                imagemThumb: (_colImagemThumb$v = colImagemThumb === null || colImagemThumb === void 0 ? void 0 : colImagemThumb.v) !== null && _colImagemThumb$v !== void 0 ? _colImagemThumb$v : '',
                imagemDestaque: (_colImagemDestaque$v = colImagemDestaque === null || colImagemDestaque === void 0 ? void 0 : colImagemDestaque.v) !== null && _colImagemDestaque$v !== void 0 ? _colImagemDestaque$v : '',
                link: (_colLink$v = colLink === null || colLink === void 0 ? void 0 : colLink.v) !== null && _colLink$v !== void 0 ? _colLink$v : '',
                title: (_colTitle$v = colTitle === null || colTitle === void 0 ? void 0 : colTitle.v) !== null && _colTitle$v !== void 0 ? _colTitle$v : '',
                description: (_colDescription$v = colDescription === null || colDescription === void 0 ? void 0 : colDescription.v) !== null && _colDescription$v !== void 0 ? _colDescription$v : '',
                categoria: colCategoria !== null && colCategoria !== void 0 && colCategoria.v ? colCategoria.v.split(',').map(function (cat) {
                    return cat.trim();
                }) : [],
                destaque: (_colDestaque$v$toStri = colDestaque === null || colDestaque === void 0 || (_colDestaque$v = colDestaque.v) === null || _colDestaque$v === void 0 ? void 0 : _colDestaque$v.toString().toUpperCase()) !== null && _colDestaque$v$toStri !== void 0 ? _colDestaque$v$toStri : '',
                slide: (_colSlide$v$toString$ = colSlide === null || colSlide === void 0 || (_colSlide$v = colSlide.v) === null || _colSlide$v === void 0 ? void 0 : _colSlide$v.toString().toUpperCase()) !== null && _colSlide$v$toString$ !== void 0 ? _colSlide$v$toString$ : '',
                visualizacoes: parseInt(colVisualizacoes === null || colVisualizacoes === void 0 ? void 0 : colVisualizacoes.v) || 0,
                data: colData ? (_colData$f = colData.f) !== null && _colData$f !== void 0 ? _colData$f : colData.v : '',
                dataRaw: parseGoogleDate(colData === null || colData === void 0 ? void 0 : colData.v),
                capa: (_colCapa$v = colCapa === null || colCapa === void 0 ? void 0 : colCapa.v) !== null && _colCapa$v !== void 0 ? _colCapa$v : ''
            };
        }).filter(function (item) {
            return item.active === 'ON';
        }).sort(function (a, b) {
            return b.dataRaw - a.dataRaw;
        });
    };
    var parseNuvem = function parseNuvem(_ref5) {
        var table = _ref5.table;
        return table.rows.map(function (_ref6) {
            var _colActive$v$toString2, _colActive$v2, _colTitle$v2, _colLink$v2;
            var _ref6$c = _slicedToArray(_ref6.c, 3),
                colActive = _ref6$c[0],
                colTitle = _ref6$c[1],
                colLink = _ref6$c[2];
            return {
                active: (_colActive$v$toString2 = colActive === null || colActive === void 0 || (_colActive$v2 = colActive.v) === null || _colActive$v2 === void 0 ? void 0 : _colActive$v2.toString().toUpperCase()) !== null && _colActive$v$toString2 !== void 0 ? _colActive$v$toString2 : '',
                title: (_colTitle$v2 = colTitle === null || colTitle === void 0 ? void 0 : colTitle.v) !== null && _colTitle$v2 !== void 0 ? _colTitle$v2 : '',
                link: (_colLink$v2 = colLink === null || colLink === void 0 ? void 0 : colLink.v) !== null && _colLink$v2 !== void 0 ? _colLink$v2 : ''
            };
        }).filter(function (item) {
            return item.active === 'ON';
        });
    };
    var parseNovidades = function parseNovidades(_ref7) {
        var table = _ref7.table;
        return table.rows.map(function (_ref8) {
            var _colActive$v$toString3, _colActive$v3, _colImage$v, _colLink$v3;
            var _ref8$c = _slicedToArray(_ref8.c, 3),
                colActive = _ref8$c[0],
                colImage = _ref8$c[1],
                colLink = _ref8$c[2];
            return {
                active: (_colActive$v$toString3 = colActive === null || colActive === void 0 || (_colActive$v3 = colActive.v) === null || _colActive$v3 === void 0 ? void 0 : _colActive$v3.toString().toUpperCase()) !== null && _colActive$v$toString3 !== void 0 ? _colActive$v$toString3 : '',
                image: (_colImage$v = colImage === null || colImage === void 0 ? void 0 : colImage.v) !== null && _colImage$v !== void 0 ? _colImage$v : '',
                link: (_colLink$v3 = colLink === null || colLink === void 0 ? void 0 : colLink.v) !== null && _colLink$v3 !== void 0 ? _colLink$v3 : ''
            };
        }).filter(function (item) {
            return item.active === 'ON';
        }).reverse();
    };
    var parseSocial = function parseSocial(_ref9) {
        var table = _ref9.table;
        return table.rows.map(function (_ref0) {
            var _colActive$v$toString4, _colActive$v4, _colImage$v2, _colVideo$v, _colLink$v4;
            var _ref0$c = _slicedToArray(_ref0.c, 4),
                colActive = _ref0$c[0],
                colImage = _ref0$c[1],
                colVideo = _ref0$c[2],
                colLink = _ref0$c[3];
            return {
                active: (_colActive$v$toString4 = colActive === null || colActive === void 0 || (_colActive$v4 = colActive.v) === null || _colActive$v4 === void 0 ? void 0 : _colActive$v4.toString().toUpperCase()) !== null && _colActive$v$toString4 !== void 0 ? _colActive$v$toString4 : '',
                image: (_colImage$v2 = colImage === null || colImage === void 0 ? void 0 : colImage.v) !== null && _colImage$v2 !== void 0 ? _colImage$v2 : '',
                video: (_colVideo$v = colVideo === null || colVideo === void 0 ? void 0 : colVideo.v) !== null && _colVideo$v !== void 0 ? _colVideo$v : '',
                link: (_colLink$v4 = colLink === null || colLink === void 0 ? void 0 : colLink.v) !== null && _colLink$v4 !== void 0 ? _colLink$v4 : ''
            };
        }).filter(function (item) {
            return item.active === 'ON';
        }).reverse();
    };

    // Carrega todas as abas em paralelo
    var carregarTudo = /*#__PURE__*/function () {
        var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            var _window$DASH_CONFIG, registro, nuvem, novidades, social, _yield$Promise$all, _yield$Promise$all2, jsonReg, jsonNuv, jsonNov, jsonSoc;
            return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                    case 0:
                        _window$DASH_CONFIG = window.DASH_CONFIG, registro = _window$DASH_CONFIG.registro, nuvem = _window$DASH_CONFIG.nuvem, novidades = _window$DASH_CONFIG.novidades, social = _window$DASH_CONFIG.social;
                        _context2.n = 1;
                        return Promise.all([fetchSheet(registro), fetchSheet(nuvem), fetchSheet(novidades), fetchSheet(social)]);
                    case 1:
                        _yield$Promise$all = _context2.v;
                        _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 4);
                        jsonReg = _yield$Promise$all2[0];
                        jsonNuv = _yield$Promise$all2[1];
                        jsonNov = _yield$Promise$all2[2];
                        jsonSoc = _yield$Promise$all2[3];
                        return _context2.a(2, {
                            registro: jsonReg ? parseRegistro(jsonReg) : [],
                            nuvem: jsonNuv ? parseNuvem(jsonNuv) : [],
                            novidades: jsonNov ? parseNovidades(jsonNov) : [],
                            social: jsonSoc ? parseSocial(jsonSoc) : []
                        });
                }
            }, _callee2);
        }));
        return function carregarTudo() {
            return _ref1.apply(this, arguments);
        };
    }();
    return {
        carregarTudo: carregarTudo
    };
}();
window.API = API;
"use strict";

var Templates = function () {
    var _Utils = Utils,
        LOADER = _Utils.LOADER,
        categoriaClass = _Utils.categoriaClass;

    // Exibe só a primeira categoria na pill — o array completo fica no data-category
    var textoCategoria = function textoCategoria(categoria) {
        return Array.isArray(categoria) ? categoria[0] : categoria;
    };
    var catClass = function catClass(categoria) {
        var first = Array.isArray(categoria) ? categoria[0] : categoria;
        return first ? "cat-".concat(categoriaClass(first)) : '';
    };

    // --- Templates de card ---

    var card = function card(item) {
        return "\n    <a class=\"cardMateria\" href=\"".concat(item.link, "\" data-category=\"").concat(textoCategoria(item.categoria), "\">\n      <div class=\"card-image\">\n        ").concat(LOADER(), "\n        <img src=\"").concat(item.imagemThumb, "\" alt=\"").concat(item.title, "\" loading=\"lazy\" decoding=\"async\" onload=\"window.removerLoader(this)\">\n        <div class=\"textCategoria ").concat(catClass(item.categoria), "\"><p>").concat(textoCategoria(item.categoria), "</p></div>\n        <div class=\"boxText\">\n          <p class=\"description\">").concat(item.description, "</p>\n        </div>\n      </div>\n      <div class=\"footer\">\n        <p class=\"title\">").concat(item.title, "</p>\n      </div>\n    </a>");
    };
    var cardCategoria = function cardCategoria(item) {
        return "\n    <a class=\"cardCategoriaItem\" href=\"".concat(item.link, "\">\n      <div class=\"card-thumb\">\n        ").concat(LOADER(), "\n        <img src=\"").concat(item.imagemThumb, "\" alt=\"").concat(item.title, "\" loading=\"lazy\" decoding=\"async\" onload=\"window.removerLoader(this)\">\n      </div>\n      <div class=\"card-body\">\n        <div class=\"textCategoria ").concat(catClass(item.categoria), "\"><p>").concat(textoCategoria(item.categoria), "</p></div>\n        <p class=\"title\">").concat(item.title, "</p>\n        <p class=\"description\">").concat(item.description, "</p>\n        <span class=\"ler-mais\">Ler mais...</span>\n      </div>\n    </a>");
    };
    var cardDestaque = function cardDestaque(item) {
        return "\n    <a class=\"cardMateria\" href=\"".concat(item.link, "\" data-category=\"").concat(textoCategoria(item.categoria), "\">\n      <div class=\"card-image\">\n        ").concat(LOADER(), "\n        <img src=\"").concat(item.imagemDestaque, "\" alt=\"").concat(item.title, "\" loading=\"lazy\" decoding=\"async\" onload=\"window.removerLoader(this)\">\n      </div>\n      <div class=\"boxText\">\n        <div class=\"textCategoria ").concat(catClass(item.categoria), "\"><p>").concat(textoCategoria(item.categoria), "</p></div>\n        <p class=\"title\">").concat(item.title, "</p>\n        <p class=\"description\">").concat(item.description, "</p>\n      </div>\n    </a>");
    };
    var link = function link(item) {
        return "\n    <a class=\"textCategoria\" href=\"".concat(item.link, "\">\n      <p>").concat(item.title, "</p>\n    </a>");
    };
    var botaoVerMais = function botaoVerMais() {
        return "<button id=\"btn-ver-mais\" class=\"btn-load-more\" onclick=\"window.carregarMaisItens()\">\n      Ver mais\n        <svg width=\"62\" height=\"62\" viewBox=\"0 0 62 62\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M30.6149 33.6099C30.8566 33.6672 31.1093 33.6672 31.3518 33.6097C31.631 33.5435 31.888 33.4035 32.0952 33.205L39.3188 26.2848C39.9499 25.6802 40.9527 25.7054 41.5526 26.3411C42.1462 26.97 42.1212 27.96 41.4968 28.5583L34.2562 35.4948C33.6451 36.0802 32.8899 36.491 32.07 36.6854C31.356 36.8547 30.6115 36.855 29.8966 36.6856C29.0742 36.4906 28.3183 36.0778 27.7073 35.4898L20.5009 28.5558C19.8777 27.9562 19.8549 26.9662 20.4498 26.3386C21.0511 25.7042 22.054 25.6812 22.6838 26.2872L29.8732 33.2048C30.0802 33.404 30.3363 33.5439 30.6149 33.6099Z\" fill=\"black\"/>\n        </svg>\n    </button>";
    };

    // --- Renderers ---

    var renderMaisVistas = function renderMaisVistas(itens) {
        var container = document.getElementById('asMaisVistas');
        if (!container || !(itens !== null && itens !== void 0 && itens.length)) return;
        container.innerHTML = itens.map(card).join('');
    };
    var renderBotaoVerMais = function renderBotaoVerMais(mostrar) {
        var container = document.getElementById('container-ver-mais');
        if (!container) return;
        container.innerHTML = mostrar ? botaoVerMais() : '';
    };
    var renderNuvem = function renderNuvem(itens) {
        var container = document.getElementById('nuvem');
        if (!container || !(itens !== null && itens !== void 0 && itens.length)) return;
        container.innerHTML = itens.map(link).join('');
    };
    return {
        card: card,
        cardCategoria: cardCategoria,
        cardDestaque: cardDestaque,
        link: link,
        renderMaisVistas: renderMaisVistas,
        renderBotaoVerMais: renderBotaoVerMais,
        renderNuvem: renderNuvem
    };
}();
window.Templates = Templates;

// Aliases globais usados por chamadas inline (onclick, etc.)
window.templateCard = Templates.card;
window.templateCardDestaque = Templates.cardDestaque;
window.templateMaisVistas = Templates.renderMaisVistas;
window.templateBotaoVerMais = Templates.renderBotaoVerMais;
window.renderizarNuvem = Templates.renderNuvem;
"use strict";

var ARROWS = {
    left: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgZmlsbD0id2hpdGUiIHZlcnNpb249IjEuMSIgaWQ9IkNhbWFkYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBvbHlnb24gcG9pbnRzPSIxOC43LDIxLjcgOSwxMiAxOC43LDIuMyAxNi44LDAuNCA1LjMsMTIgMTYuOCwyMy42ICIvPg0KPC9zdmc+DQo=',
    right: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgZmlsbD0id2hpdGUiIHZlcnNpb249IjEuMSIgaWQ9IkNhbWFkYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBvbHlnb24gcG9pbnRzPSI1LjMsMi4zIDE1LDEyIDUuMywyMS43IDcuMiwyMy42IDE4LjcsMTIgNy4yLDAuNCAiLz4NCjwvc3ZnPg0K'
};
var SliderPlugins = function () {
    // Plugin de navegação com setas e dots
    var navigation = function navigation(slider) {
        var wrapper, dots, arrowLeft, arrowRight;
        var createEl = function createEl(classes) {
            var el = document.createElement('div');
            classes.split(' ').forEach(function (c) {
                return el.classList.add(c);
            });
            return el;
        };
        var update = function update() {
            var _arrowLeft, _arrowRight, _dots$children, _dots;
            if (!slider.track.details) return;
            var _slider$track$details = slider.track.details,
                rel = _slider$track$details.rel,
                slides = _slider$track$details.slides;
            var isLoop = slider.options.loop;
            slider.slides.forEach(function (s, i) {
                return s.classList.toggle('center', i === rel);
            });
            (_arrowLeft = arrowLeft) === null || _arrowLeft === void 0 || _arrowLeft.classList.toggle('arrow-disabled', !isLoop && rel === 0);
            (_arrowRight = arrowRight) === null || _arrowRight === void 0 || _arrowRight.classList.toggle('arrow-disabled', !isLoop && rel === slides.length - 1);
            Array.from((_dots$children = (_dots = dots) === null || _dots === void 0 ? void 0 : _dots.children) !== null && _dots$children !== void 0 ? _dots$children : []).forEach(function (d, i) {
                return d.classList.toggle('dot--active', i === rel);
            });
        };
        slider.on('created', function () {
            wrapper = slider.container.parentNode;
            wrapper.querySelectorAll('.arrows, .dots').forEach(function (el) {
                return el.remove();
            });
            arrowLeft = document.createElement('img');
            arrowLeft.className = 'arrow arrow-left';
            arrowLeft.src = ARROWS.left;
            arrowLeft.alt = 'Anterior';
            arrowLeft.addEventListener('click', function () {
                return slider.prev();
            });
            arrowRight = document.createElement('img');
            arrowRight.className = 'arrow arrow-right';
            arrowRight.src = ARROWS.right;
            arrowRight.alt = 'Próximo';
            arrowRight.addEventListener('click', function () {
                return slider.next();
            });
            var arrowsWrapper = createEl('arrows');
            arrowsWrapper.append(arrowLeft, arrowRight);
            dots = createEl('dots');
            slider.track.details.slides.forEach(function (_, i) {
                var dot = createEl('dot');
                dot.addEventListener('click', function () {
                    return slider.moveToIdx(i);
                });
                dots.appendChild(dot);
            });
            wrapper.append(arrowsWrapper, dots);
            update();
        });
        slider.on('slideChanged', update);
    };

    // Plugin de autoplay configurável
    var autoplay = function autoplay() {
        var intervalMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
        return function (slider) {
            var timeout;
            var paused = false;
            var next = function next() {
                clearTimeout(timeout);
                if (!paused) timeout = setTimeout(function () {
                    return slider.next();
                }, intervalMs);
            };
            slider.on('created', function () {
                slider.container.addEventListener('mouseover', function () {
                    paused = true;
                    clearTimeout(timeout);
                });
                slider.container.addEventListener('mouseout', function () {
                    paused = false;
                    next();
                });
                next();
            });
            slider.on('dragStarted', function () {
                return clearTimeout(timeout);
            });
            slider.on('animationEnded', next);
            slider.on('updated', next);
        };
    };

    // Plugin que mantém a classe .center no slide ativo
    var centerClass = function centerClass(slider) {
        var update = function update() {
            if (!slider.track.details) return;
            var rel = slider.track.details.rel;
            slider.slides.forEach(function (s, i) {
                return s.classList.toggle('center', i === rel);
            });
        };
        slider.on('created', update);
        slider.on('slideChanged', update);
    };

    // Plugin de controle de vídeo — toca apenas o slide central
    var videoCenter = function videoCenter(slider) {
        var controlar = function controlar() {
            var _ativo$querySelector;
            slider.container.querySelectorAll('video').forEach(function (v) {
                return v.pause();
            });
            var ativo = slider.slides[slider.track.details.rel];
            ativo === null || ativo === void 0 || (_ativo$querySelector = ativo.querySelector('video')) === null || _ativo$querySelector === void 0 || _ativo$querySelector.play()["catch"](function () { });
        };
        slider.on('created', controlar);
        slider.on('slideChanged', controlar);
    };

    // Plugin de setas simples (sem dots) — para novidades e social
    var arrowsOnly = function arrowsOnly(slider) {
        slider.on('created', function () {
            var wrapper = slider.container.parentNode;
            wrapper.querySelectorAll('.arrows').forEach(function (el) {
                return el.remove();
            });
            var arrowLeft = document.createElement('img');
            arrowLeft.className = 'arrow arrow-left';
            arrowLeft.src = ARROWS.left;
            arrowLeft.alt = 'Anterior';
            arrowLeft.addEventListener('click', function () {
                return slider.prev();
            });
            var arrowRight = document.createElement('img');
            arrowRight.className = 'arrow arrow-right';
            arrowRight.src = ARROWS.right;
            arrowRight.alt = 'Próximo';
            arrowRight.addEventListener('click', function () {
                return slider.next();
            });
            var arrowsWrapper = document.createElement('div');
            arrowsWrapper.className = 'arrows';
            arrowsWrapper.append(arrowLeft, arrowRight);
            wrapper.append(arrowsWrapper);
        });
    };
    return {
        navigation: navigation,
        autoplay: autoplay,
        centerClass: centerClass,
        videoCenter: videoCenter,
        arrowsOnly: arrowsOnly
    };
}();
window.SliderPlugins = SliderPlugins;
"use strict";

var Sliders = function () {
    var instances = {
        destaque: null,
        novidades: null,
        social: null
    };
    var _Utils = Utils,
        LOADER = _Utils.LOADER,
        categoriaClass = _Utils.categoriaClass;
    var mediaHTML = function mediaHTML(item) {
        var _item$video, _item$image;
        if ((_item$video = item.video) !== null && _item$video !== void 0 && _item$video.trim()) return "<video src=\"".concat(item.video, "\" loop muted playsinline class=\"videoSocial\" oncanplay=\"window.removerLoader(this)\"></video>");
        if ((_item$image = item.image) !== null && _item$image !== void 0 && _item$image.trim()) return "<img src=\"".concat(item.image, "\" alt=\"Social Feed\" onload=\"window.removerLoader(this)\">");
        return '';
    };
    var montarDestaque = function montarDestaque(itens) {
        var _instances$destaque;
        var container = document.getElementById('my-keen-slider');
        if (!container || !(itens !== null && itens !== void 0 && itens.length)) return;
        (_instances$destaque = instances.destaque) === null || _instances$destaque === void 0 || _instances$destaque.destroy();
        container.innerHTML = itens.map(function (item) {
            return "\n      <div class=\"keen-slider__slide\">\n        <a class=\"cardMateria\" href=\"".concat(item.link, "\">\n          <div class=\"card-image\">\n            ").concat(LOADER(), "\n            <picture>\n              <source media=\"(max-width: 768px)\" srcset=\"").concat(item.imagemMobile || item.imagemThumb, "\">\n              <img src=\"").concat(item.imagemFull, "\" alt=\"").concat(item.title, "\" onload=\"window.removerLoader(this)\">\n            </picture>\n            <div class=\"boxText\">\n              <div class=\"textCategoria cat-").concat(categoriaClass(item.categoria), "\"><p>").concat(Array.isArray(item.categoria) ? item.categoria.join(', ') : item.categoria, "</p></div>\n              <p class=\"title\">").concat(item.title, "</p>\n              <p class=\"description\">").concat(item.description, "</p>\n            </div>\n          </div>\n        </a>\n      </div>");
        }).join('');
        if (typeof KeenSlider === 'undefined') return;
        instances.destaque = new KeenSlider('#my-keen-slider', {
            loop: true,
            renderMode: 'performance',
            slides: {
                origin: 'center',
                perView: 1,
                spacing: 0
            }
        }, [SliderPlugins.navigation, SliderPlugins.autoplay(3000)]);
    };
    var montarNovidades = function montarNovidades(itens) {
        var container = document.getElementById('my-keen-novidades');
        if (!container || !(itens !== null && itens !== void 0 && itens.length)) return;
        var cardHTML = function cardHTML(item) {
            return "\n      <a class=\"cardNovidade\" href=\"".concat(item.link, "\" target=\"_blank\" rel=\"noopener noreferrer\">\n        ").concat(LOADER(), "\n        ").concat(item.image ? "<img src=\"".concat(item.image, "\" alt=\"Novidade\" onload=\"window.removerLoader(this)\">") : '', "\n        <div class=\"boxFooter\">\n          <div class=\"link-wrapper\">\n            <svg viewBox=\"0 0 20 26\" class=\"fill-current size-6\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 0C7.83858 0 6.45218 0.504219 5.67404 1.625C5.30512 2.15637 5.14648 2.68307 5.07206 3.25C4.99997 3.79914 4.99999 4.42909 5 4.97506V6.57488C2.81542 6.96021 1.09676 8.79148 0.883316 11.1064L0.0222461 20.4452C-0.252538 23.4254 2.05335 26 4.99723 26H15.0028C17.9467 26 20.2525 23.4254 19.9778 20.4452L19.1167 11.1064C18.9032 8.79147 17.1846 6.96021 15 6.57488V4.97504C15 4.93982 15 4.90425 15 4.86838C15.0004 4.34814 15.0008 3.76371 14.9333 3.25L14.9287 3.21455C14.8562 2.66108 14.7886 2.14528 14.4274 1.625C13.6492 0.504219 12.1614 0 10 0ZM13.3333 8.46196V10.0625C13.3333 10.3386 13.5572 10.5625 13.8333 10.5625H14.5C14.7761 10.5625 15 10.3386 15 10.0625V8.58595C16.1802 8.93536 17.0755 9.98788 17.1955 11.2895L18.0566 20.6283C18.2253 22.4576 16.8098 24.038 15.0028 24.038H4.99723C3.19018 24.038 1.77475 22.4576 1.94342 20.6283L2.80449 11.2895C2.9245 9.98789 3.81979 8.93537 5 8.58595V10.0625C5 10.3386 5.22386 10.5625 5.5 10.5625H6.16667C6.44281 10.5625 6.66667 10.3386 6.66667 10.0625V8.46196H13.3333ZM13.3333 6.5V4.875C13.3333 4.34711 13.2884 4.0101 13.2384 3.63473C13.2332 3.59574 13.228 3.55634 13.2227 3.51627C13.1678 3.09764 13.0676 2.80605 12.9191 2.59205C12.6618 2.22144 11.9772 1.625 10 1.625C8.02276 1.625 7.43964 2.22144 7.18233 2.59205C7.03375 2.80605 6.82833 3.1735 6.78333 3.51627C6.77545 3.57633 6.76747 3.63488 6.75958 3.69279C6.7115 4.04553 6.66667 4.37446 6.66667 4.875V6.5H13.3333Z\"></path></svg>\n          </div>\n          <div class=\"link-wrapper wishlist\">\n            <svg viewBox=\"0 0 28 24\" class=\"fill-current size-6\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.892 20.2315C19.8924 20.2312 19.8929 20.2308 19.8933 20.2304L19.8932 20.2304L19.892 20.2315C19.892 20.2315 19.892 20.2315 19.892 20.2315ZM12.7337 3.21701L12.7337 3.21701L12.7635 3.24551C13.487 3.93705 14.5131 3.93705 15.2365 3.24551L15.0731 3.08062L15.2365 3.2455L15.2664 3.21697C16.8213 1.73059 18.6481 0 21.1062 0C22.714 0 24.413 0.563598 25.7326 1.74287C27.078 2.94524 28 4.76835 28 7.14105C28 8.6747 27.6043 10.7671 26.6579 12.4331C25.775 13.9874 24.4971 15.4403 22.9746 16.9594C22.0148 17.917 20.9152 18.9411 19.7217 20.0527L19.7213 20.0531C19.0345 20.6927 18.3171 21.3609 17.5792 22.0603C16.3848 23.1926 15.3196 24 14 24C12.6804 24 11.6152 23.1925 10.4208 22.0603C9.68295 21.3609 8.96551 20.6927 8.27872 20.0531L8.27833 20.0527C7.08481 18.9411 5.98519 17.917 5.02543 16.9594C3.50289 15.4403 2.225 13.9874 1.34205 12.4331C0.395682 10.7671 0 8.6747 0 7.14105C0 4.76835 0.921959 2.94524 2.26741 1.74287C3.58701 0.563598 5.28605 0 6.89384 0C9.35191 0 11.1788 1.73062 12.7337 3.21701ZM3.46033 3.5031C2.55747 4.30994 1.94402 5.49958 1.94402 7.14105C1.94402 8.3249 2.26598 9.9761 2.9707 11.2167C3.70132 12.5028 4.8112 13.7909 6.29975 15.276C7.239 16.2131 8.28667 17.1887 9.44987 18.2717L9.4501 18.2719L9.45219 18.2739C10.1448 18.9188 10.8789 19.6023 11.6575 20.3404C12.8308 21.4526 13.424 21.7687 14 21.7687C14.5759 21.7687 15.1693 21.4525 16.3425 20.3404C17.1211 19.6023 17.8552 18.9188 18.5478 18.2739L18.55 18.2719L18.5502 18.2716C19.7134 17.1886 20.761 16.2131 21.7003 15.276C23.1888 13.7909 24.2987 12.5028 25.0293 11.2167C25.734 9.9761 26.056 8.3249 26.056 7.14105C26.056 5.49958 25.4425 4.30994 24.5397 3.50309C23.6112 2.67333 22.3493 2.23129 21.1062 2.23129C20.2679 2.23129 19.5237 2.5213 18.7856 3.00443C18.0526 3.48425 17.3113 4.16435 16.4794 4.95955C15.0344 6.34076 12.9656 6.34075 11.5207 4.95956C10.6887 4.16436 9.94746 3.48426 9.21443 3.00443C8.47635 2.5213 7.73215 2.23129 6.89384 2.23129C5.65067 2.23129 4.38884 2.67333 3.46033 3.5031Z\"></path></svg>\n          </div>\n        </div>\n      </a>");
        };
        container.innerHTML = itens.map(function (item) {
            return "<div class=\"keen-slider__slide\">".concat(cardHTML(item), "</div>");
        }).join('');
        if (typeof KeenSlider === 'undefined') return;
        var raf;
        var hovering = false;
        var dragging = false;
        var SPEED = 1.3; // px por frame — positivo = avança

        instances.novidades = new KeenSlider('#my-keen-novidades', {
            loop: true,
            drag: true,
            slides: {
                perView: 6,
                spacing: 10
            },
            breakpoints: {
                '(max-width: 1100px)': {
                    slides: {
                        perView: 4,
                        spacing: 10
                    }
                },
                '(max-width: 768px)': {
                    slides: {
                        perView: 2.2,
                        spacing: 10
                    }
                }
            },
            created: function created(s) {
                var _tick = function tick() {
                    if (!hovering && !dragging) s.track.add(SPEED / s.size);
                    raf = requestAnimationFrame(_tick);
                };
                raf = requestAnimationFrame(_tick);
                s.container.addEventListener('mouseenter', function () {
                    hovering = true;
                });
                s.container.addEventListener('mouseleave', function () {
                    hovering = false;
                });
            },
            dragStarted: function dragStarted() {
                dragging = true;
                cancelAnimationFrame(raf);
            },
            dragEnded: function dragEnded(s) {
                dragging = false;
                var _tick2 = function tick() {
                    if (!hovering && !dragging) s.track.add(SPEED / s.size);
                    raf = requestAnimationFrame(_tick2);
                };
                raf = requestAnimationFrame(_tick2);
            },
            destroyed: function destroyed() {
                cancelAnimationFrame(raf);
            }
        }, [SliderPlugins.arrowsOnly]);
    };
    var montarSocial = function montarSocial(itens) {
        var _instances$social;
        var container = document.getElementById('my-keen-social');
        if (!container || !(itens !== null && itens !== void 0 && itens.length)) return;
        (_instances$social = instances.social) === null || _instances$social === void 0 || _instances$social.destroy();
        container.innerHTML = itens.map(function (item) {
            return "\n      <div class=\"keen-slider__slide\">\n        <a class=\"cardSocial\" href=\"".concat(item.link, "\" target=\"_blank\" rel=\"noopener noreferrer\">\n          ").concat(LOADER(), "\n          <div class=\"media-container\">").concat(mediaHTML(item), "</div>\n        </a>\n      </div>");
        }).join('');
        if (typeof KeenSlider === 'undefined') return;
        instances.social = new KeenSlider('#my-keen-social', {
            loop: true,
            renderMode: 'performance',
            slides: {
                perView: 5,
                spacing: 0,
                origin: 'center'
            },
            breakpoints: {
                '(max-width: 1100px)': {
                    slides: {
                        perView: 3,
                        spacing: 0,
                        origin: 'center'
                    }
                },
                '(max-width: 768px)': {
                    slides: {
                        perView: 1.8,
                        spacing: 0,
                        origin: 'center'
                    }
                }
            }
        }, [SliderPlugins.centerClass, SliderPlugins.autoplay(5000), SliderPlugins.videoCenter, SliderPlugins.arrowsOnly]);
    };
    return {
        montarDestaque: montarDestaque,
        montarNovidades: montarNovidades,
        montarSocial: montarSocial
    };
}();
window.Sliders = Sliders;

// Aliases de compatibilidade
window.montarSliderDestaque = Sliders.montarDestaque;
window.montarSliderNovidades = Sliders.montarNovidades;
window.montarSliderSocial = Sliders.montarSocial;
"use strict";

var Menu = function () {
    var _Utils = Utils,
        debounce = _Utils.debounce;
    var initMobile = function initMobile() {
        var hamburger = document.querySelector('.hamburger');
        var menu = document.querySelector('.menu-categorias');
        if (!hamburger || !menu) return;
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    };

    // Detecta qual link do menu corresponde à URL atual e aplica .active
    // Também intercepta cliques em links que já são a página atual → scroll ao topo
    var initActiveAndScrollTop = function initActiveAndScrollTop() {
        var currentPath = window.location.pathname;
        var links = document.querySelectorAll('.menu-btn');
        links.forEach(function (link) {
            var href = link.getAttribute('href') || '';

            // Normaliza para comparar: remove trailing slash e extensão .html
            var normalize = function normalize(str) {
                return str.replace(/\.html$/, '').replace(/\/$/, '').toLowerCase();
            };
            var isCurrent = normalize(currentPath).endsWith(normalize(href)) && href !== '';
            if (isCurrent) link.classList.add('active');
            link.addEventListener('click', function (e) {
                if (isCurrent) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Logo: scroll ao topo se já estiver na home, navega se não estiver
        var logoLink = document.querySelector('.logoLink');
        if (logoLink) {
            logoLink.addEventListener('click', function (e) {
                var logoHref = logoLink.getAttribute('href') || '';
                var normalize = function normalize(str) {
                    return str.replace(/\.html$/, '').replace(/\/$/, '').toLowerCase();
                };
                var isHome = normalize(currentPath) === normalize(logoHref) || currentPath === '/' || currentPath.endsWith('index.html');
                if (isHome) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        }
    };

    // Header shrink é controlado por CSS (animation-timeline: scroll()) — sem JS necessário
    var initShrink = function initShrink() { };
    var initScrollAnimation = function initScrollAnimation() {
        var titlePag = document.querySelector('.redes .titlePag');
        if (!titlePag) return;
        var onScroll = debounce(function () {
            titlePag.classList.toggle('active', window.scrollY > 300);
            titlePag.classList.toggle('block', window.scrollY <= 300);
        }, 50);
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
    };
    return {
        initMobile: initMobile,
        initShrink: initShrink,
        initActiveAndScrollTop: initActiveAndScrollTop,
        initScrollAnimation: initScrollAnimation
    };
}();
window.Menu = Menu;
window.initMenuMobile = Menu.initMobile;
window.configurarAnimacaoScroll = Menu.initScrollAnimation;
"use strict";

(function () {
    var scriptURL = 'https://script.google.com/macros/s/AKfycby8HhBQNW00mJn6Xahx6xxawYuc9aYW0MkgR6leH6UJuNoCBCXxk4ClADUWHDrN2cbrRg/exec';
    var initForms = function initForms() {
        // console.log("Iniciando script do formulario...");

        var scope = document.querySelector('.form-br');
        if (!scope) {
            console.error("Erro: Elemento .form-br nao encontrado.");
            return;
        }
        if (scope.dataset.initialized === "true") return;
        var staticForm = scope.querySelector('.js-form-static');
        var staticSubmitBtn = scope.querySelector('.js-submit-btn');
        var staticInputTel = scope.querySelector('.js-input-tel');
        var staticLoading = scope.querySelector('.js-loading');
        var staticModalSucesso = scope.querySelector('.js-modal-success');
        var staticCloseBtn = scope.querySelector('.js-close-modal');
        if (!staticSubmitBtn || !staticForm) {
            console.error("Erro: Botao ou Formulario nao encontrados pelas classes js-.");
            return;
        }
        scope.dataset.initialized = "true";
        // console.log("Formulario mapeado com sucesso.");

        // Mascara de Telefone
        if (staticInputTel) {
            staticInputTel.oninput = function () {
                var v = this.value.replace(/\D/g, '');
                if (v.length > 0) v = v.replace(/^(\d{2})(\d)/, "($1) $2");
                if (v.length > 9) v = v.replace(/(\d)(\d{4})$/, "$1-$2");
                this.value = v;
            };
        }
        if (staticCloseBtn && staticModalSucesso) {
            staticCloseBtn.onclick = function () {
                staticModalSucesso.style.display = 'none';
            };
        }
        staticSubmitBtn.onclick = function (e) {
            e.preventDefault();
            console.log("Botao enviar clicado.");
            var nomeField = staticForm.querySelector('input[name="nome"]');
            var emailField = staticForm.querySelector('input[name="email"]');
            if (!nomeField || !emailField) {
                alert("Erro interno: Campos de entrada nao encontrados. Verifique os atributos name.");
                return;
            }
            var nome = nomeField.value.trim();
            var email = emailField.value.trim();
            var telefone = staticInputTel ? staticInputTel.value.trim() : "";
            if (nome.length < 2) {
                alert("Por favor, preencha seu nome.");
                return;
            }
            if (!email.includes('@')) {
                alert("Por favor, insira um e-mail valido.");
                return;
            }
            if (telefone.length < 14) {
                alert("Por favor, insira um telefone valido.");
                return;
            }
            console.log("Validacao aprovada. Enviando dados...");
            staticSubmitBtn.disabled = true;
            if (staticLoading) staticLoading.style.display = 'flex';
            var params = new URLSearchParams();
            params.append('nome', nome);
            params.append('email', email);
            params.append('telefone', telefone);
            params.append('data', new Date().toLocaleDateString('pt-BR'));
            params.append('origem', window.location.href);
            fetch(scriptURL, {
                method: 'POST',
                body: params,
                mode: 'no-cors'
            }).then(function () {
                console.log("Resposta recebida do Google.");
                if (staticLoading) staticLoading.style.display = 'none';
                if (staticModalSucesso) staticModalSucesso.style.display = 'flex';
                staticForm.reset();
            })["catch"](function (err) {
                console.error("Erro no fetch:", err);
                alert("Erro ao enviar dados. Tente novamente.");
            })["finally"](function () {
                setTimeout(function () {
                    staticSubmitBtn.disabled = false;
                }, 3000);
            });
        };
    };
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initForms();
    } else {
        document.addEventListener('DOMContentLoaded', initForms);
    }
})();
"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() { } function GeneratorFunction() { } function GeneratorFunctionPrototype() { } t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var App = function () {
    // Lê configuração de categoria direto do DOM (funciona em produção também)
    var _el = document.querySelector('.dafitiStructure');
    var PAGINA_CATEGORIA = (_el === null || _el === void 0 ? void 0 : _el.dataset.categoria) || null;

    // --- Listagem principal ---

    var renderListagem = function renderListagem() {
        var adicionar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var container = document.getElementById('conteudo-planilha');
        if (!container) return;
        var inicio = (Store.paginaAtual - 1) * window.ITENS_POR_PAGINA;
        var fim = inicio + window.ITENS_POR_PAGINA;
        var itens = Store.dadosFiltrados.slice(inicio, fim);
        var template = PAGINA_CATEGORIA ? Templates.cardCategoria : Templates.card;
        var html = itens.map(template).join('');
        container.innerHTML = adicionar ? container.innerHTML + html : html;
        Templates.renderBotaoVerMais(fim < Store.dadosFiltrados.length);
    };
    var renderDestaques = function renderDestaques() {
        var container = document.getElementById('conteudo-planilha-destaque');
        if (!container) return;
        var itens = Store.dadosOriginais.filter(function (i) {
            return i.destaque === 'TRUE' || i.destaque === 'YES';
        }).slice(0, 2);
        container.innerHTML = itens.map(Templates.cardDestaque).join('');
    };
    var renderMaisVistas = function renderMaisVistas() {
        var top3 = _toConsumableArray(Store.dadosOriginais).sort(function (a, b) {
            return b.visualizacoes - a.visualizacoes;
        }).slice(0, 3);
        Templates.renderMaisVistas(top3);
    };

    // --- Bootstrap ---

    var init = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            var dados, countEl, _t;
            return _regenerator().w(function (_context) {
                while (1) switch (_context.p = _context.n) {
                    case 0:
                        _context.p = 0;
                        _context.n = 1;
                        return API.carregarTudo();
                    case 1:
                        dados = _context.v;
                        Store.dadosOriginais = dados.registro;
                        Templates.renderNuvem(dados.nuvem);
                        Sliders.montarNovidades(dados.novidades);
                        Sliders.montarSocial(dados.social);
                        if (PAGINA_CATEGORIA) {
                            // Página de categoria: filtra artigos pela categoria da página
                            Store.dadosFiltrados = Store.dadosOriginais.filter(function (item) {
                                return item.categoria.some(function (cat) {
                                    return cat.toLowerCase() === PAGINA_CATEGORIA.toLowerCase();
                                });
                            });
                            countEl = document.getElementById('category-count');
                            if (countEl) countEl.textContent = "".concat(Store.dadosFiltrados.length, " resultados");
                        } else {
                            // Home: mostra tudo com slider de destaque e cards em evidência
                            Sliders.montarDestaque(dados.registro.filter(function (i) {
                                return i.slide === 'TRUE';
                            }));
                            renderDestaques();
                            renderMaisVistas();
                        }
                        renderListagem();
                        App.initInfiniteScroll();
                        Menu.initMobile();
                        Menu.initShrink();
                        Menu.initActiveAndScrollTop();
                        _context.n = 3;
                        break;
                    case 2:
                        _context.p = 2;
                        _t = _context.v;
                        console.error('Erro crítico no carregamento:', _t);
                    case 3:
                        return _context.a(2);
                }
            }, _callee, null, [[0, 2]]);
        }));
        return function init() {
            return _ref.apply(this, arguments);
        };
    }();
    var carregarMais = function carregarMais() {
        Store.avancarPagina();
        renderListagem(true);
    };

    // Infinite scroll horizontal no mobile via scroll event
    var initInfiniteScroll = function initInfiniteScroll() {
        if (window.innerWidth > 520) return;
        var grid = document.getElementById('conteudo-planilha');
        if (!grid) return;
        grid.addEventListener('scroll', function () {
            var nearEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 100;
            if (!nearEnd) return;
            var fim = Store.paginaAtual * window.ITENS_POR_PAGINA;
            if (fim < Store.dadosFiltrados.length) carregarMais();
        }, {
            passive: true
        });
    };
    return {
        init: init,
        carregarMais: carregarMais,
        renderListagem: renderListagem,
        initInfiniteScroll: initInfiniteScroll
    };
}();
window.carregarMaisItens = App.carregarMais;

// Garante inicialização mesmo quando o bloco é injetado após DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}
//# sourceMappingURL=main.js.map