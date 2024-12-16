import { TrashBinLogo } from '@assets/img';
import TrashBinCard from '@components/card';
import React, { useRef, useState } from 'react'
import './index.scss';
import { useUserLoginMutation } from '@api/auth';
import Loader from '@components/loader';
import { setSession } from '@utils/index';
import { useNavigate } from 'react-router-dom';

const TrashBinLogin: React.FC = () => {
  const navigate = useNavigate();
  const [userLogin] = useUserLoginMutation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [showError, setShowError] = useState(false);

  const loginUserAssync = async () => {
    setPending(true)
    userLogin({ email, password })
      .unwrap()
      .then(res => {
        setPending(false);
        setSession(res);
        navigate('/');
      })
      .catch(err => {
        setPending(false);
        setShowError(true);
        console.log(err);
      });
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email && password) {
      loginUserAssync();
    }
  }
  return (
    <TrashBinCard title='Welcome to Login'>
      <div className='login-container'>
        <div className='login-image-container mb-4'>
          <img src={TrashBinLogo} className='login-img-logo' />
        </div>
        { showError && 
          <div className="alert alert-danger close-container" role="alert">
            Error, check your credentials ..!
            <span aria-hidden="true" className='close-icn'onClick={()=>setShowError(false)}>&times;</span>
          </div>
        }
        <form onSubmit={onSubmit}>
          <div className="form-group d-flex flex-column align-items-start">
            <label htmlFor="exampleInputEmail1" className='mb-2'>Email address</label>
            <input
              type="email"
              className="form-control p-3 mb-2" id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted mb-3">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group d-flex flex-column align-items-start">
            <label htmlFor="exampleInputPassword1" className='mb-2'>Password</label>
            <input
              type="password"
              className="form-control p-3 mb-3"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="form-check mb-2">
          <input type="checkbox" className="form-check-input " id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100 p-2 mt-3 mb-3 login-btn d-flex align-items-center justify-content-center"
              disabled={pending ? true : false}
            > {pending && <Loader white />} LOGIN</button>
          </div>
        </form>
        <p className="mt-2 text-center mb-3 log-text-new"><span>Don’t have an account?   <a href="/signin">Sign Up</a></span></p>
      </div>
    </TrashBinCard>
  )
}

export default TrashBinLogin;