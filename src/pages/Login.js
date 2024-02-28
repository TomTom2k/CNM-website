import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import styled from 'styled-components';

import { AuthToken } from '../context/AuthToken';
import configs from '../configs';

const WrapperStyled = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-60);
`;
const LogoStyled = styled.h1`
	color: var(--color-10);
	font-size: 3.5rem;
	margin-bottom: 1rem;
`;
const ParagraphStyled = styled.p`
	width: 20rem;
	text-align: center;

	font-size: 1.125rem;
	color: #333;
`;
const FormStyled = styled.form`
	width: 25rem;
	height: auto;
	background-color: white;

	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 2rem;
	margin-top: 1rem;
	border-radius: 0.125rem;
`;
const InputWrapper = styled.div`
	margin-bottom: 1rem;
	width: 100%;
	font-size: 1.125rem;
`;
const InputStyled = styled.input`
	border: none;
	border-bottom: 1px solid #ccc;
	outline: none;
	padding: 5px 0;
	font-size: 1rem;
	width: 100%;
`;
const PhoneInputStyled = styled(PhoneInput)`
	& > * {
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
		padding: 5px 0;
		font-size: 1rem;
	}
`;
const ErrorMessage = styled.span`
	color: red;
	margin: 0.5rem 0;
`;
const ButtonStyled = styled.button`
	user-select: none;
	width: 100%;
	padding: 1rem;
	border-radius: 0.25rem;
	border: none;

	cursor: pointer;

	color: white;
	font-size: 0.875rem;
	background-color: var(--color-10);

	&:hover {
		opacity: 0.9;
	}
	&:active {
		opacity: 1;
	}
	&.disabled {
		cursor: no-drop;
		opacity: 0.4;
	}
`;

const Login = () => {
	const navigate = useNavigate();
	const { login } = useContext(AuthToken);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data) => {
		if (Object.keys(errors).length === 0) {
			try {
				setIsLoading(true);
				const res = await login(data);
				if (res.status === 200) {
					navigate(configs.routes.home);
				}
			} catch (error) {
				if (error?.response && error?.response.status === 401) {
					setErrorMessage('Tài khoản hoặc mật khẩu không hợp lệ');
				}
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<WrapperStyled>
			<LogoStyled>Chat</LogoStyled>
			<ParagraphStyled>Đăng nhập tài khoản Zalo</ParagraphStyled>
			<ParagraphStyled>để kết nối với ứng dụng Zalo Web</ParagraphStyled>
			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<InputWrapper>
					<Controller
						name="phoneNumber"
						control={control}
						defaultValue=""
						rules={{
							required: 'Không được bỏ trống số điện thoại',
						}}
						render={({ field }) => (
							<PhoneInputStyled
								placeholder="Số điện thoại"
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
					{errors.phoneNumber && (
						<ErrorMessage>
							{errors.phoneNumber.message}
						</ErrorMessage>
					)}
				</InputWrapper>

				<InputWrapper>
					<Controller
						name="password"
						control={control}
						defaultValue=""
						rules={{
							required: 'Không được bỏ trống mật khẩu',
							minLength: {
								value: 6,
								message: 'Mật khẩu phải tối thiểu 6 ký tự',
							},
						}}
						render={({ field }) => (
							<InputStyled
								type="password"
								placeholder="Password"
								{...field}
							/>
						)}
					/>
					{errors.password && (
						<ErrorMessage>{errors.password.message}</ErrorMessage>
					)}
				</InputWrapper>
				{isLoading ? (
					<ButtonStyled disabled className="disabled">
						Đang đăng nhập...
					</ButtonStyled>
				) : (
					<ButtonStyled type="submit">
						Đăng nhập với mật khẩu
					</ButtonStyled>
				)}
				<ErrorMessage>{errorMessage}</ErrorMessage>
			</FormStyled>
		</WrapperStyled>
	);
};

export default Login;
