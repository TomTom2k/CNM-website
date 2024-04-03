import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import styled from 'styled-components';
import { format } from 'date-fns';
import authApi from '../api/authApi';
import { auth } from '../configs/firebase.config';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OtpInput from 'otp-input-react';
import { CgSpinner } from 'react-icons/cg';
import { toast, Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import configs from '../configs';
import "react-datepicker/dist/react-datepicker.css";

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
	color: #0068ff;
	font-size: 3.5rem;
	margin-bottom: 0.4rem;
`;
const ParagraphStyled = styled.p`
	width: 20rem;
	text-align: center;
	margin-bottom: 0;

	font-size: 1.125rem;
	color: #333;
`;

const WrapperStyledOTP = styled.div`
	width: 25rem;
	height: auto;
	background-color: #fff;
	margin-top: 1rem;

	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 2rem;
	border-radius: 0.125rem;
`;
const FormStyled = styled.form`
	width: 25rem;
	height: auto;
	background-color: white;
	box-shadow: 0 8px 24px rgba(21,48,142,0.14);
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 1.4rem 2rem;
	margin-top: 0.6rem;
	border-radius: 0.125rem;
`;
const InputWrapper = styled.div`
	margin-bottom: 0.6rem;
	width: 100%;
	font-size: 0.9rem;

	.react-datepicker-wrapper {
		width: 100%
	}
`;
const InputStyled = styled.input`
	border: none;
	border-bottom: 1px solid #ccc;
	outline: none;
	padding: 5px 0;
	font-size: 1rem;
	width: 100%;
`;
const LabelStyled = styled.label`
	font-size: 1rem;
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
const DatePickerStyled = styled(DatePicker)`
	width: 100%;
	border: none;
	border-bottom: 1px solid #ccc;
	outline: none;
	padding: 5px 0;
	font-size: 1rem;
	width: 100%;
`;
const ErrorMessage = styled.span`
	color: red;
	margin: 0.5rem 0;
`;
const ButtonStyled = styled.button`
	user-select: none;
	width: 100%;
	padding: 0.6rem;
	border-radius: 0.25rem;
	border: none;
	margin-top: 0.6rem;

	cursor: pointer;

	color: white;
	font-size: 0.875rem;
	background-color: #0190f3;

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

const DivPhoneFill = styled.div`
	background-color: rgb(92 212 127) !important;
	color: white;

	margin-left: auto;
	margin-right: auto;
	gap: 1rem;
	border-radius: 9999px;
	width: fit-content;
	padding: 1rem;
`;

const LabelPhoneFill = styled.label`
	width: 100%;
	font-weight: bold; /* Makes the text bold */
	font-size: 1.25rem; /* Sets the font size to XL (assuming 1rem base size) */
	color: gray; /* Sets the text color to gray */
	text-align: center; /* Aligns the text to the center */
	margin-bottom: 2rem; /* Adds 10px margin at the bottom */
	margin-top: 1px; /* Adds 1px margin at the top */
`;

const ButtonStyledSubscription = styled.button`
	user-select: none;
	width: 100%;
	padding: 0.6rem;
	border-radius: 0.25rem;
	margin-top: 1rem;
	background-color: white;
	cursor: pointer;
	color: #0190f3;
	font-size: 0.875rem;
	border: 1px solid var(--border);

	&:hover {
		border: 1px solid #0184e0;
	}
	&:active {
		opacity: 1;
	}
	&.disabled {
		cursor: no-drop;
		opacity: 0.4;
	}
`;
const Register = () => {
	const {
		control,
		handleSubmit,
		register,
		formState: { errors }, reset
	} = useForm();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [otp, setOtp] = useState(""); // State để lưu giá trị của OTP
	const [showOTP, setShowOTP] = useState(false); // State để điều khiển hiển thị/ẩn OTP
	const [user, setUser] = useState(null);

	const signUpWithPhoneNew = async (data) => {
		console.log(data)
		let form_data = new FormData();
		form_data.append('phoneNumber', data.phoneNumber);
		form_data.append('password', data.password);
		form_data.append('fullName', data.fullName);
		const formattedDOB = format(data.dateOfBirth, 'dd/MM/yyyy');
		form_data.append('dateOfBirth', formattedDOB);
		form_data.append('gender', data.gender);
		form_data.append('profilePic', data.profilePic[0]);
		console.log(form_data);
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

	const handleShowLoginPage = () => {
		navigate(configs.routes.login)
	};

	const handleSignUp = async () => {
		// await signUpWithPhoneNew(formData);
		try {
			setIsLoading(true);
			await signUpWithPhoneNew(user);
			// Hiển thị Toast khi đăng kí thành công
			toast.success("Đăng kí thành công");
			reset();

			// await auth.signOut();
			//Làm ra 1 hàng chờ 2s rồi chuyển hướng về trang login
			setTimeout(() => {
				handleShowLoginPage()
			}, 1500)

			//Hãy hủy cái OTP
			// setShowOTP(false);


		} catch (error) {
			console.error('Error while signing up:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const onOTPVerify = async () => {
		try {			
			setIsLoading(true);
			window.confirmationResult.confirm(otp).then(async (res) => {
				console.log(res);
	
				await handleSignUp()
				setIsLoading(false);
			}).catch(err => {
				console.log("onOTPVerify Error ",err);
				setIsLoading(false);
			})
		} catch (error) {
			console.log(error)
		}

	}

	function onCaptchVerify(formData) {
		try {			
			if (!window.recaptchaVerifier) {
				window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
					size: 'invisible',
					callback: (response) => {
						onSignup(formData);
					},
					'expired-callback': () => {
						// Xử lý callback khi Recaptcha hết hạn (nếu cần)
					}
				});
			} else {
				// Nếu recaptchaVerifier đã tồn tại, gọi hàm onSignup trực tiếp
				onSignup(formData);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const onSignup = (formData) => {
		try {
			setIsLoading(true);
			setUser(formData)
	
			const appVerifier = window.recaptchaVerifier;
	
			const formatPh = '+' + formData["phoneNumber"];
	
			signInWithPhoneNumber(auth, formatPh, appVerifier)
				.then((confirmationResult) => {
					// SMS sent. Prompt user to type the code from the message, then sign the
					// user in with confirmationResult.confirm(code).
					window.confirmationResult = confirmationResult;
					setIsLoading(false);
					setShowOTP(true);
					toast.success("OTP sent successfully");
					window.recaptchaVerifier = null
					// ...
				}).catch((error) => {
					console.log("signInWithPhoneNumber Error ",error);
					setIsLoading(false);
				})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<WrapperStyled>
			<LogoStyled>Zalo</LogoStyled>
			<ParagraphStyled>Đăng nhập tài khoản Zalo</ParagraphStyled>
			<ParagraphStyled>để kết nối với ứng dụng Zalo Web</ParagraphStyled>
			<Toaster toastOptions={{ duration: 1500 }} />
			{!showOTP ? (
				<section className="flex items-center justify-center h-screen">
						<div>
							{/* <Toaster toastOptions={{ duration: 1500 }} /> */}
							<div id="recaptcha-container"></div>

							<FormStyled onSubmit={handleSubmit(onCaptchVerify)} enctype="multipart/form-data">
								{/* <ParagraphStyledHeader>Điền thông tin tài khoản</ParagraphStyledHeader> */}

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
												placeholder="Mật khẩu"
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
												placeholder="Họ tên"
												{...field}
											/>
										)}
									/>
									{errors.password && (
										<ErrorMessage>{errors.password.message}</ErrorMessage>
									)}
								</InputWrapper>

								<InputWrapper>
									{/* <label className='d-block' htmlFor="dateOfBirth">Ngày sinh:</label> */}
									<Controller
										name="dateOfBirth"
										control={control}
										defaultValue={null}
										render={({ field }) => (
											<DatePickerStyled
												selected={field.value}
												onChange={(date) => field.onChange(date)}
												dateFormat="dd/MM/yyyy"
												showYearDropdown
												scrollableYearDropdown
												yearDropdownItemNumber={15}
												placeholderText="Chọn ngày sinh"
												maxDate={new Date()} // Ngày hiện tại là ngày tối đa
												{...field}
											/>
										)}
									/>
								</InputWrapper>
								{errors.dateOfBirth && (
									<ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>
								)}

								{/* Tạo ra phần select chọn giới tính */}
								<InputWrapper>
									<LabelStyled className='d-block' htmlFor="gender">Giới tính: </LabelStyled>
									<div className='d-flex align-items-center'>
										<input
											type="radio"
											id="male"
											name="gender"
											value="male"
											{...register("gender", { required: "Vui lòng chọn giới tính" })}
										/>
										<LabelStyled className='mx-2' htmlFor="male">Nam</LabelStyled>

										<input
											className='mx-2'
											type="radio"
											id="female"
											name="gender"
											value="female"
											{...register("gender", { required: "Vui lòng chọn giới tính" })}
										/>
										<LabelStyled htmlFor="female">Nữ</LabelStyled>
									
									</div>

									{errors.gender && (
										<ErrorMessage>{errors.gender.message}</ErrorMessage>
									)}
								</InputWrapper>

								<InputWrapper>
									<LabelStyled className='d-block mb-1' htmlFor="profilePic">Ảnh đại diện:</LabelStyled>
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

								<ButtonStyledSubscription type="button" onClick={handleShowLoginPage}>Đăng nhập</ButtonStyledSubscription>
							</FormStyled>
						</div>

				</section>
			) : (
				<WrapperStyledOTP>
					<DivPhoneFill>
						<BsFillShieldLockFill size={30} />
					</DivPhoneFill>
					<LabelPhoneFill
						htmlFor="otp"
					>
						Nhập mã OTP
					</LabelPhoneFill>
					<OtpInput
						value={otp}
						onChange={setOtp}
						OTPLength={6}
						otpType="number"
						disabled={false}
						autoFocus
						style={{ marginBottom: '1.5rem' }}
					>
					</OtpInput>
					<ButtonStyled
						type="button"
						onClick={onOTPVerify}
						className="btn-bg text-white rounded ">
						{isLoading && <CgSpinner size={20} className="mt-1 animate-spin" />}
						<span>Xác nhận OTP</span>
					</ButtonStyled>
				</WrapperStyledOTP>
			)}
		</WrapperStyled>
	);
};

export default Register;
