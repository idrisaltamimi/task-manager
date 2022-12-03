const getId = (id: string | undefined) => {
  const newId = id !== undefined ? id : ''

  return newId
}

export default getId