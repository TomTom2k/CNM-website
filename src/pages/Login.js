import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import styled from 'styled-components';

import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { MdLockReset } from "react-icons/md";
import OtpInput from 'otp-input-react';
import { CgSpinner } from 'react-icons/cg';
import { auth } from '../configs/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from "react-hot-toast";
import userApi from '../api/userApi';
import authApi from '../api/authApi';

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

const WrapperStyledOTP = styled.div`
		width: 25rem;
		height: auto;
		background-color: #ffffff47;

		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 2rem;
		border-radius: 0.125rem;
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
const ParagraphStyledHeader = styled.div`
	font-size: 1.5rem;	
	color: var(--color-10);
	test-align: center;	
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

const ButtonStyledSubscription = styled.button`
		user-select: none;
		width: 100%;
		padding: 1rem;
		border-radius: 0.25rem;
		border: none;
		margin-top: 1rem;

		cursor: pointer;
		color: #91caee;
		font-size: 0.75rem;
		border: 2px solid #eae3e3;

		&:hover {
			opacity: 0.6;
		}
		&:active {
			opacity: 1;
		}
		&.disabled {
			cursor: no-drop;
			opacity: 0.4;
		}
	`;

const ModalStyled = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContent = styled.div`
	background-color: #e9f0e9;
	padding: 2rem;
	border-radius: 0.25rem;
	margin-top:20px;
	`;
const WrapperStyledForgotPass = styled.div`

		background-color: #e9f0e9;
		padding: 6rem;
`;
const Login = () => {
	const navigate = useNavigate();
	const { login } = useContext(AuthToken);
	const {
		control,
		handleSubmit,
		register,
		formState: { errors }, reset
	} = useForm();
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false); // State để điều khiển hiển thị/ẩn modal
	const [otp, setOtp] = useState(""); // State để lưu giá trị của OTP
	const [ph, setPh] = useState("");
	const [showOTP, setShowOTP] = useState(false); // State để điều khiển hiển thị/ẩn OTP
	const [user, setUser] = useState(null);
	const [newPassword, setNewPassword] = useState("");
	const [reNewPassword, setReNewPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [phoneN, setPhoneN] = useState("");
	const [showRegistrationForm, setShowRegistrationForm] = useState(false); // State để điều khiển hiển thị/ẩn form đăng ký

	const handleShowRegistrationForm = () => {
		setShowRegistrationForm(true);

	};

	const handleShowLoginForm = () => {
		setShowRegistrationForm(false);
	};

	const handleNewPasswordChange = (e) => {
		setNewPassword(e.target.value);
	};

	const handleReNewPasswordChange = (e) => {
		setReNewPassword(e.target.value);
	};

	const signUpWithPhoneNew = async (data) => {
		console.log(data)
		let form_data = new FormData();
		form_data.append('phoneNumber', data.phoneNumber);
		form_data.append('password', data.password);
		form_data.append('fullName', data.fullName);
		form_data.append('gender', data.gender);
		form_data.append('profilePic', data.profilePic[0]);
		try {
			const response = await authApi.signUpWithPhone(form_data);
			// Xử lý response từ server ở đây (nếu cần)
			console.log('Sign up response:', response);
			// Hiển thị thông báo hoặc thực hiện các hành động khác tùy theo response từ server
		} catch (error) {
			// Xử lý lỗi nếu có
			console.error('Error while signing up:', error);
		}
	};

	const handleSignUp = async (formData) => {
		// await signUpWithPhoneNew(formData);
		try {
			setIsLoading(true);
			await signUpWithPhoneNew(formData);
			// Hiển thị Toast khi đăng kí thành công
			toast.success("Đăng kí thành công");
			reset();

			// await auth.signOut();
			//Làm ra 1 hàng chờ 2s rồi chuyển hướng về trang login
			setTimeout(() => {
				setShowRegistrationForm(false);
			}, 1500);
			//Hãy hủy cái OTP
			// setShowOTP(false);


		} catch (error) {
			console.error('Error while signing up:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmitPassword = () => {
		// Kiểm tra mật khẩu mới và mật khẩu mới nhập lại có đủ tối thiểu 6 ký tự không
		if (newPassword.length < 6 || reNewPassword.length < 6) {
			setPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự");
			return;
		}
		setPasswordError(null);

		if (newPassword !== reNewPassword) {
			setPasswordError("Mật khẩu mới không khớp");
			return;
		}
		setPasswordError(null);

		sendChangePasswordRequest(newPassword, phoneN);

		toast.success("Đổi mật khẩu thành công");
		setTimeout(() => {
			setShowModal(false);
		}, 2000);
	};

	const sendChangePasswordRequest = async (newPassword, phoneN) => {

		try {
			// Gọi API để thực hiện yêu cầu đổi mật khẩu
			const res = await userApi.changePassword(newPassword, phoneN);
			// Đóng modal
			setShowModal(false);
			toast.success("Đổi mật khẩu thành công");
		} catch (error) {
			// Xử lý lỗi (nếu có)
			console.error('Đổi mật khẩu không thành công:', error);
		}
	};

	function onCaptchVerify() {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
				'size': 'invisible',
				'callback': (response) => {

					onSignup();
				},
				'expired-callback': () => {

				}
			});
		}
	}

	function onSignup() {
		setIsLoading(true);
		onCaptchVerify();

		const appVerifier = window.recaptchaVerifier;

		const formatPh = '+' + ph;

		signInWithPhoneNumber(auth, formatPh, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				setIsLoading(false);
				setShowOTP(true);
				toast.success("OTP sent successfully");
				// ...
			}).catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}

	function onOTPVerify() {
		setIsLoading(true);
		window.confirmationResult.confirm(otp).then(async (res) => {
			console.log(res);
			setUser(res.user);
			setPhoneN(res.user.phoneNumber);
			setIsLoading(false);
		}).catch(err => {
			console.log(err);
			setIsLoading(false);
		})

	}

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

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<WrapperStyled>
			<LogoStyled>App Chat</LogoStyled>
			<ParagraphStyled>Đăng nhập tài khoản App chat</ParagraphStyled>
			<ParagraphStyled>để kết nối với ứng dụng </ParagraphStyled>
			{showRegistrationForm ? (
				<section className="flex items-center justify-center h-screen">
					<div>
						<Toaster toastOptions={{ duration: 4000 }} />
						<div id="recaptcha-container"></div>
						{user ? (
							<FormStyled onSubmit={handleSubmit(handleSignUp)} enctype="multipart/form-data">
								<ParagraphStyledHeader>Điền thông tin tài khoản</ParagraphStyledHeader>

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
												placeholder="Password"
												{...field}
											/>
										)}
									/>
									{errors.password && (
										<ErrorMessage>{errors.password.message}</ErrorMessage>
									)}
								</InputWrapper>

								<InputWrapper>
									<Controller
										name="fullName"
										control={control}
										defaultValue=""
										rules={{
											required: 'Không được bỏ trống full name',

										}}
										render={({ field }) => (
											<InputStyled
												type="text"
												placeholder="Full Name"
												{...field}
											/>
										)}
									/>
									{errors.password && (
										<ErrorMessage>{errors.password.message}</ErrorMessage>
									)}
								</InputWrapper>
								{/* Tạo ra phần select chọn giới tính */}
								<InputWrapper>
									<label htmlFor="gender">Gender: </label>
									<input
										type="radio"
										id="male"
										name="gender"
										value="male"
										{...register("gender", { required: "Vui lòng chọn giới tính" })}
									/>
									<label htmlFor="male" style={{ fontSize: '0.8rem' }}>Nam</label>

									<input
										type="radio"
										id="female"
										name="gender"
										value="female"
										{...register("gender", { required: "Vui lòng chọn giới tính" })}
									/>
									<label htmlFor="female" style={{ fontSize: '0.8rem' }}>Nữ</label>

									{errors.gender && (
										<ErrorMessage>{errors.gender.message}</ErrorMessage>
									)}
								</InputWrapper>

								<InputWrapper>
									<label htmlFor="profilePic">Ảnh đại diện:</label>
									<input
										type="file"
										id="profilePic"
										name="profilePic"
										accept="image/*"
										style={{ fontSize: '0.8rem' }}
										multiple={false}
										onChange={async (e) => {
											let file = e.target.files[0].name;
											console.log("File đã chọn:", file);
											// setProfilePic(file);

										}}
										{...register("profilePic", { required: "Vui lòng chọn hình" })}
									/>
								</InputWrapper>

								<ButtonStyled type="submit" >Đăng kí</ButtonStyled>

								<ButtonStyledSubscription type="button" onClick={handleShowLoginForm}>Hủy đăng kí</ButtonStyledSubscription>
							</FormStyled>
						) : (
							<WrapperStyledOTP >
								{/* <h1 className="text-center leading-normal text-black font-medium text-3xl mb-2">
									Xác thực OTP
								</h1> */}
								{showOTP ? (
									<>
										<div className="btn-icon-phone w-fit mx-auto p-4 rounded-full">
											<BsFillShieldLockFill size={30} />
										</div>
										<label
											htmlFor="otp"
											className="font-bold text-xl text-black text-center color-gr mb-10 mt-1"
										>
											Nhập mã OTP
										</label>
										<OtpInput
											value={otp}
											onChange={setOtp}
											OTPLength={6}
											otpType="number"
											disabled={false}
											autoFocus
											className="opt-container mb-6 "
										>
										</OtpInput>
										<ButtonStyled
											type="button"
											onClick={onOTPVerify}
											className="btn-bg text-white rounded ">
											{isLoading && <CgSpinner size={20} className="mt-1 animate-spin" />}
											<span>Xác nhận OTP</span>
										</ButtonStyled>
									</>
								) : (
									<>
										<div className="btn-icon-phone w-fit mx-auto p-4 rounded-full">
											<BsTelephoneFill size={30} />
										</div>
										<label
											htmlFor=""
											className="font-bold text-xl color-gr text-black text-center mb-10 mt-1"
										>
											Xác nhận số điện thoại của bạn
										</label>
										<PhoneInput className='mb-2 text-black out-line-otp' country={"in"} value={ph} onChange={setPh} />
										<ButtonStyled
											type="button"
											onClick={onSignup}
											style={{ fontSize: '0.8rem', margin: '0.5rem' }}
											className="btn-bg text-white rounded "
										>
											{isLoading && (
												<CgSpinner size={20} className="mt-1 animate-spin" />
											)}
											<span>Gửi mã code via SMS</span>
										</ButtonStyled>
										<ButtonStyledSubscription type="button" onClick={handleShowLoginForm}>Hủy</ButtonStyledSubscription>
									</>
								)
								}
							</WrapperStyledOTP>
						)}
					</div>

				</section>

			) : (
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
					{isLoading ? (
						<ButtonStyledSubscription disabled className="disabled">
							Đang đăng tạo tài khoản...
						</ButtonStyledSubscription>
					) : (
						<ButtonStyledSubscription type="button" onClick={handleShowRegistrationForm}>
							Tạo tài khoản mới
						</ButtonStyledSubscription>
					)}
					<ErrorMessage>{errorMessage}</ErrorMessage>

					{/* Thêm sự kiện để mở modal */}
					<Link onClick={openModal} style={{ fontSize: '0.8rem' }}>Quên mật khẩu ?</Link>
				</FormStyled>
			)}
			{
				showModal && (
					<ModalStyled>
						<ModalContent>
							<section className="flex items-center justify-center h-screen">
								<div>
									<Toaster toastOptions={{ duration: 4000 }} />
									<div id="recaptcha-container"></div>
									{user ? (
										<WrapperStyledForgotPass>
											{/* Thêm icon reset password */}
											<div className="btn-icon-phone w-fit mx-auto p-4 rounded-full mb-10">

												<MdLockReset size={30} />
											</div>

											<InputWrapper>
												<p>Đổi mật khẩu cho tài khoản</p>
												<p className="text-center text-black font-medium text-2xl mb-2">{user.phoneNumber}</p>
											</InputWrapper>

											<InputWrapper>
												<InputStyled
													type="password"
													placeholder="Nhập mật khẩu mới"
													value={newPassword}
													onChange={handleNewPasswordChange}
												/>
											</InputWrapper>
											<InputWrapper>
												<InputStyled
													type="password"
													placeholder="Nhập lại mật khẩu mới"
													value={reNewPassword}
													onChange={handleReNewPasswordChange}
												/>
												{passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
											</InputWrapper>
											<ButtonStyled type="button" onClick={handleSubmitPassword}>Xác nhận</ButtonStyled>
											<ButtonStyledSubscription type="button" onClick={closeModal}>Hủy</ButtonStyledSubscription>
										</WrapperStyledForgotPass>
									) : (
										<div className="w-100 flex flex-col gap-4 rounded-lg p-4" >
											{/* <h1 className="text-center leading-normal text-black font-medium text-3xl mb-2">
												Xác thực OTP
											</h1> */}
											{showOTP ? (
												<>
													<div className="btn-icon-phone w-fit mx-auto p-4 rounded-full">
														<BsFillShieldLockFill size={30} />
													</div>
													<label
														htmlFor="otp"
														className="font-bold color-gr text-xl mb-6 text-black text-center"
													>
														Nhập mã OTP
													</label>
													<OtpInput
														value={otp}
														onChange={setOtp}
														OTPLength={6}
														otpType="number"
														disabled={false}
														autoFocus
														className="opt-container"
													>
													</OtpInput>
													<ButtonStyled
														type="button"
														onClick={onOTPVerify}
														className="btn-bg text-white rounded ">
														{isLoading && <CgSpinner size={20} className="mt-1 animate-spin" />}
														<span>Xác nhận OTP</span>
													</ButtonStyled>
												</>
											) : (
												<>
													<div className="btn-icon-phone w-fit mx-auto p-4 rounded-full">
														<BsTelephoneFill size={30} />
													</div>
													{/* đỏi */}
													<label
														htmlFor=""
														className="font-bold text-xl color-gr text-black text-center mb-10 mt-1"
													>
														Xác nhận số điện thoại của bạn
													</label>

													<PhoneInput className='mb-1 text-black out-line-otp' country={"in"} value={ph} onChange={setPh} />
													<ButtonStyled
														type="button"
														onClick={onSignup}
														className="btn-bg text-white rounded "

													>
														{isLoading && (
															<CgSpinner size={20} className="mt-1 animate-spin" />
														)}
														<span>Gửi mã code via SMS</span>

													</ButtonStyled>
													<ButtonStyledSubscription type="button" onClick={closeModal}>Hủy</ButtonStyledSubscription>
												</>
											)
											}
										</div>
									)}
								</div>
							</section>
						</ModalContent>
					</ModalStyled>
				)
			}
		</WrapperStyled >
	);
};

export default Login;
