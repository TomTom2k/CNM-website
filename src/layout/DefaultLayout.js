import React from 'react';
import Aside from './components/Aside';
import styled from 'styled-components';

const WrapperStyled = styled.div``;
const InnerStyled = styled.div``;

const DefaultLayout = ({ children }) => {
	return (
		<WrapperStyled>
			<Aside />
			<InnerStyled>{children}</InnerStyled>
		</WrapperStyled>
	);
};

export default DefaultLayout;
