document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  let candles = [];
  let audioContext;
  let analyser;
  let microphone;
  let audio = new Audio('hbd.mp3');


  function updateCandleCount() {
    const activeCandles = candles.filter(
      (candle) => !candle.classList.contains("out")
    ).length;
    candleCountDisplay.textContent = activeCandles;
  }

  function addCandle(left, top) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = left + "px";
    candle.style.top = top + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.appendChild(candle);
    candles.push(candle);
    updateCandleCount();
  }

  cake.addEventListener("click", function (event) {
    const rect = cake.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    addCandle(left, top);
  });

  function isBlowing() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;

    return average > 50; //ETO CHANGEEEEEE
  }

  function blowOutCandles() {
    let blownOut = 0;

    // Only check for blowing if there are candles and at least one is not blown out
    if (candles.length > 0 && candles.some((candle) => !candle.classList.contains("out"))) {
      if (isBlowing()) {
        candles.forEach((candle) => {
          if (!candle.classList.contains("out") && Math.random() > 0.5) {
            candle.classList.add("out");
            blownOut++;
          }
        });
      }

      if (blownOut > 0) {
        updateCandleCount();
      }

      // If all candles are blown out, trigger confetti after a small delay
      if (candles.every((candle) => candle.classList.contains("out"))) {
        setTimeout(function() {
          triggerConfetti();
          endlessConfetti(); // Start the endless confetti
        }, 200);
        audio.play();
      }
    }
  }



  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        setInterval(blowOutCandles, 200);
      })
      .catch(function (err) {
        console.log("Unable to access microphone: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
});

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function endlessConfetti() {
  setInterval(function() {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0 }
    });
  }, 1000);
}
// Envelope Preloader Logic
document.addEventListener('DOMContentLoaded', function () {
  const envelope = document.getElementById('envelope');
  const envelopePreloader = document.getElementById('envelopePreloader');
  const mainContent = document.getElementById('mainContent');

  envelope.addEventListener('click', function () {
      // Open the envelope
      envelope.classList.add('open');

      // Create confetti effect
      createConfetti();

      // After envelope opens, transition to main content
      setTimeout(() => {
          envelopePreloader.classList.add('hidden');

          setTimeout(() => {
              mainContent.classList.remove('hidden');
              document.body.style.overflow = 'auto';

              // Trigger confetti again when main content appears
              setTimeout(() => {
                  if (typeof confetti === 'function') {
                      confetti({
                          particleCount: 150,
                          spread: 70,
                          origin: { y: 0.6 }
                      });
                  }
              }, 500);
          }, 300);
      }, 3000);
  });

  // Create confetti animation
  function createConfetti() {
      const container = envelopePreloader;
      const colors = ['#f44336', '#9c27b0', '#4caf50', '#ffeb3b', '#2196f3'];

      for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.width = Math.random() * 10 + 5 + 'px';
          confetti.style.height = confetti.style.width;

          container.appendChild(confetti);

          // Animate confetti
          const animation = confetti.animate([
              { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
              { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
          ], {
              duration: Math.random() * 2000 + 1000,
              easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
          });

          // Remove confetti after animation
          animation.onfinish = () => confetti.remove();
      }
  }
});

// Birthday Greeting Logic
const greetings = [
  {
      id: 1,
      letter: "N",
      date: "1995-08-14",
      hint: "N's Birthday 🎂",
      message: `
          <p class="text-xl font-semibold text-purple-700 mb-2">From 🍁</p>
          <p class="mt-2 text-sm">
             Happiest birthday to our generous and gorgeous prend, kath! kung ano man ang goals mo this year sana ma achieve mo. Looking forward sa ating adventure a.k.a foodtrip lang talaga yon 😂 Stay strong, healthy, and sexy. Kahit lagi mo kaming gino-ghost, nasa gc lang kami nagi-ingay kung need mo makakausap. Bawal kapa kunin ni lord aabot pa tayo 69, 79, 89, 99 samaan mo pa! char! 🤣 ingat ka palagi and god bless you more~ 
          </p>
      `
  },
  {
      id: 2,
      letter: "Y",
      date: "2002-07-15",
      hint: "Y's Birthday 🎂",
      message: `
          <p class="text-xl font-semibold text-purple-700 mb-2">From 🐰</p>
          <p class="text-xl font-semibold">Happy 30th, Ate Lust! 🎉</p>
          <p class="mt-2 text-sm">
              Old enough to know better… young enough to still break the rules. More money, more fun, less stress. Today is all you OWN it, eat, laugh, repeat! 🥳
          </p>
      `
  },
  {
      id: 3,
      letter: "K",
      date: "2000-08-16",
      hint: "K's Birthday 🎂.",
      message: `
          <p class="text-xl font-semibold text-purple-700 mb-2">From 🍪</p>
          <p class="text-xl font-semibold">Happy 30th birthday🎉🥳</p>
          <p class="mt-2 text-sm">
              Cheers to a long and happy life! More money and promotions to come. Thanks for the gifts, really appreciated! 🥹💙
          </p>
      `
  },
  {
      id: 4,
      letter: "R",
      date: "1995-10-19",
      hint: "R's Birthday 🎂",
      message: `
          <p class="text-xl font-semibold text-purple-700 mb-2">From 🐢</p>
          <p class="mt-2 text-sm">
              Happy Happy Happy Birthday MARIA ISABELLA KATHERINA A.K.A "KATH"! Wishi washi you watch me nene watchu do a bless and joyful day you dasurv! Always remember that Im always here for you whenever you guys need me, and always here to hear you. I know na in this stage of life busy na tayo sa kanya kanyang buhay but lets bond more and oppa hunting more char! And if wla talaga naka destined tayo mag tayo ng shelter for stray cats and dogs hahaha! Lablots YAKULT everyday, everyday OKEEY!
          </p>
      `
  },
  {
      id: 5,
      letter: "J",
      date: "1996-07-12",
      hint: "J's Birthday 🎂",
      message: `
          <p class="text-xl font-semibold text-purple-700 mb-2">From 🌳</p>
          <p class="mt-2 text-sm">
             Hapii berdeii kathy kath! Salamat for being my friend. Wishing you all the best!  Mahanap mo na sana ang right path! Magpayaman na tayo!
          </p>
      `
  },
  {
      id: 6,
      letter: "I",
      date: "1994-12-29",
      hint: "I's Birthday 🎂",
      message: `
          <p class="text-xl font-semibold text-purple-700 mb-2">From 👨‍👩‍👧‍👧</p>
          <p class="mt-2 text-sm">
              Happy Birthday Katherine Duran wish ko sana magka jowa kana hahah char wish you all the best kath thank you for being laging present sa gala kahit dika nagparamdam sa GC natin in a months na akala namin na shigpay kana hahaha loveyou 🥰❤️ more birthday to come 🎊🎉🎂
          </p>
      `
  }
];

let activeGreeting = null;
let openedGreetings = new Set();

const modal = document.getElementById("modal");
const hintEl = document.getElementById("hint");
const messageBox = document.getElementById("messageBox");

document.querySelectorAll(".letter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
      const letter = btn.getAttribute("data-letter");

      activeGreeting = greetings.find(g => g.letter === letter);

      if (!activeGreeting) {
          alert("No greeting assigned to this letter.");
          return;
      }

      openModal(letter);
  });
});

function openModal(letter) {
  if (openedGreetings.has(activeGreeting.id)) {
      messageBox.innerHTML = `
  <div class="text-center text-purple-600">
      ${activeGreeting.message}
  </div>
`;
      return;
  }
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  const hint = greetings.find(g => g.letter === letter).hint;

  hintEl.textContent = "Hint: " + hint;
  hintEl.classList.remove("hidden");

  document.getElementById("passwordInput").value = "";
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function checkPassword() {
  const input = document.getElementById("passwordInput").value;

  if (!activeGreeting) return;

  if (input === activeGreeting.date) {
      messageBox.innerHTML = `
  <div class="text-center text-purple-600">
      ${activeGreeting.message}
  </div>
`;
      openedGreetings.add(activeGreeting.id);

      // Trigger confetti for correct password
      if (typeof confetti === 'function') {
          confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
          });
      }

      if (openedGreetings.size === greetings.length) {
          // Show cake after a delay
          setTimeout(() => {
              document.getElementById("greetings").classList.add("hidden");
              document.getElementById("cake").classList.remove("hidden");
              document.getElementById("cake").classList.add("flex");

              // Big confetti when cake appears
              if (typeof confetti === 'function') {
                  confetti({
                      particleCount: 300,
                      spread: 100,
                      origin: { y: 0.6 }
                  });
              }
          }, 10000);
      }
      closeModal();
  } else {
      hintEl.textContent = "Hint: " + activeGreeting.hint;
      hintEl.classList.remove("hidden");

      // Shake animation for wrong password
      const inputField = document.getElementById("passwordInput");
      inputField.classList.add('animate-shake');
      setTimeout(() => inputField.classList.remove('animate-shake'), 500);
  }
}

function showGreetingsAgain() {
  document.getElementById("cake").classList.add("hidden");
  document.getElementById("cake").classList.remove("flex");
  document.getElementById("greetings").classList.remove("hidden");
}

// Add shake animation for wrong password
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  .animate-shake {
      animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);
