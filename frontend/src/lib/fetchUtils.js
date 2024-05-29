const baseUrl = import.meta.env.VITE_API_URL

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
  const responseData = await response.json()
  return { success: true, data: responseData, statusCode: response.status }
}

const fetchData = async (url, taskId = null) => {
  try {
    const fullUrl = taskId ? `${baseUrl}/${url}/${taskId}` : `${baseUrl}/${url}`
    const response = await fetch(fullUrl)
    const responseData = await handleResponse(response)
    if (taskId) {
      responseData.data.taskId = taskId
    }
    return responseData.data
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
    const responseData = await handleResponse(response)
    console.log('Data posted successfully. Status code:', response.status)
    return responseData
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

const putData = async (url, data) => {
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseData = await handleResponse(response)
    console.log('Data updated successfully. Status code:', response.status)
    return responseData
  } catch (error) {
    console.error('Error updating data:', error)
    throw error
  }
}

const deleteData = async (url) => {
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'DELETE'
    })
    const responseData = await handleResponse(response)
    console.log('Data deleted successfully. Status code:', response.status)
    return responseData
  } catch (error) {
    console.error('Error deleting data:', error)
    throw error
  }
}

const deleteAndTransferData = async (url, newId) => {
  try {
    const response = await fetch(`${baseUrl}/${url}/${newId}`, {
      method: 'DELETE'
    })
    const responseData = await handleResponse(response)
    console.log(
      'Data deleted and transferred successfully. Status code:',
      response.status
    )
    return responseData
  } catch (error) {
    console.error('Error deleting and transferring data:', error)
    throw error
  }
}

export default {
  fetchData,
  postData,
  putData,
  deleteData,
  deleteAndTransferData
}
