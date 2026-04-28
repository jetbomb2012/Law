document.addEventListener("DOMContentLoaded", function () {

  const box = document.createElement("div");

  box.innerHTML = `
  <div style="
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 300px;
    max-width: 90%;
    background: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    font-size:14px;
    z-index:9999;
    border-radius: 10px;
  ">
    <div id="chat" style="height:220px; overflow:auto; margin-bottom:8px;"></div>
    <input id="msg"
      placeholder="例如：我要做網站 / AI客服多少錢"
      style="width:70%; padding:5px;">
    <button id="sendBtn" style="width:25%;">送</button>
  </div>
  `;

  document.body.appendChild(box);

  const chat = document.getElementById("chat");
  const input = document.getElementById("msg");
  const btn = document.getElementById("sendBtn");

  // 🧠 開場白
  
  alert("AI JS 啟動");
  chat.innerHTML =
    "<div><b>AI：</b>👋 我是古堡艦隊的AI顧問，我幫你快速抓一下方向。<br>你現在是要做網站，還是想用AI省人力？</div>";

  // 🚀 發送訊息
  async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    btn.disabled = true;
    input.value = "";

    chat.innerHTML += "<div>你：" + msg + "</div>";

    const loadingId = "ai-" + Date.now();
    chat.innerHTML += `<div id="${loadingId}">AI：思考中...</div>`;

    chat.scrollTop = chat.scrollHeight;

    try {
      const res = await fetch("http://47.84.93.23:3001/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: msg })
      });

      const data = await res.json();

      document.getElementById(loadingId).innerHTML =
        "AI：" + (data.reply || "無回應");

    } catch (err) {
      document.getElementById(loadingId).innerHTML =
        "AI：系統忙碌，請稍後再試";
    }

    btn.disabled = false;
    chat.scrollTop = chat.scrollHeight;
  }

  btn.onclick = sendMessage;

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

});