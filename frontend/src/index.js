import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

// const fs = require('fs')
// const axios = require('axios')


// async function getData() {
//   try {
//     const { data } = await axios.get('http://localhost:8000/api/users/')
//     produceSeedObject(data)
//   } catch (err) {
//     console.log(err)
//   }
// }

// function produceSeedObject(data) {
//   const formattedData = data.map((item, index) => {
//     return {
//       model: 'jwt_auth.user',
//       pk: index,
//       fields: {
//         username: item.username,
//         firstName: item.firstName,
//         lastName: item.lastName,
//         email: item.email,
//         password: item.password,
//         passwordConfirmation: item.passwordConfirmation
//       }
//     }
//   })
//   const jsonData = JSON.stringify(formattedData)
//   fs.writeFileSync('seeds.json', jsonData)
// }

// getData()
