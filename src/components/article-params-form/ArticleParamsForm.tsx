import React, { useState, useRef, useEffect } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { ArticleParams } from './ArticleParams';

// Тип для всех параметров статьи8+]

type ArticleParamsFormProps = {
	params: ArticleParams;
	onApply: (params: ArticleParams) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	params: externalParams,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [params, setParams] = useState<ArticleParams>(externalParams);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setParams(externalParams);
	}, [externalParams]);

	useOutsideClickClose({
		isOpen,
		onChange: setIsOpen,
		rootRef: sidebarRef,
	});

	const handleParamChange =
		(field: keyof ArticleParams) =>
		(value: (typeof params)[keyof ArticleParams]) => {
			setParams((prev) => ({ ...prev, [field]: value }));
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(params);
		setIsOpen(false);
	};

	const handleResetForm = () => {
		onReset();
		setIsOpen(false);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<Text size={31} weight={800}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					<Select
						title='Шрифт'
						selected={params.fontFamily}
						options={fontFamilyOptions}
						onChange={handleParamChange('fontFamily')}
					/>

					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={params.fontSize}
						name='fontSize'
						onChange={handleParamChange('fontSize')}
					/>

					<Select
						title='Цвет шрифта'
						selected={params.fontColor}
						options={fontColors}
						onChange={handleParamChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={handleParamChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={handleParamChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
