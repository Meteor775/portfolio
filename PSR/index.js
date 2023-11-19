function addItem(event) {
    let obj = document.createElement("div");
    obj.innerHTML = addingType.text;
    obj.classList.add(addingType.className);
    obj.style.left = event.clientX - 6;
    obj.style.top = event.clientY - 9;
    document.body.appendChild(obj);
}

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static multiply(lhs, rhs) {
        return new Vector2(lhs.x * rhs, lhs.y * rhs);
    }

    static distance(lhs, rhs) {
        return Math.sqrt(Math.pow(rhs.y - lhs.y, 2) + Math.pow(rhs.x - lhs.x, 2));
    }

    static direction(lhs, rhs) {
        let dis = Vector2.distance(lhs, rhs);
        return new Vector2((rhs.x - lhs.x) / dis, (rhs.y - lhs.y)  / dis);
    }
}

function changeItem(element, target) {
    element.innerHTML = target.text;
    element.className = target.className;
}

function main() {
    function trace(controlElement, targetElement) {
        let elements = document.getElementsByClassName(controlElement.className);
        let targets = document.getElementsByClassName(targetElement.className);
        if (elements.length > 0 && targets.length > 0) {
            for (let element of elements) {
                let posA = new Vector2(parseInt(element.style.left, 10), parseInt(element.style.top, 10))
                let distance = Vector2.distance(new Vector2(0, 0), new Vector2(screen.width, screen.height));
                let aim = null;
                for (let target of targets) {
                    let posB = new Vector2(parseInt(target.style.left, 10), parseInt(target.style.top, 10))
                    let dis = Vector2.distance(posA, posB);
                    if (dis < 20) {
                        changeItem(target, controlElement);
                    } else if (dis < distance) {
                        aim = target;
                        distance = dis;
                    }
                }
                if (aim != null) {
                    aim = new Vector2(parseInt(aim.style.left, 10), parseInt(aim.style.top, 10))
                    let direction = Vector2.multiply(Vector2.direction(posA, aim), 3);
                    element.style.left = parseInt(element.style.left, 10) + direction.x;
                    element.style.top = parseInt(element.style.top, 10) +  direction.y;
                }
            }
        }
    }
    
    trace(Paper, Rock);
    setTimeout(trace(Rock, Scissors), 20);
    setTimeout(trace(Scissors, Paper), 20);
}

function play() {
    if (!isPlaying)
        isPlaying = setInterval(main, 60);
    else {
        clearInterval(isPlaying);
        isPlaying = null
    }
}

function clear() {
    function remove(controlElement) {
        let elements = Array.from(document.getElementsByClassName(controlElement.className));
        elements.forEach(element => {
            element.remove();
        });
    }

    remove(Paper);
    remove(Scissors);
    remove(Rock);
    clearInterval(isPlaying);
    isPlaying = null
}

const Paper = {
    text: String.fromCodePoint(0x1F4DD),
    className: "paper",
}

const Scissors = {
    text: String.fromCodePoint(0x2702),
    className: "scissors",
}

const Rock = {
    text: String.fromCodePoint(0x1F5FF),
    className: "rock",
}

var addingType = null;
var isPlaying = null;

function changeType(buttonName, type) {
    let buttons = document.getElementsByClassName("button");
    for (let button of buttons)
        button.style.backgroundColor = null
    addingType = type;
    document.getElementById(buttonName).style.backgroundColor = "Snow";
}
changeType("changePaper", Paper);

document.getElementsByClassName("bg")[0].addEventListener("click", addItem);
document.getElementById("changePaper").onclick = function () { changeType("changePaper", Paper); };
document.getElementById("changeScissors").onclick = function () { changeType("changeScissors", Scissors); };
document.getElementById("changeRock").onclick = function () { changeType("changeRock", Rock); };
document.getElementById("clear").onclick = clear;
document.getElementById("play").addEventListener("click", play);