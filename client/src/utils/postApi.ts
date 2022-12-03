const postApi = async (value: any, api: any, success: any) => {
  const { data } = await api(value)
  try {

    if (data) return success

  } catch (error) {
    console.log(error)
  }
}

export default postApi