import React, { useEffect } from 'react'
import { getAllPosts } from '../../lib/api'

function SelectYear() {
  const [items, setItems] = React.useState([
  ])
  const [value, setValue] = React.useState(
    'Select Month'
  )
	
  useEffect(() => {
    const unmounted = false
    async function getYears() {
      const response = await fetch(getAllPosts)
      console.log('this is the response',response)
      const body = await response.json()
      if (!unmounted) {
        setItems(
          body.results.map(({ year }) => ({ 
            label: year, 
            value: year 
          }))
        )
        

      }
      
    }
    getYears()

  }, [])

  return (
    <select 
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
    >
      {items.map(({ label, value }) => (
        <option 
          key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}






export default SelectYear 