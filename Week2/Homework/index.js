import { members } from './members.js';

// 데이터 세팅
if (!localStorage.getItem("membersData")) {
  localStorage.setItem("membersData", JSON.stringify(members));
}

// 유틸 함수
function fromEnglishToKorean(english) {
  return english === 'female' ? '여자' : '남자';
}

// 테이블 렌더링
function renderTable(data) {
  const resultSection = document.querySelector('.result-section');
  const tbody = document.querySelector('.result-section__table tbody');
  let tr = '';

  data.forEach((member) => {
    tr += `
      <tr class="row">
        <td>
          <input type="checkbox" name="member" class="td__checkbox" value="${member.id}" />
        </td>
        <td>${member.name}</td>
        <td>${member.englishName}</td>
        <td>
          <a href="https://github.com/${member.github}" target="_blank">
            <span>${member.github}</span>
          </a>
        </td>
        <td>${fromEnglishToKorean(member.gender)}</td>
        <td>${member.role}</td>
        <td>${member.codeReviewGroup}</td>
        <td>${member.age}</td>
      </tr>
    `;
  });

  tbody.innerHTML = tr;

  if (!tr) {
    const newElement = document.createElement('div');
    newElement.textContent = '조건에 맞는 데이터가 없어요.';
    newElement.style.textAlign = 'center';
    resultSection.appendChild(newElement);
  }
}

renderTable(JSON.parse(localStorage.getItem('membersData')));

// 필터링
const applyButton = document.querySelector('.apply-button');
const resetButton = document.querySelector('.reset-button');

function filteredBy(data, field, value) {
  if (field === 'gender') {
    return data.filter((member) => `${value}` === '' ? true: fromEnglishToKorean(member[`${field}`]) === `${value}`);
  } else if (field === 'codeReviewGroup' || field === 'age') {
    return data.filter((member) => value === 0 ? true: member[`${field}`] === value);
  } else {
    return data.filter((member) => `${value}` === '' ? true: member[`${field}`] === `${value}`);
  }
}

function applyFilter() {
  const originalData = JSON.parse(localStorage.getItem('membersData'));
  const name = document.querySelector('.search-section__form .row:nth-child(1) input').value;
  const englishName = document.querySelector('.search-section__form .row:nth-child(2) input').value;
  const github = document.querySelector('.search-section__form .row:nth-child(3) input').value;
  const gender = document.querySelector('.search-section__form .row:nth-child(4) select').value;
  const role = document.querySelector('.search-section__form .row:nth-child(5) select').value;
  const codeReviewGroup = Number(document.querySelector('.search-section__form .row:nth-child(6) input').value);
  const age = Number(document.querySelector('.search-section__form .row:nth-child(7) input').value);

  const filteredData = originalData.filter((member) =>
    filteredBy(originalData, 'name', name).includes(member)
    && filteredBy(originalData, 'englishName', englishName).includes(member)
    && filteredBy(originalData, 'github', github).includes(member)
    && filteredBy(originalData, 'gender', gender).includes(member)
    && filteredBy(originalData, 'role', role).includes(member)
    && filteredBy(originalData, 'codeReviewGroup', codeReviewGroup).includes(member)
    && filteredBy(originalData, 'age', age).includes(member)
  );

  renderTable(filteredData);
}

function resetFilter() {
  const originalData = JSON.parse(localStorage.getItem('membersData'));
  const form = document.querySelector('.search-section__form');

  form.reset();

  renderTable(originalData);
}

applyButton.addEventListener('click', applyFilter);
resetButton.addEventListener('click', resetFilter);

// 체크박스
const checkAll = document.querySelector('.th__checkbox');
const checkArray = document.querySelectorAll('.td__checkbox');

function selectAll() {
  checkArray.forEach((check) => {
    check.checked = checkAll.checked;
    check.parentNode.parentNode.className = check.checked ? 'row--selected' : 'row';
  })
}

function selectOne(e) {
  e.target.parentNode.parentNode.className = e.target.checked ? 'row--selected' : 'row';
  const totalCnt = checkArray.length;
  let checkedCnt = 0
  checkArray.forEach((check) => check.checked && checkedCnt++);
  checkAll.checked = (totalCnt === checkedCnt);
}

checkAll.addEventListener('click', selectAll);
checkArray.forEach((check) => check.addEventListener('click', (e) => selectOne(e)));

// 삭제
const deleteButton = document.querySelector('.delete-button');

function deleteRow() {
  const originalData = JSON.parse(localStorage.getItem('membersData'));
  const filteredData = originalData.filter((_, idx) => !checkArray[idx].checked);

  localStorage.setItem('membersData', JSON.stringify(filteredData));

  const updatedData = JSON.parse(localStorage.getItem('membersData'));

  renderTable(updatedData);

  checkAll.checked && (checkAll.checked = !checkAll.checked);
}

deleteButton.addEventListener('click', deleteRow);

// 추가
const addButton = document.querySelector('.add-button');

function addRow(e) {
  const originalData = JSON.parse(localStorage.getItem('membersData'));
  const form = document.querySelector('.modal-section__form');
  const id = originalData[originalData.length - 1].id + 1;
  const name = document.querySelector('.modal-section__form .row:nth-child(1) input').value;
  const englishName = document.querySelector('.modal-section__form .row:nth-child(2) input').value;
  const github = document.querySelector('.modal-section__form .row:nth-child(3) input').value;
  const gender = document.querySelector('.modal-section__form .row:nth-child(4) select').value;
  const role = document.querySelector('.modal-section__form .row:nth-child(5) select').value;
  const codeReviewGroup = Number(document.querySelector('.modal-section__form .row:nth-child(6) input').value);
  const age = Number(document.querySelector('.modal-section__form .row:nth-child(7) input').value);

  const newData = [ ...originalData, {id, name, englishName, github, gender, role, codeReviewGroup, age}];

  if (!name || !englishName || !github || !gender || !role || !codeReviewGroup || !age) {
    alert('모든 필드를 입력해주세요.');
    e.stopPropagation();
  } else {
    localStorage.setItem('membersData', JSON.stringify(newData));
    form.reset();
    closeModal(e);
  }

  const updatedData = JSON.parse(localStorage.getItem('membersData'));

  renderTable(updatedData);
}

addButton.addEventListener('click', (e) => addRow(e));

// 모달
const openButton = document.querySelector('.open-button');
const closeButton =document.querySelector('.close-button');
const modalSection = document.querySelector('.modal-section');  
const modalSectionOverlay = document.querySelector('.modal-section--overlay');

function openModal() {
  modalSectionOverlay.style.display = 'block';
  modalSectionOverlay.style.position = 'fixed';
}

function closeModal(e) {
  if (!modalSection.contains(e.target) || closeButton.contains(e.target) || e.target.className === 'add-button') {
    modalSectionOverlay.style.display = 'none';
  }
}

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', (e) => closeModal(e));
modalSectionOverlay.addEventListener('click', (e) => closeModal(e));