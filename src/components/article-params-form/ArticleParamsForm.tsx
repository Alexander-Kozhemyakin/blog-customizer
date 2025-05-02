import React, { useState, useRef } from 'react';
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
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { ArticleParams } from './ArticleParams';

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: {
	onApply: (params: ArticleParams) => void;
	onReset: () => void;
}) => {
	const [isOpen, setFormVisibility] = useState(false);
	const [articleSettings, setArticleSettings] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	const handleSettingChange =
		(field: keyof ArticleParams) =>
		(value: ArticleParams[keyof ArticleParams]) => {
			setArticleSettings((prev) => ({ ...prev, [field]: value }));
		};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(articleSettings);
		setFormVisibility(false);
	};

	const handleFormReset = () => {
		setArticleSettings(defaultArticleState);
		onReset();
		setFormVisibility(false);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formRef,
		onClose: () => setFormVisibility(false),
	});

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setFormVisibility(!isOpen)} />

			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text size={31} weight={800}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					<Select
						title='Шрифт'
						selected={articleSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleSettingChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={articleSettings.fontSizeOption}
						name='fontSize'
						onChange={handleSettingChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={articleSettings.fontColor}
						options={fontColors}
						onChange={handleSettingChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={articleSettings.backgroundColor}
						options={backgroundColors}
						onChange={handleSettingChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={articleSettings.contentWidth}
						options={contentWidthArr}
						onChange={handleSettingChange('contentWidth')}
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
