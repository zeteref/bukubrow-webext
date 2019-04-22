import React, { FC } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'Store';
import ErrorMessages from './error-messages';

type StateProps = ReturnType<typeof mapStateToProps>;

type Props = StateProps;

const ErrorMessagesContainer: FC<Props> = ({ errors }) => (
	<ErrorMessages errors={errors} />
);

const mapStateToProps = (state: AppState) => ({
	errors: Object.values(state.notices.errors)
		.filter((err): err is string => typeof err === 'string'),
});

export default connect(mapStateToProps)(ErrorMessagesContainer);
