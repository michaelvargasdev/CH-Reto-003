const fs = require('fs')
const { Router } = require('express')
const router = Router()
/*
fs.readdirSync(__dirname).forEach(fileName => {
    if (fileName.split('.')[0] !== 'index') {
        const route = require(`./${fileName}`)
        console.log(route)
        router.use(`/${fileName}`, route)
    }
})
*/
const files = fs.readdirSync(__dirname)
for (const file of files) {
    const fileName = file.split('.')[0]
    if (fileName !== 'index') {
        router.use(`/${fileName}`, require(`./${fileName}`))
    }
}

router.use('/', (req, res) => res.status(200).json({ message: 'Private api' }))
router.use('*', (req, res) => res.status(404).send('Resource not found'))

module.exports = router
