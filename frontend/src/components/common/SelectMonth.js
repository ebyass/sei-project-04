import React, { useEffect, useState } from 'react'
import useFetch from '../../utils/useFetch'
//import { useHistory } from 'react-router-dom'
// import axios from 'axios'
// import Select from 'react-select'
import { getAllPosts } from '../../lib/api'
import moment from 'moment'

function SelectMonthDropDown({ setSelectHasBeenUsed, onChange }) {
  const { data: post, error } = useFetch(getAllPosts)
  const [dateOfPosts, setDateOfPosts] = useState('')
  //const [ getMonth, setGetMonth ] = useState('')
  const [postsToRender, setFilteredPosts] = useState('')

  useEffect(() => {

    const dateOfPosts = post ? post.map(post => (
			
      { ...post, date_posted: moment(post.date_posted).format('LL') } //! Change date into usable format - set these fromatted date posts to state
    )) : null 
    console.log('these posts', dateOfPosts)
    setDateOfPosts(dateOfPosts)


  }, [post])

  const handleChange = (e) => {
    setSelectHasBeenUsed(true)
    const selectedMonth = e.target.value
    const postsToRender = dateOfPosts.filter(post =>
      post.date_posted.includes(selectedMonth)

    )
    console.log('HERE', postsToRender)
    return setFilteredPosts(postsToRender)
  }



  console.log('posts to render', postsToRender)

  if (error) {
    console.log(error.message)
  }

  return (

    <select onChange={handleChange} >
      <option value="All">All</option>
      <option value="January">JANUARY</option>
      <option value="February">FEBRUARY</option>
      <option value="March">MARCH</option>
      <option value="April">APRIL</option>
      <option value="May">MAY</option>
      <option value="June">JUNE</option>
      <option value="July">JULY</option>
      <option value="August">AUGUST</option>
      <option value="September">SEPTEMBER</option>
      <option value="October">OCTOBER</option>
      <option value="November">NOVEMBER</option>
      <option value="December">DECEMBER</option>
    </select>

  )
}




export default SelectMonthDropDown

