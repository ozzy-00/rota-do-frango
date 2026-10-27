(function () {
        try {
          var PHONE = "5537988386105";
          var cards = [].slice.call(document.querySelectorAll(".card")),
            qty = {};
          function brl(c) {
            return "R$ " + (c / 100).toFixed(2).replace(".", ",");
          }
          cards.forEach(function (c) {
            qty[c.getAttribute("data-id")] = 0;
          });
          function update() {
            var n = 0,
              t = 0,
              lines = [];
            cards.forEach(function (c) {
              var id = c.getAttribute("data-id"),
                q = qty[id],
                p = +c.getAttribute("data-price"),
                nm = c.getAttribute("data-name"),
                s = c.querySelector("select");
              c.querySelector(".qn").textContent = q;
              if (q) {
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
            document.getElementById("bar").className = n ? "on" : "";
            document.getElementById("cnt").textContent =
              n + (n === 1 ? " item" : " itens");
            document.getElementById("tot").textContent = brl(t);
            var enc = encodeURIComponent(
              "Olá! Quero fazer um pedido:\n" +
                lines.join("\n") +
                "\n\nTotal: " +
                brl(t),
            );
            document.getElementById("send").href =
              "https://wa.me/" + PHONE + "?text=" + enc;
            document.getElementById("alt").href =
              "whatsapp://send?phone=" + PHONE + "&text=" + enc;
          }
          document.addEventListener("click", function (e) {
            var b = e.target;
            while (
              b &&
              b !== document &&
              !(b.getAttribute && b.getAttribute("data-act"))
            )
              b = b.parentNode;
            if (!b || b === document) return;
            var c = b;
            while (c && !(c.className && /\bcard\b/.test(c.className)))
              c = c.parentNode;
            var id = c.getAttribute("data-id");
            qty[id] = Math.max(
              0,
              qty[id] + (b.getAttribute("data-act") === "+" ? 1 : -1),
            );
            update();
          });
          document.addEventListener("change", update);
          update();
          document.documentElement.className += " js";
        } catch (err) {}
      })();
