import { members, setLocalStorage, getLocalStorage } from './members.js';

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
if (!getLocalStorage()) {
  setLocalStorage(members);
}

// 유틸 함수
function fromEnglishToKorean(english) {
  return english === 'female' ? '여자' : '남자';
}

function getFormData(formSelector) {
  const form = document.querySelector(formSelector);
  const formData = new FormData(form);
  const name = formData.get('user-name');
  const englishName = formData.get('user-english-name');
  const github = formData.get('user-github');
  const gender = formData.get('user-gender') ?? '';
  const role = formData.get('user-role') ?? '';
  const codeReviewGroup = Number(formData.get('user-code-review-group'));
  const age = Number(formData.get('user-age'));

  return {
    form,
    name,
    englishName,
    github,
    gender,
    role,
    codeReviewGroup,
    age
  }
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
            <a href="https://github.com/${member.github}" target="_blank" rel="noopener noreferrer">
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
  const originalData = getLocalStorage();
  const { 
    name,
    englishName,
    github,
    gender,
    role,
    codeReviewGroup,
    age
  } = getFormData('.search-section__form');

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
  const originalData = getLocalStorage();
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

  const originalData = getLocalStorage();
  const filteredData = originalData.filter((_, idx) => !checkArray[idx].checked);

  setLocalStorage(filteredData);

  const updatedData = getLocalStorage();

  renderTable(updatedData);

  checkAll.checked && (checkAll.checked = !checkAll.checked);
}

// 추가
function addRow(e) {
  const originalData = getLocalStorage();
  const id = originalData[originalData.length - 1].id + 1;
  const { 
    form,
    name,
    englishName,
    github,
    gender,
    role,
    codeReviewGroup,
    age
  } = getFormData('.modal-section__form');

  const newData = [ ...originalData, {id, name, englishName, github, gender, role, codeReviewGroup, age}];

  if (!name || !englishName || !github || !gender || !role || !codeReviewGroup || !age) {
    alert('모든 필드를 입력해주세요.');
    e.stopPropagation();
  } else {
    setLocalStorage(newData);
    form.reset();
    closeModal(e);
  }

  const updatedData = getLocalStorage();

  renderTable(updatedData);
}

// 모달
function openModal() {
  modalSectionOverlay.classList.add('active');
}

function closeModal(e) {
  if (!modalSection.contains(e.target) || closeButton.contains(e.target) || e.target.className === 'add-button') {
    modalSectionOverlay.classList.remove('active');
  }
}

renderTable(getLocalStorage());
applyButton.addEventListener('click', applyFilter);
resetButton.addEventListener('click', resetFilter);
checkAll.addEventListener('click', selectAll);
checkArray.forEach((check) => check.addEventListener('click', (e) => selectOne(e)));
deleteButton.addEventListener('click', deleteRow);
addButton.addEventListener('click', (e) => addRow(e));
openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', (e) => closeModal(e));
modalSectionOverlay.addEventListener('click', (e) => closeModal(e));