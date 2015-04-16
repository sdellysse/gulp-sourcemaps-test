let display = function (str) {
    let p = document.createElement("p");
    p.innerHTML = str;
    document.querySelector("#main").appendChild(p);
};

module.exports = function () {
    for (let element of [1, 2, 3]) {
        let str = `element: ${element}`;
        console.log(str);
        display(str);
    }
};
