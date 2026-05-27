/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ei = globalThis, _i = ei.ShadowRoot && (ei.ShadyCSS === void 0 || ei.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pi = Symbol(), te = /* @__PURE__ */ new WeakMap();
let ve = class {
  constructor(i, e, a) {
    if (this._$cssResult$ = !0, a !== Pi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = i, this.t = e;
  }
  get styleSheet() {
    let i = this.o;
    const e = this.t;
    if (_i && i === void 0) {
      const a = e !== void 0 && e.length === 1;
      a && (i = te.get(e)), i === void 0 && ((this.o = i = new CSSStyleSheet()).replaceSync(this.cssText), a && te.set(e, i));
    }
    return i;
  }
  toString() {
    return this.cssText;
  }
};
const we = (r) => new ve(typeof r == "string" ? r : r + "", void 0, Pi), $ = (r, ...i) => {
  const e = r.length === 1 ? r[0] : i.reduce(((a, t, o) => a + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(t) + r[o + 1]), r[0]);
  return new ve(e, r, Pi);
}, He = (r, i) => {
  if (_i) r.adoptedStyleSheets = i.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of i) {
    const a = document.createElement("style"), t = ei.litNonce;
    t !== void 0 && a.setAttribute("nonce", t), a.textContent = e.cssText, r.appendChild(a);
  }
}, re = _i ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((i) => {
  let e = "";
  for (const a of i.cssRules) e += a.cssText;
  return we(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ne, defineProperty: Ge, getOwnPropertyDescriptor: qe, getOwnPropertyNames: Ve, getOwnPropertySymbols: Ye, getPrototypeOf: Ke } = Object, T = globalThis, oe = T.trustedTypes, Je = oe ? oe.emptyScript : "", bi = T.reactiveElementPolyfillSupport, H = (r, i) => r, ti = { toAttribute(r, i) {
  switch (i) {
    case Boolean:
      r = r ? Je : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, i) {
  let e = r;
  switch (i) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Ui = (r, i) => !Ne(r, i), se = { attribute: !0, type: String, converter: ti, reflect: !1, useDefault: !1, hasChanged: Ui };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(i) {
    this._$Ei(), (this.l ?? (this.l = [])).push(i);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(i, e = se) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(i) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(i, e), !e.noAccessor) {
      const a = Symbol(), t = this.getPropertyDescriptor(i, a, e);
      t !== void 0 && Ge(this.prototype, i, t);
    }
  }
  static getPropertyDescriptor(i, e, a) {
    const { get: t, set: o } = qe(this.prototype, i) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get: t, set(s) {
      const d = t == null ? void 0 : t.call(this);
      o == null || o.call(this, s), this.requestUpdate(i, d, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(i) {
    return this.elementProperties.get(i) ?? se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const i = Ke(this);
    i.finalize(), i.l !== void 0 && (this.l = [...i.l]), this.elementProperties = new Map(i.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const e = this.properties, a = [...Ve(e), ...Ye(e)];
      for (const t of a) this.createProperty(t, e[t]);
    }
    const i = this[Symbol.metadata];
    if (i !== null) {
      const e = litPropertyMetadata.get(i);
      if (e !== void 0) for (const [a, t] of e) this.elementProperties.set(a, t);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, a] of this.elementProperties) {
      const t = this._$Eu(e, a);
      t !== void 0 && this._$Eh.set(t, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(i) {
    const e = [];
    if (Array.isArray(i)) {
      const a = new Set(i.flat(1 / 0).reverse());
      for (const t of a) e.unshift(re(t));
    } else i !== void 0 && e.push(re(i));
    return e;
  }
  static _$Eu(i, e) {
    const a = e.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof i == "string" ? i.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var i;
    this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (i = this.constructor.l) == null || i.forEach(((e) => e(this)));
  }
  addController(i) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(i), this.renderRoot !== void 0 && this.isConnected && ((e = i.hostConnected) == null || e.call(i));
  }
  removeController(i) {
    var e;
    (e = this._$EO) == null || e.delete(i);
  }
  _$E_() {
    const i = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const a of e.keys()) this.hasOwnProperty(a) && (i.set(a, this[a]), delete this[a]);
    i.size > 0 && (this._$Ep = i);
  }
  createRenderRoot() {
    const i = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return He(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    var i;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (i = this._$EO) == null || i.forEach(((e) => {
      var a;
      return (a = e.hostConnected) == null ? void 0 : a.call(e);
    }));
  }
  enableUpdating(i) {
  }
  disconnectedCallback() {
    var i;
    (i = this._$EO) == null || i.forEach(((e) => {
      var a;
      return (a = e.hostDisconnected) == null ? void 0 : a.call(e);
    }));
  }
  attributeChangedCallback(i, e, a) {
    this._$AK(i, a);
  }
  _$ET(i, e) {
    var o;
    const a = this.constructor.elementProperties.get(i), t = this.constructor._$Eu(i, a);
    if (t !== void 0 && a.reflect === !0) {
      const s = (((o = a.converter) == null ? void 0 : o.toAttribute) !== void 0 ? a.converter : ti).toAttribute(e, a.type);
      this._$Em = i, s == null ? this.removeAttribute(t) : this.setAttribute(t, s), this._$Em = null;
    }
  }
  _$AK(i, e) {
    var o, s;
    const a = this.constructor, t = a._$Eh.get(i);
    if (t !== void 0 && this._$Em !== t) {
      const d = a.getPropertyOptions(t), n = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : ti;
      this._$Em = t;
      const c = n.fromAttribute(e, d.type);
      this[t] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(t)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(i, e, a) {
    var t;
    if (i !== void 0) {
      const o = this.constructor, s = this[i];
      if (a ?? (a = o.getPropertyOptions(i)), !((a.hasChanged ?? Ui)(s, e) || a.useDefault && a.reflect && s === ((t = this._$Ej) == null ? void 0 : t.get(i)) && !this.hasAttribute(o._$Eu(i, a)))) return;
      this.C(i, e, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(i, e, { useDefault: a, reflect: t, wrapped: o }, s) {
    a && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(i) && (this._$Ej.set(i, s ?? e ?? this[i]), o !== !0 || s !== void 0) || (this._$AL.has(i) || (this.hasUpdated || a || (e = void 0), this._$AL.set(i, e)), t === !0 && this._$Em !== i && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(i));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const i = this.scheduleUpdate();
    return i != null && await i, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var a;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0) for (const [o, s] of t) {
        const { wrapped: d } = s, n = this[o];
        d !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, s, n);
      }
    }
    let i = !1;
    const e = this._$AL;
    try {
      i = this.shouldUpdate(e), i ? (this.willUpdate(e), (a = this._$EO) == null || a.forEach(((t) => {
        var o;
        return (o = t.hostUpdate) == null ? void 0 : o.call(t);
      })), this.update(e)) : this._$EM();
    } catch (t) {
      throw i = !1, this._$EM(), t;
    }
    i && this._$AE(e);
  }
  willUpdate(i) {
  }
  _$AE(i) {
    var e;
    (e = this._$EO) == null || e.forEach(((a) => {
      var t;
      return (t = a.hostUpdated) == null ? void 0 : t.call(a);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(i)), this.updated(i);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(i) {
    return !0;
  }
  update(i) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((e) => this._$ET(e, this[e])))), this._$EM();
  }
  updated(i) {
  }
  firstUpdated(i) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[H("elementProperties")] = /* @__PURE__ */ new Map(), L[H("finalized")] = /* @__PURE__ */ new Map(), bi == null || bi({ ReactiveElement: L }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, ri = N.trustedTypes, ne = ri ? ri.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ke = "$lit$", M = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + M, Qe = `<${Ae}>`, B = document, q = () => B.createComment(""), V = (r) => r === null || typeof r != "object" && typeof r != "function", zi = Array.isArray, Ze = (r) => zi(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", ci = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, be = />/g, z = RegExp(`>|${ci}(?:([^\\s"'>=/]+)(${ci}*=${ci}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ce = /'/g, le = /"/g, Ce = /^(?:script|style|textarea|title)$/i, We = (r) => (i, ...e) => ({ _$litType$: r, strings: i, values: e }), p = We(1), _ = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), he = /* @__PURE__ */ new WeakMap(), R = B.createTreeWalker(B, 129);
function Ee(r, i) {
  if (!zi(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ne !== void 0 ? ne.createHTML(i) : i;
}
const Xe = (r, i) => {
  const e = r.length - 1, a = [];
  let t, o = i === 2 ? "<svg>" : i === 3 ? "<math>" : "", s = F;
  for (let d = 0; d < e; d++) {
    const n = r[d];
    let c, f, u = -1, y = 0;
    for (; y < n.length && (s.lastIndex = y, f = s.exec(n), f !== null); ) y = s.lastIndex, s === F ? f[1] === "!--" ? s = de : f[1] !== void 0 ? s = be : f[2] !== void 0 ? (Ce.test(f[2]) && (t = RegExp("</" + f[2], "g")), s = z) : f[3] !== void 0 && (s = z) : s === z ? f[0] === ">" ? (s = t ?? F, u = -1) : f[1] === void 0 ? u = -2 : (u = s.lastIndex - f[2].length, c = f[1], s = f[3] === void 0 ? z : f[3] === '"' ? le : ce) : s === le || s === ce ? s = z : s === de || s === be ? s = F : (s = z, t = void 0);
    const w = s === z && r[d + 1].startsWith("/>") ? " " : "";
    o += s === F ? n + Qe : u >= 0 ? (a.push(c), n.slice(0, u) + ke + n.slice(u) + M + w) : n + M + (u === -2 ? d : w);
  }
  return [Ee(r, o + (r[e] || "<?>") + (i === 2 ? "</svg>" : i === 3 ? "</math>" : "")), a];
};
class Y {
  constructor({ strings: i, _$litType$: e }, a) {
    let t;
    this.parts = [];
    let o = 0, s = 0;
    const d = i.length - 1, n = this.parts, [c, f] = Xe(i, e);
    if (this.el = Y.createElement(c, a), R.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (t = R.nextNode()) !== null && n.length < d; ) {
      if (t.nodeType === 1) {
        if (t.hasAttributes()) for (const u of t.getAttributeNames()) if (u.endsWith(ke)) {
          const y = f[s++], w = t.getAttribute(u).split(M), U = /([.?@])?(.*)/.exec(y);
          n.push({ type: 1, index: o, name: U[2], strings: w, ctor: U[1] === "." ? ia : U[1] === "?" ? ea : U[1] === "@" ? aa : di }), t.removeAttribute(u);
        } else u.startsWith(M) && (n.push({ type: 6, index: o }), t.removeAttribute(u));
        if (Ce.test(t.tagName)) {
          const u = t.textContent.split(M), y = u.length - 1;
          if (y > 0) {
            t.textContent = ri ? ri.emptyScript : "";
            for (let w = 0; w < y; w++) t.append(u[w], q()), R.nextNode(), n.push({ type: 2, index: ++o });
            t.append(u[y], q());
          }
        }
      } else if (t.nodeType === 8) if (t.data === Ae) n.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = t.data.indexOf(M, u + 1)) !== -1; ) n.push({ type: 7, index: o }), u += M.length - 1;
      }
      o++;
    }
  }
  static createElement(i, e) {
    const a = B.createElement("template");
    return a.innerHTML = i, a;
  }
}
function I(r, i, e = r, a) {
  var s, d;
  if (i === _) return i;
  let t = a !== void 0 ? (s = e._$Co) == null ? void 0 : s[a] : e._$Cl;
  const o = V(i) ? void 0 : i._$litDirective$;
  return (t == null ? void 0 : t.constructor) !== o && ((d = t == null ? void 0 : t._$AO) == null || d.call(t, !1), o === void 0 ? t = void 0 : (t = new o(r), t._$AT(r, e, a)), a !== void 0 ? (e._$Co ?? (e._$Co = []))[a] = t : e._$Cl = t), t !== void 0 && (i = I(r, t._$AS(r, i.values), t, a)), i;
}
class Oe {
  constructor(i, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = i, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(i) {
    const { el: { content: e }, parts: a } = this._$AD, t = ((i == null ? void 0 : i.creationScope) ?? B).importNode(e, !0);
    R.currentNode = t;
    let o = R.nextNode(), s = 0, d = 0, n = a[0];
    for (; n !== void 0; ) {
      if (s === n.index) {
        let c;
        n.type === 2 ? c = new J(o, o.nextSibling, this, i) : n.type === 1 ? c = new n.ctor(o, n.name, n.strings, this, i) : n.type === 6 && (c = new ta(o, this, i)), this._$AV.push(c), n = a[++d];
      }
      s !== (n == null ? void 0 : n.index) && (o = R.nextNode(), s++);
    }
    return R.currentNode = B, t;
  }
  p(i) {
    let e = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(i, a, e), e += a.strings.length - 2) : a._$AI(i[e])), e++;
  }
}
class J {
  get _$AU() {
    var i;
    return ((i = this._$AM) == null ? void 0 : i._$AU) ?? this._$Cv;
  }
  constructor(i, e, a, t) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = i, this._$AB = e, this._$AM = a, this.options = t, this._$Cv = (t == null ? void 0 : t.isConnected) ?? !0;
  }
  get parentNode() {
    let i = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (i == null ? void 0 : i.nodeType) === 11 && (i = e.parentNode), i;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(i, e = this) {
    i = I(this, i, e), V(i) ? i === g || i == null || i === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : i !== this._$AH && i !== _ && this._(i) : i._$litType$ !== void 0 ? this.$(i) : i.nodeType !== void 0 ? this.T(i) : Ze(i) ? this.k(i) : this._(i);
  }
  O(i) {
    return this._$AA.parentNode.insertBefore(i, this._$AB);
  }
  T(i) {
    this._$AH !== i && (this._$AR(), this._$AH = this.O(i));
  }
  _(i) {
    this._$AH !== g && V(this._$AH) ? this._$AA.nextSibling.data = i : this.T(B.createTextNode(i)), this._$AH = i;
  }
  $(i) {
    var o;
    const { values: e, _$litType$: a } = i, t = typeof a == "number" ? this._$AC(i) : (a.el === void 0 && (a.el = Y.createElement(Ee(a.h, a.h[0]), this.options)), a);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === t) this._$AH.p(e);
    else {
      const s = new Oe(t, this), d = s.u(this.options);
      s.p(e), this.T(d), this._$AH = s;
    }
  }
  _$AC(i) {
    let e = he.get(i.strings);
    return e === void 0 && he.set(i.strings, e = new Y(i)), e;
  }
  k(i) {
    zi(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let a, t = 0;
    for (const o of i) t === e.length ? e.push(a = new J(this.O(q()), this.O(q()), this, this.options)) : a = e[t], a._$AI(o), t++;
    t < e.length && (this._$AR(a && a._$AB.nextSibling, t), e.length = t);
  }
  _$AR(i = this._$AA.nextSibling, e) {
    var a;
    for ((a = this._$AP) == null ? void 0 : a.call(this, !1, !0, e); i !== this._$AB; ) {
      const t = i.nextSibling;
      i.remove(), i = t;
    }
  }
  setConnected(i) {
    var e;
    this._$AM === void 0 && (this._$Cv = i, (e = this._$AP) == null || e.call(this, i));
  }
}
class di {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(i, e, a, t, o) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = i, this.name = e, this._$AM = t, this.options = o, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = g;
  }
  _$AI(i, e = this, a, t) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) i = I(this, i, e, 0), s = !V(i) || i !== this._$AH && i !== _, s && (this._$AH = i);
    else {
      const d = i;
      let n, c;
      for (i = o[0], n = 0; n < o.length - 1; n++) c = I(this, d[a + n], e, n), c === _ && (c = this._$AH[n]), s || (s = !V(c) || c !== this._$AH[n]), c === g ? i = g : i !== g && (i += (c ?? "") + o[n + 1]), this._$AH[n] = c;
    }
    s && !t && this.j(i);
  }
  j(i) {
    i === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, i ?? "");
  }
}
class ia extends di {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(i) {
    this.element[this.name] = i === g ? void 0 : i;
  }
}
class ea extends di {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(i) {
    this.element.toggleAttribute(this.name, !!i && i !== g);
  }
}
class aa extends di {
  constructor(i, e, a, t, o) {
    super(i, e, a, t, o), this.type = 5;
  }
  _$AI(i, e = this) {
    if ((i = I(this, i, e, 0) ?? g) === _) return;
    const a = this._$AH, t = i === g && a !== g || i.capture !== a.capture || i.once !== a.once || i.passive !== a.passive, o = i !== g && (a === g || t);
    t && this.element.removeEventListener(this.name, this, a), o && this.element.addEventListener(this.name, this, i), this._$AH = i;
  }
  handleEvent(i) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, i) : this._$AH.handleEvent(i);
  }
}
class ta {
  constructor(i, e, a) {
    this.element = i, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(i) {
    I(this, i);
  }
}
const li = N.litHtmlPolyfillSupport;
li == null || li(Y, J), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.1");
const ra = (r, i, e) => {
  const a = (e == null ? void 0 : e.renderBefore) ?? i;
  let t = a._$litPart$;
  if (t === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    a._$litPart$ = t = new J(i.insertBefore(q(), o), o, void 0, e ?? {});
  }
  return t._$AI(r), t;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis;
let v = class extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const i = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = i.firstChild), i;
  }
  update(i) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(i), this._$Do = ra(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var i;
    super.connectedCallback(), (i = this._$Do) == null || i.setConnected(!0);
  }
  disconnectedCallback() {
    var i;
    super.disconnectedCallback(), (i = this._$Do) == null || i.setConnected(!1);
  }
  render() {
    return _;
  }
};
var ye;
v._$litElement$ = !0, v.finalized = !0, (ye = S.litElementHydrateSupport) == null || ye.call(S, { LitElement: v });
const hi = S.litElementPolyfillSupport;
hi == null || hi({ LitElement: v });
(S.litElementVersions ?? (S.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = (r) => (i, e) => {
  e !== void 0 ? e.addInitializer((() => {
    customElements.define(r, i);
  })) : customElements.define(r, i);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oa = { attribute: !0, type: String, converter: ti, reflect: !1, hasChanged: Ui }, sa = (r = oa, i, e) => {
  const { kind: a, metadata: t } = e;
  let o = globalThis.litPropertyMetadata.get(t);
  if (o === void 0 && globalThis.litPropertyMetadata.set(t, o = /* @__PURE__ */ new Map()), a === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), a === "accessor") {
    const { name: s } = e;
    return { set(d) {
      const n = i.get.call(this);
      i.set.call(this, d), this.requestUpdate(s, n, r);
    }, init(d) {
      return d !== void 0 && this.C(s, void 0, r, d), d;
    } };
  }
  if (a === "setter") {
    const { name: s } = e;
    return function(d) {
      const n = this[s];
      i.call(this, d), this.requestUpdate(s, n, r);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function b(r) {
  return (i, e) => typeof e == "object" ? sa(r, i, e) : ((a, t, o) => {
    const s = t.hasOwnProperty(o);
    return t.constructor.createProperty(o, a), s ? Object.getOwnPropertyDescriptor(t, o) : void 0;
  })(r, i, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Q(r) {
  return b({ ...r, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const na = (r, i, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof i != "object" && Object.defineProperty(r, i, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Di(r, i) {
  return (e, a, t) => {
    const o = (s) => {
      var d;
      return ((d = s.renderRoot) == null ? void 0 : d.querySelector(r)) ?? null;
    };
    return na(e, a, { get() {
      return o(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = { ATTRIBUTE: 1, CHILD: 2 }, Te = (r) => (...i) => ({ _$litDirective$: r, values: i });
class _e {
  constructor(i) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(i, e, a) {
    this._$Ct = i, this._$AM = e, this._$Ci = a;
  }
  _$AS(i, e) {
    return this.update(i, e);
  }
  update(i, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let xi = class extends _e {
  constructor(i) {
    if (super(i), this.it = g, i.type !== Me.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(i) {
    if (i === g || i == null) return this._t = void 0, this.it = i;
    if (i === _) return i;
    if (typeof i != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (i === this.it) return this._t;
    this.it = i;
    const e = [i];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
};
xi.directiveName = "unsafeHTML", xi.resultType = 1;
const X = Te(xi);
function l(r, i, e, a) {
  var t = arguments.length, o = t < 3 ? i : a === null ? a = Object.getOwnPropertyDescriptor(i, e) : a, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(r, i, e, a);
  else for (var d = r.length - 1; d >= 0; d--) (s = r[d]) && (o = (t < 3 ? s(o) : t > 3 ? s(i, e, o) : s(i, e)) || o);
  return t > 3 && o && Object.defineProperty(i, e, o), o;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Pe = Symbol("attachableController");
let ai;
ai = new MutationObserver((r) => {
  var i;
  for (const e of r)
    (i = e.target[Pe]) == null || i.hostConnected();
});
class Ue {
  get htmlFor() {
    return this.host.getAttribute("for");
  }
  set htmlFor(i) {
    i === null ? this.host.removeAttribute("for") : this.host.setAttribute("for", i);
  }
  get control() {
    return this.host.hasAttribute("for") ? !this.htmlFor || !this.host.isConnected ? null : this.host.getRootNode().querySelector(`#${this.htmlFor}`) : this.currentControl || this.host.parentElement;
  }
  set control(i) {
    i ? this.attach(i) : this.detach();
  }
  /**
   * Creates a new controller for an `Attachable` element.
   *
   * @param host The `Attachable` element.
   * @param onControlChange A callback with two parameters for the previous and
   *     next control. An `Attachable` element may perform setup or teardown
   *     logic whenever the control changes.
   */
  constructor(i, e) {
    this.host = i, this.onControlChange = e, this.currentControl = null, i.addController(this), i[Pe] = this, ai == null || ai.observe(i, { attributeFilter: ["for"] });
  }
  attach(i) {
    i !== this.currentControl && (this.setCurrentControl(i), this.host.removeAttribute("for"));
  }
  detach() {
    this.setCurrentControl(null), this.host.setAttribute("for", "");
  }
  /** @private */
  hostConnected() {
    this.setCurrentControl(this.control);
  }
  /** @private */
  hostDisconnected() {
    this.setCurrentControl(null);
  }
  setCurrentControl(i) {
    this.onControlChange(this.currentControl, i), this.currentControl = i;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const da = ["focusin", "focusout", "pointerdown"];
class Ri extends v {
  constructor() {
    super(...arguments), this.visible = !1, this.inward = !1, this.attachableController = new Ue(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(i) {
    this.attachableController.htmlFor = i;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(i) {
    this.attachableController.control = i;
  }
  attach(i) {
    this.attachableController.attach(i);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  /** @private */
  handleEvent(i) {
    var e;
    if (!i[pe]) {
      switch (i.type) {
        default:
          return;
        case "focusin":
          this.visible = ((e = this.control) == null ? void 0 : e.matches(":focus-visible")) ?? !1;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = !1;
          break;
      }
      i[pe] = !0;
    }
  }
  onControlChange(i, e) {
    for (const a of da)
      i == null || i.removeEventListener(a, this), e == null || e.addEventListener(a, this);
  }
  update(i) {
    i.has("visible") && this.dispatchEvent(new Event("visibility-changed")), super.update(i);
  }
}
l([
  b({ type: Boolean, reflect: !0 })
], Ri.prototype, "visible", void 0);
l([
  b({ type: Boolean, reflect: !0 })
], Ri.prototype, "inward", void 0);
const pe = Symbol("handledByFocusRing");
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ba = $`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let yi = class extends Ri {
};
yi.styles = [ba];
yi = l([
  j("md-focus-ring")
], yi);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = Te(class extends _e {
  constructor(r) {
    var i;
    if (super(r), r.type !== Me.ATTRIBUTE || r.name !== "class" || ((i = r.strings) == null ? void 0 : i.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return " " + Object.keys(r).filter(((i) => r[i])).join(" ") + " ";
  }
  update(r, [i]) {
    var a, t;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), r.strings !== void 0 && (this.nt = new Set(r.strings.join(" ").split(/\s/).filter(((o) => o !== ""))));
      for (const o in i) i[o] && !((a = this.nt) != null && a.has(o)) && this.st.add(o);
      return this.render(i);
    }
    const e = r.element.classList;
    for (const o of this.st) o in i || (e.remove(o), this.st.delete(o));
    for (const o in i) {
      const s = !!i[o];
      s === this.st.has(o) || (t = this.nt) != null && t.has(o) || (s ? (e.add(o), this.st.add(o)) : (e.remove(o), this.st.delete(o)));
    }
    return _;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ca = {
  STANDARD: "cubic-bezier(0.2, 0, 0, 1)"
};
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const la = 450, me = 225, ha = 0.2, pa = 10, ma = 75, ua = 0.35, ga = "::after", fa = "forwards";
var x;
(function(r) {
  r[r.INACTIVE = 0] = "INACTIVE", r[r.TOUCH_DELAY = 1] = "TOUCH_DELAY", r[r.HOLDING = 2] = "HOLDING", r[r.WAITING_FOR_CLICK = 3] = "WAITING_FOR_CLICK";
})(x || (x = {}));
const xa = [
  "click",
  "contextmenu",
  "pointercancel",
  "pointerdown",
  "pointerenter",
  "pointerleave",
  "pointerup"
], ya = 150, pi = window.matchMedia("(forced-colors: active)");
class Z extends v {
  constructor() {
    super(...arguments), this.disabled = !1, this.hovered = !1, this.pressed = !1, this.rippleSize = "", this.rippleScale = "", this.initialSize = 0, this.state = x.INACTIVE, this.attachableController = new Ue(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(i) {
    this.attachableController.htmlFor = i;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(i) {
    this.attachableController.control = i;
  }
  attach(i) {
    this.attachableController.attach(i);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  render() {
    const i = {
      hovered: this.hovered,
      pressed: this.pressed
    };
    return p`<div class="surface ${K(i)}"></div>`;
  }
  update(i) {
    i.has("disabled") && this.disabled && (this.hovered = !1, this.pressed = !1), super.update(i);
  }
  /**
   * TODO(b/269799771): make private
   * @private only public for slider
   */
  handlePointerenter(i) {
    this.shouldReactToEvent(i) && (this.hovered = !0);
  }
  /**
   * TODO(b/269799771): make private
   * @private only public for slider
   */
  handlePointerleave(i) {
    this.shouldReactToEvent(i) && (this.hovered = !1, this.state !== x.INACTIVE && this.endPressAnimation());
  }
  handlePointerup(i) {
    if (this.shouldReactToEvent(i)) {
      if (this.state === x.HOLDING) {
        this.state = x.WAITING_FOR_CLICK;
        return;
      }
      if (this.state === x.TOUCH_DELAY) {
        this.state = x.WAITING_FOR_CLICK, this.startPressAnimation(this.rippleStartEvent);
        return;
      }
    }
  }
  async handlePointerdown(i) {
    if (this.shouldReactToEvent(i)) {
      if (this.rippleStartEvent = i, !this.isTouch(i)) {
        this.state = x.WAITING_FOR_CLICK, this.startPressAnimation(i);
        return;
      }
      this.state = x.TOUCH_DELAY, await new Promise((e) => {
        setTimeout(e, ya);
      }), this.state === x.TOUCH_DELAY && (this.state = x.HOLDING, this.startPressAnimation(i));
    }
  }
  handleClick() {
    if (!this.disabled) {
      if (this.state === x.WAITING_FOR_CLICK) {
        this.endPressAnimation();
        return;
      }
      this.state === x.INACTIVE && (this.startPressAnimation(), this.endPressAnimation());
    }
  }
  handlePointercancel(i) {
    this.shouldReactToEvent(i) && this.endPressAnimation();
  }
  handleContextmenu() {
    this.disabled || this.endPressAnimation();
  }
  determineRippleSize() {
    const { height: i, width: e } = this.getBoundingClientRect(), a = Math.max(i, e), t = Math.max(ua * a, ma), o = this.currentCSSZoom ?? 1, s = Math.floor(a * ha / o), n = Math.sqrt(e ** 2 + i ** 2) + pa;
    this.initialSize = s;
    const c = (n + t) / s;
    this.rippleScale = `${c / o}`, this.rippleSize = `${s}px`;
  }
  getNormalizedPointerEventCoords(i) {
    const { scrollX: e, scrollY: a } = window, { left: t, top: o } = this.getBoundingClientRect(), s = e + t, d = a + o, { pageX: n, pageY: c } = i, f = this.currentCSSZoom ?? 1;
    return {
      x: (n - s) / f,
      y: (c - d) / f
    };
  }
  getTranslationCoordinates(i) {
    const { height: e, width: a } = this.getBoundingClientRect(), t = this.currentCSSZoom ?? 1, o = {
      x: (a / t - this.initialSize) / 2,
      y: (e / t - this.initialSize) / 2
    };
    let s;
    return i instanceof PointerEvent ? s = this.getNormalizedPointerEventCoords(i) : s = {
      x: a / t / 2,
      y: e / t / 2
    }, s = {
      x: s.x - this.initialSize / 2,
      y: s.y - this.initialSize / 2
    }, { startPoint: s, endPoint: o };
  }
  startPressAnimation(i) {
    var s;
    if (!this.mdRoot)
      return;
    this.pressed = !0, (s = this.growAnimation) == null || s.cancel(), this.determineRippleSize();
    const { startPoint: e, endPoint: a } = this.getTranslationCoordinates(i), t = `${e.x}px, ${e.y}px`, o = `${a.x}px, ${a.y}px`;
    this.growAnimation = this.mdRoot.animate({
      top: [0, 0],
      left: [0, 0],
      height: [this.rippleSize, this.rippleSize],
      width: [this.rippleSize, this.rippleSize],
      transform: [
        `translate(${t}) scale(1)`,
        `translate(${o}) scale(${this.rippleScale})`
      ]
    }, {
      pseudoElement: ga,
      duration: la,
      easing: ca.STANDARD,
      fill: fa
    });
  }
  async endPressAnimation() {
    this.rippleStartEvent = void 0, this.state = x.INACTIVE;
    const i = this.growAnimation;
    let e = 1 / 0;
    if (typeof (i == null ? void 0 : i.currentTime) == "number" ? e = i.currentTime : i != null && i.currentTime && (e = i.currentTime.to("ms").value), e >= me) {
      this.pressed = !1;
      return;
    }
    await new Promise((a) => {
      setTimeout(a, me - e);
    }), this.growAnimation === i && (this.pressed = !1);
  }
  /**
   * Returns `true` if
   *  - the ripple element is enabled
   *  - the pointer is primary for the input type
   *  - the pointer is the pointer that started the interaction, or will start
   * the interaction
   *  - the pointer is a touch, or the pointer state has the primary button
   * held, or the pointer is hovering
   */
  shouldReactToEvent(i) {
    if (this.disabled || !i.isPrimary || this.rippleStartEvent && this.rippleStartEvent.pointerId !== i.pointerId)
      return !1;
    if (i.type === "pointerenter" || i.type === "pointerleave")
      return !this.isTouch(i);
    const e = i.buttons === 1;
    return this.isTouch(i) || e;
  }
  isTouch({ pointerType: i }) {
    return i === "touch";
  }
  /** @private */
  async handleEvent(i) {
    if (!(pi != null && pi.matches))
      switch (i.type) {
        case "click":
          this.handleClick();
          break;
        case "contextmenu":
          this.handleContextmenu();
          break;
        case "pointercancel":
          this.handlePointercancel(i);
          break;
        case "pointerdown":
          await this.handlePointerdown(i);
          break;
        case "pointerenter":
          this.handlePointerenter(i);
          break;
        case "pointerleave":
          this.handlePointerleave(i);
          break;
        case "pointerup":
          this.handlePointerup(i);
          break;
      }
  }
  onControlChange(i, e) {
    for (const a of xa)
      i == null || i.removeEventListener(a, this), e == null || e.addEventListener(a, this);
  }
}
l([
  b({ type: Boolean, reflect: !0 })
], Z.prototype, "disabled", void 0);
l([
  Q()
], Z.prototype, "hovered", void 0);
l([
  Q()
], Z.prototype, "pressed", void 0);
l([
  Di(".surface")
], Z.prototype, "mdRoot", void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const va = $`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let vi = class extends Z {
};
vi.styles = [va];
vi = l([
  j("md-ripple")
], vi);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ze = [
  "role",
  "ariaAtomic",
  "ariaAutoComplete",
  "ariaBusy",
  "ariaChecked",
  "ariaColCount",
  "ariaColIndex",
  "ariaColSpan",
  "ariaCurrent",
  "ariaDisabled",
  "ariaExpanded",
  "ariaHasPopup",
  "ariaHidden",
  "ariaInvalid",
  "ariaKeyShortcuts",
  "ariaLabel",
  "ariaLevel",
  "ariaLive",
  "ariaModal",
  "ariaMultiLine",
  "ariaMultiSelectable",
  "ariaOrientation",
  "ariaPlaceholder",
  "ariaPosInSet",
  "ariaPressed",
  "ariaReadOnly",
  "ariaRequired",
  "ariaRoleDescription",
  "ariaRowCount",
  "ariaRowIndex",
  "ariaRowSpan",
  "ariaSelected",
  "ariaSetSize",
  "ariaSort",
  "ariaValueMax",
  "ariaValueMin",
  "ariaValueNow",
  "ariaValueText"
], wa = ze.map(De);
function mi(r) {
  return wa.includes(r);
}
function De(r) {
  return r.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const O = Symbol("privateIgnoreAttributeChangesFor");
function Si(r) {
  var i;
  class e extends r {
    constructor() {
      super(...arguments), this[i] = /* @__PURE__ */ new Set();
    }
    attributeChangedCallback(t, o, s) {
      if (!mi(t)) {
        super.attributeChangedCallback(t, o, s);
        return;
      }
      if (this[O].has(t))
        return;
      this[O].add(t), this.removeAttribute(t), this[O].delete(t);
      const d = ki(t);
      s === null ? delete this.dataset[d] : this.dataset[d] = s, this.requestUpdate(ki(t), o);
    }
    getAttribute(t) {
      return mi(t) ? super.getAttribute(wi(t)) : super.getAttribute(t);
    }
    removeAttribute(t) {
      super.removeAttribute(t), mi(t) && (super.removeAttribute(wi(t)), this.requestUpdate());
    }
  }
  return i = O, ka(e), e;
}
function ka(r) {
  for (const i of ze) {
    const e = De(i), a = wi(e), t = ki(e);
    r.createProperty(i, {
      attribute: e,
      noAccessor: !0
    }), r.createProperty(Symbol(a), {
      attribute: a,
      noAccessor: !0
    }), Object.defineProperty(r.prototype, i, {
      configurable: !0,
      enumerable: !0,
      get() {
        return this.dataset[t] ?? null;
      },
      set(o) {
        const s = this.dataset[t] ?? null;
        o !== s && (o === null ? delete this.dataset[t] : this.dataset[t] = o, this.requestUpdate(i, s));
      }
    });
  }
}
function wi(r) {
  return `data-${r}`;
}
function ki(r) {
  return r.replace(/-\w/, (i) => i[1].toUpperCase());
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function Re(r) {
  const i = new MouseEvent("click", { bubbles: !0 });
  return r.dispatchEvent(i), i;
}
function Se(r) {
  return r.currentTarget !== r.target || r.composedPath()[0] !== r.target || r.target.disabled ? !1 : !Aa(r);
}
function Aa(r) {
  const i = Ai;
  return i && (r.preventDefault(), r.stopImmediatePropagation()), Ca(), i;
}
let Ai = !1;
async function Ca() {
  Ai = !0, await null, Ai = !1;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function Be(r, i) {
  i.bubbles && (!r.shadowRoot || i.composed) && i.stopPropagation();
  const e = Reflect.construct(i.constructor, [i.type, i]), a = r.dispatchEvent(e);
  return a || i.preventDefault(), a;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const A = Symbol("internals"), ui = Symbol("privateInternals");
function Le(r) {
  class i extends r {
    get [A]() {
      return this[ui] || (this[ui] = this.attachInternals()), this[ui];
    }
  }
  return i;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const oi = Symbol("createValidator"), si = Symbol("getValidityAnchor"), gi = Symbol("privateValidator"), E = Symbol("privateSyncValidity"), ii = Symbol("privateCustomValidationMessage");
function Ie(r) {
  var i;
  class e extends r {
    constructor() {
      super(...arguments), this[i] = "";
    }
    get validity() {
      return this[E](), this[A].validity;
    }
    get validationMessage() {
      return this[E](), this[A].validationMessage;
    }
    get willValidate() {
      return this[E](), this[A].willValidate;
    }
    checkValidity() {
      return this[E](), this[A].checkValidity();
    }
    reportValidity() {
      return this[E](), this[A].reportValidity();
    }
    setCustomValidity(t) {
      this[ii] = t, this[E]();
    }
    requestUpdate(t, o, s) {
      super.requestUpdate(t, o, s), this[E]();
    }
    firstUpdated(t) {
      super.firstUpdated(t), this[E]();
    }
    [(i = ii, E)]() {
      this[gi] || (this[gi] = this[oi]());
      const { validity: t, validationMessage: o } = this[gi].getValidity(), s = !!this[ii], d = this[ii] || o;
      this[A].setValidity({ ...t, customError: s }, d, this[si]() ?? void 0);
    }
    [oi]() {
      throw new Error("Implement [createValidator]");
    }
    [si]() {
      throw new Error("Implement [getValidityAnchor]");
    }
  }
  return e;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const G = Symbol("getFormValue"), ni = Symbol("getFormState");
function $e(r) {
  class i extends r {
    get form() {
      return this[A].form;
    }
    get labels() {
      return this[A].labels;
    }
    // Use @property for the `name` and `disabled` properties to add them to the
    // `observedAttributes` array and trigger `attributeChangedCallback()`.
    //
    // We don't use Lit's default getter/setter (`noAccessor: true`) because
    // the attributes need to be updated synchronously to work with synchronous
    // form APIs, and Lit updates attributes async by default.
    get name() {
      return this.getAttribute("name") ?? "";
    }
    set name(a) {
      this.setAttribute("name", a);
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(a) {
      this.toggleAttribute("disabled", a);
    }
    attributeChangedCallback(a, t, o) {
      if (a === "name" || a === "disabled") {
        const s = a === "disabled" ? t !== null : t;
        this.requestUpdate(a, s);
        return;
      }
      super.attributeChangedCallback(a, t, o);
    }
    requestUpdate(a, t, o) {
      super.requestUpdate(a, t, o), this[A].setFormValue(this[G](), this[ni]());
    }
    [G]() {
      throw new Error("Implement [getFormValue]");
    }
    [ni]() {
      return this[G]();
    }
    formDisabledCallback(a) {
      this.disabled = a;
    }
  }
  return i.formAssociated = !0, l([
    b({ noAccessor: !0 })
  ], i.prototype, "name", null), l([
    b({ type: Boolean, noAccessor: !0 })
  ], i.prototype, "disabled", null), i;
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Ea {
  /**
   * Creates a new validator.
   *
   * @param getCurrentState A callback that returns the current state of
   *     constraint validation-related properties.
   */
  constructor(i) {
    this.getCurrentState = i, this.currentValidity = {
      validity: {},
      validationMessage: ""
    };
  }
  /**
   * Returns the current `ValidityStateFlags` and validation message for the
   * validator.
   *
   * If the constraint validation state has not changed, this will return a
   * cached result. This is important since `getValidity()` can be called
   * frequently in response to synchronous property changes.
   *
   * @return The current validity and validation message.
   */
  getValidity() {
    const i = this.getCurrentState();
    if (!(!this.prevState || !this.equals(this.prevState, i)))
      return this.currentValidity;
    const { validity: a, validationMessage: t } = this.computeValidity(i);
    return this.prevState = this.copy(i), this.currentValidity = {
      validationMessage: t,
      validity: {
        // Change any `ValidityState` instances into `ValidityStateFlags` since
        // `ValidityState` cannot be easily `{...spread}`.
        badInput: a.badInput,
        customError: a.customError,
        patternMismatch: a.patternMismatch,
        rangeOverflow: a.rangeOverflow,
        rangeUnderflow: a.rangeUnderflow,
        stepMismatch: a.stepMismatch,
        tooLong: a.tooLong,
        tooShort: a.tooShort,
        typeMismatch: a.typeMismatch,
        valueMissing: a.valueMissing
      }
    }, this.currentValidity;
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class je extends Ea {
  computeValidity(i) {
    return this.checkboxControl || (this.checkboxControl = document.createElement("input"), this.checkboxControl.type = "checkbox"), this.checkboxControl.checked = i.checked, this.checkboxControl.required = i.required, {
      validity: this.checkboxControl.validity,
      validationMessage: this.checkboxControl.validationMessage
    };
  }
  equals(i, e) {
    return i.checked === e.checked && i.required === e.required;
  }
  copy({ checked: i, required: e }) {
    return { checked: i, required: e };
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Ma = Si(Ie($e(Le(v))));
class C extends Ma {
  constructor() {
    super(), this.checked = !1, this.indeterminate = !1, this.required = !1, this.value = "on", this.prevChecked = !1, this.prevDisabled = !1, this.prevIndeterminate = !1, this.addEventListener("click", (i) => {
      !Se(i) || !this.input || (this.focus(), Re(this.input));
    });
  }
  update(i) {
    (i.has("checked") || i.has("disabled") || i.has("indeterminate")) && (this.prevChecked = i.get("checked") ?? this.checked, this.prevDisabled = i.get("disabled") ?? this.disabled, this.prevIndeterminate = i.get("indeterminate") ?? this.indeterminate), super.update(i);
  }
  render() {
    const i = !this.prevChecked && !this.prevIndeterminate, e = this.prevChecked && !this.prevIndeterminate, a = this.prevIndeterminate, t = this.checked && !this.indeterminate, o = this.indeterminate, s = K({
      disabled: this.disabled,
      selected: t || o,
      unselected: !t && !o,
      checked: t,
      indeterminate: o,
      "prev-unselected": i,
      "prev-checked": e,
      "prev-indeterminate": a,
      "prev-disabled": this.prevDisabled
    }), { ariaLabel: d, ariaInvalid: n } = this;
    return p`
      <div class="container ${s}">
        <input
          type="checkbox"
          id="input"
          aria-checked=${o ? "mixed" : g}
          aria-label=${d || g}
          aria-invalid=${n || g}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .indeterminate=${this.indeterminate}
          .checked=${this.checked}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring part="focus-ring" for="input"></md-focus-ring>
        <md-ripple for="input" ?disabled=${this.disabled}></md-ripple>
        <svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
    `;
  }
  handleInput(i) {
    const e = i.target;
    this.checked = e.checked, this.indeterminate = e.indeterminate;
  }
  handleChange(i) {
    Be(this, i);
  }
  [G]() {
    return !this.checked || this.indeterminate ? null : this.value;
  }
  [ni]() {
    return String(this.checked);
  }
  formResetCallback() {
    this.checked = this.hasAttribute("checked");
  }
  formStateRestoreCallback(i) {
    this.checked = i === "true";
  }
  [oi]() {
    return new je(() => this);
  }
  [si]() {
    return this.input;
  }
}
C.shadowRootOptions = {
  ...v.shadowRootOptions,
  delegatesFocus: !0
};
l([
  b({ type: Boolean })
], C.prototype, "checked", void 0);
l([
  b({ type: Boolean })
], C.prototype, "indeterminate", void 0);
l([
  b({ type: Boolean })
], C.prototype, "required", void 0);
l([
  b()
], C.prototype, "value", void 0);
l([
  Q()
], C.prototype, "prevChecked", void 0);
l([
  Q()
], C.prototype, "prevDisabled", void 0);
l([
  Q()
], C.prototype, "prevIndeterminate", void 0);
l([
  Di("input")
], C.prototype, "input", void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Ta = $`:host{border-start-start-radius:var(--md-checkbox-container-shape-start-start, var(--md-checkbox-container-shape, 2px));border-start-end-radius:var(--md-checkbox-container-shape-start-end, var(--md-checkbox-container-shape, 2px));border-end-end-radius:var(--md-checkbox-container-shape-end-end, var(--md-checkbox-container-shape, 2px));border-end-start-radius:var(--md-checkbox-container-shape-end-start, var(--md-checkbox-container-shape, 2px));display:inline-flex;height:var(--md-checkbox-container-size, 18px);position:relative;vertical-align:top;width:var(--md-checkbox-container-size, 18px);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-checkbox-container-size, 18px))/2)}md-focus-ring{height:44px;inset:unset;width:44px}input{appearance:none;height:48px;margin:0;opacity:0;outline:none;position:absolute;width:48px;z-index:1;cursor:inherit}:host([touch-target=none]) input{height:100%;width:100%}.container{border-radius:inherit;display:flex;height:100%;place-content:center;place-items:center;position:relative;width:100%}.outline,.background,.icon{inset:0;position:absolute}.outline,.background{border-radius:inherit}.outline{border-color:var(--md-checkbox-outline-color, var(--md-sys-color-on-surface-variant, #49454f));border-style:solid;border-width:var(--md-checkbox-outline-width, 2px);box-sizing:border-box}.background{background-color:var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4))}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}:where(.selected) :is(.background,.icon){opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-ripple{border-radius:var(--md-checkbox-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-checkbox-state-layer-size, 40px);inset:unset;width:var(--md-checkbox-state-layer-size, 40px);--md-ripple-hover-color: var(--md-checkbox-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-checkbox-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-opacity: var(--md-checkbox-pressed-state-layer-opacity, 0.12)}.selected md-ripple{--md-ripple-hover-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12)}.icon{fill:var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));height:var(--md-checkbox-icon-size, 18px);width:var(--md-checkbox-icon-size, 18px)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}:where(:hover) .outline{border-color:var(--md-checkbox-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-hover-outline-width, 2px)}:where(:hover) .background{background:var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4))}:where(:hover) .icon{fill:var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:focus-within) .outline{border-color:var(--md-checkbox-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-focus-outline-width, 2px)}:where(:focus-within) .background{background:var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4))}:where(:focus-within) .icon{fill:var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:active) .outline{border-color:var(--md-checkbox-pressed-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-pressed-outline-width, 2px)}:where(:active) .background{background:var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4))}:where(:active) .icon{fill:var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff))}:where(.disabled,.prev-disabled) :is(.background,.icon,.mark){animation-duration:0s;transition-duration:0s}:where(.disabled) .outline{border-color:var(--md-checkbox-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-disabled-outline-width, 2px);opacity:var(--md-checkbox-disabled-container-opacity, 0.38)}:where(.selected.disabled) .outline{visibility:hidden}:where(.selected.disabled) .background{background:var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-checkbox-selected-disabled-container-opacity, 0.38)}:where(.disabled) .icon{fill:var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fef7ff))}@media(forced-colors: active){.background{background-color:CanvasText}.selected.disabled .background{background-color:GrayText;opacity:1}.outline{border-color:CanvasText}.disabled .outline{border-color:GrayText;opacity:1}.icon{fill:Canvas}}
`;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let Ci = class extends C {
};
Ci.styles = [Ta];
Ci = l([
  j("md-checkbox")
], Ci);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Fe = Symbol("dispatchHooks");
function _a(r, i) {
  const e = r[Fe];
  if (!e)
    throw new Error(`'${r.type}' event needs setupDispatchHooks().`);
  e.addEventListener("after", i);
}
const ue = /* @__PURE__ */ new WeakMap();
function Pa(r, ...i) {
  let e = ue.get(r);
  e || (e = /* @__PURE__ */ new Set(), ue.set(r, e));
  for (const a of i) {
    if (e.has(a))
      continue;
    let t = !1;
    r.addEventListener(a, (o) => {
      if (t)
        return;
      o.stopImmediatePropagation();
      const s = Reflect.construct(o.constructor, [
        o.type,
        o
      ]), d = new EventTarget();
      s[Fe] = d, t = !0;
      const n = r.dispatchEvent(s);
      t = !1, n || o.preventDefault(), d.dispatchEvent(new Event("after"));
    }, {
      // Ensure this listener runs before other listeners.
      // `setupDispatchHooks()` should be called in constructors to also
      // ensure they run before any other externally-added capture listeners.
      capture: !0
    }), e.add(a);
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Ua = Si(Ie($e(Le(v))));
class P extends Ua {
  constructor() {
    super(), this.selected = !1, this.icons = !1, this.showOnlySelectedIcon = !1, this.required = !1, this.value = "on", this.addEventListener("click", (i) => {
      !Se(i) || !this.input || (this.focus(), Re(this.input));
    }), Pa(this, "keydown"), this.addEventListener("keydown", (i) => {
      _a(i, () => {
        i.defaultPrevented || i.key !== "Enter" || this.disabled || !this.input || this.input.click();
      });
    });
  }
  render() {
    return p`
      <div class="switch ${K(this.getRenderClasses())}">
        <input
          id="switch"
          class="touch"
          type="checkbox"
          role="switch"
          aria-label=${this.ariaLabel || g}
          ?checked=${this.selected}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <md-focus-ring part="focus-ring" for="switch"></md-focus-ring>
        <span class="track"> ${this.renderHandle()} </span>
      </div>
    `;
  }
  getRenderClasses() {
    return {
      selected: this.selected,
      unselected: !this.selected,
      disabled: this.disabled
    };
  }
  renderHandle() {
    const i = {
      "with-icon": this.showOnlySelectedIcon ? this.selected : this.icons
    };
    return p`
      ${this.renderTouchTarget()}
      <span class="handle-container">
        <md-ripple for="switch" ?disabled="${this.disabled}"></md-ripple>
        <span class="handle ${K(i)}">
          ${this.shouldShowIcons() ? this.renderIcons() : p``}
        </span>
      </span>
    `;
  }
  renderIcons() {
    return p`
      <div class="icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon ? p`` : this.renderOffIcon()}
      </div>
    `;
  }
  /**
   * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acheck%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
   */
  renderOnIcon() {
    return p`
      <slot class="icon icon--on" name="on-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
        </svg>
      </slot>
    `;
  }
  /**
   * https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aclose%3AFILL%400%3Bwght%40500%3BGRAD%400%3Bopsz%4024
   */
  renderOffIcon() {
    return p`
      <slot class="icon icon--off" name="off-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
        </svg>
      </slot>
    `;
  }
  renderTouchTarget() {
    return p`<span class="touch"></span>`;
  }
  shouldShowIcons() {
    return this.icons || this.showOnlySelectedIcon;
  }
  handleInput(i) {
    const e = i.target;
    this.selected = e.checked;
  }
  handleChange(i) {
    Be(this, i);
  }
  [G]() {
    return this.selected ? this.value : null;
  }
  [ni]() {
    return String(this.selected);
  }
  formResetCallback() {
    this.selected = this.hasAttribute("selected");
  }
  formStateRestoreCallback(i) {
    this.selected = i === "true";
  }
  [oi]() {
    return new je(() => ({
      checked: this.selected,
      required: this.required
    }));
  }
  [si]() {
    return this.input;
  }
}
P.shadowRootOptions = {
  mode: "open",
  delegatesFocus: !0
};
l([
  b({ type: Boolean })
], P.prototype, "selected", void 0);
l([
  b({ type: Boolean })
], P.prototype, "icons", void 0);
l([
  b({ type: Boolean, attribute: "show-only-selected-icon" })
], P.prototype, "showOnlySelectedIcon", void 0);
l([
  b({ type: Boolean })
], P.prototype, "required", void 0);
l([
  b()
], P.prototype, "value", void 0);
l([
  Di("input")
], P.prototype, "input", void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const za = $`@layer styles, hcm;@layer styles{:host{display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-switch-track-height, 32px))/2) 0px}md-focus-ring{--md-focus-ring-shape-start-start: var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-start-end: var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-end: var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-start: var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}.switch{align-items:center;display:inline-flex;flex-shrink:0;position:relative;width:var(--md-switch-track-width, 52px);height:var(--md-switch-track-height, 32px);border-start-start-radius:var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}input{appearance:none;height:max(100%,var(--md-switch-touch-target-size, 48px));outline:none;margin:0;position:absolute;width:max(100%,var(--md-switch-touch-target-size, 48px));z-index:1;cursor:inherit;top:50%;left:50%;transform:translate(-50%, -50%)}:host([touch-target=none]) input{display:none}}@layer styles{.track{position:absolute;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;display:flex;justify-content:center;align-items:center}.track::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;transition-property:opacity,background-color;transition-timing-function:linear;transition-duration:67ms}.disabled .track{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.disabled .track::before,.disabled .track::after{transition:none;opacity:var(--md-switch-disabled-track-opacity, 0.12)}.disabled .track::before{background-clip:content-box}.selected .track::before{background-color:var(--md-switch-selected-track-color, var(--md-sys-color-primary, #6750a4))}.selected:hover .track::before{background-color:var(--md-switch-selected-hover-track-color, var(--md-sys-color-primary, #6750a4))}.selected:focus-within .track::before{background-color:var(--md-switch-selected-focus-track-color, var(--md-sys-color-primary, #6750a4))}.selected:active .track::before{background-color:var(--md-switch-selected-pressed-track-color, var(--md-sys-color-primary, #6750a4))}.selected.disabled .track{background-clip:border-box}.selected.disabled .track::before{background-color:var(--md-switch-disabled-selected-track-color, var(--md-sys-color-on-surface, #1d1b20))}.unselected .track::before{background-color:var(--md-switch-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-track-outline-color, var(--md-sys-color-outline, #79747e));border-style:solid;border-width:var(--md-switch-track-outline-width, 2px)}.unselected:hover .track::before{background-color:var(--md-switch-hover-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-hover-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:focus-visible .track::before{background-color:var(--md-switch-focus-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-focus-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:active .track::before{background-color:var(--md-switch-pressed-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-pressed-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected.disabled .track::before{background-color:var(--md-switch-disabled-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-disabled-track-outline-color, var(--md-sys-color-on-surface, #1d1b20))}}@layer hcm{@media(forced-colors: active){.selected .track::before{background:ButtonText;border-color:ButtonText}.disabled .track::before{border-color:GrayText;opacity:1}.disabled.selected .track::before{background:GrayText}}}@layer styles{.handle-container{display:flex;place-content:center;place-items:center;position:relative;transition:margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}.selected .handle-container{margin-inline-start:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.unselected .handle-container{margin-inline-end:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.disabled .handle-container{transition:none}.handle{border-start-start-radius:var(--md-switch-handle-shape-start-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-handle-shape-start-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-handle-shape-end-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-handle-shape-end-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));height:var(--md-switch-handle-height, 16px);width:var(--md-switch-handle-width, 16px);transform-origin:center;transition-property:height,width;transition-duration:250ms,250ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1),cubic-bezier(0.2, 0, 0, 1);z-index:0}.handle::before{content:"";display:flex;inset:0;position:absolute;border-radius:inherit;box-sizing:border-box;transition:background-color 67ms linear}.disabled .handle,.disabled .handle::before{transition:none}.selected .handle{height:var(--md-switch-selected-handle-height, 24px);width:var(--md-switch-selected-handle-width, 24px)}.handle.with-icon{height:var(--md-switch-with-icon-handle-height, 24px);width:var(--md-switch-with-icon-handle-width, 24px)}.selected:not(.disabled):active .handle,.unselected:not(.disabled):active .handle{height:var(--md-switch-pressed-handle-height, 28px);width:var(--md-switch-pressed-handle-width, 28px);transition-timing-function:linear;transition-duration:100ms}.selected .handle::before{background-color:var(--md-switch-selected-handle-color, var(--md-sys-color-on-primary, #fff))}.selected:hover .handle::before{background-color:var(--md-switch-selected-hover-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:focus-within .handle::before{background-color:var(--md-switch-selected-focus-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:active .handle::before{background-color:var(--md-switch-selected-pressed-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected.disabled .handle::before{background-color:var(--md-switch-disabled-selected-handle-color, var(--md-sys-color-surface, #fef7ff));opacity:var(--md-switch-disabled-selected-handle-opacity, 1)}.unselected .handle::before{background-color:var(--md-switch-handle-color, var(--md-sys-color-outline, #79747e))}.unselected:hover .handle::before{background-color:var(--md-switch-hover-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:focus-within .handle::before{background-color:var(--md-switch-focus-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:active .handle::before{background-color:var(--md-switch-pressed-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected.disabled .handle::before{background-color:var(--md-switch-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-handle-opacity, 0.38)}md-ripple{border-radius:var(--md-switch-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-switch-state-layer-size, 40px);inset:unset;width:var(--md-switch-state-layer-size, 40px)}.selected md-ripple{--md-ripple-hover-color: var(--md-switch-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-color: var(--md-switch-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-switch-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-selected-pressed-state-layer-opacity, 0.12)}.unselected md-ripple{--md-ripple-hover-color: var(--md-switch-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-color: var(--md-switch-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-switch-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-pressed-state-layer-opacity, 0.12)}}@layer hcm{@media(forced-colors: active){.unselected .handle::before{background:ButtonText}.disabled .handle::before{opacity:1}.disabled.unselected .handle::before{background:GrayText}}}@layer styles{.icons{position:relative;height:100%;width:100%}.icon{position:absolute;inset:0;margin:auto;display:flex;align-items:center;justify-content:center;fill:currentColor;transition:fill 67ms linear,opacity 33ms linear,transform 167ms cubic-bezier(0.2, 0, 0, 1);opacity:0}.disabled .icon{transition:none}.selected .icon--on,.unselected .icon--off{opacity:1}.unselected .handle:not(.with-icon) .icon--on{transform:rotate(-45deg)}.icon--off{width:var(--md-switch-icon-size, 16px);height:var(--md-switch-icon-size, 16px);color:var(--md-switch-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:hover .icon--off{color:var(--md-switch-hover-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:focus-within .icon--off{color:var(--md-switch-focus-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:active .icon--off{color:var(--md-switch-pressed-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected.disabled .icon--off{color:var(--md-switch-disabled-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));opacity:var(--md-switch-disabled-icon-opacity, 0.38)}.icon--on{width:var(--md-switch-selected-icon-size, 16px);height:var(--md-switch-selected-icon-size, 16px);color:var(--md-switch-selected-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:hover .icon--on{color:var(--md-switch-selected-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:focus-within .icon--on{color:var(--md-switch-selected-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:active .icon--on{color:var(--md-switch-selected-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected.disabled .icon--on{color:var(--md-switch-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-selected-icon-opacity, 0.38)}}@layer hcm{@media(forced-colors: active){.icon--off{fill:Canvas}.icon--on{fill:ButtonText}.disabled.unselected .icon--off,.disabled.selected .icon--on{opacity:1}.disabled .icon--on{fill:GrayText}}}
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let Ei = class extends P {
};
Ei.styles = [za];
Ei = l([
  j("md-switch")
], Ei);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Da = Si(v);
class W extends Da {
  constructor() {
    super(...arguments), this.value = 0, this.max = 1, this.indeterminate = !1, this.fourColor = !1;
  }
  render() {
    const { ariaLabel: i } = this;
    return p`
      <div
        class="progress ${K(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${i || g}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate ? g : this.value}
        >${this.renderIndicator()}</div
      >
    `;
  }
  getRenderClasses() {
    return {
      indeterminate: this.indeterminate,
      "four-color": this.fourColor
    };
  }
}
l([
  b({ type: Number })
], W.prototype, "value", void 0);
l([
  b({ type: Number })
], W.prototype, "max", void 0);
l([
  b({ type: Boolean })
], W.prototype, "indeterminate", void 0);
l([
  b({ type: Boolean, attribute: "four-color" })
], W.prototype, "fourColor", void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Ra extends W {
  renderIndicator() {
    return this.indeterminate ? this.renderIndeterminateContainer() : this.renderDeterminateContainer();
  }
  // Determinate mode is rendered with an svg so the progress arc can be
  // easily animated via stroke-dashoffset.
  renderDeterminateContainer() {
    const i = (1 - this.value / this.max) * 100;
    return p`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${i}></circle>
      </svg>
    `;
  }
  // Indeterminate mode rendered with 2 bordered-divs. The borders are
  // clipped into half circles by their containers. The divs are then carefully
  // animated to produce changes to the spinner arc size.
  // This approach has 4.5x the FPS of rendering via svg on Chrome 111.
  // See https://lit.dev/playground/#gist=febb773565272f75408ab06a0eb49746.
  renderIndeterminateContainer() {
    return p` <div class="spinner">
      <div class="left">
        <div class="circle"></div>
      </div>
      <div class="right">
        <div class="circle"></div>
      </div>
    </div>`;
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Sa = $`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let Mi = class extends Ra {
};
Mi.styles = [Sa];
Mi = l([
  j("md-circular-progress")
], Mi);
const Ba = {
  newsletters: [
    {
      id: "3c5b830d5f",
      name: "Adelanto de mañana",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los días",
      body: "Suscríbete y recibe en primicia las noticias en portada del día siguiente: investigaciones, exclusivas...",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2026/0112/08/adelanto-png.png",
      tag: "",
      namePromo: "adelanto_de_manana"
    },
    {
      id: "f555917a0d",
      name: "Al día",
      parentId: "",
      itemType: "list",
      subtitle: "De lunes a viernes",
      body: "<b>Con Juanlu Sánchez</b>, el boletín que te trae las claves de la actualidad sin ruido.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/al-dia-png.png",
      tag: "",
      namePromo: "al_dia"
    },
    {
      id: "23ffea61a0",
      name: "El boletín del director",
      parentId: "1de276413a",
      itemType: "interest",
      subtitle: "Todos los sábados",
      body: "Un resumen semanal de la actualidad, escrito por <b>Ignacio Escolar</b>, director de elDiario.es.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/director-png.png",
      tag: "partner",
      isPartner: !0,
      namePromo: "el_boletin_del_director"
    },
    {
      id: "a3bc08e5fa",
      name: "Crónicas desde Trumplandia",
      parentId: "1de276413a",
      itemType: "interest",
      subtitle: "Todos los miércoles",
      body: "Enviamos a Washington a <b>Andrés Gil</b> como corresponsal. Porque lo que pasa allí, también afecta aquí. Te lo contamos de primera mano",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0707/10/trumplandia-png.png",
      tag: "new",
      isPartner: !0,
      namePromo: "cronicas_desde_trumplandia"
    },
    {
      id: "d81b8becee",
      name: "Política para supervivientes",
      parentId: "1de276413a",
      itemType: "interest",
      subtitle: "Todos los domingos",
      body: "Lo más relevante de la política semanal y otros temas de interés, por<b> Iñigo Sáenz de Ugarte.</b>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/supervivientes-png.png",
      tag: "partner",
      isPartner: !0,
      namePromo: "politica_para_supervivientes"
    },
    {
      id: "e09aa0f2fc",
      name: "Cuarto Propio",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los miércoles",
      body: "<b>Ana Requena</b> analiza la actualidad con enfoque feminista, recopilando noticias sobre igualdad y género, y ofreciendo recomendaciones.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/cuarto-png.png",
      tag: "",
      namePromo: "cuarto_propio"
    },
    {
      id: "d84d59a3dd",
      name: "Cultura",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "Lo más destacado del contenido cultural y una agenda de ocio con planes y películas recomendadas, por<b> Elena Cabrera</b>, redactora jefa de Cultura.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/cultura-png.png",
      tag: "",
      namePromo: "cultura"
    },
    {
      id: "869177c636",
      name: "Educación",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los martes",
      body: "Con <b>Daniel Sánchez</b>. Abordamos los temas clave para profesores, padres y alumnos, porque la educación es responsabilidad de toda la sociedad.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/educacion-png.png",
      tag: "",
      namePromo: "educacion"
    },
    {
      id: "95ba295bd6",
      name: "Internacional",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los lunes",
      body: "Lo esencial de la actualidad internacional: reportajes destacados, cifras clave y un resumen telegráfico de la semana, por<b> Javier Biosca.</b>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/internacional-png.png",
      tag: "",
      namePromo: "internacional"
    },
    {
      id: "d448ddbfb8",
      name: "¡Salud!",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los sábados",
      body: "Con <b>David Noriega</b>, prestamos especial atención a la sanidad pública, dando un cariño especial a las buenas noticias, que tanto nos hacen falta.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2026/0423/08/salud.png",
      tag: "",
      namePromo: "salud"
    },
    {
      id: "9196f14e64",
      name: "DimeSeries",
      parentId: "f95d8873c2",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "La newsletter de <b>verTele</b> para ayudarte a elegir las series que quieres ver y conocer más sobre sus historias y personajes.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/dimeseries-png.png",
      tag: "",
      namePromo: "dimeseries"
    },
    {
      id: "977cf1b0fc",
      name: "Andalucía",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "<b>Javier Ramajo</b>, el resumen semanal y lo mejor de la redacción de Andalucía.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0918/07/andalucia-png.png",
      tag: "",
      namePromo: "andalucia"
    },
    {
      id: "4bea031059",
      name: "Catalunya",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "<b>Con Neus Tomàs:</b> el resumen semanal y lo mejor de la redacción de Catalunya.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/catalun-a-png.png",
      tag: "",
      namePromo: "catalunya"
    },
    {
      id: "9edc05693d",
      name: "Cordópolis",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los días",
      body: "Recibe en tu correo los titulares de la portada de <b>Cordópolis</b>, que te informa sobre actualidad, política, cultura y deportes, del día siguiente.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0708/09/cordopolis-png.png",
      tag: "",
      namePromo: "cordopolis"
    },
    {
      id: "cd092659ca",
      name: "Contraoferta",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los jueves",
      body: "Un análisis imprescindible sobre cómo afecta la economía a tu día a día, con <b>Serafí del Arco,</b> redactor jefe de Economía",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/1126/14/propiedad-1-contraoferta-png.png",
      tag: "",
      namePromo: "contraoferta"
    },
    {
      id: "06f51f65d5",
      name: "Comunitat Valenciana",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "<b>Con Adolf Beltrán:</b> el resumen semanal y lo mejor de la redacción de la Comunitat Valenciana.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/valencia-png.png",
      tag: "",
      namePromo: "comunitat_valenciana"
    },
    {
      id: "de5116dfc0",
      name: "Euskadi",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los martes",
      body: "<b>Con Iker Rioja Andueza:</b> el resumen semanal y lo mejor de la redacción de Euskadi.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/euskadi-png.png",
      tag: "",
      namePromo: "euskadi"
    },
    {
      id: "b2ad96402d",
      name: "Illes Balears",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "<b>Con Angy Galvín:</b> el resumen semanal y lo mejor de la redacción de Illes Balears.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/baleares-png.png",
      tag: "",
      namePromo: "illes_balears"
    },
    {
      id: "d478dd2970",
      name: "Navarra",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los martes",
      body: "<b>Con Rodrigo Saiz:</b> el resumen semanal y lo mejor de la redacción de Navarra.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/navarra-png.png",
      tag: "",
      namePromo: "navarra"
    },
    {
      id: "0b5b346d04",
      name: "Somos Madrid",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "<b>Con Diego Casado:</b> el resumen semanal y lo mejor de la redacción de Madrid.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/madrid-png.png",
      tag: "",
      namePromo: "somos_madrid"
    },
    {
      id: "3f6d6e2152",
      name: "Cantabria",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los jueves",
      body: "<b>Con Laro García:</b> el resumen semanal y lo mejor de la redacción de Cantabria.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/cantabria-png.png",
      tag: "",
      namePromo: "cantabria"
    },
    {
      id: "3c8d7e06d9",
      name: "Aragón",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los jueves",
      body: "<b>Con Luis Faci:</b> el resumen semanal y lo mejor de la redacción de Aragón.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/aragon-png.png",
      tag: "",
      namePromo: "aragon"
    },
    {
      id: "42c9941b08",
      name: "La Rioja",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los jueves",
      body: "<b>Con Olivia García:</b> el resumen semanal y lo mejor de la redacción de La Rioja.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/rioja-png.png",
      tag: "",
      namePromo: "la_rioja"
    },
    {
      id: "bbb6c1d169",
      name: "Extremadura",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los jueves",
      body: "<b>Con Santiago Manchado:</b> el resumen semanal y lo mejor de la redacción de Extremadura.",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/extremadura-png.png",
      tag: "",
      namePromo: "extremadura"
    },
    {
      id: "fb68c4aeca",
      name: "Murcia",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los jueves",
      body: "<p>Con <b>Elisa Reche:</b> el resumen semanal y lo mejor de la redacción de Murcia.</p>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/1001/10/murcia-png.png",
      tag: "",
      namePromo: "murcia"
    },
    {
      id: "39dc8c09d9",
      name: "Cultura Cordópolis",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "<p>Lo que ha dado de sí la semana cultural y un puñado de cosas que hacer en Córdoba, por <b>Juan Velasco</b>, coordinador de Cultura</p>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/1001/09/cultura-cordopolis-png.png",
      tag: "",
      namePromo: "cultura_cordopolis"
    },
    {
      id: "93072b975d",
      name: "El análisis de Olga Rodríguez",
      parentId: "1de276413a",
      itemType: "interest",
      subtitle: "Todos los martes",
      body: "<p>Crónicas y reflexiones de <b>Olga Rodríguez</b>, periodista especializada en Oriente Medio y Derechos Humanos</p>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/1008/08/olga-rodriguez-png.png",
      tag: "",
      isPartner: !0,
      namePromo: "el_analisis_de_olga_rodriguez"
    },
    {
      id: "05ad97cdcd",
      name: "Sin filtro",
      parentId: "1de276413a",
      itemType: "interest",
      subtitle: "Todos los jueves",
      body: "<p>Donde la verdad no se maquilla ni se suaviza. Una opinión directa sobre lo que esconden los micrófonos de la política, con Esther Palomera</p>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/1027/12/propiedad-1-sin-filtro-png.png",
      tag: "",
      isPartner: !0,
      namePromo: "sin_filtro"
    },
    {
      id: "517d345008",
      name: "Top Secret",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los domingos",
      body: "<p>Vuelve el Top Secret de Carlos Sosa. Serás el primero en enterarte de los detalles que nadie más conoce.</p>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2026/0414/11/topsecret-canarias.png",
      tag: "",
      namePromo: "top_secret_canarias"
    },
    {
      id: "65046eeaf7",
      name: "Desalambre",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Los jueves, quincenal",
      body: "<p>Historias que importan, contadas de cerca. Gabriela Sánchez te acerca la realidad sobre derechos humanos y migraciones.</p>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2026/0413/08/propiedad-1-desalambre.png",
      tag: "",
      isPartner: !1,
      namePromo: "desalambre"
    },
    {
      id: "4c72bee66a",
      name: "FIC",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Todos los jueves",
      body: "<p>Suscríbete para conocer en primicia el cartel, artistas y todas las novedades del FIC 2026. ¡Próximamente!</p>",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2026/0413/08/propiedad-1-fic.png",
      tag: "",
      isPartner: !1,
      namePromo: "FIC"
    }
  ],
  noLoggedBox: {
    insert: "Inserta tu correo para recibir este boletín",
    conditions: {
      firstPart: "Acepto las ",
      secondPart: "condiciones de uso y privacidad"
    },
    join: {
      free: "Apúntate gratis",
      members: "Apúntate"
    },
    email: {
      yourEmail: "Tu email",
      incorrectFormat: "El formato del email no es correcto"
    },
    sentEmailModal: {
      reviseMessage: "Revisa tu correo",
      emailMessage: "Te hemos enviado un correo electrónico con un enlace para confirmar tu suscripción a este boletín. Por si acaso, revisa también tu carpeta de Spam",
      openEmail: "Abrir correo"
    }
  },
  loggedBox: {
    userIsAlreadySubscribed: {
      message: "YA ESTÁS SUSCRITO A ESTE BOLETÍN",
      handleMessage: "GESTIONAR MIS BOLETINES"
    },
    subscribedModal: {
      thanksMessage: "¡Gracias por suscribirte!",
      exploreMessage: {
        firstPart: "Explora nuestra sección de ",
        secondPart: "boletines"
      }
    },
    showConfirmedEmailModal: {
      thanksMessage: "¡Gracias por suscribirte!",
      explore: {
        firstPart: " Explora nuestra sección de ",
        link: "boletines ",
        secondPart: "y accede a las opiniones más relevantes sobre los temas de actualidad que te interesan"
      }
    },
    userNotSubscribed: {
      subscribe: "SUSCRIBIRME AL BOLETÍN"
    }
  },
  errorModal: {
    reviseMessage: "¡Ups! Hemos tenido un problema técnico",
    emailMessage: {
      firstPart: "Por favor, vuelve a intentarlo dentro de unos instantes haciendo clic en ",
      link: "este enlace ",
      secondPart: "o recargando la página"
    }
  },
  membersModal: {
    message: "Este boletín es exclusivo para socios y socias",
    hazte_socio: "Hazte socio/a para recibirlo y disfrutar de más ventajas",
    button: "Hazte socio, hazte socia"
  }
}, La = {
  newsletters: [
    {
      id: "b2ad96402d",
      name: "Illes Balears",
      parentId: "10e11ebad6",
      itemType: "interest",
      subtitle: "Tots els divendres",
      body: "<b>Angy Galvín </b>et presenta un resum de les notícies més rellevants de la setmana i et recomana els reportatges més destacats de la redacció d'Illes Balears",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/baleares-png.png",
      tag: "",
      namePromo: "illes_balears"
    },
    {
      id: "4bea031059",
      name: "Catalunya",
      parentId: "10e11ebacd6",
      itemType: "interest",
      subtitle: "Todos los viernes",
      body: "Amb <b>Neus Tomàs:</b> el resum setmanal i una selecció de la redacció de Catalunya",
      image: "https://static.eldiario.es/eldiario/public/content/file/original/2025/0611/14/catalun-a-png.png",
      tag: "",
      namePromo: "catalunya"
    }
  ],
  noLoggedBox: {
    insert: "Insereix el tu correu per a rebre aquest butlletí",
    conditions: {
      firstPart: "Accepto les ",
      secondPart: "condicions d’ús i privacitat"
    },
    join: {
      free: "Apunta’t gratis",
      members: "Apunta’t"
    },
    email: {
      yourEmail: "El teu email",
      incorrectFormat: "El format de l'email no és correcte"
    },
    sentEmailModal: {
      reviseMessage: "Revisa el teu correu",
      emailMessage: "T'hem enviat un correu electrònic amb un enllaç per a confirmar la teva subscripció a aquest butlletí. Per si de cas, revisa també la teva carpeta de Spam",
      openEmail: "Obrir correu"
    }
  },
  loggedBox: {
    userIsAlreadySubscribed: {
      message: "JA ESTÀS SUBSCRIT A AQUEST BUTLLETÍ",
      handleMessage: "GESTIONAR ELS MEUS BUTLLETINS"
    },
    subscribedModal: {
      thanksMessage: "Gràcies per subscriure’t!",
      exploreMessage: {
        firstPart: "Explora la nostra secció de ",
        secondPart: "butlletins"
      }
    },
    showConfirmedEmailModal: {
      thanksMessage: "Gràcies per subscriure’t!",
      explore: {
        firstPart: "Explora la nostra secció de ",
        link: "butlletins",
        secondPart: " i accedeix a les opinions més rellevants sobre els temes d’actualitat que t’interessen"
      }
    },
    userNotSubscribed: {
      subscribe: "SUBSCRIURE'M AL BUTLLETÍ"
    }
  },
  errorModal: {
    reviseMessage: "Ups! Hem tingut un problema tècnic",
    emailMessage: {
      firstPart: "Si us plau, torna a intentar-ho dins d'uns instants fent clic en ",
      link: "aquest enllaç ",
      secondPart: "o recarregant la pàgina"
    }
  },
  membersModal: {
    message: "Aquest butlletí és exclusiu per a socis i sòcies",
    hazte_socio: "Fes-te soci/a per a rebre-ho i gaudir de més avantatges",
    button: "Fes-te soci, fes-te sòcia"
  }
}, Ia = {
  alDia: "f555917a0d"
}, $a = [Ia.alDia], k = {
  SUBSCRIBED: "subscribed",
  UNSUBSCRIBED: "unsubscribed",
  ARCHIVED: "archived"
}, ge = {
  es: Ba,
  ca: La
}, ja = {
  "no-logged": [
    {
      contentgroup1: "ElDiario.es",
      contentgroup2: "",
      contentgroup3: "",
      contentgroup4: "",
      contentgroup5: ""
    },
    {
      pageTemplate: "home",
      pageFechaPublicacion: "2020-03-24",
      pageFechaModificacion: "2025-05-20",
      pageRedactorName: "",
      pageSection: "ElDiario.es",
      pageFirstTitle: "",
      pageAdvance: !1,
      pageLenght: "",
      pagePrincipalTag: "",
      page_paywall: !1,
      pageId: "",
      pageCategoryId: ""
    },
    {
      userID: "",
      userPerfil: "Anónimo",
      userSexo: "",
      userProvincia: "",
      userAnoNacimiento: "",
      userAltaUsuario: "",
      userLogin: "",
      userLastAccess: "2025-5-20",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
      userState: "no logado",
      userStatus: "",
      userAutentification: "eldiario",
      userFormaPago: "",
      userNumeroRenovaciones: "",
      userModalidadSubscripcion: "",
      userCampaign: "",
      userSource: "",
      userMedium: "",
      userCarrito: "",
      userTarjetaCaducada: "",
      userPeriodoGracia: "",
      subscriptionType: ""
    },
    {
      isMovil: !1
    },
    {
      "gtm.start": 1747740534226,
      event: "gtm.js",
      "gtm.uniqueEventId": 3
    },
    {
      0: "set",
      1: "developer_id.dMTc4Zm",
      2: !0
    },
    {
      0: "consent",
      1: "update",
      2: {
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted"
      }
    },
    {
      event: "didomi-cookies-consent",
      didomiCookiesConsent: "essential,analytics,marketing,social",
      "gtm.uniqueEventId": 66
    },
    {
      event: "didomi-consent",
      didomiRegulationName: "gdpr",
      didomiGDPRApplies: 1,
      didomiIABConsent: "CQHTqYAQHTqYAAHABBENBNFsAP_gAEPgAAiQJ3tX_G__bGlr8X73aftkeY1P9_h77sQxBhfJE-4FzLvW_JwXx2ExNA36tqIKmRIAu3RBIQNlGJDURVCgaogVryDMaEiUoTNKJ6BkiFMRM2dYCF5vmwtj-QCY5vp9d1dx2B-t7dr83dzyy4VHn3a5fma0WJCdA5-tDfv9bROb-9IOd_x8v4v8_F_pE2_eT1l_tWvp7D8-cts7_XW89_ffeCdwBJhoVEAZYEhIQaBhBAgBUFYQEUCAAAAEgaICAEwYFOwMAl1hIgBACgAGCAEAAIMgAQAAAQAIRABAAUCAACAQKAAIACAQCAAgYAAQAWAgEAAIDoEKYEEAgWACRmREKYEIQCQQEtlQgkAQIK4QhFjgEQCImCgAAAAAKwABAWCwGJJASoSCBLiDaAAAgAQCCAAoQScmAAIAzZag8GTaMrAA.f_wACHwAAAAA",
      didomiVendorsConsent: "iab:1141,iab:490,iab:737,iab:733,iab:725,iab:930,iab:298,iab:849,iab:571,iab:561,iab:329,iab:648,iab:682,iab:587,iab:721,iab:497,iab:626,iab:151,iab:769,iab:541,iab:712,iab:620,iab:869,iab:877,iab:665,iab:888,iab:1028,iab:707,iab:193,iab:157,iab:663,iab:879,iab:791,iab:316,iab:716,iab:891,iab:775,iab:776,iab:778,iab:780,iab:781,iab:784,iab:508,iab:59,iab:811,iab:788,iab:821,iab:939,iab:936,iab:835,iab:838,iab:851,iab:323,iab:834,iab:137,iab:326,iab:850,iab:209,iab:985,iab:438,iab:1006,iab:986,iab:956,iab:211,iab:317,iab:149,iab:422,iab:163,iab:241,iab:178,iab:212,iab:270,iab:727,iab:361,iab:45,iab:473,iab:90,iab:427,iab:751,iab:1022,iab:1025,iab:1032,iab:1146,iab:98,iab:185,iab:976,iab:966,iab:1038,iab:1040,iab:1044,iab:1046,iab:486,iab:488,iab:87,iab:294,iab:31,iab:1116,iab:1165,iab:1059,iab:1060,iab:1063,iab:1067,iab:1070,iab:1079,iab:797,iab:1172,iab:232,iab:1081,iab:1121,iab:1090,iab:1182,iab:997,iab:1106,iab:799,iab:1126,iab:1132,iab:618,iab:810,iab:1134,iab:1135,iab:199,iab:861,iab:1137,iab:1156,iab:1020,iab:862,iab:1157,iab:1173,iab:1178,iab:127,iab:50,iab:33,iab:73,iab:85,iab:920,iab:1184,iab:1188,iab:999,iab:132,iab:139,iab:444,iab:1201,iab:1203,iab:717,iab:1193,iab:996,iab:205,iab:231,iab:728,iab:9,iab:235,iab:1210,iab:1211,iab:256,iab:274,iab:1016,iab:958,iab:1202,iab:1049,iab:658,iab:1217,iab:491,iab:831,iab:262,iab:108,iab:13,iab:394,iab:409,iab:1058,iab:759,iab:1051,iab:76,iab:315,iab:1220,iab:30,iab:57,iab:554,iab:631,iab:766,iab:1062,iab:21,iab:44,iab:192,iab:224,iab:397,iab:709,iab:804,iab:1026,iab:1159,iab:1069,iab:1209,iab:758,iab:880,iab:1104,iab:1212,iab:1164,iab:783,iab:384,iab:1224,iab:787,iab:973,iab:801,iab:803,iab:919,iab:820,iab:1213,iab:1041,iab:1083,iab:844,iab:1084,iab:1214,iab:1227,iab:143,iab:819,iab:1148,iab:857,iab:1087,iab:1207,iab:1221,iab:1229,iab:1094,iab:1219,iab:1222,iab:884,iab:885,iab:1103,iab:1107,iab:896,iab:1110,iab:1119,iab:1124,iab:319,iab:1129,iab:1226,iab:1231,iab:1029,iab:1130,iab:1236,iab:825,iab:1136,iab:1138,iab:47,iab:6,iab:14,iab:15,iab:16,iab:20,iab:27,iab:36,iab:37,iab:61,iab:71,iab:75,iab:129,iab:243,iab:246,iab:1232,iab:82,iab:92,iab:94,iab:95,iab:100,iab:101,iab:104,iab:110,iab:111,iab:617,iab:136,iab:138,iab:140,iab:148,iab:154,iab:155,iab:159,iab:195,iab:174,iab:202,iab:206,iab:216,iab:217,iab:228,iab:237,iab:238,iab:242,iab:249,iab:251,iab:254,iab:259,iab:264,iab:279,iab:1235,iab:131,iab:312,iab:1218,iab:568,iab:471,iab:553,iab:736,iab:282,iab:284,iab:807,iab:1244,iab:779,iab:1085,iab:293,iab:1241,iab:502,iab:740,iab:1167,iab:452,iab:436,iab:870,iab:993,iab:495,iab:512,iab:771,iab:531,iab:559,iab:570,iab:596,iab:621,iab:657,iab:628,iab:653,iab:662,iab:666,iab:708,iab:120,iab:273,iab:786,iab:814,iab:827,iab:874,iab:1072,iab:732,iab:1037,iab:746,iab:767,iab:1199,iab:549,iab:798,iab:1248,iab:1249,iab:556,iab:1048,iab:1122,iab:816,iab:845,iab:872,iab:1105,iab:418,iab:684,iab:687,iab:699,iab:822,iab:860,iab:876,iab:1198,iab:907,iab:1247,iab:630,iab:961,iab:1252,iab:297,iab:1019,iab:1,iab:2,iab:12,iab:23,iab:24,iab:28,iab:29,iab:39,iab:70,iab:119,iab:161,iab:40,iab:46,iab:52,iab:53,iab:55,iab:58,iab:66,iab:60,iab:84,iab:345,iab:354,iab:639,iab:673,iab:1015,iab:62,iab:77,iab:83,iab:252,iab:374,iab:597,iab:644,iab:1014,iab:69,iab:78,iab:97,iab:164,iab:210,iab:318,iab:350,iab:371,iab:81,iab:126,iab:253,iab:331,iab:1021,iab:1243,iab:1254,iab:671,iab:93,iab:280,iab:496,iab:507,iab:703,iab:1024,iab:1071,iab:130,iab:134,iab:337,iab:375,iab:702,iab:1030,iab:1031,iab:215,iab:263,iab:276,iab:302,iab:380,iab:475,iab:519,iab:602,iab:184,iab:524,iab:1045,iab:196,iab:213,iab:290,iab:328,iab:493,iab:580,iab:1151,iab:1163,iab:278,iab:410,iab:511,iab:539,iab:550,iab:659,iab:674,iab:1154,iab:301,iab:321,iab:325,iab:333,iab:336,iab:351,iab:358,iab:606,iab:1176,iab:1153,iab:227,iab:377,iab:448,iab:501,iab:655,iab:828,iab:378,iab:388,iab:450,iab:677,iab:381,iab:676,iab:72,iab:382,iab:412,iab:416,iab:430,iab:612,iab:423,iab:461,iab:610,iab:646,iab:903,iab:440,iab:479,iab:534,iab:581,iab:498,iab:546,iab:569,iab:584,iab:598,iab:601,iab:656,iab:959,iab:686,iab:713,iab:715,iab:718,iab:724,iab:726,iab:730,iab:738,iab:744,iab:749,iab:750,iab:754,iab:972,iab:768,iab:770,iab:937,iab:1039,iab:1055,iab:1061,iab:1101,iab:1206,iab:773,iab:790,iab:565,iab:867,iab:795,iab:806,iab:808,iab:812,iab:815,iab:854,iab:931,iab:833,iab:848,iab:855,iab:856,iab:864,iab:865,iab:902,iab:918,iab:951,iab:990,iab:871,iab:878,iab:881,iab:893,iab:894,iab:927,iab:938,iab:941,iab:943,iab:944,iab:946,iab:954,iab:690,iab:957,iab:1196,iab:858,iab:962,iab:964,iab:965,iab:998,iab:1004,iab:156,iab:967,iab:975,iab:968,iab:994,iab:1001,iab:1149,iab:1183,iab:272,iab:1003,iab:435,iab:573,iab:1005,iab:1009,iab:1017,iab:1043,iab:1050,iab:239,iab:1057,iab:1097,iab:1076,iab:1080,iab:1100,iab:1174,iab:1175,iab:1238,iab:1251,iab:1098,iab:1133,iab:1168,iab:1170,iab:1181,iab:1189,iab:1216,iab:469,iab:925,iab:402,iab:719,iab:1255,iab:729,iab:883,iab:1139,iab:1258,iab:1253,iab:1257,iab:1260,iab:1262,iab:591,iab:1263,iab:734,iab:910,iab:1259,iab:1261,iab:281,iab:459,iab:517,iab:1068,iab:1155,iab:1246,iab:153,iab:800,iab:1047,iab:1075,iab:1078,iab:1185,iab:32,iab:1027,iab:25,iab:347,iab:613,iab:796,iab:1230,iab:124,iab:160,iab:745,iab:1002,iab:248,iab:1240,iab:1036,iab:1177,iab:1237,iab:285,iab:373,iab:466,iab:652,iab:468,iab:685,iab:963,iab:1112,iab:1228,iab:34,iab:255,iab:311,iab:343,iab:516,iab:625,iab:793,iab:915,iab:987,iab:244,iab:26,iab:275,iab:413,iab:527,iab:922,iab:952,iab:91,iab:168,iab:226,iab:4,iab:114,iab:115,iab:128,iab:133,iab:142,iab:150,iab:304,iab:509,iab:647,iab:955,iab:982,iab:1111,iab:1127,iab:1204,iab:1144,iab:1205,iab:681,iab:109,iab:11,iab:1162,iab:10,iab:1113,iab:1242,iab:536,didomi:google,didomi:twitter,didomi:salesforce,c:createjs,c:googleana-4TXnJigR,c:kochavain-NATC8Z2a,c:pixfuture-xtm7EYtz,c:convertoa-jmt3QnV3,c:playwirel-YzrU4dNb,c:eldiario-9cAaLjgK,c:spotxinc-wiCEfLyn,c:mobilefus-yUnxxYtG,c:friiaps-cwm3r4hZ,c:numbereig-8W6PkPKQ,c:viewdeos2-ExmxgcAQ,c:terminuss-akhHkkff,c:alwayscom-2dwZViP8,c:liftoffmo-fUxtGfaH,c:onesignal-UQRnHJaT,",
      didomiVendorsConsentUnknown: "",
      didomiVendorsConsentDenied: "iab:1142,iab:762,iab:528,iab:995,iab:1223,iab:748,iab:1208,iab:424,iab:898,iab:1225,iab:80,iab:1245,iab:853,iab:765,iab:63,iab:308,iab:454,iab:173,iab:572,iab:295,iab:431,iab:911,iab:900,iab:1169,iab:1195,iab:706,iab:742,iab:203,",
      didomiPurposesConsent: "cookis-NKmViwXX,cookies,market_research,improve_products,select_basic_ads,create_ads_profile,select_personalized_ads,measure_ad_performance,geolocation_data,create_content_profile,select_personalized_content,measure_content_performance,device_characteristics,use_limited_data_to_select_content,",
      didomiPurposesConsentUnknown: "",
      didomiPurposesConsentDenied: "",
      didomiVendorsRawConsent: "iab:1141,iab:490,iab:737,iab:733,iab:725,iab:930,iab:298,iab:849,iab:571,iab:561,iab:329,iab:648,iab:682,iab:587,iab:721,iab:497,iab:626,iab:151,iab:769,iab:541,iab:712,iab:620,iab:869,iab:877,iab:665,iab:888,iab:1028,iab:707,iab:193,iab:157,iab:663,iab:879,iab:791,iab:316,iab:716,iab:891,iab:775,iab:776,iab:778,iab:780,iab:781,iab:784,iab:508,iab:59,iab:811,iab:788,iab:821,iab:939,iab:936,iab:835,iab:838,iab:851,iab:323,iab:834,iab:137,iab:326,iab:850,iab:209,iab:985,iab:438,iab:1006,iab:986,iab:956,iab:211,iab:317,iab:149,iab:422,iab:163,iab:241,iab:178,iab:212,iab:270,iab:727,iab:361,iab:45,iab:473,iab:90,iab:427,iab:751,iab:1022,iab:1025,iab:1032,iab:1146,iab:98,iab:185,iab:976,iab:966,iab:1038,iab:1040,iab:1044,iab:1046,iab:486,iab:488,iab:87,iab:294,iab:31,iab:1116,iab:1165,iab:1059,iab:1060,iab:1063,iab:1067,iab:1070,iab:1079,iab:797,iab:1172,iab:232,iab:1081,iab:1121,iab:1090,iab:1182,iab:997,iab:1106,iab:799,iab:1126,iab:1132,iab:618,iab:810,iab:1134,iab:1135,iab:199,iab:861,iab:1137,iab:1156,iab:1020,iab:862,iab:1157,iab:1173,iab:1178,iab:127,iab:50,iab:33,iab:73,iab:85,iab:920,iab:1184,iab:1188,iab:999,iab:132,iab:139,iab:444,iab:1201,iab:1203,iab:717,iab:1193,iab:996,iab:205,iab:231,iab:728,iab:9,iab:235,iab:1210,iab:1211,iab:256,iab:274,iab:1016,iab:958,iab:1202,iab:1049,iab:658,iab:1217,iab:491,iab:831,iab:262,iab:108,iab:13,iab:394,iab:409,iab:1058,iab:759,iab:1051,iab:76,iab:315,iab:1220,iab:30,iab:57,iab:554,iab:631,iab:766,iab:1062,iab:21,iab:44,iab:192,iab:224,iab:397,iab:709,iab:804,iab:1026,iab:1159,iab:1069,iab:1209,iab:758,iab:880,iab:1104,iab:1212,iab:1164,iab:783,iab:384,iab:1224,iab:787,iab:973,iab:801,iab:803,iab:919,iab:820,iab:1213,iab:1041,iab:1083,iab:844,iab:1084,iab:1214,iab:1227,iab:143,iab:819,iab:1148,iab:857,iab:1087,iab:1207,iab:1221,iab:1229,iab:1094,iab:1219,iab:1222,iab:884,iab:885,iab:1103,iab:1107,iab:896,iab:1110,iab:1119,iab:1124,iab:319,iab:1129,iab:1226,iab:1231,iab:1029,iab:1130,iab:1236,iab:825,iab:1136,iab:1138,iab:47,iab:6,iab:14,iab:15,iab:16,iab:20,iab:27,iab:36,iab:37,iab:61,iab:71,iab:75,iab:129,iab:243,iab:246,iab:1232,iab:82,iab:92,iab:94,iab:95,iab:100,iab:101,iab:104,iab:110,iab:111,iab:617,iab:136,iab:138,iab:140,iab:148,iab:154,iab:155,iab:159,iab:195,iab:174,iab:202,iab:206,iab:216,iab:217,iab:228,iab:237,iab:238,iab:242,iab:249,iab:251,iab:254,iab:259,iab:264,iab:279,iab:1235,iab:131,iab:312,iab:1218,iab:568,iab:471,iab:553,iab:736,iab:282,iab:284,iab:807,iab:1244,iab:779,iab:1085,iab:293,iab:1241,iab:502,iab:740,iab:1167,iab:452,iab:436,iab:870,iab:993,iab:495,iab:512,iab:771,iab:531,iab:559,iab:570,iab:596,iab:621,iab:657,iab:628,iab:653,iab:662,iab:666,iab:708,iab:120,iab:273,iab:786,iab:814,iab:827,iab:874,iab:1072,iab:732,iab:1037,iab:746,iab:767,iab:1199,iab:549,iab:798,iab:1248,iab:1249,iab:556,iab:1048,iab:1122,iab:816,iab:845,iab:872,iab:1105,iab:418,iab:684,iab:687,iab:699,iab:822,iab:860,iab:876,iab:1198,iab:907,iab:1247,iab:630,iab:961,iab:1252,iab:297,iab:1019,iab:1,iab:2,iab:12,iab:23,iab:24,iab:28,iab:29,iab:39,iab:70,iab:119,iab:161,iab:40,iab:46,iab:52,iab:53,iab:55,iab:58,iab:66,iab:60,iab:84,iab:345,iab:354,iab:639,iab:673,iab:1015,iab:62,iab:77,iab:83,iab:252,iab:374,iab:597,iab:644,iab:1014,iab:69,iab:78,iab:97,iab:164,iab:210,iab:318,iab:350,iab:371,iab:81,iab:126,iab:253,iab:331,iab:1021,iab:1243,iab:1254,iab:671,iab:93,iab:280,iab:496,iab:507,iab:703,iab:1024,iab:1071,iab:130,iab:134,iab:337,iab:375,iab:702,iab:1030,iab:1031,iab:215,iab:263,iab:276,iab:302,iab:380,iab:475,iab:519,iab:602,iab:184,iab:524,iab:1045,iab:196,iab:213,iab:290,iab:328,iab:493,iab:580,iab:1151,iab:1163,iab:278,iab:410,iab:511,iab:539,iab:550,iab:659,iab:674,iab:1154,iab:301,iab:321,iab:325,iab:333,iab:336,iab:351,iab:358,iab:606,iab:1176,iab:1153,iab:227,iab:377,iab:448,iab:501,iab:655,iab:828,iab:378,iab:388,iab:450,iab:677,iab:381,iab:676,iab:72,iab:382,iab:412,iab:416,iab:430,iab:612,iab:423,iab:461,iab:610,iab:646,iab:903,iab:440,iab:479,iab:534,iab:581,iab:498,iab:546,iab:569,iab:584,iab:598,iab:601,iab:656,iab:959,iab:686,iab:713,iab:715,iab:718,iab:724,iab:726,iab:730,iab:738,iab:744,iab:749,iab:750,iab:754,iab:972,iab:768,iab:770,iab:937,iab:1039,iab:1055,iab:1061,iab:1101,iab:1206,iab:773,iab:790,iab:565,iab:867,iab:795,iab:806,iab:808,iab:812,iab:815,iab:854,iab:931,iab:833,iab:848,iab:855,iab:856,iab:864,iab:865,iab:902,iab:918,iab:951,iab:990,iab:871,iab:878,iab:881,iab:893,iab:894,iab:927,iab:938,iab:941,iab:943,iab:944,iab:946,iab:954,iab:690,iab:957,iab:1196,iab:858,iab:962,iab:964,iab:965,iab:998,iab:1004,iab:156,iab:967,iab:975,iab:968,iab:994,iab:1001,iab:1149,iab:1183,iab:272,iab:1003,iab:435,iab:573,iab:1005,iab:1009,iab:1017,iab:1043,iab:1050,iab:239,iab:1057,iab:1097,iab:1076,iab:1080,iab:1100,iab:1174,iab:1175,iab:1238,iab:1251,iab:1098,iab:1133,iab:1168,iab:1170,iab:1181,iab:1189,iab:1216,iab:469,iab:925,iab:402,iab:719,iab:1255,iab:729,iab:883,iab:1139,iab:1258,iab:1253,iab:1257,iab:1260,iab:1262,iab:591,iab:1263,iab:734,iab:910,iab:1259,iab:1261,iab:281,iab:459,iab:517,iab:1068,iab:1155,iab:1246,iab:153,iab:800,iab:1047,iab:1075,iab:1078,iab:1185,iab:32,iab:1027,iab:25,iab:347,iab:613,iab:796,iab:1230,iab:124,iab:160,iab:745,iab:1002,iab:248,iab:1240,iab:1036,iab:1177,iab:1237,iab:285,iab:373,iab:466,iab:652,iab:468,iab:685,iab:963,iab:1112,iab:1228,iab:34,iab:255,iab:311,iab:343,iab:516,iab:625,iab:793,iab:915,iab:987,iab:244,iab:26,iab:275,iab:413,iab:527,iab:922,iab:952,iab:91,iab:168,iab:226,iab:4,iab:114,iab:115,iab:128,iab:133,iab:142,iab:150,iab:304,iab:509,iab:647,iab:955,iab:982,iab:1111,iab:1127,iab:1204,iab:1144,iab:1205,iab:681,iab:109,iab:11,iab:1162,iab:10,iab:1113,iab:1242,iab:536,didomi:google,didomi:twitter,didomi:salesforce,c:createjs,c:googleana-4TXnJigR,c:kochavain-NATC8Z2a,c:pixfuture-xtm7EYtz,c:convertoa-jmt3QnV3,c:playwirel-YzrU4dNb,c:eldiario-9cAaLjgK,c:spotxinc-wiCEfLyn,c:mobilefus-yUnxxYtG,c:friiaps-cwm3r4hZ,c:numbereig-8W6PkPKQ,c:viewdeos2-ExmxgcAQ,c:terminuss-akhHkkff,c:alwayscom-2dwZViP8,c:liftoffmo-fUxtGfaH,c:onesignal-UQRnHJaT,",
      didomiVendorsRawConsentUnknown: "",
      didomiVendorsRawConsentDenied: "iab:1142,iab:762,iab:528,iab:995,iab:1223,iab:748,iab:1208,iab:424,iab:898,iab:1225,iab:80,iab:1245,iab:853,iab:765,iab:63,iab:308,iab:454,iab:173,iab:572,iab:295,iab:431,iab:911,iab:900,iab:1169,iab:1195,iab:706,iab:742,iab:203,",
      didomiExperimentId: "",
      didomiExperimentUserGroup: "",
      didomiVendorsEnabled: "agatesyst-8ENWMDNq,playground-xXB4MAYd,monetengi-GxKVb6xY,anzuvirtu-UzHtA9T9,pubfinity-X6Nr7LKb,iqmcorpor-bY4GwcRZ,cuebiq-RJ7iUKyt,epomltd-iP3aG8ZZ,viewpay-AtfJxdgy,audigent-ne4752ck,browsimob-KB8G6Lq3,truedata-24gbMxfk,radionet-gr8mDkiZ,localsenso-FE4BTXUC,beaconspar-7gSyZf75,littlebig-nMxKRiA8,hivestack-az8cwDVq,moottechn-YYhdWHR6,mediametri-Npn8xCFG,deepinten-Zg9cU72n,inspiredm-Ze5FxZGh,blue-ZxYBSLLU,bravepeop-yQq6M2JE,experianl-TGByTkxd,digitalea-MQ4ikQxn,gadsme-RLdwrUT9,bricks-FAPz2UmT,dentsuaeg-ynV2cdV8,mediasmart-XVLQs4H3,seedtagad-sejq39wT,mobsuccess-Usz3g4t3,vidstartl-kxVCMEVU,mediasqua-3DJjEzgf,makazi-group,onaudience,aninprocr-xKx4M2Up,selectmed-cGQ8eHee,marsmedia-qYAdbAcR,discovert-eTTAEtAE,aniviewlt-FyNtWUpf,feedadgm-wNHHh4BJ,nuboltd-PLmEdZqd,lucidhold-cUp67pK8,sift-science,iprom-LZ469fmG,adallianc-fm6YUJwN,vitradogm-4bNeMNAJ,metrixlab-z2fqhgCQ,digitalsq-2yUP9KTt,qualityme-XaeU8NWN,jetpackdi-hwTWYxKQ,strosslei-ttYzMyhk,perform-group,adrenalead-GVacC2tR,mbrtarget-N6ThVYZ6,adtiming-L7pVCrYy,publisher-hnyDWaPx,delta-projects,tvsquared-HLWckFU4,ooyala-player,onesoonli-8EQbWty9,bytedance-L6aRMKU2,airnowvi-aMgHgkgE,adtheorent,mainadv,ad-man,brandmetr-47Dew64H,bombora,onetaglt-rqbjfJ6c,affectv,usemax,marfeelso-bdWezBRy,pinpollgm-e2t3Vxt2,permutive-9wAsbgwh,smart-adserver,sub2,e-planning,proxiclou-irmQtHsr,kiosked,adview-Rx3QQMkh,realytics-6QqjEU6P,projectag-fW3YqFn3,claritasl-r9i9xXp6,groupm-server,bidtellect,pelmorexm-rDXbDe6a,socotogmb-gYDPJiJ2,aainterne-RYY8UwJG,unicredit-XHBMfFK4,tmtdigita-BZrRQjhz,longtaila-hGpFpUtr,madington-y6cDdpQ7,opinarygm-mLTHkwL4,geniusspo-a8NRwM7h,jivox,oguryltd-PtmTkY7H,idwardlt-yj8U4Kje,kueezente-YmA8G4Cy,queryclic-3CJTwtmb,nextmille-N6CLfTdd,docereeuk-ddjYxX6N,arpeelylt-rU7MLFyb,playhilll-tAK2rJhc,prequelin-JjK3qjtM,artefactd-QZe62arA,sitewitco-BUyrrXGJ,rockerbox-8tbq4xMC,cwireag-UCBpAHtt,remailme-BrA9Mc8e,scoremedi-V6D72n4A,anteriadl-yLUBAKc8,exoclicks-mCqaGrLc,betterads-JZwZwgkW,adponesl-XYQLRcwZ,microsoft-6zPzfpLt,luponmedi-fKa6qDHE,beintoosp-K86ULgTM,aHYM8Wxh,bidmatici-wVA2PHYF,operasoft-4DpJ3JEg,adux-TYBqxAE2,triple13l-T9TG2HUG,verasityl-z6UjrUMy,ividence-PERFnU9f,baiduusa-NT8Ea4Z3,truvid-U9G7aDN8,refinedir-hcZwfDBn,arcanorbi-A7HTH9yp,firstid-gTwRBEyP,piximedia,adform,sharethis,simplifi,crimtan,bertelsman-nnGPTkH7,schwarzme-2TRfyX8h,loopnowt-ghGeGE3D,adstourss-EyVGkLRK,teads,permodogm-AFVschxD,excotech-8JR6EwGA,hyscorei-UmNqgKGE,aderizein-bjPpTpBy,audiencen-LC7zsDFe,arcspant-fJ8UnctT,cmimarket-eNd3bjWN,adssetsab-khQTsqhX,acuity-ads,appierpte-Wbf347zX,admaximl-fEhHTgU8,bucksense-V9rLfmWN,renodomed-h6GtPxqQ,momentoin-WEyYPcx3,wunderkind-TUrZcDYR,goldenbee-gHAEjkAA,funkedigi-BNECd9my,clipr-tPFagbMA,edge226lt-9CgHVke7,onprospec-mjt3Qx6i,bliinksas-CJpm2mjT,channel99-6wCWFw8V,shinystat,unitedint-cHEECGEW,fyber,richaudie-G8TFs3q4,sovrninc-TpWeFHHF,audiencep-Fg7xeAxV,arrivalist-gjEaUHf7,artchaos-xBCz2RRw,revjet-CCri2RWP,samoukale-e3QB2DEK,pubmatic-QB9P22RM,celtrainc-6VUETbNj,raynbv-akWigz7c,bidtheatre,adara,rmsiradi-2Y3J4Hnk,relay42,adcellfir-x6FqTxNN,evorraltd-XectxUgy,theuktra-mp7Fft2G,the-adex,remergegm-nfiyRFtG,adrulemob-bPh7XmBx,demandbase,ncaudienc-niwB4i2g,linkedin-ZtrLMW7M,freshclip-qyUPUZMR,livedata-FzNFTaMr,bcoverysa-UgGipjxA,memobplus-XGRYrdfY,gfknethe-BLztFnJJ,quantyoog-Reg6BKL3,covaticlt-U6MHPCTM,adsintera-cmwGwcGJ,congstarg-8XUUbG6a,audienzza-KF8Q4YHe,pixalatei-tjbD3p9G,exceedsol-VAALp3rB,resolution-UCVqgewY,cluepllc-J6dmz7ix,bannernow-d3cFzVT2,clicktech-fBUgkYXK,livewrappe-9gwjrpVp,kameleoon-rwK3V269,esomeadve-6WP2xqmf,sqreemtec-nwpYZnRa,seventech-k76Rr4eh,spicymobi-x326rt7e,exads-VVxbmizt,kaminoret-kc9CeJKL,performme-66UE4kPE,connatixn-LSz4UrPV,retailads-NKJ9pkcW,orangecli-dByHaTrw,somquerys-6qP69349,castoolad-EfF2pwRj,feeltapmed-e6PetJCR,flyadsou-BMhQh77w,decentrali-q6AnArZL,admax-LMMx9VbC,videobotl-VZjRzhMV,clickagyl-pxYinngi,listonics-e8TkeY3B,dianomilt-aNpFx32X,schoberin-8BrCthAD,frvrlimit-p9dWpCiC,ipsosmori-TCJ9gJ9A,koenigst-REPK8QcW,novatiqli-9U9G94Km,tf1publi-Kf6Mexqy,clipcentri-zNmCUnG5,brandhouse-mX4jYkyJ,digitalbr-iBpcgdG8,groupecan-hd4pr2Fm,dentsuas-hDmVPgXa,wmwebme-cRmB4DG9,sppsoluti-yy9EzZat,edgenpds-GWkLLHkr,infolinks-djQjtxLG,viafourai-mhQic3y4,adman,ad-spirit,adkernel,adikteeve-GHftacwL,rtb-house,ntechnolo-8sxpkfmV,adventori,rhythmone,neuralone-GXVRXhkQ,gumgum,dataxu,m32media-W6S8fLxy,iponwebgm-pAx6T2eU,cloudtech-N4tJjykU,smartology-YJqqtG4R,greenbids-iY4rULMK,smaato,1plusxag-bji4k6we,blis,lotame,fiftytech-63s35YVG,miq-pCajyPy2,sonobi,hottraffic-JGqLgcHT,showheroe-Zmcebrdd,onfocus,stroeerss-bCeN57BS,connectad-mkt9BWNw,platform161,live-intent,yocag-W235sxMP,antvoice,underdog-media,advanceds-LQKTBXGz,amillion-isCkb2eW,telariain-M5dcL58g,hybridadt-hhhdLiqn,mindlytix-psAjCwcF,ipromote,mccanndi-ZZsZw5TG,vgictvin-arQ9iYXz,stackadapt,twiago,spolecznos-22a84wZ8,yieldlove-AwsdxXVm,liquidmt-YWaU2sQ2,adyoulike,adobeadve-8fBLRRcc,mirandogm-KkCQGjWy,r2b2as-x2mb823p,id5techn-dUSyz2MJ,exactag,aidemtech-MVeUHm4w,jointags-Es5WgNEz,flexoffer-j28yBTyz,adhese,bidmachin-bhN4ybaE,welectgmb-n4yG39A7,weborama,molocoinc-8x2Hi3HY,datawave-yGwFCaEW,adtargetm-npnZJNgL,njuiceab-UNzqR4iz,springserve,siasetupa-kmLHZpAF,nexd-xiMSXTxh,6sensein-Ka8K2CNE,relizltd-qgiTJTkA,innovid,invibesgr-2YGtY8ZY,webgainsg-fYaHwPJ2,quarterme-MdJggLHG,arcspirel-6SpJ8UFA,pubnative-ZZt4Ahsh,bamintera-L2GeC6rH,smartclip-Bxaqr3eX,ottogmbh-fkGw5TH8,czechpubl-4ka5BJ5j,insurads-LMh36jLm,seznamcz-Yhdy8qAa,gponegmb-eGf2FKM5,tappx-jjy49eFA,smartanal-CFagQREX,soundcast-SsbDGYiL,beop,dugoutlim-8EgaZDY5,eyeota,bannerflow-F959R74P,targetvid-rcQMTWyq,uabaktyvu-iM6zPTna,adtribagm-BAExgWym,precisosr-paJBJPwK,adrinomob-4daqCAU4,performax-mQBCBCn9,pressboard-8jABaMPm,adxperienc-G3czQBeM,clinchlab-8dXidKBZ,adsyield-fDp8Jhhb,bandsintow-jjnakmPh,adverticum-hXFXG2xD,empowerad-KyVdgg9Z,portumaso-BbrUGFfi,adhood,questpass-HL9RX6bw,arbeitsgem-Qr6KhPZa,nobidinc-9eVcqR4U,geoedge-AfTaFZRQ,ivomedia-dG3EikZX,bluemedia-j6PLPVfU,proxistore,bluebilly-sm7f9KyF,missena-zEDXJ6cD,hypertvi-ZWibTF6K,advertyab-ZwTXBxBF,publicall-JUVA3mgn,3qnexxg-TkXiyCca,gamelofts-TzRiCARd,awinag-9qDjdTpm,hiilisl-jaiQJNe7,contactim-KXJwUzk6,pmlinnova-xFA8qdAt,accurat-KttxrQtC,polar-mobile,adelaidem-P7M7faXq,exponentia-tT9zj8XW,captify,beeswax,amobeeinc-KEC9PAKY,conversant,triplelift,etarget,adition,yieldlab,s4m-w9EVbi8T,smadexsl-Hdezsr6L,activeage-RGVzC2wr,skimlinks,rubicon,sirdata,madisonlo-MLAGU6j2,33across,adsquareg-m7JVTiQR,rakutenma-GjVEpzMV,semasio,thekantar-rhSJxMrZ,apesterlt-pY4E9y2t,smilewant-q9BbwiXA,turktelek-tc3wCLEL,samsungad-haztPyJf,just-premium,comscore,visarityt-YdkZ8T5q,jadudagmb-EnGf2AwA,bmindasa-74m8pbdL,betterban-pUe3nhMy,gamoshilt-9birBSAb,octaivelt-bNK4T2yb,openx,flashtalking,liveramp,outbrain,zemanta,accorpsp-JhzDDtF4,freestrea-4DbpGgsr,seedingal-ZxSFFUHd,pulsepoin-Ay7w3XLR,doubleverify,improve-digital,ad6media,ringierax-6jkq6CnT,elabzsrl-g3QwjpDN,amagicorp-4kGfQeWJ,mediaforce-jpYsMdW7,adloox,spotimlt-DeCpJUjA,wordpress-stats,adswizz,mindtake-W2EhmJ7B,thelinea-AK2anHGm,adventure-NwQcNiiK,adroll,smartstreamtv,shemedia-KVHZJrxf,revxinc-GxVJB24K,kwanko-C6ZEDyqc,skoiy-RmEtT784,havasmedi-nCbK2Ywf,armissas-UVtmj8iw,nativo,viralizes-HK9ZKQXU,mobilepro-w4KH4epG,vidoomyme-eLZcjVgF,taptapnet-gcwrfPjt,newsrooma-RHxixtxn,adsafety,mediarithmics,theozone-7RJ98zV9,resonobv-YdFJgGUm,adelement-k3m3BMKM,emetriqgm-AaHdGF4A,readpeako-tgUMb9ec,gemius,clickscod-tRBME2y6,goldbachg-mSyRZmT5,boldwinlt-dafp3KWG,adttributi-XGn8BmR4,integrala-4GjwnVca,adtelligen-RW2e3aWR,admixer,addefend-CnmifZYh,happydemic-7fqgLmmb,researcha-TSa5LtzJ,durationm-dmbThV3m,alphonsoi-nGxCPMaj,zeotapgmb-JfnqawD3,ziff-davis,knorexpte-FcwRG7bh,inmobipt-mbdkej4w,telecoming-bhVNDfGx,sambatvu-qHzCK8Zx,marketgid,impactify-BB43ad2G,algorixt-RhDNJXEW,sonaresgm-6xPpHHGt,ortecbv-E5HCR6GE,addapptr-kz8kk7mw,targetspot-WardhRNZ,allianceg-SS3PGcqY,sportradar-7swL4SY8,txgroupa-M23EFkQG,communicat-r8NWCM8P,1000mercis,neodata,intercept-wjFCmjE4,solocalsa-qc6CtJea,businessc-hyYxSCKr,nanointer-bfgdpXE7,thereach-Y4g9cePn,cxense,tag-commander,adserving-MErB8Maw,adnamiaps-wBSUg7z9,travelaud-fCy32fJ3,b2bmedia-djati4wm,azerionho-W29QPzei,notify,placensel-RCa7TJN9,definemed-r5ZytMxR,infiniamo-YtQC4f8Q,smartyads-fyp73h62,mobilewall-z5gdiFdB,drbanner-TFW95D7H,smarttraf-rFCeQLhj,kairosfir-CGft35bZ,dynamic10-aqkAY3LY,audiocont-tRiwZf33,webadsb-Wctc7ciH,thinkclev-6wdrsZra,adwmg-QhUfTqkp,themedia-JDqPdHxM,dataseatl-isqxaitj,bidberry-hF3NSbH9,appconsen-TmCLLPzs,betweenex-FE8cbrcp,yougov-ELFtn9yi,infonline-3LTYLRgZ,adbilitym-He7yYt8B,vidazoolt-EBZBKZ4m,goodloop-6DYg9Zzt,thenewco-WYxAtDhT,distrosca-QHwXxViz,kargoglob-NGbatDQ6,globalmed-XJEKWwTK,marketperf-RiyDQ3eq,sodscree-z6wWtQUQ,sonicodee-bQkawFXj,gamesight-RL4YkbLc,onlineumfr-AJWzBBbe,piaadvert-Lr9CFt4f,cndmotion-m8mMVRrG,360ecoms-nhUd2jkU,adgearte-Y7NHiTLR,adobe-audience-manager,mintegral-ZZ7UmTw2,factorele-A67Da6ki,aarkiinc-QrEF2m69,purelocal-gntjyLkg,VWRF8yN9,blockthrou-pBTJinEi,emarketin-3BnKdCFY,traffectiv-4n2t2bTB,disqus-K7HM7Rzh,bsmartda-F3yjFX4K,adnuntius-tUKgxpZy,huaweiads-D9HZBreZ,irvdo-wgfygAYq,heimspiel-meTtpiLH,openmobi-jKWzRXNV,sportority-PWyxyrcr,spoodsgmb-AzqpJCGf,quantumca-3pw7bz3z,ingenious-QKmUApip,nativhird-KLfpzZEm,hillsides-frr7FPLf,timeonepe-39E77iCA,threedium-cBQmbcdx,silverbull-3WicwjQx,dataxtrad-ir4fZYpb,adsocy-qckpibAV,qzdVtYGK,audiencer-w39UenHH,belboongm-DZHthEth,carodasr-hq2Apccd,goplspz-S8L4sDdf,G466TFGB,mediawayss-zVVcEU46,mediavine-UfyUbWtD,tangoosrl-HMPpVKbV,solutionc-EzXFAjbU,nexx360-Hmdn3gBy,lunamedia-zUDqtqzt,vuukledmc-WEQBFxcK,basisglob-gCHdDmED,glomexgmb-jDVxZQrn,playrcart-9r7X8iiF,wemassmed-wrY26drK,leadoomar-imdVRDdz,wettercom-q4Uk22kg,adinmol-m8Ricybm,ssmas-2arGwMkj,amob-txzcQCyq,mobilitya-UPMfEZEN,singlespot-wc9xaz7Y,dailymotio-fr3nwMrk,somploltd-yQWnhMLf,vlybydigi-jCmK7ae6,giosgcom-R8cfhTk7,typeahol-B8826RHH,hurracomm-VWh8FZLc,triton-digital,stroeerdi-jHK2mmVc,einradab-AQmwLYbE,snigelweb-Z34XDaa9,citiservi-UG3VCqt8,relevantd-yxRMmkQ2,synamedia-yHbfV7M6,lightbox-CYKHL7pV,roivenues-qHcFgZxf,geniusspo-aUWD2nUF,actv8inc-BcJXxn7M,nativerys-B6c639w3,voxnestin-jTp4zMKh,zeitagenc-6XaBYmeh,bottalku-UVmFLRtB,responsive-2hJn44P7,startioi-W6wf3eGD,zetagloba-rs7gihGm,alphalyrs-ViKCPwKk,effiliation,onlineadv-qpAi3htV,bannerseo-bBCHbBWX,cavaiasa-QbZTGJC8,onlinemed-GYNbEKib,cleverpus-CKxZNRtt,ampliffyp-QWBNPM7D,yieldbird-bwx2epYc,clipcentri-WfC4VAzV,publiciso-ZbmfdHNX,wurlllc-fxqFBybn,consumable-maKhtWcN,opensignal-y2FN4Y9q,cintab-pA462qFV,insticator-bMG2A8pg,volentioj-8ehxQ7KY,encoredig-r6mRFAAp,wizaly-TPpJg2YM,upprgmbh-Pm8J8PLy,sunmedia-4Kam9Qgh,italiaonli-WKTMYB4Z,majimemam-wKGJQXn3,nbcuniver-Drqh2CRe,madvertise-9X9sxFnj,reppublika-B4nz4nH4,viznet-DicHe9Zr,dpainfoco-xKCeHNgJ,umlautcom-4VdmjBgz,prismamed-mLY2UhM3,appnexus,exitbeel-T9QPnUVd,oathemea-B7wfJHQf,ezoicinc-AhwY4k5N,adservezo-B4a2Pw9B,easymarke-RBU9eJk9,audion-apjNZdRA,teemosa-BJ6GVjtF,netsprint-3LCXgwdC,justtagsp-jXMkZGXi,extremere-ezezJfRe,converged-RmpteNsN,firearct-HA3R7TX6,viadsadve-JYURtkdz,holidab-3EbrZTUH,aryelsr-6b2aCjNM,freewheel,nielsenma-8CazJr6U,tactictmr-H3c98gJt,skaze-26dJ3xLr,neustarin-NUkg7WWM,arkeero-V6DjGVTk,cibleclic-Y8XJzTNi,hubvisor-GzYKzfN3,embracesy-tjK9YRU4,neory,onnetwork-WJeLnSNk,mobfoxus-6LabmrGk,ultimedia,pexibv-m2zdpSyz,bilendisa-ZMs2TwPj,amazonadv-U9UXjWkj,optidigit-BCyY8zKT,media16lt-zHZRTZBQ,ermes-M9L8BqWX,venatus-media,tabmosas-fXjDcHFk,eulerian,jamppltd-C7cLD2K2,amnetgmb-DdqHPAiD,prosieben-XbZdg2JB,criteo,easymedia-srFA9qiW,publicism-CHLZwFts,roqad,sublime-skinz,smartclip,bidswitch,digitalau-EJHmqXVW,medianet,inskin-media,ondevice-9P8y93em,atgadtec-6CL8pr3h,axelsprin-WQH5jGTR,konodracs-nYtpfDxd,netpointm-jFLMK9c8,152media-Aa6Z6mLC,xadspotef-72c2yerH,fraud0gmb-JtJAMye3,unicredit-grXd3YWB,adastamed-jeqDUQh8,mytraffic-UL9wCZ3t,loopmelt-Ta33ZkDy,quantcast,resetdigi-FK4q9xUe,index-exchange,offerista-JkdhKXKP,relevanta-zEUYbL6p,globalweb-xN2WFhc9,google,twitter,salesforce,createjs,googleana-4TXnJigR,kochavain-NATC8Z2a,pixfuture-xtm7EYtz,convertoa-jmt3QnV3,playwirel-YzrU4dNb,eldiario-9cAaLjgK,spotxinc-wiCEfLyn,mobilefus-yUnxxYtG,friiaps-cwm3r4hZ,numbereig-8W6PkPKQ,viewdeos2-ExmxgcAQ,terminuss-akhHkkff,alwayscom-2dwZViP8,liftoffmo-fUxtGfaH,onesignal-UQRnHJaT,",
      didomiVendorsDisabled: "xplnaisa-Dd9XZrnA,protected-aceDcdBq,kayzen-n6Y4aCY7,hashtagla-ynFA787t,appstockl-UgibYxZE,audiomobl-fYHRNVaZ,viombaoy-Kx69MELC,kuponagmb-B3ThzWGK,mobkoiltd-Gcb8Dmij,dandoonli-pBitxD6G,sharethrough,kindredso-Czr4cqKD,ensighten-jF6aXcRB,grabitint-Xmga38Lh,lumenrese-Wk8VU9bq,rockabox,ricodevel-EXpMgzRR,yieldmo,cheqaite-LNbjGER9,sojerninc-FGgQKYRp,whiteops-9Ve7Kmd5,redbranch-mHzNXRr8,advisible-FGF4zJ7N,alchemyex-rUeBpFk7,amplified-MNhMcjcH,vrtcalmar-529TiDXh,audiencera-BBp3hPyQ,revcontent,",
      didomiVendorsUnknown: "",
      didomiPurposesEnabled: "cookies,market_research,improve_products,select_basic_ads,create_ads_profile,select_personalized_ads,measure_ad_performance,geolocation_data,create_content_profile,select_personalized_content,measure_content_performance,device_characteristics,use_limited_data_to_select_content,cookis-NKmViwXX,",
      didomiPurposesDisabled: "",
      didomiPurposesUnknown: "",
      "gtm.uniqueEventId": 69
    },
    {
      event: "didomi-ready",
      didomiRegulationName: "gdpr",
      didomiGDPRApplies: 1,
      didomiIABConsent: "CQHTqYAQHTqYAAHABBENBNFsAP_gAEPgAAiQJ3tX_G__bGlr8X73aftkeY1P9_h77sQxBhfJE-4FzLvW_JwXx2ExNA36tqIKmRIAu3RBIQNlGJDURVCgaogVryDMaEiUoTNKJ6BkiFMRM2dYCF5vmwtj-QCY5vp9d1dx2B-t7dr83dzyy4VHn3a5fma0WJCdA5-tDfv9bROb-9IOd_x8v4v8_F_pE2_eT1l_tWvp7D8-cts7_XW89_ffeCdwBJhoVEAZYEhIQaBhBAgBUFYQEUCAAAAEgaICAEwYFOwMAl1hIgBACgAGCAEAAIMgAQAAAQAIRABAAUCAACAQKAAIACAQCAAgYAAQAWAgEAAIDoEKYEEAgWACRmREKYEIQCQQEtlQgkAQIK4QhFjgEQCImCgAAAAAKwABAWCwGJJASoSCBLiDaAAAgAQCCAAoQScmAAIAzZag8GTaMrAA.f_wACHwAAAAA",
      didomiVendorsConsent: "iab:1141,iab:490,iab:737,iab:733,iab:725,iab:930,iab:298,iab:849,iab:571,iab:561,iab:329,iab:648,iab:682,iab:587,iab:721,iab:497,iab:626,iab:151,iab:769,iab:541,iab:712,iab:620,iab:869,iab:877,iab:665,iab:888,iab:1028,iab:707,iab:193,iab:157,iab:663,iab:879,iab:791,iab:316,iab:716,iab:891,iab:775,iab:776,iab:778,iab:780,iab:781,iab:784,iab:508,iab:59,iab:811,iab:788,iab:821,iab:939,iab:936,iab:835,iab:838,iab:851,iab:323,iab:834,iab:137,iab:326,iab:850,iab:209,iab:985,iab:438,iab:1006,iab:986,iab:956,iab:211,iab:317,iab:149,iab:422,iab:163,iab:241,iab:178,iab:212,iab:270,iab:727,iab:361,iab:45,iab:473,iab:90,iab:427,iab:751,iab:1022,iab:1025,iab:1032,iab:1146,iab:98,iab:185,iab:976,iab:966,iab:1038,iab:1040,iab:1044,iab:1046,iab:486,iab:488,iab:87,iab:294,iab:31,iab:1116,iab:1165,iab:1059,iab:1060,iab:1063,iab:1067,iab:1070,iab:1079,iab:797,iab:1172,iab:232,iab:1081,iab:1121,iab:1090,iab:1182,iab:997,iab:1106,iab:799,iab:1126,iab:1132,iab:618,iab:810,iab:1134,iab:1135,iab:199,iab:861,iab:1137,iab:1156,iab:1020,iab:862,iab:1157,iab:1173,iab:1178,iab:127,iab:50,iab:33,iab:73,iab:85,iab:920,iab:1184,iab:1188,iab:999,iab:132,iab:139,iab:444,iab:1201,iab:1203,iab:717,iab:1193,iab:996,iab:205,iab:231,iab:728,iab:9,iab:235,iab:1210,iab:1211,iab:256,iab:274,iab:1016,iab:958,iab:1202,iab:1049,iab:658,iab:1217,iab:491,iab:831,iab:262,iab:108,iab:13,iab:394,iab:409,iab:1058,iab:759,iab:1051,iab:76,iab:315,iab:1220,iab:30,iab:57,iab:554,iab:631,iab:766,iab:1062,iab:21,iab:44,iab:192,iab:224,iab:397,iab:709,iab:804,iab:1026,iab:1159,iab:1069,iab:1209,iab:758,iab:880,iab:1104,iab:1212,iab:1164,iab:783,iab:384,iab:1224,iab:787,iab:973,iab:801,iab:803,iab:919,iab:820,iab:1213,iab:1041,iab:1083,iab:844,iab:1084,iab:1214,iab:1227,iab:143,iab:819,iab:1148,iab:857,iab:1087,iab:1207,iab:1221,iab:1229,iab:1094,iab:1219,iab:1222,iab:884,iab:885,iab:1103,iab:1107,iab:896,iab:1110,iab:1119,iab:1124,iab:319,iab:1129,iab:1226,iab:1231,iab:1029,iab:1130,iab:1236,iab:825,iab:1136,iab:1138,iab:47,iab:6,iab:14,iab:15,iab:16,iab:20,iab:27,iab:36,iab:37,iab:61,iab:71,iab:75,iab:129,iab:243,iab:246,iab:1232,iab:82,iab:92,iab:94,iab:95,iab:100,iab:101,iab:104,iab:110,iab:111,iab:617,iab:136,iab:138,iab:140,iab:148,iab:154,iab:155,iab:159,iab:195,iab:174,iab:202,iab:206,iab:216,iab:217,iab:228,iab:237,iab:238,iab:242,iab:249,iab:251,iab:254,iab:259,iab:264,iab:279,iab:1235,iab:131,iab:312,iab:1218,iab:568,iab:471,iab:553,iab:736,iab:282,iab:284,iab:807,iab:1244,iab:779,iab:1085,iab:293,iab:1241,iab:502,iab:740,iab:1167,iab:452,iab:436,iab:870,iab:993,iab:495,iab:512,iab:771,iab:531,iab:559,iab:570,iab:596,iab:621,iab:657,iab:628,iab:653,iab:662,iab:666,iab:708,iab:120,iab:273,iab:786,iab:814,iab:827,iab:874,iab:1072,iab:732,iab:1037,iab:746,iab:767,iab:1199,iab:549,iab:798,iab:1248,iab:1249,iab:556,iab:1048,iab:1122,iab:816,iab:845,iab:872,iab:1105,iab:418,iab:684,iab:687,iab:699,iab:822,iab:860,iab:876,iab:1198,iab:907,iab:1247,iab:630,iab:961,iab:1252,iab:297,iab:1019,iab:1,iab:2,iab:12,iab:23,iab:24,iab:28,iab:29,iab:39,iab:70,iab:119,iab:161,iab:40,iab:46,iab:52,iab:53,iab:55,iab:58,iab:66,iab:60,iab:84,iab:345,iab:354,iab:639,iab:673,iab:1015,iab:62,iab:77,iab:83,iab:252,iab:374,iab:597,iab:644,iab:1014,iab:69,iab:78,iab:97,iab:164,iab:210,iab:318,iab:350,iab:371,iab:81,iab:126,iab:253,iab:331,iab:1021,iab:1243,iab:1254,iab:671,iab:93,iab:280,iab:496,iab:507,iab:703,iab:1024,iab:1071,iab:130,iab:134,iab:337,iab:375,iab:702,iab:1030,iab:1031,iab:215,iab:263,iab:276,iab:302,iab:380,iab:475,iab:519,iab:602,iab:184,iab:524,iab:1045,iab:196,iab:213,iab:290,iab:328,iab:493,iab:580,iab:1151,iab:1163,iab:278,iab:410,iab:511,iab:539,iab:550,iab:659,iab:674,iab:1154,iab:301,iab:321,iab:325,iab:333,iab:336,iab:351,iab:358,iab:606,iab:1176,iab:1153,iab:227,iab:377,iab:448,iab:501,iab:655,iab:828,iab:378,iab:388,iab:450,iab:677,iab:381,iab:676,iab:72,iab:382,iab:412,iab:416,iab:430,iab:612,iab:423,iab:461,iab:610,iab:646,iab:903,iab:440,iab:479,iab:534,iab:581,iab:498,iab:546,iab:569,iab:584,iab:598,iab:601,iab:656,iab:959,iab:686,iab:713,iab:715,iab:718,iab:724,iab:726,iab:730,iab:738,iab:744,iab:749,iab:750,iab:754,iab:972,iab:768,iab:770,iab:937,iab:1039,iab:1055,iab:1061,iab:1101,iab:1206,iab:773,iab:790,iab:565,iab:867,iab:795,iab:806,iab:808,iab:812,iab:815,iab:854,iab:931,iab:833,iab:848,iab:855,iab:856,iab:864,iab:865,iab:902,iab:918,iab:951,iab:990,iab:871,iab:878,iab:881,iab:893,iab:894,iab:927,iab:938,iab:941,iab:943,iab:944,iab:946,iab:954,iab:690,iab:957,iab:1196,iab:858,iab:962,iab:964,iab:965,iab:998,iab:1004,iab:156,iab:967,iab:975,iab:968,iab:994,iab:1001,iab:1149,iab:1183,iab:272,iab:1003,iab:435,iab:573,iab:1005,iab:1009,iab:1017,iab:1043,iab:1050,iab:239,iab:1057,iab:1097,iab:1076,iab:1080,iab:1100,iab:1174,iab:1175,iab:1238,iab:1251,iab:1098,iab:1133,iab:1168,iab:1170,iab:1181,iab:1189,iab:1216,iab:469,iab:925,iab:402,iab:719,iab:1255,iab:729,iab:883,iab:1139,iab:1258,iab:1253,iab:1257,iab:1260,iab:1262,iab:591,iab:1263,iab:734,iab:910,iab:1259,iab:1261,iab:281,iab:459,iab:517,iab:1068,iab:1155,iab:1246,iab:153,iab:800,iab:1047,iab:1075,iab:1078,iab:1185,iab:32,iab:1027,iab:25,iab:347,iab:613,iab:796,iab:1230,iab:124,iab:160,iab:745,iab:1002,iab:248,iab:1240,iab:1036,iab:1177,iab:1237,iab:285,iab:373,iab:466,iab:652,iab:468,iab:685,iab:963,iab:1112,iab:1228,iab:34,iab:255,iab:311,iab:343,iab:516,iab:625,iab:793,iab:915,iab:987,iab:244,iab:26,iab:275,iab:413,iab:527,iab:922,iab:952,iab:91,iab:168,iab:226,iab:4,iab:114,iab:115,iab:128,iab:133,iab:142,iab:150,iab:304,iab:509,iab:647,iab:955,iab:982,iab:1111,iab:1127,iab:1204,iab:1144,iab:1205,iab:681,iab:109,iab:11,iab:1162,iab:10,iab:1113,iab:1242,iab:536,didomi:google,didomi:twitter,didomi:salesforce,c:createjs,c:googleana-4TXnJigR,c:kochavain-NATC8Z2a,c:pixfuture-xtm7EYtz,c:convertoa-jmt3QnV3,c:playwirel-YzrU4dNb,c:eldiario-9cAaLjgK,c:spotxinc-wiCEfLyn,c:mobilefus-yUnxxYtG,c:friiaps-cwm3r4hZ,c:numbereig-8W6PkPKQ,c:viewdeos2-ExmxgcAQ,c:terminuss-akhHkkff,c:alwayscom-2dwZViP8,c:liftoffmo-fUxtGfaH,c:onesignal-UQRnHJaT,",
      didomiVendorsConsentUnknown: "",
      didomiVendorsConsentDenied: "iab:1142,iab:762,iab:528,iab:995,iab:1223,iab:748,iab:1208,iab:424,iab:898,iab:1225,iab:80,iab:1245,iab:853,iab:765,iab:63,iab:308,iab:454,iab:173,iab:572,iab:295,iab:431,iab:911,iab:900,iab:1169,iab:1195,iab:706,iab:742,iab:203,",
      didomiPurposesConsent: "cookis-NKmViwXX,cookies,market_research,improve_products,select_basic_ads,create_ads_profile,select_personalized_ads,measure_ad_performance,geolocation_data,create_content_profile,select_personalized_content,measure_content_performance,device_characteristics,use_limited_data_to_select_content,",
      didomiPurposesConsentUnknown: "",
      didomiPurposesConsentDenied: "",
      didomiVendorsRawConsent: "iab:1141,iab:490,iab:737,iab:733,iab:725,iab:930,iab:298,iab:849,iab:571,iab:561,iab:329,iab:648,iab:682,iab:587,iab:721,iab:497,iab:626,iab:151,iab:769,iab:541,iab:712,iab:620,iab:869,iab:877,iab:665,iab:888,iab:1028,iab:707,iab:193,iab:157,iab:663,iab:879,iab:791,iab:316,iab:716,iab:891,iab:775,iab:776,iab:778,iab:780,iab:781,iab:784,iab:508,iab:59,iab:811,iab:788,iab:821,iab:939,iab:936,iab:835,iab:838,iab:851,iab:323,iab:834,iab:137,iab:326,iab:850,iab:209,iab:985,iab:438,iab:1006,iab:986,iab:956,iab:211,iab:317,iab:149,iab:422,iab:163,iab:241,iab:178,iab:212,iab:270,iab:727,iab:361,iab:45,iab:473,iab:90,iab:427,iab:751,iab:1022,iab:1025,iab:1032,iab:1146,iab:98,iab:185,iab:976,iab:966,iab:1038,iab:1040,iab:1044,iab:1046,iab:486,iab:488,iab:87,iab:294,iab:31,iab:1116,iab:1165,iab:1059,iab:1060,iab:1063,iab:1067,iab:1070,iab:1079,iab:797,iab:1172,iab:232,iab:1081,iab:1121,iab:1090,iab:1182,iab:997,iab:1106,iab:799,iab:1126,iab:1132,iab:618,iab:810,iab:1134,iab:1135,iab:199,iab:861,iab:1137,iab:1156,iab:1020,iab:862,iab:1157,iab:1173,iab:1178,iab:127,iab:50,iab:33,iab:73,iab:85,iab:920,iab:1184,iab:1188,iab:999,iab:132,iab:139,iab:444,iab:1201,iab:1203,iab:717,iab:1193,iab:996,iab:205,iab:231,iab:728,iab:9,iab:235,iab:1210,iab:1211,iab:256,iab:274,iab:1016,iab:958,iab:1202,iab:1049,iab:658,iab:1217,iab:491,iab:831,iab:262,iab:108,iab:13,iab:394,iab:409,iab:1058,iab:759,iab:1051,iab:76,iab:315,iab:1220,iab:30,iab:57,iab:554,iab:631,iab:766,iab:1062,iab:21,iab:44,iab:192,iab:224,iab:397,iab:709,iab:804,iab:1026,iab:1159,iab:1069,iab:1209,iab:758,iab:880,iab:1104,iab:1212,iab:1164,iab:783,iab:384,iab:1224,iab:787,iab:973,iab:801,iab:803,iab:919,iab:820,iab:1213,iab:1041,iab:1083,iab:844,iab:1084,iab:1214,iab:1227,iab:143,iab:819,iab:1148,iab:857,iab:1087,iab:1207,iab:1221,iab:1229,iab:1094,iab:1219,iab:1222,iab:884,iab:885,iab:1103,iab:1107,iab:896,iab:1110,iab:1119,iab:1124,iab:319,iab:1129,iab:1226,iab:1231,iab:1029,iab:1130,iab:1236,iab:825,iab:1136,iab:1138,iab:47,iab:6,iab:14,iab:15,iab:16,iab:20,iab:27,iab:36,iab:37,iab:61,iab:71,iab:75,iab:129,iab:243,iab:246,iab:1232,iab:82,iab:92,iab:94,iab:95,iab:100,iab:101,iab:104,iab:110,iab:111,iab:617,iab:136,iab:138,iab:140,iab:148,iab:154,iab:155,iab:159,iab:195,iab:174,iab:202,iab:206,iab:216,iab:217,iab:228,iab:237,iab:238,iab:242,iab:249,iab:251,iab:254,iab:259,iab:264,iab:279,iab:1235,iab:131,iab:312,iab:1218,iab:568,iab:471,iab:553,iab:736,iab:282,iab:284,iab:807,iab:1244,iab:779,iab:1085,iab:293,iab:1241,iab:502,iab:740,iab:1167,iab:452,iab:436,iab:870,iab:993,iab:495,iab:512,iab:771,iab:531,iab:559,iab:570,iab:596,iab:621,iab:657,iab:628,iab:653,iab:662,iab:666,iab:708,iab:120,iab:273,iab:786,iab:814,iab:827,iab:874,iab:1072,iab:732,iab:1037,iab:746,iab:767,iab:1199,iab:549,iab:798,iab:1248,iab:1249,iab:556,iab:1048,iab:1122,iab:816,iab:845,iab:872,iab:1105,iab:418,iab:684,iab:687,iab:699,iab:822,iab:860,iab:876,iab:1198,iab:907,iab:1247,iab:630,iab:961,iab:1252,iab:297,iab:1019,iab:1,iab:2,iab:12,iab:23,iab:24,iab:28,iab:29,iab:39,iab:70,iab:119,iab:161,iab:40,iab:46,iab:52,iab:53,iab:55,iab:58,iab:66,iab:60,iab:84,iab:345,iab:354,iab:639,iab:673,iab:1015,iab:62,iab:77,iab:83,iab:252,iab:374,iab:597,iab:644,iab:1014,iab:69,iab:78,iab:97,iab:164,iab:210,iab:318,iab:350,iab:371,iab:81,iab:126,iab:253,iab:331,iab:1021,iab:1243,iab:1254,iab:671,iab:93,iab:280,iab:496,iab:507,iab:703,iab:1024,iab:1071,iab:130,iab:134,iab:337,iab:375,iab:702,iab:1030,iab:1031,iab:215,iab:263,iab:276,iab:302,iab:380,iab:475,iab:519,iab:602,iab:184,iab:524,iab:1045,iab:196,iab:213,iab:290,iab:328,iab:493,iab:580,iab:1151,iab:1163,iab:278,iab:410,iab:511,iab:539,iab:550,iab:659,iab:674,iab:1154,iab:301,iab:321,iab:325,iab:333,iab:336,iab:351,iab:358,iab:606,iab:1176,iab:1153,iab:227,iab:377,iab:448,iab:501,iab:655,iab:828,iab:378,iab:388,iab:450,iab:677,iab:381,iab:676,iab:72,iab:382,iab:412,iab:416,iab:430,iab:612,iab:423,iab:461,iab:610,iab:646,iab:903,iab:440,iab:479,iab:534,iab:581,iab:498,iab:546,iab:569,iab:584,iab:598,iab:601,iab:656,iab:959,iab:686,iab:713,iab:715,iab:718,iab:724,iab:726,iab:730,iab:738,iab:744,iab:749,iab:750,iab:754,iab:972,iab:768,iab:770,iab:937,iab:1039,iab:1055,iab:1061,iab:1101,iab:1206,iab:773,iab:790,iab:565,iab:867,iab:795,iab:806,iab:808,iab:812,iab:815,iab:854,iab:931,iab:833,iab:848,iab:855,iab:856,iab:864,iab:865,iab:902,iab:918,iab:951,iab:990,iab:871,iab:878,iab:881,iab:893,iab:894,iab:927,iab:938,iab:941,iab:943,iab:944,iab:946,iab:954,iab:690,iab:957,iab:1196,iab:858,iab:962,iab:964,iab:965,iab:998,iab:1004,iab:156,iab:967,iab:975,iab:968,iab:994,iab:1001,iab:1149,iab:1183,iab:272,iab:1003,iab:435,iab:573,iab:1005,iab:1009,iab:1017,iab:1043,iab:1050,iab:239,iab:1057,iab:1097,iab:1076,iab:1080,iab:1100,iab:1174,iab:1175,iab:1238,iab:1251,iab:1098,iab:1133,iab:1168,iab:1170,iab:1181,iab:1189,iab:1216,iab:469,iab:925,iab:402,iab:719,iab:1255,iab:729,iab:883,iab:1139,iab:1258,iab:1253,iab:1257,iab:1260,iab:1262,iab:591,iab:1263,iab:734,iab:910,iab:1259,iab:1261,iab:281,iab:459,iab:517,iab:1068,iab:1155,iab:1246,iab:153,iab:800,iab:1047,iab:1075,iab:1078,iab:1185,iab:32,iab:1027,iab:25,iab:347,iab:613,iab:796,iab:1230,iab:124,iab:160,iab:745,iab:1002,iab:248,iab:1240,iab:1036,iab:1177,iab:1237,iab:285,iab:373,iab:466,iab:652,iab:468,iab:685,iab:963,iab:1112,iab:1228,iab:34,iab:255,iab:311,iab:343,iab:516,iab:625,iab:793,iab:915,iab:987,iab:244,iab:26,iab:275,iab:413,iab:527,iab:922,iab:952,iab:91,iab:168,iab:226,iab:4,iab:114,iab:115,iab:128,iab:133,iab:142,iab:150,iab:304,iab:509,iab:647,iab:955,iab:982,iab:1111,iab:1127,iab:1204,iab:1144,iab:1205,iab:681,iab:109,iab:11,iab:1162,iab:10,iab:1113,iab:1242,iab:536,didomi:google,didomi:twitter,didomi:salesforce,c:createjs,c:googleana-4TXnJigR,c:kochavain-NATC8Z2a,c:pixfuture-xtm7EYtz,c:convertoa-jmt3QnV3,c:playwirel-YzrU4dNb,c:eldiario-9cAaLjgK,c:spotxinc-wiCEfLyn,c:mobilefus-yUnxxYtG,c:friiaps-cwm3r4hZ,c:numbereig-8W6PkPKQ,c:viewdeos2-ExmxgcAQ,c:terminuss-akhHkkff,c:alwayscom-2dwZViP8,c:liftoffmo-fUxtGfaH,c:onesignal-UQRnHJaT,",
      didomiVendorsRawConsentUnknown: "",
      didomiVendorsRawConsentDenied: "iab:1142,iab:762,iab:528,iab:995,iab:1223,iab:748,iab:1208,iab:424,iab:898,iab:1225,iab:80,iab:1245,iab:853,iab:765,iab:63,iab:308,iab:454,iab:173,iab:572,iab:295,iab:431,iab:911,iab:900,iab:1169,iab:1195,iab:706,iab:742,iab:203,",
      didomiExperimentId: "",
      didomiExperimentUserGroup: "",
      didomiVendorsEnabled: "agatesyst-8ENWMDNq,playground-xXB4MAYd,monetengi-GxKVb6xY,anzuvirtu-UzHtA9T9,pubfinity-X6Nr7LKb,iqmcorpor-bY4GwcRZ,cuebiq-RJ7iUKyt,epomltd-iP3aG8ZZ,viewpay-AtfJxdgy,audigent-ne4752ck,browsimob-KB8G6Lq3,truedata-24gbMxfk,radionet-gr8mDkiZ,localsenso-FE4BTXUC,beaconspar-7gSyZf75,littlebig-nMxKRiA8,hivestack-az8cwDVq,moottechn-YYhdWHR6,mediametri-Npn8xCFG,deepinten-Zg9cU72n,inspiredm-Ze5FxZGh,blue-ZxYBSLLU,bravepeop-yQq6M2JE,experianl-TGByTkxd,digitalea-MQ4ikQxn,gadsme-RLdwrUT9,bricks-FAPz2UmT,dentsuaeg-ynV2cdV8,mediasmart-XVLQs4H3,seedtagad-sejq39wT,mobsuccess-Usz3g4t3,vidstartl-kxVCMEVU,mediasqua-3DJjEzgf,makazi-group,onaudience,aninprocr-xKx4M2Up,selectmed-cGQ8eHee,marsmedia-qYAdbAcR,discovert-eTTAEtAE,aniviewlt-FyNtWUpf,feedadgm-wNHHh4BJ,nuboltd-PLmEdZqd,lucidhold-cUp67pK8,sift-science,iprom-LZ469fmG,adallianc-fm6YUJwN,vitradogm-4bNeMNAJ,metrixlab-z2fqhgCQ,digitalsq-2yUP9KTt,qualityme-XaeU8NWN,jetpackdi-hwTWYxKQ,strosslei-ttYzMyhk,perform-group,adrenalead-GVacC2tR,mbrtarget-N6ThVYZ6,adtiming-L7pVCrYy,publisher-hnyDWaPx,delta-projects,tvsquared-HLWckFU4,ooyala-player,onesoonli-8EQbWty9,bytedance-L6aRMKU2,airnowvi-aMgHgkgE,adtheorent,mainadv,ad-man,brandmetr-47Dew64H,bombora,onetaglt-rqbjfJ6c,affectv,usemax,marfeelso-bdWezBRy,pinpollgm-e2t3Vxt2,permutive-9wAsbgwh,smart-adserver,sub2,e-planning,proxiclou-irmQtHsr,kiosked,adview-Rx3QQMkh,realytics-6QqjEU6P,projectag-fW3YqFn3,claritasl-r9i9xXp6,groupm-server,bidtellect,pelmorexm-rDXbDe6a,socotogmb-gYDPJiJ2,aainterne-RYY8UwJG,unicredit-XHBMfFK4,tmtdigita-BZrRQjhz,longtaila-hGpFpUtr,madington-y6cDdpQ7,opinarygm-mLTHkwL4,geniusspo-a8NRwM7h,jivox,oguryltd-PtmTkY7H,idwardlt-yj8U4Kje,kueezente-YmA8G4Cy,queryclic-3CJTwtmb,nextmille-N6CLfTdd,docereeuk-ddjYxX6N,arpeelylt-rU7MLFyb,playhilll-tAK2rJhc,prequelin-JjK3qjtM,artefactd-QZe62arA,sitewitco-BUyrrXGJ,rockerbox-8tbq4xMC,cwireag-UCBpAHtt,remailme-BrA9Mc8e,scoremedi-V6D72n4A,anteriadl-yLUBAKc8,exoclicks-mCqaGrLc,betterads-JZwZwgkW,adponesl-XYQLRcwZ,microsoft-6zPzfpLt,luponmedi-fKa6qDHE,beintoosp-K86ULgTM,aHYM8Wxh,bidmatici-wVA2PHYF,operasoft-4DpJ3JEg,adux-TYBqxAE2,triple13l-T9TG2HUG,verasityl-z6UjrUMy,ividence-PERFnU9f,baiduusa-NT8Ea4Z3,truvid-U9G7aDN8,refinedir-hcZwfDBn,arcanorbi-A7HTH9yp,firstid-gTwRBEyP,piximedia,adform,sharethis,simplifi,crimtan,bertelsman-nnGPTkH7,schwarzme-2TRfyX8h,loopnowt-ghGeGE3D,adstourss-EyVGkLRK,teads,permodogm-AFVschxD,excotech-8JR6EwGA,hyscorei-UmNqgKGE,aderizein-bjPpTpBy,audiencen-LC7zsDFe,arcspant-fJ8UnctT,cmimarket-eNd3bjWN,adssetsab-khQTsqhX,acuity-ads,appierpte-Wbf347zX,admaximl-fEhHTgU8,bucksense-V9rLfmWN,renodomed-h6GtPxqQ,momentoin-WEyYPcx3,wunderkind-TUrZcDYR,goldenbee-gHAEjkAA,funkedigi-BNECd9my,clipr-tPFagbMA,edge226lt-9CgHVke7,onprospec-mjt3Qx6i,bliinksas-CJpm2mjT,channel99-6wCWFw8V,shinystat,unitedint-cHEECGEW,fyber,richaudie-G8TFs3q4,sovrninc-TpWeFHHF,audiencep-Fg7xeAxV,arrivalist-gjEaUHf7,artchaos-xBCz2RRw,revjet-CCri2RWP,samoukale-e3QB2DEK,pubmatic-QB9P22RM,celtrainc-6VUETbNj,raynbv-akWigz7c,bidtheatre,adara,rmsiradi-2Y3J4Hnk,relay42,adcellfir-x6FqTxNN,evorraltd-XectxUgy,theuktra-mp7Fft2G,the-adex,remergegm-nfiyRFtG,adrulemob-bPh7XmBx,demandbase,ncaudienc-niwB4i2g,linkedin-ZtrLMW7M,freshclip-qyUPUZMR,livedata-FzNFTaMr,bcoverysa-UgGipjxA,memobplus-XGRYrdfY,gfknethe-BLztFnJJ,quantyoog-Reg6BKL3,covaticlt-U6MHPCTM,adsintera-cmwGwcGJ,congstarg-8XUUbG6a,audienzza-KF8Q4YHe,pixalatei-tjbD3p9G,exceedsol-VAALp3rB,resolution-UCVqgewY,cluepllc-J6dmz7ix,bannernow-d3cFzVT2,clicktech-fBUgkYXK,livewrappe-9gwjrpVp,kameleoon-rwK3V269,esomeadve-6WP2xqmf,sqreemtec-nwpYZnRa,seventech-k76Rr4eh,spicymobi-x326rt7e,exads-VVxbmizt,kaminoret-kc9CeJKL,performme-66UE4kPE,connatixn-LSz4UrPV,retailads-NKJ9pkcW,orangecli-dByHaTrw,somquerys-6qP69349,castoolad-EfF2pwRj,feeltapmed-e6PetJCR,flyadsou-BMhQh77w,decentrali-q6AnArZL,admax-LMMx9VbC,videobotl-VZjRzhMV,clickagyl-pxYinngi,listonics-e8TkeY3B,dianomilt-aNpFx32X,schoberin-8BrCthAD,frvrlimit-p9dWpCiC,ipsosmori-TCJ9gJ9A,koenigst-REPK8QcW,novatiqli-9U9G94Km,tf1publi-Kf6Mexqy,clipcentri-zNmCUnG5,brandhouse-mX4jYkyJ,digitalbr-iBpcgdG8,groupecan-hd4pr2Fm,dentsuas-hDmVPgXa,wmwebme-cRmB4DG9,sppsoluti-yy9EzZat,edgenpds-GWkLLHkr,infolinks-djQjtxLG,viafourai-mhQic3y4,adman,ad-spirit,adkernel,adikteeve-GHftacwL,rtb-house,ntechnolo-8sxpkfmV,adventori,rhythmone,neuralone-GXVRXhkQ,gumgum,dataxu,m32media-W6S8fLxy,iponwebgm-pAx6T2eU,cloudtech-N4tJjykU,smartology-YJqqtG4R,greenbids-iY4rULMK,smaato,1plusxag-bji4k6we,blis,lotame,fiftytech-63s35YVG,miq-pCajyPy2,sonobi,hottraffic-JGqLgcHT,showheroe-Zmcebrdd,onfocus,stroeerss-bCeN57BS,connectad-mkt9BWNw,platform161,live-intent,yocag-W235sxMP,antvoice,underdog-media,advanceds-LQKTBXGz,amillion-isCkb2eW,telariain-M5dcL58g,hybridadt-hhhdLiqn,mindlytix-psAjCwcF,ipromote,mccanndi-ZZsZw5TG,vgictvin-arQ9iYXz,stackadapt,twiago,spolecznos-22a84wZ8,yieldlove-AwsdxXVm,liquidmt-YWaU2sQ2,adyoulike,adobeadve-8fBLRRcc,mirandogm-KkCQGjWy,r2b2as-x2mb823p,id5techn-dUSyz2MJ,exactag,aidemtech-MVeUHm4w,jointags-Es5WgNEz,flexoffer-j28yBTyz,adhese,bidmachin-bhN4ybaE,welectgmb-n4yG39A7,weborama,molocoinc-8x2Hi3HY,datawave-yGwFCaEW,adtargetm-npnZJNgL,njuiceab-UNzqR4iz,springserve,siasetupa-kmLHZpAF,nexd-xiMSXTxh,6sensein-Ka8K2CNE,relizltd-qgiTJTkA,innovid,invibesgr-2YGtY8ZY,webgainsg-fYaHwPJ2,quarterme-MdJggLHG,arcspirel-6SpJ8UFA,pubnative-ZZt4Ahsh,bamintera-L2GeC6rH,smartclip-Bxaqr3eX,ottogmbh-fkGw5TH8,czechpubl-4ka5BJ5j,insurads-LMh36jLm,seznamcz-Yhdy8qAa,gponegmb-eGf2FKM5,tappx-jjy49eFA,smartanal-CFagQREX,soundcast-SsbDGYiL,beop,dugoutlim-8EgaZDY5,eyeota,bannerflow-F959R74P,targetvid-rcQMTWyq,uabaktyvu-iM6zPTna,adtribagm-BAExgWym,precisosr-paJBJPwK,adrinomob-4daqCAU4,performax-mQBCBCn9,pressboard-8jABaMPm,adxperienc-G3czQBeM,clinchlab-8dXidKBZ,adsyield-fDp8Jhhb,bandsintow-jjnakmPh,adverticum-hXFXG2xD,empowerad-KyVdgg9Z,portumaso-BbrUGFfi,adhood,questpass-HL9RX6bw,arbeitsgem-Qr6KhPZa,nobidinc-9eVcqR4U,geoedge-AfTaFZRQ,ivomedia-dG3EikZX,bluemedia-j6PLPVfU,proxistore,bluebilly-sm7f9KyF,missena-zEDXJ6cD,hypertvi-ZWibTF6K,advertyab-ZwTXBxBF,publicall-JUVA3mgn,3qnexxg-TkXiyCca,gamelofts-TzRiCARd,awinag-9qDjdTpm,hiilisl-jaiQJNe7,contactim-KXJwUzk6,pmlinnova-xFA8qdAt,accurat-KttxrQtC,polar-mobile,adelaidem-P7M7faXq,exponentia-tT9zj8XW,captify,beeswax,amobeeinc-KEC9PAKY,conversant,triplelift,etarget,adition,yieldlab,s4m-w9EVbi8T,smadexsl-Hdezsr6L,activeage-RGVzC2wr,skimlinks,rubicon,sirdata,madisonlo-MLAGU6j2,33across,adsquareg-m7JVTiQR,rakutenma-GjVEpzMV,semasio,thekantar-rhSJxMrZ,apesterlt-pY4E9y2t,smilewant-q9BbwiXA,turktelek-tc3wCLEL,samsungad-haztPyJf,just-premium,comscore,visarityt-YdkZ8T5q,jadudagmb-EnGf2AwA,bmindasa-74m8pbdL,betterban-pUe3nhMy,gamoshilt-9birBSAb,octaivelt-bNK4T2yb,openx,flashtalking,liveramp,outbrain,zemanta,accorpsp-JhzDDtF4,freestrea-4DbpGgsr,seedingal-ZxSFFUHd,pulsepoin-Ay7w3XLR,doubleverify,improve-digital,ad6media,ringierax-6jkq6CnT,elabzsrl-g3QwjpDN,amagicorp-4kGfQeWJ,mediaforce-jpYsMdW7,adloox,spotimlt-DeCpJUjA,wordpress-stats,adswizz,mindtake-W2EhmJ7B,thelinea-AK2anHGm,adventure-NwQcNiiK,adroll,smartstreamtv,shemedia-KVHZJrxf,revxinc-GxVJB24K,kwanko-C6ZEDyqc,skoiy-RmEtT784,havasmedi-nCbK2Ywf,armissas-UVtmj8iw,nativo,viralizes-HK9ZKQXU,mobilepro-w4KH4epG,vidoomyme-eLZcjVgF,taptapnet-gcwrfPjt,newsrooma-RHxixtxn,adsafety,mediarithmics,theozone-7RJ98zV9,resonobv-YdFJgGUm,adelement-k3m3BMKM,emetriqgm-AaHdGF4A,readpeako-tgUMb9ec,gemius,clickscod-tRBME2y6,goldbachg-mSyRZmT5,boldwinlt-dafp3KWG,adttributi-XGn8BmR4,integrala-4GjwnVca,adtelligen-RW2e3aWR,admixer,addefend-CnmifZYh,happydemic-7fqgLmmb,researcha-TSa5LtzJ,durationm-dmbThV3m,alphonsoi-nGxCPMaj,zeotapgmb-JfnqawD3,ziff-davis,knorexpte-FcwRG7bh,inmobipt-mbdkej4w,telecoming-bhVNDfGx,sambatvu-qHzCK8Zx,marketgid,impactify-BB43ad2G,algorixt-RhDNJXEW,sonaresgm-6xPpHHGt,ortecbv-E5HCR6GE,addapptr-kz8kk7mw,targetspot-WardhRNZ,allianceg-SS3PGcqY,sportradar-7swL4SY8,txgroupa-M23EFkQG,communicat-r8NWCM8P,1000mercis,neodata,intercept-wjFCmjE4,solocalsa-qc6CtJea,businessc-hyYxSCKr,nanointer-bfgdpXE7,thereach-Y4g9cePn,cxense,tag-commander,adserving-MErB8Maw,adnamiaps-wBSUg7z9,travelaud-fCy32fJ3,b2bmedia-djati4wm,azerionho-W29QPzei,notify,placensel-RCa7TJN9,definemed-r5ZytMxR,infiniamo-YtQC4f8Q,smartyads-fyp73h62,mobilewall-z5gdiFdB,drbanner-TFW95D7H,smarttraf-rFCeQLhj,kairosfir-CGft35bZ,dynamic10-aqkAY3LY,audiocont-tRiwZf33,webadsb-Wctc7ciH,thinkclev-6wdrsZra,adwmg-QhUfTqkp,themedia-JDqPdHxM,dataseatl-isqxaitj,bidberry-hF3NSbH9,appconsen-TmCLLPzs,betweenex-FE8cbrcp,yougov-ELFtn9yi,infonline-3LTYLRgZ,adbilitym-He7yYt8B,vidazoolt-EBZBKZ4m,goodloop-6DYg9Zzt,thenewco-WYxAtDhT,distrosca-QHwXxViz,kargoglob-NGbatDQ6,globalmed-XJEKWwTK,marketperf-RiyDQ3eq,sodscree-z6wWtQUQ,sonicodee-bQkawFXj,gamesight-RL4YkbLc,onlineumfr-AJWzBBbe,piaadvert-Lr9CFt4f,cndmotion-m8mMVRrG,360ecoms-nhUd2jkU,adgearte-Y7NHiTLR,adobe-audience-manager,mintegral-ZZ7UmTw2,factorele-A67Da6ki,aarkiinc-QrEF2m69,purelocal-gntjyLkg,VWRF8yN9,blockthrou-pBTJinEi,emarketin-3BnKdCFY,traffectiv-4n2t2bTB,disqus-K7HM7Rzh,bsmartda-F3yjFX4K,adnuntius-tUKgxpZy,huaweiads-D9HZBreZ,irvdo-wgfygAYq,heimspiel-meTtpiLH,openmobi-jKWzRXNV,sportority-PWyxyrcr,spoodsgmb-AzqpJCGf,quantumca-3pw7bz3z,ingenious-QKmUApip,nativhird-KLfpzZEm,hillsides-frr7FPLf,timeonepe-39E77iCA,threedium-cBQmbcdx,silverbull-3WicwjQx,dataxtrad-ir4fZYpb,adsocy-qckpibAV,qzdVtYGK,audiencer-w39UenHH,belboongm-DZHthEth,carodasr-hq2Apccd,goplspz-S8L4sDdf,G466TFGB,mediawayss-zVVcEU46,mediavine-UfyUbWtD,tangoosrl-HMPpVKbV,solutionc-EzXFAjbU,nexx360-Hmdn3gBy,lunamedia-zUDqtqzt,vuukledmc-WEQBFxcK,basisglob-gCHdDmED,glomexgmb-jDVxZQrn,playrcart-9r7X8iiF,wemassmed-wrY26drK,leadoomar-imdVRDdz,wettercom-q4Uk22kg,adinmol-m8Ricybm,ssmas-2arGwMkj,amob-txzcQCyq,mobilitya-UPMfEZEN,singlespot-wc9xaz7Y,dailymotio-fr3nwMrk,somploltd-yQWnhMLf,vlybydigi-jCmK7ae6,giosgcom-R8cfhTk7,typeahol-B8826RHH,hurracomm-VWh8FZLc,triton-digital,stroeerdi-jHK2mmVc,einradab-AQmwLYbE,snigelweb-Z34XDaa9,citiservi-UG3VCqt8,relevantd-yxRMmkQ2,synamedia-yHbfV7M6,lightbox-CYKHL7pV,roivenues-qHcFgZxf,geniusspo-aUWD2nUF,actv8inc-BcJXxn7M,nativerys-B6c639w3,voxnestin-jTp4zMKh,zeitagenc-6XaBYmeh,bottalku-UVmFLRtB,responsive-2hJn44P7,startioi-W6wf3eGD,zetagloba-rs7gihGm,alphalyrs-ViKCPwKk,effiliation,onlineadv-qpAi3htV,bannerseo-bBCHbBWX,cavaiasa-QbZTGJC8,onlinemed-GYNbEKib,cleverpus-CKxZNRtt,ampliffyp-QWBNPM7D,yieldbird-bwx2epYc,clipcentri-WfC4VAzV,publiciso-ZbmfdHNX,wurlllc-fxqFBybn,consumable-maKhtWcN,opensignal-y2FN4Y9q,cintab-pA462qFV,insticator-bMG2A8pg,volentioj-8ehxQ7KY,encoredig-r6mRFAAp,wizaly-TPpJg2YM,upprgmbh-Pm8J8PLy,sunmedia-4Kam9Qgh,italiaonli-WKTMYB4Z,majimemam-wKGJQXn3,nbcuniver-Drqh2CRe,madvertise-9X9sxFnj,reppublika-B4nz4nH4,viznet-DicHe9Zr,dpainfoco-xKCeHNgJ,umlautcom-4VdmjBgz,prismamed-mLY2UhM3,appnexus,exitbeel-T9QPnUVd,oathemea-B7wfJHQf,ezoicinc-AhwY4k5N,adservezo-B4a2Pw9B,easymarke-RBU9eJk9,audion-apjNZdRA,teemosa-BJ6GVjtF,netsprint-3LCXgwdC,justtagsp-jXMkZGXi,extremere-ezezJfRe,converged-RmpteNsN,firearct-HA3R7TX6,viadsadve-JYURtkdz,holidab-3EbrZTUH,aryelsr-6b2aCjNM,freewheel,nielsenma-8CazJr6U,tactictmr-H3c98gJt,skaze-26dJ3xLr,neustarin-NUkg7WWM,arkeero-V6DjGVTk,cibleclic-Y8XJzTNi,hubvisor-GzYKzfN3,embracesy-tjK9YRU4,neory,onnetwork-WJeLnSNk,mobfoxus-6LabmrGk,ultimedia,pexibv-m2zdpSyz,bilendisa-ZMs2TwPj,amazonadv-U9UXjWkj,optidigit-BCyY8zKT,media16lt-zHZRTZBQ,ermes-M9L8BqWX,venatus-media,tabmosas-fXjDcHFk,eulerian,jamppltd-C7cLD2K2,amnetgmb-DdqHPAiD,prosieben-XbZdg2JB,criteo,easymedia-srFA9qiW,publicism-CHLZwFts,roqad,sublime-skinz,smartclip,bidswitch,digitalau-EJHmqXVW,medianet,inskin-media,ondevice-9P8y93em,atgadtec-6CL8pr3h,axelsprin-WQH5jGTR,konodracs-nYtpfDxd,netpointm-jFLMK9c8,152media-Aa6Z6mLC,xadspotef-72c2yerH,fraud0gmb-JtJAMye3,unicredit-grXd3YWB,adastamed-jeqDUQh8,mytraffic-UL9wCZ3t,loopmelt-Ta33ZkDy,quantcast,resetdigi-FK4q9xUe,index-exchange,offerista-JkdhKXKP,relevanta-zEUYbL6p,globalweb-xN2WFhc9,google,twitter,salesforce,createjs,googleana-4TXnJigR,kochavain-NATC8Z2a,pixfuture-xtm7EYtz,convertoa-jmt3QnV3,playwirel-YzrU4dNb,eldiario-9cAaLjgK,spotxinc-wiCEfLyn,mobilefus-yUnxxYtG,friiaps-cwm3r4hZ,numbereig-8W6PkPKQ,viewdeos2-ExmxgcAQ,terminuss-akhHkkff,alwayscom-2dwZViP8,liftoffmo-fUxtGfaH,onesignal-UQRnHJaT,",
      didomiVendorsDisabled: "xplnaisa-Dd9XZrnA,protected-aceDcdBq,kayzen-n6Y4aCY7,hashtagla-ynFA787t,appstockl-UgibYxZE,audiomobl-fYHRNVaZ,viombaoy-Kx69MELC,kuponagmb-B3ThzWGK,mobkoiltd-Gcb8Dmij,dandoonli-pBitxD6G,sharethrough,kindredso-Czr4cqKD,ensighten-jF6aXcRB,grabitint-Xmga38Lh,lumenrese-Wk8VU9bq,rockabox,ricodevel-EXpMgzRR,yieldmo,cheqaite-LNbjGER9,sojerninc-FGgQKYRp,whiteops-9Ve7Kmd5,redbranch-mHzNXRr8,advisible-FGF4zJ7N,alchemyex-rUeBpFk7,amplified-MNhMcjcH,vrtcalmar-529TiDXh,audiencera-BBp3hPyQ,revcontent,",
      didomiVendorsUnknown: "",
      didomiPurposesEnabled: "cookies,market_research,improve_products,select_basic_ads,create_ads_profile,select_personalized_ads,measure_ad_performance,geolocation_data,create_content_profile,select_personalized_content,measure_content_performance,device_characteristics,use_limited_data_to_select_content,cookis-NKmViwXX,",
      didomiPurposesDisabled: "",
      didomiPurposesUnknown: "",
      "gtm.uniqueEventId": 72
    },
    {
      event: "promo-generic",
      daysToExpire: "1",
      interactionsToShow: "1",
      "gtm.uniqueEventId": 75
    },
    {
      event: "gtm.dom",
      "gtm.uniqueEventId": 78
    },
    {
      event: "nonlogged",
      "gtm.uniqueEventId": 81
    },
    {
      event: "no-blocker-event",
      "gtm.uniqueEventId": 84
    },
    {},
    {
      event: "gtm.load",
      "gtm.uniqueEventId": 95
    },
    {
      event: "gtm.click",
      "gtm.element": {},
      "gtm.elementClasses": "",
      "gtm.elementId": "",
      "gtm.elementTarget": "",
      "gtm.triggers": "12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60",
      "gtm.elementUrl": "",
      "gtm.uniqueEventId": 98
    }
  ]
}, fe = /* @__PURE__ */ new Set(), Fa = () => {
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", i = "abcdefghijklmnopqrstuvwxyz", e = "0123456789", a = "!@#$%^&*()_+[]{}|;:,.<>?", t = r + i + e + a, o = (n) => n[Math.floor(Math.random() * n.length)], s = () => {
    let n = [
      o(r),
      o(i),
      o(e),
      o(a)
    ];
    for (let c = n.length; c < 12; c++)
      n.push(o(t));
    return n = n.sort(() => Math.random() - 0.5), n.join("");
  };
  let d;
  do
    d = s();
  while (fe.has(d));
  return fe.add(d), d;
}, Ha = 'body{background-color:#585858}*{box-sizing:border-box;font-family:Encode Sans,sans-serif}md-checkbox{background-color:#fff;--md-checkbox-outline-width: 1px;--md-checkbox-outline-color: #D4D2D3;--md-checkbox-selected-container-color: #31862ee4;--md-checkbox-selected-icon-color: #D4D2D3;--md-checkbox-container-shape: 2px;--md-checkbox-focus-outline-color: #D4D2D3;--md-checkbox--hover-outline-color: #D4D2D3;--md-checkbox-selected-focus-container-color: #31862ee4;--md-checkbox-selected-focus-icon-color: #fff;--md-checkbox-selected-hover-container-color: #266b24e3;--md-checkbox-selected-hover-icon-color: ##D4D2D3;--md-checkbox-selected-icon-color: #FFF;--md-checkbox-hover-outline-color: #D4D2D3;--md-checkbox-pressed-outline-color: #D4D2D3;--md-checkbox-hover-outline-width: 1px;--md-checkbox-focus-outline-width: 1px;--md-checkbox-pressed-outline-width: 1px;--md-checkbox-hover-state-layer-opacity: 0;--md-checkbox-focus-state-layer-opacity: 0;--md-checkbox-selected-hover-state-layer-opacity: 0;--md-checkbox-selected-focus-state-layer-opacity: 0;--md-checkbox-selected-pressed-state-layer-opacity: 0;--md-checkbox-pressed-state-layer-opacity: 0;--md-checkbox-selected-pressed-container-color: #266b24e3;--md-checkbox-selected-hover-icon-color: #FFF}md-switch{--md-switch-track-color: #9b9b9b;--md-switch-track-outline-color: #9b9b9b;--md-switch-handle-color: #FFF;--md-switch-focus-handle-color: #FFF;--md-switch-hover-track-color: #9b9b9b;--md-switch-hover-handle-color: #FFF;--md-switch-hover-track-outline-color: #9b9b9b;--md-switch-pressed-track-color: #9b9b9b;--md-switch-pressed-handle-color: #FFF;--md-switch-pressed-track-outline-color: #9b9b9b;--md-switch-selected-track-color: #25a076;--md-switch-selected-handle-color: #FFF;--md-switch-selected-hover-track-color: #25a076;--md-switch-selected-hover-handle-color: #FFF;--md-switch-selected-focus-handle-color: #FFF;--md-switch-selected-focus-track-color: #25a076;--md-switch-selected-pressed-handle-color: #FFF;--md-switch-selected-pressed-track-color: #25a076;--md-switch-handle-width: 17px;--md-switch-handle-height: 17px;--md-switch-hover-handle-width: 17px;--md-switch-hover-handle-height: 17px;--md-switch-focus-handle-width: 17px;--md-switch-focus-handle-height: 17px;--md-switch-pressed-handle-width: 17px;--md-switch-pressed-handle-height: 17px;--md-switch-selected-handle-width: 17px;--md-switch-selected-handle-height: 17px;--md-switch-selected-hover-handle-width: 17px;--md-switch-selected-hover-handle-height: 17px;--md-switch-selected-focus-handle-width: 17px;--md-switch-selected-focus-handle-height: 17px;--md-switch-selected-pressed-handle-width: 17px;--md-switch-selected-pressed-handle-height: 17px;--md-switch-track-width: 40px;--md-switch-track-height: 25px;--md-switch-hover-state-layer-opacity: 0;--md-switch-pressed-state-layer-opacity: 0;--md-switch-selected-hover-state-layer-opacity: 0;--md-switch-selected-pressed-state-layer-opacity: 0}md-circular-progress{--md-circular-progress-size: 24px;--md-circular-progress-active-indicator-color: rgb(0, 0, 0)}.horizontal-shake{animation:horizontal-shaking .35s infinite}input[type=checkbox]{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;margin:0;width:18px;height:18px;border-radius:2px;border:1px solid #D4D2D3;transform:translateY(-.075em);display:grid;place-content:center;cursor:pointer}input[type=checkbox]:before{content:"";width:12px;height:12px;transform:scale(0);transition:.12s transform ease-in-out;box-shadow:inset 18px 18px #fff;transform-origin:bottom left;clip-path:polygon(14% 44%,0 65%,50% 100%,100% 16%,80% 0%,43% 62%)}input[type=checkbox]:checked:before{transform:scale(1)}input[type=checkbox]:checked{background-color:#25a076}.hidden{visibility:hidden}.right-card-logged{background-color:#f0f0f0;position:relative;display:flex;width:300px;height:300px;padding:16px;flex-direction:column;align-items:flex-end;background:#f2f0f0}.right-card-logged .img{width:100%;height:74px;border-bottom:1px solid #D2D2D2}.right-card-logged .img img{height:74px}.right-card-logged .user-bottom{width:89%;position:absolute;bottom:4%;display:flex;justify-content:space-between;align-items:center;border-radius:5px;background:#ffffff80;padding:9px 11px;font-size:11px}.right-card-logged .user-bottom.subscribed{height:78px;display:flex;flex-direction:column;justify-content:space-around}.right-card-logged .user-bottom .black-bold{color:#4a4a4a;text-align:center;font-variant-numeric:lining-nums proportional-nums;font-family:Encode Sans;font-size:11px;font-style:normal;font-weight:700;line-height:11px;text-transform:uppercase}.right-card-logged .user-bottom .blue-paragraph{color:#4a90e2;text-align:right;font-variant-numeric:lining-nums proportional-nums;font-family:Encode Sans;font-size:11px;font-style:normal;font-weight:500;line-height:11px;text-transform:uppercase;margin-right:9px;text-decoration:none}.right-card-logged .user-bottom--firstGroup{display:flex;flex-direction:column;align-items:center;margin-top:3px}.right-card-logged .check-img{height:26px;position:absolute;top:-12px}.right-card-logged .user-bottom p{margin:0}.right-card-logged .subscribedModal{font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:128px;top:100px;border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 32px;text-align:center}.right-card-logged .subscribedModal p{margin:0 0 8px}.right-card-logged .subscribedModal a{color:#4a90e2;text-decoration:none;font-weight:600}.right-card-logged .suscribete-mensaje{font-weight:700}.right-card-logged .confirmedEmailModal{background-color:red;font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:188px;top:100px;border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 0;text-align:center}.right-card-logged .thanks-message{font-weight:700;margin:0 0 10px}.right-card-logged .explore-message{margin:0 0 13px;line-height:20px}.right-card-logged .explore-message a{color:#4a90e2;text-decoration:none;font-weight:600}.right-card-logged .errorModal{font-size:15px;display:flex;flex-direction:column;align-items:center;position:absolute;height:188px;top:100px;border:1px solid #D0021B;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:22px 31px 0;text-align:center}.right-card-logged .errorModal a{color:#4a90e2;text-decoration:none;font-weight:600}.right-card-logged .errorModal .error-message{font-weight:700;margin:0 0 10px}.right-card-logged .errorModal .error-text{margin:0;line-height:20px}.right-card-logged .membersModal{font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:188px;top:100px;border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 0;text-align:center}.right-card-logged .membersModal p{margin:0 0 10px}.right-card-logged .membersModal a{width:100%}.right-card-logged .membersModal a button{font-size:14px;font-weight:600;height:48px;width:100%;border-radius:24px;border:1px solid #FFF;background:var(--principal-membersModal, #F9E700);margin-bottom:9px}.right-card-logged .membersModal-message{font-weight:700}.right-card-logged .description{position:initial;width:auto;text-align:start;color:#000;font-size:15px;font-style:normal;font-weight:400;line-height:20px;margin:9px 0 44px}.right-card-logged .description-first{display:none}.right-card-logged .aspa{height:24px;position:absolute;top:4px;right:4px;cursor:pointer}.right-card{position:relative;display:flex;width:300px;height:auto;padding:16px;flex-direction:column;align-items:flex-end;background:#f2f0f0;text-align:start}.right-card .img{width:100%;height:74px;border-bottom:1px solid #D2D2D2}.right-card .img img{height:74px}.right-card .description{position:initial;width:auto;text-align:start;color:#000;font-size:15px;font-style:normal;font-weight:400;line-height:20px;margin:9px 0 30px}.right-card .description-first{display:none}.right-card .insert{color:var(--DS-black, #0E0E20);font-variant-numeric:lining-nums proportional-nums;font-size:11px;font-style:normal;font-weight:400;line-height:normal;text-transform:uppercase;margin:0 0 8px}.right-card .input{width:100%;height:50px;flex-shrink:0;border-radius:4px;outline:1px solid #D2D2D2;background:#fff;padding-left:15px;border:none}.right-card .input:focus{outline:1px solid #5596e2}.right-card .conditions{display:flex;align-items:center;font-size:12px;width:100%;margin:17px 0}.right-card .join-button{width:100%;display:flex;height:48px;padding:15px 24px;justify-content:center;align-items:center;gap:10px;align-self:stretch;border-radius:54px;background:#f3a742;box-shadow:3px 3px 8px #00000012;border:none;font-weight:600;font-size:14px;color:#000}.right-card .down{width:100%}.right-card .check{margin-right:5px}.right-card .errorModal{font-size:15px;display:flex;flex-direction:column;align-items:center;position:absolute;height:70%;bottom:3%;border:1px solid #D0021B;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 32px;text-align:center}.right-card .errorModal a{color:#4a90e2;text-decoration:none;font-weight:600}.right-card .error-img{width:26px;height:26px;margin-top:10px;margin-bottom:15px}.right-card .sentEmail{font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:72%;bottom:3%;border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 32px;text-align:center}.right-card .revise-message{font-weight:700;margin:0 0 10px}.right-card .email-message{margin:0;line-height:20px}.right-card .open-email{width:100%;border-radius:24px;border:1px solid #4A90E2;padding:14px 0;color:#4a90e2;text-align:center;font-size:14px;font-weight:600}.right-card .img-link{height:14px;margin-left:5px}.right-card .aspa{height:24px;position:absolute;top:4px;right:4px;cursor:pointer}.right-card .thanks-message{font-weight:700;margin:0 0 10px}.right-card .explore-message{margin:0 0 13px;line-height:20px}.right-card .explore-message a{color:#4a90e2;text-decoration:none;font-weight:600}.conditions-blue{text-decoration:none;color:#4a90e2;font-size:12px;font-style:normal;font-weight:500;line-height:normal}.card-logged{background-color:#f0f0f0;position:relative;display:flex;width:300px;height:300px;padding:16px;flex-direction:column;align-items:flex-end;background:#f2f0f0}.card-logged .user-bottom{width:89%;position:absolute;bottom:4%;display:flex;justify-content:space-between;align-items:center;border-radius:5px;background:#ffffff80;padding:9px 11px;font-size:11px}.card-logged .user-bottom.subscribed{height:78px;display:flex;flex-direction:column;justify-content:space-around}.card-logged .user-bottom .black-bold{color:#4a4a4a;text-align:center;font-variant-numeric:lining-nums proportional-nums;font-family:Encode Sans;font-size:11px;font-style:normal;font-weight:700;line-height:11px;text-transform:uppercase}.card-logged .user-bottom .blue-paragraph{color:#4a90e2;text-align:right;font-variant-numeric:lining-nums proportional-nums;font-family:Encode Sans;font-size:11px;font-style:normal;font-weight:500;line-height:11px;text-transform:uppercase;margin-right:9px;text-decoration:none}.card-logged .user-bottom--firstGroup{display:flex;flex-direction:column;align-items:center;margin-top:3px}.card-logged .check-img{height:26px;position:absolute;top:-12px}.card-logged .user-bottom p{margin:0}.card-logged .switch{border-radius:30px;background-color:green;height:24px;width:34px}.card-logged .subscribedModal{font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:128px;top:100px;border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 32px;text-align:center}.card-logged .subscribedModal p{margin:0 0 8px}.card-logged .subscribedModal a{color:#4a90e2;text-decoration:none;font-weight:600}.card-logged .suscribete-mensaje{font-weight:700}.card-logged .confirmedEmailModal{font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:188px;top:100px;border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 0;text-align:center}.card-logged .errorModal{font-size:15px;display:flex;flex-direction:column;align-items:center;position:absolute;height:188px;top:100px;border:1px solid #D0021B;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:22px 31px 0;text-align:center;line-height:20px}.card-logged .errorModal a{color:#4a90e2;text-decoration:none;font-weight:600}.card-logged .errorModal .error-message{font-weight:700;margin:0 0 10px}.card-logged .errorModal .error-text{margin:0}.card-logged .membersModal{font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:188px;top:100px;border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 0;text-align:center}.card-logged .membersModal p{margin:0 0 10px}.card-logged .membersModal a{width:100%}.card-logged .membersModal a button{font-size:14px;font-weight:600;height:48px;width:100%;border-radius:24px;border:1px solid #FFF;background:var(--principal-membersModal, #F9E700);margin-bottom:9px}.card-logged .membersModal-message{font-weight:700}.card-logged .description{color:#000;font-size:15px;font-style:normal;font-weight:400;line-height:20px;margin:9px 0 44px}.card-logged .description-first{display:none}.card-logged .aspa{height:24px;position:absolute;top:4px;right:4px;cursor:pointer}.card-logged .thanks-message{font-weight:700;margin:8px 0 10px}.card-logged .explore-message{margin:0 0 13px;line-height:20px}.card-logged .explore-message a{color:#4a90e2;text-decoration:none;font-weight:600}.img{width:100%;height:74px;border-bottom:1px solid #D2D2D2;display:flex}img{height:74px}button{cursor:pointer}.card{position:relative;display:flex;width:300px;height:auto;padding:16px;flex-direction:column;align-items:flex-end;background:#f2f0f0;text-align:start}.card .description{color:#000;font-size:15px;font-style:normal;font-weight:400;line-height:20px;margin:9px 0 30px}.card .description-first{display:none}.card .description-second{display:block}.card .insert{color:var(--DS-black, #0E0E20);font-variant-numeric:lining-nums proportional-nums;font-size:11px;font-style:normal;font-weight:400;line-height:normal;text-transform:uppercase;margin:0 0 8px}.card .input{width:100%;height:50px;flex-shrink:0;border-radius:4px;outline:1px solid #D2D2D2;background:#fff;padding-left:15px;border:none}.card .input:focus{outline:1px solid #5596e2}.card .input::placeholder{color:#4a4a4a;font-size:16px;font-style:normal;font-weight:500;line-height:16px;opacity:.2}.card .conditions{display:flex;align-items:center;font-size:12px;width:100%;margin:17px 0}.card .join-button{width:100%;display:flex;height:48px;padding:15px 24px;justify-content:center;align-items:center;gap:10px;align-self:stretch;border-radius:54px;background:#f3a742;box-shadow:3px 3px 8px #00000012;border:none;font-weight:600;font-size:14px;color:#000}.card .down{width:100%}.card .check{margin-right:5px}.card .errorModal{font-size:15px;display:flex;flex-direction:column;align-items:center;position:absolute;height:70%;bottom:3%;border:1px solid #D0021B;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 32px;text-align:center}.card .errorModal a{color:#4a90e2;text-decoration:none;font-weight:600}.card .error-img{width:26px;height:26px;margin-top:10px;margin-bottom:15px}.card .sentEmail{font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:72%;bottom:3%;border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 32px;text-align:center}.card .revise-message{font-weight:700;margin:0 0 10px}.card .email-message{margin:0;line-height:20px}.card .open-email{width:100%;border-radius:24px;border:1px solid #4A90E2;padding:14px 0;color:#4a90e2;text-align:center;font-size:14px;font-weight:600;text-decoration:none;line-height:1}.card .img-link{height:14px;margin-left:5px}.card .aspa{height:24px;position:absolute;top:4px;right:4px;cursor:pointer}.card .thanks-message{font-weight:700;margin:0 0 10px}.card .explore-message{margin:0 0 13px;line-height:20px}.card .explore-message a{color:#4a90e2;text-decoration:none;font-weight:600}.card .membersModal{font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;position:absolute;height:178px;top:calc(100% - 192px);border:1px solid #FFF;border-radius:5px;width:90%;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:17px 31px 0;text-align:center;left:15px}.card .membersModal p{margin:0 0 10px}.card .membersModal a{width:100%}.card .membersModal a button{font-size:14px;font-weight:600;height:48px;width:100%;border-radius:24px;border:1px solid #FFF;background:var(--principal-membersModal, #F9E700);margin-bottom:9px}.card .membersModal-message{font-weight:700}@media (min-width: 768px){.card-logged{position:relative;align-items:baseline;width:100%;max-width:640px;height:178px}.card-logged .description{margin:0;text-align:right;font-size:14px;line-height:18px}.card-logged .description-first{display:block}.card-logged .description-second{display:none}.card-logged .user-bottom{position:absolute;bottom:15px;right:15px;width:286px;display:flex;justify-content:space-between;align-items:auto;margin-top:18px;border-radius:5px;background:#ffffff80;padding:9px 11px;font-size:11px}.card-logged .user-bottom.subscribed{width:95%;height:42px;flex-direction:row;justify-content:space-between}.card-logged .user-bottom .check-img{position:relative;top:0}.card-logged .user-bottom--firstGroup{display:flex;align-items:center;gap:8px;flex-direction:row}.card-logged .user-bottom p{margin:0}.card-logged .switch{border-radius:30px;background-color:green;height:24px;width:34px}.card-logged .subscribedModal{text-align:start;font-size:15px;display:flex;flex-direction:column;align-items:baseline;justify-content:space-between;position:absolute;height:74px;width:286px;top:14px;right:15px;border:1px solid #FFF;border-radius:5px;padding:0 10px 20px 20px;background:#f2f0f0;box-shadow:0 4px 50px #00000014;gap:10px}.card-logged .subscribedModal p{margin:0}.card-logged .subscribedModal a{color:#4a90e2;text-decoration:none;font-weight:600}.card-logged .suscribete-mensaje{font-weight:700}.card-logged .confirmedEmailModal{text-align:start;font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:start;position:absolute;height:146px;width:286px;top:15px;right:15px;border:1px solid #FFF;border-radius:5px;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:5px 31px 0 15px;gap:5px}.card-logged .errorModal{text-align:start;font-size:14px;display:flex;flex-direction:column;align-items:center;justify-content:start;position:absolute;height:80%;width:45%;top:15px;right:15px;border-radius:5px;border:1px solid #D0021B;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:11px 32px 16px 16px;line-height:18px}.card-logged .errorModal .error-message{margin:0}.card-logged .errorModal .error-text{margin-top:7px;line-height:18px}.card-logged .membersModal{text-align:start;font-size:15px;display:flex;flex-direction:column;align-items:center;justify-content:start;position:absolute;height:146px;width:286px;top:15px;right:15px;border:1px solid #FFF;border-radius:5px;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:6px 31px 0 17px;gap:6px;line-height:20px}.card-logged .membersModal p{margin:0}.card-logged .membersModal a{width:100%}.card-logged .membersModal a button{position:absolute;bottom:-20px;right:70px;font-size:14px;font-weight:600;height:44px;width:202px;border-radius:24px;border:1px solid #FFF;background:var(--principal-membersModal, #F9E700);margin-bottom:10px}.card-logged .membersModal-message{font-weight:700;text-align:start}.card-logged .img{height:auto}.card-logged .img img{height:87px;align-self:end}.card{position:relative;align-items:baseline;width:100%;height:249px;max-width:640px}.card .description{margin:0;text-align:right;font-size:14px;line-height:18px}.card .down{width:100%;display:flex;gap:12px}.card .left-group{width:100%}.card .join-button{min-width:209px;width:209px}.card .input{width:100%}.card .conditions{margin:13px 0 3px}.card .insert{font-size:12px;margin:15px 0 12px}.card .errorModal{height:120px;bottom:5%;width:95.5%;display:flex;flex-direction:row;align-items:center;text-align:left;padding:15px 24px 15px 20px}.card .error-text{width:100%}.card .error-text p{width:85%}.card .error-text .revise-message{margin-bottom:10px}.card .error-img{width:26px;height:26px;margin:10px 25px 15px 5px}.card .sentEmail{height:51%;width:95.5%;bottom:4%;left:15px;display:flex;flex-direction:row;align-items:end;text-align:left;padding:15px 24px 15px 20px}.card .sentEmail div{height:100%}.card .email-message{width:347px}.card .open-email{width:182px;margin-right:15px;margin-bottom:12px}.card .revise-message{margin:0 0 5px}.card .img{min-height:88px;text-align:left}.card img{height:87px}.card .description-first{display:block}.card .description-second{display:none}.card .membersModal{font-size:15px;display:flex;position:absolute;height:111px;width:95.5%;top:119px;border:1px solid #FFF;border-radius:5px;background:#f2f0f0;box-shadow:0 4px 50px #00000014;padding:16px 0 16px 18px;gap:5px;flex-direction:row}.card .membersModal a{width:100%}.card .membersModal p{margin:0;text-align:left}.card .membersModal a button{font-size:14px;font-weight:600;height:44px;width:202px;border-radius:24px;border:1px solid #FFF;background:var(--principal-membersModal, #F9E700);margin-bottom:10px}.card .membersModal-messages{display:flex;flex-direction:column;gap:7px;line-height:20px}.card .membersModal-message{font-weight:700;text-align:start}}', Na = (r, i) => {
  var e = /* @__PURE__ */ new Date(), a = new Date(e.getTime() + 3600 * 1e3), t = "expires=" + a.toUTCString();
  document.cookie = "promoname=" + r + "; " + t + "; path=/", document.cookie = "promoid=" + i + "; " + t + "; path=/";
}, fi = (r) => {
  const i = window.dataLayer || [], e = ["1000", "2000", "3000", "4000", "5000", "6000", "7000", "8000"];
  (i || []).push({ ecommerce: null });
  const a = "select_promotion", t = e.map((o) => ({
    promotion_name: "boletines",
    promotion_id: r,
    item_id: o,
    quantity: 1
  }));
  Na("boletines", r), (i || []).push({ event: a, ecommerce: { items: t } });
}, Ga = (r) => {
  console.log("push view data layer");
  const i = window.dataLayer || [], e = ["1000", "2000", "3000", "4000", "5000", "6000", "7000", "8000"];
  (i || []).push({ ecommerce: null });
  const a = "view_promotion", t = e.map((o) => ({
    promotion_name: "boletines",
    promotion_id: r,
    item_id: o,
    quantity: 1
  }));
  (i || []).push({ event: a, origin: "gtm", ecommerce: { items: t } });
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = (r) => r ?? g;
var qa = Object.defineProperty, m = (r, i, e, a) => {
  for (var t = void 0, o = r.length - 1, s; o >= 0; o--)
    (s = r[o]) && (t = s(i, e, t) || t);
  return t && qa(i, e, t), t;
};
const Va = () => window.location.href.includes("localhost"), D = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAzBAMAAAAnTUYnAAAAGFBMVEXy8PAfHh4eHh4AAADU0tLT0tLj4eF5eHgdRBS9AAAAl0lEQVQ4y+3SMQrCQBBGYQtNLxHslWAdcwEDHiAI9l7B3L/IBvKWDA+SIm2mWIZdvoX5mcNeW6qY9b/w0ne5PT0CKavcf+qA2mcHuV/Cb8eEIK90CkGEIEYQI4gRxAhi9IUI3SBCjQjjN5XupvHPUxAi9bsUIrFWiMRIT4T0TEjPBGQCMsnIxKgYSUZhq/6JgK4L27vXag1PHxk93yjPUQAAAABJRU5ErkJggg==", import.meta.url).href, Ya = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAM1BMVEUAAADQAhvPBBzQAxvQAhvPBBzQAhvPACDQAhvPAhzQAhvRAhrPAxzPECDPAx3PAxrQAhtVAuOPAAAAEHRSTlMA3yC/kEDvEM+An38wEFBQlvk59AAAAL1JREFUKM99ku2ywiAMRPNFKG2vnvd/2qtWimMZ9xc7J5AdEukqmyukx374AZxTXmToLyDjZiJWVoWondhCttNJg8XedxbU5EOmLEdlDDJYvBJAJ6qdJc8sTuvVMPq5yI7KFdXntWCdIAmaOGWGbrgkNkOGftqvc7cj/ECKyURGinOfoYJLI2ZoJR4466SXsh8fdUEb/no17RqC8nsoUuej7AvANhZlS5aztAboWh7e7pEQ9feyDe3hCertBP87jQi9zpCIcwAAAABJRU5ErkJggg==", import.meta.url).href, Ka = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAMAAAA3HE0QAAAAM1BMVEUAAABKkOJLkOJKkOJLkOJLkeRIj+dMj+NKkOJLkOJKkOJQj99Kj+FLkONKj+FKj99KkOLlHaJpAAAAEHRSTlMA37+fn18gQIDvsBBwz5Aw2fyJSwAAAIRJREFUKM+1zkkOwkAMBVHHGeghgO9/WsDeWCmlQUj5i97Uk9Xy7+4We56Bh75XzW4y2GoBelFs9z7NDhabsNX7VhxUFSy6BLD5rB8Au+wJsH/mrwP2GAB6APbSMmCXSTNAB0AnyJ0AHSD3Aejehxeijz55EajfgFpbjmv57KbGaZcf9wL6pgc6ERovcwAAAABJRU5ErkJggg==", import.meta.url).href, Ja = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAbFBMVEUAAAAmoHYmoHcmoHYnoHcon3gpn3Uon3gln3YmoHYnn3YmoHcrn3ogn3wmoHcloHcmn3b39vYmoHbq8e7d6+ZAq4aPy7Znu54zpX7D4daBxq6c0L623M7Q5t7Q5d6p1sZ0wKZatZZNsI5btZbXTWXRAAAAEXRSTlMA79/fv0AwIJDPcGAwEJ+PoHkzkGcAAAIaSURBVEjHnVbtYoMgDES0E22rQ3TK1H7t/d9xEqjRAmJ7vwQ9Ey4HgThwyouMVhNoUuYnsgOHMqpWiItTiJJUDmTHdygYLvVQzqX5omv7oRaci1H2bWcmy7OLk8YV4C4FX2Jo/cG+9Prbmluob/AqsgQ5wnwjuRNjA6+PL3Fg8ldwD8QvfLCKlUJuP3wDP5BhutAtNpwgK0YNS+SEWOWcHKyHBwHrOhhSrHQTYZJQGiYLtUe+AxJDZdPTje9Cq0OZEtV8C9euuWpvPEMVyjybnIsyMQf8TY/MyDBscepGCYWrinR2XVCzqjeDDsyUh7JrTeVxlBMGvwn4ACvfT6OCqB0uA5wHjgd1ZIAOFy9ngF2GBQHRY6JmhVe4TslUL2VR3wNpQ2yrHkiyaw94oHA2CdNrpmwuuBUMx0ovXjmvg3WjcFYJRxAiW2V9rea91ePjAhJ8/j0XF39/B5e+iI3FZZaNbuAAI9zFaapcG3aRhNCSGZda0IYl0dpHJgYw3Q6hhIBj75YN0KVWdoVqStZ2l8B5uCwyn82JVY7eFg5VyhRHh5Ivx2Ln4oyL1pHYVfwbfBufPlvtO8fy3DfY/gbAsNXQva2Gnj9pah+0zy9no/YcMRIbtetKcHNdCVp4FWEcXBetAO2wTkze9TxNndcchtccOaprTj3gNYehblYwD5ID8eOYvUNBQb5fwkVMU0K8nCXApFmRo2SIf85MlCl1/TY0AAAAAElFTkSuQmCC", import.meta.url).href, Bi = class Bi extends v {
  constructor() {
    super(), this.email = "", this.listId = "", this.interestId = "", this.image = "", this.paragraph = "", this.name = "", this.namePromo = "", this.rightCard = !1, this.showSentEmailModal = !1, this.showConfirmedEmailModal = !1, this.user = !1, this.userData = null, this.showSubscribedModal = !1, this.showMembersModal = !1, this.showUserIsSubscribedModal = !1, this.isLoading = !1, this.itemSelected = !1, this.isList = !1, this.error = !1, this.newsletterData = null, this.API_URL = "https://api.tools.eldiario.es", this.CRM_API_URL = "https://usersapi.eldiario.es/api/front/v1", this.RECAPTCHA_SITE_KEY = "6LcWgXgsAAAAAMEt4zSAeuBeKDjMMbFyO2YQu1b3", this.CRM_URL = "https://usuarios.eldiario.es", this.fromEmail = !1, this.frontData = null, this.catalan = !1, this.alreadyPushedToDataLayer = !1, this.generateRecaptchaToken = async (i) => {
      try {
        return !window.grecaptcha || !window.grecaptcha.enterprise ? (console.warn("reCAPTCHA not loaded, using dummy token"), "dummy") : await window.grecaptcha.enterprise.execute(this.RECAPTCHA_SITE_KEY, { action: i });
      } catch (e) {
        return console.error("Error generating reCAPTCHA token:", e), "dummy";
      }
    }, this.getData = async () => {
      console.log("getting data");
      const i = `${this.API_URL}/getUserBoletinInfo?userId=${encodeURIComponent(this.email)}&listId=${this.listId}`;
      try {
        const e = await fetch(i);
        if (!e.ok)
          throw new Error(`Get Data Response status: ${e.status}`);
        return await e.json();
      } catch (e) {
        console.error("Error getting data", e.message), this.error = !0, this.isLoading = !1;
      }
    }, this.updateMailchimpData = async () => {
      this.error = !1;
      const i = this.renderRoot.querySelector(".switch");
      if (this.isPartnerBoletinAndUserIsNotPartner()) {
        this.showMembersModal = !0, i && (i.selected = !1);
        return;
      }
      this.isLoading = !0;
      const e = this.updateMemberInfo(), a = this.apiCallMethod();
      try {
        if (!(await fetch(`${this.API_URL}/updateNewsletter/${encodeURIComponent(this.email)}`, {
          credentials: "include",
          method: a,
          body: JSON.stringify({
            listId: this.listId,
            memberInfo: e[this.listId]
          })
        })).ok)
          throw new Error("Ha ocurrido un error inesperado, intentelo de nuevo más tarde");
        this.userData = e, this.itemSelected = this.checkItemSelected(), this.fromEmail && this.itemSelected ? (this.showConfirmedEmailModal = !0, this.fromEmail = !1) : !this.fromEmail && this.itemSelected ? this.showSubscribedModal = !0 : this.showSubscribedModal = !1;
      } catch (t) {
        throw this.error = !0, new Error(`Error updating boletin ${t}`);
      } finally {
        this.isLoading = !1;
      }
    }, this.convertItemsToInterests = (i) => $a.includes(this.listId) ? {} : {
      ...i[this.listId] && i[this.listId].interests ? i[this.listId].interests : {},
      [this.interestId]: !0
    }, this.sendEmail = async (i) => {
      i.preventDefault(), this.error = !1, fi(this.namePromo);
      try {
        this.isLoading = !0;
        const e = await this.generateRecaptchaToken("email_available"), a = await fetch(`${this.CRM_API_URL}/users/email-available?email=${encodeURIComponent(this.email)}&recaptchaToken=${encodeURIComponent(e)}`);
        if (!a.ok)
          throw new Error(`Error en la petición si el email existe: ${a.status}`);
        const t = await a.json();
        if (t.available === !0) {
          this.registerUser();
          return;
        }
        console.log("respuesta email", t), this.sendMagicLink();
      } catch (e) {
        this.error = !0, this.isLoading = !1, console.error("Error en sendEmail", e.message);
      }
    }, this.sendMagicLink = async () => {
      this.error = !1;
      try {
        const i = await this.generateRecaptchaToken("magic_link_send"), e = this.buildCrmTokenUrl("magic-link/login"), a = await fetch(`${this.CRM_API_URL}/users/magic-link/send`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            identifier: this.email,
            loginUrl: e,
            recaptchaToken: i,
            fromBulletin: !0
          })
        });
        if (!a.ok)
          throw new Error(`Error en la petición: ${a.status}`);
        this.showSentEmailModal = !0, console.log("Magic link enviado");
      } catch (i) {
        this.error = !0, console.error("Error al enviar el magic link:", i.message || i);
      } finally {
        this.isLoading = !1;
      }
    }, this.registerUser = async () => {
      console.log("register user"), this.error = !1;
      const i = this.buildCrmTokenUrl("confirmar-registro");
      try {
        const e = await this.generateRecaptchaToken("register"), a = await fetch(`${this.CRM_API_URL}/users`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: Fa(),
            origin: "from-newsletter",
            confirmUrl: i,
            recaptchaToken: e
          })
        });
        if (!a.ok)
          throw new Error(`Error en la petición al registrar usuario: ${a.status}`);
        const t = await a.json();
        console.log("Usuario registrado:", t), this.showSentEmailModal = !0;
      } catch (e) {
        this.error = !0, console.error("Error al registrar usuario", e.message);
      } finally {
        this.isLoading = !1;
      }
    }, Va() && (window.dataLayer = ja["no-logged"]), this.loadRecaptchaScript();
  }
  loadRecaptchaScript() {
    if (document.querySelector('script[src*="recaptcha/enterprise.js"]'))
      return;
    const i = document.createElement("script");
    i.src = "https://www.google.com/recaptcha/enterprise.js?render=6LcWgXgsAAAAAMEt4zSAeuBeKDjMMbFyO2YQu1b3", i.async = !0, i.defer = !0, document.head.appendChild(i);
  }
  connectedCallback() {
    var e, a;
    if (super.connectedCallback(), console.log("web component connected"), this.catalan ? this.frontData = ge.ca : this.frontData = ge.es, this.isList = !!(this.listId && !this.interestId), this.newsletterData = this.frontData.newsletters.find((t) => t.id === (this.isList ? this.listId : this.interestId)), !this.newsletterData)
      throw console.log("listId", this.listId, "interestId", this.interestId), new Error("Boletin not found");
    this.image = this.image !== "" ? this.image : this.newsletterData.image, console.log(this.image), this.paragraph = this.paragraph !== "" ? this.paragraph : this.newsletterData.body, this.name = this.newsletterData.name, this.namePromo = this.newsletterData.namePromo, console.log("rightCard", this.rightCard);
    const i = new URLSearchParams(window.location.search);
    console.log("index", this.findStatusIndex()), Ga(this.namePromo), ((e = window.dataLayer[this.findStatusIndex()]) == null ? void 0 : e.userState) === "logado" && !i.get("listId") && this.loggedWithoutParams(), ((a = window.dataLayer[this.findStatusIndex()]) == null ? void 0 : a.userState) === "logado" && i.get("listId") && this.loggedWithParams(i);
  }
  loggedWithoutParams() {
    console.log("loggedWithoutParams"), this.user = !0, this.email = window.dataLayer[this.findEmailIndex()].isMC, this.isLoading = !0, this.getData().then((i) => {
      if (this.userData = i, console.log("userData without params", this.userData), !this.userData[this.listId]) {
        this.isLoading = !1;
        return;
      }
      this.isAlreadySubscribedToBoletin() && (console.log("User already Subscribed to boletin"), this.showUserIsSubscribedModal = !0), this.itemSelected = this.checkItemSelected(), this.isLoading = !1;
    });
  }
  loggedWithParams(i) {
    if (console.log("loggedWithParams"), this.listId !== i.get("listId"))
      throw this.error = !0, new Error("List ID missmatch");
    if (i.get("interestId") && this.interestId !== i.get("interestId"))
      throw this.error = !0, new Error("Interest ID missmatch");
    (i.get("fromMagicLink") || i.get("fromRegister")) && (this.fromEmail = !0), this.listId = i.get("listId"), this.interestId = i.get("interestId"), this.user = !0, this.email = window.dataLayer[this.findEmailIndex()].isMC, this.isLoading = !0, this.getData().then(async (e) => {
      this.userData = e, console.log("userData with params", this.userData), this.isAlreadySubscribedToBoletin() && (console.log("User already Subscribed to boletin"), this.showUserIsSubscribedModal = !0), this.userData[this.listId] || (console.log("No list data, is null - POST data"), await this.updateMailchimpData()), this.isList && this.userData[this.listId] && this.userData[this.listId].status === "unsubscribed" && (console.log("User unsuscribed of list - PUT data"), await this.updateMailchimpData()), this.interestId && this.userData[this.listId] && this.userData[this.listId].interests[this.interestId] === !1 && (console.log("User unsuscribed of interest - PUT data"), await this.updateMailchimpData()), this.itemSelected = this.checkItemSelected(), this.isLoading = !1;
    });
  }
  updateEmail(i) {
    const e = i.target;
    this.email = e.value;
  }
  /**
  * Checks if boletin is for partners but the user is not partner.
  */
  isPartnerBoletinAndUserIsNotPartner() {
    return this.newsletterData.isPartner && !window.dataLayer[2].userPerfil.toLowerCase().includes("socio");
  }
  /**
  * Checks if it is a boletin for partners.
  */
  showMembersModalIfPartnerBoletin() {
    var i;
    this.showMembersModal = ((i = this.newsletterData) == null ? void 0 : i.isPartner) || !1, this.showMembersModal && !this.alreadyPushedToDataLayer && (fi(this.namePromo), this.alreadyPushedToDataLayer = !0, console.log("select promotion pushed"));
  }
  /**
  * Checks if user is subscribed already to boletin
  */
  isAlreadySubscribedToBoletin() {
    var i;
    return this.userData[this.listId] && (this.isList ? this.userData[this.listId].status === "subscribed" : ((i = this.userData[this.listId].interests) == null ? void 0 : i[this.interestId]) === !0);
  }
  updateMemberInfo() {
    const i = JSON.parse(JSON.stringify(this.userData));
    if (!i[this.listId])
      return this.buildNewMemberInfo(i), i;
    const a = i[this.listId].status;
    return this.isList ? (i[this.listId].status = a === k.UNSUBSCRIBED || a === k.ARCHIVED ? k.SUBSCRIBED : k.UNSUBSCRIBED, i) : (i[this.listId].interests[this.interestId] = !i[this.listId].interests[this.interestId], (a === k.UNSUBSCRIBED || a === k.ARCHIVED) && i[this.listId].interests[this.interestId] && (i[this.listId].status = k.SUBSCRIBED), i);
  }
  buildNewMemberInfo(i) {
    const e = i[this.listId] ? i[this.listId] : null, a = this.convertItemsToInterests(i);
    return e ? (i[this.listId] = {
      ...e,
      status: k.SUBSCRIBED,
      interests: a,
      list_id: this.listId
    }, i) : (i[this.listId] = {
      email_address: `${this.email}`,
      full_name: "",
      status: k.SUBSCRIBED,
      interests: a,
      list_id: this.listId
    }, i);
  }
  apiCallMethod() {
    let i = "PUT";
    return (this.listId && this.userData[this.listId] === null || this.userData[this.listId].status === k.ARCHIVED) && (i = "POST"), i;
  }
  buildRedirectUrl() {
    const i = window.location.href.split("?")[0], e = this.isList ? "" : `&interestId=${encodeURIComponent(this.interestId)}`;
    return `${i}?listId=${encodeURIComponent(this.listId)}${e}&fromMagicLink=true`;
  }
  buildCrmTokenUrl(i) {
    return `${this.CRM_URL}/${i}?token=<token>&rd=${encodeURIComponent(this.buildRedirectUrl())}`;
  }
  handleClose(i) {
    switch (i) {
      case "MembersModal":
        this.showMembersModal = !1;
        break;
      case "SubscribedModal":
        this.showSubscribedModal = !1;
        break;
      case "SentEmailModal":
        this.showSentEmailModal = !1;
        break;
      case "ConfirmedEmailModal":
        this.showConfirmedEmailModal = !1;
        break;
      case "error":
        this.error = !1;
        break;
    }
  }
  checkItemSelected() {
    return this.isList ? this.userData[this.listId].status === "subscribed" : this.userData[this.listId].interests[this.interestId] === !0;
  }
  findStatusIndex() {
    return window.dataLayer.findIndex((i) => "userState" in i);
  }
  findEmailIndex() {
    return window.dataLayer.findIndex((i) => "isMC" in i);
  }
  render() {
    var i, e, a, t, o, s, d, n, c, f, u, y, w, U, Li, Ii, $i, ji, Fi, Hi, Ni, Gi, qi, Vi, Yi, Ki, Ji, Qi, Zi, Wi, Xi, Oi, ie, ee, ae;
    return p`
    ${this.user ? p`
      <div class='${this.rightCard ? "right-card-logged" : "card-logged"}'>
        <div class="img">
          <img src="${this.image}" alt=${this.name}>
          <p class="description description-first">${X(this.paragraph)}</p>
        </div>
        <div>
        <p class="description description-second">${X(this.paragraph)}</p>
        <div class=${this.error ? "hidden" : "visible"}>
        <div class=${this.showUserIsSubscribedModal ? "user-bottom subscribed" : "user-bottom"}>
        ${this.showUserIsSubscribedModal ? p`
          <div class="user-bottom--firstGroup">
          <img class="check-img" src="${Ja}" alt="checked"/>
          <p class="black-bold">${(i = this.frontData) == null ? void 0 : i.loggedBox.userIsAlreadySubscribed.message}</p>
          </div>
          <a class="blue-paragraph" target="_blank" href="https://usuarios.eldiario.es/boletines/">${(e = this.frontData) == null ? void 0 : e.loggedBox.userIsAlreadySubscribed.handleMessage}</a>` : p`
          <p>${(a = this.frontData) == null ? void 0 : a.loggedBox.userNotSubscribed.subscribe}</p>
          ${this.isLoading ? p`<md-circular-progress indeterminate></md-circular-progress>` : p`<md-switch class="switch" ?selected=${this.itemSelected} @change=${this.updateMailchimpData}></md-switch>`}
          `}

          </div>

        </div>
        ${this.showSubscribedModal ? p`<div class="subscribedModal">
            <span>
              <img class="aspa" src="${D}" alt="aspa" @click=${() => this.handleClose("SubscribedModal")}/>
            </span>
            <p class="thanks-message">${(t = this.frontData) == null ? void 0 : t.loggedBox.subscribedModal.thanksMessage}</p>
            <p>${(o = this.frontData) == null ? void 0 : o.loggedBox.subscribedModal.exploreMessage.firstPart}<a target="_blank" href="https://usuarios.eldiario.es/boletines/">${(s = this.frontData) == null ? void 0 : s.loggedBox.subscribedModal.exploreMessage.secondPart}</a></p>
        </div>` : ""}

        ${this.error ? p`<div class="errorModal">
          <span>
          <img class="aspa" src="${D}" alt="aspa" @click=${() => this.handleClose("error")}/>
          </span>
          <p class="error-message">${(d = this.frontData) == null ? void 0 : d.errorModal.reviseMessage}</p>
          <p class="error-text">${(n = this.frontData) == null ? void 0 : n.errorModal.emailMessage.firstPart}<a href="${window.location.href}">${(c = this.frontData) == null ? void 0 : c.errorModal.emailMessage.link}</a>${(f = this.frontData) == null ? void 0 : f.errorModal.emailMessage.secondPart}</p>
          </div>` : ""}
        ${this.showMembersModal ? p`<div class="membersModal">
            <span>
              <img class="aspa" src="${D}" alt="aspa" @click=${() => this.handleClose("MembersModal")}/>
            </span>
            <p class="membersModal-message">${(u = this.frontData) == null ? void 0 : u.membersModal.message}</p>
            <p>${(y = this.frontData) == null ? void 0 : y.membersModal.hazte_socio}</p>
            <a target="_blank" href="https://usuarios.eldiario.es/hazte_socio/?itm_n=${this.namePromo}&itm_c=boletines" @click=${() => fi(this.namePromo)}><button>${(w = this.frontData) == null ? void 0 : w.membersModal.button}</button></a>
        </div>` : ""}
        ${this.showConfirmedEmailModal ? p`<div class="confirmedEmailModal">
              <div>
                <span>
                  <img class="aspa" src="${D}" alt="aspa" @click=${() => this.handleClose("ConfirmedEmailModal")}/>
                </span>
                <p class="thanks-message">${(U = this.frontData) == null ? void 0 : U.loggedBox.showConfirmedEmailModal.thanksMessage}</p>
                <p class="explore-message">
                ${(Li = this.frontData) == null ? void 0 : Li.loggedBox.showConfirmedEmailModal.explore.firstPart} <a href='https://usuarios.eldiario.es/boletines/'>${(Ii = this.frontData) == null ? void 0 : Ii.loggedBox.showConfirmedEmailModal.explore.link}</a>${($i = this.frontData) == null ? void 0 : $i.loggedBox.showConfirmedEmailModal.explore.secondPart}
                </p>
              </div>
            </div>` : ""}
      </div>
      </div>

      ` : p`
      <div class="${this.rightCard ? "right-card" : "card"}">
      <div class="img">
        <img src="${this.image}" alt="${this.name}">
        <p class="description description-first">${X(this.paragraph)}</p>
      </div>
      <div>
    <p class="description description-second">${X(this.paragraph)}</p>
      <p class="insert">${(ji = this.frontData) == null ? void 0 : ji.noLoggedBox.insert}</p>
      </div>
      <form class="down" @submit="${this.sendEmail}">
        <div class="left-group">
          <input type="text" class="input" @input="${this.updateEmail}" placeholder="${xe((Fi = this.frontData) == null ? void 0 : Fi.noLoggedBox.email.yourEmail)}" pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}"
          title="${xe((Hi = this.frontData) == null ? void 0 : Hi.noLoggedBox.email.incorrectFormat)}" name="emailField" @focus=${this.showMembersModalIfPartnerBoletin} ?disabled="${this.showMembersModal}" />
          <div class="conditions">
          <input type="checkbox" class="check" required/>
          <label>${(Ni = this.frontData) == null ? void 0 : Ni.noLoggedBox.conditions.firstPart}<a target="_blank" href="https://www.eldiario.es/privacidad/" class="conditions-blue">${(Gi = this.frontData) == null ? void 0 : Gi.noLoggedBox.conditions.secondPart}</a></label>
          </div>
        </div>
        <button type="submit" class="join-button"> ${this.isLoading ? p`<md-circular-progress indeterminate></md-circular-progress>` : (qi = this.newsletterData) != null && qi.isPartner ? (Vi = this.frontData) == null ? void 0 : Vi.noLoggedBox.join.members : (Yi = this.frontData) == null ? void 0 : Yi.noLoggedBox.join.free}</button>
      </form>
      ${this.showSentEmailModal ? p`<div class="sentEmail">
            <div>
              <span>
                <img class="aspa" src="${D}" alt="aspa" @click=${() => this.handleClose("SentEmailModal")}/>
              </span>
              <p class="revise-message">${(Ki = this.frontData) == null ? void 0 : Ki.noLoggedBox.sentEmailModal.reviseMessage}</p>
              <p class="email-message">
                ${(Ji = this.frontData) == null ? void 0 : Ji.noLoggedBox.sentEmailModal.emailMessage}
              </p>
            </div>
            <a target="_blank" href="https://www.gmail.com" class="open-email">
            ${(Qi = this.frontData) == null ? void 0 : Qi.noLoggedBox.sentEmailModal.openEmail} <img class="img-link" src="${Ka}" alt="link" />
            </a>
          </div>` : ""}

            ${this.error ? p`
              <div class="errorModal">
              <span>
              <img class="aspa" src="${D}" alt="aspa" @click=${() => this.handleClose("error")}/>
              </span>
              <img class="error-img" src="${Ya}" alt="error"/>
              <div class="error-text">
                <p class="revise-message">${(Zi = this.frontData) == null ? void 0 : Zi.errorModal.reviseMessage}</p>
                <p class="email-message">
                ${(Wi = this.frontData) == null ? void 0 : Wi.errorModal.emailMessage.firstPart}<a href="">${(Xi = this.frontData) == null ? void 0 : Xi.errorModal.emailMessage.link}</a> ${(Oi = this.frontData) == null ? void 0 : Oi.errorModal.emailMessage.secondPart}
                </p>
              </div>
              </div>` : ""}
            ${this.showMembersModal ? p`<div class="membersModal">
            <span>
              <img class="aspa" src="${D}" alt="aspa" @click=${() => this.handleClose("MembersModal")}/>
            </span>
            <div class="membersModal-messages">
            <p class="membersModal-message">${(ie = this.frontData) == null ? void 0 : ie.membersModal.message}</p>
            <p>${(ee = this.frontData) == null ? void 0 : ee.membersModal.hazte_socio}</p>
            </div>
            <a target="_blank" href="https://usuarios.eldiario.es/hazte_socio/?itm_n=${this.namePromo}&itm_c=boletines"><button>${(ae = this.frontData) == null ? void 0 : ae.membersModal.button}</button></a>
        </div>` : ""}
    </div>
      `}
    `;
  }
};
Bi.styles = we(Ha);
let h = Bi;
m([
  b({ type: String })
], h.prototype, "email");
m([
  b({ type: String })
], h.prototype, "listId");
m([
  b({ type: String })
], h.prototype, "interestId");
m([
  b({ type: String })
], h.prototype, "image");
m([
  b({ type: String })
], h.prototype, "paragraph");
m([
  b({ type: String })
], h.prototype, "name");
m([
  b({ type: String })
], h.prototype, "namePromo");
m([
  b({ type: Boolean })
], h.prototype, "rightCard");
m([
  b({ type: Boolean })
], h.prototype, "showSentEmailModal");
m([
  b({ type: Boolean })
], h.prototype, "showConfirmedEmailModal");
m([
  b({ type: Boolean })
], h.prototype, "user");
m([
  b({ type: Object })
], h.prototype, "userData");
m([
  b({ type: Boolean })
], h.prototype, "showSubscribedModal");
m([
  b({ type: Boolean })
], h.prototype, "showMembersModal");
m([
  b({ type: Boolean })
], h.prototype, "showUserIsSubscribedModal");
m([
  b({ type: Boolean })
], h.prototype, "isLoading");
m([
  b({ type: Boolean })
], h.prototype, "itemSelected");
m([
  b({ type: Boolean })
], h.prototype, "isList");
m([
  b({ type: Boolean })
], h.prototype, "error");
m([
  b({ type: Object })
], h.prototype, "newsletterData");
m([
  b({ type: String })
], h.prototype, "API_URL");
m([
  b({ type: String })
], h.prototype, "CRM_API_URL");
m([
  b({ type: String })
], h.prototype, "RECAPTCHA_SITE_KEY");
m([
  b({ type: String })
], h.prototype, "CRM_URL");
m([
  b({ type: Boolean })
], h.prototype, "fromEmail");
m([
  b({ type: Object })
], h.prototype, "frontData");
m([
  b({ type: Boolean })
], h.prototype, "catalan");
m([
  b({ type: Boolean })
], h.prototype, "alreadyPushedToDataLayer");
customElements.define("card-component", h);
var Qa = Object.getOwnPropertyDescriptor, Za = (r, i, e, a) => {
  for (var t = a > 1 ? void 0 : a ? Qa(i, e) : i, o = r.length - 1, s; o >= 0; o--)
    (s = r[o]) && (t = s(t) || t);
  return t;
};
let Ti = class extends v {
  render() {
    return p`
<div id="main-container">
 <div id="container-after-news-inside">
  <p class="outlook-header">Recibe cada semana este boletín</h2>
    <p class="article-text">
    <card-component listId="10e11ebad6" interestId="4c72bee66a"></card-component>
    </p>
 </div>
 </div>
    `;
  }
};
Ti.styles = $`
    .despiece {
    padding: 27px 26px;
    border: 2px solid white;
    max-width: 640px;
    margin: auto;
    border: 2px solid #D8D8D8;
    }

    #container-after-news-inside {
    padding: 27px 26px;
    border: 2px solid white;
    max-width: 640px;
    margin: 0 auto;
    border: 2px solid #D8D8D8;
    box-shadow: 4px 4px 4px 0px rgb(0 0 0 / 4%);
  }

  #container-after-news-inside p.outlook-header {
    font-family: Sanomat-Bold;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 28px;
    font-weight: 700;
    text-align: left;
    color: #000;
    margin-top: 0;
    margin-bottom: 25px;
}

#container-after-news-inside p.article-text, #container-after-news-inside p.article-text a, #container-after-news-inside p.article-text span {
    font-family: Encode Sans, Verdana;
    font-size: 17px;
    font-style: normal;
    line-height: 26px;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    margin-top: 0;
    font-weight: 400;
    max-width: 570px;
    width: 100%;
}

#main-container {
          max-width: 1040px;
        margin: 0 auto;
        flex: 0 0 100%;
        display: flex;
}
`;
Ti = Za([
  j("my-app")
], Ti);
export {
  Ti as MyApp
};
