import { useEffect } from 'react';

type UseOutsideClickCloseParams = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLElement>;
	onClose: () => void;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
}: UseOutsideClickCloseParams) => {
	useEffect(() => {
		if (!isOpen) return; // Не добавляем обработчик если закрыто

		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			// Проверяем что клик был вне целевого элемента
			if (
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target)
			) {
				onClose();
			}
		};

		window.addEventListener('mousedown', handleClick);

		// Удаляем обработчик при размонтировании или изменении зависимостей
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose, rootRef]); // Зависимости эффекта
};
