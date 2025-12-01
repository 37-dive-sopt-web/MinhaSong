import { members, getData } from './members.js';

const applyButton = document.querySelector('.apply-button');
const resetButton = document.querySelector('.reset-button');
const checkAll = document.querySelector('.th__checkbox');
const checkArray = document.querySelectorAll('.td__checkbox');
const deleteButton = document.querySelector('.delete-button');
const addButton = document.querySelector('.add-button');
const openButton = document.querySelector('.open-button');
const closeButton =document.querySelector('.close-button');
const modalSection = document.querySelector('.modal-section');  
const modalSectionOverlay = document.querySelector('.modal-section--overlay');

// 데이터 세팅
if (!getData()) {
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

  if (data.length === 0) {
    tr += `
      <tr class="row">
        <td colspan="8">조건에 맞는 데이터가 없어요.</td>
      </tr>
    `;
  } else {
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
  }

  tbody.innerHTML = tr;
}

// 필터링
function filteredByField(data, field, value) {
  if (field === 'gender') {
    return data.filter((member) => `${value}` === '' ? true: fromEnglishToKorean(member[`${field}`]) === `${value}`);
  } else if (field === 'codeReviewGroup' || field === 'age') {
    return data.filter((member) => value === 0 ? true: member[`${field}`] === value);
  } else {
    return data.filter((member) => `${value}` === '' ? true: member[`${field}`] === `${value}`);
  }
}

function applyFilter() {
  const originalData = getData();
  // const name = document.querySelector('.search-section__form #name').value;
  // const englishName = document.querySelector('.search-section__form #english_name').value;
  // const github = document.querySelector('.search-section__form #github').value;
  // const gender = document.querySelector('.search-section__form #gender').value;
  // const role = document.querySelector('.search-section__form #role').value;
  // const codeReviewGroup = Number(document.querySelector('.search-section__form #code_review_group').value);
  // const age = Number(document.querySelector('.search-section__form #age').value);
  const name = document.querySelector('.search-name').value;
  const englishName = document.querySelector('.search-english-name').value;
  const github = document.querySelector('.search-github').value;
  const gender = document.querySelector('.search-gender').value;
  const role = document.querySelector('.search-role').value;
  const codeReviewGroup = Number(document.querySelector('.search-code-review-group').value);
  const age = Number(document.querySelector('.search-age').value);

  console.log(name);

  const filteredData = originalData.filter((member) =>
    filteredByField(originalData, 'name', name).includes(member)
    && filteredByField(originalData, 'englishName', englishName).includes(member)
    && filteredByField(originalData, 'github', github).includes(member)
    && filteredByField(originalData, 'gender', gender).includes(member)
    && filteredByField(originalData, 'role', role).includes(member)
    && filteredByField(originalData, 'codeReviewGroup', codeReviewGroup).includes(member)
    && filteredByField(originalData, 'age', age).includes(member)
  );

  renderTable(filteredData);
}

function resetFilter() {
  const originalData = getData();
  const form = document.querySelector('.search-section__form');

  form.reset();

  renderTable(originalData);
}

// 체크박스
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

// 삭제
function deleteRow() {
  const checkArray = document.querySelectorAll('.td__checkbox');

  const originalData = getData();
  const filteredData = originalData.filter((_, idx) => !checkArray[idx].checked);

  localStorage.setItem('membersData', JSON.stringify(filteredData));

  const updatedData = getData();

  renderTable(updatedData);

  checkAll.checked && (checkAll.checked = !checkAll.checked);
}

// 추가
function addRow(e) {
  const originalData = getData();
  const form = document.querySelector('.modal-section__form');
  const id = originalData[originalData.length - 1].id + 1;
  const name = document.querySelector('.modal-name').value;
  const englishName = document.querySelector('.modal-english-name').value;
  const github = document.querySelector('.modal-github').value;
  const gender = document.querySelector('.modal-gender').value;
  const role = document.querySelector('.modal-role').value;
  const codeReviewGroup = Number(document.querySelector('.modal-code-review-group').value);
  const age = Number(document.querySelector('.modal-age').value);

  const newData = [ ...originalData, {id, name, englishName, github, gender, role, codeReviewGroup, age}];

  if (!name || !englishName || !github || !gender || !role || !codeReviewGroup || !age) {
    alert('모든 필드를 입력해주세요.');
    e.stopPropagation();
  } else {
    localStorage.setItem('membersData', JSON.stringify(newData));
    form.reset();
    closeModal(e);
  }

  const updatedData = getData();

  renderTable(updatedData);
}

// 모달
function openModal() {
  modalSectionOverlay.style.display = 'block';
  modalSectionOverlay.style.position = 'fixed';
}

function closeModal(e) {
  if (!modalSection.contains(e.target) || closeButton.contains(e.target) || e.target.className === 'add-button') {
    modalSectionOverlay.style.display = 'none';
  }
}

renderTable(getData());
applyButton.addEventListener('click', applyFilter);
resetButton.addEventListener('click', resetFilter);
checkAll.addEventListener('click', selectAll);
checkArray.forEach((check) => check.addEventListener('click', (e) => selectOne(e)));
deleteButton.addEventListener('click', deleteRow);
addButton.addEventListener('click', (e) => addRow(e));
openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', (e) => closeModal(e));
modalSectionOverlay.addEventListener('click', (e) => closeModal(e));