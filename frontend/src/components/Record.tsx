import { Project, Task, User } from '../types/global'
import FormTask from './forms/FormTask'
import FormProject from './forms/FormProject'
import FormUser from './forms/FormUser'
import { useParams } from 'react-router-dom'
import useStore from '../hooks/useStore'

interface RecordProps {
  module: string
  edit?: boolean
}

const Record = ({ module, edit }: RecordProps) => {
  const { id } = useParams()
  const { elements } = useStore<any>({
    key: module,
    defaultValues: [],
  })
  const myElement = (recordId?: string): any | null => {
    if (recordId) {
      const elementsFilter = elements.filter(
        (element) => element.id === +recordId
      )
      return elementsFilter.length > 0 ? elementsFilter[0] : null
    } else return null
  }

  if (edit) {
    if (module === 'project') {
      return <FormProject defaultValues={myElement(id) as unknown as Project} />
    }
    if (module === 'user') {
      return <FormUser defaultValues={myElement(id) as unknown as User} />
    }
    if (module === 'task') {
      return <FormTask defaultValues={myElement(id) as unknown as Task} />
    }
  } else {
    if (module === 'project') {
      return <FormProject />
    }
    if (module === 'user') {
      return <FormUser />
    }
    if (module === 'task') {
      return <FormTask />
    }
  }
  return <></>
}

export default Record
