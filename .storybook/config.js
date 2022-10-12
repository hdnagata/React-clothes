import { configure } from '@storybook/react'

import '../src/styles/index.css'

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(tsx|js)$/), module)
