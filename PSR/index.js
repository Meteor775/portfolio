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

    multiply(vector2) {
        return new Vector2(this.x * vector2, this.y * vector2);
    }

    distance(vector2) {
        return Math.sqrt(Math.pow(vector2.y - this.y, 2) + Math.pow(vector2.x - this.x, 2));
    }

    direction(vector2) {
        let dis = this.distance(vector2);
        return new Vector2((vector2.x - this.x) / dis, (vector2.y - this.y)  / dis);
    }
}

function changeType(element, target) {
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
                let distance = new Vector2(0, 0).distance(new Vector2(screen.width, screen.height));
                let aim = null;
                for (let target of targets) {
                    let posB = new Vector2(parseInt(target.style.left, 10), parseInt(target.style.top, 10))
                    let dis = posA.distance(posB);
                    if (dis < 20) {
                        changeType(target, controlElement);
                    } else if (dis < distance) {
                        aim = target;
                        distance = dis;
                    }
                }
                aim = new Vector2(parseInt(aim.style.left, 10), parseInt(aim.style.top, 10))
                let direction = posA.direction(aim).multiply(3);
                element.style.left = parseInt(element.style.left, 10) + direction.x;
                element.style.top = parseInt(element.style.top, 10) +  direction.y;
            }
        }
    }
    
    trace(Paper, Rock);
    trace(Rock, Scissors);
    trace(Scissors, Paper);
}

function play() {
    if (!isPlaying)
        isPlaying = setInterval(main, 50);
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

var addingType = Rock;
var isPlaying = null;

document.getElementsByClassName("bg")[0].addEventListener("click", addItem);
document.getElementById("changePaper").onclick = function () { addingType = Paper; };
document.getElementById("changeScissors").onclick = function () { addingType = Scissors; };
document.getElementById("changeRock").onclick = function () { addingType = Rock; };
document.getElementById("clear").onclick = clear;
document.getElementById("play").addEventListener("click", play);