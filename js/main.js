// 添加视差效果
var image = document.getElementsByClassName('banner-pic-img');
new simpleParallax(image, {
  orientation: 'up',
  scale: 1.2,
  delay: 2,
  transition: 'cubic-bezier(0,0,0,1)',
  maxTransition: 50,
  overflow: true
});

// 添加菜单点击事件
var menuButton = document.getElementById("nav-menu");
menuButton.addEventListener('click',function(){
  if(document.getElementById("body").classList.contains('show-menu')) {
    heoWeb.hideMenu();
  }else {
    heoWeb.showMenu();
  }
},false)

//关闭菜单
$('.menu-list').click(function () {
	heoWeb.hideMenu();
});

//阻止菜单滚动
document.querySelector('.menu-list').addEventListener('wheel',(e)=>{
  e.preventDefault()
})

var heoWeb = {
  //显示菜单
  showMenu: function() {
    document.getElementById("body").classList.add("show-menu");
  },

  hideMenu: function() {
    document.getElementById("body").classList.remove("show-menu");
  },

  //跳转到id
  scrollTo(id) {
    let target = document.getElementById(id);
    if (!target) return;
    let targetPosition = target.offsetTop - 60;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      let run = ease(timeElapsed, startPosition, distance, 600);
      window.scrollTo(0, run);
      if (timeElapsed < 600) requestAnimationFrame(animation);
    }
  
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
}

//滚动页面动画
function scrollToTopWithAnimation() {
  const duration = 600; // in milliseconds
  const startPosition = window.pageYOffset;
  const distance = -window.pageYOffset;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollY);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

//这里是聊天逻辑
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const apiEndpoint = 'https://api.coze.cn/open_api/v2/chat';
    const personalAccessToken = 'Bearer YOUR_PERSONAL_ACCESS_TOKEN';
    const botId = 'YOUR_BOT_ID';

    // Display initial message from the bot
    displayMessage('incoming', 'Hello there! How are you doing today? Just type something if you would like to practice your English.');

    sendButton.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            sendMessage(message);
        }
    });

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const message = userInput.value.trim();
            sendMessage(message);
        }
    });

    function sendMessage(message) {
        // Implement your API call to send the message and handle the response
        console.log('Sending message:', message);

        // For demonstration, we'll simulate a bot response
        setTimeout(() => {
            const simulatedResponse = 'This is a simulated response to your message.';
            displayMessage('incoming', simulatedResponse);
        }, 1000);

        displayMessage('outgoing', message);
        userInput.value = ''; // Clear input after sending
    }

    function displayMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = content;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
})

