import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { signIn } from "@rdx";
import { connect } from "react-redux";
import { ROUTES } from "@/ROUTES";
import { RegistrationForm } from "@components";

const mapDispatchToProps = {
	signIn,
};

type RegistrationFormContainer = typeof mapDispatchToProps &
	RouteComponentProps;

class RegistrationFormView extends React.Component<RegistrationFormContainer> {
	onSubmit = async (name: string) => {
		await this.props.signIn(name);
		this.props.history.push(ROUTES.main);
	};

	render() {
		return <RegistrationForm onLogIn={this.onSubmit} />;
	}
}

export const RegistrationFormContainer = connect<
	undefined,
	{},
	RegistrationFormContainer
>(
	undefined,
	mapDispatchToProps
)(RegistrationFormView);
