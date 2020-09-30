import React from "react";
import * as s from "./FieldInput.scss";
import { ErrorMessage, Field } from "formik";
/** @jsx jsx */
import { css, jsx, SerializedStyles } from "@emotion/core";

jsx;

export interface IFieldInputProps {
	cssStyle?: SerializedStyles;
	name: string;
	label?: string;
	value?: string;
	type?: string;

	onChange?(result: IFieldInputData): void;

	onChangeField?(
		field: string,
		value: string,
		shouldValidate?: boolean
	): void;

	isTextArea?: boolean;
}

export interface IFieldInputData {
	value: string;
	name: string;
}

export const FieldInput: React.FC<IFieldInputProps> = ({
	cssStyle,
	name,
	label,
	value,
	onChange,
	onChangeField,
	type = "text",
}: IFieldInputProps) => {
	const onChangeInput = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = event?.target;

		if (onChange && target?.value) {
			onChange({ value: target?.value || "", name: target?.name });
		}
		if (onChangeField && target) {
			onChangeField(target.name, target.value);
		}
	};

	return (
		<label
			htmlFor={name}
			css={css`
				${cssStyle};
				display: block;
				color: gray;
				font-size: 14px;
			`}
		>
			{label && (
				<span className={s.label} data-test-id="fieldInputLabel">
					{label}
				</span>
			)}
			<div className={s.fieldWrapper}>
				<Field
					className={s.input}
					name={name}
					data-test-id="fieldInput"
					type={type}
					value={value}
					onChange={onChangeInput}
				/>
				<ErrorMessage name={name} component="div" />
			</div>
		</label>
	);
};

FieldInput.defaultProps = {
	type: "text",
	label: "",
	value: "",
};
