const Contenedor = require('../models/Contenedor')
const contenedor = new Contenedor('productos.txt')

const getProducts = async (req, res) => {
    try {
        const data = await contenedor.getAll()
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = await contenedor.getById(id)
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(404).json({ message: 'Data not found' })
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const { body } = req
        const id = await contenedor.save(body)
        const data = { id, ...body }
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const data = await contenedor.getById(id)
        if (data) {
            const newData = await contenedor.updateProduct(id, body)
            return res.status(200).json({ data: newData })
        } else {
            return res.status(404).json({ message: 'Data not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = await contenedor.getById(id)
        if (data) {
            await contenedor.deleteById(id)
            return res.status(204).json()
        } else {
            return res.status(404).json({ message: 'Data not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteProducts = async (req, res) => {
    try {
        await contenedor.deleteAll()
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProducts
}
