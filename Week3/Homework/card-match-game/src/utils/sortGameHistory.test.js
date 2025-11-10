import { sortGameHistory } from './sortGameHistory.js';

test('랭킹 정렬 로직 테스트 (레벨 내림차순, 클리어 시간 오름차순)', () => {
  const mockHistory = [
    {id: 1, level: 1, clearTime: "35.60", createdAt: "2025. 11. 9. 오후 11:00:30"},
    {id: 2, level: 1, clearTime: "24.33", createdAt: "2025. 11. 9. 오후 11:01:05"},
    {id: 3, level: 2, clearTime: "42.72", createdAt: "2025. 11. 9. 오후 11:02:10"},
    {id: 4, level: 1, clearTime: "15.07", createdAt: "2025. 11. 9. 오후 11:19:14"},
    {id: 5, level: 3, clearTime: "80.68", createdAt: "2025. 11. 9. 오후 11:20:32"},
  ];

  const sorted = sortGameHistory(mockHistory);

  expect(sorted).toEqual([
    {id: 5, level: 3, clearTime: "80.68", createdAt: "2025. 11. 9. 오후 11:20:32"},
    {id: 3, level: 2, clearTime: "42.72", createdAt: "2025. 11. 9. 오후 11:02:10"},
    {id: 4, level: 1, clearTime: "15.07", createdAt: "2025. 11. 9. 오후 11:19:14"},
    {id: 2, level: 1, clearTime: "24.33", createdAt: "2025. 11. 9. 오후 11:01:05"},
    {id: 1, level: 1, clearTime: "35.60", createdAt: "2025. 11. 9. 오후 11:00:30"},
  ]);
});