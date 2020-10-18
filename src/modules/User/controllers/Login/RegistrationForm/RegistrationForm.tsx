import * as React from "react";
import { Form, Formik } from "formik";
import { css } from "@emotion/core";
import { FieldInput } from "@components/ui/FieldInput/FieldInput";
import styled from "@emotion/styled";
import { colors, mixinFlexCenter } from "@styles";
import { Title } from "@components";
import { validateForm } from "./validateForm";
import { FormikHelpers } from "formik/dist/types";

interface IRegistrationFormFields {
	name: string;
}

interface IRegistrationProps {
	onLogIn(name: string): void;
}

const fieldCss = css`
	margin-bottom: 15px;
`;
const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 80vh;
`;
const FormWrapper = styled.div`
	padding: 20px;
	border: solid 1px ${colors.gray};
	max-width: 300px;
	min-width: 200px;
	width: 80%;
	background: ${colors.white};
	${mixinFlexCenter}
`;

// const HeaderTitle = styled(Title)`
// 	margin-bottom: 10px;
// `;

export class RegistrationForm extends React.Component<IRegistrationProps> {
	onSubmit = async (
		values: IRegistrationFormFields,
		formikHelpers: FormikHelpers<IRegistrationFormFields>
	) => {
		await this.props.onLogIn(values.name);
		formikHelpers.setSubmitting(false);
	};

	render() {
		return (
			<Wrapper>
				<Title level={3}>Авторизуйтесь</Title>
				<FormWrapper>
					<Formik
						initialValues={{ name: "" }}
						validate={validateForm}
						onSubmit={this.onSubmit}
					>
						{(props) => {
							return (
								<Form
									data-test-id="form"
									onSubmit={props.handleSubmit}
								>
									<FieldInput
										cssStyle={fieldCss}
										label="Ваше имя"
										name="name"
										value={props.values.name}
										onChangeField={props.setFieldValue}
										data-test-id="name-input"
									/>

									<button
										type="submit"
										disabled={props.isSubmitting}
										data-test-id="submit-btn"
									>
										Войти
									</button>
								</Form>
							);
						}}
					</Formik>
				</FormWrapper>
			</Wrapper>
		);
	}
}
