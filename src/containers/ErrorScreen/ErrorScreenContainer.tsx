import * as React from "react";
import { ErrorInfo } from "react";

export interface IErrorScreenContainerState {
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

export class ErrorScreenContainer extends React.Component {
	state: IErrorScreenContainerState = {
		error: null,
		errorInfo: null,
	};

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error,
			errorInfo,
		});
	}

	render() {
		const { error, errorInfo } = this.state;

		if (error) {
			return (
				<div>
					Something went wrong!
					<br />
					{this.state.error && this.state.error.toString()}
					{errorInfo && errorInfo.componentStack}
				</div>
			);
		}
		return this.props.children;
	}
}
