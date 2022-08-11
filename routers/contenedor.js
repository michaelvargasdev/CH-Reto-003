const { Router } = require('express')
const router = Router()

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProducts
} = require('../controllers/contenedor')

router.route('/').get(getProducts)
router.route('/:id').get(getProduct)
router.route('/').post(createProduct)
router.route('/:id').patch(updateProduct)
router.route('/:id').delete(deleteProduct)
router.route('/').delete(deleteProducts)

module.exports = router
