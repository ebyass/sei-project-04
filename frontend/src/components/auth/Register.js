/* eslint-disable camelcase */
import React from 'react'
import { registerUser, loginUser } from '../../lib/api'
import { Redirect } from 'react-router-dom'
import { setToken } from '../../lib/auth'
import registerimage4 from '../../images/registerimage4.png'


class Register extends React.Component {
  state = {
    formData: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    redirect: false,
    loading: false,
    errors: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleChange = event => {
    // console.log('this is event.target.name', event.target.name)
    // console.log('this is event.target.value', event.target.value)
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }



  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ loading: true })
      const response = await registerUser(this.state.formData)
      console.log('this is the registerUser', response )
      //If registration goes well, run the login user function with the formdata, then set token and redirect to profile page
      if (response.status === 200) {
        console.log('is this working')

        const loginResponse = await loginUser(this.state.formData)

        console.log('this is the loginResponse', loginResponse)

        setToken(loginResponse.data.token)
        this.setState({ redirect: true })
      }
      if (response.status === 422) throw new Error()
    } catch (err) {
      console.log('response: ', err.response.data.errors)
      //need to send handleErrors function the errors array from the 422 response as args
      this.handleErrors(err.response.data.errors)
      this.setState({ loading: false })
    }
  }

  handleErrors = (errors) => {
    let first_name = ''
    let last_name = ''
    let username = ''
    let email = ''
    let password = ''
    let password_confirmation = ''
    
    if (errors.first_name) {
      first_name = 'Your First Name Is Required'
    }
    if (errors.last_name) {
      last_name = 'Your Last Name Is Required'
    }
    if (errors.username) {
      username = 'Your Username Is Required'
    }
    if (errors.email && errors.email.kind === 'required') {
      email = 'Your email Is Required'
    }
    if (errors.email && errors.email.kind === 'unique') {
      email = 'You already have an account, go to sign in'
    }
    if (errors.password) {
      password = 'Password is required'
    }
    if (errors.password_confirmation) {
      password_confirmation = 'Password confirmation does not match'
    }
    this.setState({ errors: { first_name, last_name, username, email, password, password_confirmation } })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
  }

  sendData = () => {
    this.props.history.push('/login')
    // console.log('this is sendData')
  }

  render() {
    const { formData, errors } = this.state
    console.log(this.state)
    return (
      <section className="section register-section" style={{ backgroundImage: `url(${registerimage4})` }}>
        {this.renderRedirect()}
        <div className="">
          <div className="columns register-columns">
            <form  onSubmit={this.handleSubmit} className="column register-form">
              {/* <h1 className="has-text-centered">Sign Up Here</h1><br /> */}

              {/* FIRST NAME*/}
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.first_name ? 'is-danger' : ''}`}
                    placeholder="First Name"
                    name="first_name"
                    onChange={this.handleChange}
                    value={formData.first_name}
                  />
                </div>
                {errors.first_name ? <small className="help is-danger">{errors.first_name}</small> : ''}
              </div>

              {/* LAST NAME */}
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.last_name ? 'is-danger' : ''}`}
                    placeholder="Last Name"
                    name="last_name"
                    onChange={this.handleChange}
                    value={formData.last_name}
                  />
                </div>
                {errors.last_name ? <small className="help is-danger">{errors.last_name}</small> : ''}
              </div>

              {/* USERNAME */}
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.username ? 'is-danger' : ''}`}
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={formData.username}
                  />
                </div>
                {errors.username ? <small className="help is-danger">{errors.username}</small> : ''}
              </div>

              {/* EMAIL */}
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
                {this.state.errors.email ? <small className="help is-danger">{errors.email}</small> : ''}
              </div>

              {/* PASSWORD */}
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.password ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
                {errors.password && <small className="help is-danger">{errors.password}</small>}
              </div>

              {/* PASSWORD CONFIRMATION */}
              <div className="field">
                <div className="control">
                  <input
                    type="password"
                    className={`input ${errors.password_confirmation ? 'is-danger' : ''}`}
                    placeholder="Password Confirmation"
                    name="password_confirmation"
                    onChange={this.handleChange}
                    value={formData.password_confirmation}
                  />
                </div>
                {errors.password_confirmation && <small className="help is-danger">{errors.password_confirmation}</small>}
              </div>

              <div className="field">
                <button type="submit" className={`button button-register is-fullwidth register-button ${this.state.loading ? 'is-loading' : ''}`}>Register</button>
              </div>
              <div className="field">

                {/* HAVE AN ACCOUNT? SIGN IN HERE */}
                <button onClick={this.sendData} type="button" className="button button-register is-fullwidth is-outlined is-register">Have an account? Sign in Here</button>

              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
