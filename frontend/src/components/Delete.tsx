import React from 'react'

interface DeleteProps {
  id: string
}

const Delete = (props: DeleteProps) => {
  React.useEffect(() => {
    console.log(props.id)
  }, [props.id])
  return <>Delete</>
}

export default Delete
