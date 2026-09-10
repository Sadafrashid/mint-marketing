    (function(){
      var viewport = document.getElementById('fiSceneViewport');
      var holder = document.getElementById('fiSceneHolder');
      var scene  = document.getElementById('fiScene');
      if (!viewport || !holder || !scene) return;
      var floats = Array.prototype.slice.call(scene.querySelectorAll('.fi-float'));
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      var DESIGN_W = 620;

      // Scale the whole fixed-size canvas down/up as one unit so the
      // layout — including the sketchbook — is pixel-identical on
      // every screen size, just uniformly smaller on narrow ones.
      function applyScale(){
        var scale = viewport.clientWidth / DESIGN_W;
        holder.style.transform = 'scale(' + scale + ')';
      }
      applyScale();
      if (window.ResizeObserver){
        new ResizeObserver(applyScale).observe(viewport);
      } else {
        window.addEventListener('resize', applyScale);
      }

      // ---- click the phone to shut it down / tap again to switch it back on ----
      var phone = document.getElementById('fiPhone');
      if (phone){
        var phoneUi = phone.querySelector('.fi-phone-ui');
        var togglePhone = function(){
          if (phone.classList.contains('is-off')){
            // currently off -> switch on
            phone.classList.remove('is-off');
            phone.classList.add('is-turning-on');
            phone.setAttribute('aria-pressed', 'false');
            var clearOnAnim = function(){
              phone.classList.remove('is-turning-on');
              if (phoneUi) phoneUi.removeEventListener('animationend', clearOnAnim);
            };
            if (phoneUi) phoneUi.addEventListener('animationend', clearOnAnim);
            setTimeout(clearOnAnim, 500); // safety net (reduced motion / interrupted toggles)
          } else {
            // currently on -> shut down
            phone.classList.remove('is-turning-on');
            phone.classList.add('is-off');
            phone.setAttribute('aria-pressed', 'true');
          }
        };
        phone.addEventListener('click', togglePhone);
        phone.addEventListener('keydown', function(e){
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
            e.preventDefault();
            togglePhone();
          }
        });
      }

      if (reduced) return;

      var tx = 0, ty = 0, mx = 0, my = 0;

      holder.addEventListener('mousemove', function(e){
        var r = holder.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        ty = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      }, { passive: true });
      holder.addEventListener('mouseleave', function(){ tx = 0; ty = 0; });

      function raf(){
        mx += (tx - mx) * 0.06;
        my += (ty - my) * 0.06;

        scene.style.transform = 'rotateX(' + (my * -3).toFixed(2) + 'deg) rotateY(' + (mx * 3).toFixed(2) + 'deg)';

        floats.forEach(function(el){
          var depth = parseFloat(el.getAttribute('data-fi-depth')) || 20;
          el.style.transform = 'translate3d(' + (mx * depth).toFixed(1) + 'px,' + (my * depth).toFixed(1) + 'px,0)';
        });
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    })();
