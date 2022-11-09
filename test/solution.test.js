jest.setTimeout(30000);
const baseURL = process.env.TEST_BASE_URL || "http://localhost:3000";

const msgs = [];
// Show logs from the page inside labeled container.
const onPageConsole = (msg) => {
  console.log(
    `<LOG::page console.${msg.type()}>${msg.text().replace(/\n/g, "<:LF:>")}`
  );
  msgs.push(msg.text());
};

describe("US-01: Basic Game Structure", () => {

  beforeEach(async () => {
    page.on("console", onPageConsole);
    page.on("pageerror", (err) => console.log(err));
    await page.goto(baseURL, { waitUntil: "load" });
  });

  it("has a title e.g. <h1 id='title'>Whack-a-Mole!!</h1>", async () => {
    const title = await page.evaluate(() => {
      const title = document.querySelectorAll("#title");
      return title.length;
     });
    expect(title).not.toBeNull();
    expect(title).toEqual(1);
  });

  it("has 9 holes <div class='hole'>", async () => {
    const holes = await page.evaluate(() => {
      const h = document.querySelectorAll(".hole");
      return h.length;
     });
    expect(holes).not.toBeNull();
    expect(holes).toEqual(9);
  });

  it("has 9 moles <div class='mole'>", async () => {
    const moles = await page.evaluate(() => {
      const m = document.querySelectorAll(".mole");
      return m.length;
     });
    expect(moles).not.toBeNull();
    expect(moles).toEqual(9);
  });

  it("has a 'start' button <button id='start'>start</button>", async () => {
    const start = await page.evaluate(() => {
      const startButton = document.querySelectorAll("#start");
      return startButton.length;
     });
    expect(start).not.toBeNull();
    expect(start).toEqual(1);
  });

  it("has a 'score' <span id='score'>0</span>", async () => {
    const score = await page.evaluate(() => {
      const score = document.querySelectorAll("#score");
      return score.length;
     });
    expect(score).not.toBeNull();
    expect(score).toEqual(1);
  });

  it("has a 'timer' <span id='timer'>0</span>", async () => {
    const timer = await page.evaluate(() => {
      const timer = document.querySelectorAll("#timer");
      return timer.length;
     });
    expect(timer).not.toBeNull();
    expect(timer).toEqual(1);
  });
});

describe("US-02: randomInteger()", () => {
  it("should return a number between 0 - 10 if randomInteger(0, 10)", async () => {
    const randomInteger = await page.evaluate(() => {
      return window.randomInteger(0,10);
    });
    expect(randomInteger).toBeGreaterThanOrEqual(0);
    expect(randomInteger).toBeLessThanOrEqual(10);
  });

  it("should return a number between 600 - 1200 if randomInteger(600, 1200)", async () => {
    const randomInteger = await page.evaluate(() => {
      return window.randomInteger(600,1200);
    });
    expect(randomInteger).toBeGreaterThanOrEqual(600);
    expect(randomInteger).toBeLessThanOrEqual(1200);
  });

});

describe("US-02: setDelay()", () => {
  it("should return 1500 if setDelay('easy')", async () => {
    const delay = await page.evaluate(() => {
      return window.setDelay("easy");
    });
    expect(delay).toEqual(1500);
  });

  it("should return 1000 if setDelay('normal')", async () => {
    const delay = await page.evaluate(() => {
      return window.setDelay("normal");
    });
    expect(delay).toEqual(1000);
  });

  it("should return a random integer between 600 - 1200 if setDelay('hard')", async () => {
    const delay = await page.evaluate(() => {
      return window.setDelay("hard");
    });
    expect(delay).toBeGreaterThanOrEqual(600);
    expect(delay).toBeLessThan(1200);
  });
});

describe("US-02: chooseHole()", () => {
  it("should have a working chooseHole() function that chooses a hole randomly", async () => {
    const hole = await page.evaluate(() => {
      const holes = document.querySelectorAll(".hole");
      const hole = window.chooseHole(holes);
      return hole.classList;
    });
    expect(hole['0']).toEqual("hole");
  });
});

describe("US-03: toggleVisibility()", () => {

  it("should use hole.classList.toggle to toggle the show class", async () => {
    const toggle = await page.evaluate(() => {
      return window.toggleVisibility.toString();
    });
    expect(toggle).toContain("hole.classList.toggle");
  });

  it("should add the show class to a hole", async () => {
    const toggle = await page.evaluate(() => {
      return window.toggleVisibility(window.holes[0]).classList;
    });
    expect(toggle['0']).toContain("hole");
    expect(toggle['1']).toContain("show");
  });
});

describe("US-03: showUp()", () => {

  it("should use the toggleVisibility(hole) function inside showAndHide()", async () => {
    const showAndHide = await page.evaluate(() => {
      return window.showAndHide.toString();
    });
    expect(showAndHide).toContain("toggleVisibility(hole)");
  });

  it("should return an id corresponding to the setTimeout function", async () => {
    const showAndHide = await page.evaluate(() => {
      return window.showAndHide(window.holes[0],10);
    });
    expect(typeof showAndHide).toBe('number');
  });

  it("should use the setDelay(difficulty) function inside showUp()", async () => {
    const showUp = await page.evaluate(() => {
      return window.showUp.toString();
    });
    expect(showUp).toContain("setDelay(difficulty)");
  });

  it("should use the chooseHole(holes) function inside showUp()", async () => {
    const showUp = await page.evaluate(() => {
      return window.showUp.toString();
    });
    expect(showUp).toContain("chooseHole(holes)");
  });

  it("should return an id corresponding to the setTimeout function", async () => {
    const showUp = await page.evaluate(() => {
      return window.showUp();
    });
    expect(typeof showUp).toBe('number');
  });
});

describe("US-03: startGame() and gameOver()", () => {

  it("should call showUp() from the startGame() function", async () => {
    const startGame = await page.evaluate(() => {
      return window.startGame.toString();
    });
    expect(startGame).toContain("showUp()");
  });

  it('should return "game started"', async () => {
    const startGame = await page.evaluate(() => {
      return window.startGame();
    });
    expect(startGame).toContain("game started");
  });

  it('should call showUp() when clicking the start button', async () => {
    await page.click("button[id=start]");
    const content = await page.content();
    expect(content).toContain('hole show');
  });

  it("returns 'game stopped' if time = 0 // gameOver() function", async () => {
    const gameOver = await page.evaluate(() => {
      window.setDuration(0);
      return window.gameOver();
    });
    expect(gameOver).toContain("game stopped");
  });

  it("returns the setTimeout ID if time > 0 // gameOver() function", async () => {
    const gameOver = await page.evaluate(() => {
      window.setDuration(10);
      return window.gameOver();
    });
    // should return the setTimeout id because it calls showUp()
    // and showUp() returns the setTimeout id.
    expect(typeof gameOver).toBe('number');
  });
});

describe("US-04: updateScore() and clearScore()", () => {

  it("should increment score when calling updateScore()", async () => {
    let content = await page.content();
    expect(content).toContain('<span id="score">0</span>');
    const points = await page.evaluate(() => {
      return window.updateScore();
    });
    expect(points).toEqual(1);
    content = await page.content();
    expect(content).toContain('<span id="score">1</span>');
  });

  it("should clear score when calling clearScore()", async () => {
    const points = await page.evaluate(() => {
      window.points = 9;
      return window.clearScore();
    });
    expect(points).toEqual(0);
    const content = await page.content();
    expect(content).toContain('<span id="score">0</span>');
  });
});

describe("US-04 whack()", () => {
  it("should have updateScore() inside of whack()", async () => {
    const whack = await page.evaluate(() => {
      return window.whack.toString();
    });
    expect(whack).toContain("updateScore()");
  });

  it("should increment score when calling whack()", async () => {
    let content = await page.content();
    expect(content).toContain('<span id="score">0</span>');
    const points = await page.evaluate(() => {
      return window.whack();
    });
    expect(points).toEqual(1);
    content = await page.content();
    expect(content).toContain('<span id="score">1</span>');
  });

  it("should call setEventListeners() in the startGame() function", async () => {
    const startGame = await page.evaluate(() => {
      return window.startGame.toString();
    });
    expect(startGame).toContain("setEventListeners()");
  });

  it("should increment score when clicking on mole", async () => {
    const points = await page.evaluate(() => {
      window.startGame();
      const mole = document.querySelectorAll(".mole")[0];
      mole.click();
      const points = document.querySelector("#score").innerHTML;
      return points;
    });
    expect(points).toEqual("1");
  });
});

describe("US-05: startTimer() and updateTimer()", () => {

  it("should update timer every 1000 milliseconds ", async () => {
    const startGamer = await page.evaluate(() => {
      window.startGame();
    });
    await page.waitFor(1000);
    const time = await page.evaluate(() => {
      return document.querySelector("#timer").innerHTML;
    });
    expect(Number(time)).toBeGreaterThan(0);
  });


  it("should call startTimer() in the startGame() function", async () => {
    const startGame = await page.evaluate(() => {
      return window.startGame.toString();
    });
    expect(startGame).toContain("startTimer()");
  });
});
