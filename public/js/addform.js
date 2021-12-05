function addForm_design(i) {
    var parent = document.getElementById('form_area');

    var texttime_data = document.createElement('p');
    texttime_data.classList.add("time_write");
    texttime_data.innerHTML = "JavaScript";
    texttime_data.id='timetext_'+ i;
    parent.appendChild(texttime_data);

    var textarea_data = document.createElement('textarea');
    textarea_data.id = 'inputform_' + i;
    textarea_data.classList.add("text");
    textarea_data.cols = '100';
    textarea_data.rows = '5';
    parent.appendChild(textarea_data);

    var select_data = document.createElement('select');
    select_data.name = 'motion';
    select_data.id = 'select_' + i;
    select_data.option = 'inputform_' + i;
    select_data.classList.add("select");
    parent.appendChild(select_data);

    var option = document.createElement("option");
    option.text = "サンプル1";
    option.value = "サンプル1";
    option.selected;
    select_data.appendChild(option);
    var option = document.createElement("option");
    option.text = "サンプル2";
    option.value = "サンプル2";
    select_data.appendChild(option);
    var option = document.createElement("option");
    option.text = "サンプル3";
    option.value = "サンプル3";
    select_data.appendChild(option);

    var number_data = document.createElement('input');
    number_data.type = "number";
    number_data.class = "number";
    number_data.id = 'number_' + i;
    number_data.name = 'number' + i;
    number_data.max = "10";
    number_data.min = "0";
    number_data.step = "0.1";
    number_data.placeholder = "開始時間"
    parent.appendChild(number_data);

    var numberf_data = document.createElement('input');
    numberf_data.type = "number";
    numberf_data.id = 'numberf_' + i;
    numberf_data.name = 'numberf' + i;
    numberf_data.max = "10";
    numberf_data.min = "0";
    numberf_data.step = "0.1";
    numberf_data.placeholder = "終了時間"
    numberf_data.classList.add("number");
    parent.appendChild(numberf_data);

    var button_data = document.createElement('button');
    button_data.id = 'playB_' + i;
    button_data.onclick = function () { playBtn(this); }
    button_data.innerHTML = '再生';
    button_data.classList.add("playB")
    // var text_area = document.getElementById(textarea_data.id);
    parent.appendChild(button_data);

    var button_data = document.createElement('button');
    button_data.id = 'saveB_' + i;
    button_data.onclick = function () { textSave(this); }
    button_data.innerHTML = '保存';
    button_data.classList.add("saveB")
    // var text_area = document.getElementById(textarea_data.id);
    parent.appendChild(button_data);

    // var button_data = document.createElement('button');
    // button_data.id = i;
    // button_data.onclick = function () { deleteBtn(this); }
    // button_data.innerHTML = '削除';
    // button_data.classList.add("deleteB")
    // // var text_area = document.getElementById(textarea_data.id);
    // parent.appendChild(button_data);

    i++;
}

function addForm(j){
    var parent = document.getElementById('form_area');

    var textarea_data = document.createElement('textarea');
    textarea_data.id = 'notd_inputform_' + j;
    textarea_data.classList.add("notd_text");
    textarea_data.cols = '100';
    textarea_data.rows = '5';
    parent.appendChild(textarea_data);

    var button_data = document.createElement('button');
    button_data.id = 'notd_playB_' + j;
    button_data.onclick = function () { playBtn(this); }
    button_data.innerHTML = '再生';
    button_data.classList.add("playB")
    // var text_area = document.getElementById(textarea_data.id);
    parent.appendChild(button_data);

    var button_data = document.createElement('button');
    button_data.id = 'notd_saveB_' + j;
    button_data.onclick = function () { textSave(this); }
    button_data.innerHTML = '保存';
    button_data.classList.add("saveB")
    // var text_area = document.getElementById(textarea_data.id);
    parent.appendChild(button_data);

    j++;
}

// function deleteBtn(target) {
//     var target_id = target.id;
//     var parent = document.getElementById('form_area');
//     var ipt_id = document.getElementById('inputform_' + target_id);
//     var pB_id = document.getElementById('playB_' + target_id);
//     var tgt_id = document.getElementById(target_id);
//     var sel_id = document.getElementById('select_' + target_id);
//     var num_id = document.getElementById('number_' + target_id);
//     var numf_id = document.getElementById('numberf_' + target_id);
//     var ttext_id = document.getElementById('timetext_' + target_id);
//     parent.removeChild(ipt_id);
//     parent.removeChild(pB_id);
//     parent.removeChild(tgt_id);
//     parent.removeChild(sel_id);
//     parent.removeChild(num_id);
//     parent.removeChild(numf_id);
//     parent.removeChild(ttext_id);
// }