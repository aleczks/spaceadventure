let hero = document.getElementById("hero");
let game = document.getElementById("game");
let score = document.getElementById("score");

let bottom = 0;
let left = 50;
let enemyId = 0;

var jumping = 0;
function gamePage() {
  createEnemy();
  let gravity = setInterval(() => {
    var heroTop = parseInt(
      window.getComputedStyle(hero).getPropertyValue("top")
    );

    // hero hoppar upp 5px
    if (jumping == 0) {
      hero.style.top = (heroTop + 5) + "px";
    }

    //game is 80vh, checking that player is inside that
    if (heroTop > document.documentElement.clientHeight * 0.8) {
      gameOver();
      clearInterval(gravity);
    }

    hero.style.top = heroTop + 3 + "px";
  }, 10);
  document.addEventListener("keydown", (e) => {
    if (e.repeat) {
      return;
    } else if (e.key == " ") {
      jump();
    }

  });
}
function jump() {
  jumping = 1;
  let jumpCount = 0;
  var jumpInterval = setInterval(function () {
    var heroTop = parseInt(
      window.getComputedStyle(hero).getPropertyValue("top")
    );
    if ((heroTop > 6) && (jumpCount < 15)) {
      hero.style.top = (heroTop - 8) + "px";
    }
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
}

// START SCREEN
function startScreen() {
  let start = document.getElementById("startScreen");
  let startBtn = document.getElementById("startBtn");
  let wrapper = document.getElementById("wrapper");
  let game = document.getElementById("game");
  wrapper.style.display = "none";
  start.style.display = "flex";
  game.style.display = "none";
  gameOverScreenBody.style.display = "none";

  startBtn.addEventListener("click", () => {

    start.style.display = "none";
    game.style.display = "block";
    gamePage();
    hero.style.top = 0 + "px";
  });
}

function gameOver() {
  let wrapper = document.getElementById("wrapper");
  let game = document.getElementById("game");

  game.style.display = "none";
  wrapper.style.display = "block";
  gameOverScreenBody.style.display = "block";
  gameOverText.innerText = "GAME OVER";
  quitGameBtn.innerText = "Restart?";

  quitGameBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

function createEnemy() {
  var heroTop = parseInt(
    window.getComputedStyle(hero).getPropertyValue("top")
  );

  enemyId++;
  let enemy = document.createElement("div");
  enemy.classList = "enemy";

  let enemyUnder = document.createElement("div");
  enemyUnder.classList = "enemyUnder";
  //game is 60vw wide, setting left to 70% to spawn it just outside screen
  let enemyLeft = document.documentElement.clientWidth * 0.7;
  let enemyBottom = Math.round(Math.round(Math.random() * 300) / 10) * 7;

  enemy.style.left = enemyLeft + "px";
  enemy.style.height = enemyBottom + "px";
  enemy.id = enemyId;

  enemyUnder.style.left = enemyLeft + "px";
  enemyUnder.style.height = 400 - enemyBottom + "px";
  enemyUnder.id = "enemyUnder id is" + enemyId;

  let move = setInterval(() => {
    let heroTop = parseInt(
      window.getComputedStyle(hero).getPropertyValue("top")
    );
    enemyLeft -= 30; //hur snabbt spelet rör sig framåt
    enemy.style.left = enemyLeft + "px";
    enemyUnder.style.left = enemyLeft + "px";

    console.log("heroTop", heroTop);
    console.log("enemyBottom", enemyBottom);
    console.log("enemyLeft", enemyLeft);
    if (enemyLeft > 50 && enemyLeft < 200) {
      console.log("enemy i s close")

      //checking if hero is high enough to touch top enemy, 
      //enemyBottom is the bottom pixel of the top enemy
      //heroTop is the top pixel of the hero
      if (heroTop < (enemyBottom)) {
        console.log("hero is hit from above");
        gameOver();
      }
      //checking if hero is further down from the top enemy
      //than the hole is high minus the height of the hero
      else if (heroTop > (enemyBottom + 320)) {
        console.log("hero is hit from below");
        gameOver();
      }
    }
    if (enemyLeft < 0) {

      clearInterval(move);
      enemy.remove();
      enemyUnder.remove();
      createEnemy();
    }
  }, 80);

  game.appendChild(enemy);
  game.appendChild(enemyUnder);
}

startScreen();