'use strict';

const addContent = document.getElementById('output');
const addText = document.getElementById('text_input');
const addButton =document.getElementById('trigger');
const tasks = [];
//追加ボタンをクリックした時の挙動 テキストデータもリセット
addButton.addEventListener('click', () => {
  const addTextValue = addText.value;
  const task = {
    text: addTextValue,
    status: '作業中'
    };
  if (addTextValue === '') {
    alert('新規タスクを入力して下さい');
  } else {
    tasks.push(task);
    addText.value = '';
    displayTasks();
  }
});
//tasksの中身をhtml上に表示
const displayTasks = () => {
  while (addContent.firstChild) {
    addContent.removeChild(addContent.firstChild);
  }

  tasks.forEach((todo,index) => {
    const addTr = document.createElement('tr');
    //それぞれのtdを作成
    const addTdId = document.createElement('td');
    const addTdText = document.createElement('td');
    const addTdDelete = document.createElement('td');
    const addTdWorking = document.createElement('td');
    //id 表示
    addTdId.textContent = index;
    addTr.appendChild(addTdId);
    //テキスト表示
    addTdText.textContent = todo.text;
    addTdText.setAttribute('align','center');
    addTr.appendChild(addTdText);
    //削除ボタン作成
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    //削除ボタンを押した時の挙動
    deleteButton.addEventListener('click', () => {
      deleteProcess(index)
    });
    //削除ボタンhtml表示
    addTdDelete.appendChild(deleteButton);
    addTr.appendChild(addTdDelete);
    //作業ボタン作成
    const workingButton = document.createElement('button');
    workingButton.textContent = todo.status;
    //作業ボタンを押した時の挙動
    workingButton.addEventListener('click', () => {
      workStateSwitch(workingButton);
    });
    //作業ボタンhtml表示
    addTdWorking.appendChild(workingButton);
    addTr.appendChild(addTdWorking);
    
    addContent.appendChild(addTr);

    //ラジオボタンの要素を取得
    const inputAll = document.querySelectorAll('input')[0];
    const inputWorking = document.querySelectorAll('input')[1];
    const inputComplete = document.querySelectorAll('input')[2];
    //作業中のボタンを押した時の挙動
      inputWorking.addEventListener('click', () => {
        if (workingButton.textContent === '完了') {
          addTr.classList.add('clear');
        } else {
          addTr.classList.remove('clear')
        }
      });
    //完了のボタンを押した時の挙動
    inputComplete.addEventListener('click', () => {
        if (workingButton.textContent === '作業中') {
          addTr.classList.add('clear');
        } else {
          addTr.classList.remove('clear')
        }
      });
      //すべてのボタンを押した時の挙動
    inputAll.addEventListener('click', () => {
          addTr.classList.remove('clear');
        }
      );
  }); 
};
//削除ボタンの処理
const deleteProcess = (index) => {
  tasks.splice(index, 1);
  displayTasks();
};
// 作業ボタン切り替え処理
const workStateSwitch = (workingButton) =>{
  if (workingButton.textContent === '作業中') {
    workingButton.textContent = '完了';
  } else {
    workingButton.textContent = '作業中';
  }
};
