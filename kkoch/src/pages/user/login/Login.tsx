import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useDispatch } from "react-redux";
import flowerImg from "@/assets/flowerBackImg.png"
import { login } from '@/reducer/store/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword] = useState('');

	const [ emailValid, setEmailValid ] = useState(false);
	const [ passwordValid, setPasswordValid ] = useState(false);
	const [ notAllow, setNotAllow ] = useState(true);

	const dispatch = useDispatch();
  
	const navigate = useNavigate();
	const { state } = useLocation();	// 이전 라우터 위치정보를 가져온다

	// 이메일 검증 함수
	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = e.target.value
		setEmail(newEmail);

		// 이메일 정규표현식
		const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

		// 정규표현식이 true 이면
		if (regex.test(newEmail)) {
			setEmailValid(true);
		} else {
			setEmailValid(false);
		}
	}

	// 비밀번호 검증 함수
	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPw = e.target.value;
		setPassword(newPw);

		const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
		if (regex.test(newPw)) {
			setPasswordValid(true);
		} else {
			setPasswordValid(false);
		}
	}

	const loginSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		const data = {
			"email" : email,
			"loginPw" : password
		}

		// POST 요청 보내기
		axios({
			method: "post",
			url: "/api/user-service/user/login", // 프록시 경로인 /api를 사용
			headers: {
				"Content-Type": "application/json"
			},
			data: data
		})
		.then(res => {
			// 로그인 요청이 성공하면 토큰을 저장
			const token = res.data.data["token"]; 
			dispatch(login(token));
			alert("환영합니다.");

			// 이전에 state에서 왔으면 로그인후 state으로 이동
			if (state) {
				navigate(state);
			} else {
				// 이전에 온곳이 없다면 고정으로 / 로 보낸다
				navigate("/");
			}
		})
		.catch((err) => {
			alert(err.response.data)
		});
	}

	useEffect(() => {
		if (emailValid && passwordValid) {
			setNotAllow(false);
			return;
		}
		setNotAllow(true);
	}, [emailValid, passwordValid]);

  return (
		//page gap-16 bg-gray-20 py-10 md:h-full md:pb-0 
		<div className="flex justify-around pt-[150px]">
			<div>
				<img src={flowerImg} alt="" />
			</div>
			<form className='w-[35%] flex flex-col' onSubmit={loginSubmit}>
				<div className="titleWrap">
					로그인
				</div>

				<div className='signupTitle'>
					계정이 없으신가요? &nbsp;&nbsp;
					<span className='signupLink'>
						회원가입
					</span>
				</div>

				<div className="mt-4">
					<div className="inputTitle">이메일 주소</div>
					<div className="inputWrap">
						<input 
							type='text'
							className="input"
							placeholder='test@naver.com'
							value={email}
							onChange={handleEmail} 
						/>
					</div>
					<div className="errorMessageWrap">
						{
							!emailValid && email.length > 0 && (
								<div>
									올바른 이메일을 입력해주세요.
								</div>
							)
						}
					</div>

					<div className="inputTitle" style={{ marginTop: "26px" }}>비밀번호</div>
					<div className="inputWrap">
						<input
							type="password"
							className="input"
							placeholder="영문, 숫자, 특수문자 포함 8자 이상" 
							value={ password }
							onChange={ handlePassword }
						/>
					</div>
					<div className="errorMessageWrap">
						{
							!passwordValid && password.length > 0 && (
								<div>
									영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
								</div>
							)
						}
					</div>
				</div>
				
				<div>
					<button type="submit" className='mt-5 bottomButton bg-orange-400' disabled={ notAllow }>
						확인
					</button>
				</div>
			</form>
		</div>
  )
}

export default Login