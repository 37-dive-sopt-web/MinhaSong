import { useState } from 'react';

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [clearTime, setClearTime] = useState(0);
  const [modalCountdown, setModalCountdown] = useState(3);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  return { isModalOpen, setIsModalOpen, modalType, setModalType, clearTime, setClearTime, modalCountdown, setModalCountdown, closeModal };
};