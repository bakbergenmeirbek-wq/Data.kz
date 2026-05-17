/**
 * ChurnLens — chatbot.js
 * Claude API chatbot with conversation history and typewriter effect
 */

// ═══════════════════════════════════════════════════════════════
// YOUR API KEY HERE — replace YOUR_API_KEY_HERE with your key
// ═══════════════════════════════════════════════════════════════
const CHAT_API_KEY = 'YOUR_API_KEY_HERE';

const CHAT_MODEL = 'claude-sonnet-4-20250514';
const CHAT_API_URL = 'https://api.anthropic.com/v1/messages';

const CHAT_SYSTEM =
  'Сіз тұтынушыларды ұстап қалу (churn rate) тақырыбы бойынша маман AI-боттсыз. Барлық жауаптарды қазақ тілінде, қысқаша және анық беріңіз.';

(function () {
  'use strict';

  const messagesEl = document.getElementById('chat-messages');
  const inputEl = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const chips = document.querySelectorAll('.quick-replies .chip');

  if (!messagesEl || !inputEl) return;

  const conversationHistory = [];

  function addBubble(text, role) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function typewriter(el, text, speed = 25) {
    return new Promise((resolve) => {
      let i = 0;
      el.textContent = '';
      function tick() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          messagesEl.scrollTop = messagesEl.scrollHeight;
          setTimeout(tick, speed);
        } else resolve();
      }
      tick();
    });
  }

  async function sendMessage(text) {
    const userText = text.trim();
    if (!userText) return;

    inputEl.value = '';
    addBubble(userText, 'user');
    conversationHistory.push({ role: 'user', content: userText });

    const botBubble = addBubble('...', 'bot');
    console.log('[ChurnLens] Chat message:', userText);

    if (CHAT_API_KEY === 'YOUR_API_KEY_HERE') {
      const demo = getDemoReply(userText);
      await typewriter(botBubble, demo);
      conversationHistory.push({ role: 'assistant', content: demo });
      return;
    }

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CHAT_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: CHAT_MODEL,
          max_tokens: 1000,
          system: CHAT_SYSTEM,
          messages: conversationHistory,
        }),
      });

      console.log('[ChurnLens] Chat API status:', response.status);

      if (!response.ok) {
        throw new Error(`API қатесі: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.content?.[0]?.text || 'Жауап алынбады.';
      console.log('[ChurnLens] Chat reply:', reply);

      conversationHistory.push({ role: 'assistant', content: reply });
      await typewriter(botBubble, reply);
    } catch (err) {
      console.error('[ChurnLens] Chat error:', err);
      await typewriter(
        botBubble,
        'Қате орын алды. API кілтін тексеріңіз немесе кейінірек қайталаңыз.'
      );
    }
  }

  function getDemoReply(q) {
    const lower = q.toLowerCase();
    if (lower.includes('дегеніміз') || lower.includes('не')) {
      return 'Churn Rate — белгілі кезеңде қызметтен кеткен тұтынушылардың жалпы базаға қатынасы. Мысалы, 100 тұтынушыдан 27 кетсе, churn rate 27% болады.';
    }
    if (lower.includes('азайту') || lower.includes('қалай')) {
      return 'Churn азайту үшін: 1) жекелендірілген ұсыныстар, 2) лоялдық бағдарламасы, 3) ерте кету белгілерін болжамдау, 4) тұтынушы қанағаттануын өлшеу.';
    }
    if (lower.includes('лоялдық')) {
      return 'Лоялдық бағдарламасы — бонус, жеңілдік немесе эксклюзивті мүмкіндіктер арқылы тұтынушыны ұстап қалу. Нәтиже: қайта сатып алу жиілігі артады, churn төмендейді.';
    }
  return 'Мысал: телеком компаниясында ай сайын 3% churn болса, жылдық тұтынушы базасының ~30%-ы жоғалуы мүмкін. Бұл деректерді кестеде талдауға болады.';
  }

  sendBtn?.addEventListener('click', () => sendMessage(inputEl.value));
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => sendMessage(chip.textContent));
  });

  addBubble(
    'Сәлеметсіз бе! Мен Churn Rate бойынша AI көмекшісімін. Сұрақ қойыңыз.',
    'bot'
  );

  console.log('[ChurnLens] chatbot.js initialized');
})();
