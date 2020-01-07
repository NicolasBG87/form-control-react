import React from 'react'

import { useMyHook } from 'form-control-react'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
