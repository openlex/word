import * as React from "react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { FieldInput } from "@components";
import { Formik } from "formik";

import { action } from "@storybook/addon-actions";

export default {
	title: "ui/Поле ввода",
	components: FieldInput,
	decorators: [withKnobs],
};

export const DefaultField = () => (
	<Formik initialValues={{ name: "" }} onSubmit={action("submit")}>
		<FieldInput
			name="DefaultField"
			label={text("Заголовок", "Заголовок поля")}
			value={text("Содержимое", "Текст")}
			onChange={action("changeAction")}
		/>
	</Formik>
);
