const fs = require('fs')
const UUID = require("uuidjs")

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        this.config = { encoding: 'utf-8' }
    }

    async readFile() {
        try {
            if (fs.existsSync(this.fileName)) {
                const content = await fs.readFileSync(this.fileName, Contenedor.config)
                return JSON.parse(content)
            } else {
                await this.writeFile([])
                return  []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async writeFile(data) {
        try {
            await fs.writeFileSync(this.fileName, JSON.stringify(data), Contenedor.config)
        } catch (error) {
            console.log(error)
        }
    }

    async save(object) {
        try {
            const list = await this.readFile()
            //object.id = ++Contenedor.id
            object.id = UUID.generate()
            list.push(object)
            await this.writeFile(list)
            return Contenedor.id
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const list = await this.readFile()
            return list.find(item => item.id === id) || null
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const list = await this.readFile()
            return list
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, data) {
        try {
            const list = await this.getAll()
            let newData = {}
            const newList = list.map(item => (item.id === id) ? newData = { ...item, ...data } : item)
            await this.writeFile(newList)
            return newData
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const list = await this.readFile()
            const newList = list.filter(item => item.id !== id)
            await this.writeFile(newList)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await this.writeFile([])
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor
