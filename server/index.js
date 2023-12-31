require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
	try {
		await mongoose.connect(
			(process.env.MONGO_URL? 
				`${process.env.MONGO_URL}`:
				`mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`),
			{
				
				useNewUrlParser: true,
				useUnifiedTopology: true,
				
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
