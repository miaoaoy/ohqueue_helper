/**
 * Returns if the queue is open.
 * @returns True if queue is open.
 */
function isQueueOpen() {
  const status = document.getElementById("closed").innerText;
  // Status is either "open" or "closed"
  return status == "open";
}

function clickElem(elem) {
  const rect = elem.getBoundingClientRect();
  const x = rect.left + (rect.right - rect.left) / 2;
  const y = rect.top + (rect.bottom - rect.top) / 2;
  document.elementFromPoint(x, y).click();
}

function findSelectWrapper(text) {
  // Get all divs with classes that begin with "input-field"
  const lst = document.querySelectorAll('div[class^="input-field"]');

  // Find the element that contains a label with "Your location"
  var locationElem;
  for (const elem of lst) {
    const label = elem.children[1];
    if (label.textContent == text) {
      locationElem = elem;
      break;
    }
  }
  // Sending a click to the middle of the selectWrapper
  const selectWrapper = locationElem.children[0];
  return selectWrapper;
}

async function toggleLocationSetting() {
  var selectWrapper = findSelectWrapper("Your location");
  clickElem(selectWrapper);

  // Sleep for a short interval
  await new Promise((res) => setTimeout(res, 200));

  // Refresh to find the most recent version
  selectWrapper = findSelectWrapper("Your location");
  // Find the list of location options
  const options = selectWrapper.querySelectorAll('ul[id^="select-options"]')[0];

  for (var i = 0; i < options.children.length; i++) {
    const currOption = options.children[i];
    // Check if the option has a label that is not empty
    const label = currOption.firstChild.innerText;
    // console.log(label);
    // console.log(currOption);

    if (label != "") {
      clickElem(currOption);
      return;
    }
  }
}

async function toggleTopicSetting() {
  var selectWrapper = findSelectWrapper("Topic");
  clickElem(selectWrapper);

  // Sleep for a short interval
  await new Promise((res) => setTimeout(res, 200));

  // Refresh to find the most recent version
  selectWrapper = findSelectWrapper("Topic");
  // Find the list of location options
  const options = selectWrapper.querySelectorAll('ul[id^="select-options"]')[0];

  for (var i = 0; i < options.children.length; i++) {
    const currOption = options.children[i];
    // Check if the option has a label that is not empty
    const label = currOption.firstChild.innerText;
    // console.log(label);
    // console.log(currOption);

    // First option is a dummy option
    if (label != "What do you need help with?") {
      //   console.log("found");
      //   console.log(currOption);
      clickElem(currOption);
      return;
    }
  }
}

// function inputQuestion() {
//   const textarea = document.querySelectorAll(
//     'textarea[class^="materialize-textarea"]'
//   )[0];
//   clickElem(textarea);
//   const question = "This is a dummy question.";
//   // The textarea cannot be changed directly using the value attribute
//   // So manually input the key strokes
// }

// async function strokes() {
//   await new Promise((res) => setTimeout(res, 1000));
//   console.log("click");
//   document.dispatchEvent(new KeyboardEvent("keypress", { key: "a" }));

async function run() {
  if (!isQueueOpen()) {
    console.log("Queue is not opened yet. Waiting...");
  }
  // Wait for queue to open
  while (!isQueueOpen()) {
    await new Promise((res) => setTimeout(res, 50));
  }
  console.log("Joining queue...");
  await enterQueue();
  console.log("Sucessfully joined queue.");
}

async function enterQueue() {
  await toggleLocationSetting();
  await toggleTopicSetting();
  clickAskQuestionButton();
}

function clickAskQuestionButton() {
  const t = document.querySelectorAll('a[id^="submit_new_q"]')[0];
  t.click();
}
