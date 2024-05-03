// fetchUtils.js

const baseUrl = 'http://localhost:8080/itb-kk/v1'

const fetchData = async (url) => {
  try {
    const response = await fetch(`${baseUrl}/${url}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const postData = async (url, data) => {
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

export default { fetchData, postData }
