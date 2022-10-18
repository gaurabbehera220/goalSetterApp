import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'




function Login() {
  // state for the form
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // De-structured fields from formdata
  const { email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }

    
  }, [ user,isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData( (prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,

    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }


  if ( isLoading ){
    return <Spinner />
  }

  // Adding jsx
  return ( <>
    
    <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start setting Goals</p>
    </section>
    
    <section className="form">
      <form onSubmit={onSubmit}>

        <div className='form-group'>
        <input 
        type="text"
        className='form-control'
        id='email'
        name='email'
        value={email}
        placeholder='Enter your Email' 
        onChange={onChange}
        />
        </div>

        <div className='form-group'>
        <input 
        type="text"
        className='form-control'
        id='password'
        name='password'
        value={password}
        placeholder='Enter your Password' 
        onChange={onChange}
        />
        </div>


        <div className="form-group">
          <button type="submit" className='btn btn-block'>Submit</button>
        </div>

      </form>
    </section>
    
    </>
  )
}

export default Login