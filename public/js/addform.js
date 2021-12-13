// function addForm_design(i) {
//     var bigparent = document.getElementById('form_area');

//     var div_data = document.createElement('div');
//     div_data.classList.add("box");
//     div_data.id = i;
//     bigparent.appendChild(div_data);

//     var parent = document.getElementById(i);

//     var textarea_data = document.createElement('textarea');
//     textarea_data.id = 'inputform_' + i;
//     textarea_data.classList.add("text");
//     textarea_data.cols = '100';
//     textarea_data.rows = '5';
//     parent.appendChild(textarea_data);

//     var button_data = document.createElement('button');
//     button_data.id = 'playB_' + i;
//     button_data.onclick = function () { playBtn(this); }
//     button_data.innerHTML = '再生';
//     button_data.classList.add("playB")
//     parent.appendChild(button_data);

//     var button_data = document.createElement('button');
//     button_data.id = 'saveB_' + i;
//     button_data.onclick = function () { textSave(this); }
//     button_data.innerHTML = '保存';
//     button_data.classList.add("saveB")
//     parent.appendChild(button_data);

//     var button_data = document.createElement('button');
//     button_data.id = 'subWindow_' + i;
//     button_data.href = "javascript:void(0);";
//     button_data.onclick = "openWindow1('subWindow.html', 'child_window1')";
//     button_data.innerHTML = 'デザイン';
//     button_data.classList.add("subwindow");
//     parent.appendChild(button_data);

//     var button_data = document.createElement('button');
//     button_data.id = 'deleteB_' + i;
//     button_data.onclick = function () { deleteBtn(this); }
//     button_data.innerHTML = '削除';
//     button_data.classList.add("deleteB")
//     parent.appendChild(button_data);
// }

// function addForm(j) {
//     var bigparent = document.getElementById('form_area');

//     var div_data = document.createElement('div');
//     div_data.classList.add("box");
//     div_data.id = j;
//     bigparent.appendChild(div_data);

//     var parent = document.getElementById(j);

//     var textarea_data = document.createElement('textarea');
//     textarea_data.id = 'inputform_notd' + j;
//     textarea_data.classList.add("notd_text");
//     textarea_data.cols = '100';
//     textarea_data.rows = '5';
//     parent.appendChild(textarea_data);

//     var button_data = document.createElement('button');
//     button_data.id = 'playB_notd' + j;
//     button_data.onclick = function () { playBtn(this); }
//     button_data.innerHTML = '再生';
//     button_data.classList.add("playB")
//     parent.appendChild(button_data);

//     var button_data = document.createElement('button');
//     button_data.id = 'saveB_notd' + j;
//     button_data.onclick = function () { textSave(this); }
//     button_data.innerHTML = '保存';
//     button_data.classList.add("saveB")
//     parent.appendChild(button_data);

//     var button_data = document.createElement('button');
//     button_data.id = 'notd' + j;
//     button_data.onclick = function () { deleteBtn(this); }
//     button_data.innerHTML = '削除';
//     button_data.classList.add("deleteB")
//     parent.appendChild(button_data);
// }