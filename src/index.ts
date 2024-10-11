import { app } from 'app'
import { env } from 'env'

app.listen(env, () => {
  console.log('Server running on port 3333')
})
