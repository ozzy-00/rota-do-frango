(function () {
  "use strict";

  try {
    var PHONE = "5537988386105";

    var cards = Array.prototype.slice.call(document.querySelectorAll(".card"));

    var qty = {};

    function brl(c) {
      return "R$ " + (c / 100).toFixed(2).replace(".", ",");
    }

    cards.forEach(function (card) {
      var id = card.getAttribute("data-id");
      qty[id] = 0;
    });

    function update() {
      var n = 0;
      var t = 0;
      var lines = [];

      cards.forEach(function (card) {
        var id = card.getAttribute("data-id");
        var q = qty[id] || 0;
        var p = Number(card.getAttribute("data-price"));
        var nm = card.getAttribute("data-name");
        var s = card.querySelector("select");
        var quantityElement = card.querySelector(".qn");

        if (quantityElement) {
          quantityElement.textContent = q;
        }

        if (q > 0) {
          n += q;
          t += q * p;

          lines.push(
            "• " +
              q +
              "x " +
              nm +
              (s ? " (" + s.value + ")" : "") +
              " - " +
              brl(q * p),
          );
        }
      });

      var bar = document.getElementById("bar");
      var cnt = document.getElementById("cnt");
      var tot = document.getElementById("tot");
      var send = document.getElementById("send");
      var alt = document.getElementById("alt");

      if (!bar || !cnt || !tot || !send || !alt) {
        return;
      }

      bar.className = n > 0 ? "on" : "";

      cnt.textContent = n + (n === 1 ? " item" : " itens");

      tot.textContent = brl(t);

      var message =
        "Olá! Quero fazer um pedido:\n" +
        lines.join("\n") +
        "\n\nTotal: " +
        brl(t);

      var enc = encodeURIComponent(message);

      send.href = "https://wa.me/" + PHONE + "?text=" + enc;

      alt.href = "whatsapp://send?phone=" + PHONE + "&text=" + enc;
    }

    document.addEventListener("click", function (e) {
      var b = e.target;

      while (
        b &&
        b !== document &&
        !(b.getAttribute && b.getAttribute("data-act"))
      ) {
        b = b.parentNode;
      }

      if (!b || b === document) return;

      var c = b;

      while (c && !(c.className && /\bcard\b/.test(c.className))) {
        c = c.parentNode;
      }

      if (!c) return;

      var id = c.getAttribute("data-id");

      if (!(id in qty)) return;

      qty[id] = Math.max(
        0,
        qty[id] + (b.getAttribute("data-act") === "+" ? 1 : -1),
      );

      update();
    });

    document.addEventListener("change", function () {
      update();
    });

    update();

    document.documentElement.className += " js";
  } catch (err) {
    console.error("Erro no cardápio:", err);
  }
})();
