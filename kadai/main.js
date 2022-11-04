//canvas部分
for (let i = 1; i < 11; i++) {
  $("#agent").append(
    `<div class="flex flex-col dragcontainer w-10 h-10"><div class="drag-and-drop bg-green-300 rounded-full p-0.5 cursor-pointer"id="red-box"><img src="./img/download-${i}.png" alt="" class="w-8 h-8" /></div></div>`
  );
}
for (let i = 11; i < 21; i++) {
  $("#agent2").append(
    `<div class="flex flex-col dragcontainer w-10 h-10"><div class="drag-and-drop bg-green-300 rounded-full p-0.5 cursor-pointer"id="red-box"><img src="./img/download-${i}.png" alt="" class="w-8 h-8" /></div></div>`
  );
}
for (let i = 1; i < 11; i++) {
  $("#enemy-agent").append(
    `<div class="flex flex-col dragcontainer w-10 h-10"><div class="drag-and-drop bg-red-300 rounded-full p-0.5 cursor-pointer"id="red-box"><img src="./img/download-${i}.png" alt="" class="w-8 h-8" /></div></div>`
  );
}
for (let i = 11; i < 21; i++) {
  $("#enemy-agent2").append(
    `<div class="flex flex-col dragcontainer w-10 h-10"><div class="drag-and-drop bg-red-300 rounded-full p-0.5 cursor-pointer"id="red-box"><img src="./img/download-${i}.png" alt="" class="w-8 h-8" /></div></div>`
  );
}
// mapArray
const mapBtnArray = ["BREEZE", "SPLIT", "ICEBOX", "HAVEN", "ASCENT"];
for (let i = 0; i < mapBtnArray.length; i++) {
  $("#mapBtn").append(
    `<button class="mx-3 bg-transparent hover:opacity-70 text-black font-semibold py-3 px-12 border border-blue-300 hover:border-transparent rounded bg-yellow-100 focus:ring-4 focus:ring-blue-300 focus:outline-none" id=${mapBtnArray[i]}>${mapBtnArray[i]}</button>`
  );
}
$("#BREEZE").on("click", function () {
  $("#map").attr("style", "background-image: url(./img/breeze.webp)");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
$("#SPLIT").on("click", function () {
  $("#map").attr("style", "background-image: url(./img/split.webp)");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
$("#HAVEN").on("click", function () {
  $("#map").attr("style", "background-image: url(./img/haven.webp)");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
$("#ICEBOX").on("click", function () {
  $("#map").attr("style", "background-image: url(./img/icebox.jpg)");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
$("#ASCENT").on("click", function () {
  $("#map").attr("style", "background-image: url(./img/ascent.webp)");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
$("#atk").on("click", function () {
  $("#map").attr(
    "class",
    "border-2 border-red-300 bg-dark-900 bg-center bg-cover transform rotate-0"
  );
});
$("#def").on("click", function () {
  $("#map").attr(
    "class",
    "border-2 border-red-300 bg-dark-900 bg-center bg-cover transform rotate-180"
  );
});

let drawing = false;
let clickPen = false;
// 前回の座標を記録する（初期値：０）
let before_x = 0;
let before_y = 0;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.addEventListener("mousemove", draw_canvas);
// マウスをクリックしてる時
canvas.addEventListener("mousedown", function (e) {
  if (clickPen) {
    drawing = true;
    let rect = e.target.getBoundingClientRect();
    before_x = e.clientX - rect.left;
    before_y = e.clientY - rect.top;
  }
});
// マウスをクリックしてない時
canvas.addEventListener("mouseup", function () {
  drawing = false;
});

// 描画の処理
function draw_canvas(e) {
  // drawingがtrueじゃなかったら返す
  if (!drawing) {
    return;
  }
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  let w = document.getElementById("width").value;
  let color = document.getElementById("color").value;
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);
  // 描画
  ctx.lineCap = "round";
  ctx.strokeStyle = "white";
  ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
  ctx.lineWidth = 2;
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.moveTo(before_x, before_y);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  // 描画最後の座標を前回の座標に代入する
  before_x = x;
  before_y = y;
}

// クリアボタンクリック時
// クリアボタンクリックした時にアラートを表示
function delete_canvas() {
  ret = confirm("書き込んだ内容を削除しますか？");
  // アラートで「OK」を選んだ時
  if (ret == true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

let pen = document.getElementById("pencil");
let era = document.getElementById("eraser");
// 鉛筆と消しゴムの切り替え

function tool(btnNum) {
  // クリックされボタンが鉛筆だったら
  if (btnNum == 1) {
    ctx.globalCompositeOperation = "source-over";
    pen.className = "active";
    era.className = "";
  }
  // クリックされボタンが消しゴムだったら
  else if (btnNum == 2) {
    ctx.globalCompositeOperation = "destination-out";
    pen.className = "";
    era.className = "active";
  }
}
$("#editIcon").on("click", function () {
  if (clickPen) {
    clickPen = false;
    $("#editIcon").css("opacity", "100%");
    return;
  }
  clickPen = true;
  $("#editIcon").css("opacity", "50%");
});
$("#changeColor").on("click", function () {
  clickPen = true;
  $("#editIcon").css("opacity", "50%");
});

(function () {
  //要素の取得
  let elements = document.getElementsByClassName("drag-and-drop");

  //要素内のクリックされた位置を取得するグローバル（のような）変数
  let x;
  let y;

  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mdown, false);
    elements[i].addEventListener("touchstart", mdown, false);
  }

  //マウスが押された際の関数
  function mdown(e) {
    //クラス名に .drag を追加
    this.classList.add("drag");

    //タッチデイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
      let event = e;
    } else {
      let event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
  }

  //マウスカーソルが動いたときに発火
  function mmove(e) {
    //ドラッグしている要素を取得
    let drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    if (e.type === "mousemove") {
      let event = e;
    } else {
      let event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //マウスが動いた場所に要素を動かす
    drag.style.top = event.pageY - y + "px";
    drag.style.left = event.pageX - x + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);
  }

  //マウスボタンが上がったら発火
  function mup(e) {
    let drag = document.getElementsByClassName("drag")[0];

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);

    //クラス名 .drag も消す
    drag.classList.remove("drag");
  }
})();
var targetElement = document.getElementById("test");
var clientRect = targetElement.getBoundingClientRect();

// 画面内の位置
var x = clientRect.left;
var y = clientRect.top;
for (
  var a = [
      ["x", x],
      ["y", y],
    ],
    i = a.length;
  i--;

) {
  document.getElementById(a[i][0]).textContent = a[i][1];
}
