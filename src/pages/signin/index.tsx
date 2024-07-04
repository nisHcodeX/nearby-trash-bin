import TrashBinCard from '@components/card';
import React, { useState } from 'react'

const TrashBinSingIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('confirmPassword:', confirmPassword);
    console.log('name:', name);
    console.log('phoneNumber:', phoneNumber);
  }
  return (
    <TrashBinCard title='Youre About to Signup'>
      <form onSubmit={onSubmit}>
        <div className="form-group d-flex flex-column align-items-start mb-2">
          <label htmlFor="exampleInputEmail1" className='mb-2'>Name</label>
          <input 
          type="text" 
          className="form-control p-3 mb-2" 
          // id="exampleInputEmail1" 
          // aria-describedby="emailHelp" 
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)} 
           />
        </div>
        <div className="form-group d-flex flex-column align-items-start mb-2">
          <label htmlFor="exampleInputEmail1" className='mb-2'>Phone Number</label>
          <input 
          type="text" 
          className="form-control p-3 mb-2" 
          // id="exampleInputEmail1" 
          // aria-describedby="emailHelp" 
          placeholder="Enter Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)} 
           />
        </div>
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
        <div className="form-group d-flex flex-column align-items-start">
          <label htmlFor="exampleInputPassword1" className='mb-2'>Confirm Password</label>
          <input 
          type="password" 
          className="form-control p-3 mb-3" 
          id="exampleInputPassword2" 
          placeholder="confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        {/* <div className="form-check mb-2">
          <input type="checkbox" className="form-check-input " id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
        <div>
          <button type="submit" className="btn btn-primary w-100 p-2 mt-2">SIGNUP</button>
        </div>
      </form>
    </TrashBinCard>
  )
}

export default TrashBinSingIn;